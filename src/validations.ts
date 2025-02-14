import { Then } from '@cucumber/cucumber';
import type { Validation, MemoryValue } from '@qavajs/core';
import type { Locator } from './pageObject';

/**
 * Verify element condition
 * @param {string} alias - element to wait condition
 * @param {string} condition - wait condition
 * @example I expect 'Header' to be visible
 * @example I expect 'Loading' not to be present
 * @example I expect 'Search Bar > Submit Button' to be clickable
 */
Then('I expect {wdioLocator} {wdioCondition}', async function (element: Locator, condition: Function & { validation: string }) {
    const timeout = this.config.browser.timeout[condition.validation] ?? this.config.browser.timeout.page;
    await condition(element(), timeout);
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
    'I expect text of {wdioLocator} {validation} {value}',
    async function (element: Locator, validation: Validation, expected: MemoryValue) {
        const expectedValue = await expected.value();
        const elementText = () => element().getText();
        await validation.poll(elementText, expectedValue, {
            timeout: this.config.browser.timeout.value,
            interval: this.config.browser.timeout.valueInterval
        });
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
    'I expect number of elements in {wdioLocator} collection {validation} {value}',
    async function (locator: Locator, validation: Validation, expected: MemoryValue) {
        const collectionLength = () => locator.collection().length;
        const expectedValue = await expected.value();
        await validation.poll(collectionLength, expectedValue, {
            timeout: this.config.browser.timeout.value,
            interval: this.config.browser.timeout.valueInterval
        });
    }
);

/**
 * Verify value of element
 * @param {string} alias - element to verify
 * @param {string} validationType - validation
 * @param {string} value - expected value
 * @example I expect value of 'Search Input' to be equal 'text'
 * @example I expect value of 'Label' to contain '<b>'
 */
Then(
    'I expect value of {wdioLocator} {validation} {value}',
    async function (element: Locator, validation: Validation, expected: MemoryValue) {
        const actualValue = () => element().getValue();
        const expectedValue = await expected.value();
        await validation.poll(actualValue, expectedValue, {
            timeout: this.config.browser.timeout.value,
            interval: this.config.browser.timeout.valueInterval
        });
    }
);

/**
 * Verify that property of element satisfies condition
 * @param {string} property - property to verify
 * @param {string} alias - element to verify
 * @param {string} validationType - validation
 * @param {string} value - expected value
 * @example I expect 'value' property of 'Search Input' to be equal 'text'
 * @example I expect 'innerHTML' property of 'Label' to contain '<b>'
 */
Then(
    'I expect {value} property of {wdioLocator} {validation} {value}',
    async function (property: MemoryValue, element: Locator, validation: Validation, expected: MemoryValue) {
        const propertyName = await property.value();
        const expectedValue = await expected.value();
        const actualValue = () => element().getProperty(propertyName);
        await validation.poll(actualValue, expectedValue, {
            timeout: this.config.browser.timeout.value,
            interval: this.config.browser.timeout.valueInterval
        });
    }
);

/**
 * Verify that attribute of element satisfies condition
 * @param {string} attribute - attribute to verify
 * @param {string} alias - element to verify
 * @param {string} validationType - validation
 * @param {string} value - expected value
 * @example I expect 'href' attribute of 'Home Link' to contain '/home'
 */
Then(
    'I expect {value} attribute of {wdioLocator} {validation} {value}',
    async function (attribute: MemoryValue, element: Locator, validation: Validation, expected: MemoryValue) {
        const attributeName = await attribute.value();
        const expectedValue = await expected.value();
        const actualValue = () => element().getAttribute(attributeName);
        await validation.poll(actualValue, expectedValue, {
            timeout: this.config.browser.timeout.value,
            interval: this.config.browser.timeout.valueInterval
        });
    }
);

/**
 * Verify that current url satisfies condition
 * @param {string} validationType - validation
 * @param {string} expected - expected value
 * @example I expect current url contains 'wikipedia'
 * @example I expect current url equals 'https://wikipedia.org'
 */
Then(
    'I expect current url {validation} {value}',
    async function (validation: Validation, expected: MemoryValue) {
        const expectedUrl = await expected.value();
        const actualUrl = () => this.wdio.browser.getUrl();
        await validation.poll(actualUrl, expectedUrl, {
            timeout: this.config.browser.timeout.value,
            interval: this.config.browser.timeout.valueInterval
        });
    }
);

/**
 * Verify that page title satisfies condition
 * @param {string} validationType - validation
 * @param {string} expected - expected value
 * @example I expect page title equals 'Wikipedia'
 */
Then(
    'I expect page title {validation} {value}',
    async function (validation: Validation, expected: MemoryValue) {
        const expectedTitle = await expected.value();
        const actualTitle = () => this.wdio.browser.getTitle();
        await validation.poll(actualTitle, expectedTitle, {
            timeout: this.config.browser.timeout.value,
            interval: this.config.browser.timeout.valueInterval
        });
    }
);

/**
 * Verify that all texts in collection satisfy condition
 * @param {string} alias - collection to get texts
 * @param {string} validationType - validation
 * @param {string} value - expected result
 * @example I expect text of every element in 'Search Results' collection equals to 'google'
 * @example I expect text of every element in 'Search Results' collection does not contain 'yandex'
 */
Then(
    'I expect text of every element in {wdioLocator} collection {validation} {value}',
    async function (locator: Locator, validation: Validation, expected: MemoryValue) {
        const expectedValue = await expected.value();
        const collection = await locator.collection().getElements();
        for (const element of collection) {
            validation(await element.getText(), expectedValue);
        }
    }
);

/**
 * Verify collection condition
 * @param {string} alias - collection to wait condition
 * @param {string} condition - wait condition
 * @example I expect every element in 'Header > Links' collection to be visible
 * @example I expect every element in 'Loading Bars' collection not to be present
 */
Then('I expect every element in {wdioLocator} collection {wdioCondition}', async function (locator: Locator, condition: Function) {
    const collection = locator.collection();
    const conditionWait = (element: WebdriverIO.Element) => condition(element, this.config.browser.timeout.page);
    await Promise.all(await collection.map(conditionWait))
});

/**
 * Verify that all particular attributes in collection satisfy condition
 * @param {string} alias - collection to get attrs
 * @param {string} validationType - validation
 * @param {string} value - expected result
 * @example I expect 'href' attribute of every element in 'Search Results' collection to contain 'google'
 */
Then(
    'I expect {value} attribute of every element in {wdioLocator} collection {validation} {value}',
    async function (attribute: MemoryValue, locator: Locator, validation: Validation, expected: MemoryValue) {
        const expectedValue = await expected.value();
        const attributeName = await attribute.value();
        const collection = await locator.collection().getElements();
        for (const element of collection) {
            const value: string = await element.getAttribute(attributeName);
            validation(value, expectedValue);
        }
    }
);

/**
 * Verify that all particular properties in collection satisfy condition
 * @param {string} alias - collection to get props
 * @param {string} validationType - validation
 * @param {string} value - expected result
 * @example I expect 'href' property of every element in 'Search Results' collection to contain 'google'
 */
Then(
    'I expect {value} property of every element in {wdioLocator} collection {validation} {value}',
    async function (property: MemoryValue, locator: Locator, validation: Validation, expected: MemoryValue) {
        const expectedValue = await expected.value();
        const propertyName = await property.value();
        const collection = await locator.collection().getElements();
        for (const element of collection) {
            const value: string = await element.getProperty(propertyName) as string;
            validation(value, expectedValue);
        }
    }
);

/**
 * Verify that css property of element satisfies condition
 * @param {string} property - property to verify
 * @param {string} alias - element to verify
 * @param {string} validationType - validation
 * @param {string} value - expected value
 * @example I expect 'color' css property of 'Search Input' to be equal 'rgb(42, 42, 42)'
 * @example I expect 'font-family' css property of 'Label' to contain 'Fira'
 */
Then(
    'I expect {value} css property of {wdioLocator} {validation} {value}',
    async function (property: MemoryValue, locator: Locator, validation: Validation, expected: MemoryValue) {
        const propertyName = await property.value();
        const expectedValue = await expected.value();
        const actualValue = async () => this.wdio.browser.execute(function (element: HTMLElement, propertyName: string) {
            return getComputedStyle(element).getPropertyValue(propertyName)
        }, await locator().getElement(), propertyName);
        await validation.poll(actualValue, expectedValue, {
            timeout: this.config.browser.timeout.value,
            interval: this.config.browser.timeout.valueInterval
        });
    }
);

/**
 * Verify that css property of every element in collection satisfies condition
 * @param {string} property - property to verify
 * @param {string} alias - element to verify
 * @param {string} validationType - validation
 * @param {string} value - expected value
 * @example I expect 'color' css property of every element in 'Table > Rows' collection to be equal 'rgb(42, 42, 42)'
 * @example I expect 'font-family' css property of every element in 'Labels' to contain 'Fira'
 */
Then(
    'I expect {value} css property of every element in {wdioLocator} collection {validation} {value}',
    async function (property: MemoryValue, locator: Locator, validation: Validation, expected: MemoryValue) {
        const propertyName = await property.value();
        const expectedValue = await expected.value();
        const collection = await locator.collection().getElements();
        for (const element of collection) {
            const actualValue = async () => this.wdio.browser.execute(function (element: HTMLElement, propertyName: string) {
                return getComputedStyle(element).getPropertyValue(propertyName)
            }, element, propertyName);
            await validation.poll(actualValue, expectedValue, {
                timeout: this.config.browser.timeout.value,
                interval: this.config.browser.timeout.valueInterval
            });
        }
    }
);

