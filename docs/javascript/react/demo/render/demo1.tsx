/**
 * defaultShowCode: true
 * desc : 这个问题就是当 App 的 color 变化时，我们重新渲染一次被 <ExpensiveTree/> 导致拖慢整个 App 组件的渲染速度。
 */
import React, { useState } from 'react';
import { useCodeSandbox } from 'dumi/theme';

function ExpensiveTree() {
    let now = performance.now();
    while (performance.now() - now < 100) {
        // Artificial delay -- do nothing for 100ms
    }
    return <p>I am a very slow component tree.</p>;
}

export default function App() {
    let [color, setColor] = useState('red');
    return (
        <div>
            <input value={color} onChange={e => setColor(e.target.value)} />
            <p style={{ color }}>Hello, world!</p>
            <ExpensiveTree />
        </div>
    );
}
