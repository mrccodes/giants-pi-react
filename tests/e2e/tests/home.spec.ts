/// <reference types="@testing-library/cypress" />

describe('The Home Page', () => {
  it('successfully loads', () => {
    cy.visit('/');
    cy.findByRole('heading', {
      name: /Welcome, select your team/i,
    }).should('exist');
  });
});
