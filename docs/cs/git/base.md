---
title: git基础
nav:
    title: git基础
    path: /cs/git
---

# git 基础

## 配置 user 信息

配置 user.name 和 user.email

<Alert type="info">
<div>为什么配置这些 user 信息？</div>
<br/>
每次的变更需要知道是谁去发起的，那么这个谁指的就是这个 user 的信息，同时做 code_review 的时候，发现某些地方有问题，也能够找到对对应的 user的email 去发起邮件通知。
</Alert>

```bash
$ git config --global user.name 'your_name'
$ git config --global user.email 'your_email@domain.com'
```

### config 的三个作用域

缺省等同于 `local`, 其中 `global` 最常用

```bash
$ git config --local #只对某个仓库有效
$ git config --global # global 对当前用户所有仓库有效
$ git config --system # system 对系统所有登录用户有效
```

显示 config 的配置，加 --list

```js
$ git config --list --local
$ git config --list --blobal
$ git config --list --system
```

## 初始化仓库

1. 把已有的项目代码纳入 git 管理

```bash
$ pwd
$ cd 项目代码所在的文件夹
$ git init
```

2. 新建的项目直接用 git 管理

```bash
$ pwd # 查看
$ cd 项目代码所在的文件夹
$ git init your_project #会在当前路径下创建和项目名称同名的文件夹
$ cd your_project
```

### 配置 user 的 local 信息来代替 user 的 global 的信息

```bash
# 首先我们查看全局的 user 信息

$ git config --list --global
# core.autocrlf=false
# core.safecrlf=true
# core.filemode=false
# user.name=wenhaoming
# user.email=435203093@qq.com
```

然后我们创建一个新的项目并且初始化设置 local 的 user

```bash
$ git init test
$ cd test

$ git config --local user.name 'xiaoming'
$ git config --local user.email 'lovexming@qq.com'

$ touch a.txt # 创建一个新文件
$ git add . # 放到暂存区 (add 可以是指定的文件和文件夹)
$ git commit -m "init" # 提交

$ git log # 查看谁提交的

# commit e3a64262b50663bfd28c856b2b9f76a39fb13ea3 (HEAD -> master)
# Author: xiaoming <lovexming@qq.com>
# Date:   Thu May 6 11:51:00 2021 +0800

#     init
```

最后 user 的 local 是比 user 的 local 优先级高

## git log 查看版本历史

1. git log --oneline 简化输出 commit
2. git log --oneline -n2 简化输出前两个 commit
3. git log --all 查看全部分支的 commit
4. git log --graph 点线图
