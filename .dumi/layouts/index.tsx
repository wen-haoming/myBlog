import React, { memo } from 'react';

interface Props {}

const Layout: React.FC<Props> = props => {
    const { children } = props;
    return (
        <div>
            123
            {children}
        </div>
    );
};

export default memo(Layout);
