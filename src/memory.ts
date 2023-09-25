import memory from '@qavajs/memory';
import { When } from '@cucumber/cucumber';
import { getElement, getValue } from './transformers';

/**
 * Save text of element to memory
 * @param {string} alias - element to get value
 * @param {string} key - key to store value
 * @example I save text of '#1 of Search Results' as 'firstSearchResult'
 */
When('I save text of {string} as {string}', async function (alias, key) {
    const element = await getElement(alias) as WebdriverIO.Element;
    const value = await element.getText();
    memory.setValue(key, value);
});

/**
 * Save property of element to memory
 * @param {string} property - property to store
 * @param {string} alias - element to get value
 * @param {string} key - key to store value
 * @example I save 'checked' property of 'Checkbox' as 'checked'
 * @example I save '$prop' property of 'Checkbox' as 'checked'
 */
When('I save {string} property of {string} as {string}', async function (property, alias, key) {
    const element = await getElement(alias) as WebdriverIO.Element;
    const propertyName = await getValue(property);
    const value = await element.getProperty(propertyName);
    memory.setValue(key, value);
});

/**
 * Save attribute of element to memory
 * @param {string} attribute - attribute to store
 * @param {string} alias - element to get value
 * @param {string} key - key to store value
 * @example I save 'href' attribute of 'Link' as 'linkHref'
 * @example I save '$prop' attribute of 'Link' as 'linkHref'
 */
When('I save {string} attribute of {string} as {string}', async function (attribute, alias, key) {
    const element = await getElement(alias) as WebdriverIO.Element;
    const attributeName = await getValue(attribute);
    const value = await element.getAttribute(attributeName);
    memory.setValue(key, value);
});

/**
 * Save number of elements in collection to memory
 * @param {string} alias - collection to get value
 * @param {string} key - key to store value
 * @example I save number of elements in 'Search Results' as 'numberOfSearchResults'
 */
When('I save number of elements in {string} collection as {string}', async function (alias, key) {
    const collection = await getElement(alias) as WebdriverIO.Element[];
    const value = collection.length;
    memory.setValue(key, value);
});

/**
 * Save array of texts of collection to memory
 * @param {string} alias - collection to get values
 * @param {string} key - key to store value
 * @example I save text of every element of 'Search Results' collection as 'searchResults'
 */
When(
    'I save text of every element of {string} collection as {string}',
    async function (alias: string, key: string) {
        const collection = await getElement(alias) as WebdriverIO.Element[];
        const values = await Promise.all(collection.map(element => element.getText()));
        memory.setValue(key, values);
    }
);

/**
 * Save array of attributes of collection to memory
 * @param {string} alias - collection to get values
 * @param {string} key - key to store value
 * @example I save 'checked' attribute of every element of 'Search > Checkboxes' collection as 'checkboxes'
 */
When(
    'I save {string} attribute of every element of {string} collection as {string}',
    async function (attribute: string, alias: string, key: string) {
        const collection = await getElement(alias) as WebdriverIO.Element[];
        const values = await Promise.all(collection.map(element => element.getAttribute(attribute)));
        memory.setValue(key, values);
    }
);

/**
 * Save array of property of collection to memory
 * @param {string} alias - collection to get values
 * @param {string} key - key to store value
 * @example I save 'href' property of every element of 'Search > Links' collection as 'hrefs'
 */
When(
    'I save {string} property of every element of {string} collection as {string}',
    async function (property: string, alias: string, key: string) {
        const collection = await getElement(alias) as WebdriverIO.Element[];
        const values = await Promise.all(collection.map(element => element.getProperty(property)));
        memory.setValue(key, values);
    }
);

/**
 * Save current url to memory
 * @param {string} key - key to store value
 * @example I save current url as 'currentUrl'
 */
When('I save current url as {string}', async function (key: string) {
    const url = await browser.getUrl();
    memory.setValue(key, url);
});

/**
 * Save current page title to memory
 * @param {string} key - key to store value
 * @example I save page title as 'currentTitle'
 */
When('I save page title as {string}', async function (key: string) {
    const title = await browser.getTitle();
    memory.setValue(key, title);
});

/**
 * Save page screenshot into memory
 * @param {string} key - key to store value
 * @example I save screenshot as 'screenshot'
 */
When('I save screenshot as {string}', async function(key: string) {
    const screenshot = await browser.takeScreenshot();
    memory.setValue(key, screenshot);
});

/**
 * Save element screenshot into memory
 * @param {string} alias - element to get screenshot
 * @param {string} key - key to store value
 * @example I save screenshot of 'Header > Logo' as 'screenshot'
 */
When('I save screenshot of {string} as {string}', async function(alias: string, key: string) {
    const element = await getElement(alias) as WebdriverIO.Element;
    const screenshot = await browser.takeElementScreenshot(element.elementId);
    memory.setValue(key, screenshot);
});

/**
 * Save css property of element to memory
 * @param {string} property - css property to store
 * @param {string} alias - element to get value
 * @param {string} key - key to store value
 * @example I save 'color' css property of 'Checkbox' as 'checkboxColor'
 * @example I save '$propertyName' property of 'Checkbox' as 'checkboxColor'
 */
When('I save {string} css property of {string} as {string}', async function (property, alias, key) {
    const element = await getElement(alias) as WebdriverIO.Element;
    const propertyName = await getValue(property);
    const value = await browser.execute(function (element: WebdriverIO.Element, propertyName: string) {
        return getComputedStyle(element as any).getPropertyValue(propertyName)
    }, element as any, propertyName);
    memory.setValue(key, value);
});

/**
 * Save bounding client rect to memory
 * https://developer.mozilla.org/en-US/docs/Web/API/DOMRect
 * @param {string} alias - element to get value
 * @param {string} key - key to store value
 * @example
 * When I save bounding rect of 'Node' as 'boundingRect'
 * Then I expect '$boundingRect.width' to equal '42'
 */
When('I save bounding rect of {string} as {string}', async function (alias, key) {
    const element = await getElement(alias) as WebdriverIO.Element;
    const value = await browser.execute(function (element: WebdriverIO.Element) {
        return JSON.stringify((element as any).getBoundingClientRect());
    }, element as any);
    memory.setValue(key, JSON.parse(value));
});
