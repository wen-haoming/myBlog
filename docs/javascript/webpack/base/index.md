---
title: webpack4基础以及优化方案
nav:
  title: webpack4基础
  path: /javascript/webpack
group:
  title: webpack4基础以及优化方案
  order: 1
---

# webpack4安装

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

