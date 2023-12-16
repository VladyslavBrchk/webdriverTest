const inputUsername = '#username';
const inputPassword = '#password';
const btnSubmit = 'button[type="submit"]'
const errorMsg = '[data-test="signin-error"]'

class LoginPage {
    get btnSubmit () {
        return $(btnSubmit);
    }

    get errorMsg () {
        return $(errorMsg);
    }
  
    async clickSignIn () {
        await $(btnSubmit).click();
    }

    async login (username, password) {
        await $(inputUsername).setValue(username);
        await $(inputPassword).setValue(password);
        await this.clickSignIn()
    }

    open () {
        return browser.url(`/signin/`)
    }
}

export default new LoginPage();