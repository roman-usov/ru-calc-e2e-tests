/// <reference types="cypress" />

import '../support/commands';

describe('calculator', () => {
  beforeEach(() => {
    cy.visit('/');
  });

  it('correctly handles normal calculations', () => {
    cy.getCalculatorButton('4').click();
    cy.getCalculatorButton('.').click();
    cy.getCalculatorButton('1').click();
    cy.get('.primary-operand').should('have.text', '4.1');
    cy.getCalculatorButton('+').click();
    cy.get('.primary-operand').should('have.text', '0');
    cy.get('.secondary-operand').should('have.text', '4.1');
    cy.get('.history > [data-operation]').should('have.text', '+');
    cy.getCalculatorButton('6').click();
    cy.get('.primary-operand').should('have.text', '6');
    cy.getCalculatorButton('=').click();
    cy.get('.secondary-operand').should('have.text', '');
    cy.get('.history > [data-operation]').should('have.text', '');
    cy.get('.primary-operand').should('have.text', '10.1');
  });

  it('correctly handles all clear', () => {
    cy.getCalculatorButton('4').click();
    cy.getCalculatorButton('+').click();
    cy.getCalculatorButton('6').click();
    cy.getCalculatorButton('AC').click();
    cy.get('.secondary-operand').should('have.text', '');
    cy.get('.history > [data-operation]').should('have.text', '');
    cy.get('.primary-operand').should('have.text', '0');
  });

  it('correctly handles del', () => {
    cy.getCalculatorButton('4').click();
    cy.getCalculatorButton('6').click();
    cy.getCalculatorButton('DEL').click();
    cy.get('.primary-operand').should('have.text', '4');
    cy.getCalculatorButton('DEL').click();
    cy.get('.primary-operand').should('have.text', '0');
  });
});
