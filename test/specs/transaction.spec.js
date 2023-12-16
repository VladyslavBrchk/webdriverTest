import { expect } from '@wdio/globals'
import LoginPage from '../pageobjects/login.page.js'
import HomePage from '../pageobjects/home.page.js'
import TransactionPage from '../pageobjects/transaction.page.js'
import { faker } from '@faker-js/faker'
import fixtures from '../../fixtures.json' assert {type:'json'}

const randomComment = faker.lorem.lines(1);
let commentCount;

describe('Transaction View Test', () => {
    beforeEach(async () => {
        await LoginPage.open();
        await LoginPage.login(fixtures.username, fixtures.password);
    })

    afterEach(async () => {
        await HomePage.clickLogout();
    })

    it('Like Transaction Test', async () => {
        await browser.waitUntil(async () => {
            return await HomePage.transactionItem[0].isDisplayed();
        }, { timeoutMsg: 'Елемент не видимий на сторінці' });
        await HomePage.clickTransactionItem(0);
        const prevLikes = await TransactionPage.transactionLikeCount
        if(await TransactionPage.transactionLikeButton.isClickable()){
            await TransactionPage.clickLike();
            await expect(await TransactionPage.transactionLikeCount).not.toBe(prevLikes);
        }
    })

    describe('Comment Transaction Test', () => {
        beforeEach(async () => {
            await browser.waitUntil(async () => {
                return await HomePage.transactionItem[0].isDisplayed();
            }, { timeoutMsg: 'Елемент не видимий на сторінці' });
            commentCount = await HomePage.transactionCommentCount[0].getText();
            await HomePage.clickTransactionItem(0);
            await TransactionPage.inputTransactionComment(randomComment);
        })

        it('Comment Display Test', async () => {
            commentCount++;
            await expect(await TransactionPage.lastComment).toBe(randomComment);
        })
    
        it('Comment Count Changing Test', async () => {
            commentCount++;
            await HomePage.clickHomeButton();
            await browser.waitUntil(async () => {
                return await HomePage.transactionItem[0].isDisplayed();
            }, { timeoutMsg: 'Елемент не видимий на сторінці' });
            await expect(parseInt(await HomePage.transactionCommentCount[0].getText())).toBe(commentCount);
        })
    })
})

describe('New Transaction Test', () => {
    beforeEach(async () => {
        await LoginPage.open();
        await LoginPage.login(fixtures.username, fixtures.password);
        await HomePage.clickNewTransactionButton();
    })

    afterEach(async () => {
        await HomePage.clickLogout();
    })

    it('New Pay Transaction Test', async () => {
        const prevBalance = await HomePage.sidenavBalance;
        let numBalance = parseFloat(prevBalance.replace(/[$,]/g, ''))
        await TransactionPage.clickFirstTransactionContact();
        await TransactionPage.payTransaction("1", randomComment);
        numBalance--;
        await expect(TransactionPage.completeMsg).toHaveText(fixtures.completeTransactionMsg);
        const curBalance = await HomePage.sidenavBalance;
        await expect(parseFloat(curBalance.replace(/[$,]/g, ''))).toBe(numBalance);
    })

    it('New Request Transaction Test', async () => {
        await TransactionPage.clickFirstTransactionContact();
        await TransactionPage.requestTransaction("1", randomComment);
        await expect(await TransactionPage.completeMsg).toHaveText(fixtures.completeTransactionMsg);
    })

    it('Transaction Input Helpers Test', async () => {
        await TransactionPage.clickFirstTransactionContact();
        await TransactionPage.helpersCheck();
        await expect(TransactionPage.transactionAmountHelper).toHaveText(fixtures.amountError);
        await expect(TransactionPage.transactionNoteHelper).toHaveText(fixtures.noteError);
    })

    describe('Post-Transaction Actions Test', () => {
        beforeEach(async () => {
            await TransactionPage.clickFirstTransactionContact();
            await TransactionPage.requestTransaction("1", randomComment);
        })

        it('Return to Transactions Test', async () => {
            await TransactionPage.clickReturnToTransactionsButton();
            await expect(await TransactionPage.transactionsList).toBeDisplayed();
        })

        it('Create Another Transaction Test', async () => {
            await TransactionPage.clickCreateAnotherTransactionButton();
            await expect(await TransactionPage.usersList).toBeDisplayed();
        })
    })    
})