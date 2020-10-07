import CONSTANTS from '../../src/utils/constants.json';

describe('login navigations', () => {
    beforeEach(() => {
        cy.visit('http://localhost:3000/login');
        cy.contains('IMPEKABLE');
        cy.contains('Welcome back! Please login to your account.');
        cy.focused().should('have.id', 'username');
        cy.contains('Login');
        cy.contains('Sign up');
        localStorage.clear();
    });

    it('checks reset password navigation', () => {
        cy.get('.forgotPassword').click();
        cy.url().should('include', CONSTANTS.PATHS.RESET);
        cy.contains('IMPEKABLE');
        cy.contains('Enter your email and we will send you a password reset link.');
        cy.focused().should('have.id', 'emailID');
        cy.contains('Send request');
        cy.contains('Terms of use. Privacy policy');
    });

    it('checks signup navigation', () => {
        cy.get('button#signup').click();
        cy.url().should('include', CONSTANTS.PATHS.SIGNUP);
        cy.contains('IMPEKABLE');
        cy.contains('Please complete to create your account.');
        cy.contains('Sign up');
        cy.contains('Terms of use. Privacy policy');
        cy.contains('Already have an account? Sign in.').click();
        cy.url().should('include', CONSTANTS.PATHS.LOGIN);
    });
});

describe('login functionality', () => {
    beforeEach(() => {
        cy.visit('http://localhost:3000/login');
        cy.contains('IMPEKABLE');
        cy.contains('Welcome back! Please login to your account.');
        cy.focused().should('have.id', 'username');
        cy.contains('Login');
        cy.contains('Sign up');
        localStorage.clear();
    });
    it('checks login functionality', () => {
        cy.get('#username').type('arjun@gmail.com');
        cy.get('#username').should('have.attr', 'type', 'text');
        cy.get('#username').should('have.value', 'arjun@gmail.com');
        cy.get('#password').type('admin@123');
        cy.get('#password').should('have.attr', 'type', 'password');
        cy.get('#password').should('have.value', 'admin@123');
        cy.get('#login').click().should(() => {
            expect(localStorage.getItem('ROLE')).to.eq('ADMIN');
        });
        cy.url().should('include', CONSTANTS.PATHS.HOME);
    });
});
