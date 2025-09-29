import { mapRoute } from "../routes";

const { map } = require("../components");

export const visit = name => {
  cy.visit(`${Cypress.env("env").base_url}${mapRoute(name)}`);
};

export const click = (name, iframe) => {
  getIframeContext(iframe).within(() => {
    cy.get(map(name)).click();
  });
};

export const write = (id, text, iframe) => {
  getIframeContext(iframe).within(() => {
    cy.getVisibleElement(map(id)).type(text);
    cy.get(map(id)).then($body => {
      if ($body.find("input").length) {
        cy.getVisibleElement(`${map(id)} input`).should("have.value", text, `Must be expected that ${id} has value equal to ${text}`);
        return;
      }
      cy.getVisibleElement(map(id)).should("have.value", text, `Must be expected that ${id} has value equal to ${text}`);
    });
  });
};

export const select = (id, option, iframe) => {
  getIframeContext(iframe).within(() => {
    cy.get(map(id)).should("be.visible");
    cy.get(map(id)).select(option);
  });
};

export const checkRequiredInput = (id, iframe) => {
  getIframeContext(iframe).within(() => {
    cy.focused().closest(map(id)).should("exist");
  });
};

export const checkInvalidInput = (id, iframe) => {
  getIframeContext(iframe).within(() => {
    cy.get(map(id)).should("match", ":invalid");
  });
};

export const checkValidationInput = (message, id, iframe) => {
  getIframeContext(iframe).within(() => {
    cy.get(`${map(id)}Error`).should("be.visible");
    cy.get(`${map(id)}Error`).should("have.text", message);
  });
};

export const checkText = (message, id, iframe) => {
  getIframeContext(iframe).within(() => {
    cy.get(`${map(id)}`).should("be.visible");
    cy.get(`${map(id)}`).should("have.text", message);
  });
};

export const getIframeContext = iframe => {
  return iframe ? cy.get(iframe, { timeout: 20000 }).its("body").should("not.be.empty") : cy.document().its("body");
};
