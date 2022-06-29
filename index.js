require('./lib/hooks.js');
require('./lib/actions.js');
require('./lib/waits.js');
require('./lib/validations.js');
exports.aliasResolver = require('./lib/wdioResolver').wdio;
exports.conditionWait = require('./lib/conditionWait').conditionWait;
exports.valueWait = require('./lib/valueWait').valueWait;
