import { After, AfterStep, Before, BeforeStep, Status } from '@cucumber/cucumber';
import defaultTimeouts from './defaultTimeouts';
import { Browser, remote } from 'webdriverio';
import { po } from '@qavajs/po';
import { ScreenshotEvent } from './screenshotEvent';
import { equalOrIncludes } from './utils';

declare global {
    var browser: Browser;
    var driver: Browser;
    var config: any;
    var browsers: {
        [browserName: string]: Browser
    } | null;
}

Before(async function () {
    const driverConfig = config.browser ?? config.driver;
    driverConfig.timeout = {
        ...defaultTimeouts,
        ...driverConfig.timeout
    };
    global.config.driverConfig = driverConfig;
    global.browser = await remote(driverConfig) as Browser;
    global.driver = global.browser;
    this.log(`browser instance started:\n${JSON.stringify(driverConfig, null, 2)}`);
    if (driverConfig.timeout.implicit > 0) await global.browser.setTimeout({ 'implicit': driverConfig.timeout.implicit });
    po.init(browser, { timeout: driverConfig.timeout.element });
    po.register(config.pageObject);
});

BeforeStep(async function () {
    const isBeforeStepScreenshot = equalOrIncludes(config.screenshot, ScreenshotEvent.BEFORE_STEP);
    if (isBeforeStepScreenshot) {
        try {
            this.attach(await browser.takeScreenshot(), 'base64:image/png');
        } catch (err) {
            console.warn(err)
        }
    }
});

AfterStep(async function (step) {
    const isAfterStepScreenshot = equalOrIncludes(config.screenshot, ScreenshotEvent.AFTER_STEP);
    const isOnFailScreenshot = equalOrIncludes(config.screenshot, ScreenshotEvent.ON_FAIL);
    try {
        if (
            (isOnFailScreenshot && step.result.status === Status.FAILED) ||
            isAfterStepScreenshot
        ) {
            this.attach(await browser.takeScreenshot(), 'base64:image/png');
        }
    } catch (err) {
        console.warn(err)
    }
});

After(async function () {
    if (global.browsers) {
        for (const browserName in global.browsers) {
            await global.browsers[browserName].deleteSession();
            this.log(`${browserName} browser closed`);
        }
        global.browsers = null;
    } else if (global.browser) {
        await browser.deleteSession();
        this.log('browser instance closed');
    }
});
