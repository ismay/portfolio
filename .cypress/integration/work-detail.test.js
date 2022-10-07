const nextPrefix = "/_next/static/development";
const devPagesManifest = `${nextPrefix}/_devPagesManifest.json`;
const devMiddlewareManifest = `${nextPrefix}/_devMiddlewareManifest.json`;

describe("work detail", () => {
  it("renders as expected", () => {
    cy.intercept(devPagesManifest).as("devPagesManifest");
    cy.intercept(devMiddlewareManifest).as("devMiddlewareManifest");

    cy.visit("/work/one");
    cy.wait(["@devPagesManifest", "@devMiddlewareManifest"]);

    // Ensure all images are done loading
    cy.get("[data-next-image]").should(($images) => {
      expect($images.get(0)).to.be.visible;
      expect($images.get(1)).to.be.visible;
      expect($images.get(2)).to.be.visible;
    });

    cy.get("[data-next-image]").should(($images) => {
      expect($images.get(0)).to.have.attr("data-loading", "false");
      expect($images.get(1)).to.have.attr("data-loading", "false");
      expect($images.get(2)).to.have.attr("data-loading", "false");
    });

    cy.percySnapshot("work detail page renders as expected");
  });
});
