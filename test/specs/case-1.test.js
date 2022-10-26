import LoginPage from '../pages/Login.page'
import GaroonPage from '../pages/Garoon.page'
import {account} from '../data/account.data'
import SchedulerPage from '../pages/Scheduler.page'

describe('Verify create regular appointment successfully', async () => {
    before(async () => {
        await LoginPage.open()
    })

    beforeEach( async () => {
        await LoginPage.username.setValue(account.username)
        await LoginPage.password.setValue(account.password)
        await LoginPage.login()
        await GaroonPage.open()
        await SchedulerPage.open()
    });

    afterEach( async () => {
        await GaroonPage.logout()
    })

    it('TCID101 - Create regular appointment with subject', async () => {
        const subjectName = "ĐÂY LÀ CUỘC HỌP"
        await SchedulerPage.clickNewAppointment()
        await SchedulerPage.setStartEndHour(5, 10)
        await SchedulerPage.setValueForSubjectInputField(subjectName)
        await SchedulerPage.clickAddButton()
        await SchedulerPage.verifyNameOfCreatedAppointment(subjectName)
        await SchedulerPage.deleteAppointment()
    });

    it('TCID10122 - Create regular appointment with subject', async () => {
        await SchedulerPage.clickNewAppointment()
        await SchedulerPage.setValueForSubjectInputField()
        await SchedulerPage.setStartEndHour(10, 5)
        await SchedulerPage.clickAddButton()
        await SchedulerPage.verifyErrorMsg('GRN_SCHD_13012', 'Date and time are invalid.')
        await SchedulerPage.clickConfirmErrorMsg()
    });
})

