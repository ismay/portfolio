const links = [
  { href: "/", name: "Superwolff" },
  { href: "/", name: "Work" },
  { href: "/about", name: "About" },
  { href: "/work/one", name: "One" },
  { href: "/work/two", name: "Two" },
  { href: "/work/three", name: "Three" },
  { href: "mailto:superwolff@superwolff.nl", name: "Email me" },
  {
    href: "https://theartling.com/en/print-artists/superwolff",
    name: "Buy prints at The Artling",
  },
];

describe("home", () => {
  it("renders as expected", () => {
    cy.visit("/");
    cy.injectAxe();

    // Ensure expected links are all present
    links.forEach(({ href, name }) => {
      cy.findByRole("link", { name })
        .should("have.attr", "href", href)
        .and("be.visible");
    });

    cy.checkA11y();
    cy.percySnapshot("home page renders as expected");
  });
});
