import { test, vi, expect } from 'vitest';
import { po } from '@qavajs/po';
import memory from '@qavajs/memory';
import { getElement, getLocator } from '../src/transformers';

vi.mock('@qavajs/memory', () => ({
    default: {
        getValue: vi.fn(alias => alias + '1')
    }
}));
vi.mock('@qavajs/po', () => ({
    po: {
        getElement: vi.fn((alias: string) => memory.getValue(alias))
    }
}));

test('alias transformer should return page object', async () => {
    await getElement('alias');
    expect(po.getElement).toBeCalledWith('alias1', undefined);
    expect(memory.getValue).toBeCalledWith('alias');
});

test('locator transformer should function that return page object', async () => {
    await (await getLocator('locator'))();
    expect(po.getElement).toBeCalledWith('locator1');
    expect(memory.getValue).toBeCalledWith('locator');
})

