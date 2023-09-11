//importing faker libary
import { faker } from '@faker-js/faker' 
//sample test
describe('Issue create', () => {
  beforeEach(() => {
    cy.visit('/');
    cy.url().should('eq', `${Cypress.env('baseUrl')}project/board`).then((url) => {
    //System will already open issue creating modal in beforeEach block  
    cy.visit(url + '/board?modal-issue-create=true');
    });
  });

  it('Should create an issue and validate it successfully', () => {
    //System finds modal for creating issue and does next steps inside of it
    cy.get('[data-testid="modal:issue-create"]').within(() => {              
      //Type value to description input field
      cy.get('.ql-editor').type('TEST_DESCRIPTION');

      //Type value to title input field
      //Order of filling in the fields is first description, then title on purpose
      //Otherwise filling title first sometimes doesn't work due to web page implementation
      cy.get('input[name="title"]').type('TEST_TITLE');
      
      //Select Lord Gaben from reporter dropdown
      cy.get('[data-testid="select:userIds"]').click();
      cy.get('[data-testid="select-option:Lord Gaben"]').click();

      //open issue type dropdown and choose Story
      cy.get('[data-testid="select:type"]').click();
      cy.get('[data-testid="select-option:Story"]')
          .trigger('click');

      //Click on button "Create issue"
      cy.get('button[type="submit"]').click();
    });

    //Assert that modal window is closed and successful message is visible
    cy.get('[data-testid="modal:issue-create"]').should('not.exist');
    cy.contains('Issue has been successfully created.').should('be.visible');
    
    //Reload the page to be able to see recently created issue
    //Assert that successful message has dissappeared after the reload
    cy.reload();
    cy.contains('Issue has been successfully created.').should('not.exist');

    //Assert than only one list with name Backlog is visible and do steps inside of it
    cy.get('[data-testid="board-list:backlog').should('be.visible').and('have.length', '1').within(() => {
      //Assert that this list contains 5 issues and first element with tag p has specified text
      cy.get('[data-testid="list-issue"]')
          .should('have.length', '5')
          .first()
          .find('p')
          .contains('TEST_TITLE');
      //Assert that correct avatar and type icon are visible
      cy.get('[data-testid="avatar:Lord Gaben"]').should('be.visible');
      cy.get('[data-testid="icon:story"]').should('be.visible');
    });
  });

  it('Should validate title is required field if missing', () => {
    //System finds modal for creating issue and does next steps inside of it
    cy.get('[data-testid="modal:issue-create"]').within(() => {
      //Try to click create issue button without filling any data
      cy.get('button[type="submit"]').click();

      //Assert that correct error message is visible
      cy.get('[data-testid="form-field:title"]').should('contain', 'This field is required');
    });
  });
});


//test 1
describe('Test for Pickle Rick', () => {
  beforeEach(() => {
    cy.visit('/');
    cy.url().should('eq', `${Cypress.env('baseUrl')}project/board`).then((url) => {  
    cy.visit(url + '/board?modal-issue-create=true');
    });
  });
  it('Pickle Rick can report a bug', () => {
    cy.get('[data-testid="modal:issue-create"]').within(() => {
            
      //description
      cy.get('.ql-editor').type('My bug description')

      //title
      cy.get('input[name="title"]').type('Bug');
      
      //select Pickle Rick from reporter and assignee dropdown
      cy.get('[data-testid="select:userIds"]').click();
      cy.get('[data-testid="select-option:Pickle Rick"]').click();
      cy.get('[data-testid="select:reporterId"]').click()
      cy.get('[data-testid="select-option:Pickle Rick"]').click()

      //select highest priority
      cy.get('[data-testid="select:priority"]').click()
      cy.get('[data-testid="select-option:Highest"]').click()

      //open issue type dropdown and choose bug - choosing issue type as a last step, because otherwise it resets for some reason
      cy.get('[data-testid="select:type"]').click();
      cy.get('[data-testid="select-option:Bug"]')
          .trigger('click');

      //click on button "Create issue"
      cy.get('button[type="submit"]').click();
    });

    //modal window is closed, success msg
    cy.get('[data-testid="modal:issue-create"]').should('not.exist');
    cy.contains('Issue has been successfully created.').should('be.visible');
    
    //reload and assert that success msg is not there
    cy.reload();
    cy.contains('Issue has been successfully created.').should('not.exist');

    //only 1 backlog should be on the page and we select data inside of this block on the page
    cy.get('[data-testid="board-list:backlog').should('be.visible').and('have.length', '1').within(() => {
      //since this webpage doesn't save the issues reported after revisiting we always assume that there are only 5 issues, we just reported one
      cy.get('[data-testid="list-issue"]')
          .should('have.length', '5')
          .first()
          .find('p')
          .contains('Bug');
      //correct avatar and type icon are visible
      cy.get('[data-testid="avatar:Pickle Rick"]').should('be.visible');
      cy.get('[data-testid="icon:bug"]').should('be.visible');
    });
  });
 });



 //test 2
 describe('Baby Yoda can report a task with random input', () => {
  beforeEach(() => {
    cy.visit('/');
    cy.url().should('eq', `${Cypress.env('baseUrl')}project/board`).then((url) => {
    cy.visit(url + '/board?modal-issue-create=true');
    });
  });
  it.only('Should create an issue and validate it successfully', () => {
    cy.get('[data-testid="modal:issue-create"]').within(() => {     
      //since Task is a default issue type we dont have to select it
      //description
      cy.get('.ql-editor').type(faker.lorem.sentence(3));

      //title
      cy.get('input[name="title"]').type(faker.lorem.word());

      //select Baby Yoda from reporter and assignee dropdown
      cy.get('[data-testid="select:userIds"]').click();
      cy.get('[data-testid="select-option:Baby Yoda"]').click();
      cy.get('[data-testid="select:reporterId"]').click()
      cy.get('[data-testid="select-option:Baby Yoda"]').click()

      //select low priority
      cy.get('[data-testid="select:priority"]').click()
      cy.get('[data-testid="select-option:Low"]').click()

      //click on button "Create issue"
      cy.get('button[type="submit"]').click();
    });

    //modal window is closed, success msg
    cy.get('[data-testid="modal:issue-create"]').should('not.exist');
    cy.contains('Issue has been successfully created.').should('be.visible');
    
    //reload and assert that success msg is not there
    cy.reload();
    cy.contains('Issue has been successfully created.').should('not.exist');

    //only 1 backlog should be on the page and we select data inside of this block on the page
    cy.get('[data-testid="board-list:backlog').should('be.visible').and('have.length', '1').within(() => {
      //since this webpage doesn't save the issues reported after revisiting we always assume that there are only 5 issues, we just reported one
      //we cannot predict what text will be generatel randomly, some we just assert that title is not empty
      cy.get('[data-testid="list-issue"]')
          .should('have.length', '5')
          .first()
          .find('p')
          .should('not.be.null')
      //correct avatar and type icon are visible
      cy.get('[data-testid="avatar:Baby Yoda"]').should('be.visible');
      cy.get('[data-testid="icon:task"]').should('be.visible');
    });
  });
 });