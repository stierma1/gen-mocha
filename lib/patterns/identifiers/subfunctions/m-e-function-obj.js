var junify = require("junify");

module.export ={
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
      "properties": [
        {
          "type": "Property",
          "key": {
            "type": "Literal",
            "value": junify.variable("identifier"),
            "raw": junify._
          },
          "computed": false,
          "value": {
            "type": "FunctionExpression",
            "id": junify._,
            "params": junify._,
            "defaults": junify._,
            "body": junify._,
            "generator": junify._,
            "expression": junify._
          },
          "kind": junify._,
          "method": junify._,
          "shorthand": junify._
        }
      ]
    }
  }
}
