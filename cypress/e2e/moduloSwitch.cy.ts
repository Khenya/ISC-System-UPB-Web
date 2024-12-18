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

describe('permisos', () => {   
  beforeEach(() => {
    cy.login(email, password);
  });

  it('switch', () => {
    cy.contains('span', 'Roles y permisos')
    .should('be.visible') 
    .click(); 
    cy.get('input.MuiSwitch-input')
    .check();
    cy.contains('button', 'Guardar')
    .click();
    cy.get('button.MuiButtonBase-root.MuiButton-containedPrimary.css-1nz221i-MuiButtonBase-root-MuiButton-root')
  .click();


  // verofocar el check
  cy.get('input.PrivateSwitchBase-input.MuiSwitch-input').should('be.checked');

  
  });

  it('switch fake', () => {
    cy.contains('span', 'Roles y permisos') 
    .should('be.visible') 
    .click(); 
    cy.get('input.MuiSwitch-input')
    .check();
    cy.contains('button', 'Guardar')
    .click();
    cy.get('button.MuiButtonBase-root.MuiButton-outlinedSecondary.css-idyqrg-MuiButtonBase-root-MuiButton-root')
    .click();
  
    // veriicar que no esta check
    cy.get('input').first().should('not.be.checked');



  });
  
  it('switch cancel', () => {

    cy.contains('span', 'Roles y permisos')
    .should('be.visible') 
    .click(); 
    cy.get('input.MuiSwitch-input')
    .check();
    cy.contains('button', 'Cancelar')
    .click();
    
    // verifica que no est check
    cy.get('input').first().should('not.be.checked');

  });
});
