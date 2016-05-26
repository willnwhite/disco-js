'use babel';

import disco from "./disco.js";
// import {ScrollView} from 'atom-space-pen-views'
import wordToType from './word_mapping.js';
import { map } from './word_mapping.js';
import Ramda from './functions/Ramda.json';
import ES6 from './functions/ECMAScript_6.json'; // FIXME array:number Array URL doesn"t work (don"t fit object/method pattern)


export default class DiscoJsView {

  constructor(serializedState) {

    // Create root element
    this.element = document.createElement('div');
    this.element.classList.add('disco-js')

    this.element.setAttribute('style', 'text-align: center; overflow: auto')

    this.input = ''
    this.output = ''

    // Create form
    const form = document.createElement('form')
    form.addEventListener('submit', (event) => {
      let input = this.input, output = this.output
      const wordMap = map;
      let inputValid, outputValid, words = []

      for (var type in wordMap) {
        words = words.concat(wordMap[type])
      }
      console.log(words);
      if (words.includes(input.toLowerCase())) {
        inputValid = true
      } else {
        inputValid = false
      }
      if (words.includes(output.toLowerCase())) {
        outputValid = true
      } else {
        outputValid = false
      }

      const types = ['array', 'boolean', 'number', 'object', 'string'] // TODO get from data

      if (!types.includes(this.input.toLowerCase()) && inputValid === true) {
        input = wordToType(this.input.toLowerCase())[0]
      }
      if (!types.includes(this.output.toLowerCase()) && outputValid === true) {
        output = wordToType(this.output.toLowerCase())[0]
      }
      if (inputValid === true && outputValid === true) {
        const libraries = [ES6, Ramda] // TODO all libraries
        let answers = []
        libraries.forEach((library) => {
          answers = answers.concat(disco(library.functions, [input], output))
        })
        this.render(answers)
      } else this.render([])
    })
    this.element.appendChild(form)

    // Create form layout element
    const inputsLayout = document.createElement('div')
    inputsLayout.setAttribute('style', 'display: flex; flex-direction: column; justify-content: center')
    form.appendChild(inputsLayout)

    const createInputs = (parentElement, inputName, autofocus) => {
      const label = document.createElement('label');
      parentElement.appendChild(label)
      if (inputName === "input") {
        label.textContent = "Have"
      } else if (inputName === "output") {
        label.textContent = "Want"
      }

      const input = document.createElement('input')
      if (autofocus === true) {
        input.setAttribute('autofocus', true)
      }
      input.addEventListener('input', (event) => {
        this[inputName] = event.target.value
      })
      label.appendChild(input)
    }

    // Create Have and Want inputs
    createInputs(inputsLayout, "input", true)
    createInputs(inputsLayout, "output", false)

    // Create button
    const button = document.createElement('button')
    button.setAttribute('type', 'submit')
    button.textContent = 'Disco'
    form.appendChild(button)

    // Create methods element
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

    functions.map((functio) => {
      let name, host, version, elementTypeDependent

      if (typeof functio === 'object') {
        name = functio.name
        host = functio.host
        version = functio.version
        elementTypeDependent = functio.elementTypeDependent
      } else {
        name = functio
      }

      const MDN = ES6.base_URLs[2] + `${wordToType(this.input.toLowerCase())[0]}/${name}`
      const WebPlatform = ES6.base_URLs[1] + `${wordToType(this.input.toLowerCase())[0].replace(/^[a-z]/, (match) => match.toUpperCase())}/${name}`

      // Create
      return (
        `<hr>
        <h1>${name}</h1>
        <p>${host || ""}</p>
        <p>${version || ''}</p>
        <p>${elementTypeDependent === true ? 'if ' + this.input + ' includes a ' + this.output : ''}</p>
        <a href="${ES6.base_URLs[0][0] + wordToType(this.input.toLowerCase())[0] + ES6.base_URLs[0][1] + name}">${ES6.name}</a>
        <a href="${WebPlatform}">WebPlatform</a> <a href="${MDN}">MDN</a>
        <a href="${Ramda.base_URL + name}">${Ramda.name}</a>`
      ) // TODO 'click' insert functio at cursor in text editor with calling syntax (2 => (2).toString()). Hook into existing snippets.
    }).forEach((functio) => {
      this.functionsElement.innerHTML += functio
    })
  }

}
