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

    it('TCID201 - Create regular appointment with start hour > end hour', async () => {
        await SchedulerPage.clickNewAppointment()
        await SchedulerPage.setValueForSubjectInputField()
        await SchedulerPage.setStartEndHour(10, 5)
        await SchedulerPage.clickAddButton()
        await SchedulerPage.verifyErrorMsg('GRN_SCHD_13012', 'Date and time are invalid.')
        await SchedulerPage.clickConfirmErrorMsg()
    });
})