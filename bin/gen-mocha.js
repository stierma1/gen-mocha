#!/usr/bin/env node

var commander = require("commander");
var glob = require("glob");
var path = require("path");
var parse = require("../lib/parser");
var fs = require("fs");

commander.version(require('../package.json').version)
  .option("-i, --inputFile [filePath]", "Input file relative to cwd")
  .option("-o, --outputFile [filePath]", "Output file relative to cwd")
  .parse(process.argv)

if(!commander.inputFile){
  throw new Error("Input File is required");
}

if(!commander.outputFile){
  throw new Error("Output File is required");
}

var input = path.join(process.cwd(), commander.inputFile);
var output = path.join(process.cwd(), commander.outputFile);

var rendered = parse(fs.readFileSync(input, "utf8"));

fs.writeFileSync(output, rendered);
