const dismissButton = '[data-test^="notification-mark-read-"]'


class NotificationsPage {
    get dismissButton() {
        return $$(dismissButton);
    }

    async clickDismissButton(index) {
        await this.dismissButton[index].click();
    }
}

export default new NotificationsPage();