
var glob = require("glob");
var esprima = require("esprima");
var fs =require("fs");
var path = require("path");

var files = glob.sync("./test/samples/classifiers/*.js")

for(var i in files){
  var file = files[i];
  var basename = path.basename(file);
  var data = fs.readFileSync(file, "utf8");

  var parsed = esprima.parse(data);

  fs.writeFileSync("./test/samples/esprima/" + basename, JSON.stringify(parsed.body[0], null, 2));
}
