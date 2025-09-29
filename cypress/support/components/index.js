const contact = require("./contact");

export const map = name => {
  const idMap = {
    contact: {
      ...contact.default,
    },
  };

  cy.log("Parameter:", name);
  cy.log("Feature name:", Cypress.spec.fileName);

  let field = idMap[name] ? idMap[name] : idMap[Cypress.spec.fileName][name];
  return field || "undefined";
};
