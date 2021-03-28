import React, { memo, useEffect } from 'react';
import Layout from 'dumi-theme-default/src/layout';
import './layout.less';
import Tip from './components/Tooltip';
import Footer from './components/Footer';
import { IRouteComponentProps } from 'dumi';
import NProgress from 'nprogress';
import 'nprogress/nprogress.css';

const LayoutContent: React.FC<IRouteComponentProps> = ({
    children,
    ...props
}) => {
    const isExact = props.match.isExact;

    return (
        <>
            <Layout {...props}>
                <>
                    {!isExact && <Tip {...props} />}
                    {children}
                    {!isExact && <Footer {...props} />}
                </>
            </Layout>
        </>
    );
};

export default memo(LayoutContent);
