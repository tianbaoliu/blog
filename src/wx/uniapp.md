---
title: '小程序uni-app开发总结'
sidebar: auto
categories: 教程
collapsable: false
tags:
 - js
---



## 返回按钮失效问

当前页使用 page-container 组件跳转页面时，再次返回当前页，返回按钮失效<br>
解决：使用定时器延时跳转，跳转之前关闭 page-container 组件
```js
toNative (url) {
  // 关闭 page-container 组件
  this.isShow = false
  // 使用定时器延时跳转
  setTimeout(() => {
    uni.navigateTo({
      url,
      success () {
        console.log('跳转成功')
      },
      fail () {
        console.log('跳转失败')
      }
    })
  }, 10)
},
```