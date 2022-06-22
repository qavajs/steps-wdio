import { Element, ElementArray, Browser } from 'webdriverio';
import { Before, After, When, Then, defineParameterType } from '@cucumber/cucumber';
import { remote } from 'webdriverio';
import memory from '@qavajs/memory';
import { po } from '@qavajs/po';
import { wait, validations } from './wait';
import { verify } from './verify';
import defaultTimeouts from './defaultTimeouts';
import { compareValidationTransformer } from './parameterTypeTransformer';

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
    name: 'compareValidation',
    regexp: /(.+)/,
    transformer: compareValidationTransformer
});

Before(async () => {
    config.browser.timeout = {
        defaultTimeouts,
        ...config.browser.timeout
    }
    global.browser = await remote(config.browser);
    po.init(browser, { timeout: config.browser.timeout.present });
    po.register(config.pageObject);
});

After(async () => {
    await browser.deleteSession();
});

/**
 * Opens provided url
 * @param {string} url - url to navigate
 * @example open 'https://google.com'
 */
When('I open {memory} url', async (url: string) => {
    await browser.url(url);
});

/**
 * Type text to element
 * @param {Element|ElementArray} element - element to type
 * @param {string} value - value to type
 * @example type 'wikipedia' to 'Google Input'
 */
When('I type {string} to {element}', async (value: string, element) => {
    await wait(await element, validations.VISIBLE, config.browser.timeout.visible);
    await (await element).addValue(await value);
});

/**
 * Click element
 * @param {Element|ElementArray} element - element to click
 * @example click 'Google Button'
 */
When('I click {element}', async (element) => {
    await wait(await element, validations.VISIBLE, config.browser.timeout.visible);
    await (await element).click();
});

/**
 * Clear input
 * @param {Element|ElementArray} element - element to clear
 * @example clear 'Google Input'
 */
When('I clear {element}', async (element) => {
    await wait(await element, validations.VISIBLE, config.browser.timeout.visible);
    await (await element).clearValue();
});

/**
 * Verify that text of element satisfy condition
 * @param {Element|ElementArray} element - element to get text
 // * @param {boolean} reverse - reverse validation
 * @param {string} validation - validation
 * @param {string} value - expected result
 * @example I expect text of '#1 of Search Results' equals to 'google'
 * @example I expect text of '#2 of Search Results' does not contain 'yandex'
 */
Then(
    'I expect text of {element} element {compareValidation} {memory}',
    async (element, validation, value) => {
        await wait(await element, validations.VISIBLE, config.browser.timeout.visible);
        const elementText: string = await (await element).getText();
        verify({
            AR: elementText,
            ER: await value,
            reverse: validation.reverse,
            validation: validation.validation
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
    'I click {memory} in {element} collection',
    async (expectedText: string, collection: ElementArray) => {
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
When('I switch to parent frame', async () => {
    await browser.switchToParentFrame();
});

/**
 * Switch to frame by index
 * @param {number} index - index to switch
 * @example switch to 2 frame
 */
When('I switch to {int} frame', async (index: number) => {
    await browser.switchToFrame(index);
});

/**
 * Switch to window by index
 * @param {number} index - index to switch
 * @example switch to 2 window
 */
When('I switch to {int} window', async (index: number) => {
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
 * @example switch to 'google.com' window
 */
When('I switch to {string} window', async (matcher: string) => {
    await browser.switchWindow(matcher);
});

/**
 * Refresh current page
 * @example refresh page
 */
When('I refresh page', async () => {
    await browser.refresh();
});

/**
 * Press button
 * @param {string} key - key to press
 * @example press 'Enter' key
 */
When('I press {string} key', async (key: string) => {
    await browser.keys(key);
});