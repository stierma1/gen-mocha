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
        "name": "MyClass"
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
            "name": "myFunction"
          },
          "computed": false,
          "value": {
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
          },
          "kind": "init",
          "method": false,
          "shorthand": false
        }
      ]
    }
  }
}