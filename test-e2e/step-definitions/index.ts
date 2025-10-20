import { expect } from '@qavajs/validation';
import { type MemoryValue, Then } from '@qavajs/core';
import { QavajsWdioWorld } from '../../index';

Then('I expect {string} memory value to be equal {string}', async function(this: QavajsWdioWorld, actual: MemoryValue, expected: MemoryValue) {
    const actualValue = await this.getValue(actual);
    const expectedValue = await this.getValue(expected);
    expect(expectedValue).toDeepEqual(actualValue);
});

Then('I expect {string} memory value to be defined', async function(this: QavajsWdioWorld, actual) {
    const actualValue = await this.getValue(actual);
    expect(actualValue).not.toBeUndefined();
});

Then('I expect viewport size to equal {string}', async function (this: QavajsWdioWorld, expectedSize) {
    const expectedValue = await this.getValue(expectedSize);
    const actualValue = await this.wdio.browser.getWindowSize();
    expect(actualValue).toDeepEqual(expectedValue);
});

Then('I save {value} to memory as {value}', async function (this: QavajsWdioWorld, value: MemoryValue, key: MemoryValue) {
     key.set(await value.value());
});
