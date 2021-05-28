describe("error", () => {
  it("renders an error page for non-existent routes", () => {
    cy.visit("/should-not-exist", { failOnStatusCode: false });
    cy.request({
      failOnStatusCode: false,
      timeout: 500,
      url: "/should-not-exist",
    }).then((response) => {
      expect(response.status).to.eq(404);
    });

    cy.percySnapshot("error page renders as expected");
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
