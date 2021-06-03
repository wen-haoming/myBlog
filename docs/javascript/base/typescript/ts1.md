---
title: typescript - 快速上手
nav:
    path: /javascript/base
group:
    title: typescript
---

# Typescript

[官网](https://www.typescriptlang.org/)

一种写给人看的语言，最后顺便给机器编译然后运行一下。

# 安装和编译

下载

```bash
$ npm i typescript -g
```

编译

```bash
$ tsc helloworld.ts
$ tsc:watch # 编译并监听
$ tsc:build  # 编译
```

生成配置文件

```bash
tsc --init
```

以 procomponent 为例

```json
{
    "extends": "../../tsconfig.json", //继承(合并)自 ../../tsconfig.json 的配置
    "compilerOptions": {
        "baseUrl": "./", // 基于 baseUrl 目录 ，比如：import  xxx from 'xxx' = import xxx from 'baseUrl/xxx'
        "target": "esnext", // ts 编译形式
        "rootDir": "src", // 主文件夹
        "moduleResolution": "node",
        "jsx": "preserve",
        "esModuleInterop": true, // 选项的作用是支持使用import d from 'cjs'的方式引入commonjs包。 https://blog.csdn.net/juzipidemimi/article/details/103438437
        "experimentalDecorators": true, //启用实验性的ES装饰器。
        "strict": true,
        "forceConsistentCasingInFileNames": true, //不允许不一致包装引用相同的文件
        "noImplicitReturns": true, //不是函数的所有返回路径都有返回值时报错。
        "suppressImplicitAnyIndexErrors": true, //e 阻止--noImplicitAny对缺少索引签名的索引对象报错
        "declaration": true, //生成相应的'.d.ts'文件
        "skipLibCheck": true, // 忽略所有的声明文件（*.d.ts）的类型检查。
        "paths": {
            //模块名到基于baseUrl的路径映射的列表
            "@ant-design/pro-layout": ["./packages/layout/src/index.tsx"],
            "@ant-design/pro-form": ["./packages/form/src/index.tsx"],
            "@ant-design/pro-table": ["./packages/table/src/index.tsx"],
            "@ant-design/pro-field": ["./packages/field/src/index.tsx"],
            "@ant-design/pro-skeleton": ["./packages/skeleton/src/index.tsx"],
            "@ant-design/pro-list": ["./packages/list/src/index.tsx"],
            "@ant-design/pro-provider": ["./packages/provider/src/index.tsx"],
            "@ant-design/pro-descriptions": [
                "./packages/descriptions/src/index.tsx"
            ],
            "@ant-design/pro-utils": ["./packages/utils/src/index.tsx"],
            "@ant-design/pro-card": ["./packages/card/src/index.tsx"]
        }
    },
    "include": [
        //编译时需要包含
        "**/src/**/*",
        "**/docs/**/*",
        "scripts/**/*",
        "**/demos",
        ".eslintrc.js",
        "tests",
        "jest.config.js",
        "**/fixtures",
        "./tests/no-duplicated.ts"
    ]
}
```

## 基本注解

```ts
const num: number = 123;
function identity(num: number): number {
    return num;
}
```

## 数据类型

-   原始类型
    -   布尔类型（boolean）
    -   数字类型（number）
    -   字符串类型（string）
    -   symbol（Symbol）
-   数组 Array
-   对象 [object](https://www.typescriptlang.org/docs/handbook/basic-types.html#object)
-   特殊类型
    -   any
    -   null
    -   undefined
    -   void
    -   [unknown](https://www.typescriptlang.org/docs/handbook/2/functions.html#unknown)：[知乎一篇文章很好解释](https://zhuanlan.zhihu.com/p/104296850)，[例子](https://www.typescriptlang.org/play?#code/GYVwdgxgLglg9mABAQwBQCMBcBBATr5ATwB4BnKXGMAcwD4BKAbwChFEZgMA6AGwFMaUABaIAvOMQAGJqzaJcfKCFxIAjACYAzLIC+fHqT7tO6XgOrCxE1TLnzFypAHJyuJ7v2GWdhUpWIKED5dZh1mZn4oRAA3ZB4xFFQAbSdVJwBdeiA)
    -   never
-   [内联类型注解](#内联类型注解)
-   [关键字](#关键字)
    -   keyof
    -   in
    -   extends
-   [类型断言](#类型断言)
-   [类型保护](#类型保护)
    -   typeof
    -   instanceof
-   [联合类型 Union Types](#联合类型)
-   [交叉类型 Intersection Types](#交叉类型)
-   [元组类型 Tuple](#元组类型)
-   [枚举类型 enum](#枚举类型)
-   [函数 function](#函数)
-   [接口 interface](#接口)
-   [泛型 generic](#泛型)
-   [类型别名 type alias](类型别名)
-   [内置高级类型](#内置高级类型)

[type 和 interface 的区别](https://stackoverflow.com/questions/37233735/typescript-interfaces-vs-types)
[Typescript 有什么冷门但是很好用的特性？](https://www.zhihu.com/question/276172039/answer/385498094)

## 类型注解

(变量/函数): type // [type 为上面的数据类型 ]

```ts
// 布尔
let married: boolean = false;

// 数字
let age: number = 10;

// 字符串
let firstname: string = 'zfpx';

let s: symbol = Symbol(1);

// 数组（两种形式）
let arr2: number[] = [4, 5, 6];
let arr3: Array<number> = [7, 8, 9];

// 元祖（不能越界）
let zhufeng: [string, number] = ['zhufeng', 5];
zhufeng[0].length;
zhufeng[1].toFixed(2);

// undefined 如果一个值声明了 undefined , 则不能赋值给其他类型的值.
let x: undefined = undefined; //正常
let y: undefined = '1'; //报错

// undefined 和 null 也不能赋值给其他类型
let h: number = undefined; // 报错, 如果 strictNullChecks 为 true

// 在 tsconfig.json 中将 strictNullChecks 设置为 false 即可（不推荐）
// 使用联合类型（推荐）
let num: number | undefined | null = 111; //正常
let num: number | undefined | null = undefined; //正常

// 能不写 any 就不写 any

// never
// 返回never的函数 必须存在 无法达到（ unreachable ） 的终点
function error(message: string): never {
    throw new Error(message);
}
// 返回never的函数 必须存在 无法达到（ unreachable ） 的终点
function infiniteLoop(): never {
    while (true) {}
}
```

## 内联类型注解

内联类型能为你快速的提供一个类型注解。它可以帮助你省去为类型起名的麻烦（你可能会使用一个很糟糕的名称）。然而，如果你发现需要多次使用相同的内联注解时，那么考虑把它重构为一个接口（或者是 type alias，它会在接下来的部分提到）是一个不错的主意。

[官网试一下](https://www.typescriptlang.org/play?#code/GYVwdgxgLglg9mABKSAKADgJzugzgLgG8BDfXKTGMAcwBoAjMiq6gXwEpCAoRXxTAKZQQmJFhy4urLlwA2QxADdisxAF5k4CKhL4A5AEY9DfQCY9HIA)

```ts
function func(props: { a: string; b: string }) {
    return props;
}

let val = func({ a: '1', b: '2' });
```

## 关键字

[never 与 keyof 的妙用](https://juejin.cn/post/6844903826558812167)

```ts
// 1. keyof ypescript的keyof关键字，将一个类型映射为它所有成员名称的联合类型
interface Person {
    name: string;
    age: number;
    location: string;
}

type K1 = keyof Person; // "name" | "age" | "location"
type K2 = keyof Person[]; // "length" | "push" | "pop" | "concat" | ...
type K3 = keyof { [x: string]: Person }; // string

// 2. in 用来遍历枚举类型：
type Keys = 'a' | 'b' | 'c';

type Obj = {
    [p in Keys]: any;
}; // -> { a: any, b: any, c: any }

// 3. extends 有时候我们定义的泛型不想过于灵活或者说想继承某些类等，可以通过 extends 关键字添加泛型约束。

interface ILengthwise {
    length: number;
}

function loggingIdentity<T extends ILengthwise>(arg: T): T {
    console.log(arg.length);
    return arg;
}
```

## 函数

函数定义

```ts
// 定义函数参数
function hello(name: string): void {
    console.log('hello', name);
}

hello('xiaoming');

// 没有返回值
let hello2 = function(name: string): void {
    console.log('hello2', name);
    return undefined;
};
hello2('xiaoming');

// 可选参数
function print(name: string, age?: number): void {
    console.log(name, age);
}
print('xiaoming');

// 默认参数
function ajax(url: string, method: string = 'GET') {
    console.log(url, method);
}
ajax('/users');

// 剩余参数
function sum(...numbers: number[]) {
    return numbers.reduce((val, item) => (val += item), 0);
}
console.log(sum(1, 2, 3));
```

问题：什么是函数重载

```ts
// 函数重载，当前函数可能有几张传参形式，有可能是一个参数得出不同结果，有可能是两个参数得出不同结果

let obj: any = {};
function attr(str: string): string;
function attr(str: string, num: number): [string, number];

function attr(str: string, num?: number): any {
    if (typeof str === 'string') {
        return str;
    } else {
        return [str, num];
    }
}

let val = attr('1'); // 自动判断为 string
let val2 = attr('1', 2); // 自动判断为 array
```

-   多种定义函数的形式

```ts
// 函数声明
let obj: any = {};

function attr(str: string): string;
function attr(str: string, num: number): [string, number];

function attr(str: any, num?: any): any {
    if (typeof str === 'string') {
        return str;
    } else {
        return [str, num];
    }
}

let aa = attr('1'); // 自动判断为 string
let bb = attr('1', 2); // 自动判断为 [string,number];

// 表达式
type LongHandAllowsOverloadDeclarations = {
    (str: string): string;
    (str: string, num: number): [string, number];
};

interface LongHandAllowsOverloadDeclarations2 {
    (str: string): string;
    (str: string, num: number): [string, number];
}

const func: LongHandAllowsOverloadDeclarations = (a: any) => {
    return a;
};

let val = func('1'); // 自动判断为 string
let val2 = func('1', 1); // 自动判断为 [string,number];
```

## 类型断言

有时候依靠类型推断并不能完全得出我想要的类型，而且该类型可能不准确，等等，这时候需要使用类型断言。

```ts
1. as 语法
interface Foo {
    bar: number;
    bas: string;
}

const foo = {} as Foo;
foo.bar = 123;
foo.bas = 'hello';

2. 尖括号形式
let someValue: any = "this is a string";
let strLength: number = (<string>someValue).length;
```

## 类型保护

### typeof

```ts
function doSome(x: number | string) {
    if (typeof x === 'string') {
        // 在这个块中，TypeScript 知道 `x` 的类型必须是 `string`
        console.log(x.subtr(1)); // Error: 'subtr' 方法并没有存在于 `string` 上
        console.log(x.substr(1)); // ok
    }
    x.substr(1); // Error: 无法保证 `x` 是 `string` 类型
}
```

## 接口

接口可以定义一个集合，函数，还有类

```ts
//1. 可选属性
interface SquareConfig {
    color?: string;
    width?: number;
}

//2. 只读属性
interface Point {
    readonly x: number;
    readonly y: number;
}

//3. 额外的属性检查
interface SquareConfig {
    color?: string;
    width?: number;
}

function createSquare(config: SquareConfig): any {
    // ...
}

let mySquare = createSquare({ colour: 'red', width: 100 });
// 但是上面会报错错误 Argument of type '{ colour: string; width: number; }' is not assignable to parameter of type 'SquareConfig'
// 这时候我们就需要使用 字符串索引签名

//4. 可索引的类型 - 字符串索引签名
interface SquareConfig {
    color?: string;
    width?: number;
    [str: string]: any; // 字符串索引签名
}

function createSquare(config: SquareConfig): any {
    // ...
}

let mySquare = createSquare({ colour: 'red', width: 100 });

//5. 可索引的类型 - 数字索引签名
interface StringArray {
    [index: number]: string;
}

let myArray: StringArray;
myArray = ['Bob', 'Fred'];

let myStr: string = myArray[0];

//6. 继承接口
interface Shape {
    color: string;
}

interface Square extends Shape {
    sideLength: number;
}

let square = <Square>{};
square.color = 'blue';
square.sideLength = 10;

//7. 继承接口 - 继承多个接口
interface Shape {
    color: string;
}

interface PenStroke {
    penWidth: number;
}

interface Square extends Shape, PenStroke {
    sideLength: number;
}

let square = {} as Square;
square.color = 'blue';
square.sideLength = 10;
square.penWidth = 5.0;
```

## 泛型

软件工程中，我们不仅要创建一致的定义良好的 API，同时也要考虑可重用性。 组件不仅能够支持当前的数据类型，同时也能支持未来的数据类型，这在创建大型系统时为你提供了十分灵活的功能。

### 各种表达式下泛型的使用形式

```ts
// 1. 函数声明定义泛型
function identity(arg: number): number {
    return arg;
}
function identity<T>(arg: T): T {
    return arg;
}
// 使用
let output = identity<string>('myString');

function loggingIdentity<T>(arg: T[]): T[] {
    console.log(arg.length); // Array has a .length, so no more error
    return arg;
}

// 2. 函数表达式定义泛型
let func: <T>(str: T) => T = str => str;

// 使用
func<string>('string');

// 2. interface 中定义泛型
interface GenericIdentityFn<Type> {
    (arg: Type): Type;
}

// 使用
function identity<Type>(arg: Type): Type {
    return arg;
}

let myIdentity: GenericIdentityFn<number> = identity;

// 3. 类型别名使用泛型
type Dog<T> = { name: string; type: T };
const dog: Dog<number> = { name: 'ww', type: 20 };

// 4. 泛型类
class Cat<T> {
    private type: T;
    constructor(type: T) {
        this.type = type;
    }
}
// 使用
const cat: Cat<number> = new Cat<number>(20); // 或简写 const cat = new Cat(20)
```

泛型的语法格式简单总结如下：

```
类型名<泛型列表> 具体类型定义
```

### 泛型约束

有时候，我们希望类型变量对应的类型上存在某些属性。这时，除非我们显式地将特定属性定义为类型变量，否则编译器不会知道它们的存在。

```ts
function identity<T>(arg: T): T {
    console.log(arg.length); // Error
    return arg;
}

interface Length {
    length: number;
}

function identity<T extends Length>(arg: T): T {
    console.log(arg.length); // 可以获取length属性
    return arg;
}
```

### 泛型条件

extends，其实也可以当做一个三元运算符，如下：

```ts
T extends U? X: Y
```

举个例子，如果我们把 `X` 换成 `T`，如此形式：`T extends U? T: never`。

此时返回的 `T`，是满足原来的 `T` 中包含 `U` 的部分，可以理解为 `T` 和 `U` 的交集。

### 泛型推断 infer

## 泛型工具

### Partial<T>

能够把泛型中的所有属性变成可选

```ts
type Partial<T> = {
    [key in keyof T]?: T[key];
};
```

```ts
type Animal = {
    name: string;
    category: string;
    age: number;
    eat: () => number;
};
```

使用 `Partial` 后

```ts
type PartOfAnimal = Partial<Animal>;
const partOfAnimal: PartOfAnimal = { category: 'str' }; //不会报警告，能够只使用一种类型

const obj: Record<string, string | number> = {
    name: 'zhangsan',
    tag: '打工人',
};
```

### Pick

此工具的作用是将 T 类型中的 K 键列表提取出来，生成新的子键值对类型。

```ts
type Pick<T, K extends keyof T> = {
    [P in K]: T[P];
};
```

```ts
type Animal = {
    name: string;
    category: string;
    age: number;
    eat: () => number;
};
```

使用 `Pick` 后

```ts
// 组合成一个新的属性集合只有 name 和 age
const bird: Pick<Animal, 'name' | 'age'> = { name: 'bird', age: 1 };
```

### Record<K, T>

它会将一个类型的所有属性值都映射到另一个类型上并创造一个新的类型

```ts
type Record<K extends keyof any, T> = {
    [key in K]: T;
};
```

```ts
type petsGroup = 'dog' | 'cat' | 'fish';
interface IPetInfo {
    name: string;
    age: number;
}
```

使用 `Record` 后

```ts
type IPets = Record<petsGroup, IPetInfo>;

const animalsInfo: IPets = {
    dog: {
        name: 'dogName',
        age: 2,
    },
    cat: {
        name: 'catName',
        age: 3,
    },
    fish: {
        name: 'fishName',
        age: 5,
    },
};
```

### Exclude<T, U>

此工具是在 T 类型中，去除 T 类型和 U 类型的交集，返回剩余的部分。

```ts
type Exclude<T, U> = T extends U ? never : T;
```

源码中可以理解为当 T 存在 U 的时候就不返回，如果不存在的属性时候就返回 T，也就是不是交集的属性。

使用 `Exclude` 后

```ts
type T1 = Exclude<'a' | 'b' | 'c', 'a' | 'b'>; // "c"
type T2 = Exclude<string | number | (() => void), Function>; // string | number
```

### Omit<T, K>

此工具可认为是适用于键值对对象的 Exclude，它会去除类型 T 中包含 K 的键值对。

```ts
type Pick<T, K extends keyof T> = {
    [P in K]: T[p];
};
type Exclude<T, U> = T extends U ? never : T;

type Omit = Pick<T, Exclude<keyof T, K>>;
```

使用 `Omit` 后

```ts
type Animal = {
    name: string;
    category: string;
    age: number;
    eat: () => number;
};
const OmitAnimal: Omit<Animal, 'name' | 'age'> = {
    category: 'lion',
    eat: () => {
        console.log('eat');
    },
};
```

### ReturnType

能够获取函数的返回值类型

```ts
type ReturnType<T extends (...args: any) => any> = T extends (
    ...args: any
) => infer R
    ? R
    : any;
```

使用 `ReturnType` 后

```ts
function foo(x: string | number): string | number {
    /*..*/
}
type FooType = ReturnType<foo>; // string | number
```

## 模块 - module

### AMD

```js
define(['require', 'exports', './constants'], function(
    require,
    exports,
    constants_1,
) {
    'use strict';
    Object.defineProperty(exports, '__esModule', { value: true });
    exports.twoPi = void 0;
    exports.twoPi = constants_1.valueOfPi * 2;
});
```

### UMD

```js
(function(factory) {
    if (typeof module === 'object' && typeof module.exports === 'object') {
        var v = factory(require, exports);
        if (v !== undefined) module.exports = v;
    } else if (typeof define === 'function' && define.amd) {
        define(['require', 'exports', './constants'], factory);
    }
})(function(require, exports) {
    'use strict';
    Object.defineProperty(exports, '__esModule', { value: true });
    exports.twoPi = void 0;
    const constants_1 = require('./constants');
    exports.twoPi = constants_1.valueOfPi * 2;
});
```

### ESNext

```js
import { valueOfPi } from './constants';
export const twoPi = valueOfPi * 2;
```
