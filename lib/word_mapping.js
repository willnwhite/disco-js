'use babel'

export default (word) => {
  let types = []
  for (var type in map) {
    if (map[type].includes(word)) {
      types.push(type)
    }
  }
  return types
}
