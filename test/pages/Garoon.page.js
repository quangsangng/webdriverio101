import Page from './Page'
import {locatorOfService} from '../pages/Service.page'


const locatorOfGaroonPage = {
    dropdownButton: '//*[@id="cloudHeader-userName-grn"]',
    logoutButton: '//*[@id="com-header-logout-link"]'
}

class GaroonPage extends Page {

    get dropdownButton () { return $(locatorOfGaroonPage.dropdownButton) }
    get logoutButton () { return $(locatorOfGaroonPage.logoutButton) }

    async open () {
        const headerOfService = await $(locatorOfService.title)
        await super.waitUntilElementDisplayed(headerOfService) 
        // Chờ cho cái header của trang service hiện ra rồi mới nhảy qua trang khác
        await super.open('/g')
    }

    async logout () {
        await this.dropdownButton.click()
        await this.logoutButton.click()
    }

}

export default new GaroonPage()
export {locatorOfGaroonPage}

