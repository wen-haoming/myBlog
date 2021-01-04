import { defineConfig } from 'dumi';

export default defineConfig({
  title: '浩明啦',
  mode: 'site',
  locales:[['zh-CN', '中文']],
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
          title:'浏览器API',
          path:'/javascript/api'
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
    },
    {
      title: '计算机相关',
      children: [
        {title: '基础',path:'/cs/base' }
      ]
    }
  ],
  menus:{
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
  }
  // more config: https://d.umijs.org/config
});
