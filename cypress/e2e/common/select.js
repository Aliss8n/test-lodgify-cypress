import { defineStep as And } from '@badeball/cypress-cucumber-preprocessor'
import { select } from '../../support/actions'

And('I select {string} in the {string}', (option, id) => {
  iframe = Cypress.env('iframeId') ?? null
  if (option !== 'null' && option !== null) {
    select(id, option, iframe)
  }
})
