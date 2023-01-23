import { Element } from 'webdriverio';

export const conditionValidations = {
    PRESENT: 'present',
    CLICKABLE: 'clickable',
    VISIBLE: 'visible',
    INVISIBLE: 'invisible',
    ENABLED: 'enabled',
    DISABLED: 'disabled',
    IN_VIEWPORT: 'in viewport'
}

const notClause = '(not )?';
const toBeClause = 'to (?:be )?';
const validationClause = `(${Object.values(conditionValidations).join('|')})`;

export const conditionWaitExtractRegexp = new RegExp(`^${notClause}${toBeClause}${validationClause}$`);
export const conditionWaitRegexp = new RegExp(`(${notClause}${toBeClause}${validationClause})`);

const waits = {
    [conditionValidations.PRESENT]: (
        element: Element,
        reverse: boolean,
        timeout: number,
        timeoutMsg: string
    ) => element.waitForExist({reverse, timeout, timeoutMsg}),
    [conditionValidations.CLICKABLE]: (
        element: Element,
        reverse: boolean,
        timeout: number,
        timeoutMsg: string
    ) => element.waitForClickable({reverse, timeout, timeoutMsg}),
    [conditionValidations.VISIBLE]: (
        element: Element,
        reverse: boolean,
        timeout: number,
        timeoutMsg: string
    ) => element.waitForDisplayed({reverse, timeout, timeoutMsg}),
    [conditionValidations.INVISIBLE]: (
        element: Element,
        reverse: boolean,
        timeout: number,
        timeoutMsg: string
    ) => element.waitForDisplayed({reverse: !reverse, timeout, timeoutMsg}),
    [conditionValidations.ENABLED]: (
        element: Element,
        reverse: boolean,
        timeout: number,
        timeoutMsg: string
    ) => element.waitForEnabled({reverse, timeout, timeoutMsg}),
    [conditionValidations.DISABLED]: (
        element: Element,
        reverse: boolean,
        timeout: number,
        timeoutMsg: string
    ) => element.waitForEnabled({reverse: !reverse, timeout, timeoutMsg}),
    [conditionValidations.IN_VIEWPORT]: (
        element: Element,
        reverse: boolean,
        timeout: number,
        timeoutMsg: string
    ) => element.waitUntil(async function(this: Element) {
        return (await this.isDisplayedInViewport() !== reverse)
    }, {timeout, timeoutMsg})
}
/**
 * Wait for condition
 * @param {WebdriverIO.Element} element - protractor element
 * @param {string} validationType - validation to perform
 * @param {number} [timeout] - timeout to wait
 * @param {boolean} [reverse] - negate flag
 * @return {Promise<void>}
 */
export async function conditionWait(
    element: Element,
    validationType: string,
    timeout: number = 10000,
    reverse: boolean = false
) {
    const timeoutMsg: string = `Element is${reverse ? '' : ' not'} ${validationType}`;
    const waitFn = waits[validationType];
    await waitFn(element, reverse, timeout, timeoutMsg);
}
