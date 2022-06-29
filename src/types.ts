import { defineParameterType } from '@cucumber/cucumber';
import { aliasTransformer, conditionWaitTransformer, valueWaitTransformer, lazyAliasTransformer } from './parameterTypeTransformer';

defineParameterType({
    name: 'element',
    regexp: /'(.+)'/,
    transformer: aliasTransformer
});

defineParameterType({
    name: 'lazyElement',
    regexp: /'(.+)'/,
    transformer: lazyAliasTransformer
});

defineParameterType({
    name: 'conditionWait',
    regexp: /(.+)/,
    transformer: conditionWaitTransformer
});

defineParameterType({
    name: 'valueWait',
    regexp: /(.+)/,
    transformer: valueWaitTransformer
});
