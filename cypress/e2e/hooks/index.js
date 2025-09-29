import { Before } from "@badeball/cypress-cucumber-preprocessor";

Before(() => {
  Cypress.env("env", Cypress.env("prod"));
});
