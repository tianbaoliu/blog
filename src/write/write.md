---
title: '笔试题'
collapsable: true
sidebar: auto
keys:
 - '10f7df2451ae3f3c02d31cbd1ee825f8'
---
## css 部分
#### 1、css中水平垂直居中实现，至少三种（宽高不固定）
##### (1)、设置父元素flex布局
```css
  .parent1 {
    display: flex;
    align-items: center;
    justify-content: center;
  }
```
##### (2)、绝对定位
```css
  .parent2 {
    position: relative;
  }
  .parent2 .child {
    position: absolute;
    left: 0;
    right: 0;
    top: 0;
    bottom: 0;
    margin: auto;
  }
```
##### (3)、绝对定位 + transform
```css
  /* 3、绝对定位 + transform */
  .parent3{
    position: relative;
  }
  .parent3 .child{
    position: absolute;
    top: 50%;
    left: 50%;
    transform: translate(-50%, -50%);
  }
```

#### 2、rgba() 和 opacity 的透明效果有什么不同
```
  opacity 作用于元素，以及元素内的所有内容的透明度
  rgba()只作用于元素的颜色或其背景色
```

#### 3、如何解决 margin-top 溢出问题
```
  1、给父元素增加边框
  2、溢出隐藏，在父元素的style里面添加overflow：hidden
  3、给父元素添加position:fixed，将父元素显示在固定位置
  4、给父元素设置display：table
  5、使用伪元素，给父元素增加 clearfix类名 (推荐)
    .clearfix::before{
      content: '';
      display: table;
    }
```
## 手写js方法
#### 4、实现一个 fn方法 调用fn([0, 1, 2, '1', '1', 3, '3'])  输出  [0, 1, 2, '1', 3, '3']
```js
  let arr = [0, 1, 2, '1', '1', 3, '3']
  function fn (arr) {
    return [...new Set(arr)]
  }
  fn(arr)
```

#### 5、手写Promise.all方法
```js
// 答案
function promiseAll(arr) {
  const promiseArr = Array.from(arr)
  const len = promiseArr.length
  let count = 0
  let resultArr = []
  return new Promise((resolve,reject) => {
    promiseArr.forEach(p => {
      Promise.resolve(p).then(res => {
        count++
        resultArr.push(res)
        if(count === len) {
          return resolve(resultArr)
        }
      }).catch(e => {
        reject(e)
      })
    })
  })
}
```

#### 6、实现 obj.allKeys() 方法 ：console.log(obj.allKeys())   =>   [a,b,c,d,e,f,g,h,i]
```js
  const obj = {
    a: "12",
    b: "23",
    first: {
      c: "34",
      d: "45",
      second: {e: "56",f: "67",three: {g: "78",h: "89",i: "90"}
    }
  }
  console.log(obj.allKeys())   =>   [a,b,c,d,e,f,g,h,i]
```
## 程序题
#### 7、请输出以下程序的执行结果
```js
  fn ()
  function fn () {
    console.log(1)
  };
  fn()
  var fn = 10;
  fn()
  function fn() {
    console.log(2)
  };
  fn();
  // 2  2  fn is not a function
```

#### 8、请输出以下程序的执行结果
```js
  function Fn() {
    var num = 10;
    this.x =100;
    this.getx = function () {
      console.log(x)
    }
  }
  var f1 = new Fn;
  console.log(f1.num) // undefined
  console.log(num) // 报错 num is not defined 不再执行
  console.log(f1.getx)
```

#### 9、请输出以下程序的执行结果
```js
  async function async1() {
    console.log('async1 start')
    await async2()
    console.log('async1 end')
  }
  async function async2() {
    console.log('async2')
  }
  async1()
  console.log('script start')

  setTimeout(function(){
    console.log('setTimeout')
  }, 0);

  new Promise(function(resovle){
    console.log('promise1')
    resovle();
  }).then(function(){
    console.log('promise2')
  })
  console.log('script end')

  // async1 start、async2、script start、promise1、script end、async1 end、promise2、setTimeout
```

#### 10、请输出以下程序的执行结果
```js
  var num = 10
  var obj = {num: 20}
  obj.fn = (function(num){
    this.num = num * 3
    num++
    return function (n) {
      this.num += n
      num++
      console.log(num)
    }
  })(obj.num)
  var fn = obj.fn

  fn(5) // 22
  obj.fn(10) // 23
  console.log(num, obj.num) // 65  30
```
