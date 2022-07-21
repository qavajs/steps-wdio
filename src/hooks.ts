import { After, Before } from '@cucumber/cucumber';
import defaultTimeouts from './defaultTimeouts';
import { Browser, remote } from 'webdriverio';
import { po } from '@qavajs/po';

declare global {
    var browser: Browser<'async'>;
    var driver: Browser<'async'>;
    var config: any;
}

Before(async function () {
    config.browser = config.browser ?? config.driver;
    config.browser.timeout = {
        defaultTimeouts,
        ...config.browser.timeout
    }
    global.browser = await remote(config.browser);
    global.driver = global.browser;
    po.init(browser, { timeout: config.browser.timeout.present });
    po.register(config.pageObject);
});

After(async function () {
    await browser.deleteSession();
});
