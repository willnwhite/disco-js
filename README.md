# disco-js: discover JavaScript

Tell Disco what value you have, and what value you want, and it will look through JavaScript and all the libraries registered with it to tell you the functions that can do that, with links to their documentation.

## Example

You need to know if the words in a list are all the same or not.

```javascript
const words = [word1, word2, word3]
```

Tell Disco "array in, Boolean out" and it will tell you:

`find`\*, `every`, `includes`, `pop`\*, `reduce`, `reduceRight`, `shift`\*, `some`

\* only if array includes `true` or `false`

```javascript
words.every(word => word == words[0])
```

Without discovering `every`, you might have spent time replicating its functionality with a loop or `forEach`.

![A screenshot of your package](https://f.cloud.github.com/assets/69169/2290250/c35d867a-a017-11e3-86be-cd7c5bf3ff9b.gif)

Next up:
* More libraries
* More data types
* More words and shortcuts for data types (e.g. "list" or "arr" for array)
* Atom-feel interface
* Clicking on a function name inserts it into your code (snippets)
* [Your idea](https://github.com/willnwhite/disco-js/issues/new)

Help out on [GitHub](https://github.com/willnwhite/disco-js).
