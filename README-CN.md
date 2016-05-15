# greedhub-front-end

基于 node.js 的第三 GitHub 客户端

线上地址: <https://greedhub-greedlab.rhcloud.com/>

## 如果使用

[English](README.md) | 中文

### 修改 github 第三方登录相关

<https://github.com/settings/developers> 添加应用。`Authorization callback URL` 设置为 `http://localhost:8080/callback`.


`util/config.js` 修改 `client_id` 和 `client_secret` 为对应的值。

### 安装依赖：

```
$ cd greedhub-front-end
$ npm install
```

### 启动应用

```
$ DEBUG=greedhub-front-end npm start
```

### 访问

<http://localhost:8080>