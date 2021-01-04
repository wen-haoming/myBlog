---
title: react-hooks简单实现
nav:
  title: react
  path: /javascript/react
group:
  title: 源码
  order: 1
---

# react-hooks 简单实现

## 前置环境的配置搭建

我们需要实现 react-hooks 的基本环境

首先每个组件都有自己对应的 fiber
```js
const fiber = {
    stateNode:App 
}

function App(){
    const [num,updateNum] = useState(0)

}
```

支撑我们 mini react-hooks 能运行起来需要这个 `schedule` 函数

```js
function schedule(){
    fiber.stateNode();// 触发组件的render
}
```

但是我们需要区分的是组件是挂载（mount） 还是更新（update）

```js
let isMount = true;

function schedule(){
    fiber.stateNode();// 触发组件的render
    isMount = false;
}
```

接下来我们需要保存hooks的数据，但是一个组件可能调用多个hooks，那么我们就需要一个变量 `memoizedState` 利用链表这种数据结构去保存起来。

```js
let workInProgressHooks = null; // 指向我们当前运行hooks的指针

const fiber = {
    stateNode:App,
    memoizedState:null // 保存对应hooks的数据 
}

function schedule(){
    workInProgressHooks = fiber.stateNode
   const app =  fiber.stateNode();// 触发组件的render
    isMount = false;
    return app
}
```

完整的代码展示
```js
let isMount = true;
let workInProgressHooks = null; // 指向我们当前运行hooks的指针

// 每种组件都有自己对应的fiber节点
const fiber = {
    stateNode:App,
    memoizedState:null // 保存对应hooks的数据 
}

function useState(initialState){
    
}


// 支撑我们mini react-hooks能运行起来需要这个 schedule 函数
function schedule(){
    workInProgressHooks = fiber.stateNode
   const app =  fiber.stateNode();// 触发组件的render
    isMount = false;
    return app
}

function App(){
    const [num,updateNum] = useState(0)

}

window.app = schedule()
```


## 编写useState

首先我们需要定义一个变量 hook 因为 useState 可能在一个组件多次调用，那么我们需要用它来找到对应的是哪个 hook ,
并且我们需要区分首次渲染还是更新状态
- 如果是首次渲染的时候就创建一个 hook，利用 workInProgressHook 这个变量来记录
- 如果是更新的话就拿取 拿取最新的 workInProgressHook 即可

```ts
function useState(initialState){
    let hook;
    if(isMount){
        hook = {
          memoizedState:initialState, // 创建的时候对应的 hook 的 memoizedState 就是 initialState
          next:null,
          queue:{
            pending:null // 如果我们调用多次 action 的时候就会把它放进
          }
        }
        if(!fiber.memoizedState){
            fiber.memoizedState = hook; // 如果没有值的话就是第一个
        }else{
            workInProgressHook.next = hook
        }
        workInProgressHook = hook;
    }else{
        hook  = workInProgressHook
        workInProgressHook = workInProgressHook.next;
    }
}
```

接下来我们需要编写 action ，作为改变状态的函数，我们定义为 dispatchAction


```ts
function dispatchAction(){

}

```