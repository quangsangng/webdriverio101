export default class Page { 
    constructor() {
        this.timeOutMsg = {
            timeout: 10000,
            timeoutMsg: 'Chờ 10s nếu không được là fail'
        }
    }

    async open (path) {
        await browser.url(path)
    }
    
    async waitUntilElementDisplayed(locator) {
        await browser.waitUntil( async () => (await locator.isDisplayed() === true), this.timeOutMsg );
    }
}