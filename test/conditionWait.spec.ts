import { getConditionWait } from '../src/conditionWait';
import { conditionWait } from '../src/conditionWait';
import { beforeEach, test, vi, expect } from 'vitest';

interface MockElement {
    waitForExist?: Function,
    waitForClickable?: Function,
    waitForDisplayed?: Function,
    waitForEnabled?: Function,
    waitUntil?: Function,
    isDisplayedInViewport?: Function
}

type TestParams = {
    name: string,
    validation: string;
    element: MockElement,
    expectedWait: string,
    reverse: boolean,
    timeout: number | undefined,
    expectedTimeout: number,
    timeoutMsg?: string,
};

const mocks: any = {
    waitForExist: vi.fn(),
    waitForClickable: vi.fn(),
    waitForDisplayed: vi.fn(),
    waitForEnabled: vi.fn(),
    waitUntil: vi.fn()
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
    },
    {
        name: 'not to be present',
        validation: 'not to be present',
        element: {waitForExist: mocks.waitForExist},
        expectedWait: 'waitForExist',
        reverse: true,
        timeout: 1,
        expectedTimeout: 1,
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
    },
    {
        name: 'not to be clickable',
        validation: 'not to be clickable',
        element: {waitForClickable: mocks.waitForClickable},
        expectedWait: 'waitForClickable',
        reverse: true,
        timeout: 1,
        expectedTimeout: 1,
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
    },
    {
        name: 'not to be visible',
        validation: 'not to be visible',
        element: {waitForDisplayed: mocks.waitForDisplayed},
        expectedWait: 'waitForDisplayed',
        reverse: true,
        timeout: 1,
        expectedTimeout: 1,
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
    },
    {
        name: 'not to be invisible',
        validation: 'not to be invisible',
        element: {waitForDisplayed: mocks.waitForDisplayed},
        expectedWait: 'waitForDisplayed',
        reverse: false,
        timeout: 1,
        expectedTimeout: 1,
    }
]

const enabledTests: Array<TestParams> = [
    {
        name: 'to be enabled',
        validation: 'to be enabled',
        element: {waitForEnabled: mocks.waitForEnabled},
        expectedWait: 'waitForEnabled',
        reverse: false,
        timeout: 1,
        expectedTimeout: 1,
    },
    {
        name: 'not to be enabled',
        validation: 'not to be enabled',
        element: {waitForEnabled: mocks.waitForEnabled},
        expectedWait: 'waitForEnabled',
        reverse: true,
        timeout: 1,
        expectedTimeout: 1,
    }
];

const disabledTests: Array<TestParams> = [
    {
        name: 'to be disabled',
        validation: 'to be disabled',
        element: {waitForEnabled: mocks.waitForEnabled},
        expectedWait: 'waitForEnabled',
        reverse: true,
        timeout: 1,
        expectedTimeout: 1
    },
    {
        name: 'not to be disabled',
        validation: 'not to be disabled',
        element: {waitForEnabled: mocks.waitForEnabled},
        expectedWait: 'waitForEnabled',
        reverse: false,
        timeout: 1,
        expectedTimeout: 1,
    }
];

const extraTests: Array<TestParams> = [
    {
        name: 'default timeout',
        validation: 'to be visible',
        element: {waitForDisplayed: mocks.waitForDisplayed},
        expectedWait: 'waitForDisplayed',
        reverse: false,
        timeout: undefined,
        expectedTimeout: 10000,
    }
]

beforeEach(() => {
    mocks.waitForExist.mockReset();
    mocks.waitForClickable.mockReset();
    mocks.waitForDisplayed.mockReset();
    mocks.waitForEnabled.mockReset();
});

test.each([
    ...presentTests,
    ...clickableTests,
    ...visibleTests,
    ...invisibleTests,
    ...enabledTests,
    ...disabledTests,
    ...extraTests,
])('$name', async (
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
    await waitFn(element as WebdriverIO.Element, timeout as number);
    expect(mocks[expectedWait]).toBeCalledTimes(1);
    expect(mocks[expectedWait]).toBeCalledWith({
        reverse,
        timeout: expectedTimeout,
        timeoutMsg
    });
});

test('to be in viewport', async () => {
    const element = {
        waitForDisplayed: mocks.waitForDisplayed
    };
    const timeout = 1;
    const waitFn = getConditionWait('to be in viewport');
    await waitFn(element as WebdriverIO.Element, timeout as number);
    expect(mocks.waitForDisplayed).toBeCalledTimes(1);
    expect(mocks.waitForDisplayed).toBeCalledWith({
        reverse: false,
        timeout,
        withinViewport: true
    });
});

test('should throw an error if validation is not implemented', async () => {
    expect(() => getConditionWait('to be cool')).toThrowError('to be cool wait is not implemented')
});

test('should use default reverse and timeout', async () => {
    await conditionWait(
        {waitForDisplayed: mocks.waitForDisplayed} as WebdriverIO.Element,
        'visible'
    );
    expect(mocks.waitForDisplayed).toBeCalledTimes(1);
    expect(mocks.waitForDisplayed).toBeCalledWith({
        reverse: false,
        timeout: 10000,
    });
});
