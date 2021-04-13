---
title: 聊一聊 react 的优化
toc: menu
nav:
    title: 聊一聊 react 的优化
    path: /javascript/react
---

# 聊一聊 react 的优化



> 本文来自于 [Dan Abramov](https://twitter.com/dan_abramov)一篇文章，[Before You memo](https://overreacted.io/before-you-memo/)

有很多 React 性能优化的文章，如果一些 state 更新缓慢的话

1. 确认当前是否线上环境（如果开发环境会相比线上会慢一些，极端情况下可能会慢一个数量级）。
2. 该状态是否放在了一个比实际更高层级的位置上。（譬如：将输入框的 state 放到了 store 可能不是一个好主意）。
3. 运行 React 开发者工具检测是什么导致了二次渲染，在高开销的子组件上包裹 memo(), 或者需要的地方上使用 useMemo

最后一步是比较麻烦的，但是有两种不同的技巧，也是非常基础，很少人会留意到他们能够提升渲染性能。

## 一个性能差的组件

<code src="./demo/render/demo1.tsx" />

<code src="./demo/render/demo2.tsx" />

但是大家都知道使用 `memo` 来做优化，本文就不做多解释，接下来展示不同的两种方案。

## 方法 1：状态下沉

 如果你仔细看一下渲染代码，你会注意到返回的树中只有一部分真正关心当前的 color

```jsx | pure
export default function App() {
  let [color, setColor] = useState('red');  ◀️
  return (
    <div>
      <input value={color} onChange={(e) => setColor(e.target.value)} />  ◀️
      <p style={{ color }}>Hello, world!</p>  ◀️
      <ExpensiveTree />
    </div>
  );
}
```

所以我们可以单独封装 Form 组件，把状态封装起来

```jsx | pure
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
```

<code src="./demo/render/demo3.tsx" />

## 方法 2：内容提升

当一部分 state 存在上层组件中和高开销的组件在一起上述解法就走不通了，比如以下这个场景

```jsx | pure
export default function App() {
  let [color, setColor] = useState('red');  ◀️
  return (
    <div style={{ color }}>  ◀️
      <input value={color} onChange={(e) => setColor(e.target.value)} />
      <p>Hello, world!</p>
      <ExpensiveTree />
    </div>
  );
}
```

<code src="./demo/render/demo4.tsx" />

答案就是，我们可以使用 children

<code src="./demo/render/demo5.tsx" />

这样带来的意义是什么？

在使用 `memo` 和 `useMemo` 在做优化的时候，可以从不变的部分分离出变化的部分，这样看来是没错的。但是如果使用 `children` 属性来拆分组件通常会使应用的数据流更容易追踪，并且可以减少 props 的数量, 这种模式在将来还会带来更多的性能好处,举个例子，当 [服务器组件](https://reactjs.org/blog/2020/12/21/data-fetching-with-react-server-components.html) 稳定且可被采用时，我们的 ColorPicker 组件就可以从服务器上获取到它的 children。 整个<ExpensiveTree />组件或其部分都可以在服务器上运行，即使是顶级的 React 状态更新也会在客户机上“跳过”这些部分。 这是 memo 做不到的事情!但是，这两种方法是互补的。不要忽视 state 下移(和内容提升!) 然后，如果这还不够，那就使用 Profiler 然后用 memo 来写吧。
