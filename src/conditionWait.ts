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
        element: WebdriverIO.Element,
        reverse: boolean,
        timeout: number,
        timeoutMsg?: string
    ) => element.waitForExist({reverse, timeout, timeoutMsg}),
    [conditionValidations.CLICKABLE]: (
        element: WebdriverIO.Element,
        reverse: boolean,
        timeout: number,
        timeoutMsg?: string
    ) => element.waitForClickable({reverse, timeout, timeoutMsg}),
    [conditionValidations.VISIBLE]: (
        element: WebdriverIO.Element,
        reverse: boolean,
        timeout: number,
        timeoutMsg?: string
    ) => element.waitForDisplayed({reverse, timeout, timeoutMsg}),
    [conditionValidations.INVISIBLE]: (
        element: WebdriverIO.Element,
        reverse: boolean,
        timeout: number,
        timeoutMsg?: string
    ) => element.waitForDisplayed({reverse: !reverse, timeout, timeoutMsg}),
    [conditionValidations.ENABLED]: (
        element: WebdriverIO.Element,
        reverse: boolean,
        timeout: number,
        timeoutMsg?: string
    ) => element.waitForEnabled({reverse, timeout, timeoutMsg}),
    [conditionValidations.DISABLED]: (
        element: WebdriverIO.Element,
        reverse: boolean,
        timeout: number,
        timeoutMsg?: string
    ) => element.waitForEnabled({reverse: !reverse, timeout, timeoutMsg}),
    [conditionValidations.IN_VIEWPORT]: (
        element: WebdriverIO.Element,
        reverse: boolean,
        timeout: number,
        timeoutMsg?: string
    ) => element.waitForDisplayed({
        withinViewport: true,
        reverse,
        timeout,
        timeoutMsg
    })
}
/**
 * Wait for condition
 * @param {WebdriverIO.Element} element - wdio element
 * @param {string} validationType - validation to perform
 * @param {number} [timeout] - timeout to wait
 * @param {boolean} [reverse] - negate flag
 * @return {Promise<void>}
 */
export async function conditionWait(
    element: WebdriverIO.Element,
    validationType: string,
    timeout: number = 10000,
    reverse: boolean = false
): Promise<void> {
    const waitFn = waits[validationType];
    await waitFn(element, reverse, timeout);
}

export function getConditionWait(condition: string): Function {
    const match = condition.match(conditionWaitExtractRegexp) as RegExpMatchArray;
    if (!match) throw new Error(`${condition} wait is not implemented`);
    const [ _, reverse, validation ] = match;
    return async function (element: WebdriverIO.Element, timeout: number) {
        await conditionWait(element, validation, timeout, Boolean(reverse));
    }
}