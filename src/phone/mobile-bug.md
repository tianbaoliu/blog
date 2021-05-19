---
title: '踩坑'
categories: 日常总结
tags:
 - opt
---
:::tip
<font color="#666">最近开发移动端比较多，遇到好多坑，总结如下</font>
:::

#### 1、<input. type='button'>背景色在ios中的兼容性，颜色发白，解决办法：在全局样式中加入以下代码<br/>
```css
input[type=button], input[type=submit], input[type=file], button { 
    cursor: pointer; -webkit-appearance: none;
}
```

#### 2、在vue中使用jquery weui中的地区选择器时，通过点击事件来初始化地区选择器，第一次点击无效，第二次点击才触发<br/>
```
在mounted生命周期中执行初始化事件，在onClose事件中调用另外一个函数以获取选择器选择的值。这样在其他地方就可以使用这个值了。
```

#### 3、ios端按钮和输入框自带圆角问题：<br/>
```css
-webkit-appearance : none ; /* 解决ios上按钮的圆角问题 */
border-radius: 0; /* 解决ios上输入框圆角问题 */
```

#### 4、clipboard.js的使用：一个复制粘贴的插件<br/>
```
按钮触发：按钮我用的是div，pc端能正常使用，ios上失效（安卓不清楚，没测过）。折腾好久，最后尝试将div换成button按钮后，pc、ios均正常
```

#### 5、swiper轮播图（4.x版本）时遇到的问题：<br/>
```
1、设置slider容器能够同时显示的slides数量：可以设置为数字（可为小数，小数不可loop），或者 'auto'则自动根据slides的宽度来设定数量
2、slide能够根据惯性滑动：设置freeMode为true
3、设定初始化时激活slide的索引：设置initialSlide的值，默认为0
4、当slider容器中同时显示多个slides时，让激活的slides居中：设置centeredSlides为true
5、分页器样式设置：设置pagination对象的type属性，当type值为bullets时，会以圆点显示；当type值为fraction时，则会以分式形式显示（形如：1/3、2/3、3/3等）；当type为progressBar时，则会以进度条形式显示，即切换slide时，上方会显示进度条
6、swiper默认显示三个，中间显示全部，两边显示部分：设置如下：
　　　   spaceBetween: 10 // 表示每个slide间的间隔
　　　   slidesPerView：1.2 // 设置slider容器同时显示slides的数量。
　　　   centeredSlides：true // 让中间显示的slides居中
7、swiper动态加载数据轮播滑动异常，也无法自动轮播（自动轮播的前提是要设置autoplay:true）：需要设置observer:true来启动动态检查器，这样就可以自动自动轮播了，也能手动操作了，然而新的问题来了，手动滑动后，离开滑块，无法继续自动轮播，需要设置autoplay:{disableOnInteraction:false}现在就可以正常轮播了。如果想要循环轮播，则添加loop:true（此时新的bug出现了，就是轮播的时候跳过了第一张跟最后一张，目前还未解决）。
```
#### 6、vue遮罩层阻止默认滚动事件
```
适用于遮罩层本身没有滚动事件的，否则本身的滚动事件也会被阻止：@touchmove.prevent
```

#### 7、h5页面点击元素会出现灰色背景
```css
body { -webkit-tap-highlight-color: rgba(255, 255, 255, 0) }
```

#### 8、发现页面在ios上能正常上下滑动，而安卓上不行，pc端也不能滑动，但是通过鼠标滚动是可行的。
```
这时候有可能是css文件中加入了 touch-action:none 导致的，这句代码作用是阻止页面滚动，将它去掉就好了。坑爹的，困扰了我好久。
```

#### 9、ios上双击强制缩放问题
```css
// 该方法还能移除整个文档的触发延迟，对于IE10，需要使用-ms-touch-action
* {
    touch-action: manipulation; 
}   
```

#### 10、vue图片懒加载（vue-lazeload）,不能动态切换图片（如，切换tab时，图片无法动态改变）<br/>
```
为每个img标签添加一个key属性。<img v-lazy="imgUrl" :key="imgUrl">
```

#### 11、使用translate导致元素内字体模糊
```
原因：translate中的参数为非整数。常见于translateX(百分比)、translateY(百分比), translate(百分比,百分比)。

解决办法：因为translate中参数百分比其实是相对于操作元素本身的宽或高的百分比，所以可以调整所要操作的元素的宽或高，已达到百分比后的值是整数，这样就能解决元素内字体模糊的问题
```

#### 12、App嵌入h5页面（使用vue）
```
问题：如果App端需要在页面跳转时拦截到跳转路径，使用vue的路由跳转方法时，App端是拦截不到的，因为vue是单页面应用，根本不存在页面的跳转。<br/>

解决方案：使用window.location.href方法跳转（注：如果当前页面使用window.location.href跳转，且路径中带有查询参数，在跳转后的页面中仍然可以使用this.$route.query来获取查询参数）
```

#### 13、移动端（ios）input触发弹出软键盘页面不滑动问题
```js
document.getElementById("input").onblur = function() {
    window.scroll(0,0);
}
```

#### 14、fixed定位在底部的元素，被软键盘或其它方式订到中间问题
```html
<div v-show="screenHeight>500">赶快分享出去，让别人为你点赞吧！</div>

第一步： 先在data中去定义一个记录高度是属性
data: {
    // 监听屏幕高度,这里是给到了一个默认值 （这个很重要）
    screenHeight: document.documentElement.clientHeight, 
}

第二步： 我们需要将reisze事件在 vue mounted 的时候去挂载一下它的方法
mounted () {
    window.onresize = () => (() => {
      this.screenHeight = document.documentElement.clientHeight;
    })();
}

第三步： watch 去监听这个属性值的变化，如果发生变化则讲这个val传递给 this.screenHeight
watch: {
    creenHeight(newval) {
        this.screenHeight = newval;
    }
}
```

#### 15、移动端点击出现蓝色框的解决方案
```css
/* 安卓 */
body{
    -webkit-tap-highlight-color:rgba(0,0,0,0);
}
/* 解决ios */
a:focus, input:focus, p:focus, div:focus{
    -webkit-tap-highlight-color:rgba(0,0,0,0);
    -webkit-user-modify:read-write-plaintext-only; 
}
```

#### 16、苹果10系统白屏问题
webpack.prod.conf.js文件中添加 : <font color="red">mangle : { safari10:true }</font>
```js
new UglifyJsPlugin({
    uglifyOptions: {
        compress: {
            warnings: false
        },
        // 添加如下代码
        mangle: {
            safari10: true
        }
    },
    sourceMap: config.build.productionSourceMap,
    parallel: true
}),
```