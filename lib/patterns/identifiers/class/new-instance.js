var junify = require("junify");

module.exports = {
  "type": "ExpressionStatement",
  "expression": {
    "type": "AssignmentExpression",
    "operator": "=",
    "left": {
      "type": "MemberExpression",
      "computed": false,
      "object": {
        "type": "Identifier",
        "name": "module"
      },
      "property": {
        "type": "Identifier",
        "name": "exports"
      }
    },
    "right": {
      "type": "NewExpression",
      "callee": {
        "type": "Identifier",
        "name": junify.variable("identifier")
      },
      "arguments": junify._
    }
  }
}