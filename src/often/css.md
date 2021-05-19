---
title: 'CSS样式封装'
sidebar: auto
categories: 技术积累
collapsable: false
tags:
 - css
---
## 移动端相关

### 1、滑动流畅度问题
```css
-webkit-overflow-scrolling: touch;
```
### 2、边框1px问题
```css
/* 方案一：使用border-image实现 */
div {
	border-image:url(border.png) 30 30 stretch;
}
/* ——————————————————————————————————————————— */
/* 方案二：使用background-image实现 */
.background-image-1px {
	background: url(../img/line.png) repeat-x left bottom;
	background-size: 100% 1px;
    -webkit-background-size: 100% 1px;
}
以上两种方案需要准备好符合需求的图片    缺点：更换颜色和样式麻烦

/* ————————————————————————————————————————————————————————————————————————————————— */

/* 方案三：使用box-shadow模拟边框 */
.box-shadow-1px {
    -moz-border-image:url(/i/border.png) 30 30 stretch; /* Old Firefox */
	-webkit-border-image:url(border.png) 30 30 stretch; /* Safari 5 */
	-o-border-image:url(border.png) 30 30 stretch; /* Opera */
	border-image:url(border.png) 30 30 stretch;
}
优点：代码少，兼容性好    缺点：边框有阴影，颜色变浅

/* ————————————————————————————————————————————————————————————————————————————————— */

/* 方案四：伪元素+transform: scale，构建1个伪元素, 高度为1px，再以transform缩放到50% */
.border-1px {
    position: relative;
}
.border-1px:after {
    content: " ";
    position: absolute;
    left: 0;
    top: 0;
    width: 100%;
    height: 1px;
    background: #000;
    transform: scaleY(0.5);
    -webkit-transform: scaleY(0.5);
    transform-origin: 0 0;
    -webkit-transform-origin: 0 0;
}
优点：可以满足所有场景，且修改灵活    缺点：对于已使用伪类的元素要多层嵌套。
```

## 其他端

### 1、单行文本超出省略号
```css
white-space: nowrap;
text-overflow: ellipsis;
overflow: hidden;
```

### 2、多行行文本超出省略号
```css
text-overflow: -o-ellipsis-lastline;
overflow: hidden;
text-overflow: ellipsis;
display: -webkit-box;
-webkit-line-clamp: 2;
line-clamp: 2;
/* 解决打包编译失败，如果eslint提示警告，改为 autoprefixer: ignore next */
/*! autoprefixer: off */
/*! autoprefixer: ignore next; */
-webkit-box-orient:vertical;
/* autoprefixer: on */
```

### 3、某元素后添加倒立小三角
```css
&::after {
    position: absolute;
    top: 0.4rem;
    left: -0.28rem;
    width: 0;
    height: 0;
    border: 8px solid transparent;
    border-top: 8px solid red;
    content: '';
}
```

### 4、修改滚动条样式
```css
/* 其中的 .cont 和 .work都是例子（目标元素） 可替换为* */
.cont::-webkit-scrollbar {/*滚动条整体样式*/
    width: 4px;     /*高宽分别对应横竖滚动条的尺寸*/
    height: 4px;
}
.cont::-webkit-scrollbar-thumb {/*滚动条里面小方块*/
    border-radius: 5px;
    -webkit-box-shadow: inset 0 0 5px rgba(0,0,0,0.2);
    background: rgba(0,0,0,0.2);
}
.cont::-webkit-scrollbar-track {/*滚动条里面轨道*/
    -webkit-box-shadow: inset 0 0 5px rgba(0,0,0,0.2);
    border-radius: 0;
    background: rgba(0,0,0,0.1);
}
.works::-webkit-scrollbar {/*滚动条整体样式*/
    width: 4px;     /*高宽分别对应横竖滚动条的尺寸*/
    height: 4px;
}
.works::-webkit-scrollbar-thumb {/*滚动条里面小方块*/
    border-radius: 5px;
    -webkit-box-shadow: inset 0 0 5px rgba(0,0,0,0.2);
    background: rgba(0,0,0,0.2);
}
.works::-webkit-scrollbar-track {/*滚动条里面轨道*/
    -webkit-box-shadow: inset 0 0 5px rgba(0,0,0,0.2);
    border-radius: 0;
    background: rgba(0,0,0,0.1);
}
```

### 5、谷歌强制12x 字体大小
```css
.style{
    -webkit-transform: scale(0.75);        /* 解决谷歌强制12px */
}
```

### 6、模糊层
```css
.blur{
    overflow:hidden;
    position: fixed;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    z-index: 0;
    background: url('./imgs/online/bg.png') no-repeat center;
    background-size: 100% 100%;
    -webkit-filter: blur(3px);
    -moz-filter: blur(5px);
    -ms-filter: blur(5px);
    filter:progid:DXImageTransform.Microsoft.Blur(PixelRadius='1'); /*针对IE进行设置*/
}
```

### 7、video标签
#### 自动播放，没有用户行为时必须静音
```html
<!-- 隐藏功能键 controls=false -->
<video muted loop autoplay controls=false></video>
```

### 8、按钮禁止点击
```css
.disabled {
  pointer-events: none;
  cursor: not-allowed;
  opacity: 0.5;
}
```
