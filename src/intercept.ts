import { When } from '@cucumber/cucumber';
import { MemoryValue } from '@qavajs/core';

/**
 * Create interception for url or predicate function
 * @param {string | function} url - url or predicate function to listen
 * @param {string} key - memory key to save
 * @example I create interception for '**\/api/qavajs' as 'intercept'
 */
When('I create interception for {value} as {value}', async function (predicate: MemoryValue, key: MemoryValue) {
    const urlPattern = await predicate.value();
    const mock = await this.wdio.browser.mock(urlPattern);
    const interception = new Promise(resolve => {
        const interval = setInterval(async () => {
            if (mock.calls.length > 0) {
                const call = mock.calls.at(-1);
                clearInterval(interval);
                resolve(call);
            }
        }, 1000);
    })
    key.set(interception);
});

/**
 * Wait for interception response
 * @param {string} interception - key of saved interception promise
 * @example I wait for '$interception' response
 */
When('I wait for {value} response', async function (interception: MemoryValue) {
    const interceptionPromise = await interception.value();
    await interceptionPromise;
});

/**
 * Save interception response
 * @param {string} interception - key of saved interception promise
 * @example
 * When I save '$interception' response as 'response'
 * And I expect '$response.statusCode' to equal '200'
 */
When('I save {value} response as {value}', async function (interception: MemoryValue, key: MemoryValue) {
    const interceptionPromise = await interception.value();
    key.set(await interceptionPromise);
});
