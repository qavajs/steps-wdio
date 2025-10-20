import { type MemoryValue, When } from '@qavajs/core';
import { QavajsWdioWorld } from './QavajsWdioWorld';
type ErrorReason = ('Failed' | 'Aborted' | 'TimedOut' | 'AccessDenied' | 'ConnectionClosed' | 'ConnectionReset' | 'ConnectionRefused' | 'ConnectionAborted' | 'ConnectionFailed' | 'NameNotResolved' | 'InternetDisconnected' | 'AddressUnreachable' | 'BlockedByClient' | 'BlockedByResponse');

/**
 * Create simple mock instance
 * @param {string} urlTemplate - minimatch url template to mock
 * @param {string} memoryKey - memory key to store mock instance
 * @example When I create mock for '/yourservice/**' as 'mock1'
 * @example When I create mock for '$mockUrlTemplate' as 'mock1'
 */
When('I create mock for {value} as {value}', async function (this: QavajsWdioWorld, urlTemplate: MemoryValue, memoryKey: MemoryValue) {
    const url = await urlTemplate.value();
    memoryKey.set(await this.wdio.browser.mock(url));
});

async function respondWith(this: QavajsWdioWorld, mockKey: MemoryValue, statusCode: MemoryValue, body: MemoryValue | string) {
    const mock = await mockKey.value() as WebdriverIO.Mock;
    const responseStatusCode: number = parseInt(await statusCode.value());
    const responseBody = typeof body === 'string' ? await this.getValue(body) : await body.value();
    mock.respond(responseBody, {
        statusCode: responseStatusCode
    });
}

/**
 * Add mocking rule to respond with desired status code and payload
 * @param {string} mockKey - memory key to get mock instance
 * @param {string} statusCode - status code
 * @param {string} body - response body
 * @example
 * When I create mock for '/yourservice/**' as 'myServiceMock'
 * And I set '$myServiceMock' mock to respond '200' with:
 * """
 * {
 *     "status": "success"
 * }
 * """
 */
When('I set {value} mock to respond {value} with:', respondWith);

/**
 * Add mocking rule to respond with desired status code and payload
 * @param {string} mockKey - memory key to get mock instance
 * @param {string} statusCode - status code
 * @param {string} body - response body
 * @example
 * When I create mock for '/yourservice/**' as 'myServiceMock'
 * And I set '$myServiceMock' mock to respond '200' with '$response'
 */
When('I set {value} mock to respond {value} with {value}', respondWith);

/**
 * Add mocking rule to abort request with certain reason
 * @param {string} mockKey - memory key to get mock instance
 * @param {string} reason - reason string see https://webdriver.io/docs/api/mock/abort
 * @example
 * When I create mock for '/yourservice/**' as 'myServiceMock'
 * And I set '$myServiceMock' mock to abort with 'Failed' reason
 */
When('I set {value} mock to abort with {value} reason', async function (this: QavajsWdioWorld, mockKey: MemoryValue, reason: MemoryValue) {
    const mock = await mockKey.value();
    const errorCode: ErrorReason = await reason.value();
    mock.abort(errorCode);
});

/**
 * Restore mock
 * @param {string} mockKey - memory key to get mock instance
 * @example When I restore '$myServiceMock'
 */
When('I restore {value} mock', async function (this: QavajsWdioWorld, mockKey: MemoryValue) {
    const mock = await mockKey.value();
    await mock.restore();
});

/**
 * Restore all mocks
 * @example When I restore all mocks
 */
When('I restore all mocks', async function (this: QavajsWdioWorld) {
    await this.wdio.browser.mockRestoreAll();
});
