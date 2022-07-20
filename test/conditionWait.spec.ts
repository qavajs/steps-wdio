import { getConditionWait } from '../src/transformers';
import { conditionWait } from '../src/conditionWait';
import { test, jest } from '@jest/globals';
import { Element } from 'webdriverio';

interface MockElement {
    waitForExist?: Function,
    waitForClickable?: Function,
    waitForDisplayed?: Function
}

type TestParams = {
    name: string,
    validation: string;
    element: MockElement,
    expectedWait: string,
    reverse: boolean,
    timeout: number | undefined,
    expectedTimeout: number,
    timeoutMsg: string,
};

const mocks: any = {
    waitForExist: jest.fn(),
    waitForClickable: jest.fn(),
    waitForDisplayed: jest.fn()
}

const presentTests: Array<TestParams> = [
    {
        name: 'to be present',
        validation: 'to be present',
        element: {waitForExist: mocks.waitForExist},
        expectedWait: 'waitForExist',
        reverse: false,
        timeout: 1,
        expectedTimeout: 1,
        timeoutMsg: 'Element is not present',
    },
    {
        name: 'not to be present',
        validation: 'not to be present',
        element: {waitForExist: mocks.waitForExist},
        expectedWait: 'waitForExist',
        reverse: true,
        timeout: 1,
        expectedTimeout: 1,
        timeoutMsg: 'Element is present',
    }
]

const clickableTests: Array<TestParams> = [
    {
        name: 'to be clickable',
        validation: 'to be clickable',
        element: {waitForClickable: mocks.waitForClickable},
        expectedWait: 'waitForClickable',
        reverse: false,
        timeout: 1,
        expectedTimeout: 1,
        timeoutMsg: 'Element is not clickable',
    },
    {
        name: 'not to be clickable',
        validation: 'not to be clickable',
        element: {waitForClickable: mocks.waitForClickable},
        expectedWait: 'waitForClickable',
        reverse: true,
        timeout: 1,
        expectedTimeout: 1,
        timeoutMsg: 'Element is clickable',
    }
]

const visibleTests: Array<TestParams> = [
    {
        name: 'to be visible',
        validation: 'to be visible',
        element: {waitForDisplayed: mocks.waitForDisplayed},
        expectedWait: 'waitForDisplayed',
        reverse: false,
        timeout: 1,
        expectedTimeout: 1,
        timeoutMsg: 'Element is not visible',
    },
    {
        name: 'not to be visible',
        validation: 'not to be visible',
        element: {waitForDisplayed: mocks.waitForDisplayed},
        expectedWait: 'waitForDisplayed',
        reverse: true,
        timeout: 1,
        expectedTimeout: 1,
        timeoutMsg: 'Element is visible',
    }
]

const invisibleTests: Array<TestParams> = [
    {
        name: 'to be invisible',
        validation: 'to be invisible',
        element: {waitForDisplayed: mocks.waitForDisplayed},
        expectedWait: 'waitForDisplayed',
        reverse: true,
        timeout: 1,
        expectedTimeout: 1,
        timeoutMsg: 'Element is not invisible',
    },
    {
        name: 'not to be invisible',
        validation: 'not to be invisible',
        element: {waitForDisplayed: mocks.waitForDisplayed},
        expectedWait: 'waitForDisplayed',
        reverse: false,
        timeout: 1,
        expectedTimeout: 1,
        timeoutMsg: 'Element is invisible',
    }
]

const extraTests: Array<TestParams> = [
    {
        name: 'default timeout',
        validation: 'to be visible',
        element: {waitForDisplayed: mocks.waitForDisplayed},
        expectedWait: 'waitForDisplayed',
        reverse: false,
        timeout: undefined,
        expectedTimeout: 10000,
        timeoutMsg: 'Element is not visible',
    }
]

beforeEach(() => {
    mocks.waitForExist.mockReset();
    mocks.waitForClickable.mockReset();
    mocks.waitForDisplayed.mockReset();
});

test.each([...presentTests, ...clickableTests, ...visibleTests, ...invisibleTests, ...extraTests])('$name', async (
    {
        validation,
        element,
        expectedWait,
        reverse,
        timeout,
        expectedTimeout,
        timeoutMsg,
    }) => {
    const waitFn = getConditionWait(validation);
    await waitFn(element as Element<'async'>, timeout as number);
    expect(mocks[expectedWait]).toBeCalledTimes(1);
    expect(mocks[expectedWait]).toBeCalledWith({
        reverse,
        timeout: expectedTimeout,
        timeoutMsg
    });
});

test('should throw an error if validation is not implemented', async () => {
    expect(() => getConditionWait('to be cool')).toThrowError('to be cool wait is not implemented')
});

test('should use default reverse and timeout', async () => {
    await conditionWait(
        {waitForDisplayed: mocks.waitForDisplayed} as Element<'async'>,
        'visible'
    );
    expect(mocks.waitForDisplayed).toBeCalledTimes(1);
    expect(mocks.waitForDisplayed).toBeCalledWith({
        reverse: false,
        timeout: 10000,
        timeoutMsg: 'Element is not visible'
    });
});
