---
title: 问题集锦
toc: menu
nav:
    title: vscode
    path: /order/efficiency
group:
    title: question
    order: 1
writing: true
---

# 问题集锦

## 合并 HTTP 请求是否真的有意义？

> 大家都说合并 http 请求是前端优化的共识，我们来分析一下，假如我们的页面有 100 条 http 请求，http 请求大概经历这样的过程： DNS 寻址、3 次握手建立 TCP 连接、发送 http 报文、服务器解析 http 请求、响应内容。
>
> 对于 http1.0，我们有 100 条请求，就得有 100 次这样的重复过程；但在 http1.1，keep-alive 是默认的，而且现代浏览器都有 DNS 缓存，那么对于“100 条请 求”和“对 100 条请求合并为 1 条请求”这两种方案来说：
>
> -   DNS 寻址由于有 DNS 缓存--无差别；
> -   3 次握手由于有 keep-alive，一条和一百条都只需一次 TCP 握手--无差别；
> -   发送报文--增多了 99 次的 http 请求头；
> -   服务器解析--无差别；
> -   响应内容 --增多了 99 次的 http 响应头；
>     只是增多了 http 报文头，在实际应用中，是否有大的性能差别？

[知乎解答](https://www.zhihu.com/question/34401250)

## 如何优雅地处理使用 React Context 导致的不必要渲染问题？

[知乎解答](https://www.zhihu.com/question/450047614/answer/1831528258)
[教科书般的 demo](https://codesandbox.io/s/react-codesandbox-forked-xfupk?file=/src/Demo1/index.js)
