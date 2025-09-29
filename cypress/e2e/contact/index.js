import { defineStep as And, Then } from "@badeball/cypress-cucumber-preprocessor";
import { checkText } from "../../support/actions";

Then("I receive a success message {string} in the {string} element on the contact page", (message, elementId) => {
  iframe = Cypress.env("iframeId") ?? null;
  checkText(message, elementId, iframe);
});

And("I solve the CAPTCHA", () => {
  // TODO
  // Not implemented because this is only a test form without a CAPTCHA
  // This step is a placeholder for solving CAPTCHA manually or using a service.
  // In a QA environment, you might use a mock or a test CAPTCHA that can be solved automatically.
});
