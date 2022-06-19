import { Element, ElementArray, Browser } from 'webdriverio';
import { Before, After, When, Then, defineParameterType } from '@cucumber/cucumber';
import { remote } from 'webdriverio';
import memory from '@yaatp/memory';
import { po } from '@yaatp/po';
import { wait, validations, timeout } from './wait';
import { verify } from './verify';

declare global {
    var browser: Browser<'async'>;
    var config: any;
}

defineParameterType({
    name: 'element',
    regexp: /'(.+)'/,
    transformer: async p => po.getElement(await memory.getValue(p))
});

defineParameterType({
    name: 'reverse',
    regexp: /( not)?/,
    transformer: p => p ?? false
});

defineParameterType({
    name: 'validation',
    regexp: /(be equal to|contain)/,
    transformer: p => p
});

Before(async function () {
    global.browser = await remote(config.browser);
    po.init(browser, { timeout: 10000 });
    po.register(config.pageObject);
});

After(async function() {
    await browser.deleteSession();
});

/**
 * Opens provided url
 * @param {string} url - url to navigate
 * @example open 'https://google.com'
 */
When('open {memory} url', async function(url) {
    await browser.url(await url);
});

/**
 * Type text to element
 * @param {Element|ElementArray} element - element to type
 * @param {string} value - value to type
 * @example type 'wikipedia' to 'Google Input'
 */
When('type {string} to {element}', async function(value, element) {
    await (await element).waitForDisplayed();
    await (await element).addValue(await value);
});

/**
 * Click element
 * @param {Element|ElementArray} element - element to click
 * @example click 'Google Button'
 */
When('click {element}', async function(element) {
    await (await element).waitForDisplayed();
    await (await element).click();
});

/**
 * Clear input
 * @param {Element|ElementArray} element - element to clear
 * @example clear 'Google Input'
 */
When('clear {element}', async function(element) {
    await (await element).waitForDisplayed();
    await (await element).clearValue();
});

/**
 * Verify that text of element satisfy condition
 * @param {Element|ElementArray} element - element to get text
 * @param {boolean} reverse - reverse validation
 * @param {string} validation - validation
 * @param {string} value - expected result
 * @example text of '#1 of Search Results' should be equal 'google'
 */
Then(
    'text of {element} element should{reverse} {validation} {memory}',
    async function (element, reverse, validation, value) {
        await wait(element, validations.BECOME_VISIBLE, timeout.WAIT_ELEMENT_TIMEOUT);
        const elementText: string = await (await element).getText();
        verify({
            AR: elementText,
            ER: await value,
            reverse,
            validation
        });
    }
);

/**
 * Click on element with desired text in collection
 * @param {string} expectedText - text to click
 * @param {ElementArray} collection - collection to search text
 * @example click 'google' text in 'Search Engines' collection
 */
When(
    'click {memory} in {element} collection',
    async function(expectedText, collection) {
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
 * @example switch to parent frame
 */
When('switch to parent frame', async function() {
    await browser.switchToParentFrame();
});

/**
 * Switch to frame by index
 * @param {number} index - index to switch
 * @example switch to 2 frame
 */
When('switch to {int} frame', async function(index) {
    await browser.switchToFrame(index);
});

/**
 * Switch to window by index
 * @param {number} index - index to switch
 * @example switch to 2 window
 */
When('switch to {int} window', async function(index) {
    await browser.waitUntil(
        async () => (await browser.getWindowHandles()).length >= index,
        { timeout: timeout.WAIT_PAGE_TIMEOUT }
    );
    const windowHandles = await browser.getWindowHandles();
    await browser.switchToWindow(windowHandles[index - 1]);
});

/**
 * Switch to window by text
 * @param {string} matcher - window matcher (url or title)
 * @example switch to 'google.com' window
 */
When('switch to {string} window', async function(matcher) {
    await browser.switchWindow(matcher);
});

/**
 * Refresh current page
 * @example refresh page
 */
When('refresh page', async function() {
    await browser.refresh();
});

/**
 * Press button
 * @param {string} key - key to press
 * @example press 'Enter' key
 */
When('press {string} key', async function(key) {
    await browser.keys(key);
});
