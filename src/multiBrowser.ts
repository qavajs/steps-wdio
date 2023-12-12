import { When } from '@cucumber/cucumber';
const remotePromise = import('webdriverio').then(wdio => wdio.remote);

/**
 * Open new browser
 * @param {string} browserName - browser name
 * @example
 * When I open new browser as 'browser2'
 */
When('I open new browser as {string}', async function (browserName: string) {
    const remote = await remotePromise;
    if (!global.browsers) {
        global.browsers = {};
        global.browsers.default = global.browser;
    }
    global.browsers[browserName] = await remote(config?.driverConfig) as WebdriverIO.Browser;
});

/**
 * Switch to browser
 * @param {string} browserName - browser name
 * @example
 * When I open new browser as 'browser2'
 * And I switch to 'browser2' browser
 * And I switch to 'default' browser
 */
When('I switch to {string} browser', async function (browserName: string) {
    if (!global.browsers) throw new Error('No other browser launched');
    const targetBrowser = global.browsers[browserName];
    if (!targetBrowser) throw new Error(`'${browserName}' browser is not defined`);
    global.browser = targetBrowser;
});

/**
 * Close to browser
 * @param {string} browserName - browser name
 * @example
 * When I close to 'browser2' browser
 */
When('I close {string} browser', async function (browserName: string) {
    if (!global.browsers) throw new Error('No other browser launched');
    await global.browsers[browserName].deleteSession();
    global.browser = global.browsers.default;
    delete global.browsers[browserName];
});


