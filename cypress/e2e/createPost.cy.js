describe('Create Post Page', () => {
	it('should navigate to the create post page and create a new one', () => {
		cy.visit('http://localhost:3000/create');
		cy.get('input[name="title"]').type('Test Title');
		cy.get('textarea[name="body"]').type('Test Body');
		cy.get('button[type="submit"]').click();

		cy.url().should('include', '/create');
		cy.get('.card-title').should('have.text', 'Test Title');
		cy.get('.card-subtitle').should('have.text', 'Test Body');
		cy.get('.alert > p').should('have.text', '🚀 Success post created!');
		cy.get('.alert > .btn').should('have.text', 'Create new post');
		cy.get('.alert > .btn').click();
		cy.url().should('include', '/create');
		cy.get('input[name="title"]').should('have.value', '');
		cy.get('textarea[name="body"]').should('have.value', '');
	});
});
