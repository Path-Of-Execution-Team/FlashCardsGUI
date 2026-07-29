describe('Home Page', () => {
  afterEach(() => {
    cy.then(() =>
      Cypress.automation('remote:debugger:protocol', {
        command: 'Emulation.setEmulatedMedia',
        params: { features: [] },
      })
    );
  });

  it('shows the refreshed content and switches language', () => {
    cy.visit('/en');

    cy.contains('Remember what matters.').should('be.visible');
    cy.contains('Create your first deck').should('be.visible');
    cy.contains('Less organizing. More remembering.').should('exist');

    cy.get('button[aria-label="Current language: EN"]').click();
    cy.get('[role="menuitem"]').contains('PL').click();
    cy.url().should('include', '/pl');
    cy.contains('Zapamiętaj to, co ważne.').should('be.visible');
  });

  it('follows the system dark mode preference', () => {
    cy.then(() =>
      Cypress.automation('remote:debugger:protocol', {
        command: 'Emulation.setEmulatedMedia',
        params: {
          features: [{ name: 'prefers-color-scheme', value: 'dark' }],
        },
      })
    );

    cy.visit('/en');

    cy.window().then(win => {
      cy.wrap(win.matchMedia('(prefers-color-scheme: dark)').matches).should('equal', true);
    });
    cy.get('body').should('have.css', 'background-color', 'rgb(16, 21, 18)');
    cy.get('header').should('have.css', 'background-color', 'rgba(16, 21, 18, 0.9)');

    cy.get('button[aria-label="Switch to light theme"]').click();
    cy.get('body').should('have.css', 'background-color', 'rgb(243, 240, 231)');
    cy.window().its('localStorage').invoke('getItem', 'mui-mode').should('equal', 'light');

    cy.reload();
    cy.get('body').should('have.css', 'background-color', 'rgb(243, 240, 231)');
  });
});
