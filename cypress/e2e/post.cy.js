describe('Post Page', () => {
	beforeEach(() => {
		cy.visit('http://localhost:3000/post/1');
	});

	it('should navigate to the post page', () => {
		cy.get('.navbar > .btn').should('contain', 'Hexagonal Blog Example');
	});

	it('should have a post on the post page', () => {
		cy.get('.card > .card-body').should('exist');
	});

	it('should have a post with title, author, and comment count', () => {
		cy.get('.card-bordered > .card-body > .card-title').should(
			'contain',
			'sunt aut facere repellat provident occaecati excepturi optio reprehenderit',
		);
		cy.get('.badge-primary').should('contain', 'Leanne Graham');
		cy.get('.badge-outline').should('contain', 'comments');
	});

	it('should have a Comments section', () => {
		cy.get('.text-2xl').should('contain', 'Comments');
	});
});
