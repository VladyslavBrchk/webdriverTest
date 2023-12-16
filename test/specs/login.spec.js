import { expect } from '@wdio/globals'
import LoginPage from '../pageobjects/login.page.js'
import HomePage from '../pageobjects/home.page.js'
import { faker } from '@faker-js/faker'
import fixtures from '../../fixtures.json' assert {type:'json'}

const randomName = faker.internet.userName();
const randomPassword = faker.internet.password();

describe('Login Testing', () => {
    beforeEach(async () => {
        await LoginPage.open();
    })

    it('Login without any credentials', async () => {
        await LoginPage.clickSignIn();
        await expect(LoginPage.btnSubmit).toHaveAttr('disabled', 'true');
    })

    it('Login with invalid credentials', async () => {
        await LoginPage.login(randomName, randomPassword);
        await expect(LoginPage.errorMsg).toHaveText(fixtures.loginErrorMsg);
    })

    it('Login with valid credentials', async () => {
        await LoginPage.login(fixtures.username, fixtures.password);
        await expect(HomePage.usernameText).toHaveText(expect.stringContaining(fixtures.username));
    })

    it('Logout Test', async () => {
        await HomePage.clickLogout();
        await expect(await browser.getUrl()).toBe("http://localhost:3000/signin/");
    })
})