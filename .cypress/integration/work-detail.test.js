describe("work detail", () => {
  it("renders as expected", () => {
    cy.visit("/work/one");

    cy.percySnapshot("work detail page renders as expected");
  });
});
