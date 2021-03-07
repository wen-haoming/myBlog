import React, { useEffect } from 'react';
import Layout from 'dumi-theme-default/src/layout';
import './layout.less';
import Home from './components/Home';

export default ({ children, ...props }) => {
    return (
        <>
            <Layout {...props}>
                {children}
                {props.match.isExact && <Home {...props} />}
            </Layout>
        </>
    );
};
