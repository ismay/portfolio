describe("work detail", () => {
  beforeEach(() => {
    cy.visit("/work/one");
  });

  it("renders as expected", () => {
    cy.percySnapshot("work detail page renders as expected");
  });

  it("has the expected links", () => {
    const links = [
      { href: "/", name: "Superwolff" },
      { href: "/", name: "Work" },
      { href: "/about", name: "About" },
    ];

    links.forEach(({ href, name }) => {
      cy.findByRole("link", { name }).should("have.attr", "href", href);
    });
  });
});
