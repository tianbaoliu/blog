---
title: 'http协议相关'
collapsable: true
keys:
 - '10f7df2451ae3f3c02d31cbd1ee825f8'
---

### 概念
::: warning
超文本传输协议，即从服务端传送超文本到本地浏览器的传输协议。
:::

### 特点
- 简单快速：协议简单，通讯很快，只需向服务器发送请求方法和路径
- 灵活：http允许传输任何类型的数据，通过Content-Type字段加以标记
- 无连接：请就结束自动断开链接
- 无状态：没有记忆功能
- 支持B/S及C/S模式

### 请求报文
::: warning 包含：
请求行、请求头、空行、请求体
:::

#### 1、请求行
- 用来说明请求类型、请求路径和所用的HTTP版本

#### 2、请求头
- Accept: 接收的数据类型，如：application/json，*/*，text/html，application/xml等
- Accept-Encoding: 压缩格式，gzip, deflate, br
- Accept-Language: 设置语言，zh-CN、zh
- Authorization: 设置token认证信息
- Content-type: 请求内容类型(MIME类型)，如：application/x-www-form-urlencoded、application/json、application/javascript、text/html、text/css、
- Cache-Control: 设置缓存，no-cache
- Pragma：防止页面缓存，和Cache-Control：no-cache作用一样
- Cookie: 设置cookie信息
- Host: 主机ip或域名
- Referer: 请求来自哪里，可用作防盗链
- Connection: keep-alive,保持TCP链接不关闭
- User-Agent：浏览器UA

#### 3、请求体
- 发送接口的参数数据

#### 4、请求方法
- GET
- POST
- PUT: 替换操作，取代指定的文档的内容
- DELETE: 删除操作
- OPTIONS: 查看服务器性能状态，接口校验

#### 响应报文
::: warning 包含：
响应行、响应头、空行、响应体
:::

#### 1、响应行
- HTTP版本 状态码 如：(HTTP/1.1 200 ok)

#### 2、响应头
- Server: 服务器软件信息
- Date: 响应时间
- Expires: 指定缓存过期时间
- Last-Modified: 资源最后修改时间
- Set-Cookie: 种cookie
- Status: 响应状态 200、302、404、500
- Content-Type: 返回的数据类型(MIME类型)
- Content-Length: 内容长度
- Connection: 保持TCP链接不关闭
- Location: 指明重定向的url地址

#### 3、响应体
- 服务器返回的内容信息

### url渲染过程
- 1.浏览器根据url去查找对应的IP，对域名进行DNS解析
- 2.进行TCP连接，HTTP包的传输是依靠TCP传输，建立三次握手，建立TCP连接<br>
    a.客户端发起请求到服务器，等到服务器响应，第一次握手<br>
    b.服务器接收到客户端信息，发送结果至客户端，第二次握手<br>
    c.客户端，接收到结果，并发送服务器确认，第三次握手<br>
- 3.浏览器向服务器发送http请求
- 4.服务器收到请求，向客户端发送HTTP响应报文
- 5.浏览器解析渲染页面

### get和post请求的区别
- 1）get请求参数通过url传递，post请求将参数放在requrest body中
- 2）get请求会被浏览器主动cache，post不会
- 3）get请求参数会被完整保留在浏览器历史记录里，而post中的参数不会被保留
- 4）get在浏览器回退时是无害的，post会再次提交请求
- 5）get产生一个TCP数据包，浏览器会把http header和data一并发送出去，服务器响应200（返回数据）
- 6）post产生两个TCP数据包，浏览器先发送header，服务器响应100 continue，浏览器再发送data，服务器响应200 ok（返回数据）

### 关于option请求
- 请求分成两类：简单请求（simple request）和非简单请求（not-so-simple request）。<br>
- 简单请求的头部参数，同时满足以下两项：<br>
    1、Request Method只能是HEAD、GET、POST三个之一。<br>
    2、Content-Type只能是application/x-www-form-urlencoded、multipart/form-data、text/plain三个之一。因此，'Content-Type': 'application/json',为非简单请求。<br>
- 非简单请求，每次发出请求的时候，一共发出了两次请求，第一次是OPTIONS预检请求，主要验证来源是否合法，验证是否有对指定站点的访问权限，并返回允许的Header等。需要在服务器配置nginx允许OPTIONS请求。第二次才是真正的请求。

### http请求发出后，如何取消
- abort() 停止当前请求，比如上传文件终止的情景