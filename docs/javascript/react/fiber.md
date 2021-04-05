---
title: react fiber
toc: menu
nav:
    title: react fibeer
    path: /javascript/react
---

# react fiber

## 屏幕刷新率

-   一般屏幕刷新率 60 次/s 约 16.66 毫秒每帧
-   浏览器渲染动画或页面的每一帧的速率也需要跟屏幕的刷新率保持一致
-   如果低于 60 次/s 那么就会出现卡顿

<img src="./lifeofframe.jpg"/>

## raf

[requestAnimationFrame](https://developer.mozilla.org/zh-CN/docs/Web/API/Window/requestAnimationFrame) 回调函数会在绘制之前执行对应的回调。

## requestIdleCallback

[requestIdleCallback](https://developer.mozilla.org/zh-CN/docs/Web/API/Window/requestIdleCallback) 方法将在浏览器的空闲时段内调用的函数排队。这使开发者能够在主事件循环上执行后台和低优先级工作，而不会影响延迟关键事件，如动画和输入响应。函数一般会按先进先调用的顺序执行，然而，如果回调函数指定了执行超时时间 timeout，则有可能为了在超时前执行函数而打乱执行顺序。

<code src="./demo/requestIdeaCallback.tsx"></code>
