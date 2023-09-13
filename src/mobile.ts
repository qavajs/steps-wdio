import { DataTable, When } from '@cucumber/cucumber';
import { conditionValidations, conditionWait } from './conditionWait';
import { getValue, getElement } from './transformers';

/**
 * Tap element
 * @param {string} alias - element to tap
 * @example I tap 'Google Button'
 */
When('I tap {string}', async function(alias: string) {
    const element = await getElement(alias) as WebdriverIO.Element;
    await conditionWait(element, conditionValidations.VISIBLE, config.browser.timeout.visible);
    await element.click();
});

/**
 * Shake device
 * @example I shake device
 */
When('I shake device', async function() {
    await driver.shake();
});

/**
 * Lock device (Android)
 * @example I lock device
 */
When('I lock device', async function() {
    await driver.lock();
});

/**
 * Unlock device
 * @example I unlock device
 */
When('I unlock device', async function() {
    await driver.unlock();
});

/**
 * Lock device for particular time
 * @example I lock device for 2 sec
 */
When('I lock device for {int} sec', async function(time) {
    await driver.lock(time);
});

/**
 * Send sms
 * @param {string} phoneNumber - the phone number to send the SMS to
 * @param {string} message - the SMS message
 * @example I send sms to '5551234567' with 'some text' message
 */
When('I send sms to {string} with {string} message', async function(phoneNumber: string, message: string) {
    await driver.sendSms(await getValue(phoneNumber), await getValue(message));
});

/**
 * Make call
 * @param {string} phoneNumber - the phone number to make call
 * @example I call to '5551234567'
 */
When('I call to {string}', async function(phoneNumber: string) {
    await driver.gsmCall(await getValue(phoneNumber), 'call');
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
When('I perform touch action:', async function(actionsTable: DataTable) {
    const { width, height } = await driver.getWindowSize();
    const actions = await Promise.all(actionsTable.raw().map(async ([action, params]) => {
        const options: any = {};
        if (action === 'press' || action === 'moveTo') {
            const [x, y] = await Promise.all(
                params.split(/\s*,\s*/).map(async p => parseFloat(await getValue(p)))
            );
            options.x = width * x / 100;
            options.y = height * y / 100;
        } else if (action === 'wait') {
            options.ms = parseFloat(await getValue(params))
        }
        return { action, options }
    }));
    await driver.touchPerform(actions);
});

/**
 * Perform touch action saved in memory
 * @param {string} actionsAlias - memory alias which resolves to action sequence  (see https://webdriver.io/docs/api/appium#touchperform)
 * @example
 * When I perform touch action '$actions'
 */
When('I perform touch action {string}', async function (actionsAlias: string) {
    await driver.touchPerform(await getValue(actionsAlias));
});

/**
 * Push file onto device
 * @param {string} file - file data (base64 or Buffer)
 * @param {string} path - device path
 * @example
 * When I push '$fileData' file as '/data/local/tmp/foo.bar'
 */
When('I push {string} file as {string}', async function (file, path) {
    const fileData = await getValue(file);
    const devicePath = await getValue(path);
    const base64Content = fileData instanceof Buffer ? fileData.toString('base64') : fileData;
    await driver.pushFile(devicePath, base64Content);
});

/**
 * Pull file from device (as base64)
 * @param {string} path - device path
 * @param {string} memoryKey - memory key to save file
 * @example
 * When I pull '/data/local/tmp/foo.bar' file as 'fileData'
 */
When('I pull {string} file as {string}', async function (path, memoryKey) {
    const devicePath = await getValue(path);
    const fileData = await driver.pullFile(devicePath);
    memory.setValue(memoryKey, fileData);
});
