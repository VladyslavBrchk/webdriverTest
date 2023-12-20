import { expect } from '@wdio/globals'
import LoginPage from '../pageobjects/login.page.js'
import HomePage from '../pageobjects/home.page.js'
import fixtures from '../../fixtures.json' assert {type:'json'}

const leftBorder = 100;
const rightBorder = 800;

describe('Filter testing', async () => {
    beforeEach(async () => {
        await LoginPage.open();
        await LoginPage.login(fixtures.username, fixtures.password);
        await HomePage.clickTransactionFilterButton();
        await HomePage.setTransaction(leftBorder, rightBorder);
    })

    afterEach(async () => {
        await browser.action('pointer').move({x:100, y:100}).down().up().perform();
        await HomePage.clickLogout();
    })

    it('Transaction Filter Text Changing Test', async () => {
        await expect(HomePage.transactionFilterText).toHaveText(`Amount Range: $${leftBorder} - $${rightBorder}`);
        await expect(HomePage.transactionFilterButtonText).toHaveText(`Amount: $${leftBorder} - $${rightBorder}`);
    })

    it('Transaction Filter Payments Test', async () => {
        const filtering = await HomePage.checkTransactionFilter(leftBorder, rightBorder)
        await browser.pause(500);
        await expect(filtering).toBeTruthy();
    })

    it('Transaction Filter Clear Test', async () => {
        await HomePage.clickTransactionFilterClearButton();
        const text = await HomePage.transactionFilterText.getText();
        const str = text.replace(/,/g, '');
        const amounts = str.match(/\d+/g).map(Number);
        const filtering = await HomePage.checkTransactionFilter(amounts[0], amounts[1]);
        await expect(filtering).toBeTruthy();
    })
})

describe('Burger Menu Test', () => {
    beforeEach(async () => {
        await LoginPage.open();
        await LoginPage.login(fixtures.username, fixtures.password);
    })

    it('Burger Menu Test', async () => {
        await HomePage.clickBurgerMenu();
        await expect(HomePage.sidenav).not.toBeDisplayed();
        await HomePage.clickBurgerMenu();
        await expect(HomePage.sidenav).toBeDisplayed();
    })
})