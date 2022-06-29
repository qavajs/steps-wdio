import { Element } from 'webdriverio';
import { Then } from '@cucumber/cucumber';
import { conditionWait, conditionValidations } from './conditionWait';
import { wdio } from './wdioResolver';

/**
 * Verify element condition
 * @param {Element} element - element to wait condition
 * @param {string} wait - wait condition
 * @example I expect 'Header' to be visible
 * @example I expect 'Loading' not to be present
 * @example I expect 'Search Bar > Submit Button' to be clickable
 */
Then('I expect {element} {wait}', async function (element, wait) {
    await wait(conditionWait, config.browser.timeout.page, await element(wdio));
});

/**
 * Verify that text of element satisfy condition
 * @param {Element} element - element to get text
 * @param {string} validation - validation
 * @param {string} value - expected result
 * @example I expect text of '#1 of Search Results' equals to 'google'
 * @example I expect text of '#2 of Search Results' does not contain 'yandex'
 */
Then(
    'I expect text of {element} element {validation} {text}',
    async function (element: Function, validation: Function, value: any) {
        const el = await element(wdio);
        await conditionWait(conditionValidations.VISIBLE, false, config.browser.timeout.visible, el);
        const elementText: string = await el.getText();
        validation(elementText, await value);
    }
);


