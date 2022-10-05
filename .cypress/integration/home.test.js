const links = [
  { href: "/work/one", name: "One" },
  { href: "/work/two", name: "Two" },
  { href: "/work/three", name: "Three" },
];

describe("home", () => {
  it("renders as expected", () => {
    cy.visit("/");

    // Ensure expected links are all present
    links.forEach(({ href, name }) => {
      cy.findByRole("link", { name }).should("have.attr", "href", href);
    });

    // Ensure all images are done loading
    cy.get("[data-next-image]")
      .should("be.visible")
      .and("have.attr", "data-loading", "false");

    cy.percySnapshot("home page renders as expected");
  });
});
