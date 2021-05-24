import { defineConfig } from 'dumi';
const path = require('path');
const env = process.env.NODE_ENV;

export default defineConfig({
    title: 'Ming仔',
    mode: 'site',
    favicon:
        'https://gw.alipayobjects.com/zos/bmw-prod/d60657df-0822-4631-9d7c-e7a869c2f21c/k79dmz3q_w126_h126.png',
    logo:
        'https://gw.alipayobjects.com/zos/bmw-prod/d60657df-0822-4631-9d7c-e7a869c2f21c/k79dmz3q_w126_h126.png',
    locales: [['zh-CN', '中文']],
    analytics: {
        // 百度统计代码，配置后会启用
        baidu: '7bd86b51a101648b7235643dd81f5ca6',
    },
    extraBabelPlugins: [
        [
            'babel-plugin-import',
            {
                libraryName: 'antd',
                style: true, // or 'css'
            },
        ],
    ],
    metas: [
        {
            name: 'keyword',
            content: '温浩明',
        },
        {
            name: 'keyword',
            content: 'whm,温浩明,Ming仔,博客,博客网站,生活,代码,',
        },
        {
            name: 'author',
            content: '温浩明,明仔,Ming仔,wenhaoming',
        },
        {
            name: 'description',
            content: '浩明的个人博客首页，浩明的技术作品，浩明的成长记录',
        },
    ],
    ...(() => {
        return env === 'development'
            ? {}
            : {
                  ssr: {},
                  exportStatic: {},
              };
    })(),
});
