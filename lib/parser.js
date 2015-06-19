
var esprima = require("esprima");
var junify = require("junify");
var moduleExportsPattern = require("./patterns/module-exports");
var exportsPattern = require("./patterns/exports");
var moduleExportsAssignPattern = require("./patterns/module-exports-assign");
var prototypePattern = require("./patterns/prototype");
var dust = require("dustjs-linkedin");
var fs = require("fs");
var beautify = require("js-beautify");

var basetmpl = dust.compile(fs.readFileSync(__dirname + "/templates/base.dust", "utf8"), "base");
var classtmpl = dust.compile(fs.readFileSync(__dirname + "/templates/class.dust", "utf8"), "class");
var statictmpl = dust.compile(fs.readFileSync(__dirname + "/templates/static.dust", "utf8"), "static");

dust.loadSource(basetmpl);
dust.loadSource(classtmpl);
dust.loadSource(statictmpl);

function parse(data){
  var ast = esprima.parse(data);
  var wrapped = new Unit(ast);

  wrapped.next(extractExportsIds)
    .next(extractModuleExportsIds)
    .next(extractModuleExportsAssignIds)
    .next(extractClassPrototypes)
    .next(classifyIds)
    .next(createClasses)
    .next(createStatics)
    .next(render)


  return wrapped.value.rendered
}

function Unit(data){
  this.value = {ast:data};
  this.next = function(fn){
    this.value = fn(this.value);
    return this;
  };
}

function extractExportsIds(data){
  var ast = data.ast;
  data.exportsIds = [];
  for(var i in ast.body){
    var expr = ast.body[i];
    var union = junify.unify(expr, exportsPattern);
    if(union){
      data.exportsIds.push(union);
    }
  }

  return data;
}

function extractModuleExportsIds(data){
  var ast = data.ast;
  data.moduleExportsIds = [];
  for(var i in ast.body){
    var expr = ast.body[i];
    var union = junify.unify(expr, moduleExportsPattern);
    if(union){
      data.moduleExportsIds.push(union);
    }
  }

  return data;
}

function extractModuleExportsAssignIds(data){
  var ast = data.ast;
  data.moduleExportsIds = data.moduleExportsIds || [];
  for(var i in ast.body){
    var expr = ast.body[i];
    var union = junify.unify(expr, moduleExportsAssignPattern);
    if(union){
      data.moduleExportsIds.push(union);
    }
  }

  return data;
}

function extractClassPrototypes(data){
  var ast = data.ast;
  data.classPrototypeIds = [];
  for(var i in ast.body){
    var expr = ast.body[i];
    var union = junify.unify(expr, prototypePattern);
    if(union){
      data.classPrototypeIds.push(union);
    }
  }

  return data;
}

function classifyIds(data){
  data.classIds = [];
  data.staticsIds = [];
  for(var i in data.moduleExportsIds){
    var union = data.moduleExportsIds[i];
    if(union.identifier.toLowerCase() === union.identifier){
      data.staticsIds.push(union);
    } else{
      data.classIds.push(union);
    }
  }
  for(var j in data.exportsIds){
    var union = data.exportsIds[j];
    if(union.identifier[0].toLowerCase() === union.identifier[0]){
      data.staticsIds.push(union);
    } else{
      data.classIds.push(union);
    }
  }

  return data;
}

function createClasses(data){
  data.classes = [];
  for(var i in data.classIds){
    var classId = data.classIds[i].identifier;
    var classObj = {identifier:classId, functions:[]};
    for(var j in data.classPrototypeIds){
      if(data.classPrototypeIds[j].identifier === classId){
        classObj.functions.push(data.classPrototypeIds[j].method);
      }
    }

    data.classes.push(classObj);
  }

  return data;
}

function createStatics(data){
  data.statics = [];
  for(var i in data.staticsIds){
    var classId = data.staticsIds[i].identifier;
    var classObj = {identifier:classId, functions:[]};

    data.statics.push(classObj);
  }

  return data;
}

function render(data){
  var val;
  dust.render("base", data, function(err, test){
    val = beautify(test);
  });
  data.rendered = val;
  return data;
}

module.exports = parse;
