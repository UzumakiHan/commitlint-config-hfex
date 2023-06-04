// import {Plugin} from '@commitlint/types';
// const {Plugin} = require('@commitlint/type')
module.exports = {
    rules: {
        ['subject-zh-min-count']: (parsed, when, value) => {
            const zhCharRegexp = /[\u4e00-\u9fa5]/,
                enCharRegexp = /[a-zA-Z]/,
                minCount = value || 7,
                subject = parsed.subject || '';
            let count = 0,
                valid = false;
            for (const c of subject) {
                if (zhCharRegexp.test(c)) {
                    count += 1;
                }
                if (enCharRegexp.test(c)) {
                    // 2 个英文字符当做一个中文字符
                    count += 0.5;
                }
                if (count >= minCount) {
                    valid = true;
                    break;
                }
            }

            return [valid, `描述必须要存在 ${minCount} 个或以上的中文字符`];
        }
    }
};
