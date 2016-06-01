'use babel'

import flattenDeep from 'lodash.flattendeep';
import uniq from 'lodash.uniq';

import disco from "./disco.js";
import ES6 from './functions/ECMAScript_6.json'; // FIXME array:number Array URL doesn"t work (don"t fit object/method pattern)
import DOM from './functions/Document_Object_Model.json';
// TODO check JSON structure, e.g. that a function's inputs is an array, not a string
import allTheSame from './functions/allTheSame.json';

export default class DiscoJsView {

  constructor(serializedState) {

    // Create root element
    this.element = document.createElement('div');
    this.element.classList.add('disco-js')

    this.element.setAttribute('style', 'text-align: center; overflow: auto') // enables scrolling

    this.inputs = []
    this.output = ''

    const element = (parentElement, type) => // {"name": "element", "inputs": ["Element", "string"], "output": "Element"}
      parentElement.appendChild(document.createElement(type))

    const submissions = [ES6, DOM, allTheSame]

    // Create form
    const form = document.createElement('form')
    form.addEventListener('submit', (event) => {
      const inputs = this.inputs.filter((input) => input !== "")

      const functions = flattenDeep(submissions.map((submission) => {
        if (submission.hasOwnProperty('functions') === false) {
          return submission
        } else {
          const inputs = this.inputs.filter((input) => input !== "")
          return submission.functions.map((func) => {
            return Object.assign(
              {documentation: submission.documentation.map((reference) => {
                if (reference.hasOwnProperty('URL pattern') === false) {
                  return reference
                } else {
                  return ({
                    name: reference.name,
                    URL: reference["URL pattern"].map((part) => {
                      switch (part) {
                        case 'function name':
                          return func.name
                          break;
                        case 'lower case function name':
                          return func.name.toLowerCase()
                          break;
                        case 'input 1': // TODO make this work for input x
                          return func.inputs[0]
                          break;
                        case 'upper case first letter input 1': // TODO make this work for input x
                          return func.inputs[0].replace(/^[a-z]/, (match) => match.toUpperCase())
                          break;
                        default:
                          return part
                      }
                    }).join('')
                  })
                }
              }
            )}, func)
          })
        }
      }))

      this.render(disco(functions, inputs, this.output))
    })
    this.element.appendChild(form)

    // Create form layout element
    const fieldsLayout = element(form, 'div')
    fieldsLayout.setAttribute('style', 'display: flex; flex-direction: column; justify-content: center')

    // <div class='select-list popover-list'>
    //   <atom-text-editor mini>'User types here..'</atom-text-editor>
    //     <ol class='list-group'>
    //         <li class='selected'>one</li>
    //         <li>two</li>
    //         <li>three</li>
    //     </ol>
    // </div>

    // Create Have input
    const inputLabel = element(fieldsLayout, 'label')
    inputLabel.textContent = "Input: "

    // Combo box (e.g. http://www.scriptol.com/html5/forms.php) doesn't work: https://github.com/electron/electron/issues/360

    const inputSelect = element(inputLabel, 'select')
    inputSelect.addEventListener('change', (event) => {
      this.inputs[0] = event.target.value
    })

    const inputTypes = uniq(flattenDeep(submissions.map(func => {
      if (func.hasOwnProperty("functions") === false) { // function
        return func.inputs
      } else { // collection of functions
        return func.functions.map((func) => func.inputs)
      }
    })))

    inputTypes.forEach((type) => {
      const option = element(inputSelect, 'option')
      option.textContent = type
    })
    this.inputs[0] = inputSelect.value

    // Create more Have inputs
    const createInputSelect = (newInputIndex) => {
      const label = fieldsLayout.insertBefore(document.createElement('label'), addInputButton)
      label.textContent = "Input: "

      const select = element(label, 'select')
      select.addEventListener('change', (event) => {
        this.inputs[newInputIndex] = event.target.value
      })

      element(select, 'option') // blank option

      inputTypes.forEach((type) => {
        const option = element(select, 'option')
        option.textContent = type
      })
      this.inputs[newInputIndex] = select.value
    }

    // Create add Input button
    const addInputButton = element(fieldsLayout, 'button')
    addInputButton.setAttribute('type', 'button')
    addInputButton.textContent = 'Add input'
    addInputButton.addEventListener('click', () => {
      createInputSelect(this.inputs.length)
      this.inputs.push('')
    })
    // TODO Fix button width

    // Create Output input
    const outputLabel = element(fieldsLayout, 'label')
    outputLabel.textContent = "Output: "

    const outputSelect = element(outputLabel, 'select')
    outputSelect.addEventListener('change', (event) => {
      this.output = event.target.value
    })

    const outputTypes = uniq(flattenDeep(submissions.map(func => {
      const outputOrOutputs = (func) => {
        if (func.hasOwnProperty('output')) {
          return func.output
        } else if (func.hasOwnProperty('outputs')) {
          return func.outputs
        }
      }
      if (func.hasOwnProperty("functions") === false) { // function
        return outputOrOutputs(func)
      } else { // collection of functions
        return func.functions.map(func => outputOrOutputs(func))
      }
    })))

    element(outputSelect, 'option') // blank option
    outputTypes.forEach((type) => {
      const option = element(outputSelect, 'option');
      option.textContent = type
    })
    this.output = outputSelect.value

    // Create submit button
    const button = element(form, 'button')
    button.setAttribute('type', 'submit')
    button.textContent = 'Search'

    // Create functions element
    this.functionsElement = element(this.element, 'div')
    this.functionsElement.setAttribute('style', 'overflow: auto')
  }

  // Returns an object that can be retrieved when package is activated
  serialize() {}

  // Tear down any state and detach
  destroy() {
    this.element.remove();
  }

  getElement() {
    return this.element;
  }

  render(functions) {
    // Clear functionsElement
    this.functionsElement.innerHTML = null

    if (functions.length === 0) this.functionsElement.innerHTML = "<hr>No functions have been found with those inputs and output."

    functions.map((func) =>
      `
      <hr>
      <h1>${func.name}</h1>
      <p>${func.host || ""}</p>
      <p>${func.version || ''}</p>
      <p>${func.elementTypeDependent === true ? 'if ' + this.inputs[0] + ' includes a ' + this.output : ''}</p>
      ${func.documentation.map((reference) =>
        `<a href="${reference.hasOwnProperty('URL') ? reference.URL : reference}">${reference.hasOwnProperty('name') ? reference.name : (new URL(reference)).host}</a>`
      ).join(' ')}` // "If separator is an empty string, all elements are joined without any characters in between them." -> Show this in the list. Helped me decide between using join and toString to turn an array of URL parts into a URL string.
    ).forEach((html) =>
      this.functionsElement.innerHTML += html
    )
  }

}
