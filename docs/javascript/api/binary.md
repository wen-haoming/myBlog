---
title: 聊一聊前端的上传和下载
nav:
    title: api
    path: /javascript/api
group:
    title: 业务
    order: 1
---

# 聊一聊前端的文件上传和下载

前端除了页面交互之外，还有数据处理的相关，但是我们在多数情况下都是以 json 格式为主，但是如果我们涉及到文件的上传和下载时候，就难免要处理二进制，但是这方面总是凌乱的，这次我们就集中聊一聊前端文件上传和下载所涉及的内容和 api 相关的理解。

> 在之前工作的时候，遇到过表单导出 Excel 表格，接口返回的数据是一个二进制流，那时我在进行下载的时候如果使用的 xhr api 是需要加入 `responseType: Bolb` ，不然是无法下载正确的二进制流数据，另一种方式是使用 fetch api 在返回的时候直接转化 `Blob` 格式，这也让我产生了一个疑问，Blob 到底是什么，前端处理二进制流还有什么玩法，更重要的是前端应该如何处理？

## 概述

### `Blob`

**对象表示一个不可变、原始数据的类只读的文件对象**。在 web 领域，它的数据可以按文本或二进制的格式进行读取，也可以转换成 ReadableStream 来用于数据操作。(`File` 接口基于 `Blob`，并且继承了 `Blob` 的功能并将其扩展使其支持用户系统上的文件。)

### `ArrayBuffer`

对象用来表示通用的，固定长度的原始二进制数据缓冲区，它是一个字节数组，通常在其他语言中成为 `byte array`，你不能直接操作 `ArrayBuffer` 的内容，而是要通过 `类型数组对象` 或 `DataView` 对象来操作，它们会将缓冲区的数据表示为特定的格式，并通过这些格式来读写缓冲区的内容

### `TypedArray`

对象描述了底层二进制数据缓冲区（binary data buffer） 的一个类数组视图（view）

| 类型        | 单个元素值的范围 | 大小(bytes) | 描述                  |
| :---------- | :--------------- | :---------- | :-------------------- |
| Int8Array   | -128 to 127      | 1           | 8 位二进制有符号整数  |
| Uint8Array  | 0 to 255         | 1           | 8 位无符号整数        |
| Int16Array  | -32768 to 32767  | 2           | 16 位二进制有符号整数 |
| Uint16Array | 0 to 65535       | 2           | 16 位无符号整数       |

比如：

```js
let buffer = new ArrayBuffer(8); // 8个字节的ArrayBuffer
console.log(buffer.byteLength); // 8
const int8Array = new Int8Array(buffer);
console.log(int8Array.length); // 元素的长度 1个字节占用8个位
let int16Array = new Int16Array(buffer);
console.log(int16Array.length); //4
```

### `DataView`

DataView 视图是一个可以从 二进制 ArrayBuffer 对象中读写多种数值类型的底层接口

```js
let buffer = new ArrayBuffer(2);
console.log(buffer.byteLength); // 2
let dataView = new DataView(buffer);
dataView.setInt8(0, 1);
dataView.setInt8(1, 2);
console.log(dataView.getInt8(0)); //1
console.log(dataView.getInt8(1)); //2
```
