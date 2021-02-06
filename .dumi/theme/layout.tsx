// src/layout.tsx
import React,{useEffect} from 'react';
import Layout from 'dumi-theme-default/src/layout';
import NProgress from 'nprogress'
import './layout.less'

export default ({ children, ...props }) => {
const {history} = props

  useEffect(()=>{
    history.listen((...args)=>{
      NProgress.start();
      NProgress.done();
    })
  },[])

  return(
  <Layout {...props}>
    <>
      {children}
    </>
  </Layout>
)};
