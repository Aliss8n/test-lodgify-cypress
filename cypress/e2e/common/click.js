import { defineStep as And } from '@badeball/cypress-cucumber-preprocessor'
import { click } from '../../support/actions'

And('I click on the {string}', (id) => {
  iframe = Cypress.env('iframeId') ?? null
  click(id, iframe)
})
