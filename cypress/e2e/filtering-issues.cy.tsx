import "cypress";

describe("filtering issues", () => {
  beforeEach("it visits the page", () => {
    cy.visit("/");
  });
  it("filters by label", () => {
    // gets label text and creates closure to alias
    cy.get(".issue-label")
      .first()
      .then((label) => {
        const labelText = label.text();
        // clicks on label
        cy.get(".issue-label").first().click();
        // asserts label filter has the same text
        cy.get(".filter-label").contains(labelText);
      });
  });
  it("clears label filter", () => {
    // asserts filter label does not appear
    cy.get(".filter-label").should("not.exist");
    // clicks a label
    cy.get(".issue-label").first().click();
    // asserts filter label appears and get its text
    cy.get(".filter-label").then((label) => {
      const labelText = label.text();
      // clicks on label with matching text
      cy.contains(".issue-label", labelText).click();
      // asserts filter label does not appear
      cy.get(".filter-label").should("not.exist");
    });
  });
  it("filters by repo", () => {
    // gets repo text and creates closure to alias
    cy.get(".repo-link")
      .first()
      .then((repoLink) => {
        // had to add trim because the repo filter link is formatted with an extra space
        const repoName = repoLink.text().trim();
        // clicks on filter
        cy.get(".repo-link").first().click();
        // asserts repo filter has the same text
        cy.get(".filter-repo").contains(repoName);
      });
  });
  it("clears repo filter", () => {
    // asserts repo label does not appear
    cy.get(".filter-repo").should("not.exist");
    // clicks a repo link to filter
    cy.get(".repo-link").first().click();
    // asserts filter label appears and click to clear
    cy.get(".filter-repo").click();
    // assert filter label no longer appears
    cy.get(".filter-repo").should("not.exist");
  });
});
