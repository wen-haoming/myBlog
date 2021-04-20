import React, { memo } from 'react';
import { Row, Col, Space } from 'antd';
import {
    CalendarTwoTone,
    TagTwoTone,
    AppstoreTwoTone,
} from '@ant-design/icons';
import img from '../style/home.jpeg';

const Content = () => {
    return (
        <main className="main">
            <Row className="main-item">
                <Col
                    className="item-left"
                    xs={24}
                    sm={24}
                    md={6}
                    lg={6}
                    xl={6}
                    xxl={6}
                >
                    <img src={img} style={{ borderRadius: 5 }} width="100%" />
                </Col>
                <Col
                    className="item-right"
                    xs={24}
                    sm={24}
                    md={18}
                    lg={18}
                    xl={18}
                    xxl={18}
                >
                    <h1 className="item-title">
                        <a href="">title</a>
                    </h1>
                    <span className="item-des">
                        <a href="">
                            titletitletitletitletitletitletitletitletitletitletitletitletitletitletitletitletitletitletitletitletitletitletitletitletitletitletitletitletitletitletitletitletitletitletitletitletitletitletitletitletitletitletitletitletitletitletitletitletitletitletitletitletitletitletitletitletitletitletitletitletitletitletitletitletitletitletitle
                        </a>
                    </span>
                    <div className="item-footer">
                        <Space className="footer-item">
                            <CalendarTwoTone />
                            <span className="calendar-text">2020-10-24</span>
                        </Space>
                        <Space className="footer-item">
                            <AppstoreTwoTone />
                            <span className="calendar-text">2020-10-24</span>
                        </Space>
                        <Space className="footer-item">
                            <TagTwoTone />
                            <span className="calendar-text">2020-10-24</span>
                        </Space>
                    </div>
                </Col>
            </Row>
        </main>
    );
};

export default memo(Content);
