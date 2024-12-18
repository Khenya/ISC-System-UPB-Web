/// <reference types="cypress" />

const email = 'admin@gmail.com';
const password = '123456';

Cypress.Commands.add('login', (email, password) => {
  if (typeof email !== 'string' || typeof password !== 'string') {
      throw new Error('Email and password must be strings');
  }

  cy.visit('http://localhost:5173/login');
  cy.get('input[name=email]').type(email);
  cy.get('input[name=password]').type(password);
  cy.contains('Login').click();
});

describe('search and role', () => {   
  beforeEach(() => {
    cy.login(email, password);
  });

  it('search', () => {
      cy.intercept('GET', '/users/', {
        statusCode: 200,
        body: [] 
      }).as('getUsers');
      const name= "Jhonny Cabezas Gomez"
      // users
      cy.get('svg')
        .find('path[d="M4 6H2v14c0 1.1.9 2 2 2h14v-2H4zm16-4H8c-1.1 0-2 .9-2 2v12c0 1.1.9 2 2 2h12c1.1 0 2-.9 2-2V4c0-1.1-.9-2-2-2m-6 2c1.66 0 3 1.34 3 3s-1.34 3-3 3-3-1.34-3-3 1.34-3 3-3m6 12H8v-1.5c0-1.99 4-3 6-3s6 1.01 6 3z"]').click();
      cy.get('#table-search').type(name);
      // Verifica que el nombre completo "Jhonny Cabezas Gomez" está presente en la tabla
      cy.get('.MuiDataGrid-cell[data-field="fullName"]').should('contain.text', name);
  });
    it('filtro', () => {
      cy.intercept('GET', '/users/', {
        statusCode: 200,
        body: [] 
      }).as('getUsers');
      
      cy.get('svg').find('path[d="M4 6H2v14c0 1.1.9 2 2 2h14v-2H4zm16-4H8c-1.1 0-2 .9-2 2v12c0 1.1.9 2 2 2h12c1.1 0 2-.9 2-2V4c0-1.1-.9-2-2-2m-6 2c1.66 0 3 1.34 3 3s-1.34 3-3 3-3-1.34-3-3 1.34-3 3-3m6 12H8v-1.5c0-1.99 4-3 6-3s6 1.01 6 3z"]').click();
      cy.get('div[role="combobox"]').first().click();

      cy.get('li[data-value="admin"]').click();
      // verificar
      cy.get('div[role="combobox"]').should('be.visible');
      cy.get('.MuiChip-label').should('contain.text', 'admin');

  });
});
