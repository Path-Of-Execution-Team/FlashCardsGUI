describe('Home Page', () => {
  it('shows translated content and buttons', () => {
    cy.visit('/en');

    cy.contains('Welcome').should('exist');
    cy.contains('Click me').should('exist');

    cy.contains('Polish').should('exist');
    cy.contains('English').should('exist');

    cy.contains('Polish').click();
    cy.url().should('include', '/pl');
    cy.contains('Witaj').should('exist');
  });
});
