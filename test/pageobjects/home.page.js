const homePageUsername = '[data-test="sidenav-username"]'
const logoutButton = '[data-test="sidenav-signout"]'
const transactionFilterButton = '[data-test="transaction-list-filter-amount-range-button"]'
const transactionSlider = '[class="MuiSlider-rail"]'
const transactionFilterText = '[data-test="transaction-list-filter-amount-range-text"]'
const transactionAmounts = '[data-test^="transaction-amount-"]'
const transactionFilterClearButton = '[data-test="transaction-list-filter-amount-clear-button"]'
const transactionItem = '[data-test^="transaction-item-"]'
const sidenav = '//h6[@data-test="sidenav-user-balance"]/../../..'
const burgerMenu = '[data-test="drawer-icon"]'
const transactionCommentCount = '[data-test="transaction-comment-count"]'
const sidenavHomeButton = '[data-test="sidenav-home"]'
const sidenavNotificationsButton = '[data-test="sidenav-notifications"]'
const notificationsCount = '[data-test="nav-top-notifications-count"]'
const newTransactionButton = '[data-test="nav-top-new-transaction"]'
const sidenavBalance = '[data-test="sidenav-user-balance"]'

class HomePage {
    get usernameText() {
        return $(homePageUsername);
    }

    get transactionFilterText() {
        return $(transactionFilterText);
    }

    get transactionFilterButtonText() {
        return $(transactionFilterButton);
    }

    async clickLogout() {
        await $(logoutButton).click();
    }

    async clickTransactionFilterButton() {
        (await $(transactionFilterButton)).click();
    }

    async setTransaction(left, right) {
        const el = await $(transactionSlider);
        await el.click({x:(left*200/1000)-100});
        await browser.pause(1000);
        await el.click({x:(right*200/1000)-100});
    }

    async checkTransactionFilter(left, right) {
        await browser.pause(1000);
        for await (const element of $$(transactionAmounts)) {
            const text = await element.getText();
            const numberString = text.replace(/[^0-9.-]/g, '');
            const number = Math.abs(parseFloat(numberString));
            if (number >= left && number <= right) {
            } 
            else { return false; }
        }
        return true;
    }    

    async clickTransactionFilterClearButton() {
        await $(transactionFilterClearButton).click();
    }

    get transactionItem() {
        return  $$(transactionItem);
    }

    async clickTransactionItem(index) {
        await $$(transactionItem)[index].click();
    }

    async clickBurgerMenu() {
        await $(burgerMenu).click();
    }

    get sidenav() {
        return $(sidenav);
    }

    get transactionCommentCount() {
        return $$(transactionCommentCount);
    }

    async clickHomeButton() {
        await $(sidenavHomeButton).click();
    }

    async clickNotificationsButton() {
        await $(sidenavNotificationsButton).click();
    }

    get notificationsCount() {
        return parseInt($(notificationsCount).getText());
    }

    async clickNewTransactionButton() {
        await $(newTransactionButton).click() 
    }

    get sidenavBalance() {
        return $(sidenavBalance).getText();
    }
}

export default new HomePage();