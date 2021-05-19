---
title: '微信分享篇'
categories: 日常总结
tags:
 - wechat
---

:::tip
<font color="#666">关于微信公众号开发分享功能踩过的坑（wx.js引入和js安全域名配置成功）</font>
:::

### 分享分两大步骤：
#### 步骤一：获取微信配置所需的数据data，实际就是请求后台一个接口来获取data数据
<font color="red">**注意：**</font> <u>微信分享会根据分享设备的不同,为原始链接拼接如下参数:</u>
```
对于IOS系统会自动增加如下参数：
* 朋友圈 from=timeline&isappinstalled=0
* 微信群 from=groupmessage&isappinstalled=0
* 好友分享 from=singlemessage&isappinstalled=0

对于安卓系统会自动添加如下参数：
* 朋友圈 from=timeline
* 微信群 from=groupmessage
* 好友分享 from=singlemessage
```
<font color="#016ab8">配置验证（签名）当前页面地址,不带任何微信擅自添加的参数，域名必须与配置的js安全域名一致</font>
```js
function getDetialWXconfig(paths, callback) {
  // 每次验证需要发送当前页面地址,不带任何参数
  let url = paths;
  if (url.indexOf('#') !== -1) {
    url = url.split('#')[0];
  }
  // 请求后台接口 （api.postJssignature 只是举例）
  api.postJssignature({url}).then((res) => {
    if (res.status === 0) {
        // 成功的回调 可直接进行wx.config()方法进行配置
        callback(res.data);
    }
  });
}
```

#### <font color="#016ab8"></font>步骤二：通过config接口注入权限验证配置、通过ready接口处理成功验证、通过error接口处理失败验证
```js
// 指的是上述getDetialWXconfig方法获取data后的回调
function callback(data) {
    // wx.config注入权限验证配置
    wx.config({
        debug: false, // 调试模式,调用的所有api的返回值会在客户端alert出来
        appId: data.appId,         // 必填，公众号的唯一标识
        timestamp: data.timestamp, // 必填，生成签名的时间戳
        nonceStr: data.nonceStr,   // 必填，生成签名的随机串
        signature: data.signature, // 必填，签名
        jsApiList: ['onMenuShareTimeline','onMenuShareAppMessage'], // 必填，传入微信接口名称的数组 ['分享到朋友圈','分享给朋友']
    });
    // wx.ready处理验证成功
    wx.ready(() => {
        console.log('微信接口参数验证成功')
        // 分享到朋友圈
        wx.onMenuShareTimeline({
            title: share.title, // 分享标题
            link: share.link, // 分享链接，域名或路径必须与当前页面对应的公众号JS安全域名一致
            imgUrl: share.imgUrl, // 分享图标
            success:  () => {
                // 在此写分享成功后的业务逻辑
            }
        });
        //分享给朋友
        wx.onMenuShareAppMessage({
            title: share.title,  // 分享标题
            desc: share.desc,    // 分享描述
            link: share.link,    // 分享链接
            imgUrl: share.imgUrl,  // 分享图标
            type: 'link', // 分享类型,music、video或link，不填默认为link
            dataUrl: '', // 如果type是music或video，则要提供数据链接，默认为空
            success:  () => {
                // 在此写分享成功后的业务逻辑
            }
        });
    })
    // wx.error处理验证失败
    wx.error( (res) => {
        console.log('微信接口参数验证失败')
    });
}
```

### <font color="red">注意：分享过程中需要区分移动设备</font>

#### 用户对当前页面进行一次或多次分享时
```
安卓系统：分享一次，需要对当前URL配置验证一次
** 例如：在自定义分享链接或文案时，每改变一次都必须配置当前页面URL

IOS 系统：只需对当前页面URL配置验证一次即可
** 例如：在自定义分享链接或文案时，不需要重复config当前URL
```
#### VUE中，在做单页面路由跳转时
```
安卓系统：
** this.$router.push() 方式跳转

IOS系统：
** location.href 方式跳转

原因如下：
    this.$router.push跳转方式，在安卓设备中，会重新刷新页面数据，
而在IOS系统机制中，此方式跳转是依靠历史记录来实现，不会刷新页面数据，
从而会导致当前页面URL签名失败，因此IOS系统使用location.href方式跳转
```
