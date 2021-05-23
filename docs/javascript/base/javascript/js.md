---
title: 词法，类型
nav:
    title: 词法，类型
    path: /javascript/base
order: 2
group:
    title: 重学前端
---

# javascript Atom（原子 ⚛）

## Unicode 👀

> 统一码，也叫万国码、单一码（Unicode）是计算机科学领域里的一项业界标准，包括字符集、编码方案等。Unicode 是为了解决传统的字符编码方案的局限而产生的，它为每种语言中的每个字符设定了统一并且唯一的二进制编码，以满足跨语言、跨平台进行文本转换、处理的要求。1990 年开始研发，1994 年正式发布 1.0 版本，2020 年发布 13.0 版本。

[Unicode](https://www.fileformat.info/info/unicode/)

0-128 的区间是最重要的区间，就是我们常见的 ASCII 所兼容的部分

<code src="./demo/js.tsx" />

## 什么是 unicode 的 [BMP](https://zh.wikipedia.org/wiki/Unicode%E5%AD%97%E7%AC%A6%E5%B9%B3%E9%9D%A2%E6%98%A0%E5%B0%84)

> Basic Multilingual Plane，简称`BMP`，中文名称是 `基本多文种平面`(基本字符平面) ，区间在 `U+0000 - U+FFFF` (4 位 16 进制),如果超过了 4 位 16 进制位的都是非 BMP

在 javascript 中，`String.fromCharCode` 这个 api 只能处理 BMP 区间的 ，但是如果超过了 BMP 的区间的话，就需要使用 `String.formCodePoint` 和 `''.codePointAt`

但是我们为什么要注意这些区别呢？

[Unicode](https://home.unicode.org/)

因为现在出现了 `emoji` 😈，这种字符的出现已经超过了过去所定义的 4 位 16 进制的格式，，所以在 javascript 中处理这里的字符，需要考虑 `api的兼容性` 问题

<Alert>
最佳实践：为了良好习惯，解析码点的时候最好使用 <strong>codePointAt</strong> 或者 <strong>String.formCodePoint</strong> 来避免兼容性问题。 😄
</Alert>

## javascript 的转义符号

[相关内容](https://es6.ruanyifeng.com/#docs/string#%E5%AD%97%E7%AC%A6%E7%9A%84-Unicode-%E8%A1%A8%E7%A4%BA%E6%B3%95)

过去在 javascript 中的字符串里，使用转义 `\u` + `4位16进制`的码点能够表示对应的字符，譬如

```js
// 字母

// 汉字
'\u5c0f\u660e' === '小明'; // ✅

// 空格
'\u0020' === ' '; // ✅

// es5 emoji
'\u1f604' === '😄'; // ❌ 这是因为字符已经超过了4位的16进制，针对这种情况 es6 采取以下大括号表示法

// es6 emoji
'\u{1f604}' === '😄'; // ✅
```

以上这几种方式都能够在 javascript 中的字符串表示的形式。

## 为啥最好不要用中文作为变量名（不要用 ASCII 以外的字符放在源码里）？

```js
let 小明 = '我是小明';

console.log(小明);
```

其中就涉及到文件的字符编码的问题，而且在 `不同环境下是非常复杂，会导致不同的问题`，但是如果想这么做，最好使用 `\u` 转义来解决

```js
'小明'.charCodeAt(0).toString(16); // 5c0f
'小明'.charCodeAt(1).toString(16); // 660e

let \u5c0f\u660e === '我是小明';

console.log(小明) // 我是小明
```

## javascript Lexical Grammar（词法）

> ecma262 702 page

<!-- ### InputElementDiv -->

-   WhiteSpace（空白）
-   LineTerminator（回车）
-   Comment（注释）
-   Token（词）
    -   IdentifierName
        -   Keywords
        -   Identifier
        -   Future revered Keywords
    -   Punctuator
    -   Literal
        -   Number
        -   String
        -   Boolean
        -   Object
        -   Null
        -   Undefined
        -   Symbol

### WhiteSpace（空白符）

> ecma262 160 page

-   WhiteSpace
    -   \<TAB>
    -   \<VT>
    -   \<FF>
    -   \<SP>
    -   \<NBSP>
    -   \<ZWNBSP>
    -   \<USP>

1.`<TAB>`： `制表符`在 javascript 中字符串的表示 `\t`，在 unicode 中码点在 `'\t'.codePointAt()` 9 这个位置，但是从社区的流行程度来说，更多人会使用 4 个 space 空白字符来代替一个 tab 字符。

[写代码时，缩进使用 tab 还是空格？](https://www.zhihu.com/question/19960028)

在 vscode 中 打开 setting 关掉 Use Tab Stops 就可以用 space 来代替 tab。

2.`<VT>`：`纵向制表符`，在 javascript 中字符串的表示 `\v`，码点为 `011` `U+00b`，但是这个符号已经没有排版系统所采纳。

3.`<FF>`：`换页符`，在 javascript 中字符串的表示 `\f`，码点为 `012` `U+00c`。

4.`<SP>`：`空白符`，在 javascript 中字符串的表示 ``，码点为 `032` `U+0020`，这个字符的重要性不用多讲（其中还有 `<LF>` 换行符同样重要 `\n` `U+010`）。

5.`<NBSP>`：`不换行空格`（no-break space，NBSP）是`空格字符`，用途是禁止自动换行。HTML 页面显示时会自动合并多个连续的空白字符（whitespace character），但该字符是禁止合并的，因此该字符也称作“硬空格”（hard space、fixed space）。Unicode 码点为：`U+00A0` no-break space。

6.`<ZWNBSP>`：`零宽空格`（zero-width space, ZWSP）是一种不可打印的 Unicode 字符，用于可能需要换行处。在 HTML 页面中，零宽空格可以替代。但是在一些网页浏览器（例如 Internet Explorer 的版本 6 或以下）不支持零宽空格的功能。

<Alert type="info">
最佳实践：在我们编码的过程中，最好只使用 <strong>space</strong> 空白符，尽量减少其他类型空白的字符，导致其他的错误。
</Alert>

### Line Terminators（行终止符）

> ecma262 161 page

-   LineTerminator

    -   \<LF>
    -   \<CR>
    -   \<LS>
    -   \<PS>

    1.`<LF>`：`换行符`（Linefeed） 这种在 javascript 中字符串的表示 `\n`，码点为 `00a` `U+000a`，这个字符的重要性不用多讲。

    2.`<CR>`：`回车符`（Carriage Return）这种在 javascript 中字符串的表示 `\r`，码点为 `\u000d`。

> 在团队中，有部分的小伙伴的换行格式为 `<CRLF>`，是 carriage return line feed 的缩写，中文意思就是 回车换行，这是 windows 下默认的，为了团队的一致性，现在通常我们都会以`<LF>` 为结尾，配合 git 我们可以轻松实现提交时的强制转换。

[相关地址](https://docs.github.com/en/github/getting-started-with-github/configuring-git-to-handle-line-endings)

```bash
$ git config --global core.autocrlf input
```

### Comment（注释）

> ecma262 162 page

-   Comment
    -   MultiLineComment（多行注释）/_ xxx _/
    -   SingleLineComment（单行注释） // xxx

不支持以下这种注释嵌套

```js
/*/**/*/
```

### Literal

#### [Number](https://developer.mozilla.org/zh-CN/docs/Web/JavaScript/Reference/Global_Objects/Number)

```
// 下图采用大端表示，高位在左，低位在右。

sign  exponent         fraction
+---+----------+---------------------+
| 1 |   2~12   |         13~64       |
+---+----------+---------------------+
```

> IEEE 754 Double Float
>
> -   Sign(1) 符号位：高位第 1 位
> -   Exponent(11) 指数位：高位第 2~12 位
> -   Fraction(52) 尾数位：剩下的 fraction 部分

[揭秘 0.1 + 0.2 != 0.3](https://www.barretlee.com/blog/2016/09/28/ieee754-operation-in-js/)

##### Numeber - Grammar

> ecma262 166 page

-   NumericLiteral
    -   DecimalLiteral（小数表示）`0`，`0.`，`.2`，`1e3 = 1000`
    -   BinaryIntegerLiteral（2 进制） `0b111`
    -   OctalIntegerLiteral（8 进制）`0o10`
    -   HexIntegerLiteral（16 进制）`0xFF`

最佳实践

-   安全的整数范围

```js
Number.MAX_SAFE_INTEGER.toString(16);
// "1fffffffffffff"
```

-   浮点数的比较（如果小于）js 的最小精度，通过比较如果两个值相减后小于等于最小精度可以认为这两个值是相等。

```js
Math.abs(0.1 + 0.2 - 0.3) <= Number.EPSILON;
// true
```

**不过最好的方式还是转为整数进行比较。**

#### [String](https://developer.mozilla.org/zh-CN/docs/Web/JavaScript/Reference/Global_Objects/String)

-   ASCII
-   Unicode
-   UCS U+0000 - U+FFFF（BMP 的范围）
-   GB
    -   GB2312
    -   GBK(GB13000)
    -   GB18030
-   ISO-8850
-   BIG5

[背景理解](https://www.zhihu.com/question/23374078/answer/69732605)

早期基本上就需要字符串的文本，还需要字符串的编码方式，所以市面上会有各种中文编码软件

在 javascript 中只承认 `Unicode` 这种编码形式，不过更加准确来说是 `USC`（BMP），因为超出了 `BMP` 范围就是两个字符，需要使用 `codePointAt` 去解析。

Unicode 的编码 - UTF

```bash
UTF 8 和 UTF 16 分别存 a b 两个字符的区别

UTF 8   01100001 01100010
        -------- --------
            |        |
            a        b
UTF 16  00000000 01100001 00000000 01100010
        ----------------- -----------------
                |                 |
                a                 b
```

<Alert >
但是有人可能会问，如果在 js 中如果采用 UTF-16的形式，存储 ASCII 的相关字符不就很浪费？所以 UFT-8 和 UTF16 编码方式不能灵活一点吗？
</Alert>

答案肯定是灵活的，它们都不是固定长度~

[知乎上面有对应的解释](https://www.zhihu.com/question/23374078/answer/24385963)

##### String-Grammar

> ecma262 170 page

-   "abc"
-   'abc'
-   `abc`

还有反斜杠一起配合的几种形式 `'"\bfnrtv`

```
Escape Sequence     Code Unit Value         Unicode Character Name          Symbol
    \b                  0x0008                  BACKSPACE                    <BS>
    \t                  0x0009                  CHARACTER TABULATION         <HT>
    \n                  0x000A                  LINE FEED (LF)               <LF>
    \v                  0x000B                  LINE TABULATION              <VT>
    \f                  0x000C                  FORM FEED (FF)               <FF>
    \r                  0x000D                  CARRIAGE RETURN (CR)         <CR>
    \"                  0x0022                  QUOTATION MARK                 "
    \'                  0x0027                  APOSTROPHE                     '
    \\                  0x005C                  REVERSE SOLIDUS                \
```
