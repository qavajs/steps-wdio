import memory from '@qavajs/memory';
import { When } from '@cucumber/cucumber';

/**
 * Save text of element to memory
 * @param {Element} element - element to get value
 * @param {string} key - key to store value
 * @example I save text of '#1 of Search Results' as 'firstSearchResult'
 */
When('I save text of {element} as {string}', async function (element, key) {
    const value = await (await element).getText();
    memory.setValue(key, value);
});

/**
 * Save property of element to memory
 * @param {string} property - property to store
 * @param {Element} element - element to get value
 * @param {string} key - key to store value
 * @example I save 'checked' property of 'Checkbox' as 'checked'
 * @example I save '$prop' property of 'Checkbox' as 'checked'
 */
When('I save {text} property of {element} as {string}', async function (property, element, key) {
    const value = await (await element).getProperty(await property);
    memory.setValue(key, value);
});

/**
 * Save attribute of element to memory
 * @param {string} attribute - attribute to store
 * @param {Element} element - element to get value
 * @param {string} key - key to store value
 * @example I save 'href' attribute of 'Link' as 'linkHref'
 * @example I save '$prop' attribute of 'Link' as 'linkHref'
 */
When('I save {text} attribute of {element} as {string}', async function (attribute, element, key) {
    const value = await (await element).getAttribute(await attribute);
    memory.setValue(key, value);
});

/**
 * Save number of elements in collection to memory
 * @param {Element} collection - collection to get value
 * @param {string} key - key to store value
 * @example I save number of elements in 'Search Results' as 'numberOfSearchResults'
 */
When('I save number of elements in {element} collection as {string}', async function (collection, key) {
    const value = (await collection).length;
    memory.setValue(key, value);
});
