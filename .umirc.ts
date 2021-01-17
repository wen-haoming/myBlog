import { defineConfig } from 'dumi';

export default defineConfig({
  title: '浩明啦',
  mode: 'site',
  locales: [['zh-CN', '中文']],
  navs: [
    {
      title: 'javascript',
      children: [
        {
          title: '基础',
          path: '/javascript/base'
        },
        {
          title: '业务',
          path: '/javascript/business'
        },
        {
          title: '浏览器API',
          path: '/javascript/api'
        },
        {
          title: 'react',
          path: '/javascript/react'
        },
        {
          title: 'vue',
          path: '/javascript/vue'
        },
        {
          title: 'webpack',
          path: '/javascript/webpack'
        }
      ]
    },
    {
      title: 'python',
      children: [
        {
          title: 'python语言学习',
          path: '/python/base'
        }, {
          title: 'python程序进阶',
          path: '/python/base2'
        }, {
          title: '神经网络基础',
          path: '/python/neuralnetwork'
        }, {
          title: 'Tensoflow',
          path: '/python/tensoflow'
        }]
    },
    {
      title: '书籍',
      children: []
    },
    {
      title: '计算机相关',
      children: [
        { title: '基础', path: '/cs/base' }
      ]
    }
  ],
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
