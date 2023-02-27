import "cypress";

describe("view issues", () => {
  beforeEach("it visits the page and intercepts search route", () => {
    cy.intercept("GET", "/api/search*", (req) => {
      if (req.url.includes("OPEN")) {
        req.alias = "searchOpen";
      }
      if (req.url.includes("CLOSED")) {
        req.alias = "searchClosed";
      }
    });
    cy.visit("/");
  });
  it("shows open issues on page load", () => {
    // assert network request has OPEN state
    cy.wait("@searchOpen");
    // assert filters have correct style attributes
    cy.get(".view-Open").should("have.attr", "style", "font-weight: bold;");
    cy.get(".view-Closed").should(
      "have.attr",
      "style",
      "text-decoration: underline; cursor: pointer;"
    );
  });
  it("filters to closed issues on click", () => {
    // clicks on View Closed
    cy.get(".view-Closed").click();
    // assert network request has CLOSED state
    cy.wait("@searchClosed");
    // assert filters have correct style attributes
    cy.get(".view-Closed").should("have.attr", "style", "font-weight: bold;");
    cy.get(".view-Open").should(
      "have.attr",
      "style",
      "text-decoration: underline; cursor: pointer;"
    );
  });
  it("filters to open issues on click", () => {
    // clicks on View Closed to set up
    cy.get(".view-Closed").click();
    // assert network request has CLOSED state
    cy.wait("@searchClosed");
    // clicks on View Open
    cy.get(".view-Open").click();
    // assert network request has OPEN state
    cy.wait("@searchOpen");
    // assert filters have correct style attributes
    cy.get(".view-Open").should("have.attr", "style", "font-weight: bold;");
    cy.get(".view-Closed").should(
      "have.attr",
      "style",
      "text-decoration: underline; cursor: pointer;"
    );
  });
});
