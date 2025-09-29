// Here we have the commands for use in all pages

import { attach } from "@badeball/cypress-cucumber-preprocessor";

Cypress.Commands.add("attachInfoOnReport", message => {
  attach(message);
});

Cypress.Commands.add("getVisibleElement", selector => {
  return cy.get(selector).should("be.visible", `Expected that element ${selector} is visible, but is not`);
});
