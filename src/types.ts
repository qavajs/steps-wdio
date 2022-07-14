import { defineParameterType } from '@cucumber/cucumber';
import { validationRegexp } from '@qavajs/validation';
import { valueWaitRegexp } from './valueWait';
import { conditionWaitRegexp } from './conditionWait';

defineParameterType({
    name: 'wdioValidation',
    regexp: validationRegexp,
    transformer: p => p,
    useForSnippets: false
});

defineParameterType({
    name: 'wdioValueWait',
    regexp: valueWaitRegexp,
    transformer: p => p,
    useForSnippets: false
});

defineParameterType({
    name: 'wdioConditionWait',
    regexp: conditionWaitRegexp,
    transformer: p => p,
    useForSnippets: false
});
