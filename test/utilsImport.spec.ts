import { getValue, getValueWait, getConditionWait, getLocator, getElement } from '../utils.js'
import { test, expect } from '@jest/globals';
test.each([
    getValue,
    getValueWait,
    getConditionWait,
    getLocator,
    getElement
])('util function', (fn) => {
    expect(fn).toBeInstanceOf(Function);
});
