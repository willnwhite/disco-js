'use babel'

export const map = {
  'array': ['a', 'arr', 'list'],
  'boolean': ['b', 'bool', 't/f', 'true/false', "true or false", 'y/n', 'yes/no', 'yes or no'],
  "number": ['f', 'float', 'floating point number', 'int', 'integer', 'n', 'num'],
  "object": ['o', 'obj'],
  "string": ['character', 'characters', 'letter', 'letters', 's', 'str', "text", "word", 'words']
}

export default (word) => {
  let types = []
  for (var type in map) {
    if (map[type].includes(word)) {
      types.push(type)
    }
  }
  return types
}
