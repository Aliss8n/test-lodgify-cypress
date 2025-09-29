import { defineStep as And } from '@badeball/cypress-cucumber-preprocessor'
import { write } from '../../support/actions'

And('I write {string} in the {string}', (text, id) => {
  iframe = Cypress.env('iframeId') ?? null
  if (text != 'null' && text !== null) write(id, text, iframe)
})
