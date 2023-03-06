import { After, AfterStep, Before, BeforeStep, Status } from '@cucumber/cucumber';
import defaultTimeouts from './defaultTimeouts';
import { Browser, remote } from 'webdriverio';
import { po } from '@qavajs/po';
import { ScreenshotEvent } from './screenshotEvent';

declare global {
    var browser: Browser;
    var driver: Browser;
    var config: any;
}

Before(async function () {
    const driverConfig = config.browser ?? config.driver;
    driverConfig.timeout = {
        ...defaultTimeouts,
        ...driverConfig.timeout
    }
    global.browser = await remote(driverConfig);
    global.driver = global.browser;
    this.log(`browser instance started:\n${JSON.stringify(driverConfig, null, 2)}`);
    if (driverConfig.timeout.implicit > 0) await global.browser.setTimeout({ 'implicit': driverConfig.timeout.implicit });
    po.init(browser, { timeout: driverConfig.timeout.present });
    po.register(config.pageObject);
});

BeforeStep(async function () {
    if (config.screenshot === ScreenshotEvent.BEFORE_STEP) {
        try {
            this.attach(await browser.takeScreenshot(), 'base64:image/png');
        } catch (err) {
            console.warn(err)
        }
    }
});

AfterStep(async function (step) {
    try {
        if (
            (config.screenshot === ScreenshotEvent.ON_FAIL && step.result.status === Status.FAILED) ||
            config.screenshot === ScreenshotEvent.AFTER_STEP
        ) {
            this.attach(await browser.takeScreenshot(), 'base64:image/png');
        }
    } catch (err) {
        console.warn(err)
    }
});

After(async function () {
    if (global.browser) {
        await browser.deleteSession();
        this.log('browser instance closed');
    }
});
