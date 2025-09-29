import { defineStep as Then } from "@badeball/cypress-cucumber-preprocessor";
import { checkRequiredInput, checkInvalidInput, checkValidationInput } from "../../support/actions";

Then("I receive the required message in the {string}", id => {
  iframe = Cypress.env("iframeId") ?? null;
  checkRequiredInput(id, iframe);
});

Then("I receive the invalid message in the {string}", id => {
  iframe = Cypress.env("iframeId") ?? null;
  checkInvalidInput(id, iframe);
});

Then("I receive the validation message {string} in the {string}", (message, id) => {
  iframe = Cypress.env("iframeId") ?? null;
  checkValidationInput(message, id, iframe);
});
