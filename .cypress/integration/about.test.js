describe("about", () => {
  beforeEach(() => {
    cy.visit("/about");
  });

  it("renders as expected", () => {
    cy.percySnapshot("about page renders as expected");
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

  it("has an email link", () => {
    cy.findByRole("link", { name: "Email Superwolff" }).should(
      "have.attr",
      "href",
      "mailto:superwolff@superwolff.nl"
    );
  });

  it("has a working cv link", () => {
    const pdf = "/pdf/cv-superwolff.pdf";

    cy.findByRole("link", { name: "View CV" }).should("have.attr", "href", pdf);
    cy.request(pdf).then((response) => {
      expect(response.status).to.eq(200);
      expect(response.headers["content-type"]).to.eq("application/pdf");
    });
  });
});
