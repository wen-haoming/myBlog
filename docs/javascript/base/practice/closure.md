---
title: js 闭包相关
nav:
    title: js 闭包相关
    path: /javascript/base
group:
    title: 实践
writing: true
---

# 闭包相关

## 柯里化

> 维基百科：在计算机科学中，柯里化（英语：Currying），又译为卡瑞化或加里化，是把接受多个参数的函数变换成接受一个单一参数（最初函数的第一个参数）的函数，并且返回接受余下的参数而且返回结果的新函数的技术。

-   需要一个柯里化转换函数和一个处理函数
-   处理函数的参数必须是固定的

过多的概念不解释，本文更多是开阔一下思路，在函数柯里化的应用场景有哪些，但是首先我们需要封装一个柯里化转换函数

```js
const currying = (fn, arr = []){
    let len = fn.length; // 函数的参数
    return (...args)=>{
        let concatArgs = [...arr,...args] // 合并参数
        if(concatArgs.length < len){ // 如果参数不够，那么还是继续返回柯里化函数，直到参数凑齐为止
            return currying(fn,concatArgs)
        }else{
            return fn(...concatArgs)
        }
    }
}
```

### 验证手机号的例子

```js
// 当我们写一个校验函数的时候
function check(targetString, reg) {
    return reg.test(targetString);
}

// 这样的话每次都需要重复写多次
check(/^1[34578]\d{9}$/, '14900000088');
check(/^1[34578]\d{9}$/, '15900000088');

check(/^(\w)+(\.\w+)*@(\w)+((\.\w+)+)$/, 'test@163.com');
check(/^(\w)+(\.\w+)*@(\w)+((\.\w+)+)$/, 'test2@qq.com');

// 如果使用了currying
const phoneCheck = currying(/^1[34578]\d{9}$/);
const emailCheck = currying(/^(\w)+(\.\w+)*@(\w)+((\.\w+)+)$/);

phoneCheck('14900000088');
phoneCheck('15900000088');

emailCheck('test@163.com');
emailCheck('test2@qq.com');
```

### 数组处理

```js
function getNewArray(array) {
    return array.map(function(item) {
        return item * 100 + '%';
    });
}

getNewArray([1, 2, 3, 0.12]); // ['100%', '200%', '300%', '12%'];

// 如果使用了currying
function _map(func, array) {
    return array.map(func);
}

var _getNewArray = currying(_map);

var getNewArray = _getNewArray(function(item) {
    return item * 100 + '%';
});

getNewArray([1, 2, 3, 0.12]); // ['100%', '200%', '300%', '12%'];
getNewArray([0.01, 1]); // ['1%', '100%']
```
