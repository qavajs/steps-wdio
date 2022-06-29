import { When } from '@cucumber/cucumber';

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
When('I wait until text of {element} {valueWait} {text}', async function (element, wait, expectedValue) {
    const getValue = async () => (await element).getText();
    await wait(getValue, expectedValue, config.browser.timeout.page);
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
    'I wait until number of elements in {lazyElement} collection {valueWait} {text}',
    async function (collection, wait, expectedValue) {
        const getValue = async () => (await collection()).length;
        await wait(getValue, expectedValue, config.browser.timeout.page);
});
