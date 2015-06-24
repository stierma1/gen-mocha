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
      "type": "ObjectExpression",
      "properties": junify.variable("hashes")
    }
  }
}
