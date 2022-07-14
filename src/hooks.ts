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
    const driverConfig = config.browser ?? config.driver;
    driverConfig.timeout = {
        defaultTimeouts,
        ...driverConfig.timeout
    }
    global.browser = await remote(driverConfig);
    global.driver = global.browser;
    po.init(browser, { timeout: driverConfig.timeout.present });
    po.register(config.pageObject);
});

After(async function () {
    await browser.deleteSession();
});
