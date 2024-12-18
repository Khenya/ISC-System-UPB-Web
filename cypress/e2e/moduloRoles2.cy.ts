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

  const rol = "student";
  

  beforeEach(() => {
    cy.login(email, password);
  });

  it('roles-search', () => {
    cy.contains('span', 'Roles y permisos') .should('be.visible') .click(); 
    cy.get('#roles-search').type(rol);
    // verificar que rol existe
    cy.contains(rol).should('exist');
  
  });

  it('new rol', () => {
    cy.contains('span', 'Roles y permisos') .should('be.visible') .click(); 
    cy.contains('h6', 'Roles').parent() .find('button') .click(); 

    cy.get('input[aria-invalid="false"]').type(rol+code.toString());
    cy.get('button.MuiButton-containedPrimary').click();

    // con busqueda 
    cy.contains('span', 'Roles y permisos') .should('be.visible') .click(); 
    cy.get('#roles-search').type(rol+code.toString());
    // verificar que rol existe
    cy.contains(rol).should('exist');

  });

  it('new rol fake', () => {
    cy.contains('span', 'Roles y permisos') .should('be.visible') .click(); 
    cy.contains('h6', 'Roles').parent() .find('button') .click(); 

    cy.get('input[aria-invalid="false"]').type("New"+rol+code.toString()); 
    cy.contains('button', 'Cancelar').click();

        // con busqueda 
        cy.contains('span', 'Roles y permisos') .should('be.visible') .click(); 
        cy.get('#roles-search').type("New"+rol+code.toString());
        // verificar que rol no existe
        cy.contains("New"+rol+code.toString()).should('not.exist');
  });
});
