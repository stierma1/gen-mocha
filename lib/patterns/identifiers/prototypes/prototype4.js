var junify = require("junify");

module.exports ={
  "type": "ExpressionStatement",
  "expression": {
    "type": "AssignmentExpression",
    "operator": "=",
    "left": {
      "type": "MemberExpression",
      "computed": false,
      "object": {
        "type": "Identifier",
        "name": junify.variable("class_name")
      },
      "property": {
        "type": "Identifier",
        "name": "prototype"
      }
    },
    "right": {
      "type": "ObjectExpression",
      "properties": [
        {
          "type": "Property",
          "key": {
            "type": "Identifier",
            "name": junify.variable("identifier")
          },
          "computed": junify._,
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
