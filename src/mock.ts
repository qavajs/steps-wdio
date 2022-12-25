import { When } from '@cucumber/cucumber';
import { getValue } from './transformers';
import memory from '@qavajs/memory';
import { Mock, ErrorCode } from 'webdriverio';

/**
 * Create simple mock instance
 * @param {string} urlTemplate - minimatch url template to mock
 * @param {string} memoryKey - memory key to store mock instance
 * @example When I create mock for '/yourservice/**' as 'mock1'
 * @example When I create mock for '$mockUrlTemplate' as 'mock1'
 */
When('I create mock for {string} as {string}', async function (urlTemplate: string, memoryKey: string) {
    const url = await getValue(urlTemplate);
    memory.setValue(memoryKey, await browser.mock(url));
});

async function respondWith(mockKey: string, statusCode: string, body: string) {
    const mock: Mock = await getValue(mockKey);
    const responseStatusCode: number = parseInt(await getValue(statusCode));
    const responseBody = await getValue(body);
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
 * When I create mock for '/yourservice/**' with filter options as 'myServiceMock'
 * And I set '$myServiceMock' mock to respond '200' with:
 * """
 * {
 *     "status": "success"
 * }
 * """
 */
When('I set {string} mock to respond {string} with:', respondWith);

/**
 * Add mocking rule to respond with desired status code and payload
 * @param {string} mockKey - memory key to get mock instance
 * @param {string} statusCode - status code
 * @param {string} body - response body
 * @example
 * When I create mock for '/yourservice/**' with filter options as 'myServiceMock'
 * And I set '$myServiceMock' mock to respond '200' with '$response'
 */
When('I set {string} mock to respond {string} with {string}', respondWith);

/**
 * Add mocking rule to abort request with certain reason
 * @param {string} mockKey - memory key to get mock instance
 * @param {string} reason - reason string see https://webdriver.io/docs/api/mock/abort
 * @example
 * When I create mock for '/yourservice/**' with filter options as 'myServiceMock'
 * And I set '$myServiceMock' mock to abort with 'Failed' reason
 */
When('I set {string} mock to abort with {string} reason', async function (mockKey: string, reason: string) {
    const mock: Mock = await getValue(mockKey);
    const errorCode: ErrorCode = await getValue(reason);
    mock.abort(errorCode);
});

/**
 * Restore mock
 * @param {string} mockKey - memory key to get mock instance
 * @example When I restore '$myServiceMock'
 */
When('I restore {string} mock', async function (mockKey: string) {
    const mock: Mock = await getValue(mockKey);
    mock.restore();
});

/**
 * Restore all mocks
 * @example When I restore all mocks
 */
When('I restore all mocks', async function () {
    await browser.mockRestoreAll();
});
