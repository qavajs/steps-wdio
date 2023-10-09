import { When } from '@cucumber/cucumber';
import { getValue, getElement, getConditionWait, getValueWait, getLocator } from './transformers';
import { isImmediate } from './utils';

/**
 * Explicit wait
 * @param {number} ms - milliseconds
 * @example I wait 1000 ms
 */
When('I wait {int} ms', async function (ms: number) {
  await browser.pause(ms);
});

/**
 * Wait for element condition
 * @param {string} alias - element to wait condition
 * @param {string} wait - wait condition
 * @param {number|null} [timeout] - custom timeout in ms
 * @example I wait until 'Header' to be visible
 * @example I wait until 'Loading' not to be present
 * @example I wait until 'Search Bar > Submit Button' to be clickable
 * @example I wait until 'Search Bar > Submit Button' to be clickable (timeout: 2500)
 */
When(
    'I wait until {string} {wdioConditionWait}( ){wdioTimeout}',
    async function (alias: string, waitType: string, timeout: number | null) {
        const wait = getConditionWait(waitType);
        const element = await getElement(alias, { immediate: isImmediate(waitType) }) as WebdriverIO.Element;
        await wait(element, timeout ?? config.browser.timeout.page);
    }
);

/**
 * Wait for element text condition
 * @param {string} alias - element to wait condition
 * @param {string} wait - wait condition
 * @param {string} value - expected value to wait
 * @param {number|null} [timeout] - custom timeout in ms
 * @example I wait until text of 'Header' to be equal 'Javascript'
 * @example I wait until text of 'Header' not to be equal 'Python'
 * @example I wait until text of 'Header' not to be equal 'Python' (timeout: 4000)
 */
When(
    'I wait until text of {string} {wdioValueWait} {string}( ){wdioTimeout}',
    async function (alias: string, waitType: string, value: string, timeout: number | null) {
        const wait = getValueWait(waitType);
        const element = await getElement(alias) as WebdriverIO.Element;
        const expectedValue = await getValue(value);
        const getValueFn = async () => element.getText();
        await wait(getValueFn, expectedValue, timeout ?? config.browser.timeout.page);
    }
);

/**
 * Wait for collection length condition
 * @param {string} alias - element to wait condition
 * @param {string} wait - wait condition
 * @param {string} value - expected value to wait
 * @param {number|null} [timeout] - custom timeout in ms
 * @example I wait until number of elements in 'Search Results' collection to be equal '50'
 * @example I wait until number of elements in 'Search Results' collection to be above '49'
 * @example I wait until number of elements in 'Search Results' collection to be below '51'
 * @example I wait until number of elements in 'Search Results' collection to be below '51' (timeout: 3000)
 */
When(
    'I wait until number of elements in {string} collection {wdioValueWait} {string}( ){wdioTimeout}',
    async function (alias: string, waitType: string, value: string, timeout: number | null) {
        const wait = getValueWait(waitType);
        const collection = await getLocator(alias) as Function;
        const expectedValue = await getValue(value);
        const getValueFn = async () => (await collection() as WebdriverIO.Element[]).length;
        await wait(getValueFn, expectedValue, timeout ?? config.browser.timeout.page);
    }
);

/**
 * Wait for element property condition
 * @param {string} property - property
 * @param {string} alias - element to wait condition
 * @param {string} wait - wait condition
 * @param {string} value - expected value to wait
 * @param {number|null} [timeout] - custom timeout in ms
 * @example I wait until 'value' property of 'Search Input' to be equal 'Javascript'
 * @example I wait until 'value' property of 'Search Input' to be equal 'Javascript' (timeout: 5000)
 */
When(
    'I wait until {string} property of {string} {wdioValueWait} {string}( ){wdioTimeout}',
    async function (property: string, alias: string, waitType: string, value: string, timeout: number | null) {
        const propertyName = await getValue(property);
        const wait = getValueWait(waitType);
        const element = await getElement(alias) as WebdriverIO.Element;
        const expectedValue = await getValue(value);
        const getValueFn = async () => element.getProperty(propertyName);
        await wait(getValueFn, expectedValue, timeout ?? config.browser.timeout.page);
    }
);

/**
 * Wait for element css property condition
 * @param {string} property - css property
 * @param {string} alias - element to wait condition
 * @param {string} wait - wait condition
 * @param {string} value - expected value to wait
 * @param {number|null} [timeout] - custom timeout in ms
 * @example I wait until 'color' css property of 'Search Input' to be equal 'rgb(42, 42, 42)'
 * @example I wait until 'font-family' css property of 'Search Input' to be equal 'Fira' (timeout: 3000)
 */
When(
    'I wait until {string} css property of {string} {wdioValueWait} {string}( ){wdioTimeout}',
    async function (property: string, alias: string, waitType: string, value: string, timeout: number | null) {
        const propertyName = await getValue(property);
        const wait = getValueWait(waitType);
        const element = () => getElement(alias);
        const expectedValue = await getValue(value);
        const getValueFn = async () => browser.execute(
            function (element: WebdriverIO.Element, propertyName: string) {
                return getComputedStyle(element as any).getPropertyValue(propertyName)
            }, await element() as any, propertyName);
        await wait(getValueFn, expectedValue, timeout ?? config.browser.timeout.page);
    }
);

/**
 * Wait for element attribute condition
 * @param {string} attribute - attribute
 * @param {string} alias - element to wait condition
 * @param {string} wait - wait condition
 * @param {string} value - expected value to wait
 * @param {number|null} [timeout] - custom timeout in ms
 * @example I wait until 'href' attribute of 'Home Link' to be equal '/javascript'
 * @example I wait until 'href' attribute of 'Home Link' to be equal '/javascript' (timeout: 5000)
 */
When(
    'I wait until {string} attribute of {string} {wdioValueWait} {string}( ){wdioTimeout}',
    async function (attribute: string, alias: string, waitType: string, value: string, timeout: number | null) {
        const attributeName = await getValue(attribute);
        const wait = getValueWait(waitType);
        const element = await getElement(alias) as WebdriverIO.Element;
        const expectedValue = await getValue(value);
        const getValueFn = async () => element.getAttribute(attributeName);
        await wait(getValueFn, expectedValue, timeout ?? config.browser.timeout.page);
    }
);

/**
 * Wait for url condition
 * @param {string} wait - wait condition
 * @param {string} value - expected value to wait
 * @param {number|null} [timeout] - custom timeout in ms
 * @example I wait until current url to be equal 'https://qavajs.github.io/'
 * @example I wait until current url not to contain 'java'
 * @example I wait until current url not to contain 'java' (timeout: 3000)
 */
When(
    'I wait until current url {wdioValueWait} {string}( ){wdioTimeout}',
    async function (waitType: string, value: string, timeout: number | null) {
        const wait = getValueWait(waitType);
        const expectedValue = await getValue(value);
        const getValueFn = async () => browser.getUrl();
        await wait(getValueFn, expectedValue, timeout ?? config.browser.timeout.page);
    }
);

/**
 * Wait for title condition
 * @param {string} wait - wait condition
 * @param {string} value - expected value to wait
 * @param {number|null} [timeout] - custom timeout in ms
 * @example I wait until page title to be equal 'qavajs'
 * @example I wait until page title not to contain 'java'
 * @example I wait until page title to be equal 'qavajs' (timeout: 2000)
 */
When(
    'I wait until page title {wdioValueWait} {string}( ){wdioTimeout}',
    async function (waitType: string, value: string, timeout: number | null) {
        const wait = getValueWait(waitType);
        const expectedValue = await getValue(value);
        const getValueFn = async () => browser.getTitle();
        await wait(getValueFn, expectedValue, timeout ?? config.browser.timeout.page);
    }
);

/**
 * Waiting for alert to pop up
 * @example I wait for alert
 */
When('I wait for alert', async function () {
  const options = {
    timeout: config.browser.timeout.present,
    timeoutMsg: `Alert has not been shown for ${config.browser.timeout.page} ms`,
    interval: 2000,
  };
  await browser.waitUntil(async () => {
    return Boolean(await browser.getAlertText());
  }, options);
});
