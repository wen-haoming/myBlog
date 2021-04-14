import React, { useState, useEffect } from 'react';

export default () => {
    const [count, setCount] = useState(0);
    const [flag, setFlag] = useState(false);

    useEffect(() => {
        if (!flag) return;
        let timer = setInterval(() => {
            setCount(count + 1);
        }, 1000);
        return () => {
            setCount(0);
            clearInterval(timer);
        };
    }, [flag]);

    const handleStartClick = () => {
        setFlag(true);
    };
    const handleStopClick = () => {
        setFlag(false);
    };

    return (
        <div>
            <button onClick={handleStartClick} style={{ marginRight: 50 }}>
                start
            </button>
            <button onClick={handleStopClick}>stop</button>

            <p>{count}</p>
        </div>
    );
};
