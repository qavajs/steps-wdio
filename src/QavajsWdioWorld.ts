import { IQavajsWorld } from '@qavajs/core';
import type { Locator } from './pageObject';
import { Wdio } from './wdio';

/**
 * Extended Qavajs world interface for WebdriverIO step definitions.
 * Provides access to the WDIO driver, page-object element resolution, and step logging.
 *
 * @example
 * import { QavajsWdioWorld } from './QavajsWdioWorld';
 *
 * Then('I click {string}', async function(this: QavajsWdioWorld, alias) {
 *   const el = this.element(alias);
 *   await el().click();
 * });
 */
export interface QavajsWdioWorld extends IQavajsWorld {
    /** Qavajs configuration object (includes `pageObject` root class and other settings). */
    config: any;

    /**
     * Write a message to the step log.
     * @param message - Text to log for the current step.
     */
    log: (message: string) => void;

    /**
     * WDIO browser/driver wrapper. Use `wdio.driver` to access the WebdriverIO browser instance.
     * @example
     * const url = await this.wdio.driver.getUrl();
     */
    wdio: Wdio;

    /**
     * Resolve a page-object alias path to a {@link Locator}.
     * @param path - `>` delimited alias path, e.g. `'Button'` or `'BodyComponent > TextElement'`.
     * @returns {Locator} A callable that returns the WDIO element; call `.collection()` for multiple elements.
     * @example
     * await this.element('Button')().click();
     * await this.element('User(3)')().getText();
     * await this.element('SimpleTextListItems').collection();
     */
    element(path: string): Locator;
}