import { When } from '@cucumber/cucumber';
import { getElement, getValue } from './transformers';
import { parseCoords, virtualPointer } from './utils';
import { conditionValidations, conditionWait } from './conditionWait';

/**
 * Hover over element
 * @param {string} alias - element to hover over
 * @example I hover over 'Google Button'
 */
When('I hover over {string}', async function (alias: string) {
    const element = await getElement(alias);
    await conditionWait(element, conditionValidations.VISIBLE, config.browser.timeout.visible);
    await element.moveTo();
    virtualPointer.hover(element);
});

/**
 * Press mouse button
 * @param {string} button - button to press (left, right, middle)
 * @example When I press left mouse button
 */
When('I press {wdioMouseButton} mouse button', async function (button) {
    await browser
        .action('pointer')
        .move({ ...virtualPointer.pointer() })
        .down(button)
        .perform(true);
});

/**
 * Release mouse button
 * @param {string} button - button to release (left, right, middle)
 * @example When I release left mouse button
 */
When('I release {wdioMouseButton} mouse button', async function (button) {
    await browser
        .action('pointer')
        .move({ ...virtualPointer.pointer() })
        .up(button)
        .perform(true);
});

/**
 * Move mouse to coordinates
 * @param {string} coords - x, y coordinates to move
 * @example When I move mouse to '10, 15'
 */
When('I move mouse to {string}', async function (coords){
    const [x, y] = parseCoords(await getValue(coords));
    virtualPointer.move(x, y);
    await browser
        .action('pointer')
        .move({ ...virtualPointer.pointer() })
        .perform(true);
});

/**
 * Scroll mouse wheel by x, y offset
 * @param {string} coords - x, y offset to scroll
 * @example When I scroll mouse wheel by '0, 15'
 */
When('I scroll mouse wheel by {string}', async function (offset) {
    const [deltaX, deltaY] = parseCoords(await getValue(offset));
    await browser
        .action('wheel')
        .scroll({
            deltaX,
            deltaY,
            duration: 100,
            ...virtualPointer.wheel()
        })
        .perform(true);
});
