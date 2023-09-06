/// <reference types="@testing-library/cypress" />

describe('The Home Page/Team Select', () => {
  beforeEach(() => {
    cy.visit('/');
  });

  it('successfully loads', () => {
    cy.findByRole('heading', {
      name: /Welcome, select your team/i,
    }).should('exist');
  });

  it('should let a user select a team and then progress to the dashboard', () => {
    cy.get('#teamDropdown').click();
    // select astros, which corresponds with our schedule and live data
    cy.get('#117').click();

    cy.findByRole('heading', {
      name: /Houston Astros/i,
    }).should('exist');
  });
});
