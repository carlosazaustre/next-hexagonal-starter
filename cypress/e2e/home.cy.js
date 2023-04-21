describe('Home Page', () => {
	beforeEach(() => {
		cy.visit('http://localhost:3000/');
	});

	it('should navigate to the home page', () => {
		cy.get('.navbar > .btn').should('contain', 'Hexagonal Blog Example');
	});

	it('should have 5 posts on the home page', () => {
		cy.get('.card > .card-body').should('have.length', 5);
	});

	it('When I click on a post, I should be taken to the post page', () => {
		cy.get('[href="/post/1"] > .card').click();
		cy.url().should('include', '/post/1');
	});
});
