import { IQavajsWorld } from '@qavajs/core';
import type { Locator } from './pageObject';
import { Wdio } from './wdio';

export interface QavajsWdioWorld extends IQavajsWorld {
    config: any;
    log: (message: string) => void;
    wdio: Wdio;
    element(path: string): Locator;
}