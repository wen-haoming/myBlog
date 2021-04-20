import React, { memo, useEffect } from 'react';
import Layout from 'dumi-theme-default/src/layout';
import Layout2 from '../layouts';

import './style/layout.less';
import Tip from './components/Tooltip';
import { IRouteComponentProps } from 'dumi';
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
                </>
            </Layout>
        </>
    );
};

export default memo(LayoutContent);
