import BasePage from './base.page'

class LoginPage extends BasePage {

  get signInButton() {
    return $('#nav-link-accountList')
  }

  get emailInput() {
    return $('#ap_email')
  }

  get continueButton() {
    return $('#continue')
  }

  get errorMessage() {
    return $('.a-alert-content')
  }

  async openAmazon() {
    await this.open('https://www.amazon.com')
  }

  async clickSignIn() {
    await this.signInButton.waitForClickable({ timeout: 10000 })
    await this.signInButton.click()
  }

  async enterEmail(email: string) {
    await this.emailInput.waitForDisplayed({ timeout: 10000 })
    await this.emailInput.setValue(email)
  }

  async clickContinue() {
    await this.continueButton.click()
  }

  async getErrorText() {
    await this.errorMessage.waitForDisplayed({ timeout: 10000 })
    return await this.errorMessage.getText()
  }
}

export default new LoginPage()
