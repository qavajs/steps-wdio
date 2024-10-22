import { When } from '@cucumber/cucumber';
import { Locator } from './pageObject';
import { MemoryValue, Validation } from '@qavajs/cli';

/**
 * Explicit wait
 * @param {number} ms - milliseconds
 * @example I wait 1000 ms
 */
When('I wait {int} ms', async function (ms: number) {
    await this.wdio.browser.pause(ms);
});

/**
 * Refresh page unless element matches condition
 * @param {string} alias - element to wait condition
 * @param {string} wait - wait condition
 * @param {number|null} [timeout] - custom timeout in ms
 * @example I refresh page until 'Internal Server Error Box' to be visible
 * @example I refresh page until 'Submit Button' to be enabled
 * @example I refresh page until 'Place Order Button' to be clickable (timeout: 3000)
 */
When(
    'I refresh page until {wdioLocator} {wdioCondition}( ){wdioTimeout}',
    async function (element: Locator, condition: Function, timeoutValue: number | null) {
        const timeout = timeoutValue ?? this.config.browser.timeout.value;
        await this.wdio.browser.waitUntil(async () => {
            await this.wdio.browser.refresh();
            await condition(element(), this.config.browser.timeout.pageRefreshInterval);
            return true;
        }, {timeout, interval: this.config.browser.timeout.pageRefreshInterval});
    });

/**
 * Refresh page unless element text matches condition
 * @param {string} alias - element to wait condition
 * @param {string} wait - wait condition
 * @param {string} value - expected value to wait
 * @param {number|null} [timeout] - custom timeout in ms
 * @example I refresh page until text of 'Order Status' to be equal 'Processing'
 * @example I refresh page until text of 'Currency' not contain '$'
 * @example I refresh page until text of 'My Salary' to match '/5\d{3,}/' (timeout: 3000)
 */
When(
    'I refresh page until text of {wdioLocator} {validation} {value}( ){wdioTimeout}',
    async function (element: Locator, validation: Validation, expected: MemoryValue, timeoutValue: number | null) {
        const timeout = timeoutValue ?? this.config.browser.timeout.value;
        await this.wdio.browser.waitUntil(async () => {
            await this.wdio.browser.refresh();
            const value = () => element().getText();
            await validation.poll(value, await expected.value(), {
                timeout: this.config.browser.timeout.pageRefreshInterval,
                interval: this.config.browser.timeout.valueInterval
            });
            return true;
        }, {timeout, interval: this.config.browser.timeout.pageRefreshInterval});
    }
);

/**
 * Repeatedly click an element unless element text matches condition
 * @param {string} aliasToClick - element to wait condition
 * @param {string} aliasToCheck - element to wait condition
 * @param {string} wait - wait condition
 * @param {string} text - expected value to wait
 * @param {number|null} [timeout] - custom timeout in ms
 * @example I click 'Send Message Button' until text of 'Information Alert' to be equal 'Your account has been banned'
 * @example I click 'Add To Cart Button' until text of 'Shopping Cart Total' to match '/\$5\d{3,}/' (timeout: 3000)
 */
When(
    'I click {wdioLocator} until text of {wdioLocator} {validation} {value}( ){wdioTimeout}',
    async function (
        elementToClick: Locator,
        elementToCheck: Locator,
        validation: Validation,
        expected: MemoryValue,
        timeoutValue: number | null,
    ) {
        const timeout = timeoutValue ?? this.config.browser.timeout.value;
        await validation.poll(
            async () => {
                await elementToClick().click();
                return elementToCheck().getText();
            },
            await expected.value(),
            {timeout, interval: this.config.browser.timeout.actionInterval},
        );
    },
);

/**
 * Repeatedly click an element unless element value attribute matches condition
 * @param {string} aliasToClick - element to wait condition
 * @param {string} aliasToCheck - element to wait condition
 * @param {string} wait - wait condition
 * @param {string} value - expected value to wait
 * @param {number|null} [timeout] - custom timeout in ms
 * @example I click 'Plus Button' until value of 'Quantity Input' to be equal '9'
 * @example I click 'Suggest Button' until value of 'Repository Name Input' to match '/\w{5,}/' (timeout: 30000)
 */
When(
    'I click {wdioLocator} until value of {wdioLocator} {validation} {value}( ){wdioTimeout}',
    async function (
        elementToClick: Locator,
        elementToCheck: Locator,
        validation: Validation,
        expected: MemoryValue,
        timeoutValue: number | null,
    ) {
        const timeout = timeoutValue ?? this.config.browser.timeout.value;
        await validation.poll(
            async () => {
                await elementToClick().click();
                return elementToCheck().getValue();
            },
            await expected.value(),
            {timeout, interval: this.config.browser.timeout.actionInterval},
        );
    },
);
