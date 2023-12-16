import { Key } from 'webdriverio'

const transactionLikeButton = '[data-test^="transaction-like-button-"]'
const transactionLikeCount = '[data-test^="transaction-like-count-"]'
const inputTransactionComment = '[data-test^="transaction-comment-input-"]'
const lastComment = 'ul li:last-child'
const firstTransactionContact = 'ul li:first-child'
const inputTransactionAmount = '#amount'
const inputTransactionNote = '#transaction-create-description-input'
const transactionAmountHelper = '#transaction-create-amount-input-helper-text'
const transactionNoteHelper = '#transaction-create-description-input-helper-text'
const requestTransactionButton = '[data-test="transaction-create-submit-request"]'
const payTransactionButton = '[data-test="transaction-create-submit-payment"]'
const completeMsg = '.MuiAlert-message'
const usersList = '[data-test="users-list"]'
const transactionsList = '[data-test="transaction-list"]'
const returnToTransactionsButton = '[data-test="new-transaction-return-to-transactions"]'
const createAnotherTransactionButton = '[data-test="new-transaction-create-another-transaction"]'


class TransactionPage {
    get transactionLikeCount() {
        return $(transactionLikeCount).getText();
    }

    get transactionLikeButton() {
        return $(transactionLikeButton);
    }
  
    async clickLike() {
        await $(transactionLikeButton).click();
    }

    async inputTransactionComment(comment) {
        await $(inputTransactionComment).setValue(comment);
        await browser.action('key').down(Key.Enter).up(Key.Enter).perform();
    }

    get lastComment() {
        return $(lastComment).getText();
    }

    async clickFirstTransactionContact() {
        await $(firstTransactionContact).click();
    }

    get requestTransactionButton() {
        return $(requestTransactionButton);
    }

    get payTransactionButton() {
        return $(payTransactionButton);
    }

    async requestTransaction (amount, note) {
        await $(inputTransactionAmount).setValue(amount);
        await $(inputTransactionNote).setValue(note);
        await this.requestTransactionButton.click();
    }

    async payTransaction (amount, note) {
        await $(inputTransactionAmount).setValue(amount);
        await $(inputTransactionNote).setValue(note);
        await this.payTransactionButton.click();
    }

    get completeMsg() {
        return $(completeMsg);
    }

    async clickReturnToTransactionsButton() {
        await $(returnToTransactionsButton).click();
    }

    get usersList() {
        return $(usersList);
    }

    async clickCreateAnotherTransactionButton() {
        await $(createAnotherTransactionButton).click();
    }

    get transactionsList() {
        return $(transactionsList);
    }

    async helpersCheck() {
        await $(inputTransactionAmount).click();
        await $(inputTransactionNote).click();
        await browser.action('pointer').move({x:100, y:100}).down().up().perform();
    }

    get transactionAmountHelper() {
        return $(transactionAmountHelper);
    }

    get transactionNoteHelper() {
        return $(transactionNoteHelper);
    }
}

export default new TransactionPage();