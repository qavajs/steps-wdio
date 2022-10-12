import { Then, When } from '@cucumber/cucumber';
import memory from '@qavajs/memory';
import { Browser } from 'webdriverio';

declare global {
    var browser: Browser<'async'>;
    var driver: Browser<'async'>;
    var config: any;
}

Then('validate screenshot', function () {
    const screenshot = memory.getValue('$screenshot');
});
