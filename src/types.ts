import { defineParameterType } from '@cucumber/cucumber';
import { aliasTransformer, conditionWaitTransformer, valueWaitTransformer, locatorTransformer } from './parameterTypeTransformer';

/**
 * Resolves into wdio element
 * @returns {Element<'async'>}
 */
defineParameterType({
    name: 'element',
    regexp: /'(.+)'/,
    transformer: aliasTransformer
});

/**
 * Resolves into function that return wdio element
 */
defineParameterType({
    name: 'locator',
    regexp: /'(.+)'/,
    transformer: locatorTransformer
});

/**
 * Resolves into function that perform element condition wait
 */
defineParameterType({
    name: 'conditionWait',
    regexp: /(.+)/,
    transformer: conditionWaitTransformer
});

/**
 * Resolves into function that perform element value wait
 */
defineParameterType({
    name: 'valueWait',
    regexp: /(.+)/,
    transformer: valueWaitTransformer
});
