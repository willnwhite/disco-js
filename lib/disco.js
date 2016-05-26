'use babel'

export default (functions, inputs, output) => functions.filter((func) => func.inputs.slice().sort().toString() === inputs.slice().sort().toString() && func.output === output)
