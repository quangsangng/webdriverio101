import LoginPage from '../pages/Login.page'
import {account} from '../data/account.data'
import SchedulerPage from '../pages/Scheduler.page'




describe('Verify create regular appointment successfully', async () => {
    before(async () => {
        await LoginPage.open()
        await LoginPage.setCert()
    })

    beforeEach( async () => {
        await LoginPage.username.setValue(account.username)
        await LoginPage.password.setValue(account.password)
        await LoginPage.login()
        await LoginPage.waitForLoginSuccess()
        await SchedulerPage.open()
    });

    afterEach( async () => {
        await SchedulerPage.logout()
    })

    it('TCID101 - Create regular appointment with subject', async () => {
        const subjectName = "ĐÂY LÀ CUỘC HỌP REGULAR"
        await SchedulerPage.clickNewAppointment()
        await SchedulerPage.setStartEndHour(5, 10)
        await SchedulerPage.setValueForSubjectInputField(subjectName)
        await SchedulerPage.clickAddButton()
        await SchedulerPage.verifyNameOfCreatedAppointment(subjectName)
        await SchedulerPage.deleteAppointment()
    });

    it('TCID101 - Create all day appointment with subject', async () => {
        const subjectName = "ĐÂY LÀ CUỘC HỌP ALL DAY"
        await SchedulerPage.clickNewAppointment()
        await SchedulerPage.clickAllDayAppointment()
        await SchedulerPage.setValueForSubjectInputField(subjectName)
        await SchedulerPage.clickAddButton()
        await SchedulerPage.verifyNameOfCreatedAppointment(subjectName)
        await SchedulerPage.deleteAppointment()
    });

})

