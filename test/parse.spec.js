
var fs = require("fs");
var parser = require("../lib/parser");
var chai = require("chai");
chai.should();

describe("#parser", function(){
  it("should parse", function(){
    var file = fs.readFileSync(__dirname + "/samples/sample.js", "utf8");
    var rendered = parser(file);
    console.log(rendered)
    rendered.should.equal('var sinon = require("sinon");\nvar chai = require("chai");\nvar expect = chai.expect;\nchai.should();\ndescribe("#Sample", function() {\n    beforeEach(function() {});\n    afterEach(function() {});\n    describe("constructor", function() {\n        beforeEach(function() {});\n        afterEach(function() {});\n    });\n    describe("baz", function() {\n        beforeEach(function() {});\n        afterEach(function() {});\n    });\n});\ndescribe("#static2", function() {\n    beforeEach(function() {});\n    afterEach(function() {});\n});\ndescribe("#static3", function() {\n    beforeEach(function() {});\n    afterEach(function() {});\n});');
  })
});
