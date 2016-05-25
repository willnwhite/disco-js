'use babel'

export default (input, output) => (
  { // in a-z order
    "array": {
      "array": [
        'concat', 'copyWithin', 'entries', 'fill', "filter", 'keys', "map", 'pop', 'reverse', 'shift', 'slice', 'sort', 'splice', 'values'],
      "boolean": [
        {name: 'find', elementTypeDependent: true}, "every", "includes", {name: 'pop', elementTypeDependent: true}, 'reduce', 'reduceRight', {name: 'shift', elementTypeDependent: true}, "some"],
      "number": [
        {name: 'find', elementTypeDependent: true}, 'findIndex', "indexOf", 'lastIndexOf', {name: 'pop', elementTypeDependent: true}, 'push', 'reduce', 'reduceRight', {name: 'shift', elementTypeDependent: true}, 'unshift'],
      "string": [
        {name: 'find', elementTypeDependent: true}, 'join', {name: 'pop', elementTypeDependent: true}, 'reduce', 'reduceRight', {name: 'shift', elementTypeDependent: true}, 'toLocaleString', 'toString'],
      "undefined": [
        "forEach"]
    },
    'boolean': {
      'boolean': [
        'valueOf'
      ],
      'string': [
        'toString'
      ]
    },
    "number": {
      "array": [ // FIXME URL doesn't work (don't fit object/method pattern)
        'Array'],
      "boolean": [
        'isFinite', 'isInteger', 'isNaN', 'isSafeInteger'
      ],
      "number": [
        'valueOf'
      ],
      "string": [
        'toExponential', 'toFixed', 'toLocaleString', 'toPrecision', "toString"
      ]
    },
    "object": {
      "array": [
        {name: 'entries', version: 'ES8'}, 'getOwnPropertyNames', 'getOwnPropertySymbols', "keys", {name: 'values', version: 'ES8'}],
      "object": [
        'assign', 'create', 'defineProperties', 'defineProperty', 'freeze', 'getOwnPropertyDescriptor', 'getPrototypeOf', 'preventExtensions', 'seal', 'setPrototypeOf', 'valueOf'],
      "boolean": [
        "hasOwnProperty", 'is', 'isExtensible', 'isFrozen', 'isSealed', 'isPrototypeOf', 'propertyIsEnumerable'
      ],
      "string": [
        "toLocaleString", 'toString'
      ]
    },
    "string": {
      "array": [
        'match', 'split'],
      "boolean": [
        'endsWith', 'includes', 'startsWith'],
      "number": [
        'charCodeAt', 'codePointAt', 'indexOf', 'lastIndexOf', 'localCompare', 'parseFloat', 'parseInt', 'search', 'toFixed'],
      "string": [
        {name: 'anchor', host: 'web browser'},
        {name: 'big', host: 'web browser'},
        {name: 'blink', host: 'web browser'},
        {name: 'bold', host: 'web browser'},
        'charAt', 'concat',
        {name: 'fixed', host: 'web browser'},
        {name: 'fontsize', host: 'web browser'},
        {name: 'italics', host: 'web browser'},
        {name: 'link', host: 'web browser'}, 'normalize', 'repeat', 'replace', 'slice',
        {name: 'small', host: 'web browser'},
        {name: 'strike', host: 'web browser'},
        {name: 'sub', host: 'web browser'},
        {name: 'substr', host: 'web browser'}, 'substring',
        {name: 'sup', host: 'web browser'}, 'toLocaleLowerCase', 'toLocaleUpperCase', 'toLowerCase', 'toString', 'toUpperCase', 'trim', 'trimLeft', 'trimRight', 'valueOf']
    }
  }[input.toLowerCase()][output.toLowerCase()] // http://www.ecma-international.org/ecma-262/6.0
)
