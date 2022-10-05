describe("work detail", () => {
  it("renders as expected", () => {
    cy.visit("/work/one");

    // Ensure all images are done loading
    cy.get("[data-next-image]")
      .should("be.visible")
      .and("have.attr", "data-loading", "false");

    cy.percySnapshot("work detail page renders as expected");
  });
});
