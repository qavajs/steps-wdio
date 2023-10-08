export const valueValidations = {
    EQUAL: 'equal',
    CONTAIN: 'contain',
    ABOVE: 'above',
    BELOW: 'below',
    MATCH: 'match'
}

const notClause = '(not )?';
const toBeClause = 'to (?:be )?';
const validationClause = `(${Object.values(valueValidations).join('|')})`;

export const valueWaitExtractRegexp = new RegExp(`^${notClause}${toBeClause}${validationClause}$`);
export const valueWaitRegexp = new RegExp(`(${notClause}${toBeClause}${validationClause})`);

const waits = {
    [valueValidations.EQUAL]: async (valueFn: Function, expected: any) => (await valueFn()) == expected,
    [valueValidations.CONTAIN]: async (valueFn: Function, expected: any) => (await valueFn()).includes(expected),
    [valueValidations.ABOVE]: async (valueFn: Function, expected: any) => (await valueFn()) > expected,
    [valueValidations.BELOW]: async (valueFn: Function, expected: any) => (await valueFn()) < expected,
    [valueValidations.MATCH]: async (valueFn: Function, expected: any) => regexp(expected).test((await valueFn()))
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
    valueFn: Function,
    expected: any,
    validationType: string,
    timeout: number = 10000,
    reverse: boolean
): Promise<void> {
    const timeoutMsg: string = `Value is expected to${reverse ? ' not' : ''} ${validationType} ${expected}`;
    const options = { timeout, timeoutMsg };
    const waitFn = waits[validationType];
    await browser.waitUntil(async () => reverse !== await waitFn(valueFn, expected), options);
}

function regexp(regexpLike: string | RegExp) {
    if (typeof regexpLike === 'string') {
        return new RegExp(regexpLike, 'gmi')
    }
    return regexpLike
}
