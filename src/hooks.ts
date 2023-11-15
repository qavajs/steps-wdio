import { After, AfterStep, Before, BeforeStep, Status } from '@cucumber/cucumber';
import defaultTimeouts from './defaultTimeouts';
import { Browser, remote } from 'webdriverio';
import { po } from '@qavajs/po';
import { ScreenshotEvent, SnapshotEvent } from './events';
import { equalOrIncludes } from './utils';
import getSnapshot from './client_script/snapshot';

declare global {
    var browser: Browser;
    var driver: Browser;
    var config: any;
    var browsers: {
        [browserName: string]: Browser
    } | null;
}

Before({name: 'driver init'}, async function () {
    const driverConfig = config.browser ?? config.driver;
    driverConfig.timeout = {
        ...defaultTimeouts,
        ...driverConfig.timeout
    };
    global.config.driverConfig = driverConfig;
    if ((!global.browser && driverConfig.reuseSession) || !driverConfig.reuseSession) {
        global.browser = await remote(driverConfig) as Browser;
        global.driver = global.browser;
    }
    this.log(`browser instance started:\n${JSON.stringify(driverConfig, null, 2)}`);
    if (driverConfig.timeout.implicit > 0) await global.browser.setTimeout({ 'implicit': driverConfig.timeout.implicit });
    po.init(browser, { timeout: driverConfig.timeout.element, logger: this });
    po.register(config.pageObject);
});

BeforeStep(async function () {
    const isBeforeStepScreenshot = equalOrIncludes(config.driverConfig.screenshot ?? config.screenshot, ScreenshotEvent.BEFORE_STEP);
    if (isBeforeStepScreenshot) {
        try {
            this.attach(await browser.takeScreenshot(), 'base64:image/png');
        } catch (err) {
            console.warn(err)
        }
    }
    const isBeforeStepSnapshot = equalOrIncludes(config.driverConfig.snapshot, SnapshotEvent.BEFORE_STEP);
    if (isBeforeStepSnapshot) {
        try {
            this.attach(Buffer.from(await browser.executeAsync(getSnapshot)).toString('base64'), 'text/html');
        } catch (err) {
            console.warn(err)
        }
    }
});

AfterStep(async function (step) {
    const isAfterStepScreenshot = equalOrIncludes(config.driverConfig.screenshot ?? config.screenshot, ScreenshotEvent.AFTER_STEP);
    const isOnFailScreenshot = equalOrIncludes(config.driverConfig.screenshot ?? config.screenshot, ScreenshotEvent.ON_FAIL)
    try {
        if (
            (isOnFailScreenshot && step.result?.status === Status.FAILED) ||
            isAfterStepScreenshot
        ) {
            this.attach(await browser.takeScreenshot(), 'base64:image/png');
        }
    } catch (err) {
        console.warn(err)
    }

    const isAfterStepSnapshot = equalOrIncludes(config.driverConfig.snapshot, SnapshotEvent.AFTER_STEP);
    const isOnFailSnapshot = equalOrIncludes(config.driverConfig.snapshot, SnapshotEvent.ON_FAIL);
    try {
        if (
            (isOnFailSnapshot && step.result?.status === Status.FAILED) ||
            isAfterStepSnapshot
        ) {
            this.attach(Buffer.from(await browser.executeAsync(getSnapshot)).toString('base64'), 'text/html');
        }
    } catch (err) {
        console.warn(err)
    }
});

After({name: 'driver teardown'}, async function () {
    if (global.browsers) {
        for (const browserName in global.browsers) {
            await global.browsers[browserName].deleteSession();
            this.log(`${browserName} browser closed`);
        }
        global.browsers = null;
    } else if (global.browser && !global.config.driverConfig.reuseSession) {
        await browser.deleteSession();
        this.log('browser instance closed');
    }
});
