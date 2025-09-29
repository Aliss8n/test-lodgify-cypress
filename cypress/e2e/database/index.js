import { defineStep as When, Then } from "@badeball/cypress-cucumber-preprocessor";

let userReservations = [];

When("I insert a user named {string}", name => {
  cy.task("insertUser", name).then(result => {
    expect(result).to.have.property("lastInsertRowid");
  });
});

Then("I should see a user named {string}", name => {
  cy.task("getUsers").then(users => {
    const names = users.map(user => user.name);
    expect(names).to.include(name);
  });
});

When("I query the reservations for user {string}", username => {
  cy.task("getReservationsByUser", username).then(reponse => {
    userReservations = reponse;
  });
});

Then("I should see a reservation at hotel {string} with check-in {string} and check-out {string}", (hotel, checkin, checkout) => {
  const found = userReservations.find(reponse => reponse.hotel_name === hotel && reponse.checkin_date === checkin && reponse.checkout_date === checkout);
  expect(found).to.not.be.undefined;
});
