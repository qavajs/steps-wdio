import { IQavajsWorld } from '@qavajs/core';
import type { Locator } from './pageObject';

export interface QavajsWdioWorld extends IQavajsWorld {
    wdio: {
        browser: WebdriverIO.Browser;
        driver: WebdriverIO.Browser;
    },
    element(path: string): Locator
}