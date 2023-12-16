const inputFirstName = '#firstName'
const inputLastName = '#lastName'
const inputUsername = '#username'
const inputPassword = '#password'
const inputPasswordConfirm = '#confirmPassword'
const firstNameHelper = '#firstName-helper-text'
const lastNameHelper = '#lastName-helper-text'
const usernameHelper = '#username-helper-text'
const passwordHelper = '#password-helper-text'
const passwordConfirmHelper = '#confirmPassword-helper-text'

class SignupPage {
    async helpersCheck() {
        await $(inputFirstName).click();
        await $(inputLastName).click();
        await $(inputUsername).click();
        await $(inputPassword).click();
        await $(inputPasswordConfirm).click();
        await browser.action('pointer').move({x:100, y:100}).down().up().perform();
    }

    get firstNameHelper() {
        return $(firstNameHelper);
    }

    get lastNameHelper() {
        return $(lastNameHelper);
    }

    get usernameHelper() {
        return $(usernameHelper);
    }

    get passwordHelper() {
        return $(passwordHelper);
    }

    get passwordConfirmHelper() {
        return $(passwordConfirmHelper);
    }

    async inputPassword(password){
        await $(inputPassword).setValue(password);
    }

    async inputPasswordConfirm(password){
        await $(inputPasswordConfirm).setValue(password);
    }

    open () {
        return browser.url(`/signup`)
    }
}

export default new SignupPage();