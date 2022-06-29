import { When } from '@cucumber/cucumber';
import { valueWait } from './valueWait';
import { conditionWait } from './conditionWait';
import { wdio } from './wdioResolver';

/**
 * Wait for element condition
 * @param {Element} element - element to wait condition
 * @param {string} wait - wait condition
 * @example I wait until 'Header' to be visible
 * @example I wait until 'Loading' not to be present
 * @example I wait until 'Search Bar > Submit Button' to be clickable
 */
When('I wait until {element} {wait}', async function (element, wait) {
    await wait(conditionWait, config.browser.timeout.page, await element(wdio));
});

/**
 * Wait for element text condition
 * @param {Element} element - element to wait condition
 * @param {string} wait - wait condition
 * @param {string} expectedValue - expected value to wait
 * @example I wait until text of 'Header' to be equal 'Javascript'
 * @example I wait until text of 'Header' not to be equal 'Python'
 */
When('I wait until text of {element} {wait} {text}', async function (element, wait, expectedValue) {
    const getValue = async () => (await element(wdio)).getText();
    await wait(valueWait, config.browser.timeout.page, getValue, expectedValue);
});

/**
 * Wait for collection length condition
 * @param {Element} element - element to wait condition
 * @param {string} wait - wait condition
 * @param {string} expectedValue - expected value to wait
 * @example I wait until number of elements in 'Search Results' collection to be equal '50'
 * @example I wait until number of elements in 'Search Results' collection to be above '49'
 * @example I wait until number of elements in 'Search Results' collection to be below '51'
 */
When(
    'I wait until number of elements in {lazyElement} collection {wait} {text}',
    async function (collection, wait, expectedValue) {
        const col = await collection(wdio);
        const getValue = async () => (await col()).length;
        await wait(valueWait, config.browser.timeout.page, getValue, expectedValue);
});
