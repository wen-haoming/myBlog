/**
 * desc: 直接使用`memo`包裹`<ExpensiveTree/>`组件能解决此问题
 */
import React, { memo, useState } from 'react';
import { useCodeSandbox } from 'dumi/theme';

const ExpensiveTree = memo(() => {
    let now = performance.now();
    while (performance.now() - now < 100) {
        // Artificial delay -- do nothing for 100ms
    }
    return <p>I am a very slow component tree.</p>;
});

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
