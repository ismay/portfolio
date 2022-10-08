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
    cy.get("[data-next-image]").each(($img) => {
      cy.wrap($img)
        .should("be.visible")
        .and("have.attr", "data-loading", "false");
    });

    cy.percySnapshot("work detail page renders as expected");
  });
});
