'use babel'

export default (functions, library_name, library_base_URLs, inputs, output) => (
  functions.filter((func) => (
    func.inputs.slice().sort().toString() === inputs.slice().sort().toString() && func.output === output)
  ).map((func) => (
    Object.assign({
      library: library_name,
      resources: library_base_URLs.map((base_URL, index) => {
        switch (library_name) {
          case "ECMAScript 6":
            switch (index) {
              case 0: // ES6 spec
                return ({
                  website: "ECMAScript 6",
                  URL: base_URL[0] + inputs[0] + base_URL[1] + func.name.toLowerCase()
                })
                break;
              case 1: // WebPlatform
                return ({
                  website: "WebPlatform",
                  URL: base_URL + `${inputs[0].replace(/^[a-z]/, (match) => match.toUpperCase())}/${func.name}`
                })
                break;
              case 2: // MDN
                return ({
                  website: "MDN",
                  URL: base_URL + `${inputs[0]}/${func.name}`
                })
                break;
              default:

            }
            break;
          case "Ramda":
            return ({
              website: "Ramda",
              URL: base_URL + func.name
            })
            break;
          default:

        }
      })
    }, func)
  ))
)
