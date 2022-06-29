import { After, Before } from '@cucumber/cucumber';
import defaultTimeouts from './defaultTimeouts';
import { Browser, remote } from 'webdriverio';
import { po } from '@qavajs/po';

declare global {
    var browser: Browser<'async'>;
    var config: any;
}

Before(async function () {
    config.browser.timeout = {
        defaultTimeouts,
        ...config.browser.timeout
    }
    global.browser = await remote(config.browser);
    po.init(browser, { timeout: config.browser.timeout.present });
    po.register(config.pageObject);
});

After(async function () {
    await browser.deleteSession();
});
