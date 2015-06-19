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
        "type": "MemberExpression",
        "computed": false,
        "object": {
          "type": "Identifier",
          "name": junify.variable("identifier")
        },
        "property": {
          "type": "Identifier",
          "name": "prototype"
        }
      },
      "property": {
        "type": "Identifier",
        "name": junify.variable("method")
      }
    },
    "right": {
      "type": "FunctionExpression",
      "id": junify._,
      "params": junify._,
      "defaults": junify._,
      "body": junify._,
      "generator": junify._,
      "expression": junify._
    }
  }
}
