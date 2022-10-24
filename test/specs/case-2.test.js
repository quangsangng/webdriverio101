describe('Verify create regular appointment failed with expected error', async () => {

    const account = {
        username: 'sang-nguyen',
        password: 'sang123456'
    }

    const appointment = {
        subject: 'Cuộc họp thất bại'
    }

    const locatorOfLoginPage = {
        usernameInputField: '//*[@id="username-:0-text"]',
        passwordInputField: '//*[@id="password-:1-text"]',
        loginButton: '.login-button'
    }

    const locatorOfService = {
        title: '/html/body/div[5]/div/div[1]/h2'
    }

    const locatorOfScheduler = {
        createNewAppointmentButton: '//*[@id="smart_main_menu_part"]/span[1]/a',
        subjectInputField: '//*[@id="main_table"]/tbody/tr[2]/td/div/div[2]/input',
        addAppointmentButton: '//*[@id="schedule_submit_button"]/a',
        deleteAppointmentButton: '//*[@id="main_menu_part"]/div[1]/span[2]/span/a',
        confirmToDeleteButton_YES: '//*[@id="schedule_button_save"]/a',
        titleOfAppointment: '//*[@id="event_list"]/h2',
        startHour: '#start_hour',
        endHour: '#end_hour',
        errorCode: '.error_code',
        errorDiagnosis: '.error_diagnosis',
        confirmToCloseErrorMsg: '//*[@id="msgbox_btn_ok"]/a'
    }

    const locatorOfGaroon = {
        dropdownButton: '//*[@id="cloudHeader-userName-grn"]',
        logoutButton: '//*[@id="com-header-logout-link"]'
    }

    const timeOutMsg = {
        timeout: 5000,
        timeoutMsg: 'Chờ 5s nếu không được là fail'
    }

    beforeEach( async () => {
        // Login and go to Scheduler
        const usernameField = await $(locatorOfLoginPage.usernameInputField)
        const passwordField = await $(locatorOfLoginPage.passwordInputField)
        const loginButton = await $(locatorOfLoginPage.loginButton)
        
        await browser.url('/')
        await browser.waitUntil( async () => (await loginButton.isDisplayed() === true), timeOutMsg );
        await usernameField.setValue(account.username)
        await passwordField.setValue(account.password)
        await loginButton.click()
        await browser.waitUntil( async () => (await $(locatorOfService.title).isDisplayed() === true), timeOutMsg );
        await browser.url('g/schedule/')
    });

    afterEach( async () => {
        // Logout
        const dropdownButton = await $(locatorOfGaroon.dropdownButton)
        const logoutButton = await $(locatorOfGaroon.logoutButton)
        await dropdownButton.click()
        await logoutButton.click()
    })


    it('TCID201 - Create regular appointment with start hour > end hour', async () => {
        // Load các locator
        const createNewAppointmentButton = await $(locatorOfScheduler.createNewAppointmentButton)
        const subjectInputField = await $(locatorOfScheduler.subjectInputField)
        const addAppointmentButton = await $(locatorOfScheduler.addAppointmentButton)
        const startHour = await $(locatorOfScheduler.startHour)
        const endHour = await $(locatorOfScheduler.endHour)
        const errorCode = await $(locatorOfScheduler.errorCode)
        const errorDiagnosis = await $(locatorOfScheduler.errorDiagnosis)       
        const confirmToCloseErrorMsg = await $(locatorOfScheduler.confirmToCloseErrorMsg)

        await browser.waitUntil( async () => ( await createNewAppointmentButton.isDisplayed() === true) , timeOutMsg );
        await createNewAppointmentButton.click()
        await startHour.selectByIndex(10)
        await endHour.selectByIndex(5)
        await subjectInputField.setValue(appointment.subject)
        await addAppointmentButton.click()
        

        // Xác nhận thông báo lỗi được hiển thị
        await browser.waitUntil( async () => (await errorCode.isDisplayed() === true), timeOutMsg );
        await expect(errorCode).toHaveText('GRN_SCHD_13012')
        await expect(errorDiagnosis).toHaveText('Date and time are invalid.')
        await confirmToCloseErrorMsg.click()
    });
});