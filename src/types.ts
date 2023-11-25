import { defineParameterType } from '@cucumber/cucumber';

defineParameterType({
    name: 'wdioValidation',
    regexp: /((?:is |do |does |to )?(not |to not )?(?:to )?(?:be )?(equal|strictly equal|deeply equal|have member|match|contain|above|below|greater than|less than|have type)(?:s|es)?)/,
    transformer: p => p,
    useForSnippets: false
});

defineParameterType({
    name: 'wdioConditionWait',
    regexp: /((not )?to (?:be )?(present|clickable|visible|invisible|enabled|disabled|in viewport))/,
    transformer: p => p,
    useForSnippets: false
});

defineParameterType({
    name: 'wdioBrowserButton',
    regexp: /(back|forward)/,
    transformer: p => p,
    useForSnippets: false
});

defineParameterType({
    name: 'wdioTimeout',
    regexp: /(?:\(timeout: (\d+)\))?/,
    transformer: p => p ? parseInt(p) : null,
    useForSnippets: false
});

defineParameterType({
    name: 'wdioDisableActionabilityCheck',
    regexp: /(\(disable actionability wait\))?/,
    transformer: p => !p,
    useForSnippets: false
});

defineParameterType({
    name: 'wdioPoType',
    regexp: /(element|collection)/,
    transformer: p => p,
    useForSnippets: false
});

defineParameterType({
    name: 'wdioMouseButton',
    regexp: /(left|right|middle)/,
    transformer: p => p,
    useForSnippets: false
});


