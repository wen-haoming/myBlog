---
title: 性能优化
toc: menu
nav:
    title: 性能优化
    path: /javascript/project
---

# 前端性能优化

## 页面哪些需要优化？

-   首屏时间
-   资源加载
-   交互响应
-   图片
-   渲染
-   滚动
-   动画

## 页面的速度跟三个因素有关

-   网络带宽速度
-   设备性能（CPU, GPU, 浏览器）
-   页面本身（JS, CSS）

## 一些法则

-   减少请求
-   合并，压缩
-   样式，css 雪碧图
-   外连内连
-   DNS
-   图片压缩
-   渲染优化

## RTT - Round-trip time

移动端天生就比有线的慢

3g：100-450 ms
4g：60-80 ms

DNS 查找 ---> TCP 连接 ---> HTTP 请求 ---> 服务端响应 ---> 客户端渲染

## 14kb 原则

[外文解释](https://www.tunetheweb.com/blog/critical-resources-and-the-first-14kb/#tcp_basics)

[TCP 的拥塞控制-慢启动，拥塞避免，快重传，快启动](https://blog.csdn.net/jtracydy/article/details/52366461)

> 慢启动算法的思路：主机开发发送数据报时，如果立即将大量的数据注入到网络中，可能会出现网络的拥塞。慢启动算法就是在主机刚开始发送数据报的时候先探测一下网络的状况，如果网络状况良好，发送方每发送一次文段都能正确的接受确认报文段。那么就从小到大的增加拥塞窗口的大小，即增加发送窗口的大小。

-   TCP 的拥塞控制 -- 慢启动(Slow start)
    -   开始 ---> swnd = 1MSS
    -   经过 1 个 RTT 后 ---> cwnd = 2\*1 = 2
    -   经过 2 个 RTT 后 ---> cwnd = 2\*2 = 4
    -   经过 3 个 RTT 后 ---> cwnd = 4\*2 = 8

无法改变 RTT 变小，但可以让 RTT 数量变少，无法改变三次握手机制，但可以复用连接避免三次握手，无法改变慢启动机制，但可以控制页面资源包在 14KB 内减弱慢启动的影响。

## 缓存

-   协议缓存

    -   Cache-Control（或 Expires）
    -   Last-Modified（或 Etag）
    -   Expires

-   离线缓存

    -   Cache Manifest

-   本地存储

    -   LocalStorage
    -   sessionStorage

-   indexDB

## FPS 和 16 毫秒

-   FPS 表示的是每秒钟画面更新次数
-   大多数浏览器的刷新率 50~60hz
-   60 fps 是所有 ios 内置动画运行速度
-   1000 ms / 60 ≈ 16.67ms

使用 requestAnimationFrame 计算 FPS

原理：正常而言 requestAnimationFrame 这个方法在一秒内湖执行 60 次，动画在时间 A 开始执行，B 结束，其中 requestAnimationFrame 一共执行了 n 次，则此段动画的帧率大致为：`n / (B - A)`。

## window.performance

## http 2.0

-   HTTP 1 时代
    -   异步接口合并 （Batch Ajax Request）
    -   图片合并，雪碧图
    -   CSS, JS 合并/内联
    -   图片，音频内联（Data URI）

<Alert type="info">
 HTTP 性能的关键在于低延迟而不是高带宽
</Alert>

-   HTTP 2.0
    -   所有请求共用同一个链接，可以更有效的利用 TCP 链接，通过带宽来提升 HTTP 性能。
    -   可以减少服务器链接压力，内存占用少了，链接吞吐量大了。
    -   解决了浏览器连接数有限的问题。
    -   TCP 慢启动时间减少，拥塞和丢包回复速度更快。

<Alert type="info">
资源合并减少请求，的优化手段对于 HTTP 2.0 来说没有效果。
</Alert>

## 页面如何变快

1. 压缩
2. 合并
3. 延迟
4. 直出

<Alert > 移动端并发请求丢失率 3.5% </Alert>

## 2.1 图片

图片会不会影响 js 的执行？

有可能会，在 http 1.1 和浏览器本身的并发请求数限制的问题，如果我发起了 6 张图片的并行请求，那么就会阻塞后续的 js 请求。

## 图片格式的选择

-   1 _ 1 **GIF** (1 _ 1 pixels, file size: 34 bytes, MIME type: image/gif)
-   1 _ 1 **png** (1 _ 1 pixels, file size: 95 types, MIME type: image/png)

<br/>

-   大小比较： PNG ≈ JPG > GIF
-   透明性： PNG > GIF > JPG
-   色彩丰富度：JPG > PNG > GIF
-   兼容程度： GIF ≈ JPG > PNG
