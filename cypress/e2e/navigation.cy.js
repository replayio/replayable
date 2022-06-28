describe("navigation", () => {
  beforeEach("it visits page", () => {
    cy.visit("/");
  });
  it("navigates to About", () => {
    cy.contains("a", "About").click();
    cy.contains(
      "Replayable is a collection of Github Issues that include replays."
    );
    cy.url().should("include", "about");
  });
  it("navigates to OSS Guide", () => {
    cy.contains("OSS Guide").invoke("removeAttr", "target").click();
    cy.url().should(
      "include",
      "https://docs.replay.io/docs/replay-oss-751fc053a0a14c32812c4766d7c65e4d"
    );
  });
  it("navigates to Issue", () => {
    cy.get(".issue-link").first().invoke("removeAttr", "target").click();
    cy.url().should("include", "github.com");
  });
  it("navigates to Replay", () => {
    cy.get(".replay-link")
      .first()
      .invoke("removeAttr", "target")
      .click({ force: true });
    cy.url().should("include", "replay.io");
  });
});
