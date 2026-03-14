import getAriaSnapshot from './client_script/getAriaSnapshot';

export class Wdio {
    browser: WebdriverIO.Browser;
    driver: WebdriverIO.Browser;

    constructor(browser: WebdriverIO.Browser) {
        this.browser = browser;
        this.driver = browser;
    }

    async getElementTree() {
        let tree = `Page URL: ${await this.browser.getUrl()}\n`;
        const snapshot = await this.browser.execute(getAriaSnapshot, 'body');
        tree += `${snapshot}\n`;
        return tree;
    }
}