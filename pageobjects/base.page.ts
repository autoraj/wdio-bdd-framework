export default class BasePage {
  async open(url: string) {
    await browser.url(url)
  }
}
