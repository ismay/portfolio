describe("error", () => {
  it("renders as expected", () => {
    cy.visit("/should-not-exist", { failOnStatusCode: false });

    // Ensure the appropriate status code
    cy.request({
      failOnStatusCode: false,
      timeout: 500,
      url: "/should-not-exist",
    }).then((response) => {
      expect(response.status).to.eq(404);
    });

    cy.percySnapshot("error page renders as expected");
  });
});
