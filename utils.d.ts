import { } from 'webdriverio';
export type Locator = () => Promise<WebdriverIO.Element | WebdriverIO.ElementArray>;
export function getElement(alias: string): Promise<WebdriverIO.Element | WebdriverIO.ElementArray>;
export function getValue(alias: string): any;
export function getLocator(alias: string): Locator;
export function getConditionWait(condition: string): Function;
export function getValueWait(condition: string): Function;


