describe("navigation", () => {
  beforeEach("it visits page", () => {
    cy.intercept("GET", "/api/search*", (req) => {
      if (req.url.includes("repo")) {
        req.alias = "searchRepo";
      } else {
        req.alias = "searchAll";
      }
    });
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
    // the following version of this test only works in Chrome due to Cypress limitations
    /* cy.contains("OSS Guide").invoke("removeAttr", "target").click();
    cy.url().should(
      "include",
      "https://docs.replay.io/docs/replay-oss-751fc053a0a14c32812c4766d7c65e4d"
    ); */
    // this version works in both because it just validates the href, doesn't click
    cy.contains("OSS Guide").should(
      "have.attr",
      "href",
      "https://replay.io/oss"
    );
  });
  it("navigates to Issue", () => {
    // the following version of this test only works in Chrome due to Cypress limitations
    /* cy.get(".issue-link").first().invoke("removeAttr", "target").click();
    cy.url().should("include", "github.com"); */
    // this version works in both because it just validates the href, doesn't click
    cy.get(".issue-link")
      .first()
      .should("have.attr", "href")
      .and("include", "github.com");
  });
  it("navigates to Replay", () => {
    // the following version of this test only works in Chrome due to Cypress limitations
    /* cy.get(".replay-link")
      .first()
      .invoke("removeAttr", "target")
      .click({ force: true });
    cy.url().should("include", "replay.io"); */
    // this version works in both because it just validates the href, doesn't click
    cy.get(".replay-link")
      .first()
      .should("have.attr", "href")
      .and("include", "replay.io");
  });
  it("should clear filters when navigating to the home page", () => {
    cy.visit("/?org=replayio&repo=devtools");
    cy.wait("@searchRepo");
    cy.get(".home-link").first().click();
    cy.wait("@searchAll");
    cy.get(".filter-repo").should("not.exist");
  });
});
