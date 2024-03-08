import { After, AfterStep, Before, BeforeStep, Status } from '@cucumber/cucumber';
import defaultTimeouts from './defaultTimeouts';
import { po } from '@qavajs/po';
import { ScreenshotEvent, SnapshotEvent } from './events';
import { equalOrIncludes, getEventValue } from './utils';
import getSnapshot from './client_script/snapshot';
const remotePromise = import('webdriverio').then(wdio => wdio.remote);

declare global {
    var browser: WebdriverIO.Browser;
    var driver: WebdriverIO.Browser;
    var config: any;
    var browsers: {
        [browserName: string]: WebdriverIO.Browser
    } | null;
}

Before({name: 'driver init'}, async function () {
    const remote = await remotePromise;
    const driverConfig = config.browser ?? config.driver;
    driverConfig.timeout = {
        ...defaultTimeouts,
        ...driverConfig.timeout
    };
    global.config.driverConfig = driverConfig;
    if ((!global.browser && driverConfig.reuseSession) || !driverConfig.reuseSession) {
        global.browser = await remote(driverConfig) as WebdriverIO.Browser;
        global.driver = global.browser;
    }
    this.log(`browser instance started:\n${JSON.stringify(driverConfig, null, 2)}`);
    if (driverConfig.timeout.implicit > 0) await global.browser.setTimeout({ 'implicit': driverConfig.timeout.implicit });
    po.init(browser, { timeout: driverConfig.timeout.element, logger: this });
    po.register(config.pageObject);
});

BeforeStep(async function () {
    const screenshotEvent = getEventValue(config?.driverConfig?.screenshot);
    const isBeforeStepScreenshot = equalOrIncludes(screenshotEvent, ScreenshotEvent.BEFORE_STEP);
    if (isBeforeStepScreenshot) {
        try {
            this.attach(await browser.takeScreenshot(), 'base64:image/png');
        } catch (err) {
            console.warn(err)
        }
    }
    const snapshotEvent = getEventValue(config?.driverConfig?.snapshot);
    const isBeforeStepSnapshot = equalOrIncludes(snapshotEvent, SnapshotEvent.BEFORE_STEP);
    if (isBeforeStepSnapshot) {
        try {
            this.attach(Buffer.from(await browser.executeAsync(getSnapshot)).toString('base64'), 'text/html');
        } catch (err) {
            console.warn(err)
        }
    }
});

AfterStep(async function (step) {
    const screenshotEvent = getEventValue(config?.driverConfig?.screenshot);
    const isAfterStepScreenshot = equalOrIncludes(screenshotEvent, ScreenshotEvent.AFTER_STEP);
    const isOnFailScreenshot = equalOrIncludes(screenshotEvent, ScreenshotEvent.ON_FAIL)
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

    const snapshotEvent = getEventValue(config?.driverConfig?.snapshot);
    const isAfterStepSnapshot = equalOrIncludes(snapshotEvent, SnapshotEvent.AFTER_STEP);
    const isOnFailSnapshot = equalOrIncludes(snapshotEvent, SnapshotEvent.ON_FAIL);
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
