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
        }
      ]
    }
  ],
  menus:{
    '/javascript/base':[{
      title:'基础',
      children:['/javascript/base']
    }],
    '/javascript/business':[{
      title:'业务',
      children:['/javascript/business']
    }]
  }
  // more config: https://d.umijs.org/config
});
