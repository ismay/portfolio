describe("home", () => {
  beforeEach(() => {
    cy.visit("/");
  });

  it("renders as expected", () => {
    cy.percySnapshot("home page renders as expected");
  });

  it("has the expected links", () => {
    const links = [
      { href: "/", name: "Superwolff" },
      { href: "/", name: "Work" },
      { href: "/about", name: "About" },
      { href: "/work/one", name: "One" },
      { href: "/work/two", name: "Two" },
      { href: "/work/three", name: "Three" },
    ];

    links.forEach(({ href, name }) => {
      cy.findByRole("link", { name }).should("have.attr", "href", href);
    });
  });
});
