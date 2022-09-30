describe("work detail", () => {
  it("renders as expected", () => {
    cy.visit("/work/one");

    // Ensure images have all been loaded before screenshotting
    cy.findAllByRole("img", { name: "One" }).each(($img) => {
      cy.wrap($img)
        .should("be.visible")
        .and(() => {
          expect(
            $img[0].naturalWidth,
            "image has natural width"
          ).to.be.greaterThan(1);
        });
    });

    cy.percySnapshot("work detail page renders as expected");
  });
});
