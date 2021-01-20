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

[官方文档](https://webpack.docschina.org/concepts/)

- 启动命令
- 持久化缓存
- 资源模块
- modulelds & chunklds 的优化
- 更智能的 tree shaking
- nodejs 的polufill 脚本被移除
- 模块联邦


## 启动命令

从 `webpack 5` 开始，启动 dev-server 命令就开始使用 `webpack serve` , 


## 持久化缓存

[官方](https://webpack.docschina.org/blog/2020-10-10-webpack-5-release/)

```js
cache.type = "filesystem" 时，增加了新配置项：(如果type === "memory")
      cache.cacheDirectory
      cache.name
      cache.version
      cache.store
      cache.hashAlgorithm
      cache.idleTimeout
      cache.idleTimeoutForIntialStore
      cache.buildDependencies

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

从原来 webpack4 加载图片资源等媒体文件可能需要 url-loader, file-loader, raw-loader 等，现在都统一使用 webpack5 内部命令进行处理。

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
                dataurlCondition:{
                    maxSize:4*1024
                }
            }
        }
    ]
    },
```