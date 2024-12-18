/// <reference types="cypress" />

describe('Login Admin Test', () => {
  
  const email = 'system';
  const password = 'boca';
  const url = 'http://localhost:8000/index.php'

  it('Should log in successfully', () => {
    cy.visit(url);

    // Insert data
    cy.get('#loginUser').type(email)
    cy.get('#loginPassword').type(password)
    cy.get('#loginSubmit').click();

    // Verifity successful login
    cy.get('Login').should('not.exist')

  });
});