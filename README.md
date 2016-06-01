# Function Index

[type signature](https://en.wikipedia.org/wiki/Type_signature) in, functions out

Find functionality faster than you can re-invent it.

## Example

```javascript
var words = [word, word, word, ...]
```

"Are all the words in this list the same or not?"

Rather than

```javascript
for (var i = 1; i < words.length; i++) {
  if (words[i] !== words[0]) {
    return false
  } else if (i === words.length - 1) {
    return true
  }
}
```

or

```javascript
words.forEach((word, i) => {
  if (word !== words[0]) {
    return false
  } else if (i === words.length - 1) {
    return true
  }
})
```

or even

```javascript
words.every(function (word) {
  return word === words[0]
})
```

Give FI a type signature: `array in, Boolean out`

FI gives you the functions with that signature: [`every`](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/array/every) [`includes`](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/array/includes) [`some`](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/array/some)
[`allTheSame`](https://gist.github.com/willnwhite/90582eece5b14b5bd03de16dcff4ec61)

```javascript
allTheSame(words)
```

## Indexed

* JavaScript (ECMAScript 6)
* allTheSame

## To be indexed next

* Web standards
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

## Publishing functions to FI

*allTheSame.json*

```json
{
  "name": "allTheSame",
  "inputs": ["array"],
  "output": "Boolean",
  "source code": ["https://gist.github.com/willnwhite/90582eece5b14b5bd03de16dcff4ec61/raw/dd3316166de791064eece3e1e9f36be16dc07a41/allTheSame.js"],
  "documentation": ["https://gist.github.com/willnwhite/90582eece5b14b5bd03de16dcff4ec61"]
}
```
