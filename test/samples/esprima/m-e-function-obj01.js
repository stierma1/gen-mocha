{
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
            "type": "Identifier",
            "name": "myFunc"
          },
          "computed": false,
          "value": {
            "type": "ArrowFunctionExpression",
            "id": null,
            "params": [],
            "defaults": [],
            "body": {
              "type": "BlockStatement",
              "body": []
            },
            "generator": false,
            "expression": false
          },
          "kind": "init",
          "method": false,
          "shorthand": false
        }
      ]
    }
  }
}