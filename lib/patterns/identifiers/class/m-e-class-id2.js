var junify = require("junify");

module.exports = {
  "type": "ExpressionStatement",
  "expression": {
    "type": "AssignmentExpression",
    "operator": "=",
    "left": {
      "type": "MemberExpression",
      "computed": true,
      "object": {
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
      "property": {
        "type": "Literal",
        "value": junify.variable("prop_identifier"),
        "raw": junify._
      }
    },
    "right": {
      "type": "Identifier",
      "name": junify.variable("identifier")
    }
  }
}
