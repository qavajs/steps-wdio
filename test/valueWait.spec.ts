import { getValueWait } from '../src/transformers';
import { test, jest } from '@jest/globals';

const waitUntil = jest.fn((fn: Function, options: any) => ({ fn, options }));

//@ts-ignore
global.browser = {
    //@ts-ignore
    waitUntil
}

type TestParams = {
    name: string,
    validation: string;
    valueFn: Function,
    valueToCompare: any,
    expectedCompareResult: boolean,
    timeout: number | undefined,
    expectedTimeout: number,
    timeoutMsg: string,
};
const equalTests: Array<TestParams> = [
    {
        name: 'to be equal (positive)',
        validation: 'to be equal',
        valueFn: () => 1,
        valueToCompare: 1,
        expectedCompareResult: true,
        timeout: 1,
        expectedTimeout: 1,
        timeoutMsg: 'Value is not equal 1',
    },
    {
        name: 'not to be equal (positive)',
        validation: 'not to be equal',
        valueFn: () => 1,
        valueToCompare: 2,
        expectedCompareResult: true,
        timeout: 1,
        expectedTimeout: 1,
        timeoutMsg: 'Value is equal 2',
    },
    {
        name: 'to be equal (negative)',
        validation: 'to be equal',
        valueFn: () => 1,
        valueToCompare: 2,
        expectedCompareResult: false,
        timeout: 1,
        expectedTimeout: 1,
        timeoutMsg: 'Value is not equal 2',
    },
    {
        name: 'not to be equal (negative)',
        validation: 'not to be equal',
        valueFn: () => 'string',
        valueToCompare: 'string',
        expectedCompareResult: false,
        timeout: 2,
        expectedTimeout: 2,
        timeoutMsg: 'Value is equal string',
    }
];

const containTests: Array<TestParams> = [
    {
        name: 'to contain (positive)',
        validation: 'to contain',
        valueFn: () => 'word',
        valueToCompare: 'wo',
        expectedCompareResult: true,
        timeout: 1,
        expectedTimeout: 1,
        timeoutMsg: 'Value is not contain wo',
    },
    {
        name: 'not to contain (positive)',
        validation: 'not to contain',
        valueFn: () => 'word',
        valueToCompare: 'di',
        expectedCompareResult: true,
        timeout: 1,
        expectedTimeout: 1,
        timeoutMsg: 'Value is contain di',
    },
    {
        name: 'to contain (negative)',
        validation: 'to contain',
        valueFn: () => 'word',
        valueToCompare: 'di',
        expectedCompareResult: false,
        timeout: 1,
        expectedTimeout: 1,
        timeoutMsg: 'Value is not contain di',
    },
    {
        name: 'not to contain (negative)',
        validation: 'not to contain',
        valueFn: () => 'word',
        valueToCompare: 'wo',
        expectedCompareResult: false,
        timeout: 2,
        expectedTimeout: 2,
        timeoutMsg: 'Value is contain wo',
    }
];

const aboveTests: Array<TestParams> = [
    {
        name: 'to be above (positive)',
        validation: 'to be above',
        valueFn: () => 2,
        valueToCompare: 1,
        expectedCompareResult: true,
        timeout: 1,
        expectedTimeout: 1,
        timeoutMsg: 'Value is not above 1',
    },
    {
        name: 'not to be above (positive)',
        validation: 'not to be above',
        valueFn: () => 2,
        valueToCompare: 3,
        expectedCompareResult: true,
        timeout: 1,
        expectedTimeout: 1,
        timeoutMsg: 'Value is above 3',
    },
    {
        name: 'to be above (negative)',
        validation: 'to be above',
        valueFn: () => 2,
        valueToCompare: 3,
        expectedCompareResult: false,
        timeout: 4,
        expectedTimeout: 4,
        timeoutMsg: 'Value is not above 3',
    },
    {
        name: 'not to be above (negative)',
        validation: 'not to be above',
        valueFn: () => 3,
        valueToCompare: 2,
        expectedCompareResult: false,
        timeout: 2,
        expectedTimeout: 2,
        timeoutMsg: 'Value is above 2',
    }
];

const belowTests: Array<TestParams> = [
    {
        name: 'to be below (positive)',
        validation: 'to be below',
        valueFn: () => 1,
        valueToCompare: 2,
        expectedCompareResult: true,
        timeout: 1,
        expectedTimeout: 1,
        timeoutMsg: 'Value is not below 2',
    },
    {
        name: 'not to be below (positive)',
        validation: 'not to be below',
        valueFn: () => 3,
        valueToCompare: 2,
        expectedCompareResult: true,
        timeout: 5,
        expectedTimeout: 5,
        timeoutMsg: 'Value is below 2',
    },
    {
        name: 'to be below (negative)',
        validation: 'to be below',
        valueFn: () => 3,
        valueToCompare: 2,
        expectedCompareResult: false,
        timeout: 4,
        expectedTimeout: 4,
        timeoutMsg: 'Value is not below 2',
    },
    {
        name: 'not to be below (negative)',
        validation: 'not to be below',
        valueFn: () => 2,
        valueToCompare: 3,
        expectedCompareResult: false,
        timeout: 2,
        expectedTimeout: 2,
        timeoutMsg: 'Value is below 3',
    }
];

const extraTests: Array<TestParams> = [
    {
        name: 'default timeout',
        validation: 'to be below',
        valueFn: () => 1,
        valueToCompare: 2,
        expectedCompareResult: true,
        timeout: undefined,
        expectedTimeout: 10000,
        timeoutMsg: 'Value is not below 2',
    }
]

beforeEach(() => {
    waitUntil.mockReset();
});

test.each([...equalTests, ...containTests, ...aboveTests, ...belowTests, ...extraTests])('$name', async (
    {
        validation,
        valueFn,
        valueToCompare,
        expectedCompareResult,
        timeout,
        expectedTimeout,
        timeoutMsg
    }) => {
        const waitFn = getValueWait(validation);
        await waitFn(valueFn, valueToCompare, timeout as number);
        const [compareFn, options] = waitUntil.mock.lastCall as [Function, Object];
        expect(waitUntil).toBeCalledTimes(1);
        expect(await compareFn()).toBe(expectedCompareResult);
        expect(options).toEqual({ timeout: expectedTimeout, timeoutMsg });
});


test('should throw an error if validation is not implemented', async () => {
    expect(() => getValueWait('to be cool')).toThrowError('to be cool wait is not implemented')
});
