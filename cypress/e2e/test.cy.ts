
describe('Sport Centre Application Tests', () => {
    
    it('should successfully change the password with correct credentials', () => {
        cy.visit('https://sport-centre.netlify.app/change-password', { timeout: 50000 })

        cy.get('input[name="current_password"]').type('oldpassword');
        cy.get('input[name="password"]').type('newpassword123');
        cy.get('button[type="submit"]').click();
        cy.url().should('include', '/');
    });

    it('Sign-in Successfull', () => {
      cy.visit('https://sport-centre.netlify.app/signin', { timeout: 50000 })

      cy.get('input[name="email"]').type('correct.user@example.com');
      cy.get('input[name="password"]').type('user.password');
      cy.get('form').submit();
  
      cy.url().should('include', '/');
    });

    it('Displays error message for invalid credentials', () => {
      cy.visit('https://sport-centre.netlify.app/signin', { timeout: 50000 })

      cy.get('input[name="email"]').type('invalid@example.com');
      cy.get('input[name="password"]').type('invalidpassword');
      cy.get('form').submit();
  
      cy.contains('Invalid credentials !').should('be.visible');
    });
    
    it('Navigates to /signin after clearing local storage', () => {
        localStorage.setItem('auth_token', 'mockAuthToken');
        localStorage.setItem('user', JSON.stringify({ id: 1, username: 'testuser' }));
        localStorage.setItem('selectedSports', JSON.stringify(['football', 'basketball']));
        localStorage.setItem('selectedTeams', JSON.stringify(['teamA', 'teamB']));

        cy.visit('https://sport-centre.netlify.app/logout');
        cy.url().should('include', '/logout');
        cy.wait(500); 
        cy.url().should('include', '/signin');
      });

      
      it('should have the correct title', () => {
        cy.visit('https://sport-centre.netlify.app/', { timeout: 50000 })
        cy.title({ timeout: 10000 }).should('include', 'Sports Center');
      });



});
