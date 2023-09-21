//test 1
describe('Issue deletion', () => {
  before(() => {
    cy.visit('/')
    cy.url().should('eq', `${Cypress.env('baseUrl')}project/board`).then((url) => {  
    cy.visit(url + '/board')
    })
})
  it('Issue deletion', () => {
        cy.get('[data-testid="board-list:backlog"]').should('be.visible').and('have.length', '1').within(() => {
        cy.get('[data-testid="list-issue"]')
              .should('have.length', '4')
              .first()
              .find('p')
              .click()
    })
    cy.get('[data-testid="modal:issue-details"]').should('be.visible')
    cy.get('[data-testid="modal:issue-details"]').within(() => {
    cy.get('[data-testid="icon:trash"]').click()
    })
    cy.get('div').contains('Delete issue').click()
    //asserts modal is gone and length is deducted by 1

    cy.url().should('eq', `${Cypress.env('baseUrl')}project/board`)
    cy.get('[data-testid="board-list:backlog"]').should('be.visible').and('have.length', '1').within(() => {
      cy.get('[data-testid="list-issue"]')
            .should('have.length', '3')
    })
  })  
})
 


//test 2
describe('Cancel issue deletion', () => {
  before(() => {
    cy.visit('/')
    cy.url().should('eq', `${Cypress.env('baseUrl')}project/board`).then((url) => {  
    cy.visit(url + '/board')
    })
})
  it.only('Cancel deletion', () => {
        cy.get('[data-testid="board-list:backlog"]').should('be.visible').and('have.length', '1').within(() => {
        cy.get('[data-testid="list-issue"]')
              .should('have.length', '4')
              .first()
              .find('p')
              .click()
    })
    cy.get('[data-testid="modal:issue-details"]').should('be.visible')
    cy.get('[data-testid="icon:trash"]').click({multiple : true})
    cy.get('div').contains('Cancel').click()
    //asserts that confirmation pop-up is not visible
    cy.get('[data-testid="modal:confirm"]').should('not.exist');
    //asserts that issue modal is visible
    cy.get('[data-testid="modal:issue-details"]').should('be.visible')
    //clicks on X button to close issue modal
    cy.get('[data-testid="icon:close"]').eq(0).click()
    //asserts that we back on the board page, backlog is visible length hasnt been changed
    cy.url().should('eq', `${Cypress.env('baseUrl')}project/board`)
    cy.wait(6000)
    cy.get('[data-testid="board-list:backlog"]').should('be.visible').and('have.length', '1').within(() => {
      cy.get('[data-testid="list-issue"]')
            .should('have.length', '4')
    })
  })  
 })




 



















/*   it('Modal assertion, clicks trash icon, clicks confirm deletion', () => {
        cy.get(['data-testid="modal:issue-details"']).should('be.visible')
        cy.get('data-testid="icon:trash"').click()
        cy.get('div').contains('Delete issue').click()
        //asserts confirmation modal is gone
        cy.get('[data-testid="modal:confirm"]').should('not.be.visible')
    });
    it('Asserts issue deletion by checking list issue length', () => {
        cy.get('[data-testid="board-list:backlog"]').should('be.visible').and('have.length', '1').within(() => {
        cy.get('[data-testid="list-issue"]')
              .should('have.length', '3')
     })
 describe('Cancel the deletion of the issue and assert its still there', () => {
    it('This test opens first issue on the board', () => {
        cy.get('[data-testid="board-list:backlog"]').should('be.visible').and('have.length', '1').within(() => {
          cy.get('[data-testid="list-issue"]')
              .should('have.length', '4')
              .first()
              .find('p')
              .click()
        });
      });
    it('Modal assertion, clicks trash icon, clicks canel', () => {
        cy.get(['data-testid="modal:issue-details"']).should('be.visible')
        cy.get('data-testid="icon:trash"').click()
        cy.get('div').contains('Cancel').click()
        //asserts confirmation modal is gone
        cy.get('[data-testid="modal:confirm"]').should('not.be.visible')
        //asserts that issue modal is visible
        cy.get('[data-testid="modal:issue-details"]').should('be.visible')
        //clicks on X button to close issue modal
        cy.get('[data-testid="icon:close"]').click()
        //asserts that we back on the board page
        cy.url().should('eq', `${Cypress.env('baseUrl')}project/board`)
    });
    it('Asserts ithat issue has not been deleted by checking list issue length', () => {
        cy.get('[data-testid="board-list:backlog"]').should('be.visible').and('have.length', '1').within(() => {
        cy.get('[data-testid="list-issue"]')
              .should('have.length', '4')
  });
})
})*/
 
  