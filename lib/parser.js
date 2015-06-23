
var esprima = require("esprima");
var junify = require("junify");
var moduleExportsPattern = require("./patterns/module-exports");
var exportsPattern = require("./patterns/exports");
var moduleExportsAssignPattern = require("./patterns/module-exports-assign");
var prototypePattern = require("./patterns/prototype");
var dust = require("dustjs-linkedin");
var fs = require("fs");
var beautify = require("js-beautify");
var glob = require("glob");

var basetmpl = dust.compile(fs.readFileSync(__dirname + "/templates/base.dust", "utf8"), "base");
var classtmpl = dust.compile(fs.readFileSync(__dirname + "/templates/class.dust", "utf8"), "class");
var statictmpl = dust.compile(fs.readFileSync(__dirname + "/templates/static.dust", "utf8"), "static");
var funcDecPattern  = require("./patterns/identifiers/declaration/function.js");
var staticSinglePattern = require("./patterns/identifiers/single-static.js");

dust.loadSource(basetmpl);
dust.loadSource(classtmpl);
dust.loadSource(statictmpl);

var classIdFiles = glob.sync(__dirname + "/patterns/identifiers/class/**/*.js");
var classIdentifiers = [];
for(var i in classIdFiles){
  classIdentifiers.push(require(classIdFiles[i]));
}

var prototypeIdFiles = glob.sync(__dirname + "/patterns/identifiers/prototypes/**/*.js");
var prototypeIdentifiers = [];
for(var i in prototypeIdFiles){
  prototypeIdentifiers.push(require(prototypeIdFiles[i]));
}

var classStaticsIdFiles = glob.sync(__dirname + "/patterns/identifiers/class-statics/**/*.js");
var classStaticIdentifiers = [];
for(var i in classStaticsIdFiles){
  classStaticIdentifiers.push(require(classStaticsIdFiles[i]));
}

var functionIdFiles = glob.sync(__dirname + "/patterns/identifiers/functions/**/*.js");
var functionIdentifiers = [];
for(var i in functionIdFiles){
  functionIdentifiers.push(require(functionIdFiles[i]));
}

function classify(data){
  data.classIdentifiers = [];
  data.funcDeclaration = {};
  data.staticFuncs = [];
  data.classObjs = {};
  data.prototypes = {};

  for(var i in data.ast.body){
    var expr = data.ast.body[i];
    var funcDec = junify.unify(expr, funcDecPattern);
    if(funcDec){
      data.funcDeclaration[funcDec.identifier] = funcDec;
    }
    var singleStatic = junify.unify(expr, staticSinglePattern);
    if(singleStatic){
      data.staticFuncs.push(singleStatic);
    }
  }

  for(var i in classIdentifiers){
    for(var j in data.ast.body){
      var expr = data.ast.body[j];
      var union = junify.unify(expr, classIdentifiers[i]);
      var funcDec = junify.unify(expr, funcDecPattern);
      if(union){
        if(data.funcDeclaration[union.identifier]){
          if(union.identifier[0] !== union.identifier[0].toLowerCase()){
            data.classIdentifiers.push(union);
            data.classObjs[union.identifier] = union;
          }
        }
      }
    }
  }

  for(var i in functionIdentifiers){
    for(var j in data.ast.body){
      var expr = data.ast.body[j];
      var union = junify.unify(expr, functionIdentifiers[i]);
      var funcDec = junify.unify(expr, funcDecPattern);

      if(union){
        if(data.funcDeclaration[union.identifier]){
          if(union.identifier[0] === union.identifier[0].toLowerCase()){
            data.staticFuncs.push(union);
          }
        }
      }
    }
  }

  for(var i in prototypeIdentifiers){
    for(var j in data.ast.body){
      var expr = data.ast.body[j];

      var union = junify.unify(expr, prototypeIdentifiers[i]);
      if(union && data.classObjs[union.class_name]){
        data.classObjs[union.class_name].protos = data.classObjs[union.class_name].protos || [];
        data.classObjs[union.class_name].protos.push(union);
        data.prototypes[union.class_name] = union;
      }
    }
  }

  for(var i in classStaticIdentifiers){
    for(var j in data.ast.body){
      var expr = data.ast.body[j];
      var union = junify.unify(expr, classStaticIdentifiers[i]);
      if(union && data.classObjs[union.class_name]){
        data.classObjs[union.class_name].statics = data.classObjs[union.class_name].statics || [];
        data.classObjs[union.class_name].statics.push(union);
      }
    }
  }

  return data;
}

function transform(data){
  data.classes = [];
  data.statics = [];

  for(var i in data.staticFuncs){
    data.statics.push(data.staticFuncs[i]);
  }

  for(var i in data.classObjs){
    var obj = {identifier: data.classObjs[i].identifier, functions:[]};
    for(var j in data.classObjs[i].protos){
      obj.functions.push(data.classObjs[i].protos[j].identifier)
    }
    for(var j in data.classObjs[i].statics){
      obj.functions.push(data.classObjs[i].statics[j].identifier)
    }
    data.classes.push(obj);
  }

  return data;
}

var subFuncsIdFiles = glob.sync("./patterns/subfunctions/**/*.js");
var subFuncsIdentifiers = [];
for(var i in subFuncsIdFiles){
  subFuncsIdentifiers.push(require(i));
}

function parse(data){

  var ast = esprima.parse(data);
  var wrapped = new Unit(ast);

  wrapped.next(extractExportsIds)
    .next(classify)
    /*.next(extractModuleExportsIds)
    .next(extractModuleExportsAssignIds)
    .next(extractClassPrototypes)
    .next(classifyIds)
    .next(createClasses)
    .next(createStatics)*/
    .next(transform)
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
