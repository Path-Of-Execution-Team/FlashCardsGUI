describe('Register page', () => {
  const registerUrl = '/pl/auth/register';

  const fillValidForm = () => {
    cy.get('[data-testid="register-username"]').type('Puszmen12');
    cy.get('[data-testid="register-email"]').type('puszmen@example.com');
    cy.get('[data-testid="register-confirm-email"]').type('puszmen@example.com');
    cy.get('[data-testid="password-input"]').type('Zaq1@WSX');
    cy.get('[data-testid="confirm-password-input"]').type('Zaq1@WSX');

    cy.get('input[type="checkbox"]').check({ force: true });
  };

  it('should show validation errors when the form is empty', () => {
    cy.visit(registerUrl);

    cy.get('[data-testid="submit-button"]').click();

    cy.contains('Nazwa użytkownika jest wymagana').should('be.visible');
    cy.contains('Nieprawidłowy adres email').should('be.visible');
    cy.contains('Nieprawidłowy adres email').should('be.visible');
    cy.contains(
      'Hasło musi zawierać co najmniej jedną wielką literę, jedną małą literę, jedną cyfrę i jeden znak specjalny. Długość minimalna to 8 znaków, maksymalna 100 znaków.'
    ).should('be.visible');
    cy.contains('Hasło musi mieć co najmniej 8 znaków').should('be.visible');
    cy.contains('Musisz zaakceptować warunki').should('be.visible');
  });

  it('should send correct data to API and redirect to login page', () => {
    cy.intercept('POST', '**/auth/register', {
      statusCode: 200,
      body: {},
    }).as('registerRequest');

    cy.visit(registerUrl);
    fillValidForm();

    cy.get('[data-testid="submit-button"]').click();

    cy.wait('@registerRequest').its('request.body').should('deep.equal', {
      username: 'Puszmen12',
      email: 'puszmen@example.com',
      password: 'Zaq1@WSX',
    });

    cy.url().should('include', '/pl/auth/login');
  });

  it('should show a field error returned from API (e.g. username taken)', () => {
    cy.intercept('POST', '**/auth/register', {
      statusCode: 400,
      body: {
        errors: [
          {
            field: 'username',
            message: 'Użytkownik o takiej nazwie już istnieje',
          },
        ],
      },
    }).as('registerRequest');

    cy.visit(registerUrl);
    fillValidForm();

    cy.get('[data-testid="submit-button"]').click();
    cy.wait('@registerRequest');

    cy.contains('Użytkownik o takiej nazwie już istnieje').should('be.visible');

    cy.url().should('include', '/pl/auth/register');
  });

  it('should show a generic server error on 500', () => {
    cy.intercept('POST', '**/auth/register', {
      statusCode: 500,
      body: {},
    }).as('registerRequest');

    cy.visit(registerUrl);
    fillValidForm();

    cy.get('[data-testid="submit-button"]').click();
    cy.wait('@registerRequest');

    cy.contains('Wystąpił błąd serwera. Proszę spróbuj ponownie później.').should('be.visible');
  });

  it('should go to login page when clicking the link', () => {
    cy.visit(registerUrl);
    cy.get('[data-testid="another-action-link"]').click();
    cy.url().should('include', '/pl/auth/login');
  });

  it('should go to terms page when clicking the link', () => {
    cy.visit(registerUrl);
    cy.get('[data-testid="terms-link"]').click();
    cy.url().should('include', '/pl/auth/terms');
  });
});
