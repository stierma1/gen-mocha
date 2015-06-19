
function Sample(a, b, c){

}

Sample.prototype = {
  foo: function(){

  },
  "bar": function(){

  }
};

Sample.prototype.baz = function(){

};

Sample.static = function(){

};

module.exports = Sample;

module.exports.static2 = function(){
  
};

exports.static3 = function(){

}

module.exports = {
  "static4": function(){

  },
  "static5": 5
}
