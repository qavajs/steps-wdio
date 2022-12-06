import { test, jest } from '@jest/globals';
import { po } from '@qavajs/po';
import memory from '@qavajs/memory';
import { getElement, getLocator } from '../src/transformers';

jest.mock('@qavajs/memory', () => ({
    getValue: jest.fn(alias => alias + '1')
}));
jest.mock('@qavajs/po', () => ({
    po: {
        getElement: jest.fn((alias: string) => memory.getValue(alias))
    }
}));

test('alias transformer should return page object', async () => {
    await getElement('alias');
    expect(po.getElement).toBeCalledWith('alias1');
    expect(memory.getValue).toBeCalledWith('alias');
});

test('locator transformer should function that return page object', async () => {
    await (await getLocator('locator'))();
    expect(po.getElement).toBeCalledWith('locator1');
    expect(memory.getValue).toBeCalledWith('locator');
})

