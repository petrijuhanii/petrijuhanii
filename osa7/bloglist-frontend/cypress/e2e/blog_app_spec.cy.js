describe('Blog ', function() {
  beforeEach(function() {
    cy.request('POST', 'http://localhost:3003/api/testing/reset')
    const user = {
      name: 'Petri',
      username: 'Petri',
      password: 'Petri'
    }
    cy.request('POST', 'http://localhost:3003/api/users/', user)
    cy.visit('http://localhost:3000')
  })
  it('Login form is shown', function() {
    cy.contains('Log in to application')
  })
  describe('Login', function() {
    it('succeeds with correct credentials', function() {
      cy.get('#username').type('Petri')
      cy.get('#password').type('Petri')
      cy.get('#login-button').click()

      cy.contains('Petri logged in')
    })
    it('fails with wrong credentials', function() {
      cy.get('#username').type('Pekka')
      cy.get('#password').type('Pekka')
      cy.get('#login-button').click()

      cy.contains('wrong username or password')
    })

    describe('When logged in', function () {
      beforeEach(function() {
        cy.get('#username').type('Petri')
        cy.get('#password').type('Petri')
        cy.get('#login-button').click()

        cy.contains('Petri logged in')
      })

      it('A blog can be created', function() {
        cy.contains('new blog').click()
        cy.get('#title').type('a note created by cypress')
        cy.get('#author').type('Cypress')
        cy.get('#url').type('www.cypress.com')
        cy.contains('create').click()
        cy.contains('a note created by cypress')
        cy.contains('show')
      })
      describe('When blog created', function () {
        beforeEach(function() {
          cy.contains('new blog').click()
          cy.get('#title').type('a note created by cypress')
          cy.get('#author').type('Cypress')
          cy.get('#url').type('www.cypress.com')
          cy.contains('create').click()
          cy.contains('a note created by cypress')
          cy.contains('show')
        })
        it('Like button can be clicked', function() {
          cy.contains('show').click()
          cy.contains('like').click()
          cy.contains('0')
        })
      })
    })


  })
})