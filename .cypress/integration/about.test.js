describe("about", () => {
  it("renders as expected", () => {
    cy.visit("/about");

    cy.percySnapshot("about page renders as expected");
  });
});
