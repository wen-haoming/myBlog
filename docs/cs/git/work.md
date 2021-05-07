---
title: 工作区与暂存区
nav:
    title: 工作区与暂存区
    path: /cs/git
---

# 工作区与暂存区

## 对比暂存区和 HEAD 所含文件的差异

```bash
$ git diff --cached
```

## 快速让暂存区恢复和 HEAD 一样

```bash
$ git reset HEAD
```

## 消除最近的几次提交（慎用）

```bash
git reset --hard xxxx
```

## 正确删除文件的方法
