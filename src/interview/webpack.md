---
title: 'webpack相关'
collapsable: true
keys:
 - '10f7df2451ae3f3c02d31cbd1ee825f8'
---

### 1、loader和plugin的区别
- 对于loader，它是一个文件转换器，操作的是文件，如编译、压缩等，最终一起打包到指定的文件中，比如将A.scss转换为A.css，单纯的文件转换过程
```
打包css: 
    css-loader、style-loader
ES6的代码转成ES5：
    babel-loader
打包图片: 
    url-loader、file-loader

1、处理一个文件可以使用多个loader，loader的执行顺序和配置中的顺序是相反的，即最后一个loader最先执行，第一个loader最后执行
2、第一个执行的loader接收源文件内容作为参数，其它loader接收前一个执行的loader的返回值作为参数
3、最后执行的loader会返回此模块的JavaScript源码
```

- plugin是一个扩展器，它丰富了webpack本身，针对是loader结束后，webpack打包的整个过程，它并不直接操作文件，而是基于事件机制工作，会监听webpack打包过程中的某些节点，执行广泛的任务
```
HtmlWebpackPlugin: 打包模板生成html，并自动引用css和js
HotModuleReplacementPlugin: 热更新
ProvidePlugin: 自动加载模块，代替require和import

1、webpack启动后，在读取配置的过程中会执行new MyPlugin(options)初始化一个MyPlugin获取其实例
2、在初始化compiler对象后，就会通过compiler.plugin(事件名称，回调函数)监听到webpack广播出来的事件
3、并且可以通过compiler对象去操作webpack
```
