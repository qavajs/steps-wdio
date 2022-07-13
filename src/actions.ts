import { When } from '@cucumber/cucumber';
import { Element, ElementArray } from 'webdriverio';
import { conditionValidations, conditionWait } from './conditionWait';

/**
 * Opens provided url
 * @param {string} url - url to navigate
 * @example I open 'https://google.com'
 */
When('I open {text} url', async function (url: string|Promise<string>) {
    await browser.url(await url);
});

/**
 * Type text to element
 * @param {Element} element - element to type
 * @param {string} value - value to type
 * @example I type 'wikipedia' to 'Google Input'
 */
When('I type {text} to {element}', async function (value: string, element: Element<'async'>) {
    await conditionWait(await element, conditionValidations.VISIBLE, config.browser.timeout.visible);
    await (await element).addValue(await value);
});

/**
 * Click element
 * @param {Element} element - element to click
 * @example I click 'Google Button'
 */
When('I click {element}', async function (element: Element<'async'>) {
    await conditionWait(await element, conditionValidations.VISIBLE, config.browser.timeout.visible);
    await (await element).click();
});

/**
 * Double click element
 * @param {Element} element - double element to click
 * @example I double click 'Google Button'
 */
When('I double click {element}', async function (element: Element<'async'>) {
    await conditionWait(await element, conditionValidations.VISIBLE, config.browser.timeout.visible);
    await (await element).doubleClick();
});

/**
 * Right click element
 * @param {Element} element - element to right click
 * @example I right click 'Google Button'
 */
When('I right click {element}', async function (element: Element<'async'>) {
    await conditionWait(await element, conditionValidations.VISIBLE, config.browser.timeout.visible);
    await (await element).click({button: 'right'});
})

/**
 * Clear input
 * @param {Element} element - element to clear
 * @example I clear 'Google Input'
 */
When('I clear {element}', async function (element: Element<'async'>) {
    await conditionWait(await element, conditionValidations.VISIBLE, config.browser.timeout.visible);
    await (await element).clearValue();
});

/**
 * Click on element with desired text in collection
 * @param {string} expectedText - text to click
 * @param {ElementArray} collection - collection to search text
 * @example I click 'google' text in 'Search Engines' collection
 */
When(
    'I click {text} in {element} collection',
    async function (expectedText: string|Promise<string>, collection: ElementArray) {
        for (const ePromise of await collection) {
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
    await browser.switchWindow(matcher);
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
 */
When('I press {string} key', async function (key: string) {
    await browser.keys(key);
});

/**
 * Hover over element
 * @param {Element} element - element to hover over
 * @example I hover over 'Google Button'
 */
When('I hover over {element}', async function (element: Element<'async'>) {
    await conditionWait(await element, conditionValidations.VISIBLE, config.browser.timeout.visible);
    await (await element).moveTo();
});
