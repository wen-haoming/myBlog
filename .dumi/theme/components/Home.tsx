import React, { useEffect, useState } from 'react';
import { List, Avatar, Space, Divider, Col, Button, Row } from 'antd';
import { transformDate } from '../utils/transformTime';
import { Link } from 'dumi/theme';

const Home = props => {
    console.log(props);
    const [updateList, setUpdateList] = useState([]);
    useEffect(() => {
        let obj = props.route.routes.reduce(
            (preObj, item, idx) => {
                if (idx > 10) return preObj;
                if (
                    item.meta.updatedTime &&
                    item.meta.updatedTime >= preObj.updatedTime
                ) {
                    preObj.updatedTime = item.meta.updatedTime;
                    preObj.arr.unshift(item);
                } else if (
                    item.meta.updatedTime &&
                    item.meta.updatedTime < preObj.updatedTime
                ) {
                    preObj.arr.push(item);
                }
                return preObj;
            },
            { arr: [], updatedTime: 0 },
        );
        setUpdateList(obj.arr);
    }, [props]);

    return (
        <div style={{ marginTop: 50 }}>
            <Row>
                <Col className="update-list" span={12}>
                    <p>最近更新</p>
                    {updateList
                        .sort(
                            (item, item2) =>
                                item2.meta.updatedTime - item.meta.updatedTime,
                        )
                        .map((item, idx) => {
                            return (
                                <div className="update-list-item" key={idx}>
                                    <div
                                        style={{
                                            display: 'flex',
                                            justifyContent: 'start',
                                        }}
                                    ></div>{' '}
                                    <svg
                                        t="1615116578020"
                                        class="icon"
                                        viewBox="0 0 1024 1024"
                                        version="1.1"
                                        xmlns="http://www.w3.org/2000/svg"
                                        p-id="2333"
                                        width="16"
                                        height="16"
                                    >
                                        <path
                                            d="M805.2 151.1c10 0 18.4 8.4 18.4 18.4v685.3c0 10-8.4 18.4-18.4 18.4H219c-10 0-18.4-8.4-18.4-18.4V169.5c0-10 8.4-18.4 18.4-18.4h586.2m0-55.1H219c-40.4 0-73.4 33.1-73.4 73.4v685.3c0 40.4 33.1 73.4 73.4 73.4h586.2c40.4 0 73.4-33.1 73.4-73.4V169.5c0-40.4-33-73.5-73.4-73.5z"
                                            fill="#0C90F8"
                                            p-id="2334"
                                        ></path>
                                        <path
                                            d="M633.9 328.5H294.2c-15.2 0-27.5-12.3-27.5-27.5s12.3-27.5 27.5-27.5h339.7c15.2 0 27.5 12.3 27.5 27.5s-12.3 27.5-27.5 27.5zM736.2 539.7H288.5c-15.2 0-27.5-12.3-27.5-27.5s12.3-27.5 27.5-27.5h447.7c15.2 0 27.5 12.3 27.5 27.5s-12.3 27.5-27.5 27.5zM736.2 750.8H288.5c-15.2 0-27.5-12.3-27.5-27.5s12.3-27.5 27.5-27.5h447.7c15.2 0 27.5 12.3 27.5 27.5s-12.3 27.5-27.5 27.5z"
                                            fill="#4C4F54"
                                            p-id="2335"
                                        ></path>
                                    </svg>
                                    <Link to={item.path} type="link">
                                        {item.title}
                                    </Link>
                                    <div
                                        style={{
                                            display: 'flex',
                                            justifyContent: 'start',
                                        }}
                                    >
                                        更新时间{' '}
                                        {transformDate(item.meta.updatedTime)}
                                    </div>
                                </div>
                            );
                        })}
                </Col>
            </Row>
        </div>
    );
};

export default Home;
