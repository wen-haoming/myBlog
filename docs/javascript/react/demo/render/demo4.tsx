/**
 * desc: 现在看 color 并不能提取到另一个组件上，因为这部分代码首先包含组件的 div，这时候无法避免 `memo` ，对吗？或者说，我们有什么办法避免？
 */
import React, { memo, useState } from 'react';
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
        <div style={{ color }}>
            <input value={color} onChange={e => setColor(e.target.value)} />
            <p>Hello, world!</p>
            <ExpensiveTree />
        </div>
    );
}
