describe("work detail", () => {
  it("renders as expected", () => {
    cy.visit("/work/one");
    cy.injectAxe();

    cy.checkA11y();
    cy.percySnapshot("work detail page renders as expected");
  });
});
