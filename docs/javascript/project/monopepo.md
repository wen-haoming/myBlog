---
title: monorepo
toc: menu
nav:
    title: monorepo
    path: /javascript/project
---

#### 标签测试 <Badge>Hello</Badge>

# 如何使用 yarn + monorepo 快速启动一个项目

> 关于为什么使用 monorepo 和它的优点，本文不做太多解释，本文只做如何依靠 [lerna](https://github.com/lerna/lerna) 来搭建 monorepo 的项目。

## yarn+ monorepo 的管理方式

-   monorepo 是管理项目的一种方式，主要是一个仓库中管理多个模块/包。
-   monorepo 主要的好处是统一工作流和代码共享，主要依靠两个方案
    -   yarn 和 lerna 一起配合
    -   单独使用 lerna
-   [lerna](https://github.com/lerna/lerna) 项目管理，是统一多个 npm 模块的工具，维护多个包的工作流，解决包的的互相依赖，发布，以及维护等问题。
-   [yarn](https://yarn.bootcss.com/) 包管理器，依靠 **workspace** 给子包创建软链 `yarn install`，当然你不用 yarn，只使用 lerna 的 bootstarp 也可以。

### 项目搭建

## 全局下载 leana

```bash
npm install --global lerna
```

## git 初始化仓库

```bash
git init lerna-repo && cd lerna-repo
```

## lerna 初始化项目

```bash
lerna init
```

项目初始化后就得到了一些配置文件

```bash
├── lerna.json # lerna 的配置
├── package.json # 根 package.json 默认是不发布的
└── packages # 管理里面的 package

1 directory, 2 files
```

package.json

```json
{
    "name": "root",
    "private": true, // 因为根目录的 package 是不发送到 npm 的，只发送 package 的包
    "devDependencies": {
        "lerna": "^3.22.1"
    }
}
```

## yarn 的 workspace

workspace 是除缓存外 yarn 区别于 npm 最大的优势（高版本的 npm 也有了 workspace）

-   workspace 的作用：
    -   整个工程都是共享一份 node_modules 的依赖，子项目能够自动寻找根目录的包
    -   由于 node_modules 都是一份，所以 yarn lock 能够很好把全部的版本给锁定

```diff
{
  "name": "root",
  "private": true,
+  "workspaces": [
+        packages/*"
+  ]
  "devDependencies": {
    "lerna": "^3.22.1"
  }
}

```

-   `yarn install` 有两个作用
    -   安装 lerna 和它的依赖
    -   根目录的 node_modules 里创建软链接，链向各个 package 各个包

## 创建子项目

```bash
lerna crate <project>
```

注意 `entry point` 的选项,是暴露到其他模块所连接的入口

## 给子项目安装依赖

```bash
yarn workespace <project> add <package>
```

如果在根目录上安装或者删除依赖

```bash
yarn add <package> # 失败
yarn remove <package> # 失败

yarn add <package> --ignore-workspace-root-check # 需要上 --ignore-workspace-root-check
yarn remove <package> --ignore-workspace-root-check # 需要上 --ignore-workspace-root-check
```

## 子项目的构建

确保项目中 **npm script** 中有 `build` 的命令

我们可以自己构建拓扑排序规则，很不幸的是 yarn 的 workspace 暂时并未支持按照拓扑排序规则执行命令,虽然该 rfc 已经被 accepted，但是尚未实现, 幸运的是 lerna 支持按照拓扑排序规则执行命令, --sort 参数可以控制以拓扑排序规则执行命令

```bash
lerna run --stream --sort build
```

## 构建清理

-   普通项目： 直接删除 node_modules 以及编译后的产物。

-   monorepo： 不仅需要删除 root 的 node_modules 的编译产物还需要删除各个 package 里的 node_modules 以及编译产物

```bash
lerna clean -y #根目录的 npm script 上
```

## 项目发布

```bash
lerna publish
```

但是执行这个命令的话，随便修改一个都会自动修改版本号，那么我们想修改部分文件不想下次提交不会改动版本号呢？

比如，我每次修改 md 文件后，发布代码不想变更版本号，在 package.json 中

```diff
  "scripts": {
    "clean":"lerna clean -y"
  },
+ "ignoreChanges": [
+    "**/*.md"
+  ],
  "devDependencies": {
    "commitizen": "^4.2.3",
    "cz-lerna-changelog": "^2.0.3",
    "lerna": "^3.22.1"
  }
```

## yarn 常用的命令

| 描述               | 命令                                                                     |
| ------------------ | ------------------------------------------------------------------------ |
| 查看工作空间信息   | yarn workspaces info                                                     |
| 给根空间添加依赖   | yarn add <package> --ignore-workspace-root-check                         |
| 给某个项目添加依赖 | yarn workespace <project> add <package>                                  |
| 删除所有的         | node_modules lerna clean 等于 yarn workspaces run clean                  |
| 安装和 link        | yarn install # 等价于 lerna bootstrap --npm-client yarn --use-workspaces |
| 重新获取所有的     | node_modules yarn install --force                                        |
| 查看缓存目录       | yarn cache dir                                                           |
| 清除本地缓存       | yarn cache clean                                                         |

<br/>
<br/>
<br/>
<br/>
<br/>

> 文章参考： https://blog.csdn.net/i10630226/article/details/99702447
