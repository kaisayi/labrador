# vue-admin-proj

> 这是一个极简的 vue admin 管理后台。它只包含了 Element UI & axios & iconfont & permission control & lint，这些搭建后台必要的东西。

[线上地址](http://www.youzz.fun)

## 启动

```bash
# 克隆项目
git clone https://github.com/kaisayi/labrador.git

# 进入项目目录
cd vue-admin-template

# 安装依赖
npm install

# 建议不要直接使用 cnpm 安装以来，会有各种诡异的 bug。可以通过如下操作解决 npm 下载速度慢的问题
npm install --registry=https://registry.npm.taobao.org

# 启动服务
npm run dev
```

浏览器访问 [http://localhost:8080](http://localhost:8080)

## 发布

```bash
# 构建测试环境
npm run build

```

## `Docker`运行

- `docker build -t vue-proj/admin-front-website .`
- `docker run -di --name=docker-vue -p 8080:8080 vue-proj/admin-front-website`

## 其它

```bash
# 预览发布环境效果
npm run preview

# 预览发布环境效果 + 静态资源分析
npm run preview -- --report

# 代码格式检查
npm run lint

# 代码格式检查并自动修复
npm run lint -- --fix
```

更多信息请参考 [使用文档](https://panjiachen.github.io/vue-element-admin-site/zh/)

Copyright (c) 2019-present 章鱼哥
