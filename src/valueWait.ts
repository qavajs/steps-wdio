export const valueValidations = {
    EQUAL: 'equal',
    CONTAIN: 'contain',
    ABOVE: 'above',
    BELOW: 'below'
}

const waits = {
    [valueValidations.EQUAL]: async (valueFn: Function, expected: any) => (await valueFn()) == expected,
    [valueValidations.CONTAIN]: async (valueFn: Function, expected: any) => (await valueFn()).includes(expected),
    [valueValidations.ABOVE]: async (valueFn: Function, expected: any) => (await valueFn()) > expected,
    [valueValidations.BELOW]: async (valueFn: Function, expected: any) => (await valueFn()) < expected
}

/**
 * Wait for condition
 * @param {any} valueFn - function to return value
 * @param {any} expected - expected value
 * @param {string} validationType - validation to perform
 * @param {number} [timeout] - timeout to wait
 * @param {boolean} [reverse] - negate flag
 * @return {Promise<void>}
 */
export async function valueWait(
    validationType: string,
    reverse: boolean = false,
    timeout: number = 10000,
    valueFn: Function,
    expected: any
) {
    const timeoutMsg: string = `Value is${reverse ? ' ' : ' not'} ${validationType} ${expected}`;
    const options = { timeout, timeoutMsg };
    const waitFn = waits[validationType];
    if (!waitFn) throw new Error(`${validationType} validation is not implemented`);
    await browser.waitUntil(async () => reverse !== await waitFn(valueFn, expected), options);
}
