import { ElementArray } from 'webdriverio';
import { Then } from '@cucumber/cucumber';
import { conditionWait, conditionValidations } from './conditionWait';
import {
    getValue,
    getElement,
    getConditionWait,
    ElementAsync
} from './transformers';
import { getValidation } from '@qavajs/validation';

/**
 * Verify element condition
 * @param {string} alias - element to wait condition
 * @param {string} condition - wait condition
 * @example I expect 'Header' to be visible
 * @example I expect 'Loading' not to be present
 * @example I expect 'Search Bar > Submit Button' to be clickable
 */
Then('I expect {string} {wdioConditionWait}', async function (alias: string, condition: string) {
    const element = await getElement(alias) as ElementAsync;
    const wait = getConditionWait(condition);
    await wait(element, config.browser.timeout.page);
});

/**
 * Verify that text of element satisfies condition
 * @param {string} alias - element to get text
 * @param {string} validationType - validation
 * @param {string} value - expected result
 * @example I expect text of '#1 of Search Results' equals to 'google'
 * @example I expect text of '#2 of Search Results' does not contain 'yandex'
 */
Then(
    'I expect text of {string} {wdioValidation} {string}',
    async function (alias: string, validationType: string, value: any) {
        const expectedValue = await getValue(value);
        const element = await getElement(alias) as ElementAsync;
        const validation = getValidation(validationType);
        await conditionWait(element, conditionValidations.VISIBLE, config.browser.timeout.visible);
        const elementText: string = await element.getText();
        validation(elementText, expectedValue);
    }
);

/**
 * Verify that number of element in collection satisfies condition
 * @param {string} alias - collection to verify
 * @param {string} validationType - validation
 * @param {string} value - expected value
 * @example I expect number of elements in 'Search Results' collection to be equal '50'
 * @example I expect number of elements in 'Search Results' collection to be above '49'
 * @example I expect number of elements in 'Search Results' collection to be below '51'
 */
Then(
    'I expect number of elements in {string} collection {wdioValidation} {string}',
    async function (alias: string, validationType: string, value: string) {
        const expectedValue = await getValue(value);
        const collection = await getElement(alias) as ElementArray;
        const validation = getValidation(validationType);
        validation(collection.length, expectedValue);
    }
);

/**
 * Verify that property of element satisfies condition
 * @param {string} property - element to verify
 * @param {string} alias - element to verify
 * @param {string} validationType - validation
 * @param {string} value - expected value
 * @example I expect 'value' property of 'Search Input' to be equal 'text'
 * @example I expect 'innerHTML' property of 'Label' to contain '<b>'
 */
Then(
    'I expect {string} property of {string} {wdioValidation} {string}',
    async function (property: string, alias: string, validationType: string, value: string) {
        const propertyName = await getValue(property);
        const expectedValue = await getValue(value);
        const element = await getElement(alias) as ElementAsync;
        const validation = getValidation(validationType);
        await conditionWait(element, conditionValidations.PRESENT, config.browser.timeout.visible);
        const actualValue = await element.getProperty(propertyName);
        validation(actualValue, expectedValue);
    }
);

/**
 * Verify that attribute of element satisfies condition
 * @param {string} attribute - element to verify
 * @param {string} alias - element to verify
 * @param {string} validationType - validation
 * @param {string} value - expected value
 * @example I expect 'href' attribute of 'Home Link' to contain '/home'
 */
Then(
    'I expect {string} attribute of {string} {wdioValidation} {string}',
    async function (attribute: string, alias: string, validationType: string, value: string) {
        const attributeName = await getValue(attribute);
        const expectedValue = await getValue(value);
        const element = await getElement(alias) as ElementAsync;
        const validation = getValidation(validationType);
        await conditionWait(element, conditionValidations.PRESENT, config.browser.timeout.visible);
        const actualValue = await element.getAttribute(attributeName);
        validation(actualValue, expectedValue);
    }
);


