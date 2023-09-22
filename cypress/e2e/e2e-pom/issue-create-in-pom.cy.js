import IssueModal from "../../pages/IssueModal"
import { faker } from '@faker-js/faker' 

describe('Rick can create an issue', () => {
  beforeEach(() => {
    cy.visit('/')
    cy.url().should('eq', `${Cypress.env('baseUrl')}project/board`).then((url) => {
    cy.visit(url + '/board?modal-issue-create=true')
    })
  })

  //data set with which we are creating issue, saved as a constant
  const issueDetailsRick = {
    title: "Bug",
    type: "Bug",
    description: "My bug description",
    reporter: "Pickle Rick",
    assignee: "Pickle Rick",
    priority: "Highest",
  };

  //number of issues we expect to see in the backlog after the test
  const EXPECTED_AMOUNT_OF_ISSUES_CREATE = '5'

  it('Should create issue successfully', () => {
    IssueModal.createIssue(issueDetailsRick)
    IssueModal.ensureIssueIsCreated(EXPECTED_AMOUNT_OF_ISSUES_CREATE, issueDetailsRick)
  })
})

describe('Rick can create an issue', () => {
  beforeEach(() => {
    cy.visit('/');
    cy.url().should('eq', `${Cypress.env('baseUrl')}project/board`).then((url) => {
    cy.visit(url + '/board?modal-issue-create=true');
    })
  })
var Rtitle = faker.lorem.word()
var Rdescription = faker.lorem.sentence(3)
  //data set with which we are creating issue, saved as a constant
  const issueDetailsYoda = {
    title: Rtitle,
    description: Rdescription,
    reporter: "Baby Yoda",
    assignee: "Baby Yoda",
    priority: "Low",
  };

  //number of issues we expect to see in the backlog after the test
  const EXPECTED_AMOUNT_OF_ISSUES_CREATE = '5'

  it('Should create issue successfully', () => {
    IssueModal.createIssue(issueDetailsYoda)
    IssueModal.ensureIssueIsCreated(EXPECTED_AMOUNT_OF_ISSUES_CREATE, issueDetailsYoda)
  })
})
