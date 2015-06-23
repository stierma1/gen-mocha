# gen-mocha
Generate node js unit tests

## Patterns

### Module Id Assignment

*These will need to be classified by a function identifier*

#### Class
```
module.exports = MyClass;
```

```
module.exports.MyClass = MyClass;
```

#### Static function
```
module.exports = myFunction;
```
```
module.exports.myFunction = myFunction;
```
```
module.exports = function(...){...};
```
```
module.exports = (...) => {...};
```

#### Object Assignment
```
module.exports = {
  myFunction: function(...){...}
};
```

### Function Classifiers

#### Class Constructor
```
function MyClass(){

}
```

#### Static Function
```
function myFunction(){

}
```

### SubFunction Classifier

####Class Prototype
```
MyClass.prototype.subFunc = function(...){...};
```

####Class Static
```
MyClass.subFunc = function(...){...};
```
