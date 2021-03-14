/// <reference types="cypress" />

context('Actions', () => {
  beforeEach(() => {
    cy.visit('http://localhost:8080/#/');
  });

  // https://on.cypress.io/interacting-with-elements

  it('Create new report and add it to the reports list', () => {
    cy.get('[data-cy=tags-td]').should('have.length', 4);
    cy.get('button')
      .contains('New Report')
      .click();

    cy.hash().should('eq', '#/new');
    cy.get('[data-cy=report-name-input]').type('Report_New');

    cy.get('[data-cy=report-description-input]').type('Lorem Ipsum');

    cy.get('[data-cy=tags-select]').click();

    cy.get('div')
      .contains('Weekly')
      .click();

    cy.get('div')
      .contains('Invest')
      .click();

    cy.get('[data-cy=tags-select]').click();

    cy.get('button[type=submit]').click();

    cy.hash().should('eq', '#/');

    cy.get('[data-cy=tags-td]').should('have.length', 5);
  });
});
