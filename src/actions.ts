import { When } from '@cucumber/cucumber';
import { conditionValidations, conditionWait } from './conditionWait';
import { getValue, getElement } from './transformers';
import { parseCoords, parseKeySequence, parseCoordsAsObject } from './utils';
import { click, doubleClick, rightClick } from './click';
import { dragAndDrop } from './utils';

/**
 * Opens provided url
 * @param {string} url - url to navigate
 * @example I open 'https://google.com'
 */
When('I open {string} url', async function (url: string) {
    const urlValue = await getValue(url);
    await browser.url(urlValue);
});

/**
 * Type text to element
 * @param {string} alias - element to type
 * @param {string} value - value to type
 * @example I type 'wikipedia' to 'Google Input'
 */
When('I type {string} to {string}', async function (value: string, alias: string) {
    const element = await getElement(alias) as WebdriverIO.Element;
    const typeValue = await getValue(value);
    await conditionWait(element, conditionValidations.VISIBLE, config.browser.timeout.visible);
    await element.addValue(typeValue);
});

/**
 * Type text to element sending fine-grained keyboard events
 * @param {string} alias - element to type
 * @param {string} value - value to type
 * @example I type 'wikipedia' chars to 'Google Input'
 */
When('I type {string} chars to {string}', async function (value: string, alias: string) {
    const element = await getElement(alias) as WebdriverIO.Element;
    const typeValue = await getValue(value);
    await conditionWait(element, conditionValidations.VISIBLE, config.browser.timeout.visible);
    await element.click();
    await browser.keys(typeValue);
});

/**
 * Click element
 * @param {string} alias - element to click
 * @param {boolean} [disableWait] - disable wait before click
 * @example I click 'Google Button'
 * @example I click 'Google Button' (disable actionability wait)
 */
When('I click {string}( ){wdioDisableActionabilityCheck}', async function (alias: string, disableWait: boolean) {
    await click(alias, disableWait);
});

/**
 * Double click element
 * @param {string} alias - double element to click
 * @param {boolean} [disableWait] - disable wait before click
 * @example I double click 'Google Button'
 * @example I double click 'Google Button' (disable actionability wait)
 */
When('I double click {string}( ){wdioDisableActionabilityCheck}', async function (alias: string, disableWait: boolean) {
    await doubleClick(alias, disableWait);
});

/**
 * Right click element
 * @param {string} alias - element to right click
 * @param {boolean} [disableWait] - disable wait before click
 * @example I right click 'Google Button'
 * @example I right click 'Google Button' (disable actionability wait)
 */
When('I right click {string}( ){wdioDisableActionabilityCheck}', async function (alias: string, disableWait: boolean) {
    await rightClick(alias, disableWait);
});

/**
 * Click element via script
 * @param {string} alias - element to click
 * @example I force click 'Google Button'
 */
When('I force click {string}', async function (alias: string) {
    const element = await getElement(alias);
    await browser.execute((e: HTMLElement) => e.click(), element as any);
});

/**
 * Clear input
 * @param {string} alias - element to clear
 * @example I clear 'Google Input'
 */
When('I clear {string}', async function (alias: string) {
    const element = await getElement(alias) as WebdriverIO.Element;
    await conditionWait(element, conditionValidations.VISIBLE, config.browser.timeout.visible);
    await element.clearValue();
});

/**
 * Click on element with desired text in collection
 * @param {string} expectedText - text to click
 * @param {string} alias - collection to search text
 * @example I click 'google' text in 'Search Engines' collection
 */
When(
    'I click {string} text in {string} collection',
    async function (value: string, alias: string) {
        const collection = await getElement(alias) as WebdriverIO.Element[];
        const expectedText = await getValue(value);
        for (const ePromise of collection) {
            const element = await ePromise;
            const text = await element.getText();
            if (text === await expectedText) {
                return element.click();
            }
        }
        throw new Error(`text '${expectedText}' is not found in collection`);
    });

/**
 * Switch to parent frame
 * @example I switch to parent frame
 */
When('I switch to parent frame', async function () {
    await browser.switchToParentFrame();
});

/**
 * Switch to frame by index
 * @param {number} index - index to switch
 * @example I switch to 2 frame
 */
When('I switch to {int} frame', async function (index: number) {
    await browser.switchToFrame(index);
});

/**
 * Switch to frame by alias
 * @param {string} alias - po alias
 * @example I switch to 'Checkout Iframe' frame
 */
When('I switch to {string} frame', async function (alias: string) {
    const element = await getElement(alias) as WebdriverIO.Element;
    await browser.switchToFrame(element);
});

/**
 * Switch to window by index
 * @param {number} index - index to switch
 * @example I switch to 2 window
 */
When('I switch to {int} window', async function (index: number) {
    await browser.waitUntil(
        async () => (await browser.getWindowHandles()).length >= index,
        { timeout: config.browser.timeout.page }
    );
    const windowHandles = await browser.getWindowHandles();
    await browser.switchToWindow(windowHandles[index - 1]);
});

/**
 * Switch to window by text
 * @param {string} matcher - window matcher (url or title)
 * @example I switch to 'google.com' window
 */
When('I switch to {string} window', async function (matcher: string) {
    const urlOrTitle = await getValue(matcher);
    await browser.waitUntil(
        async () => {
            try {
                await browser.switchWindow(matcher);
                return true
            } catch (err) {
                return false
            }
        },
        {
            timeout: config.browser.timeout.page,
            timeoutMsg: `Page matching ${urlOrTitle} was not found`,
            interval: 500
        }
    );
});

/**
 * Refresh current page
 * @example I refresh page
 */
When('I refresh page', async function () {
    await browser.refresh();
});

/**
 * Press button
 * @param {string} key - key to press
 * @example I press 'Enter' key
 * @example I press 'Ctrl+C' keys
 */
When('I press {string} key(s)', async function (key: string) {
    const keySequence: string | string[] = await getValue(key);
    const keys = parseKeySequence(keySequence);
    await browser.keys(keys);
});

/**
 * Press button given number of times
 * @param {string} key - key to press
 * @param {number} num - number of times
 * @example I press 'Enter' key 5 times
 * @example I press 'Ctrl+V' keys 4 times
 */
When('I press {string} key(s) {int} time(s)', async function (key: string, num: number) {
    const keySequence: string | string[] = await getValue(key);
    const keys = parseKeySequence(keySequence);
    for (let i: number = 0; i < num; i++) {
      await browser.keys(keys);
    }
});

/**
 * Hover over element
 * @param {string} alias - element to hover over
 * @example I hover over 'Google Button'
 */
When('I hover over {string}', async function (alias: string) {
    const element = await getElement(alias) as WebdriverIO.Element;
    await conditionWait(element, conditionValidations.VISIBLE, config.browser.timeout.visible);
    await element.moveTo();
});

/**
 * Select option with certain text from select element
 * @param {string} option - option to select
 * @param {string} alias - alias of select
 * @example I select '1900' option from 'Registration Form > Date Of Birth'
 * @example I select '$dateOfBirth' option from 'Registration Form > Date Of Birth' dropdown
 */
When('I select {string} option from {string} dropdown', async function (option: string, alias: string) {
    const optionValue = await getValue(option);
    const select = await getElement(alias) as WebdriverIO.Element;
    await conditionWait(select, conditionValidations.VISIBLE, config.browser.timeout.visible);
    await select.selectByVisibleText(optionValue)
});

/**
 * Select option with certain text from select element
 * @param {number} optionIndex - index of option to select
 * @param {string} alias - alias of select
 * @example I select 1 option from 'Registration Form > Date Of Birth' dropdown
 */
When('I select {int}(st|nd|rd|th) option from {string} dropdown', async function (optionIndex: number, alias: string) {
    const select = await getElement(alias) as WebdriverIO.Element;
    await conditionWait(select, conditionValidations.VISIBLE, config.browser.timeout.visible);
    await select.selectByIndex(optionIndex - 1)
});

/**
 * Scroll to element
 * @param {string} alias - alias of element
 * @example I scroll to 'Element'
 */
When('I scroll to {string}', async function (alias) {
    const element = await getElement(alias) as WebdriverIO.Element;
    await browser.execute((element: WebdriverIO.Element) => element.scrollIntoView(), element)
});

/**
 * Click browser button
 * @param {string} button - browser button
 * @example I click back button
 * @example I click forward button
 */
When('I click {wdioBrowserButton} button', async function (button: 'back' | 'forward') {
    await browser[button]();
});

/**
 * Scroll by provided offset
 * @param {string} - offset string in 'x, y' format
 * @example
 * When I scroll by '0, 100'
 */
When('I scroll by {string}', async function (offset: string) {
    const [deltaX, deltaY] = parseCoords(await getValue(offset));
    await browser.action('wheel').scroll({
        deltaX,
        deltaY,
        duration: 100
    }).perform();
});

/**
 * Scroll by provided offset in element
 * @param {string} - offset string in 'x, y' format
 * @param {string} - element alias
 * @example
 * When I scroll by '0, 100' in 'Overflow Container'
 */
When('I scroll by {string} in {string}', async function (offset: string, alias: string) {
    const [deltaX, deltaY] = parseCoords(await getValue(offset));
    const element = await getElement(alias) as WebdriverIO.Element;
    await conditionWait(element, conditionValidations.VISIBLE, config.browser.timeout.visible);
    await element.moveTo();
    await browser.action('wheel').scroll({
        deltaX,
        deltaY,
        duration: 100
    }).perform();
});

/**
 * Scroll until specified element to be visible
 * @param {string} - target element
 * @example
 * When I scroll until 'Row 99' becomes visible
 */
When('I scroll until {string} to be visible', async function (targetAlias: string) {
    const isVisible = async () => {
        const element = await getElement(targetAlias, { immediate: true }) as WebdriverIO.Element;
        return element.isDisplayed();
    };
    while (!await isVisible()) {
        await browser.action('wheel').scroll({
            deltaX: 0,
            deltaY: 100,
            duration: 50
        }).perform();
        await browser.pause(50);
    }
});

/**
 * Scroll in container until specified element to be visible
 * @param {string} - scroll container
 * @param {string} - target element
 * @example
 * When I scroll in 'List' until 'Row 99' to be visible
 */
When('I scroll in {string} until {string} to be visible', async function (scrollAlias: string, targetAlias: string) {
    const element = await getElement(scrollAlias) as WebdriverIO.Element;
    await element.moveTo();
    const isVisible = async () => {
        const element = await getElement(targetAlias, { immediate: true }) as WebdriverIO.Element;
        return element.isDisplayed();
    };
    while (!await isVisible()) {
        await browser.action('wheel').scroll({
            deltaX: 0,
            deltaY: 100,
            duration: 50
        }).perform();
        await browser.pause(50);
    }
});

/**
 * Provide file url to upload input
 * @param {string} alias - element to upload file
 * @param {string} value - file path
 * @example I upload '/folder/file.txt' to 'File Input'
 */
When('I upload {string} file to {string}', async function (value: string, alias: string) {
    const element = await getElement(alias) as WebdriverIO.Element;
    const typeValue = await getValue(value);
    await element.setValue(typeValue);
});

/**
 * Accept alert
 * Should be used afterwards the step 'I wait for alert'
 * @example I accept alert
 */
When('I accept alert', async function () {
    await browser.acceptAlert();
});

/**
 * Dismiss alert
 * Should be used afterwards the step 'I wait for alert'
 * @example I dismiss alert
 */
When('I dismiss alert', async function () {
    await browser.dismissAlert();
});

/**
 * I type {string} to alert
 * Should be used afterwards the step 'I wait for alert'
 * @example I type 'coffee' to alert
 */
When('I type {string} to alert', async function (value: string) {
    await browser.sendAlertText(value);
});

/**
 * Drag&Drop one element to another
 * @param {string} elementAlias - element to drag
 * @param {string} targetAlias - target
 * @example I drag and drop 'Bishop' to 'E4'
 */
When('I drag and drop {string} to {string}', async function (elementAlias, targetAlias) {
    const element = await getElement(elementAlias) as WebdriverIO.Element;
    const target = await getElement(targetAlias) as WebdriverIO.Element;
    await browser.execute(dragAndDrop, element as any, target as any);
});

/**
 * Open new browser tab
 * @example I open new tab
 */
When('I open new tab', async function () {
    await browser.execute(() => { window.open('about:blank', '_blank') });
});

/**
 * Click certain coordinates in element
 * @param {string} coords - x, y coordinates to click
 * @param {string} alias - element to click
 * @param {boolean} [disableWait] - disable wait before click
 * @example When I click '0, 20' coordinates in 'Element'
 * @example When I click '0, 20' coordinates in 'Element' (disable actionability wait)
 */
When('I click {string} coordinates in {string}( ){wdioDisableActionabilityCheck}', async function (coordinates: string, alias: string, disableWait: boolean) {
    const coords = await getValue(coordinates);
    const coordsObject = typeof coords === 'string' ? parseCoordsAsObject(coords) : coords;
    await click(alias, disableWait, coordsObject);
});

/**
 * Resize browser's window
 * @param {string} size - desired size
 * @example I set window size '1366,768'
 */
When('I set window size {string}', async function (size: string) {
    const viewPort = await getValue(size);
    const {x, y} = parseCoordsAsObject(viewPort);
    await browser.setWindowSize(x, y);
});

/**
 * Close current browser tab/window
 * @example I close current tab
 */
When('I close current tab', async function () {
    await browser.closeWindow();
});
