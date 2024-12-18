///<reference types="cypress" />

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
  const rol = `Rol${code}`;

  beforeEach(() => {
    cy.login(email, password);
  });

  it('edit rol', () => {
    cy.contains('span', 'Roles y permisos', { timeout: 10000 }).should('be.visible').click();
    cy.get('[data-testid="MoreHorizIcon"]').first().click();
    cy.get('[data-testid="EditIcon"]').click();

    
    //cy.get('input[name="nombre"]').clear().type('Nuevo Nombre');
    // cy.type('#:r39:').type(rol);
  });

  
  it('delete rol fake', () => {
    cy.contains('span', 'Roles y permisos', { timeout: 10000 }).should('be.visible').click();
    cy.get('[data-testid="MoreHorizIcon"]').first().click();
    cy.contains('p', 'Eliminar', { timeout: 10000 }).click();
    cy.contains('button', 'Cancelar', { timeout: 10000 }).click();

    // verificar
    cy.contains('student').should('exist');


  });

  it('delete rol', () => {
    cy.contains('span', 'Roles y permisos', { timeout: 10000 }).should('be.visible').click();
    cy.get('[data-testid="MoreHorizIcon"]').first().click();
    cy.contains('p', 'Eliminar', { timeout: 10000 }).click();
    cy.contains('button', 'Eliminar').click();

    // verificar que ya no existe 
    cy.contains('student').should('not.exist');

  });

});
