var junify = require("junify");

module.exports = {
  "type": "FunctionDeclaration",
  "id": {
    "type": "Identifier",
    "name": junify.variable("identifier")
  },
  "params": junify._,
  "defaults": junify._,
  "body": junify._,
  "generator": junify._,
  "expression": junify._
}
