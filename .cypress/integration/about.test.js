const pdf = "/pdf/cv-superwolff.pdf";
const links = [
  { href: "/", name: "Superwolff" },
  { href: "/", name: "Work" },
  { href: "/about", name: "About" },
  {
    href: "https://theartling.com/en/print-artists/superwolff",
    name: "Buy prints at The Artling",
  },
];

describe("about", () => {
  it("renders as expected", () => {
    cy.visit("/about");

    // Ensure expected links are all present
    links.forEach(({ href, name }) => {
      cy.findByRole("link", { name })
        .should("have.attr", "href", href)
        .and("be.visible");
    });

    // Ensure there's an email link
    cy.findByRole("link", { name: "Email Superwolff" })
      .should("have.attr", "href", "mailto:superwolff@superwolff.nl")
      .and("be.visible");

    // Ensure the cv link works
    cy.findByRole("link", { name: "View CV" })
      .should("have.attr", "href", pdf)
      .and("be.visible");
    cy.request(pdf).then((response) => {
      expect(response.status).to.eq(200);
      expect(response.headers["content-type"]).to.eq("application/pdf");
    });

    cy.percySnapshot("about page renders as expected");
  });
});
