import { conditionWait, conditionWaitExtractRegexp } from './conditionWait';
import { valueWait, valueWaitExtractRegexp } from './valueWait';
import { po } from '@qavajs/po';
import memory from '@qavajs/memory';
import { Element, ElementArray } from 'webdriverio';

export type Locator = () => Promise<Element<'async'> | ElementArray>;

export async function aliasTransformer(alias: string): Promise<Element<'async'> | ElementArray> {
    return po.getElement(await memory.getValue(alias))
}

export function locatorTransformer(alias: string): Locator {
    return async () => po.getElement(await memory.getValue(alias))
}

export function conditionWaitTransformer(condition: string) {
    const match = condition.match(conditionWaitExtractRegexp) as RegExpMatchArray;
    if (!match) throw new Error(`${condition} wait is not implemented`);
    const [ _, reverse, validation ] = match;
    return async function (element: Element<'async'>, timeout: number) {
        await conditionWait(element, validation, timeout, Boolean(reverse))
    }
}

export function valueWaitTransformer(condition: string) {
    const match = condition.match(valueWaitExtractRegexp) as RegExpMatchArray;
    if (!match) throw new Error(`${condition} wait is not implemented`);
    const [ _, reverse, validation ] = match;
    return async function (valueFn: Function, expected: any, timeout: number) {
        await valueWait(valueFn, expected, validation, timeout, Boolean(reverse))
    }
}
