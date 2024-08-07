import { When } from '@cucumber/cucumber';
import { getValue, getElement, getConditionWait, getLocator } from './transformers';
import { getPollValidation } from '@qavajs/validation';
import { isImmediate } from './utils';
import { conditionValidations, conditionWait } from './conditionWait';

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
    'I wait until text of {string} {wdioValidation} {string}( ){wdioTimeout}',
    async function (alias: string, waitType: string, value: string, timeout: number | null) {
        const wait = getPollValidation(waitType);
        const element = await getElement(alias) as WebdriverIO.Element;
        await conditionWait(element, conditionValidations.PRESENT, config.browser.timeout.present);
        const expectedValue = await getValue(value);
        const getValueFn = () => element.getText();
        await wait(getValueFn, expectedValue,  {
            timeout: timeout ?? config.browser.timeout.value,
            interval: config.browser.timeout.valueInterval
        });
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
    'I wait until number of elements in {string} collection {wdioValidation} {string}( ){wdioTimeout}',
    async function (alias: string, waitType: string, value: string, timeout: number | null) {
        const wait = getPollValidation(waitType);
        const collection = getLocator(alias);
        const expectedValue = await getValue(value);
        const getValueFn = async () => (await collection() as WebdriverIO.ElementArray).length;
        await wait(getValueFn, expectedValue,  {
            timeout: timeout ?? config.browser.timeout.value,
            interval: config.browser.timeout.valueInterval
        });
    }
);

/**
 * Wait for element property condition
 * @param {string} alias - element to wait condition
 * @param {string} wait - wait condition
 * @param {string} value - expected value to wait
 * @param {number|null} [timeout] - custom timeout in ms
 * @example I wait until value of 'Search Input' to be equal 'Javascript'
 * @example I wait until value of 'Search Input' to be equal 'Javascript' (timeout: 5000)
 */
When(
    'I wait until value of {string} {wdioValidation} {string}( ){wdioTimeout}',
    async function (alias: string, waitType: string, value: string, timeout: number | null) {
        const wait = getPollValidation(waitType);
        const element = await getElement(alias) as WebdriverIO.Element;
        await conditionWait(element, conditionValidations.PRESENT, config.browser.timeout.present);
        const expectedValue = await getValue(value);
        const getValueFn = () => element.getProperty('value');
        await wait(getValueFn, expectedValue,  {
            timeout: timeout ?? config.browser.timeout.value,
            interval: config.browser.timeout.valueInterval
        });
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
    'I wait until {string} property of {string} {wdioValidation} {string}( ){wdioTimeout}',
    async function (property: string, alias: string, waitType: string, value: string, timeout: number | null) {
        const propertyName = await getValue(property);
        const wait = getPollValidation(waitType);
        const element = await getElement(alias) as WebdriverIO.Element;
        await conditionWait(element, conditionValidations.PRESENT, config.browser.timeout.present);
        const expectedValue = await getValue(value);
        const getValueFn = () => element.getProperty(propertyName);
        await wait(getValueFn, expectedValue,  {
            timeout: timeout ?? config.browser.timeout.value,
            interval: config.browser.timeout.valueInterval
        });
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
    'I wait until {string} css property of {string} {wdioValidation} {string}( ){wdioTimeout}',
    async function (property: string, alias: string, waitType: string, value: string, timeout: number | null) {
        const propertyName = await getValue(property);
        const wait = getPollValidation(waitType);
        const element = () => getElement(alias);
        const expectedValue = await getValue(value);
        const getValueFn = async () => browser.execute(
            function (element: WebdriverIO.Element, propertyName: string) {
                return getComputedStyle(element as any).getPropertyValue(propertyName)
            }, await element() as any, propertyName);
        await wait(getValueFn, expectedValue,  {
            timeout: timeout ?? config.browser.timeout.value,
            interval: config.browser.timeout.valueInterval
        });
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
    'I wait until {string} attribute of {string} {wdioValidation} {string}( ){wdioTimeout}',
    async function (attribute: string, alias: string, waitType: string, value: string, timeout: number | null) {
        const attributeName = await getValue(attribute);
        const wait = getPollValidation(waitType);
        const element = await getElement(alias) as WebdriverIO.Element;
        await conditionWait(element, conditionValidations.PRESENT, config.browser.timeout.present);
        const expectedValue = await getValue(value);
        const getValueFn = () => element.getAttribute(attributeName);
        await wait(getValueFn, expectedValue,  {
            timeout: timeout ?? config.browser.timeout.value,
            interval: config.browser.timeout.valueInterval
        });
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
    'I wait until current url {wdioValidation} {string}( ){wdioTimeout}',
    async function (waitType: string, value: string, timeout: number | null) {
        const wait = getPollValidation(waitType);
        const expectedValue = await getValue(value);
        const getValueFn = () => browser.getUrl();
        await wait(getValueFn, expectedValue,  {
            timeout: timeout ?? config.browser.timeout.value,
            interval: config.browser.timeout.valueInterval
        });
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
    'I wait until page title {wdioValidation} {string}( ){wdioTimeout}',
    async function (waitType: string, value: string, timeout: number | null) {
        const wait = getPollValidation(waitType);
        const expectedValue = await getValue(value);
        const getValueFn = () => browser.getTitle();
        await wait(getValueFn, expectedValue,  {
            timeout: timeout ?? config.browser.timeout.value,
            interval: config.browser.timeout.valueInterval
        });
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
    'I refresh page until {string} {wdioConditionWait}( ){wdioTimeout}',
    async function (alias: string, waitType: string, timeoutValue: number | null) {
        const timeout = timeoutValue ?? config.browser.timeout.value;
        const wait = getConditionWait(waitType);
        await browser.waitUntil(async () => {
            await browser.refresh();
            const element = await getElement(alias);
            await wait(element, config.browser.timeout.pageRefreshInterval);
            return true;
        }, { timeout, interval: config.browser.timeout.pageRefreshInterval });
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
    'I refresh page until text of {string} {wdioValidation} {string}( ){wdioTimeout}',
    async function (alias: string, validationType: string, value: string, timeoutValue: number | null) {
        const validation = getPollValidation(validationType);
        const timeout = timeoutValue ?? config.browser.timeout.value;
        const expectedValue = await getValue(value);
        await browser.waitUntil(async () => {
            await browser.refresh();
            const element = await getElement(alias) as WebdriverIO.Element;
            const value = () => element.getText();
            await validation(value, expectedValue, {
                timeout: config.browser.timeout.pageRefreshInterval,
                interval: config.browser.timeout.valueInterval
            });
            return true;
        }, { timeout, interval: config.browser.timeout.pageRefreshInterval });
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
  'I click {string} until text of {string} {wdioValidation} {string}( ){wdioTimeout}',
  async function (
      aliasToClick: string,
      aliasToCheck: string,
      validationType: string,
      value: string,
      timeoutValue: number | null,
    ) {
      const elementToClick = await getElement(aliasToClick) as WebdriverIO.Element;
      const elementToCheck = await getElement(aliasToCheck) as WebdriverIO.Element;
      const timeout = timeoutValue ?? config.browser.timeout.value;
      const expectedText = await getValue(value);
      const poll = getPollValidation(validationType);
      await poll(
        async () => {
            await elementToClick.click();
            return elementToCheck.getText();
        },
        expectedText,
        {timeout, interval: config.browser.timeout.actionInterval},
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
  'I click {string} until value of {string} {wdioValidation} {string}( ){wdioTimeout}',
  async function (
      aliasToClick: string,
      aliasToCheck: string,
      validationType: string,
      value: string,
      timeoutValue: number | null,
      ) {
      const elementToClick = await getElement(aliasToClick) as WebdriverIO.Element;
      const elementToCheck = await getElement(aliasToCheck) as WebdriverIO.Element;
      const timeout = timeoutValue ?? config.browser.timeout.value;
      const expectedValue = await getValue(value);
      const poll = getPollValidation(validationType);
      await poll(
          async () => {
              await elementToClick.click();
              return elementToCheck.getValue();
          },
          expectedValue,
          {timeout, interval: config.browser.timeout.actionInterval},
      );
    },
);
