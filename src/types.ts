import { defineParameterType } from '@cucumber/cucumber';
import { aliasTransformer, conditionWaitTransformer, valueWaitTransformer, locatorTransformer } from './parameterTypeTransformer';
import { conditionWaitRegexp } from './conditionWait';
import { valueWaitRegexp } from './valueWait';

/**
 * Resolves into wdio element
 * @returns {Element<'async'>}
 */
defineParameterType({
    name: 'element',
    regexp: /'(.+)'/,
    transformer: aliasTransformer,
    useForSnippets: false
});

/**
 * Resolves into function that return wdio element
 */
defineParameterType({
    name: 'locator',
    regexp: /'(.+)'/,
    transformer: locatorTransformer,
    useForSnippets: false
});

/**
 * Resolves into function that perform element condition wait
 */
defineParameterType({
    name: 'conditionWait',
    regexp: conditionWaitRegexp,
    transformer: conditionWaitTransformer,
    useForSnippets: false
});

/**
 * Resolves into function that perform element value wait
 */
defineParameterType({
    name: 'valueWait',
    regexp: valueWaitRegexp,
    transformer: valueWaitTransformer,
    useForSnippets: false
});
