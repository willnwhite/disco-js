'use babel'

import flattenDeep from 'lodash.flattendeep';
import uniq from 'lodash.uniq';

import disco from "./disco.js";
import Ramda from './functions/Ramda.json';
import siblingOrCousinNodes from './functions/siblingsCousins.json';
import ES6 from './functions/ECMAScript_6.json'; // FIXME array:number Array URL doesn"t work (don"t fit object/method pattern)

export default class DiscoJsView {

  constructor(serializedState) {

    // Create root element
    this.element = document.createElement('div');
    this.element.classList.add('disco-js')

    this.element.setAttribute('style', 'text-align: center; overflow: auto')

    this.inputs = []
    this.output = ''

    const element = (parentElement, type) => // {"name": "element", "inputs": ["Element", "string"], "output": "Element"}
      parentElement.appendChild(document.createElement(type))

    const submissions = [Ramda, ES6, siblingOrCousinNodes];

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
              {references: submission.references.map((reference, index) => {
                switch (reference.name) {
                  case "ECMAScript 6":
                  return ({
                    name: "ECMAScript 6",
                    URL: reference.base_URL[0] + inputs[0] + reference.base_URL[1] + func.name.toLowerCase()
                  })
                  break;
                  case "WebPlatform":
                  return ({
                    name: "WebPlatform",
                    URL: reference.base_URL + `${inputs[0].replace(/^[a-z]/, (match) => match.toUpperCase())}/${func.name}`
                  })
                  break;
                  case "MDN":
                  return ({
                    name: "MDN",
                    URL: reference.base_URL + `${inputs[0]}/${func.name}`
                  })
                  break;
                  case "Ramda":
                  return ({
                    name: "Ramda",
                    URL: reference.base_URL + func.name
                  })
                  break;
                  default:
                }
              })
            }, func)
          })
        }
      }))

      this.render(disco(functions, inputs.slice().sort().toString(), this.output))
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
    inputLabel.textContent = "Have "

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
      label.textContent = "And"

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

    // Create add Have input button
    const addInputButton = element(fieldsLayout, 'button')
    addInputButton.setAttribute('type', 'button')
    addInputButton.textContent = '+'
    addInputButton.addEventListener('click', () => {
      createInputSelect(this.inputs.length)
      this.inputs.push('')
    })

    // Create Want input
    const outputLabel = element(fieldsLayout, 'label')
    outputLabel.textContent = "Want "

    const outputSelect = element(outputLabel, 'select')
    outputSelect.addEventListener('change', (event) => {
      this.output = event.target.value
    })

    const outputTypes = uniq(flattenDeep(submissions.map(func => {
      if (func.hasOwnProperty("functions") === false) { // function
        return func.output
      } else { // collection of functions
        return func.functions.map((func) => func.output)
      }
    })))

    outputTypes.forEach((type) => {
      const option = element(outputSelect, 'option');
      option.textContent = type
    })
    this.output = outputSelect.value

    // Create submit button
    const button = element(form, 'button')
    button.setAttribute('type', 'submit')
    button.textContent = 'Disco'

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

    functions.map((func) =>
      `
      <hr>
      <h1>${func.name}</h1>
      <p>${func.host || ""}</p>
      <p>${func.version || ''}</p>
      <p>${func.elementTypeDependent === true ? 'if ' + this.inputs[0] + ' includes a ' + this.output : ''}</p>
      ${func.references.map((reference) =>
        `<a href="${reference.URL}">${reference.name || (new URL(reference)).host}</a>`
      ).join(' ')}`
    ).forEach((html) =>
      this.functionsElement.innerHTML += html
    )
  }

}
