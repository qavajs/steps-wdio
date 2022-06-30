import { Element, ElementArray } from 'webdriverio';
import { Then } from '@cucumber/cucumber';
import { conditionWait, conditionValidations } from './conditionWait';

/**
 * Verify element condition
 * @param {Element} element - element to wait condition
 * @param {string} wait - wait condition
 * @example I expect 'Header' to be visible
 * @example I expect 'Loading' not to be present
 * @example I expect 'Search Bar > Submit Button' to be clickable
 */
Then('I expect {element} {conditionWait}', async function (element: Element<'async'>, wait: Function) {
    await wait(await element, config.browser.timeout.page);
});

/**
 * Verify that text of element satisfies condition
 * @param {Element} element - element to get text
 * @param {string} validation - validation
 * @param {string} value - expected result
 * @example I expect text of '#1 of Search Results' equals to 'google'
 * @example I expect text of '#2 of Search Results' does not contain 'yandex'
 */
Then(
    'I expect text of {element} element {validation} {text}',
    async function (element: Element<'async'>, validation: Function, expectedValue: any) {
        await conditionWait(await element, conditionValidations.VISIBLE, config.browser.timeout.visible);
        const elementText: string = await (await element).getText();
        validation(elementText, await expectedValue);
    }
);

/**
 * Verify that number of element in collection satisfies condition
 * @param {string} collection - collection to verify
 * @param {string} validation - validation
 * @param {string} expectedValue - expected value
 * @example I expect number of elements in 'Search Results' collection to be equal '50'
 * @example I expect number of elements in 'Search Results' collection to be above '49'
 * @example I expect number of elements in 'Search Results' collection to be below '51'
 */
Then(
    'I expect number of elements in {element} collection {validation} {text}',
    async function (collection: ElementArray, validation: Function, expectedValue: any) {
        validation((await collection).length, await expectedValue);
    }
);

/**
 * Verify that property of element satisfies condition
 * @param {string} property - element to verify
 * @param {string} element - element to verify
 * @param {string} validation - validation
 * @param {string} expectedValue - expected value
 * @example I expect 'value' property of 'Search Input' to be equal 'text'
 * @example I expect 'innerHTML' property of 'Label' to contain '<b>'
 */
Then(
    'I expect {text} property of {element} {validation} {text}',
    async function (property: string, element: Element<'async'>, validation: Function, expectedValue: any) {
        await conditionWait(await element, conditionValidations.PRESENT, config.browser.timeout.visible);
        const value = (await element).getProperty(await property);
        validation(value, await expectedValue);
    }
);

/**
 * Verify that attribute of element satisfies condition
 * @param {string} attribute - element to verify
 * @param {string} element - element to verify
 * @param {string} validation - validation
 * @param {string} expectedValue - expected value
 * @example I expect 'href' attribute of 'Home Link' to contain '/home'
 */
Then(
    'I expect {text} attribute of {element} {validation} {text}',
    async function (attribute: string, element: Element<'async'>, validation: Function, expectedValue: any) {
        await conditionWait(await element, conditionValidations.PRESENT, config.browser.timeout.visible);
        const value = (await element).getAttribute(await attribute);
        validation(value, await expectedValue);
    }
);


