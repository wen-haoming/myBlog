import { defineConfig } from 'dumi';

export default defineConfig({
  title: '浩明啦',
  mode: 'site',
  locales:['zh-CN', '中文'],
  navs:[
    {
      title:'javascript',
      children:[
        {
          title:'基础',
          path:'/javascript/base'
        },
        {
          title:'业务',
          path:'/javascript/business'
        },
        {
          title: 'react',
          path: '/javascript/react'
        },
        {
          title: 'vue',
          path: '/javascript/vue'
        }
      ]
    },
    {
      title: 'python',
      children: []
    },
    {
      title:'书籍',
      children: []
    }
  ],
  menus:{
    '/javascript/base':[{
      title:'基础',
      children:['/javascript/base/binary']
    }],
    '/javascript/business':[{
      title:'业务',
      children:['/javascript/business/download','/javascript/business/abc']
    }]
  }
  // more config: https://d.umijs.org/config
});
