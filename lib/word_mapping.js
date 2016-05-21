'use babel'

export default (word) => {
  const map = {
    'array': ['list'],
    'boolean': ["true or false", 'yes or no'],
    "number": ['float', 'floating point number', 'int', 'integer'],
    "string": ['character', 'characters', 'letter', 'letters', "text", "word", 'words']
  }

  let types = []
  for (var type in map) {
    if (map[type].includes(word)) {
      types.push(type)
    }
  }
  return types
}
