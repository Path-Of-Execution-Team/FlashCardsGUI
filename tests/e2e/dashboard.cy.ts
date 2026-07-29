const authTokenCacheKey = 'moomento.auth-token';

const visitAuthenticated = (path: string, mode?: 'light' | 'dark') => {
  cy.setCookie('authToken', 'FAKE_JWT');
  cy.visit(path, {
    onBeforeLoad(window) {
      window.localStorage.setItem(authTokenCacheKey, 'FAKE_JWT');
      if (mode) {
        window.localStorage.setItem('mui-mode', mode);
      }
    },
  });
};

describe('User dashboard', () => {
  it('shows demo study data and opens a mock session', () => {
    visitAuthenticated('/en/dashboard', 'dark');

    cy.contains('Good morning, Anna.').should('be.visible');
    cy.contains('18 cards are ready for review.').should('be.visible');
    cy.contains('Biology').should('be.visible');

    cy.contains('button', 'New deck').click();
    cy.contains('This feature still uses demo data.').should('be.visible');

    cy.contains('button', 'Start session').click();
    cy.contains('Your session is ready.').should('be.visible');
    cy.contains('button', 'Session started').should('be.disabled');

    cy.get('button[aria-label="Switch to light theme"]').click();
    cy.contains('button', 'Session started').should('have.css', 'background-color', 'rgb(200, 241, 105)').and('have.css', 'color', 'rgb(23, 37, 28)');
  });

  it('opens settings and saves the demo state', () => {
    visitAuthenticated('/en/dashboard');

    cy.get('[data-testid="user-nav-settings"]').click();
    cy.url().should('include', '/en/settings');
    cy.contains('Study preferences').should('be.visible');

    cy.get('[data-testid="save-mock-settings"]').click();
    cy.contains('Demo settings saved.').should('be.visible');
  });

  it('fits the mobile viewport and shows mobile navigation', () => {
    cy.viewport(390, 844);
    visitAuthenticated('/en/dashboard');

    cy.document().then(document => {
      cy.wrap(document.documentElement.scrollWidth).should('be.lte', document.documentElement.clientWidth);
    });
    cy.contains('Good morning, Anna.').should('be.visible');
    cy.get('[data-testid="mobile-user-nav-settings"]').should('be.visible');
  });

  it('redirects an anonymous visitor to login', () => {
    cy.visit('/en/dashboard');

    cy.url().should('include', '/en/auth/login');
  });

  it('reacts to the cached session and signs the user out', () => {
    visitAuthenticated('/en');

    cy.contains('a', 'My study').should('be.visible').click();
    cy.url().should('include', '/en/dashboard');

    cy.get('[data-testid="logout-button"]').click();
    cy.url().should('include', '/en/auth/login');
    cy.getCookie('authToken').should('be.null');
    cy.window().its('localStorage').invoke('getItem', authTokenCacheKey).should('be.null');
  });
});
