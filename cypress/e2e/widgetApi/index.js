import { defineStep as Given, When, Then } from "@badeball/cypress-cucumber-preprocessor";
import { mapRoute } from "../../support/routes";

let response;

Given("I give a widget header with valid information", () => {
  const headers = {
    referer: "https://www.lodgify.com/",
  };
  cy.wrap(headers).as("headers");
});

When("I submit a request GET to {string} with {string} id", (endpoint, widgetId) => {
  cy.get("@headers").then(headers => {
    cy.request({
      method: "GET",
      url: `${Cypress.env("env").api_url}${mapRoute(endpoint)}${widgetId}`,
      headers: headers,
      failOnStatusCode: false,
    }).then(res => {
      response = res;
      cy.wrap(res).as("response");
    });
  });
});

Then("The response status should be {int}", status => {
  cy.get("@response").its("status").should("eq", status);
});

Then("I successfully receive the widget information with {string} id", widgetId => {
  cy.get("@response")
    .its("body")
    .then(body => {
      const widget = body.find(w => w.id === widgetId);
      expect(widget).to.not.be.undefined;

      expect(widget).to.have.property("id", widgetId);
      expect(widget).to.have.property("status", "active");
      expect(widget).to.have.property("type", "floating");
      expect(widget).to.have.property("namespace").that.is.a("string");
      expect(widget).to.have.property("updated_at").that.is.a("string");

      expect(widget.views).to.be.an("array").that.is.not.empty;
      expect(widget.views[0]).to.have.property("id", "week-4");
      expect(widget.views[0]).to.have.property("url").that.includes(widgetId);

      expect(widget.site).to.be.an("array").that.is.not.empty;
      expect(widget.site[0]).to.have.property("domain", "lodgify.com");

      expect(widget.account_data).to.have.property("plan", "vbp_custom");
      expect(widget.account_data).to.have.property("features").that.includes("remove-branding");

      expect(widget.options).to.have.property("auto_toggle");
      expect(widget.options).to.have.property("bg_close");

      expect(widget.rulesets).to.be.an("array").that.is.not.empty;
      expect(widget.rulesets[0]).to.have.property("name").that.is.a("string");

      expect(widget.domains).to.have.property("replacement", "omcdn.lodgify.com");
    });
});
