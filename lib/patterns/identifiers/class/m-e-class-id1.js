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
          "name": "module"
        },
        "property": {
          "type": "Identifier",
          "name": "exports"
        }
      },
      "property": {
        "type": "Identifier",
        "name": junify.variable("prop_identifier")
      }
    },
    "right": {
      "type": "Identifier",
      "name": junify.variable("identifier")
    }
  }
}
