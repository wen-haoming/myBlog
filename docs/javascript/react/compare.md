---
title: 函数组件和类组件的比较
toc: menu
nav:
    title: 函数组件和类组件的比较
    path: /javascript/react
---

# 函数组件和类组件的比较

## 概述

由于我学习 react 的时候已经是 16.8 所以我一开始上手就是函数组件，而函数组件，就是使用 hooks 刚开始对于 hooks 是非常难以适应，useEffect 经常会递归执行，useState 的更新需要一个不可变数据，但是使用一段时间后，真香~

对于我来说这几点是非常打动我的：

1. 函数组件状态的抽象使得我可以抽象出自定义 hooks 从而复用了大量代码逻辑。
2. 过程式的写法，更加利于编写业务逻辑，同时不需要在类组件上反复横跳。
3. 编辑器对于函数的类型推断非常友好，以至于在 typescript 上也是非常完美的体验。
4.  相比 类组件，函数组件 代码量更少，维护性，可测试性，复用性更强。

但是缺点也是很明显，心智模型较重。

以上是我的主观认知，但是函数组件一定比类组件更好吗？也不一定

## 函数组件和类组件之间的差异

先来一段相同逻辑，不同写法的组件

**函数组件**

```jsx | pure
function ProfilePage(props) {
    const showMessage = () => {
        alert('Followed ' + props.user);
    };

    const handleClick = () => {
        setTimeout(showMessage, 3000);
    };

    return <button onClick={handleClick}>Follow</button>;
}
```

**类组件**

```jsx | pure
class ProfilePage extends React.Component {
    showMessage = () => {
        alert('Followed ' + this.props.user);
    };

    handleClick = () => {
        setTimeout(this.showMessage, 3000);
    };

    render() {
        return <button onClick={this.handleClick}>Follow</button>;
    }
}
```

但是这样两端代码，看似相同，但还是有略微不同，

<code src="./demo/compare/demo1.tsx" />
