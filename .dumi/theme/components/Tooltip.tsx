import React, { memo, useEffect, useState } from 'react';
import { IRouteComponentProps } from 'dumi';
import { EditOutlined } from '@ant-design/icons';
import ReactDom from 'react-dom';
import { Tooltip, Button } from 'antd';

const Header: React.FC<Omit<IRouteComponentProps, 'children'>> = props => {
    const [targetDom, setTargetDom] = useState<Element>(null);

    useEffect(() => {
        try {
            setTargetDom(document.querySelector('.markdown').firstChild);
        } catch (e) {}
    }, [props.location.pathname]);

    return (
        <div>
            {targetDom
                ? ReactDom.createPortal(
                      <Tooltip title="在 github 上编辑此页">
                          <a
                              style={{ textDecoration: 'none' }}
                              target="_blank"
                              href={`https://github.com/wen-haoming/myBlog/edit/master/docs/${props.location.pathname.replace(
                                  /^\//,
                                  '',
                              )}.md`}
                          >
                              {' '}
                              <EditOutlined style={{ fontSize: '16px' }} />{' '}
                          </a>
                      </Tooltip>,
                      targetDom,
                  )
                : null}
        </div>
    );
};

export default memo(Header);
