import React, { memo } from 'react';

const Footer = () => {
    return (
        <footer className="footer">
            <div> Hexo Fluid</div>
            <div>总访问量 111894 次</div>
            <div>总访客数 20035 人</div>
            <div>浙ICP备19029560号-1</div>
        </footer>
    );
};

export default memo(Footer);
