{
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
        "name": "myFunction"
      }
    },
    "right": {
      "type": "ArrowFunctionExpression",
      "id": null,
      "params": [],
      "defaults": [],
      "body": {
        "type": "Literal",
        "value": 2,
        "raw": "2"
      },
      "generator": false,
      "expression": true
    }
  }
}