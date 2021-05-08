import React from 'react';

export default () => {
    return (
        <div
            style={{
                display: 'flex',
                justifyContent: 'center',
                alignItems: 'center',
                width: 750,
                height: 750,
                border: '1px solid #f40',
            }}
        >
            <iframe
                style={{ width: '100%', height: '100%' }}
                src="/FindTheWay/template.html"
            ></iframe>
        </div>
    );
};
