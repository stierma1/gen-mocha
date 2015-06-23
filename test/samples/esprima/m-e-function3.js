{
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
        "value": "myFunction",
        "raw": "\"myFunction\""
      }
    },
    "right": {
      "type": "FunctionExpression",
      "id": null,
      "params": [],
      "defaults": [],
      "body": {
        "type": "BlockStatement",
        "body": []
      },
      "generator": false,
      "expression": false
    }
  }
}