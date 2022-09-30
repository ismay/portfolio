const links = [
  { href: "/work/one", name: "One" },
  { href: "/work/two", name: "Two" },
  { href: "/work/three", name: "Three" },
];

const images = ["One", "Two", "Three"];

describe("home", () => {
  it("renders as expected", () => {
    cy.visit("/");

    // Ensure expected links are all present
    links.forEach(({ href, name }) => {
      cy.findByRole("link", { name }).should("have.attr", "href", href);
    });

    // Ensure images have all been loaded before screenshotting
    images.forEach((title) => {
      cy.findByRole("img", { name: title })
        .should("be.visible")
        .and(($img) => {
          expect(
            $img[0].naturalWidth,
            "image has natural width"
          ).to.be.greaterThan(1);
        });
    });

    cy.percySnapshot("home page renders as expected");
  });
});
