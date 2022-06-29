import { Element } from 'webdriverio';
import {Then, When} from '@cucumber/cucumber';
import { conditionWait, conditionValidations } from './conditionWait';

/**
 * Verify element condition
 * @param {Element} element - element to wait condition
 * @param {string} wait - wait condition
 * @example I expect 'Header' to be visible
 * @example I expect 'Loading' not to be present
 * @example I expect 'Search Bar > Submit Button' to be clickable
 */
Then('I expect {element} {conditionWait}', async function (element, wait) {
    await wait(await element, config.browser.timeout.page);
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
    async function (element: Element<'async'>, validation: Function, value: any) {
        await conditionWait(await element, conditionValidations.VISIBLE, config.browser.timeout.visible);
        const elementText: string = await (await element).getText();
        validation(elementText, await value);
    }
);


