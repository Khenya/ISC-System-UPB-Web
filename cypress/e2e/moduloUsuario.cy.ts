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

describe('Create new student', () => {   
  const code = Math.floor(Math.random() * 100000);
  const name = `Student${code}`;
  const lastname = `lastname${code}`;
  const mothername = `mothername${code}`;
  const emailS = `Student${code}@gmail.com`;
  const phone = `70${code}`;

  beforeEach(() => {
    cy.login(email, password);
  });

  it('Create new user fail', () => {
      cy.intercept('GET', '/users/', {
        statusCode: 200,
        body: []
      }).as('getUsers');
      
      // users
      cy.get('svg')
        .find('path[d="M4 6H2v14c0 1.1.9 2 2 2h14v-2H4zm16-4H8c-1.1 0-2 .9-2 2v12c0 1.1.9 2 2 2h12c1.1 0 2-.9 2-2V4c0-1.1-.9-2-2-2m-6 2c1.66 0 3 1.34 3 3s-1.34 3-3 3-3-1.34-3-3 1.34-3 3-3m6 12H8v-1.5c0-1.99 4-3 6-3s6 1.01 6 3z"]')
        .click();

      // new user
      cy.contains('button', 'Agregar Usuario').scrollIntoView().click();
      cy.get('#name').type(name);
      cy.get('#lastname').type(lastname);
      cy.get('#mothername').type(mothername);
      cy.get('#code').type(code.toString());
      cy.get('#email').type(emailS);
      cy.get('#phone').type(phone);
      cy.get('#mui-component-select-roles').click();
      cy.get('[role="listbox"] li').first().click();
      
    
    
      // don't save
      cy.contains('button', 'CERRAR').should('be.visible').click();
  });


    
    it('Create new user', () => {
      cy.intercept('GET', '/users/', {
        statusCode: 200,
        body: [] 
      }).as('getUsers');
      
      
      cy.get('svg')
        .find('path[d="M4 6H2v14c0 1.1.9 2 2 2h14v-2H4zm16-4H8c-1.1 0-2 .9-2 2v12c0 1.1.9 2 2 2h12c1.1 0 2-.9 2-2V4c0-1.1-.9-2-2-2m-6 2c1.66 0 3 1.34 3 3s-1.34 3-3 3-3-1.34-3-3 1.34-3 3-3m6 12H8v-1.5c0-1.99 4-3 6-3s6 1.01 6 3z"]')
        .click();

      
      cy.contains('button', 'Agregar Usuario').scrollIntoView().click();
      cy.get('#name').type(name);
      cy.get('#lastname').type(lastname);
      cy.get('#mothername').type(mothername);
      cy.get('#code').type(code.toString());
      cy.get('#email').type(emailS);
      cy.get('#phone').type(phone);
      cy.get('#mui-component-select-roles').click();
      cy.get('[role="listbox"] li').first().click();
     
    
      cy.contains('button', 'GUARDAR').should('be.visible').click();
  });
});
