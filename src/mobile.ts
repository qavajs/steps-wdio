import { Locator } from './pageObject';
import { type MemoryValue, DataTable, When } from '@qavajs/core';
import { QavajsWdioWorld } from './QavajsWdioWorld';

/**
 * Tap element
 * @param {string} alias - element to tap
 * @example I tap 'Google Button'
 */
When('I tap {wdioLocator}', async function(this: QavajsWdioWorld, locator: Locator) {
    await locator().click();
});

/**
 * Shake device
 * @example I shake device
 */
When('I shake device', async function(this: QavajsWdioWorld) {
    await this.wdio.driver.shake();
});

/**
 * Lock device (Android)
 * @example I lock device
 */
When('I lock device', async function(this: QavajsWdioWorld) {
    await this.wdio.driver.lock();
});

/**
 * Unlock device
 * @example I unlock device
 */
When('I unlock device', async function(this: QavajsWdioWorld) {
    await this.wdio.driver.unlock();
});

/**
 * Lock device for particular time
 * @example I lock device for 2 sec
 */
When('I lock device for {int} sec', async function(this: QavajsWdioWorld, time) {
    await this.wdio.driver.lock(time);
});

/**
 * Send sms
 * @param {string} phoneNumber - the phone number to send the SMS to
 * @param {string} message - the SMS message
 * @example I send sms to '5551234567' with 'some text' message
 */
When('I send sms to {value} with {value} message', async function(this: QavajsWdioWorld, phoneNumber: MemoryValue, message: MemoryValue) {
    await this.wdio.driver.sendSms(await phoneNumber.value(), await message.value());
});

/**
 * Make call
 * @param {string} phoneNumber - the phone number to make call
 * @example I call to '5551234567'
 */
When('I call to {value}', async function(this: QavajsWdioWorld, phoneNumber: MemoryValue) {
    await this.wdio.driver.gsmCall(await phoneNumber.value(), 'call');
});

/**
 * Perform touch action
 * @param {DataTable} actionsTable - data table of actions and params (see https://webdriver.io/docs/api/appium#touchperform)
 * press and move to accept x and y percentages of current viewport
 * wait accepts milliseconds
 * release doesn't accept any params
 * @example
 * When I perform touch action:
 *   | press   | 90, 80 |
 *   | wait    | 200    |
 *   | moveTo  | 10, 80 |
 *   | release |        |
 */
When('I perform touch action:', async function(this: QavajsWdioWorld, actionsTable: DataTable) {
    const { width, height } = await this.wdio.driver.getWindowSize();
    const actions = await Promise.all(actionsTable.raw().map(async ([action, params]) => {
        const options: any = {};
        if (action === 'press' || action === 'moveTo') {
            const [x, y] = await Promise.all(
                params.split(/\s*,\s*/).map(async p => parseFloat(await this.getValue(p)))
            );
            options.x = width * x / 100;
            options.y = height * y / 100;
        } else if (action === 'wait') {
            options.ms = parseFloat(await this.getValue(params))
        }
        return { action, options }
    }));
    await this.wdio.driver.touchPerform(actions);
});

/**
 * Perform touch action saved in memory
 * @param {string} actionsAlias - memory alias which resolves to action sequence  (see https://webdriver.io/docs/api/appium#touchperform)
 * @example
 * When I perform touch action '$actions'
 */
When('I perform touch action {value}', async function (this: QavajsWdioWorld, actions: MemoryValue) {
    await this.wdio.driver.touchPerform(await actions.value());
});

/**
 * Push file onto device
 * @param {string} file - file data (base64 or Buffer)
 * @param {string} path - device path
 * @example
 * When I push '$fileData' file as '/data/local/tmp/foo.bar'
 */
When('I push {value} file as {value}', async function (this: QavajsWdioWorld, file: MemoryValue, path: MemoryValue) {
    const fileData = await file.value();
    const devicePath = await path.value();
    const base64Content = fileData instanceof Buffer ? fileData.toString('base64') : fileData;
    await this.wdio.driver.pushFile(devicePath, base64Content);
});

/**
 * Pull file from device (as base64)
 * @param {string} path - device path
 * @param {string} memoryKey - memory key to save file
 * @example
 * When I pull '/data/local/tmp/foo.bar' file as 'fileData'
 */
When('I pull {value} file as {value}', async function (this: QavajsWdioWorld, path: MemoryValue, key: MemoryValue) {
    const fileData = await this.wdio.driver.pullFile(await path.value());
    key.set(fileData);
});

/**
 * Hide keyboard using default strategy
 * @example
 * When I hide keyboard
 */
When('I hide keyboard', async function (this: QavajsWdioWorld) {
    await this.wdio.driver.hideKeyboard();
});

/**
 * Hide keyboard pressing certain key
 * @param {string} key - key to press
 * @example
 * When I hide keyboard pressing 'Return'
 */
When('I hide keyboard pressing {value}', async function (this: QavajsWdioWorld, key: MemoryValue) {
    await this.wdio.driver.hideKeyboard('pressKey', await key.value());
});
