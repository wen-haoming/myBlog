// src/layout.tsx
import React, { useEffect } from 'react';
import Layout from 'dumi-theme-default/src/layout';
// import NProgress from 'nprogress'
import './layout.less';

export default ({ children, ...props }) => {
    return (
        <>
            <Layout {...props}>
                <div>{children}</div>
            </Layout>
        </>
    );
};
