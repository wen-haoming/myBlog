---
title: 防抖与节流
nav:
    title: 防抖与节流
    path: /javascript/base
---

# 防抖与节流

> 防抖和节流都是前端最常见的优化知识之一了，防抖和节流的区别是什么，它们分别解决了什么问题，并且掌握其中的原理，写出来也是一个前端的基本素养。

## 防抖 debounce

> 每次触发函数后，不立即执行函数，而是等待若干秒后自动执行，如果其中又手动触发多次，则是重新计算又等待若干秒后再触发。

应用场景：

-   用户高频输入的时候调用接口

原理：

```js
function debounce(fn, delay) {
    let timer = null;
    return function(...args) {
        let self = this;
        clearTimeout(timer);
        timer = setTimeout(function() {
            fn.apply(self, args);
        }, delay);
    };
}
```

## 节流 throttle

> 和防抖不一样的是，每次触发函数，过若干秒就自动执行，能够保证一定时间内执行一次。

-   时间戳实现

```js
function throttle(fn, delay) {
    let prev = Date.now();
    return function(...args) {
        let self = this;
        let now = Date.now();
        if (now - self >= delay) {
            fn.apply(self, args);
            prev = now;
        }
    };
}
```

-   定时器实现

```js
function throttle(fn, delay) {
    let timer = null;
    return function(...args) {
        let self = this;
        if (!timer) {
            timer = setTimeout(function() {
                fn.apply(self, args);
                timer = null;
            }, delay);
        }
    };
}
```

-   时间戳和定时器实现，完成一个事件后立即触发

```js
function throttle(fn, delay) {
    let timer = null;
    let startTime = Date.now();
    return function(...args) {
        let curTime = Date.now();
        let self = this;
        let remainging = delay - (curTime - startTime);
        clearTimeout(timer);
        if (remainging <= 0) {
            fn.apply(self, args);
            startTime = curTime;
        } else {
            timer = setTimeout(fn, remainging);
        }
    };
}
```
