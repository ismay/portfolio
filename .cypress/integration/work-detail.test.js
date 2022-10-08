describe("work detail", () => {
  it("renders as expected", () => {
    cy.visit("/work/crypto-fascism");

    // Ensure all images are done loading
    cy.get("[data-gallery-image]").each(($img) => {
      cy.wrap($img)
        .scrollIntoView()
        .should("be.visible")
        .and("have.attr", "data-loading", "false");
    });

    cy.scrollTo("top", { ensureScrollable: false });
    cy.percySnapshot("work detail page renders as expected");
  });
});
