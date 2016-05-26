# disco: discover programming

Tell Disco what value you have, and what value you want, and it will look through all the programming languages and libraries registered with it to tell you the functions, object methods and properties that can give you what you want, with links to their documentation.

## Example

You need to know if the words in a list are all the same or not.

```javascript
// JavaScript
const words = [word1, word2, word3]
```

Tell Disco "list to yes/no" and it will tell you:

`find`\*, [`every`](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/array/every), `includes`, `pop`\*, `reduce`, `reduceRight`, `shift`\*, `some`

\* only if list includes a yes/no

```javascript
words.every(word => word === words[0])
```

Without discovering `every`, you might have spent time replicating its functionality with a loop or `forEach`.

![A screenshot of your package](https://f.cloud.github.com/assets/69169/2290250/c35d867a-a017-11e3-86be-cd7c5bf3ff9b.gif)

Next:
* [Your idea](https://github.com/willnwhite/disco-js/issues/new)
* More languages, more libraries
* More data types
* More words and shortcuts for data types (e.g. "list" or "arr" for array)
* Atom-feel interface
