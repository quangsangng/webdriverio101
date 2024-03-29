import Page from './Page'


const locatorOfSchedulerPage = {
    createNewAppointmentButton: '//*[@id="smart_main_menu_part"]/span[1]/a',
    subjectInputField: '[title="Appointment title"]',
    addAppointmentButton: '//*[@id="schedule_submit_button"]/a',
    deleteAppointmentButton: '//*[@id="main_menu_part"]/div[1]/span[2]/span/a',
    confirmToDeleteButton_YES: '//*[@id="schedule_button_save"]/a',
    titleOfAppointment: '//*[@id="event_list"]/h2',
    startHour: '#start_hour',
    endHour: '#end_hour',
    errorCode: '.error_code',
    errorDiagnosis: '.error_diagnosis',
    confirmToCloseErrorMsg: '//*[@id="msgbox_btn_ok"]/a',
    allDayAppointment: '//*[@id="schedule/add"]/div[2]/span[2]/span/a',
    regularAppointment: '//*[@id="schedule/add"]/div[1]/span[2]/span',
    activeTab: 'span.tab_on  span',
    notiAboveAppointmentTab: '#body > div.mainarea > div > div.explanation.mTop3.mBottom5'
}



class SchedulerPage extends Page {

    get createNewAppointmentButton () { return $(locatorOfSchedulerPage.createNewAppointmentButton) }
    get subjectInputField () { return $(locatorOfSchedulerPage.subjectInputField) }
    get addAppointmentButton () { return $(locatorOfSchedulerPage.addAppointmentButton) }
    get deleteAppointmentButton () { return $(locatorOfSchedulerPage.deleteAppointmentButton) }
    get confirmToDeleteButton_YES () { return $(locatorOfSchedulerPage.confirmToDeleteButton_YES) }
    get titleOfAppointment () { return $(locatorOfSchedulerPage.titleOfAppointment) }
    get startHour () { return $(locatorOfSchedulerPage.startHour) }
    get endHour () { return $(locatorOfSchedulerPage.endHour) }
    get errorCode () { return $(locatorOfSchedulerPage.errorCode) }
    get errorDiagnosis () { return $(locatorOfSchedulerPage.errorDiagnosis) }
    get confirmToCloseErrorMsg () { return $(locatorOfSchedulerPage.confirmToCloseErrorMsg) }
    get allDayAppointment () { return $(locatorOfSchedulerPage.allDayAppointment) }
    get regularAppointment () { return $(locatorOfSchedulerPage.regularAppointment) }
    get activeTab () {return $(this.activeTab)}
    get notiAboveAppointmentTab () {return $(locatorOfSchedulerPage.notiAboveAppointmentTab)}

    async open () {
        await super.open('/g/schedule/')
    }

    async clickNewAppointment () {
        await super.waitUntilElementDisplayed(this.createNewAppointmentButton)
        await this.createNewAppointmentButton.click()
    }

    async setValueForSubjectInputField (subjectName){
        await this.subjectInputField.setValue(subjectName)
    }

    async setStartEndHour(starthour, endhour){
        await this.startHour.selectByIndex(starthour)
        await this.endHour.selectByIndex(endhour)
    }

    async clickAddButton () {
        await this.addAppointmentButton.click()
    }

    async verifyNameOfCreatedAppointment (subjectName) {
        await super.waitUntilElementDisplayed(this.titleOfAppointment)
        // Xác nhận xem cuộc họp được tạo có trùng tên với mình đặt không
        await expect(this.titleOfAppointment).toHaveText(subjectName)
    }

    async verifyErrorMsg(errorCode, errorDiagnosis) {
        // Xác nhận thông báo lỗi được hiển thị
        await super.waitUntilElementDisplayed(this.errorDiagnosis)
        await expect(this.errorCode).toHaveText(errorCode)
        await expect(this.errorDiagnosis).toHaveText(errorDiagnosis)
    }

    async clickConfirmErrorMsg(){
        await this.confirmToCloseErrorMsg.click()
    }

    async deleteAppointment () {
        await super.waitUntilElementDisplayed(this.deleteAppointmentButton)
        await this.deleteAppointmentButton.click()
        await super.waitUntilElementDisplayed(this.confirmToDeleteButton_YES)
        await this.confirmToDeleteButton_YES.click()
        await super.waitUntilElementDisplayed(this.createNewAppointmentButton) 
    }

    async clickAllDayAppointment () {
        await this.allDayAppointment.click()
        await super.waitUntilElementDisplayed(this.notiAboveAppointmentTab) 
        // await browser.pause(2000)
    }

    async clickRegularAppointment () {
        await this.regularAppointment.click()
    }
}


export default new SchedulerPage()
export {locatorOfSchedulerPage}