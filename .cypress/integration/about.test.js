describe("about", () => {
  it("renders as expected", () => {
    cy.visit("/about");
    cy.injectAxe();

    cy.checkA11y();
    cy.percySnapshot("about page renders as expected");
  });
});
