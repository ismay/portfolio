const links = [
  { href: "/work/crypto", name: "Crypto" },
  { href: "/work/sleep", name: "Sleep" },
  { href: "/work/extraordinary-rendition", name: "Extraordinary Rendition" },
  { href: "/work/enhanced-interrogation", name: "Enhanced Interrogation" },
];

describe("home", () => {
  it("renders as expected", () => {
    cy.visit("/");

    // Ensure expected links are all present
    links.forEach(({ href, name }) => {
      cy.findByRole("link", { name }).should("have.attr", "href", href);
    });

    // Ensure all images are done loading
    cy.get("[data-thumbnail-image]").each(($img) => {
      cy.wrap($img)
        .scrollIntoView()
        .should("be.visible")
        .and("have.attr", "data-loading", "false");
    });

    cy.scrollTo("top");
    cy.percySnapshot("home page renders as expected");
  });
});
