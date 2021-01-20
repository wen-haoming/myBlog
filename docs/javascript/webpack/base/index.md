---
title: webpack4基础以及优化方案
toc: menu
nav:
  title: webpack4基础
  path: /javascript/webpack
group:
  title: webpack4基础以及优化方案
  order: 1
---

# webpack的基础知识和优化

- 安装本地的webpack
- webpack webpack-cli -D

## entry 入口

[官方文档](https://webpack.docschina.org/concepts/entry-points/)

单个入口 entry: string | [string]

entry 的三种形式：字符串，数组和对象

- 字符串 entry

如果是字符串的话，直接解析该文件依赖，但是filename 这个字段的 `[name].js` 是无效的。

```js
module.exports = {
    mode:'development',
    entry: resolve('./src/index.js'),
    output:{
        path:resolve('./dist'),
        filename:'[name].js'
    }
}
```

- 对象 entry 

如果对象只有一个 key 值，那么就直打包一个chunk，如果多个就打包多个，并且 key 是可以以路径的形式存起来，不过记得注意，output 的 filename 记得是 [name].js

```js
module.exports = {
    mode:'development',
    entry: {
        'app-entry': './app.js'
    },
    output: {
        path: './output',
        filename: '[name].js'
    }
}
```
- 数组 entry

如果 entry 是一个数组，那么会把数组多个包打包成一个 chunk 文件，通常是用于不相依赖的包中使用，而且 filename是 `[name].js` 无效的。

```js
module.exports = {
    mode:'development',
    entry: [resolve('./src/index1.js'),resolve('./src/index2.js')],
    output:{
        path:resolve('./dist'),
        filename:'[name].js'
    }
}
```

## output 出口

在 webpack 中的 output 字段包含很多属性，但是我着重讲讲一些常用的 output 的字段属性。

1. path 必须是一个绝对路径，不能是相对路径

2. publicPath 在加载外部资源的时候，比如（图片，文件）是一个非常重要的选项，大部分情况下是默认为 /

```js

  const path = require('path');

  module.exports = {
    //...
    output: { 
      path: path.resolve(__dirname, 'public/assets'),
      publicPath: 'https://cdn.example.com/assets/'
    }
  };
```

3. library & libraryTarget 配置一个库使用的

library 暴露到全局的属性名称

如果没有设置output.library值，那么将不会发生赋值行为。


```js
module.exports = {
    mode:'development',
    entry: resolve('./src/index.js'),
    output:{
        path:resolve('./dist'),
        filename:'[name].js',
        library:'mydemp' // 打包出去就以这个名字暴露到全局上
    }
}
```

libraryTarget 配合 library 此配置的作用是控制 webpack 打包的内容是如何暴露的，

## 文件指纹

文件指纹是打包后输出的文件名后缀

- Hash： 和整个项目的构建有关，只要`项目文件`有修改，整个项目构建的 hash 值就会改变。 （只要有文件变化，就会改变）
- Chunkhash：和 webpack 打包的 `chunk` 有关，不同的 entry 会生成不同的 chunkhash 值。 （不同的 entry 会生成不同的 chunkhash，对于js的文件指纹，通常是使用这个）
- Contenthash：根据文件内容定义 hash，`文件内容`不变，则 contenthash 不变。（如果js改变了css不想改变，所以css资源使用这个避免改变hash）

如何使用?

`js` 使用 `chunkhash`

```js
  module.exports = {
  entry: {
  app: './src/app.js',
  search: './src/search.js'
  },
  output: {
  + filename: '[name][chunkhash:8].js',
    path: __dirname + '/dist'
    }
  };
```

`css` 使用 `Contenthash` ：需要另外配备一个 `MiniCssExtractPlugin` 这个插件，因为我们需要独立的 css 文件来配备其中的文件名。

```js
module.exports = {
    entry: {
      app: './src/app.js',
      search: './src/search.js'
    },
        module: {
        rules: [
            {
                test: /.js$/,
                use: 'babel-loader'
            },
            {
                test: /.css$/,
                use: [
                    MiniCssExtractPlugin.loader,
                    'css-loader'
                ]
            },
            {
                test: /.less$/,
                use: [
                    MiniCssExtractPlugin.loader,
                    'css-loader',
                    'less-loader'
                ]
            },
        ]
    },

    output: {
      filename: '[name][chunkhash:8].js',
        path: __dirname + '/dist'
      },
      plugins: [
        + new MiniCssExtractPlugin({ 
          + filename: `[name][contenthash:8].css
        + });
      ]
};
```

`图片` 文件指纹使用`hash`设置，这个`hash` 不是指前面 js 的 hash 

其中后缀名称

|占位符名称|含义|
| :-----| :---- | 
|[ext]| 资源后缀名|
|[name]|文件名称|
|[path]|文件的相对路径|
|[folder]|文件夹所在的文件夹|
|[contenthash]|文件的内容 hash，默认是 md5 生成|
|[hash]|文件内容的 Hash，默认是 md5 生成|
|[emoji]|一个随机的指代文件内容emoj|


```js
const path = require('path');
module.exports = {
  entry: './src/index.js',
  output: {
    filename: 'bundle.js',
    path: path.resolve(__dirname, 'dist')
  },
  module: {
  rules: [
    {
    test: /\.(png|svg|jpg|gif)$/,
    use: [{
      loader: 'file-loader’,
      + options: {
      + name: 'img/[name][hash:8].[ext] '
      + } 
    }] 
  }]
  }
};
```


## 自动清理构建产物

每次构建的时候不会清理目录，造成构建的输出目录 output 文件越来越多。

命令行
```bash
rm -rf ./dist && webpaclk
rimraf ./dist && webpack
```

```bash
npm i clean-webpack-plugin -D
```

使用 `clean-webpack-plugin` 默认会删除 output 指定的输出目录

```js
  plugins:[ new CleanWebpackPlugin() ]
```

## css3的前缀增强

代码层面：

- 页面框架的初始化脚本
- 上报相关打点
- css内联避免页面闪动

请求层面：

- 小图片或者字体内联（url-loader）

`raw-loader` 内联 html

```bash
npm i raw-loader@0.5.1 -D
```

内联 html

```html
<script>${require('raw-loader!babel-loader!./meta.html') }</script>
```

内联 js

```html
<script>${require('raw-loader!babel-loader!../node_modules/lib-flexible') }</script>
```

内联 css


```bash
npm i style-loader -D
```

```js
module.exports = {
    module:{
        rules:[{
          test:/\.scss$/,
          use:[
            {
              loader:'style-loader',
              options:{
                insertAt:'top',
                singleton:true
              }
            },
            'css-loader',
            'sass-loader'
          ]
        }]
    }
}
```


## 多页面应用打包通用方案

多页应用好处

- 业务解耦
- 对 seo 友好

每个页面对应一个`entry`，一个 `html-webpack-plugin`

缺点：每次新增或删除页面需要更改 webpack 配置。

动态获取 entry 和设置 `html-webpack-plugin` 数量

利用 `glob.sync` 

```bash
npm i glob -D
```

```bash
entry:glob.sync(path.join(__dirname,'./src/*/index.js'))
```

## source map 

通过 source map 定位到源码

开发环境开启，线上环境关闭

- 线上排查问题的时候可以将 sourcemap 上传到错误监控系统。

- eval：不产生 sourcemap 文件，在包代码中会使用 eval 包裹来指定对应代码。
- source map：产生 .map 文件
- cheap：不包含列信息
- inline：将 map 作为 DataURI 嵌入，不单独生成 .map 文件
- module：包含 loader sourcemap

## 提取公共资源

利用 `splitChunksPlugin` 进行公共脚本分离

chunk 参数说明

- async 异步引入的库进行分离（默认）
- initial 同步引入的库进行分离
- all 所有引入的库进行分离（推荐）



```js
module.exports = {
    optimization: {
    splitChunks: {
      chunks: 'async',
      minSize: 20000,
      minRemainingSize: 0,
      maxSize: 0,
      minChunks: 1,
      maxAsyncRequests: 30,
      maxInitialRequests: 30,
      enforceSizeThreshold: 50000,
      cacheGroups: {
        defaultVendors: {
          test: /node_modules/,
          priority: -10,
          reuseExistingChunk: true
        },
        default: {
          minChunks: 2,
          priority: -20,
          reuseExistingChunk: true
        }
      }
    }
  }
};

  };
```


1. 分离基础包

test:匹配出需要分离的包，提取出来 `vendors` 需要把这个 chunk 放到 `html-webpack-plugin` 中的 `chunks` 中

```js
module.exports = {
    optimization: {
      splitChunks: {
      cacheGroups: {
        commons: {
        test: /(react|react-dom)/,
        name: 'vendors',
        chunks: 'all'
        } 
      }
    } 
  },
  plugins:[
      new htmlwebpackplugin({
        ...
        chunks:['vendors']
      })
    ],
};
```

2. 分离页面公共文件

minChunk：设置最小引用次数 
minuSize：分离的包体积的大小

```js
module.exports = {
    optimization: {
      splitChunks: {
      minSize: 0,
      cacheGroups: {
          commons: {
          name: 'commons',
          chunks: 'all',
          minChunks: 2 //这个包至少被其他地方引用2次
          } 
        } 
      } 
    }
  }
};
```


##  Scope Hoisting 

随着我们的模块的增多，那么最后打包出来的代码都是闭包包裹，导致体积增大，运行代码时创建的函数作用域变多，内存开销变大。

- 被 webpack 转换后的模块会带上一层包裹
- import 会被转义成 _webpack_require

如果在 mode = production 的时候就会自动开启

## 在 webpack 中使用 eslint

[用法地址](https://github.com/webpack-contrib/eslint-webpack-plugin)

```bash
npm install eslint-webpack-plugin --save-dev
```

## webpack 打包组件和打包库

webpack 除了可以用来打包应用，也可以用来打包 js 库。

比如：实现一个大整数加法库的打包。

- 需要打包压缩版和非压缩版本
- 支持 AMD/CJS/ESM 版本

支持方式

```js
// es module
import * as largeNumber from 'large-number'
// cjs
cosnt largeNumbers = require('large-number')
// amd
require(['large-number'],function(large-number){})
// script标签引入
<script src="xxx"/>
```

如何将库暴露出去？

- library：指定库的全局变量
- libraryTarget：支持库引入的方式

```js
output:{
  filename:'[name].js',
  library:'largeNumber',
  libraryExport:'default',
  libraryTarget:'umd' // var, this, global 等等 暴露出去的值的
}
```


## 构建配置抽离 npm 包

通用性
- 业务开发无需关注构建配置
- 统一团队构建脚本

可维护性
- 构建配置合理拆分
- README 文档，ChangeLog 文档等

质量
- 冒烟测试，单元测试，测试覆盖率
- 持续集成

## 多进程，多实例构建

- HappyPack (由于后续不维护了，所以替换 thread-loader)
- thread-loader
- parallel-webpack

(happyPack)[https://github.com/amireh/happypack#readme]
(thread-loader)[https://github.com/webpack-contrib/thread-loader]

happyPack

```js
const HappyPack = require('happypack');

exports.module = {
  rules: [
    {
      test: /.js$/,
      // 1) replace your original list of loaders with "happypack/loader":
      // loaders: [ 'babel-loader?presets[]=es2015' ],
      use: 'happypack/loader',
      include: [ /* ... */ ],
      exclude: [ /* ... */ ]
    }
  ]
};

exports.plugins = [
  // 2) create the plugin:
  new HappyPack({
    // 3) re-add the loaders you replaced above in #1:
    loaders: [ 'babel-loader?presets[]=es2015' ]
  })
];
```

thread-loader

```js
module.exports = {
  module: {
    rules: [
      {
        test: /\.js$/,
        include: path.resolve('src'),
        use: [
          'thread-loader',
          // your expensive loader (e.g babel-loader)
        ],
      },
    ],
  },
};
```

## 多进程多实例：并行压缩

在代码输出之前会有一个压缩阶段，可以通过多进程得压缩。

- terser-webpack-plugin 开启 parallel 参数

[terser-webpack-plugin](https://www.npmjs.com/package/terser-webpack-plugin)

```js
const TerserPlugin = require("terser-webpack-plugin");

module.exports = {
  optimization: {
    minimize: true,
    minimizer: [
      new TerserPlugin({
        parallel: 4,
      }),
    ],
  },
};
```


## 使用缓存来提升二次构建速度

缓存思路：

- babel-loader 开启缓存
- terser-webpack-plugin 开启缓存
- 使用 cache-loader 或者 **hard-source-webpack-plugin**

## 缩小构建目标

目的：尽可能少构建模块

比如 babel-loader 不解析 node_modules

```js
rules:[{
    test:/\.js$/,
    loader:'happypack/loader',
    exclude:'node_modules'
}]
```

减少文件搜索范围

- 优化 resolve.modules 配置（减少模块的搜索层级）
- 优化 resolve.mainFields 配置
- 优化 resolve.extensions 配置
- 合理使用 alias

```js
module.exports = {
    resolve:{
      alias:{
        react:path.resolve(__dirname,'./node_modules/react/dist/react.min.js'),
      },
      modules:[path.resolve(__dirname,'node_modules')],
      extensions:['.js'],
      mainFields:['main']
    }
}
```

## 使用 Tree Shaking 擦除无用的 js 和 css

- PurifyCSS：遍历代码，识别已经用到的 CSS class
- uncss: HTML 需要通过 jsdom 加载，所有的样式通过 PostCSS 解析，通过 document.querySelector 来识别在 html 文件里面不存在的选择器。



