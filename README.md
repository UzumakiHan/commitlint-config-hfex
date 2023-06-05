## git commit 规范

### 在@commitlint/config-conventional上进行扩展,具体可浏览[https://github.com/conventional-changelog/commitlint]

### 扩展的规则是 描述必须要存在 7个或以上的中文字符

```js
 rules: {
        'subject-zh-min-count': (parsed, when, value) => {
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
```
### install package

```bash
pnpm install husky hfex-commitlint-config @commitlint/cli -D
```

### init husky

```bash
npx husky install
```

### add commit-msg 
```bash
npx husky add .husky/commit-msg  'npx --no -- commitlint --edit ${1}'
```

### 在项目根目录新增配置文件commitlint.config.js
```js
module.exports = {
  extends: [require.resolve('commitlint-config-hfex')],
};
```

### 或者在package.json添加
```json
"commitlint": {
    "extends": [
      "hfex"
    ]
  },
```

### 运行
```
git add .
git commit -m 'xxxx'
```