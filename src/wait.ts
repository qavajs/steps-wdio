import { Element } from 'webdriverio';

export const validations = {
    PRESENT: 'present',
    CLICKABLE: 'clickable',
    VISIBLE: 'visible',
    INVISIBLE: 'invisible',
    SELECTED: 'selected',
    APPEAR: 'appear',
    DISAPPEAR: 'disappear',
    BECOME_VISIBLE: 'become visible',
    BECOME_INVISIBLE: 'become invisible',
    BECOME_CLICKABLE: 'become clickable'
}

export const timeout = {
    GLOBAL_TIMEOUT: 60 * 1000,
    DEFAULT_TIMEOUT: 60 * 1000,
    WAIT_PAGE_TIMEOUT: 60 * 1000,
    CLICK_TIMEOUT: 30 * 1000,
    DOWNLOAD_TIMEOUT: 60 * 1000,
    WAIT_ELEMENT_TIMEOUT: 30 * 1000,
    WAIT_TEXT_TIMEOUT: 30 * 1000,
    EMAIL_TIMEOUT: 60 * 1000,
    THROTTLE: 200
}

/**
 * Wait for condition
 * @param {WebdriverIOAsync.Element} element - protractor element
 * @param {string} validationType - validation to perform
 * @param {number} [timeout] - timeout to wait
 * @param {boolean} [reverse] - negate flag
 * @return {Promise<void>}
 */
export async function wait(
    element: Element<'async'>,
    validationType: string,
    timeout: number = 10000,
    reverse: boolean = false
) {
    const timeoutMsg: string = `Element${reverse ? ' ' : ' not'} ${validationType}`;
    switch (validationType) {
        case validations.PRESENT:
            return element.waitForExist({reverse, timeout, timeoutMsg})
        case validations.BECOME_CLICKABLE:
        case validations.CLICKABLE:
            return element.waitForClickable({reverse, timeout, timeoutMsg})
        case validations.BECOME_VISIBLE:
        case validations.VISIBLE:
            return element.waitForDisplayed({reverse, timeout, timeoutMsg})
        case validations.INVISIBLE:
            return element.waitForDisplayed({reverse: true, timeout, timeoutMsg})
        default:
            throw new Error(`${validationType} validation is not expected`);
    }
}
