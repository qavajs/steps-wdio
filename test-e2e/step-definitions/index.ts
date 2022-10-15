import { Then, When } from '@cucumber/cucumber';
import memory from '@qavajs/memory';
import { Browser } from 'webdriverio';
import { expect } from 'chai';

declare global {
    var browser: Browser<'async'>;
    var driver: Browser<'async'>;
    var config: any;
}

Then('I expect {string} memory value to be equal {string}', async function(actual, expected) {
    const actualValue = memory.getValue(actual);
    const expectedValue = memory.getValue(expected);
    expect(expectedValue).to.eql(actualValue);
});
