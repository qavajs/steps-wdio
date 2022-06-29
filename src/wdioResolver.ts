import { po } from '@qavajs/po';

export async function wdio(alias: string) {
    return po.getElement(alias)
}
