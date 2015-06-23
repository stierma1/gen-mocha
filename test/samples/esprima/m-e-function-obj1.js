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
            "type": "Literal",
            "value": "myFunc",
            "raw": "\"myFunc\""
          },
          "computed": false,
          "value": {
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
          },
          "kind": "init",
          "method": false,
          "shorthand": false
        }
      ]
    }
  }
}