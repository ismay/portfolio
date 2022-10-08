const nextPrefix = "/_next/static/development";
const devPagesManifest = `${nextPrefix}/_devPagesManifest.json`;
const devMiddlewareManifest = `${nextPrefix}/_devMiddlewareManifest.json`;

const links = [
  { href: "/work/one", name: "One" },
  { href: "/work/two", name: "Two" },
  { href: "/work/three", name: "Three" },
];

describe("home", () => {
  it("renders as expected", () => {
    cy.intercept(devPagesManifest).as("devPagesManifest");
    cy.intercept(devMiddlewareManifest).as("devMiddlewareManifest");

    cy.visit("/");
    cy.wait(["@devPagesManifest", "@devMiddlewareManifest"]);

    // Ensure expected links are all present
    links.forEach(({ href, name }) => {
      cy.findByRole("link", { name }).should("have.attr", "href", href);
    });

    // Ensure all images are done loading
    cy.get("[data-next-image]").each(($img) => {
      cy.wrap($img)
        .should("be.visible")
        .and("have.attr", "data-loading", "false");
    });

    cy.percySnapshot("home page renders as expected");
  });
});
