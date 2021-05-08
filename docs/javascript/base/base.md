---
title: 语言概述
nav:
    title: 语言概述
    path: /javascript/base
order: 2
---

# JavaScript 语言

> 本文的目的更多是建立知识点的快速检索，详细内容还是需要阅读[书籍](https://book.douban.com/subject/35175321/)，另外还会穿插很多额外的知识点来帮助理解。

## JavaScript 的概述

-   JavaScript 实现
    -   核心(ECMAScript)
    -   文档对象模型(DOM)
    -   浏览器对象模型(BOM)

[ECMAScript](https://www.ecma-international.org/publications-and-standards/standards/ecma-262/)，即 ECMA-262 定义的语言，并不局限于 Web 浏览器。事实上，这门语言没有输入和 输出之类的方法。ECMA-262 将这门语言作为一个基准来定义，以便在它之上再构建更稳健的脚本语言。 Web 浏览器只是 ECMAScript 实现可能存在的一种`宿主环境(host environment)`。

[DOM](https://developer.mozilla.org/zh-TW/docs/Web/API/Document_Object_Model) 是一个应用编程接口(API)，用于在 HTML 中使 用扩展的 XML。DOM 将整个页面抽象为一组分层节点。HTML 或 XML 页面的每个组成部分都是一种 节点，包含不同的数据。

[BOM](https://developer.mozilla.org/zh-CN/docs/Web/API/Window) 使用 BOM，开发者可以操控浏览器显示页面之外的部分。而 BOM 真正独一无二的地方，当然也是 问题最多的地方，就是它是**唯一一个没有相关标准的 JavaScript 实现**。**HTML5** 改变了这个局面，这个版本的 HTML 以正式规范的形式涵盖了尽可能多的 BOM 特性。由于 HTML5 的出现，之前很多与 BOM 有关的问题都迎刃而解了。

## 语言基础（基于 ECMAScript 第 6 版）

-   Javascript
    -   运行时 (Runtime)
        -   数据结构
            -   类型
                -   对象
            -   实例
                -   应用和机制
        -   执行过程（算法）
            -   事件循环
            -   微任务的执行
            -   函数的执行
            -   语句级执行
    -   文法 (Grammar)
        -   词法 (Lexical)
        -   语法 (Grammar)
    -   语义 (Semantics)

### 语法

1. 区分大小写
2. 标识符
3. 注释
4. 严格模式
5.
