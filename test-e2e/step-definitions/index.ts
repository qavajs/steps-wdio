import { expect } from 'chai';
import { type MemoryValue, Then } from '@qavajs/core';

Then('I expect {string} memory value to be equal {string}', async function(actual, expected) {
    const actualValue = await this.memory.getValue(actual);
    const expectedValue = await this.memory.getValue(expected);
    expect(expectedValue).to.eql(actualValue);
});

Then('I expect {string} memory value to be defined', async function(actual) {
    const actualValue = await this.memory.getValue(actual);
    expect(actualValue).not.to.be.undefined;
});

Then('I expect viewport size to equal {string}', async function (expectedSize) {
    const expectedValue = await this.memory.getValue(expectedSize);
    const actualValue = await this.wdio.browser.getWindowSize();
    expect(actualValue).to.deep.equal(expectedValue, 'Viewport size do not match');
});

Then('I save {value} to memory as {value}', async function (value: MemoryValue, key: MemoryValue) {
     key.set(await value.value());
});
