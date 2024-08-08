import { conditionWait, conditionWaitExtractRegexp } from './conditionWait';
import { po } from '@qavajs/po';
import memory from '@qavajs/memory';
export type Locator = () => Promise<WebdriverIO.Element & WebdriverIO.ElementArray>;

export function getValue(alias: string): any {
    return memory.getValue(alias)
}

export async function getElement(alias: string, options?: { immediate: boolean }): Promise<WebdriverIO.Element & WebdriverIO.ElementArray> {
    return po.getElement(await memory.getValue(alias), options)
}

export function getLocator(alias: string): Locator {
    return async () => po.getElement(await memory.getValue(alias))
}

export function getConditionWait(condition: string): Function {
    const match = condition.match(conditionWaitExtractRegexp) as RegExpMatchArray;
    if (!match) throw new Error(`${condition} wait is not implemented`);
    const [ _, reverse, validation ] = match;
    return async function (element: WebdriverIO.Element, timeout: number) {
        await conditionWait(element, validation, timeout, Boolean(reverse));
    }
}
