import { After, AfterAll, AfterStep, Before, BeforeStep, Status } from '@qavajs/core';
import defaultTimeouts from './defaultTimeouts';
import { equalOrIncludes, getEventValue, ScreenshotEvent, SnapshotEvent } from './utils';
import getSnapshot from './client_script/snapshot';
import { element } from './pageObject';
import { QavajsWdioWorld } from './QavajsWdioWorld';
import { remote } from 'webdriverio';

class DriverHolder {
    driver!: WebdriverIO.Browser;
    reuseSession = false;
}

const driverHolder = new DriverHolder();

Before({name: 'Init wdio driver'}, async function (this: QavajsWdioWorld) {
    const driverConfig = this.config.browser ?? this.config.driver;
    driverConfig.timeout = {
        ...defaultTimeouts,
        ...driverConfig.timeout
    };
    this.config.driverConfig = driverConfig;
    driverHolder.reuseSession = driverConfig.reuseSession;
    if ((!driverHolder.driver && driverConfig.reuseSession) || !driverConfig.reuseSession) {
        driverHolder.driver = await remote(driverConfig);
        this.log(`browser instance started:\n${JSON.stringify(driverConfig, null, 2)}`);
    }
    this.wdio = {} as any;
    this.wdio.browser = this.wdio.driver = driverHolder.driver;
    if (driverConfig.timeout.implicit > 0) await this.wdio.browser.setTimeout({ 'implicit': driverConfig.timeout.implicit });
    this.element = element;
});

BeforeStep(async function (this: QavajsWdioWorld) {
    const screenshotEvent = getEventValue(this.config.driverConfig.screenshot);
    const isBeforeStepScreenshot = equalOrIncludes(screenshotEvent, ScreenshotEvent.BEFORE_STEP);
    if (isBeforeStepScreenshot) {
        try {
            this.attach(await this.wdio.browser.takeScreenshot(), 'base64:image/png');
        } catch (err) {
            console.warn(err)
        }
    }
    const snapshotEvent = getEventValue(this.config.driverConfig.snapshot);
    const isBeforeStepSnapshot = equalOrIncludes(snapshotEvent, SnapshotEvent.BEFORE_STEP);
    if (isBeforeStepSnapshot) {
        try {
            this.attach(Buffer.from(await this.wdio.browser.execute(getSnapshot)).toString('base64'), 'text/html');
        } catch (err) {
            console.warn(err)
        }
    }
});

AfterStep(async function (this: QavajsWdioWorld, step) {
    const screenshotEvent = getEventValue(this.config.driverConfig.screenshot);
    const isAfterStepScreenshot = equalOrIncludes(screenshotEvent, ScreenshotEvent.AFTER_STEP);
    const isOnFailScreenshot = equalOrIncludes(screenshotEvent, ScreenshotEvent.ON_FAIL)
    try {
        if (
            (isOnFailScreenshot && step.result?.status === Status.FAILED) ||
            isAfterStepScreenshot
        ) {
            this.attach(await this.wdio.browser.takeScreenshot(), 'base64:image/png');
        }
    } catch (err) {
        console.warn(err)
    }

    const snapshotEvent = getEventValue(this.config.driverConfig.snapshot);
    const isAfterStepSnapshot = equalOrIncludes(snapshotEvent, SnapshotEvent.AFTER_STEP);
    const isOnFailSnapshot = equalOrIncludes(snapshotEvent, SnapshotEvent.ON_FAIL);
    try {
        if (
            (isOnFailSnapshot && step.result?.status === Status.FAILED) ||
            isAfterStepSnapshot
        ) {
            this.attach(Buffer.from(await this.wdio.browser.execute(getSnapshot)).toString('base64'), 'text/html');
        }
    } catch (err) {
        console.warn(err)
    }
});

After({name: 'Shutdown wdio driver'}, async function (this: QavajsWdioWorld) {
    if (this.wdio.browser && !this.config.driverConfig.reuseSession) {
        await this.wdio.browser.deleteSession();
        this.log('browser instance closed');
    }
});

AfterAll(async function () {
    if (driverHolder.reuseSession) {
        try {
            await driverHolder.driver.deleteSession();
        } catch (err) {
            console.error(err);
        }
    }
});
