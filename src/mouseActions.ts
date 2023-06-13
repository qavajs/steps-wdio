import { When } from '@cucumber/cucumber';
import { getValue } from './transformers';
import { parseCoords } from './utils';

/**
 * Press mouse button
 * @param {string} button - button to press (left, right, middle)
 * @example When I press left mouse button
 */
When('I press {wdioMouseButton} mouse button', async function (button) {
    await browser.action('pointer').down(button).perform(true);
});

/**
 * Release mouse button
 * @param {string} button - button to release (left, right, middle)
 * @example When I release left mouse button
 */
When('I release {wdioMouseButton} mouse button', async function (button) {
    await browser.action('pointer').up(button).perform(true);
});

/**
 * Move mouse to coordinates
 * @param {string} coords - x, y coordinates to move
 * @example When I move mouse to '10, 15'
 */
When('I move mouse to {string}', async function (coords){
    const [x, y] = parseCoords(await getValue(coords));
    await browser.action('pointer').move(x, y).perform(true);
});

/**
 * Scroll mouse wheel by x, y offset
 * @param {string} coords - x, y offset to scroll
 * @example When I scroll mouse wheel by '0, 15'
 */
When('I scroll mouse wheel by {string}', async function (offset) {
    const [deltaX, deltaY] = parseCoords(await getValue(offset));
    await browser.action('wheel').scroll({ deltaX, deltaY, duration: 100 }).perform(true);
});
