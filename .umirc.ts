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
    navs: [
        {
            title: '前端',
            children: [
                {
                    title: '基础',
                    path: '/javascript/base',
                },
                {
                    title: '业务',
                    path: '/javascript/business',
                },
                {
                    title: '浏览器API',
                    path: '/javascript/api',
                },
                {
                    title: 'react',
                    path: '/javascript/react',
                },
                {
                    title: 'vue',
                    path: '/javascript/vue',
                },
                {
                    title: 'webpack',
                    path: '/javascript/webpack',
                },
                {
                    title: '项目实践',
                    path: '/javascript/project',
                },
            ],
        },
        {
            title: 'python',
            children: [
                {
                    title: 'python语言学习',
                    path: '/python/base',
                },
                {
                    title: '神经网络基础',
                    path: '/python/neuralnetwork',
                },
                {
                    title: 'Tensoflow',
                    path: '/python/tensoflow',
                },
            ],
        },
        {
            title: '书籍',
            children: [],
        },
        {
            title: '计算机相关',
            children: [{ title: '基础', path: '/cs/base' }],
        },
        {
            title: '杂七杂八',
            children: [
                { title: '工作效率', path: '/order/efficiency' },
                { title: '个人思考', path: '/order/think' },
            ],
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
    // ssr:{
    //
    // }
    // '/javascript/base':[{
    //   title:'基础',
    //   children:['/javascript/base/binary']
    // }],
    // '/javascript/business':[{
    //   title:'业务',
    //   children:['/javascript/business/download','/javascript/business/abc']
    // }],
    // 'javascript/api':[{
    //   title:
    // }]
    // more config: https://d.umijs.org/config
});
