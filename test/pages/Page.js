import {locatorOfService} from '../pages/Service.page'



const locatorOfHeader = {
    dropdownButton: '//*[@id="cloudHeader-userName-grn"]',
    logoutButton: '//*[@id="com-header-logout-link"]'
}



export default class Page { 
    
    get dropdownButton () { return $(locatorOfHeader.dropdownButton) }
    get logoutButton () { return $(locatorOfHeader.logoutButton) }
    
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

    async waitUntilElementShowText(locator, text){
        await browser.waitUntil(async () => (await locator.getText()  === text), this.timeOutMsg )
    }

    async waitForLoginSuccess(){
        const headerOfService = await $(locatorOfService.title)
        await this.waitUntilElementDisplayed(headerOfService) 
    }

    async logout () {
        await this.dropdownButton.click()
        await this.logoutButton.click()
    }

    async setCert(){

        // await browser.pause(3000)
        // // await browser.keys("\uE007")
        console.log('send key')
        // await browser.keys(['Meta', '\uE007'])
    }
}