
# 说明

## 技术栈

- next.js
- drizzleORM
- mysql2
- nextAuth
- radixUI
- ...

## 应用说明

- 用户模块: 增改, 路由权限
- 文章模块: 增删查改

静态页面使用ssg生成 如: /main/post/[id]

动态页面使用ssr+csr渲染

大部分api操作使用 server action 在服务端完成

## 路由架构

- /main: 主页
  - /main/post: 文章展示
  - /main/post/[id]: 文章详情
- /user: 我的
  - /user/post: 文章管理
  - /user/post/new: 新增文章
  - /user/post/[id]: 修改文章
- /admain: 后台(管理员主页)
- /setting: 设置

## 权限架构

- /main  /setting: 所有可见可用
- /user: 所有可见 用户可用
- /admin: 管理员可见可用
