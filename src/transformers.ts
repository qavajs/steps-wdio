import { conditionWait, conditionWaitExtractRegexp } from './conditionWait';
import { valueWait, valueWaitExtractRegexp } from './valueWait';
import { po } from '@qavajs/po';
import memory from '@qavajs/memory';
import { Element, ElementArray } from 'webdriverio';
export type Locator = () => Promise<Element | ElementArray>;

export function getValue(alias: string): any {
    return memory.getValue(alias)
}

export async function getElement(alias: string, options?: { immediate: boolean }): Promise<Element | ElementArray> {
    return po.getElement(await memory.getValue(alias), options)
}

export function getLocator(alias: string): Locator {
    return async () => po.getElement(await memory.getValue(alias))
}

export function getConditionWait(condition: string): Function {
    const match = condition.match(conditionWaitExtractRegexp) as RegExpMatchArray;
    if (!match) throw new Error(`${condition} wait is not implemented`);
    const [ _, reverse, validation ] = match;
    return async function (element: Element, timeout: number) {
        await conditionWait(element, validation, timeout, Boolean(reverse))
    }
}

export function getValueWait(condition: string): Function {
    const match = condition.match(valueWaitExtractRegexp) as RegExpMatchArray;
    if (!match) throw new Error(`${condition} wait is not implemented`);
    const [ _, reverse, validation ] = match;
    return async function (valueFn: Function, expected: any, timeout: number) {
        await valueWait(valueFn, expected, validation, timeout, Boolean(reverse))
    }
}
