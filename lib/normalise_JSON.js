var normalize = require('json-normalizer');
var schema = {
    "properties": {
        "name": {
            "alias": "entry",
            "type": "string"
        },
        "base_URLs": {
          "type": "array"
        },
        "functions": {
          "type": "array"
        }
    }
};

var data = {
  "name": "ECMAScript 6",
  "base_URLs": [
    ["http://ecma-international.org/ecma-262/6.0/#sec-", ".prototype."],
    "http://docs.webplatform.org/wiki/javascript/",
    "https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/"
  ],
  "functions": {
    "array": {
      "array": [
        "concat", "copyWithin", "entries", "fill", "filter", "keys", "map", "pop", "reverse", "shift", "slice", "sort", "splice", "values"],
      "boolean": [
        {"name": "find", "elementTypeDependent": true}, "every", "includes", {"name": "pop", "elementTypeDependent": true}, "reduce", "reduceRight", {"name": "shift", "elementTypeDependent": true}, "some"],
      "number": [
        {"name": "find", "elementTypeDependent": true}, "findIndex", "indexOf", "lastIndexOf", "length", {"name": "pop", "elementTypeDependent": true}, "push", "reduce", "reduceRight", {"name": "shift", "elementTypeDependent": true}, "unshift"
      ],
      "string": [
        {"name": "find", "elementTypeDependent": true}, "join", {"name": "pop", "elementTypeDependent": true}, "reduce", "reduceRight", {"name": "shift", "elementTypeDependent": true}, "toLocaleString", "toString"],
      "undefined": [
        "forEach"
      ]
    },
    "boolean": {
      "boolean": [
        "valueOf"
      ],
      "string": [
        "toString"
      ]
    },
    "number": {
      "array": [
        "Array"],
      "boolean": [
        "isFinite", "isInteger", "isNaN", "isSafeInteger"
      ],
      "number": [
        "valueOf"
      ],
      "string": [
        "toExponential", "toFixed", "toLocaleString", "toPrecision", "toString"
      ]
    },
    "object": {
      "array": [
        {"name": "entries", "version": "ES8"}, "getOwnPropertyNames", "getOwnPropertySymbols", "keys", {"name": "values", "version": "ES8"}],
      "object": [
        "assign", "create", "defineProperties", "defineProperty", "freeze", "getOwnPropertyDescriptor", "getPrototypeOf", "preventExtensions", "seal", "setPrototypeOf", "valueOf"],
      "boolean": [
        "hasOwnProperty", "is", "isExtensible", "isFrozen", "isSealed", "isPrototypeOf", "propertyIsEnumerable"
      ],
      "string": [
        "toLocaleString", "toString"
      ]
    },
    "string": {
      "array": [
        "match", "split"],
      "boolean": [
        "endsWith", "includes", "startsWith"],
      "number": [
        "charCodeAt", "codePointAt", "indexOf", "lastIndexOf", "localCompare", "parseFloat", "parseInt", "search", "toFixed"],
      "string": [
        {"name": "anchor", "host": "web browser"},
        {"name": "big", "host": "web browser"},
        {"name": "blink", "host": "web browser"},
        {"name": "bold", "host": "web browser"},
        "charAt", "concat",
        {"name": "fixed", "host": "web browser"},
        {"name": "fontsize", "host": "web browser"},
        {"name": "italics", "host": "web browser"},
        {"name": "link", "host": "web browser"}, "normalize", "repeat", "replace", "slice",
        {"name": "small", "host": "web browser"},
        {"name": "strike", "host": "web browser"},
        {"name": "sub", "host": "web browser"},
        {"name": "substr", "host": "web browser"}, "substring",
        {"name": "sup", "host": "web browser"}, "toLocaleLowerCase", "toLocaleUpperCase", "toLowerCase", "toString", "toUpperCase", "trim", "trimLeft", "trimRight", "valueOf"
      ]
    }
  }
};

// normalize(schema, data, {}, function(err, result) {
//     if (!err) {
//       console.log(result);  // process the normalized JSON data object here.
//     }
// });

for (var input in data.functions) {
  if (data.functions.hasOwnProperty(input)) {
    for (var output in data.functions[input]) {
      if (data.functions[input].hasOwnProperty(output)) {
        console.log(data.functions[input][output].map((func) => ({"name": func, "inputs": [input], "output": output})));
      }
    }
  }
}
