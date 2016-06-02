'use babel'

export default (functions, inputs, output) => {
  const tally = (array) => {
    let tally = {}
    array.forEach((item) => {
      if (tally.hasOwnProperty(item) === false) {
        tally[item] = 1
      } else {
        tally[item] += 1
      }
    })
    return tally
  }

  const inputsTally = tally(inputs);

  return functions.filter((func) => {
    if (inputs.length > func.inputs.length) return false
    const functionInputsTally = tally(func.inputs)
    const compareTallies = (inputsTally, functionInputsTally) => {
      for (var type in inputsTally) {
        if (inputsTally.hasOwnProperty(type)) {
          if (functionInputsTally.hasOwnProperty(type)) {
            if (inputsTally[type] > functionInputsTally[type]) return false
            else return true
          }
        }
      }
    }
    if (output === '') { // e.g. looking for a function just for its side effects, like Node.removeChild, without needing to specify its return value
      return compareTallies(inputsTally, functionInputsTally)
    } else {
      if (func.hasOwnProperty('output')) {
        return compareTallies(inputsTally, functionInputsTally) && func.output === output
      } else if (func.hasOwnProperty('outputs')) {
        return inputs.every((input) => func.inputs.includes(input)) && func.outputs.includes(output)
      }
    }
  })
}
