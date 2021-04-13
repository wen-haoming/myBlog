/**
 * defaultShowCode: true
 * desc: 我们将App组件分割为两个子组件。依赖 color 的代码就和 color state变量一起放入 `ColorPicker`组件里。 不关心color的部分就依然放在App组件中，然后以JSX内容的形式传递给`ColorPicker`，也被称为`children`属性。 当color变化时，`ColorPicker`会重新渲染。但是它仍然保存着上一次从App中拿到的相同的`children`属性，所以React并不会访问那棵子树。 因此，`ExpensiveTree`不会重新渲染。
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
    return (
        <ColorPicker>
            <p>Hello, world!</p>
            <ExpensiveTree />
        </ColorPicker>
    );
}

function ColorPicker({ children }) {
    let [color, setColor] = useState('red');
    return (
        <div style={{ color }}>
            <input value={color} onChange={e => setColor(e.target.value)} />
            {children}
        </div>
    );
}
