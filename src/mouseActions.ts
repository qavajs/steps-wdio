import { When } from '@cucumber/cucumber';
import { parseCoords, virtualPointer } from './utils';
import { Locator } from './pageObject';
import {MemoryValue} from "@qavajs/core";

/**
 * Hover over element
 * @param {string} alias - element to hover over
 * @example I hover over 'Google Button'
 */
When('I hover over {wdioLocator}', async function (element: Locator) {
    await element().moveTo();
    virtualPointer.hover(await element().getElement());
});

/**
 * Press mouse button
 * @param {string} button - button to press (left, right, middle)
 * @example When I press left mouse button
 */
When('I press {wdioMouseButton} mouse button', async function (button) {
    await this.wdio.browser
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
    await this.wdio.browser
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
When('I move mouse to {value}', async function (coords: MemoryValue) {
    const [x, y] = parseCoords(await coords.value());
    virtualPointer.move(x, y);
    await this.wdio.browser
        .action('pointer')
        .move({ ...virtualPointer.pointer() })
        .perform(true);
});

/**
 * Scroll mouse wheel by x, y offset
 * @param {string} coords - x, y offset to scroll
 * @example When I scroll mouse wheel by '0, 15'
 */
When('I scroll mouse wheel by {value}', async function (offset: MemoryValue) {
    const [deltaX, deltaY] = parseCoords(await offset.value());
    await this.wdio.browser
        .action('wheel')
        .scroll({
            deltaX,
            deltaY,
            duration: 100,
            ...virtualPointer.wheel()
        })
        .perform(true);
});
