import { When } from '@cucumber/cucumber';
import { Locator } from './parameterTypeTransformer';
import { Element, ElementArray } from "webdriverio";

/**
 * Wait for element condition
 * @param {Element} element - element to wait condition
 * @param {string} wait - wait condition
 * @example I wait until 'Header' to be visible
 * @example I wait until 'Loading' not to be present
 * @example I wait until 'Search Bar > Submit Button' to be clickable
 */
When('I wait until {element} {conditionWait}', async function (element, wait) {
    await wait(await element, config.browser.timeout.page);
});

/**
 * Wait for element text condition
 * @param {Element} element - element to wait condition
 * @param {string} wait - wait condition
 * @param {string} expectedValue - expected value to wait
 * @example I wait until text of 'Header' to be equal 'Javascript'
 * @example I wait until text of 'Header' not to be equal 'Python'
 */
When(
    'I wait until text of {element} {valueWait} {text}',
    async function (element: Element<'async'>, wait: Function, expectedValue: any) {
        const getValue = async () => (await element).getText();
        await wait(getValue, expectedValue, config.browser.timeout.page);
    }
);

/**
 * Wait for collection length condition
 * @param {Element} collection - element to wait condition
 * @param {string} wait - wait condition
 * @param {string} expectedValue - expected value to wait
 * @example I wait until number of elements in 'Search Results' collection to be equal '50'
 * @example I wait until number of elements in 'Search Results' collection to be above '49'
 * @example I wait until number of elements in 'Search Results' collection to be below '51'
 */
When(
    'I wait until number of elements in {locator} collection {valueWait} {text}',
    async function (collection: Locator, wait: Function, expectedValue: any) {
        const getValue = async () => (await collection() as ElementArray).length;
        await wait(getValue, expectedValue, config.browser.timeout.page);
    }
);

/**
 * Wait for element property condition
 * @param {string} property - property
 * @param {Element} element - element to wait condition
 * @param {string} wait - wait condition
 * @param {string} expectedValue - expected value to wait
 * @example I wait until 'value' property of 'Search Input' to be equal 'Javascript'
 */
When(
    'I wait until {text} property of {element} {valueWait} {text}',
    async function (property: string, element: Element<'async'>, wait: Function, expectedValue: any) {
        const getValue = async () => (await element).getProperty(property);
        await wait(getValue, expectedValue, config.browser.timeout.page);
    }
);

/**
 * Wait for element attribute condition
 * @param {string} attribute - attribute
 * @param {Element} element - element to wait condition
 * @param {string} wait - wait condition
 * @param {string} expectedValue - expected value to wait
 * @example I wait until 'href' attribute of 'Home Link' to be equal '/javascript'
 */
When(
    'I wait until {text} property of {element} {valueWait} {text}',
    async function (attribute: string, element: Element<'async'>, wait: Function, expectedValue: any) {
        const getValue = async () => (await element).getAttribute(attribute);
        await wait(getValue, expectedValue, config.browser.timeout.page);
    }
);

