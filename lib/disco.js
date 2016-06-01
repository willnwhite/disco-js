'use babel'

export default (functions, inputs, output) =>
  functions.filter((func) => {
    if (output === '') { // e.g. looking for a function just for its side effects, like Node.removeChild, without needing to specify its return value
      return inputs.every((input) => func.inputs.includes(input))
    } else {
      if (func.hasOwnProperty('output')) {
        return inputs.every((input) => func.inputs.includes(input)) && func.output === output
      } else if (func.hasOwnProperty('outputs')) {
        return inputs.every((input) => func.inputs.includes(input)) && func.outputs.includes(output)
      }
    }
  })
