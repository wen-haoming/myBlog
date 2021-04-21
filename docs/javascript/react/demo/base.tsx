import React, { useState, useMemo } from 'react';

export default () => {
    const [count, setCount] = useState(0);

    const Child2 = useMemo(() => <Child />, []);

    return (
        <div>
            <button onClick={() => setCount(count + 1)}>
                {' '}
                countWrapper:{count}
            </button>
            <Wrapper render={Child2}></Wrapper>
        </div>
    );
};

function Wrapper(props: any) {
    const [count, setCount] = useState(0);
    return (
        <div>
            <button onClick={() => setCount(count + 1)}>{count}</button>
            {props.render}
        </div>
    );
}

function MathRandom() {
    return Math.floor(Math.random() * 1000);
}

function Child() {
    return <div> render - {MathRandom()} </div>;
}
