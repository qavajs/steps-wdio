import { When } from '@cucumber/cucumber';
import memory from '@qavajs/memory';
import { MemoryValue } from '@qavajs/cli';

/**
 * Create interception for url or predicate function
 * @param {string | function} url - url or predicate function to listen
 * @param {string} key - memory key to save
 * @example I create interception for '**\/api/qavajs' as 'intercept'
 */
When('I create interception for {value} as {value}', async function (predicate: MemoryValue, key: MemoryValue) {
    const predicateValue = await predicate.value();
    const mock = await this.wdio.browser.mock(predicateValue);
    const interception = new Promise((resolve) => {
        // @ts-ignore
        mock.respond((response) => {
            resolve(response)
            return response.body
        })
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
