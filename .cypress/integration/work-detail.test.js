const links = [
  { href: "/", name: "Superwolff" },
  { href: "/", name: "Work" },
  { href: "/about", name: "About" },
];

describe("work detail", () => {
  it("renders as expected", () => {
    cy.visit("/work/one");
    cy.injectAxe();

    // Ensure expected links are all present
    links.forEach(({ href, name }) => {
      cy.findByRole("link", { name })
        .should("have.attr", "href", href)
        .and("be.visible");
    });

    cy.checkA11y();
    cy.percySnapshot("work detail page renders as expected");
  });
});
