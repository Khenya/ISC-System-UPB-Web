/// <reference types="cypress" />

describe('Login Docente Test', () => {
  
    const email = 'alexismarechal@upb.edu';
    const password = '123456';
    const url = 'http://localhost:5173/login'
  
    it('Should log in successfully', () => {
      cy.visit(url);
  
      
      cy.get('input[name=email]').type(email)
      cy.get('input[name=password]').type(password)
      cy.contains('Login').click();
  
      
      cy.get('Login').should('not.exist')
  
    });
  });