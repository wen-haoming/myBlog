---
title: webpack5
toc: menu
nav:
  title: webpack5
  path: /javascript/webpack
group:
  title: webpack5
---

# webpack5


> 本文从最简单的角度去提取有关的更新内容，更详细都需要去查看[官方文档](https://webpack.docschina.org/concepts/)

- 启动命令
- 长期缓存
- 资源模块
- modulelds & chunklds 的优化
- 更智能的 tree shaking
- nodejs 的 polufill 脚本被移除
- 模块联邦


## 启动命令

从 `webpack 5` 开始，启动 dev-server 命令就开始使用 `webpack serve` , 


## 持久化缓存

[官方文档](https://webpack.docschina.org/blog/2020-10-10-webpack-5-release/#major-changes-performance)

如果 `cache.type : "filesystem"` 时，可以配合以下选项进行配合，但是 `cache.type : "memory"` 的时候，就不能使用以下选项。
 - cache.cacheDirectory
 - cache.name
 - cache.version
 - cache.store
 - cache.hashAlgorithm
 - cache.idleTimeout
 - cache.idleTimeoutForIntialStore
 - cache.buildDependencies

```js
module.exports = {
  cache: {
    // 1. 将缓存类型设置为文件系统
    type: 'filesystem',

    buildDependencies: {
      // 2. 将你的 config 添加为 buildDependency，以便在改变 config 时获得缓存无效
      config: [__filename],

      // 3. 如果你有其他的东西被构建依赖，你可以在这里添加它们
      // 注意，webpack、加载器和所有从你的配置中引用的模块都会被自动添加
    },
  },
};
```

## 资源模块

[官方文档](https://webpack.docschina.org/guides/asset-modules/)

在 webpack 5 之前，通常使用：

- `raw-loader` 将文件导入为字符串
- `url-loader` 将文件作为 data URI 内联到 bundle 中
- `file-loader` 将文件发送到输出目录

资源模块类型(asset module type)，通过添加 4 种新的模块类型，来替换所有这些 loader：

- asset/resource 发送一个单独的文件并导出 URL。之前通过使用 file-loader 实现。
- asset/inline 导出一个资源的 data URI。之前通过使用 url-loader 实现。
- asset/source 导出资源的源代码。之前通过使用 raw-loader 实现。
- asset 在导出一个 data URI 和发送一个单独的文件之间自动选择。之前通过使用 url-loader，并且配置资源体积限制实现。

```js
 module:{
        rules:[{
            test:/\.js$/,
            use:[{
                loader:'babel-loader',
                options:{
                    presets:['@babel/preset-env','@babel/preset-react'],
                    exclude:/node_modules/  // 不打包 不变异node_modules下面的包
                }
            }]
        },{
            test:/\.png$/,
            type:'asset/resource', //对标 file-loader
        },{
            test:/\.ico$/,
            type:'asset/inline' // 对标 url-loader 模块大小 limut base64 字符串
        },{ 
            test:/\.txt$/, 
            type:'asset/source' // 对标raw-loader
        },{
            test:/.jpg$/,
            type:'asset', //对标raw-loader
            parser:{
                dataUrlCondition:{
                    maxSize:4*1024
                }
            }
        }
    ]
    },
```

## URLs

webpack5 支持在请求中处理协议

```js
import data from 'data:text/javascript,export default "title"'
console.log(data);
```

## 长期缓存

[文件指纹相关](https://www.cnblogs.com/giggle/p/9583940.html)
新增了长期缓存的算法。这些算法在生产模式下是默认启用的。

```js
optimization:{
    chunkIds: "deterministic",
    moduleIds: "deterministic",
    mangleExports: "deterministic",
}
```


```js
  entry:'./src/index.js',
     output:{
        filename:'[chunkhash:8].js',
        chunkFilename:'[chunkhash:8]-chunk.js'
    },
    mode:'development',
    devtool:false,
    devServer:{
        port:8080,
    },
    cache:{
        type:'filesystem',
        cacheDirectory: path.resolve(__dirname, './cache/webpack'),
    },
    optimization:{
        moduleIds:'natural', // 自然数自增
        chunkIds:'natural'// 自然数自增
    },
```

但是上面的配置有个问题，如果其中一个包重新打包的话，另外的包的 id 也会随之改变，尽管我没有改过，不过这个问题可以在webpack5中得以解决。

```diff
 // 能够保证生成当前模块的id不变
 optimization:{
+        moduleIds:'deterministic', 
+        chunkIds:'deterministic'
    }
```


## 移除 Nodejs 的 polyfill

[官方文档更新内容](https://webpack.docschina.org/blog/2020-10-10-webpack-5-release/#automatic-nodejs-polyfills-removed)

- webpack4带了许多Node.js核心模块的polyfill,一旦模块中使用了任何核心模块(如crypto)，这些模块就会被自动启用
- webpack5不再自动引入这些polyfill

例如
```js
import path from 'path'
import('./a.js')
import('./b.js')
import('./c.js')

console.log(path);
```

当我们打包以上代码的时候，webpack4 的策略是把 path 包会打包进去，但是 webpack5 会自动检查 nodejs 的模块，并且需要自己根据提示信息手动进行对应的配置。

```bash
If you want to include a polyfill, you need to:
- add a fallback 'resolve.fallback: { "path": require.resolve("path-browserify") }'
- install 'path-browserify'
```

##  更好的 treeShaking 优化

[官方文档更新内容](https://webpack.docschina.org/blog/2020-10-10-webpack-5-release/#general-tree-shaking-improvements)
<br/>

[官方文档](https://webpack.docschina.org/guides/tree-shaking/)

export * 已经得到改进，可以跟踪更多的信息，并且不再将默认导出标记为使用。

export * 现在会在 webpack 确定有冲突的导出时显示警告。

import() 允许通过 /* webpackExports: ["abc", "default"] */ 该魔法注释手动 tree shake 模块。

目录结构
```diff
webpack-demo
|- package.json
|- webpack.config.js
|- /dist
  |- bundle.js
  |- index.html
|- /src
+  |- index.js
+  |-module1.js 
+  |-module2.js
|- /node_modules
```

 webpack.config.js
```diff
module.exports = {
+   mode: 'production',
    optimization:{
+       usedExports:true
    }
}
```

```js
// src\index.js
import {function1} from './module1';
console.log(function1);

// src\module1.js
export function function1(){
    console.log('function1');
}
export function function2(){
    console.log('function2');
}

//  src\module2.js 
export function function3(){
    console.log('function3');
}
export function function4(){
    console.log('function4');
}
```

这样的话只会打包 `index.js` 中的 `function1` 

```js 
// main.js 最后打包的结果
(()=>{"use strict";console.log((function(){console.log("function1")}))})();
```


## sideEffect

[官方文档](https://webpack.docschina.org/blog/2020-10-10-webpack-5-release/#inner-module-tree-shaking)

package.json
```json
{
    "slideEffects":false
}
```

但是这样会把 css 的代码都当成副作用给忽略掉，可以这么配置

package.json
```json
{
    "slideEffects":["*.css"]
}
```


## 模块联邦

[官方文档](https://webpack.docschina.org/concepts/module-federation/)

1. 为了不同开发小组间共同开发一个或者多个应用。
2. 应用将被划分为更小的应用块，一个应用块，可以是比如头部导航或者侧边栏的前端组件，也可以是数据获取逻辑的逻辑组件
3. 每个应用块由不同的组开发
4. 应用或应用块共享其他其他应用块或者库

> 模块联邦可以取代微前端吗？