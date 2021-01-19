//ES6 arrow functions not used as it is not recommended when using cypress (source: course material)
//course tasks 5.17-5.22
describe('Blog application ', function () {
  beforeEach(function () {
    cy.request('POST', 'http://localhost:3003/api/testing/reset')
    const user = {
      name: 'Cypress',
      username: 'Cypress',
      password: '12345'
    }
    cy.request('POST', 'http://localhost:3003/api/users/', user)
    cy.visit('http://localhost:3000')
  })
  it('front page can be opened', function () {
    cy.contains('Login to the application')
  })
  //course task 5.17
  it('login form is existent', function () {
    cy.get('#login-form').should('be.visible')
  })
  describe('Login', function () {
    //course task 5.18
    it('login fails with incorrect credentials', function () {
      cy.get('#username').type('Cypress')
      cy.get('#password').type('wrong-password')
      cy.get('#login-button').click()
      //login fails and site still contains login text, not the successful login text
      cy.contains('Login to the application')
      cy.get('html').should('not.contain', 'Cypress has logged in')
    })
    it('site can be logged into', function () {
      cy.get('#username').type('Cypress')
      cy.get('#password').type('12345')
      cy.get('#login-button').click()
      cy.contains('Cypress has logged in')
    })
    describe('when logged in', function () {
      beforeEach(function () {
        // instead of filling the inputs each time, a HTTP login is done
        // cy.get('#username').type('Cypress')
        // cy.get('#password').type('12345')
        // cy.get('#login-button').click()
        cy.login({ username: 'Cypress', password: '12345' })
      })
      //course task 5.19
      it('a new blog can be created', function () {
        // the code below is also done with a Cypress command inside the view/hide test
        cy.contains('Create a new blog').click()
        cy.get('#titleInput').type('CypressBlog')
        cy.get('.authorInput').type('Cypress Author')
        cy.get('.urlInput').type('cypress.url.test')
        cy.get('.newBlogSubmit').click()
        cy.contains('CypressBlog')
      })
      describe('when blogs can be created', function () {
        beforeEach(function () {
          cy.createBlog({
            title: 'Another Cypress Blog',
            author: 'Cypress Author',
            url: 'another.cypress.url',
            likes: 0
          })
          cy.createBlog({
            title: 'Second Cypress Blog',
            author: 'Cypress Author 2',
            url: 'yetanother.cypress.url',
            likes: 0
          })
        })
        it('a blog can be viewed and then hidden', function () {
          cy.contains('Another Cypress Blog')
            .get('#view-blog').click()
            .get('#hide-blog').click()
        })
        //course task 5.20
        it('a blog can be liked', function () {
          cy.contains('Second Cypress Blog')
            .get('#view-blog').click()
            .get('#like-button').click()
          cy.contains('Likes: 1')
        })
        //course task 5.21, deleting the first blog on the list
        it('a blog can be deleted', function () {
          cy.get('#view-blog').click()
            .get('#delete-blog').click()
          cy.on('window:confirm', () => true)
          cy.get('html').should('not.contain', 'Another Cypress Blog')
        })
      })
      //course task 5.22, check that blogs are in order of likes
      describe('Blog list automatic sorting', function () {
        //some blogs are added, with the most likes being added in the middle
        beforeEach(function () {
          cy.createBlog({
            title: 'Least Likes',
            author: 'Cypress Author',
            url: 'another.cypress.url',
            likes: 0
          })
          cy.createBlog({
            title: 'Most Likes',
            author: 'Cypress Author 2',
            url: 'yetanother.cypress.url',
            likes: 5
          })
          cy.createBlog({
            title: 'Some Likes',
            author: 'Cypress Author 3',
            url: 'yetanother.cypress.url',
            likes: 4
          })
        })
        it('List is ordered by likes in descending order', function () {
          //click the first view button, and expect it to contain the most likes, which was not added first.
          cy.contains('View').click().parent().parent().should('contain', 'Likes: 5')
        })
      })
    })
  })
})