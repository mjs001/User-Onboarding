describe("testing form inputs", function() {
  beforeEach(function() {
    cy.visit("http://localhost:3000/");
  });
  it("Adds text to inputs and submits form", function() {
    cy.get('input[name="name"]')
      .type("myco")
      .should("have.value", "myco");
    cy.get('input[name="email"]')
      .type("email1@email.com")
      .should("have.value", "email1@email.com");
  });
});
