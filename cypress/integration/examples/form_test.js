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
    cy.get('input[name="password"]')
      .type("cats12345")
      .should("have.value", "cats12345");
    cy.get('[type="checkbox"]').check();
    cy.get("button").click();
    cy.wait(2000);
    cy.get('input[name="name"]')
      .type("myco")
      .clear();
  });
});
