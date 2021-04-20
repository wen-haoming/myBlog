import React, { memo, useEffect } from 'react';
import { Row, Col, Space } from 'antd';
import {
    HomeOutlined,
    FolderOpenOutlined,
    AppstoreOutlined,
    SmileOutlined,
} from '@ant-design/icons';

const menusArr = [
    {
        icon: HomeOutlined,
        text: '首页',
    },
    {
        icon: FolderOpenOutlined,
        text: '归档',
    },
    {
        icon: AppstoreOutlined,
        text: '分类',
    },
    {
        icon: SmileOutlined,
        text: '关于',
    },
];

const Nav = () => {
    useEffect(() => {
        // let items = [...document.getElementsByClassName('nav-item')]
        // items.forEach(item => {
        //     item.addEventListener('mouseenter', mouseenter)
        //     let obj = item.getBoundingClientRect()
        //     function mouseenter(e) {
        //         document.addEventListener('mousemove', mousemove)
        //         item.addEventListener('mouseleave', mouseleave)
        //         item.style.transform = `scale(1.1)`
        //     }
        //     function mousemove(e) {
        //         item.style.transform = `translate(${-(obj.left - e.clientX) * 0.3}px,${-(obj.top - e.clientY) * 0.3}px)`
        //     }
        //     function mouseleave() {
        //         item.style.transform = `translate(0px,0px)`
        //         document.removeEventListener('mousemove', mousemove)
        //         item.removeEventListener('mouseleave', mouseleave)
        //     }
        // })
    }, []);

    return (
        <header className="header">
            <nav className="nav">
                <Row className="nav-wrap">
                    <Col className="nav-brand">brand</Col>
                    <Col
                        className="nav-menus"
                        xs={0}
                        sm={0}
                        md={10}
                        lg={10}
                        xl={10}
                    >
                        {menusArr.map((item, key) => (
                            <Space className="nav-item" key={key}>
                                {<item.icon />}
                                <span>{item.text}</span>
                            </Space>
                        ))}
                    </Col>
                    <Col
                        className="nav-menus"
                        xs={10}
                        sm={10}
                        md={0}
                        lg={0}
                        xl={0}
                    >
                        {/*  */}
                    </Col>
                </Row>
            </nav>
        </header>
    );
};

export default memo(Nav);
