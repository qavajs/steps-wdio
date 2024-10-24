import { Then } from '@cucumber/cucumber';
import memory from '@qavajs/memory';
import { expect } from 'chai';

Then('I expect {string} memory value to be equal {string}', async function(actual, expected) {
    const actualValue = await memory.getValue(actual);
    const expectedValue = await memory.getValue(expected);
    expect(expectedValue).to.eql(actualValue);
});

Then('I expect {string} memory value to be defined', async function(actual) {
    const actualValue = await memory.getValue(actual);
    expect(actualValue).not.to.be.undefined;
});

Then('I expect viewport size to equal {string}', async function (expectedSize) {
    const expectedValue = await memory.getValue(expectedSize);
    const actualValue = await this.wdio.browser.getWindowSize();
    expect(actualValue).to.deep.equal(expectedValue, 'Viewport size do not match');
})
