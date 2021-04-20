import React, { memo, useMemo } from 'react';
import { IRouteComponentProps, IRoute } from 'dumi';
import { Button } from 'antd';
import { ArrowLeftOutlined, ArrowRightOutlined } from '@ant-design/icons';

const Footer: React.FC<Omit<IRouteComponentProps, 'children'>> = props => {
    const obj = useMemo<{ pre: IRoute; next: IRoute }>(() => {
        let pre = null;
        let next = null;
        let currentPathname = props.location.pathname;
        let len = props.route.routes.length;
        for (let idx = 0; idx < len - 1; idx++) {
            if (props.route.routes[idx].path === currentPathname) {
                pre = props.route.routes[Math.abs((idx % len) - 1)];
                next = props.route.routes[(idx % len) + 1];
                break;
            }
        }
        return {
            pre,
            next,
        };
    }, [props.route.routes.length, props.location.pathname]);

    return (
        <div
            style={{
                display: 'flex',
                justifyContent: 'space-between',
                paddingTop: 35,
            }}
        >
            <div
                style={{ display: 'flex', alignItems: 'center' }}
                onClick={() => props.history.push(obj.pre.path)}
            >
                {obj.pre && (
                    <>
                        <ArrowLeftOutlined
                            style={{ fontSize: 15, color: '#4569d4' }}
                        />
                        <Button type="link" style={{ color: '#4569d4' }}>
                            {obj.pre.title}
                        </Button>
                    </>
                )}
            </div>
            <div
                style={{ display: 'flex', alignItems: 'center' }}
                onClick={() => props.history.push(obj.next.path)}
            >
                {obj.next && (
                    <>
                        {' '}
                        <Button type="link" style={{ color: '#4569d4' }}>
                            {obj.next.title}
                        </Button>
                        <ArrowRightOutlined
                            style={{ fontSize: 15, color: '#4569d4' }}
                        />
                    </>
                )}
            </div>
        </div>
    );
};

export default memo(Footer);
