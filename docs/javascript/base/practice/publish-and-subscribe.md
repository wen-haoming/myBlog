---
title: 发布订阅和观察者模式
nav:
    title: 发布订阅和观察者模式
    path: /javascript/base
group:
    title: 实践
writing: true
---

# 发布订阅和观察者模式

今天我给大家捋一下前端设计模式的发布订阅和观察者模式的区别，另外这两种在设计模式上的优缺点，还有在项目中的是如何应用的，而且后续还会结合 vue 的相关源码去理解。

> 问：为什么要去学习这两种模式？
>
> 我： 我觉得只有手里懂得越多，自然而然解决问题的效率就越高，而不是仅仅去背诵知识点。

## 观察者模式

-   观察者模式 **观察者** 和 **被观察者**
-   **观察者**应该存放着**观察者**
-   被观察者状态，要跟新自己身上的所有的观察者

**被观察者需要收集所有观察者**

![vue](https://cn.vuejs.org/images/data.png)

我们以 vue 的官方图为例子，来剖析响应式数据的流程，刚好就是观察者模式的理念。

> 每个组件实例都对应一个 watcher 实例，它会在组件渲染的过程中把“接触”过的数据 property 记录为依赖。之后当依赖项的 setter 触发时，会通知 watcher，从而使它关联的组件重新渲染。

那么对应的观察者模式中，每个组件的都是一个`观察者（Observer）- Watcher`，每一个 Data 数据都是一个`被观察者（Subject） - data[property]`，`被观察者（Subject）`上注册`观察者（Observer）`，当 Data 的数据被改变的时候，`被观察者（Subject）`就会主动通知(notify) `观察者（Observer）`，`观察者（Observer）`就会主动更新当前组件，而且一个`被观察者（Subject）`可以对应多个`观察者（Observer）`。

举个栗子：

```js
// 被观察者
class Subject {
    constructor() {
        this.observers = [];
        this.state = '';
    }
    addDep(o) {
        this.observers.push(o);
    }
    setState(state) {
        this.state = state;
        this.observers.forEach(observer => observer.update(this));
    }
}

// 观察者
class Observer {
    update(subject) {
        console.log(subject.state, '状态更新');
    }
}

// 被观察者需要所有观察者收集

let subject = new Subject();

let o1 = new Observer();
let o2 = new Observer();

subject.addDep(o1);
subject.addDep(o2);

subject.setState('数据发生改变--->'); // 数据发生改变---> 状态更新 *2
```
