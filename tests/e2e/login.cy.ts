describe('Login page', () => {
  const loginUrl = '/pl/login';

  it('pokazuje błędy walidacji przy pustym formularzu', () => {
    cy.visit(loginUrl);

    cy.get('[data-testid="login-submit"]').click();

    cy.contains('Login jest wymagany').should('be.visible');
    cy.contains('Hasło musi mieć co najmniej 6 znaków').should('be.visible');
  });

  it('wysyła poprawne dane do API i zapisuje token + redirect', () => {
    cy.intercept('POST', '**/auth/login', {
      statusCode: 200,
      body: 'FAKE_JWT',
    }).as('loginRequest');

    cy.visit(loginUrl);

    cy.get('[data-testid="login-input"]').type('Puszmen12');
    cy.get('[data-testid="password-input"]').type('zaq1@WSX');

    cy.get('[data-testid="login-submit"]').click();

    cy.wait('@loginRequest').its('request.body').should('deep.equal', {
      identifier: 'Puszmen12',
      password: 'zaq1@WSX',
    });

    cy.getCookie('authToken').should('exist').its('value').should('eq', 'FAKE_JWT');

    cy.url().should('match', /\/pl\/?$/);
  });

  it('pokazuje komunikat o błędnych danych logowania przy 401', () => {
    cy.intercept('POST', '**/auth/login', {
      statusCode: 401,
      body: { message: 'Invalid credentials' },
    }).as('loginRequest');

    cy.visit(loginUrl);

    cy.get('[data-testid="login-input"]').type('zlyUser');
    cy.get('[data-testid="password-input"]').type('zleHaslo');

    cy.get('[data-testid="login-submit"]').click();

    cy.wait('@loginRequest');

    cy.contains('Nieprawidłowy login lub hasło').should('be.visible');

    cy.url().should('include', '/pl/login');
  });
});
