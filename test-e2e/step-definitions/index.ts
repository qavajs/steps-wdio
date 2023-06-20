import { Then } from '@cucumber/cucumber';
import memory from '@qavajs/memory';
import { expect } from 'chai';
import { Browser } from 'webdriverio';

declare global {
    var browser: Browser;
    var driver: Browser;
    var config: any;
}

Then('I expect globals to be defined', function () {
    expect(browser).not.to.be.undefined;
    expect(driver).not.to.be.undefined;
});

Then('I expect {string} memory value to be equal {string}', async function(actual, expected) {
    const actualValue = await memory.getValue(actual);
    const expectedValue = await memory.getValue(expected);
    expect(expectedValue).to.eql(actualValue);
});

Then('I expect {string} memory value to be defined', async function(actual) {
    const actualValue = await memory.getValue(actual);
    expect(actualValue).not.to.be.undefined;
});
