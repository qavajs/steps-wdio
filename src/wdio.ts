import getAriaSnapshot from './client_script/getAriaSnapshot';

export class Wdio {
    browser: WebdriverIO.Browser;
    driver: WebdriverIO.Browser;
    /** Frame browsing context that BiDi commands currently target (undefined means top-level window) */
    frame?: WebdriverIO.BrowsingContext;

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

    /**
     * Switch to frame. In BiDi sessions `switchFrame` is not available since wdio v10,
     * so frame browsing context is resolved and set as target of browser commands
     * @param {ChainablePromiseElement | null} frame - frame element or null to switch to top-level window
     */
    async switchFrame(frame: WebdriverIO.Element | ChainablePromiseElement | null) {
        if (!this.browser.isBidi) {
            return this.browser.switchFrame(frame);
        }
        // getContextManager is exported only from ESM build of webdriverio
        const { getContextManager } = await import('webdriverio');
        const contextManager = getContextManager(this.browser);
        const windowHandle = await this.browser.getWindowHandle();
        if (frame === null) {
            this.frame = undefined;
            return contextManager.setCurrentContext(windowHandle);
        }
        const current = this.frame ?? (await this.browser.browsingContexts())
            .find(context => context.contextId === windowHandle);
        if (!current) throw new Error(`Browsing context of window '${windowHandle}' is not found`);
        this.frame = await current.frame(frame);
        contextManager.setCurrentContext(this.frame.contextId);
    }

    /**
     * Switch to window by handle
     * @param {string} handle - window handle
     */
    async switchToWindow(handle: string) {
        this.frame = undefined;
        await this.browser.switchToWindow(handle);
    }

    /**
     * Switch to window which url or title includes matcher (works in both Classic and BiDi sessions)
     * @param {string} matcher - url or title substring
     * @returns {boolean} true if window is found
     */
    async switchWindow(matcher: string): Promise<boolean> {
        for (const handle of await this.browser.getWindowHandles()) {
            await this.switchToWindow(handle);
            if ((await this.browser.getUrl()).includes(matcher) || (await this.browser.getTitle()).includes(matcher)) {
                return true;
            }
        }
        return false;
    }
}

type ChainablePromiseElement = ReturnType<WebdriverIO.Browser['$']>;
