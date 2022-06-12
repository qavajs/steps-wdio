const validation = {
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

const timeout = {
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

function ECHelper(element, validationType, reverse, timeout, timeoutMsg) {
    switch (validationType) {
        case validation.PRESENT:
            return element.waitForExist({reverse, timeout, timeoutMsg})
        case validation.BECOME_CLICKABLE:
        case validation.CLICKABLE:
            return element.waitForClickable({reverse, timeout, timeoutMsg})
        case validation.BECOME_VISIBLE:
        case validation.VISIBLE:
            return element.waitForDisplayed({reverse, timeout, timeoutMsg})
        case validation.INVISIBLE:
            return element.waitForDisplayed({reverse: true, timeout, timeoutMsg})
        default:
            throw new Error(`${validationType} validation is not expected`);
    }
}

/**
 * Wait for condition
 * @param {WebdriverIOAsync.Element} element - protractor element
 * @param {string} validation - validation to perform
 * @param {number} [timeout] - timeout to wait
 * @param {boolean} [negate] - negate flag
 * @return {Promise<void>}
 */
async function wait(element, validation, timeout = 10000, negate = false) {
    const timeoutMsg = `Element not ${validation}`;
    await ECHelper(element, validation, Boolean(negate), timeout, timeoutMsg)
}

module.exports = {
    wait,
    ...validation,
    ...timeout
}
