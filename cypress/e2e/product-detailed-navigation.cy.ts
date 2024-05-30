import Home from '../../src/app/page'

describe('Product detailed navigation', () => {
  it('Should navigate to product detailed page', () => {
    cy.visit('/')
    cy.get('a[cy-id="product-image"').first().click()
    cy.url().should('include', '/products/')
  })
})