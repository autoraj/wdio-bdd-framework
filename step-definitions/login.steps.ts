import { Given, When, Then } from '@wdio/cucumber-framework'
import LoginPage from '../pageobjects/login.page'
import { expect } from '@wdio/globals'
import BasePage from '../pageobjects/login.page'

Given('I open Amazon website', async () => {
  await LoginPage.openAmazon()
})

When('I click on sign in', async () => {
  await LoginPage.clickSignIn()
})

When(/^I enter invalid email "(.*.)"$/, async (email: string) => {
  await LoginPage.enterEmail(email)
})

When('I continue login', async () => {
  await LoginPage.clickContinue()
})

//comments added
Then('I should see login error message', async () => {
  const error = await LoginPage.getErrorText()
  await expect(error).toContain('problem')
})
