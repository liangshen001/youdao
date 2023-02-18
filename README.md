# @liangshen/youdao

调用有道翻译API，通过翻译控制台创建应用来获取应用ID和应用密钥

https://ai.youdao.com/console/#/service-singleton/text-translation

## 安装
```
npm i @liangshen/youdao
```

## 使用

```typescript
import Youdao from "@liangshen/youdao";
export const jenkins = new Youdao({
    appSecret: 'ILuULehP522xSNX1fNbUaJbv5y53xxxx',
    appKey: '0465a5910712xxxx'
});
// 获取Jenkins API信息 默认翻译内容为英汉互译
const res = await jenkins.translate('test');
console.log(res);

```

