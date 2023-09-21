class IssueModal {
    constructor() {
        this.reporter = '[data-testid="select:reporterId"]';
        this.submitButton = 'button[type="submit"]';
        this.issueModal = '[data-testid="modal:issue-create"]';
        this.issueDetailModal = '[data-testid="modal:issue-details"]';
        this.title = 'input[name="title"]';
        this.issueType = '[data-testid="select:type"]';
        this.descriptionField = '.ql-editor';
        this.assignee = '[data-testid="select:userIds"]';
        this.backlogList = '[data-testid="board-list:backlog"]';
        this.issuesList = '[data-testid="list-issue"]';
        this.deleteButton = '[data-testid="icon:trash"]';
        this.deleteButtonName = "Delete issue";
        this.cancelDeletionButtonName = "Cancel";
        this.confirmationPopup = '[data-testid="modal:confirm"]';
        this.closeDetailModalButton = '[data-testid="icon:close"]';
        this.priority = '[data-testid="select:priority"]';
    }

    selectReporter(reporter) {
        cy.get(this.reporter).click()
        cy.get(`[data-testid="select-option:${reporter}"]`)
            .trigger('mouseover')
            .trigger('click');
    }   

    selectPriority(priority) {
        cy.get(this.priority).click(5)
        cy.get(`[data-testid="select-option:${priority}"]`)
            .trigger('mouseover')
            .trigger('click');
    }
 
    getIssueModal() {
        return cy.get(this.issueModal);
    }

    getIssueDetailModal() {
        return cy.get(this.issueDetailModal);
    }

    selectIssueType(issueType) {
        cy.get(this.issueType).click('bottomRight');
        cy.get(`[data-testid="select-option:${issueType}"]`)
            .trigger('mouseover')
            .trigger('click');
    }

    selectAssignee(assigneeName) {
        cy.get(this.assignee).click('bottomRight');
        cy.get(`[data-testid="select-option:${assigneeName}"]`).click();
    }

    editTitle(title) {
        cy.get(this.title).debounced('type', title);
    }

    editDescription(description) {
        cy.get(this.descriptionField).type(description);
    }

    createIssue(issueDetailsRick) {
        this.getIssueModal().within(() => {
            this.editDescription(issueDetailsRick.description);
            this.editTitle(issueDetailsRick.title);
            this.selectAssignee(issueDetailsRick.assignee);
            this.selectPriority(issueDetailsRick.priority)
            this.selectReporter(issueDetailsRick.reporter)
            this.selectIssueType(issueDetailsRick.type);
            cy.get(this.submitButton).click();
        });
    }

    createIssue(issueDetailsYoda) {
        this.getIssueModal().within(() => {
            this.editDescription(issueDetailsYoda.description);
            this.editTitle(issueDetailsYoda.title);
            this.selectAssignee(issueDetailsYoda.assignee);
            this.selectPriority(issueDetailsYoda.priority)
            this.selectReporter(issueDetailsYoda.reporter)
            cy.get(this.submitButton).click();
        });
    }

    ensureIssueIsCreated(expectedAmountIssues, issueDetailsRick) {
        cy.get(this.issueModal).should('not.exist');
        cy.reload();
        cy.contains('Issue has been successfully created.').should('not.exist');

        cy.get(this.backlogList).should('be.visible').and('have.length', '1').within(() => {
            cy.get(this.issuesList)
                .should('have.length', expectedAmountIssues)
                .first()
                .find('p')
                .contains(issueDetailsRick.title);
            cy.get(`[data-testid="avatar:${issueDetailsRick.assignee}"]`).should('be.visible');
            cy.get(`[data-testid="icon:arrow-up"]`).should('be.visible');
            })
        }
    
    ensureIssueIsCreated(expectedAmountIssues, issueDetailsYoda) {
        cy.get(this.issueModal).should('not.exist');
        cy.reload();
        cy.contains('Issue has been successfully created.').should('not.exist');

        cy.get(this.backlogList).should('be.visible').and('have.length', '1').within(() => {
            cy.get(this.issuesList)
                .should('have.length', expectedAmountIssues)
                .first()
                .find('p')
                .contains(issueDetailsYoda.title);
            cy.get(`[data-testid="avatar:${issueDetailsYoda.assignee}"]`).should('be.visible');
            cy.get(`[data-testid="icon:arrow-down"]`).should('be.visible');
            })
        }

    ensureIssueIsVisibleOnBoard(issueTitle) {
        cy.get(this.issueDetailModal).should('not.exist');
        cy.reload();
        cy.contains(issueTitle).should('be.visible');
    }

    ensureIssueIsNotVisibleOnBoard(issueTitle) {
        cy.get(this.issueDetailModal).should('not.exist');
        cy.reload();
        cy.contains(issueTitle).should('not.exist');
    }

    validateIssueVisibilityState(issueTitle, isVisible = true) {
        cy.get(this.issueDetailModal).should('not.exist');
        cy.reload();
        cy.get(this.backlogList).should('be.visible');
        if (isVisible)
            cy.contains(issueTitle).should('be.visible');
        if (!isVisible)
            cy.contains(issueTitle).should('not.exist');
    }

    clickDeleteButton() {
        cy.get(this.deleteButton).click();
        cy.get(this.confirmationPopup).should('be.visible');
    }

    confirmDeletion() {
        cy.get(this.confirmationPopup).within(() => {
            cy.contains(this.deleteButtonName).click();
        });
        cy.get(this.confirmationPopup).should('not.exist');
        cy.get(this.backlogList).should('be.visible');
    }

    cancelDeletion() {
        cy.get(this.confirmationPopup).within(() => {
            cy.contains(this.cancelDeletionButtonName).click();
        });
        cy.get(this.confirmationPopup).should('not.exist');
        cy.get(this.issueDetailModal).should('be.visible');
    }

    closeDetailModal() {
        cy.get(this.issueDetailModal).get(this.closeDetailModalButton).first().click();
        cy.get(this.issueDetailModal).should('not.exist');
    }
}

export default new IssueModal();