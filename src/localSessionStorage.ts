import { When } from '@cucumber/cucumber';
import {MemoryValue} from "@qavajs/cli";

/**
 * Set value of local/session storage
 * @param {string} storageKey - local/session storage key to set value
 * @param {string} storageType - storage type (local or session)
 * @param {string} value - value to set
 * @example I set 'username' local storage value as 'user1'
 * @example I set '$sessionStorageKey' session storage value as '$sessionStorageValue'
 */
When('I set {value} {word} storage value as {value}', async function (storageKey: MemoryValue, storageType: string, value: MemoryValue) {
    await this.wdio.browser.execute(function (storageKey: string, storageType: string, value: any) {
        const storage = storageType + 'Storage' as 'localStorage' | 'sessionStorage';
        window[storage].setItem(storageKey, value);
    }, await storageKey.value(), storageType, await value.value());
});

/**
 * Save value of local/session storage to memory
 * @param {string} storageKey - local/session storage key to set value
 * @param {string} storageType - storage type (local or session)
 * @param {string} key - memory key
 * @example I save value of 'username' local storage as 'localStorageValue'
 * @example I save value of '$sessionStorageKey' session storage value as 'sessionStorageValue'
 */
When('I save value of {value} {word} storage as {value}', async function (storageKey: MemoryValue, storageType: string, key: MemoryValue) {
    const value = await this.wdio.browser.execute(function (storageKey: string, storageType: string) {
        const storage = storageType + 'Storage' as 'localStorage' | 'sessionStorage';
        return window[storage].getItem(storageKey);
    }, await storageKey.value(), storageType);
    key.set(value);
});
