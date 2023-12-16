import { expect } from '@wdio/globals'
import SignupPage from '../pageobjects/signup.page.js'
import HomePage from '../pageobjects/home.page.js'
import { faker } from '@faker-js/faker'
import fixtures from '../../fixtures.json' assert {type:'json'}

const randomShortPassword = faker.number.int({ max: 999 });
const randomPassword = faker.internet.password();
const randomPasswordConfirm = faker.internet.password();

describe('Fields Errors Check', () => {
    beforeEach(async () => {
        await SignupPage.open();
    })

    it('Invalid (Short) Password Test', async () => {
        await SignupPage.inputPassword(randomShortPassword);
        await expect(SignupPage.passwordHelper).toHaveText(fixtures.shortPasswordError);
    })

    it('Invalid Password Confirm Test', async () => {
        await SignupPage.inputPassword(randomPassword);
        await SignupPage.inputPasswordConfirm(randomPasswordConfirm);
        await expect(SignupPage.passwordConfirmHelper).toHaveText(fixtures.notMatchPasswordError);
    })

    it('Fields Helpers Test', async () => {
        await SignupPage.helpersCheck();
        await expect(SignupPage.firstNameHelper).toHaveText(fixtures.firstNameError);
        await expect(SignupPage.lastNameHelper).toHaveText(fixtures.lastNameError);
        await expect(SignupPage.usernameHelper).toHaveText(fixtures.usernameError);
        await expect(SignupPage.passwordHelper).toHaveText(fixtures.passwordError);
        await expect(SignupPage.passwordConfirmHelper).toHaveText(fixtures.confirmPasswordError);
    })
})