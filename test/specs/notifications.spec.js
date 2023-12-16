import { expect } from '@wdio/globals'
import LoginPage from '../pageobjects/login.page.js'
import HomePage from '../pageobjects/home.page.js'
import NotificationsPage from '../pageobjects/notifications.page.js'
import fixtures from '../../fixtures.json' assert {type:'json'}

let notificationsCount;

describe('Notifications Testing', () => {
    beforeEach(async () => {
        await LoginPage.open();
        await LoginPage.login(fixtures.username, fixtures.password);
        notificationsCount = HomePage.notificationsCount;
    })

    it('Notification Delete Test', async () => {
        if(NotificationsPage.dismissButton[0].isExisting()){
            await HomePage.clickNotificationsButton();
            await NotificationsPage.clickDismissButton(0);
            notificationsCount--;
            await expect(HomePage.notificationsCount).toBe(notificationsCount);
        }
    })
})