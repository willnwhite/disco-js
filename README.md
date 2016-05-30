# Disco: discover programming

Stuck? It's because you don't know something. Tell Disco what you have, and what you want, and it will tell you what you need.

## Example
```javascript
// JavaScript
const words = [word1, word2, word3]
```
You want to know if the words in a list are all the same. You have an array, you want a true or false (a Boolean).

Tell Disco "array in, Boolean out" and it will tell you the functions, methods and properties that can do that:

`find`, [`every`](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/array/every), `includes`, `pop`, `reduce`, `reduceRight`, `shift`, `some`

```javascript
words.every(word => word === words[0])
```

Without finding `every`, you might have spent time replicating its functionality with a loop or `forEach`.

![A screenshot of your package](https://f.cloud.github.com/assets/69169/2290250/c35d867a-a017-11e3-86be-cd7c5bf3ff9b.gif)

Next:
* [Your idea](https://github.com/willnwhite/disco-js/issues/new)
* More languages, more libraries
* More data types
* More words and shortcuts for data types (e.g. "list" or "arr" for array)
* Atom-feel interface
