/**
 * desc: 可以尝试一下效果
 */
import React, { memo, useState } from 'react';

export default function App() {
    return (
        <>
            <Form />
            <ExpensiveTree />
        </>
    );
}

function Form() {
    let [color, setColor] = useState('red');
    return (
        <>
            <input value={color} onChange={e => setColor(e.target.value)} />
            <p style={{ color }}>Hello, world!</p>
        </>
    );
}

const ExpensiveTree = memo(() => {
    let now = performance.now();
    while (performance.now() - now < 100) {
        // Artificial delay -- do nothing for 100ms
    }
    return <p>I am a very slow component tree.</p>;
});
