import { When, Then } from '@cucumber/cucumber';
import { type Validation, type MemoryValue } from '@qavajs/core';

class DialogHolder {
    currentDialog!: Promise<WebdriverIO.Dialog>;
    isListening: boolean = false;
}

const dialogHolder = new DialogHolder();

function checkIfListening(isListening: boolean) {
    if (!isListening) {
        throw new Error(`Step 'I will wait for alert/dialog' must be called before`);
    }
}
/**
 * Start listen for alert
 * @example I will wait for dialog
 */
When('I will wait for alert/dialog', async function () {
    if (this.wdio.browser.isBidi) {
        dialogHolder.isListening = true;
        dialogHolder.currentDialog = new Promise(resolve => this.wdio.browser.on('dialog', resolve));
    }
});

/**
 * Accept alert
 * @example I accept alert
 */
When('I accept alert/dialog', async function () {
    if (this.wdio.browser.isBidi) {
        checkIfListening(dialogHolder.isListening);
        const dialog = await dialogHolder.currentDialog;
        await dialog.accept();
    } else {
        await this.wdio.browser.waitUntil(async () => {
            await this.wdio.browser.acceptAlert();
            return true;
        }, {
            timeout: this.config.browser.timeout.present,
            interval: 2000
        });
    }

});

/**
 * Dismiss alert
 * @example I dismiss alert
 */
When('I dismiss alert', async function () {
    if (this.wdio.browser.isBidi) {
        checkIfListening(dialogHolder.isListening);
        const dialog = await dialogHolder.currentDialog;
        await dialog.dismiss();
    } else {
        await this.wdio.browser.waitUntil(async () => {
            await this.wdio.browser.dismissAlert();
            return true;
        }, {
            timeout: this.config.browser.timeout.present,
            interval: 2000
        });
    }
});

/**
 * I type {string} to alert
 * @example I type 'coffee' to alert
 */
When('I type {value} to alert', async function (value: MemoryValue) {
    const message = await value.value();
    if (this.wdio.browser.isBidi) {
        checkIfListening(dialogHolder.isListening);
        const dialog = await dialogHolder.currentDialog;
        await dialog.accept(message);
    } else {
        await this.wdio.browser.waitUntil(async () => {
            await this.wdio.browser.sendAlertText(message);
            await this.wdio.browser.acceptAlert();
            return true;
        }, {
            timeout: this.config.browser.timeout.present,
            interval: 2000
        });
    }
});

/**
 * Verify that text of an alert meets expectation
 * @param {string} validationType - validation
 * @param {string} value - expected text value
 * @example I expect text of alert does not contain 'coffee'
 */
Then('I expect text of alert {validation} {value}', async function (validation: Validation, expected: MemoryValue) {
    let alertText;
    if (this.wdio.browser.isBidi) {
        checkIfListening(dialogHolder.isListening);
        const dialog = await dialogHolder.currentDialog;
        alertText = dialog.message();
    } else {
        alertText = await this.wdio.browser.waitUntil(async () => {
            return await this.wdio.browser.getAlertText();
        }, {
            timeout: this.config.browser.timeout.present,
            interval: 2000
        });
    }
    validation(alertText, await expected.value());
});