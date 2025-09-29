import { defineStep as Given } from '@badeball/cypress-cucumber-preprocessor'
import { visit } from '../../support/actions'

Given('I visit {string}', (name) => {
  visit(name)
})
