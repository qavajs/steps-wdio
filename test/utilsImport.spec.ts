import { getValue, getConditionWait, getLocator, getElement } from '../utils.js'
import { test, expect } from 'vitest';
test.each([
    getValue,
    getConditionWait,
    getLocator,
    getElement
])('util function', (fn) => {
    expect(fn).toBeInstanceOf(Function);
});
