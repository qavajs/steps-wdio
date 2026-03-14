import { IQavajsWorld } from '@qavajs/core';
import type { Locator } from './pageObject';
import { Wdio } from './wdio';

export interface QavajsWdioWorld extends IQavajsWorld {
    wdio: Wdio;
    element(path: string): Locator;
}