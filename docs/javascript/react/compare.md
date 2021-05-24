---
title: 函数组件和类组件的比较
toc: menu
nav:
    title: 函数组件和类组件的比较
    path: /javascript/react
writing: true
---

# 函数组件和类组件的比较

## 概述

由于我学习 react 的时候已经是 16.8 所以我一开始上手就是函数组件，而函数组件，就是使用 hooks 刚开始对于 hooks 是非常难以适应，useEffect 经常会递归执行，useState 的更新需要一个不可变数据，但是使用一段时间后，真香~

对于我来说这几点是非常打动我的：

1. 函数组件对于**状态抽象的能力**使得我复用了大量代码逻辑,代码写得更优雅。
2. 过程式的写法，更加利于编写业务逻辑，同时不需要在类组件上方法之间反复横跳。
3. 编辑器对于函数的类型推断非常友好，以至于配合 typescript 上也是非常完美的体验。
4.  相比 类组件，函数组件 代码量更少，维护性，可测试性，复用性更强。

但是缺点也是很明显，心智模型较重，这也是这篇文章我重点讲得，至于是怎么讲，可以和类组件的对比结合

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

1. 当使用 函数式组件 实现的 `ProfilePage`, 当前人是 小明 时点击 点击 按钮，然后立马切换当前账号到 小红，弹出的文本将依旧是 `'小明'`。

2. 当使用 类组件 实现的 `ProfilePage`, 弹出的文本将是 `'小红'`：

很显然，其中函数组件的结果是正确的，因为我当前虽然是切换了，我前面点击的时候我**当时的状态已经是确定了**，所以这样是符合要求

相反在类组件，在我切换的时候，类组件会跟随这切换，这样明显有问题。

造成这样的一个原因是因为 类组件，直接读取了 `this.props.user` 的属性，

```jsx | pure
class ProfilePage extends React.Component {
  showMessage = () => {
    alert('Followed ' + this.props.user); ◀️
  };
```

为什么说读取 `this.props` 是一个最新的值呢？ 虽然在 react 中 `this.props.user` 是一个不可变数据(immutable), 所以他永远不会改变，但是，`this` 是一个可变的 (mutable),它如何都会变化。

所以，当我们的组件重新渲染，那么 this.props 就会改变，而且 `showMessage` 将会得到一个最新的值。

## 函数组件真正需要理解的地方

正是因为不可变性(immutable)的性质，函数组件每次渲染都是一次新的执行，那么 获取对应的变量其实就是当前渲染的变量，而且这些变量是不可变的，等下一次渲染来临时，这些变量都会被更新替换，从而刷新视图，这其实不是什么黑魔法，只是`闭包`🙄

<code src="./demo/compare/demo2.tsx" />

从这个 demo 看出，从我 start 点击按钮开始，setInterval 一直执行，但是尽管 一直执行 `setCount` 方法使其重新渲染 ，但是尽管是重新执行渲染取得值仍旧是 `count = 0` ，这就是因为当我开始执行 handleStartClick 的时候，

```jsx | pure
const [count, setCount] = useState(0);
const [flag, setFlag] = useState(false);
useEffect(() => {
    if (!flag) return;
    let timer = setInterval(() => {
        setCount(count + 1); // count = 0
    }, 1000);
    return () => {
        setCount(0);
        clearInterval(timer);
    };
}, [flag]);
```

setInterval 的回调,只会记忆当前渲染的变量 `count = 0`，如果你需要取最新的 `count`,那么你必须在下一次当前函数渲染上下文中取。

我们说了那么多函数组件渲染的概念，那么第一条 demo 中的类组件出现的问题该如何解决呢？

## 如何解决类组件中存在的问题？

既然类组件的状态中的 `this` 是取最新的 props，如何才能捕获当前渲染中所需要的值呢？

答案很简单，利用闭包

<code src="./demo/compare/demo3.tsx" />

把方法都封装在 render 函数中，但是这样不就是和函数组件一样么？ 😂

## 结论

说了那么多，很多人说闭包是危害，其实不算是，闭包对于我们来说实际上是帮助了不少问题，也解决到了很难注意的细微问题，因为函数组件每次都都能捕获它们所需要的值。
