'use babel'

export default (functions, inputs, output) =>
  functions.filter((func) => (
    func.inputs.slice().sort().toString() === inputs && func.output === output)
  )
