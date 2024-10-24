import { When } from '@cucumber/cucumber';
import { parseKeySequence } from './utils';

/**
 * Press and hold keyboard key
 * @param {string} key - key to press
 * @example When I hold down 'Q' key
 */
When('I hold down {string} key', async function (key) {
    const [keyToPress] = parseKeySequence(key);
    await this.wdio.browser.action('key').down(keyToPress).perform(true);
});

/**
 * Release keyboard key
 * @param {string} key - key to release
 * @example When I release 'A' key
 */
When('I release {string} key', async function (key) {
    const [keyToPress] = parseKeySequence(key);
    await this.wdio.browser.action('key').up(keyToPress).perform();
});
