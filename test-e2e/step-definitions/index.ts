import { expect } from 'chai';
import { type MemoryValue, Then } from '@qavajs/core';
import { QavajsWdioWorld } from '../../index';

Then('I expect {string} memory value to be equal {string}', async function(this: QavajsWdioWorld, actual: MemoryValue, expected: MemoryValue) {
    const actualValue = await this.getValue(actual);
    const expectedValue = await this.getValue(expected);
    expect(expectedValue).to.eql(actualValue);
});

Then('I expect {string} memory value to be defined', async function(this: QavajsWdioWorld, actual) {
    const actualValue = await this.getValue(actual);
    expect(actualValue).not.to.be.undefined;
});

Then('I expect viewport size to equal {string}', async function (this: QavajsWdioWorld, expectedSize) {
    const expectedValue = await this.getValue(expectedSize);
    const actualValue = await this.wdio.browser.getWindowSize();
    expect(actualValue).to.deep.equal(expectedValue, 'Viewport size do not match');
});

Then('I save {value} to memory as {value}', async function (this: QavajsWdioWorld, value: MemoryValue, key: MemoryValue) {
     key.set(await value.value());
});
