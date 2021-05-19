---
title: 'SSR搭建部署'
sidebar: auto
categories: 技术积累
tags:
 - vue
collapsable: true
---

## 部署生产
#### 1、服务器安装node
```
yum install -y nodejs
```
建议安装8.0版本以上，低于此版本的可以通过以下命令升级node
```
1、清除缓存信息
   sudo npm cache clean -f

2、下载node安装包
   sudo npm install -g n

3、升级到nodejs最新稳定版本
   sudo n stable

    n 常用的命令有：
    n 会列出所有安装的版本供你切换
    n latest 安装最新版本
    n stable 安装最新稳定版
    n lts 安装最新长期支持版本
    n rm [版本号] 删除某一版本
    n -h 帮助命令
    n [版本号] 安装指定版本node

4、查看当前版本，如果版本无变化，重新进入服务器
   node -v
```

#### 2、项目上传
- 将项目中的.nuxt, static, package.json,nuxt.config.js这个4个文件打包上传到服务器

- 安装依赖
```js
npm install --production
```
- 打包
```js
npm run build (这步操作可以不再服务器上进行，执行后会在.nuxt目录下产生dist文件夹)
```

- 启动项目
```js
npm run start
```
到此，在服务器上已经将nuxt项目启动成功了，但是存在两个问题，第一：如何外部浏览器访问，第二：一旦关闭服务器，项目就会终止，继续往下看～

#### 3、外部如何访问
- 我以阿里云服务器为例，假设nuxt项目端口为8080，需要在阿里云服务器配置端口为8080，可允许外部访问的安全组，在假设服务器公网IP为 39.202.3.687，那么直接访问http://39.202.3.687:8080即可访问此nuxt项目
- 在高级一点，nginx代理，访问域名，首先需要做DNS域名解析，监听端口，简单nginx配置如下：
```js
server {
    listen 8080;
    server_name www.test.cn;

    location / {
        proxy_pass http://127.0.0.1:8080;
    }
} 
```

#### 4、pm2管理进程
- pm2是一个进程管理工具,可以用它来管理你的node进程，并查看node进程的状态，当然也支持性能监控，进程守护，负载均衡等功能，主要是可以后台挂载运行项目

- 安装pm2
```
npm install pm2 -g
```

- 启动项目
```
pm2 start npm --name "nuxt" -- run start

--name "nuxt"是启动的服务名称，自定义
```

- pm2常用命令
```
pm2 list  // 查看任务列表
pm2 stop app_name|app_id  // 停止指定name或者id的任务
pm2 stop all  // 停止所有任务
pm2 delete app_name|app_id  // 删除指定name或者id的任务
pm2 delete all  // 删除所有任务
pm2 logs // 查看日志
pm2 kill  // 杀死pm2进程
```