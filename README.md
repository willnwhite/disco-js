# Function Index

[type signature](https://en.wikipedia.org/wiki/Type_signature) in, functions out

E.g. "array in, Boolean out" in, [`every`](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/array/every) [`includes`](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/array/includes) [`some`](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/array/some) out

## Indexed

* JavaScript (ECMAScript 6)

## To be indexed

* Web APIs
  * Document Object Model
  * Fetch/XMLHttpRequest
* JavaScript libraries
  * jQuery
  * lodash
  * Ramda
  * Underscore
* Compile-to-JavaScript languages
  * ClojureScript
  * Elm
  * PureScript
  * TypeScript
* Other languages
  * Python
  * Ruby

## Indexing functions

```json
{
  "name": "querySelector",
  "inputs": ["Element", "string"],
  "output": "Element"
}
```

Note: if the function is an object method, like `querySelector` is an Element method, put the object first in the inputs, e.g. "inputs": ["Element", "string"], and not "inputs": ["string", "Element"]. This is so the URL to the documentation will be correct, as it is built using the first element. In time we could do something more explicit like "inputs": {"object": "Element", "parameters": ["string"]}, but we'll have to make the program work with this.
