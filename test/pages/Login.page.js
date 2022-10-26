import Page from './Page'


const locatorOfLoginPage = {
    usernameInputField: '//*[@id="username-:0-text"]',
    passwordInputField: '//*[@id="password-:1-text"]',
    loginButton: '.login-button'
}


class LoginPage extends Page {

    get username () { return $(locatorOfLoginPage.usernameInputField) }
    get password () { return $(locatorOfLoginPage.passwordInputField) }
    get loginBtn () { return $(locatorOfLoginPage.loginButton) }

    async open () {
        await super.open('/login')
    }

    async login () {
        await this.loginBtn.click()
    }

}

export default new LoginPage()
export {locatorOfLoginPage}