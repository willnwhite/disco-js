'use babel'

import disco from "./disco.js";
// import types_and_synonyms from './types_and_synonyms.json';
// import wordToType from './word_mapping.js';
import Ramda from './functions/Ramda.json';
import ES6 from './functions/ECMAScript_6.json'; // FIXME array:number Array URL doesn"t work (don"t fit object/method pattern)

export default class DiscoJsView {

  constructor(serializedState) {

    // Create root element
    this.element = document.createElement('div');
    this.element.classList.add('disco-js')

    this.element.setAttribute('style', 'text-align: center; overflow: auto')

    this.inputs = []
    this.output = ''

    // Create form
    const form = document.createElement('form')
    form.addEventListener('submit', (event) => {
      const inputs = this.inputs.filter((input) => input !== ""),
      libraries = [ES6, Ramda] // TODO all libraries

      let answers = []
      libraries.forEach((library) => {
        answers = answers.concat(disco(library.functions, library.name, library.base_URLs, inputs, this.output))
      })
      this.render(answers)
    })
    this.element.appendChild(form)

    // Create form layout element
    const fieldsLayout = document.createElement('div')
    fieldsLayout.setAttribute('style', 'display: flex; flex-direction: column; justify-content: center')
    form.appendChild(fieldsLayout)

    // Create Have input
    const inputLabel = document.createElement('label')
    fieldsLayout.appendChild(inputLabel)
    inputLabel.textContent = "Have"

    // Combo box (e.g. http://www.scriptol.com/html5/forms.php) doesn't work: https://github.com/electron/electron/issues/360

    const inputSelect = document.createElement('select')
    inputSelect.addEventListener('change', (event) => {
      this.inputs[0] = event.target.value
    })
    inputLabel.appendChild(inputSelect)

    const types = ['array', 'boolean', 'number', 'string', 'object', 'undefined']

    types.forEach((type) => {
      const option = document.createElement('option');
      option.textContent = type
      inputSelect.appendChild(option)
    })
    this.inputs[0] = inputSelect.value

    // Create more Have inputs
    const createInputField = (newInputIndex) => {
      const label = document.createElement('label');
      fieldsLayout.insertBefore(label, addInputField)
      label.textContent = "And"

      const select = document.createElement('select')
      select.addEventListener('change', (event) => {
        this.inputs[newInputIndex] = event.target.value
      })
      label.appendChild(select)

      select.appendChild(document.createElement('option')) // blank option

      types.forEach((type) => {
        const option = document.createElement('option');
        option.textContent = type
        select.appendChild(option)
      })
      this.inputs[newInputIndex] = select.value
    }

    // Create add Have input button
    const addInputField = document.createElement('button')
    addInputField.setAttribute('type', 'button')
    addInputField.textContent = '+'
    addInputField.addEventListener('click', () => {
      createInputField(this.inputs.length)
      this.inputs.push('')
      console.log(this.inputs);
    })
    fieldsLayout.appendChild(addInputField)

    // Create Want input
    const outputLabel = document.createElement('label')
    fieldsLayout.appendChild(outputLabel)
    outputLabel.textContent = "Want"

    const outputSelect = document.createElement('select')
    outputSelect.addEventListener('change', (event) => {
      this.output = event.target.value
    })
    outputLabel.appendChild(outputSelect)

    types.forEach((type) => {
      const option = document.createElement('option');
      option.textContent = type
      outputSelect.appendChild(option)
    })
    this.output = outputSelect.value

    // Create submit button
    const button = document.createElement('button')
    button.setAttribute('type', 'submit')
    button.textContent = 'Disco'
    form.appendChild(button)

    // Create functions element
    this.functionsElement = document.createElement('div')
    this.functionsElement.setAttribute('style', 'overflow: auto')
    this.element.appendChild(this.functionsElement)
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

    if (functions.length === 0) return

    functions.map((func) => {
      return (
        `<hr>
        <h1>${func.name}</h1>
        <p>${func.host || ""}</p>
        <p>${func.version || ''}</p>
        <p>${func.elementTypeDependent === true ? 'if ' + this.inputs[0] + ' includes a ' + this.output : ''}</p>
        ${func.resources.map((resource) => `<a href="${resource.URL}">${resource.website}</a>`).join(' ')}`
      ) // TODO 'click' insert func at cursor in text editor with calling syntax (2 => (2).toString()). Hook into existing snippets.
    }).forEach((func) => {
      this.functionsElement.innerHTML += func
    })
  }

}
