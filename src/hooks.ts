import { After, AfterStep, Before, BeforeStep, Status } from '@cucumber/cucumber';
import defaultTimeouts from './defaultTimeouts';
import { ScreenshotEvent, SnapshotEvent } from './events';
import { equalOrIncludes, getEventValue } from './utils';
import getSnapshot from './client_script/snapshot';
import { element } from './pageObject';
const remotePromise = import('webdriverio').then(wdio => wdio.remote);

Before({name: 'Init wdio driver'}, async function () {
    const remote = await remotePromise;
    const driverConfig = this.config.browser ?? this.config.driver;
    driverConfig.timeout = {
        ...defaultTimeouts,
        ...driverConfig.timeout
    };
    this.config.driverConfig = driverConfig;
    this.wdio = {};
    if ((!this.browser && driverConfig.reuseSession) || !driverConfig.reuseSession) {
        this.wdio.browser = this.wdio.driver = await remote(driverConfig);
    }
    this.log(`browser instance started:\n${JSON.stringify(driverConfig, null, 2)}`);
    if (driverConfig.timeout.implicit > 0) await this.wdio.browser.setTimeout({ 'implicit': driverConfig.timeout.implicit });
    this.element = element;
});

BeforeStep(async function () {
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
            this.attach(Buffer.from(await this.wdio.browser.executeAsync(getSnapshot)).toString('base64'), 'text/html');
        } catch (err) {
            console.warn(err)
        }
    }
});

AfterStep(async function (step) {
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
            this.attach(Buffer.from(await this.wdio.browser.executeAsync(getSnapshot)).toString('base64'), 'text/html');
        }
    } catch (err) {
        console.warn(err)
    }
});

After({name: 'Shutdown wdio driver'}, async function () {
    if (this.wdio.browser && !this.config.driverConfig.reuseSession) {
        await this.wdio.browser.deleteSession();
        this.log('browser instance closed');
    }
});
