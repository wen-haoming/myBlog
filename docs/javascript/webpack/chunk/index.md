---
title: chunk
toc: menu
nav:
  title: chunk
  path: /javascript/webpack
group:
  title: chunk
---

# 关于 webpack 的 chunk 周边内容

[官网地址](https://webpack.docschina.org/concepts/under-the-hood/#chunks)

## 文件指纹

我们都知道 webpack 的 hash 有三种，分别为 `contenthash` `chunkhash` `hash` 并且这3中 hash 的生成方式不同，所以这三种使需要搭配如何长期缓存。

### `hash`  

```js
output:{
        filename:'[name]-[hash:5].js', 
        chunkFilename:'[name]-[hash:5]-chunk.js',
        publicPath:'/dist/'
    },
```
> `filename` 代表 main-chunk
> 
> `chunkFilename` 代表 splitChunk 或者 动态 import 后的模块

这样设置的效果会导致所有的模块都有对应 hash 值（下图）

<img width="200" src="./hash.png"/>

不过只要其中一个代码一处改变，那么打包后的所有文件的 hash **都会发生改变**。


### `chunkhash` 

### `contenthash` 



## webpack 的 filename 和 `chunkFilename` 的 `hash` 值应该如何配置？


## webpack 的动态加载到底是如何实现的？
