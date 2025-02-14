import { When } from '@cucumber/cucumber';
import type { MemoryValue } from '@qavajs/core';

/**
 * Set cookie
 * @param {string} cookie - cookie name
 * @param {string} value - value to set
 * @example I set 'userID' cookie 'user1'
 * @example I set 'userID' cookie '$userIdCookie'
 */
When('I set {value} cookie as {value}', async function (cookie: MemoryValue, value: MemoryValue) {
    const cookieValue = await value.value();
    const cookieObject = typeof cookieValue === 'object' ? cookieValue : { value: cookieValue };
    await this.wdio.browser.setCookies([{ name: await cookie.value(), ...cookieObject }]);
});

/**
 * Save cookie value to memory
 * @param {string} cookie - cookie name
 * @param {string} key - memory key
 * @example I save value of 'auth' cookie as 'authCookie'
 */
When('I save value of {value} cookie as {value}', async function (cookie: MemoryValue, key: MemoryValue) {
    const cookies = await this.wdio.browser.getCookies([await cookie.value()]);
    key.set(cookies.pop());
});
