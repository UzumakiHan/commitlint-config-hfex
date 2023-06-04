const {RuleConfigSeverity} = require('@commitlint/types');
const customRulePlugin = require('./plugin');
const {Error, Disabled} = RuleConfigSeverity;
module.exports = {
    extends: [require.resolve('@commitlint/config-conventional')],
    rules: {
        ['subject-zh-min-count']: [Error, 'always', 7],
        ['subject-case']: [Disabled]
    },
    plugins: [customRulePlugin]
};
