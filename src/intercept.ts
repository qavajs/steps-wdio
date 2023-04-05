import { When } from '@cucumber/cucumber';
import { getValue } from './transformers';
import memory from '@qavajs/memory';

/**
 * Create interception for url or predicate function
 * @param {string | function} url - url or predicate function to listen
 * @param {string} key - memory key to save
 * @example I create interception for '**\/api/qavajs' as 'intercept'
 */
When('I create interception for {string} as {string}', async function (predicate: string, key: string) {
    const predicateValue = await getValue(predicate);
    const mock = await browser.mock(predicateValue);
    const interception = new Promise((resolve) => {
        mock.respond((response) => {
            resolve(response)
            return response.body
        })
    })
    memory.setValue(key, interception);
});

/**
 * Wait for interception response
 * @param {string} interception - key of saved interception promise
 * @example I wait for '$interception' response
 */
When('I wait for {string} response', async function (interception: string) {
    const interceptionPromise = await getValue(interception);
    await interceptionPromise;
});

/**
 * Save interception response
 * @param {string} interception - key of saved interception promise
 * @example
 * When I save '$interception' response as 'response'
 * And I expect '$response.statusCode' to equal '200'
 */
When('I save {string} response as {string}', async function (interception: string, key: string) {
    const interceptionPromise = await getValue(interception);
    memory.setValue(key, await interceptionPromise);
});
