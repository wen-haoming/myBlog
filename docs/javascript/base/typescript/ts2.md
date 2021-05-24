---
title: 项目应用
nav:
    title: 项目应用
    path: /javascript/base
group:
    title: typescript
writing: true
---

# Typescript

[官网](https://www.typescriptlang.org/)

 一种写给人看的语言，最后顺便给机器运行一下。

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

```json
{
    "compilerOptions": {
        /* Basic Options */
        "target": "es5" /* Specify ECMAScript target version: 'ES3' (default), 'ES5', 'ES2015', 'ES2016', 'ES2017','ES2018' or 'ESNEXT'. 指定ECMAScript的目标版本*/,
        "module": "commonjs" /* Specify module code generation: 'none', 'commonjs', 'amd', 'system', 'umd', 'es2015', or 'ESNext'. 指定模块代码的生成方式*/
        // "lib": [],                             /* Specify library files to be included in the compilation. 指定编译的时候用来包含的编译文件*/
        // "allowJs": true,                       /* Allow javascript files to be compiled. 允许编译JS文件*/
        // "checkJs": true,                       /* Report errors in .js files. 在JS中包括错误*/
        // "jsx": "preserve",                     /* Specify JSX code generation: 'preserve', 'react-native', or 'react'. 指定JSX代码的生成方式 是保留还是react-native或者react*/
        // "declaration": true,                   /* Generates corresponding '.d.ts' file.生成相应的类型声明文件 */
        // "declarationMap": true,                /* Generates a sourcemap for each corresponding '.d.ts' file. 为每个类型声明文件生成相应的sourcemap*/
        // "sourceMap": true,                     /* Generates corresponding '.map' file. 生成对应的map文件 */
        // "outFile": "./",                       /* Concatenate and emit output to single file. 合并并且把编译后的内容输出 到一个文件里*/
        // "outDir": "./",                        /* Redirect output structure to the directory.按原始结构输出到目标目录 */
        // "rootDir": "./",                       /* Specify the root directory of input files. Use to control the output directory structure with --outDir. 指定输入文件的根目录，用--outDir来控制输出的目录结构*/
        // "composite": true,                     /* Enable project compilation 启用项目编译*/
        // "removeComments": true,                /* Do not emit comments to output. 移除注释*/
        // "noEmit": true,                        /* Do not emit outputs. 不要输出*/
        // "importHelpers": true,                 /* Import emit helpers from 'tslib'. */
        // "downlevelIteration": true,            /* Provide full support for iterables in 'for-of', spread, and destructuring when targeting 'ES5' or 'ES3'. 当目标是ES5或ES3的时候提供对for-of、扩展运算符和解构赋值中对于迭代器的完整支持*/
        // "isolatedModules": true,               /* Transpile each file as a separate module (similar to 'ts.transpileModule').r把每一个文件转译成一个单独的模块 */

        /* Strict Type-Checking Options */
        //"strict": true,                           /* Enable all strict type-checking options. 启用完全的严格类型检查 */
        // "noImplicitAny": true,                 /* Raise error on expressions and declarations with an implied 'any' type. 不能使用隐式的any类型*/
        // "strictNullChecks": true,              /* Enable strict null checks. 启用严格的NULL检查*/
        // "strictFunctionTypes": true,           /* Enable strict checking of function types. 启用严格的函数类型检查*/
        // "strictBindCallApply": true,           /* Enable strict 'bind', 'call', and 'apply' methods on functions.启用函数上严格的bind call 和apply方法 */
        // "strictPropertyInitialization": true,  /* Enable strict checking of property initialization in classes. 启用类上初始化属性检查*/
        // "noImplicitThis": true,                /* Raise error on 'this' expressions with an implied 'any' type.在默认的any中调用 this表达式报错 */
        // "alwaysStrict": true,                  /* Parse in strict mode and emit "use strict" for each source file. 在严格模式下解析并且向每个源文件中发射use strict*/

        /* Additional Checks */
        // "noUnusedLocals": true,                /* Report errors on unused locals. 有未使用到的本地变量时报错 */
        // "noUnusedParameters": true,            /* Report errors on unused parameters. 有未使用到的参数时报错*/
        // "noImplicitReturns": true,             /* Report error when not all code paths in function return a value. 当不是所有的代码路径都有返回值的时候报错*/
        // "noFallthroughCasesInSwitch": true,    /* Report errors for fallthrough cases in switch statement. 在switch表达式中没有替代的case会报错 */

        /* Module Resolution Options */
        // "moduleResolution": "node",            /* Specify module resolution strategy: 'node' (Node.js) or 'classic' (TypeScript pre-1.6). 指定模块的解析策略 node classic*/
        // "baseUrl": "./",                       /* Base directory to resolve non-absolute module names. 在解析非绝对路径模块名的时候的基准路径*/
        // "paths": {},                           /* A series of entries which re-map imports to lookup locations relative to the 'baseUrl'. 一些路径的集合*/
        // "rootDirs": [],                        /* List of root folders whose combined content represents the structure of the project at runtime. 根目录的列表，在运行时用来合并内容*/
        // "typeRoots": [],                       /* List of folders to include type definitions from. 用来包含类型声明的文件夹列表*/
        // "types": [],                           /* Type declaration files to be included in compilation.在编译的时候被包含的类型声明 */
        // "allowSyntheticDefaultImports": true,  /* Allow default imports from modules with no default export. This does not affect code emit, just typechecking.当没有默认导出的时候允许默认导入，这个在代码执行的时候没有作用，只是在类型检查的时候生效 */
        //"esModuleInterop": true                   /* Enables emit interoperability between CommonJS and ES Modules via creation of namespace objects for all imports. Implies 'allowSyntheticDefaultImports'.*/
        // "preserveSymlinks": true,              /* Do not resolve the real path of symlinks.不要symlinks解析的真正路径 */

        /* Source Map Options */
        // "sourceRoot": "",                      /* Specify the location where debugger should locate TypeScript files instead of source locations. 指定ts文件位置*/
        // "mapRoot": "",                         /* Specify the location where debugger should locate map files instead of generated locations. 指定 map文件存放的位置 */
        // "inlineSourceMap": true,               /* Emit a single file with source maps instead of having a separate file. 源文件和sourcemap 文件在同一文件中，而不是把map文件放在一个单独的文件里*/
        // "inlineSources": true,                 /* Emit the source alongside the sourcemaps within a single file; requires '--inlineSourceMap' or '--sourceMap' to be set. 源文件和sourcemap 文件在同一文件中*/

        /* Experimental Options */
        // "experimentalDecorators": true,        /* Enables experimental support for ES7 decorators. 启动装饰器*/
        // "emitDecoratorMetadata": true,         /* Enables experimental support for emitting type metadata for decorators. */
    }
}
```

## 数据类型

-   基本类型

    -   布尔类型（boolean）
    -   数字类型（number）
    -   字符串类型（string）
    -   symbol（Symbol）
    -   数组类型（array）
    -   object
    -   undefined、null

-   补充类型
    -   元祖类型（tuple）
    -   void
    -   任意类型（any）
    -   unknown
    -   never
    -   高级类型

## 类型注解

(变量/函数): type // [type 为上面的数据类型 ]

```ts
// 布尔
let married: boolean = false;

// 数字
let age: number = 10;

// 字符串
let firstname: string = 'zfpx';

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
interface Foo {
    bar: number;
    bas: string;
}

const foo = {} as Foo;
foo.bar = 123;
foo.bas = 'hello';
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
// 可选属性
interface SquareConfig {
    color?: string;
    width?: number;
}

// 只读属性
interface Point {
    readonly x: number;
    readonly y: number;
}

// 额外的属性检查
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

// 可索引的类型 - 字符串索引签名
interface SquareConfig {
    color?: string;
    width?: number;
    [str: string]: any; // 字符串索引签名
}

function createSquare(config: SquareConfig): any {
    // ...
}

let mySquare = createSquare({ colour: 'red', width: 100 });

//  可索引的类型 - 数字索引签名
interface StringArray {
    [index: number]: string;
}

let myArray: StringArray;
myArray = ['Bob', 'Fred'];

let myStr: string = myArray[0];

// 继承接口
interface Shape {
    color: string;
}

interface Square extends Shape {
    sideLength: number;
}

let square = <Square>{};
square.color = 'blue';
square.sideLength = 10;

// 继承接口 - 继承多个接口
interface Shape {
    color: string;
}

interface PenStroke {
    penWidth: number;
}

interface Square extends Shape, PenStroke {
    sideLength: number;
}

let square = <Square>{};
square.color = 'blue';
square.sideLength = 10;
square.penWidth = 5.0;
```

### 问题二：interface 和 type
