---
title: 'ES6知识点'
sidebar: auto
categories: 日常总结
tags:
 - js
collapsable: true
---

## 1、let和const
#### let命令
- 只在声明的代码块作用域中有效，看官方例子：
```js
var a = [];
for (let i = 0; i < 10; i++) {
    a[i] = function () {
        console.log(i);
    };
}
a[6](); // 6 如果换成var声明 输出10
```
上述代码<font color='red'>let</font>声明输出6，是因为每次循环的时候<font color='red'>i</font>都是一个新的变量，在for循环的时候，JavaScript引擎内部会记住上次循环的值，来初始话本轮的变量<font color='red'>i</font>，在进行下一轮循环。<font color='red'>for</font>循环中设置循环变量那部分和循环体内部是父子作用域。

- 不存在变量提升、不允许重复声明、父作用域不受子作用域影响，避免导致暂时性死区（TDZ）

暂时性死区：只要块级作用域内存在<font color='red'>let</font>声明的变量，就不会在受外部影响，
```js
var tmp = 123;
if (true) {
    tmp = 'abc'; // ReferenceError
    let tmp;
}

// 父作用域不受子作用域影响
function f1() {
    let n = 5;
    if (true) {
        let n = 10;
    }
    console.log(n); // 5 如果改成var则输出10
}
```
如果在<font color='red'>let</font>声明变量之前赋值，报错～
```js
if (true) {
    // TDZ开始
    tmp = 'abc'; // ReferenceError
    console.log(tmp); // ReferenceError

    let tmp; // TDZ结束
    console.log(tmp); // undefined

    tmp = 123;
    console.log(tmp); // 123
}
```

#### const命令
- 没有变量提升、存在暂时性死区
- 声明后必须赋值，否则报错
- 只在声明的块级作用域内有效
- 声明一个只读常量，值不能改变，再次赋值修改会报错
:::tip
并不是变量的值不得改动，而是变量指向的那个内存地址所保存的数据不得改动，对于简单类型的数据，值就保存在变量指向的那个内存地址，因此等同于常量，对象和数组来说，const只能保证这个指针是固定的（即总是指向另一个固定的地址），至于它指向的数据结构是不是可变的，就完全不能控制了，因此对象属性是可以修改的。
:::
```js
// 对象
const foo = {};
// 为 foo 添加一个属性，可以成功
foo.prop = 123;
foo.prop // 123
// 将 foo 指向另一个对象，就会报错
foo = {}; // TypeError: "foo" is read-only

// 数组
const a = [];
a.push('Hello'); // 可执行
a.length = 0;    // 可执行
a = ['Dave'];    // 报错
```

## 2、变量的解构赋值
#### 数组解构
按照数组对应的下标顺序将对应的值取出
```js
let [a, [b], d] = [1, [2, 3], 4];
a // 1
b // 2
d // 4
```
在冒泡排序中的应用
```js
for (var i = 1; i < arr.length-1; i++) {
    for (var j = 1; j < arr.length-1; j++) {
        // 相邻两值比较大小 交换位置
        if (arr[j] > arr[j+1]) {
            // es6解构
            [arr[j],arr[j+1]] = [arr[j+1],arr[j]]
        }
    }
}
```
#### 对象解构
变量名必须和解构对象中的属性名一致
```js
let { name, fun } = { name: '张三', fun: () => {...} }
```

由于数组本质是特殊的对象，因此可以对数组进行对象属性的解构
```js
let arr = [1, 2, 3];
let {0 : first, [arr.length - 1] : last} = arr;
first // 1
last // 3
```

::: warning
将一个已经声明的变量用于解构赋值，不能将{}写在首行，JavaScript引擎会将其解析成代码块作用域，报错
:::
```js
// 错误的写法
let a;
{ a } = { a:1 } // SyntaxError: syntax error

// 正确的写法
let x;
({x} = {x: 1})
```

#### 字符串解构
```js
const [a, b, c, d, e] = 'hello'
a // "h"
b // "e"
c // "l"
d // "l"
e // "o"
```
类似数组的对象都有一个length属性，因此还可以对这个属性解构赋值。
```js
let {length : len} = 'hello';
len // 5
```

#### 函数参数的解构赋值
```js
function add([x, y]){
  return x + y;
}
add([1, 2]); // 3

[[1, 2], [3, 4]].map(([a, b]) => a + b);
// [ 3, 7 ]

function example() {
    return {
        foo: 1,
        bar: 2
    };
}
let { foo, bar } = example();
```

## 3、模版字符串
字符串中嵌入变量，引号替换成 `` ,加号省略，用${}包裹
```js
let name = "Bob", time = "today";
`Hello ${name}, how are you ${time}?`
```

## 4、新增字符串方法
#### includes(str, n)
是否找到了参数字符串
```js
let s = 'Hello world!';
s.includes('Hello', 6) // false
```

#### startsWith(str, n)
参数字符串是否在原字符串的头部
```js
let s = 'Hello world!';
s.startsWith('world', 6) // true
```

#### endsWith(str, n)
参数字符串是否在原字符串的尾部
```js
let s = 'Hello world!';
s.endsWith('Hello', 5) // true
```
::: warning 注意：
三个方法都支持第二个参数n(搜索位置,可省略)，endsWith用法有所不同。它针对前n个字符，而其他两个方法针对从第n个到最后。
:::

#### repeat(n)
将原字符串重复n次，返回新字符串，参数是小数会被取整，为0或者传入字符串都返回空字符串（NaN等同于0），不能为负数
```js
'hello'.repeat(2) // "hellohello"
'na'.repeat(2.9) // "nana"
'na'.repeat(-1) // RangeError报错
'na'.repeat(NaN) // ""
'na'.repeat('na') // ""
```

#### padStart(n, str)
指定字符串不够长度，用于头部补全，n: 补全长度(省略默认使用空格补全)  str: 需要补都字符串
```js
'x'.padStart(4, 'ab') // 'abax'
'x'.padStart(4) // '   x'
'1'.padStart(10, '0') // "0000000001"
'12'.padStart(10, 'YYYY-MM-DD') // "YYYY-MM-12"
'09-12'.padStart(10, 'YYYY-MM-DD') // "YYYY-09-12"
```

#### padEnd(n, str)
指定字符串不够长度，用于尾部补全，n: 补全长度(省略默认使用空格补全)  str: 需要补都字符串
```js
'x'.padEnd(5, 'ab') // 'xabab'
'x'.padEnd(4) // 'x   '
```

#### trimStart()
消除字符串头部的空格，返回新字符串，别名：trimLeft()

#### trimEnd()
消除字符串尾部的空格，返回新字符串，别名：trimRight()

#### matchAll()
返回一个正则表达式在当前字符串的所有匹配

## 5、Number对象的扩展

#### Number.isFinite(number)
检测一个值是否有限，即不是<font color='red'> Infinity </font>（Infinity表示一个无穷大的数）<br>
如果参数类型不是Number，一律返回false
```js
Number.isFinite(15); // true
Number.isFinite(NaN); // false
Number.isFinite(Infinity); // false
Number.isFinite(-Infinity); // false
Number.isFinite('foo'); // false
```
#### Number.isNaN()
检查一个值是否为NaN，如果参数类型不是NaN，Number.isNaN一律返回false
```js
Number.isNaN(NaN) // true
Number.isNaN(15) // false
Number.isNaN(true) // false
```
::: warning 注意
他们于传统的 isFinite() 和 isNaN() 的区别在于，传统方法先调用Number()将非数值的值转为数值，再进行判断，而这两种新方法只针对参数类型是Number的数据有效，否则一律返回false
:::
```js
// 传统isFinite于Number.isFinite对比
isFinite(25) // true
isFinite("25") // true
Number.isFinite(25) // true
Number.isFinite("25") // false

// 传统isNaN于Number.isNaN对比
isNaN(NaN) // true
isNaN("NaN") // true
Number.isNaN(NaN) // true
Number.isNaN("NaN") // false
```

#### Number.parseInt()
于全局parseInt()方法行为保持不变，只不过将此方法移植到Number对象上

#### Number.parseFloat()
于全局parseFloat()方法行为保持不变，只不过将此方法移植到Number对象上

#### Number.isInteger()
判断一个值是否为整数，如果参数非数值，一律返回false
```js
Number.isInteger(25) // true
Number.isInteger(25.1) // false
Number.isInteger() // false
Number.isInteger(null) // false
Number.isInteger('15') // false
Number.isInteger(true) // false
```
::: warning 注意
如果对数据精度的要求较高，不建议使用，参数为 3.0000000000000002 返回 true，判断错误，由于 JavaScript 采用 IEEE 754 标准，数值存储为64位双精度格式，数值精度最多可以达到 53 个二进制位（1 个隐藏位与 52 个有效位）。如果数值的精度超过这个限度，第54位及后面的位就会被丢弃，这种情况下，Number.isInteger可能会误判。类似的情况还有，如果一个数值的绝对值小于Number.MIN_VALUE（5E-324），即小于 JavaScript 能够分辨的最小值，会被自动转为 0。这时，Number.isInteger也会误判。
:::
```js
// 误判情况
Number.isInteger(3.0000000000000002) // true
Number.isInteger(5E-325) // true
```

## 6、Math对象的扩展

#### Math.trunc()
去除一个数的小数部分，返回整数部分，内部使用Number方法将参数先转为数值，对于空值和无法截取整数的值，返回NaN。
```js
Math.trunc(4.1) // 4
Math.trunc(true) //1
Math.trunc(false) // 0
Math.trunc(null) // 0
Math.trunc(NaN);      // NaN
Math.trunc('foo');    // NaN
Math.trunc();         // NaN
Math.trunc(undefined) // NaN

// 对于没有部署这个方法的环境，可以用下面的代码模拟。
Math.trunc = Math.trunc || function(x) {
    return x < 0 ? Math.ceil(x) : Math.floor(x);
};
```

#### Math.sign()
判断一个数是正数、负数、还是零。对于非数值，会先将其转换为数值，它会返回五种值：

| 参数 | 返回值 |
|  :----:  | :----:  |
|  正数  | 1  |
|  负数  | -1  |
|  0    | 0  |
|  -0   | -0  |
|  其他值  | NaN  |
```js
Math.sign(-5)   /* -1 */             Math.sign(true)       // 1
Math.sign(5)    /* 1 */              Math.sign('')         // 0
Math.sign(0)    /* 0 */              Math.sign(false)      // 0
Math.sign(-0)   /* -0 */             Math.sign(null)       // 0
Math.sign(NaN)  /* NaN */            Math.sign('9')        // 1
Math.sign()     /* NaN */            Math.sign(undefined)  // NaN

// 对于没有部署这个方法的环境，可以用下面的代码模拟。
Math.sign = Math.sign || function(x) {
    x = +x; // convert to a number
    if (x === 0 || isNaN(x)) {
        return x;
    }
    return x > 0 ? 1 : -1;
};
```

#### Math.cbrt()
计算一个数的立方根

#### Math.hypot()
返回所有参数的平方和的平方根
```js
Math.hypot(3, 4);        // 5
Math.hypot(3, 4, 5);     // 7.0710678118654755
Math.hypot();            // 0
Math.hypot(NaN);         // NaN
Math.hypot(3, 4, 'foo'); // NaN
Math.hypot(3, 4, '5');   // 7.0710678118654755
Math.hypot(-3);          // 3
```

## 7、函数的扩展

#### 函数参数设置默认值
ES6 允许为函数的参数设置默认值，即直接写在参数定义的后面
```js
function log(x, y = 'World') {
    console.log(x, y);
}
```
一个官方小案例
```js
// 写法一
function m1({x = 0, y = 0} = {}) {
    return [x, y];
}

// 写法二
function m2({x, y} = { x: 0, y: 0 }) {
    return [x, y];
}

// 函数没有参数的情况
m1() // [0, 0]
m2() // [0, 0]

// x 和 y 都有值的情况
m1({x: 3, y: 8}) // [3, 8]
m2({x: 3, y: 8}) // [3, 8]

// x 有值，y 无值的情况
m1({x: 3}) // [3, 0]
m2({x: 3}) // [3, undefined]

// x 和 y 都无值的情况
m1({}) // [0, 0];
m2({}) // [undefined, undefined]

m1({z: 3}) // [0, 0]
m2({z: 3}) // [undefined, undefined]
```
::: tip
我的理解：首先搞懂一点，注意这里的参数是{}，而不是里面的x，y，等号右边赋值是没有参数的情况下才执行。

方法一：首先弄明白解构默认值是{x=0,y=0}。当没有参数的时候，默认值 = {}，执行 return [x,y] 解构操作，因此返回[0,0]。当有参数的时候，哪怕是控对象{},此时的默认值为{x=0,y=0}等号右边不会执行，这才是关键点。

方法二：当没有参数的时候，默认值 = {x=0,y=0}，执行 return [x,y] 解构操作，同样返回[0,0]。有参数时，思路同方法一。
:::

#### rest 参数 （...变量名）
::: tip
<font color='red'>rest</font> 参数（形式为...变量名），用于获取函数的<font color='red'>多余参数</font>，代替arguments，arguments是一个类数组，需要 <font color='red'>Array.prototype.slice.call(arguments)</font> 来转换成数组，<font color='red'>rest</font> 参数一个真正的数组。

<font color='red'>rest</font> 参数只能作为最后一个参数（因为它代替的就是多余参数）
:::
```js
// arguments变量的写法
function sortNumbers() {
    return Array.prototype.slice.call(arguments).sort();
}

// rest参数的写法
const sortNumbers = (...numbers) => numbers.sort();
```

#### name属性
函数的name属性，返回该函数的函数名
```js
function foo() {}
foo.name // "foo"

var f = function () {};
f.name // "f"

const bar = function baz() {};
bar.name // "baz"
```

#### 箭头函数
- 如果函数参数只有一个,()可省略，函数体只返回一条语句，{}，return可省略，可以这么写
```js
var f = v => v;
var g = (x,y) => x + y;

// 等同于
var f = function (v) {
    return v;
};
```
- 如果无参数，可用()代替
```js
var f = () => 5;
// 等同于
var f = function () { return 5 };

```
- rest参数于箭头函数结合
```js
const number = (...nums) => nums;
numbers(1, 2, 3, 4, 5) // [1,2,3,4,5]

const headAndTail = (head, ...tail) => [head, tail];
headAndTail(1, 2, 3, 4, 5) // [1,[2,3,4,5]]
```
::: warning 注意几点：
- 函数体内的this对象，指向定义时的对象，不可变，不指向调用时的对象
- 不可以当作构造函数，也就是说，不可以使用new命令，否则会抛出一个错误
- 不可以使用arguments对象，该对象在函数体内不存在。如果要用，可以用 rest 参数代替
:::

- 其实箭头函数根本没有自己的this，指向的是外部this，转成ES5一目了然：
```js
// ES6
function foo() {
    setTimeout(() => {
        console.log('id:', this.id);
    }, 100);
}

// ES5
function foo() {
    var _this = this;
    setTimeout(function () {
        console.log('id:', _this.id); // 引用外部this
    }, 100);
}
```
::: warning
正因为箭头函数体内没有this，就不能用<font color='red'>call</font>、<font color='red'>apply</font>或<font color='red'>bind</font>来改变this指向
:::
官方案例，请问下面的代码之中有几个this？
```js
function foo() {
    return () => {
        return () => {
            return () => {
                console.log('id:', this.id);
            };
        };
    };
}

var f = foo.call({id: 1});

var t1 = f.call({id: 2})()(); // id: 1
var t2 = f().call({id: 3})(); // id: 1
var t3 = f()().call({id: 4}); // id: 1

// 它们的this其实都是最外层foo函数的this。
```

#### <font color='red'>不适用场合</font>
1、第一个场合是定义对象的方法，且该方法内部包括this，this指向的是window
```js
const cat = {
    lives: 9,
    jumps: () => {
        this.lives--;
    }
}
```
2、第二个场合是需要动态this的时候，如下，this并不是指向被点击元素
```js
var button = document.getElementById('press');
button.addEventListener('click', () => {
    this.classList.toggle('on'); // this并不是指向被点击元素 button
});
```

## 8、数组的扩展

#### 扩展运算符
::: tip
语法是三个点（...）。它好比 rest 参数的逆运算，将一个数组转为用逗号分隔的参数序列。
:::
- 该运算符主要用于函数调用
```js
function add(x, y) {
    return x + y
}
const numbers = [4, 38]
add(...numbers) // 42
```
- 扩展运算符后面还可以放置表达式。
```js
let x = 6
const arr = [
    ...(x > 0 ? ['a'] : []),
    'b',
];
console.log(arr) // ["a", "b"]
```

- 复制数组
数组是复合的数据类型，直接复制的话，只是复制了指向底层数据结构的指针，而不是克隆一个全新的数组。
```js
const a1 = [1, 2];
const a2 = [...a1];
// 修改a2得值不会影响a1
a2[0] = 2
a2 // [2,2]
a1 // [1,2]
```

- 合并数组
```js
const arr1 = ['a', 'b'];
const arr2 = ['c'];
const arr3 = ['d', 'e'];

// ES5 的合并数组
arr1.concat(arr2, arr3);
// [ 'a', 'b', 'c', 'd', 'e' ]

// ES6 的合并数组
[...arr1, ...arr2, ...arr3]
// [ 'a', 'b', 'c', 'd', 'e' ]
```
```js
const a1 = [{ foo: 1 }];
const a2 = [{ bar: 2 }];

const a3 = a1.concat(a2);
const a4 = [...a1, ...a2];

a3[0] === a1[0] // true
a4[0] === a1[0] // true
```
上面代码中，a3和a4是用两种不同方法合并而成的新数组，但是它们的<font color='red'>成员都是对原数组成员</font>的引用，以上都属于浅拷贝。如果修改了引用指向的值，会同步反映到新数组。

一个易错点
```js
function push(arr, ...items) {
    arr.push(...items)
    return arr
}

let arr1 = [0, 1, 2];
let arr2 = [3, 4, 5];

push(arr1, arr2)     // [1, 2, [3, 6, 8]] 结果错误
arr1.push(...arr2)   // [1, 2, 3, 6, 8]   正确
push(arr1, ...arr2)  // [1, 2, 3, 6, 8]   正确
```
::: warning 错误原因：
push方法中的items此时作为函数的参数，可以理解为是一个类数组对象，形如[items]，经过...items处理后，返回的是传入的参数值

例如 items传入的是n, items == [n], ...items == n，联想一下arguments就很好理解了，...itmes就是arguments转成真正数组的结果
:::

- 将字符串转为数组
```js
[...'hello']
// [ "h", "e", "l", "l", "o" ]
```

#### Array.from()
Array.from方法用于将类数组对象转为真正的数组
```js
let arrayLike = {
    '0': 'a',
    '1': 'b',
    '2': 'c',
    length: 3
};

// ES5的写法
var arr1 = [].slice.call(arrayLike); // ['a', 'b', 'c']

// ES6的写法
let arr2 = Array.from(arrayLike); // ['a', 'b', 'c']

// arguments对象
function foo() {
    var args = Array.from(arguments);
    // 跟扩展运算符作用差不多
}
```

#### Array.of()
Array.of方法用于将一组值，转换为数组。
传统的Array()方法，参数小于两个的时候，是设置数组的长度，只有当参数不少于两个的时候才会返回由参数组成的数组。
```js
Array() // []
Array(3) // [, , ,]
Array(3, 11, 8) // [3, 11, 8]
```
Array.of基本上可以用来替代Array()或new Array()，并且不存在由于参数不同而导致的重载。它的行为非常统一。
```js
Array.of()          // []
Array.of(undefined) // [undefined]
Array.of(1)         // [1]
Array.of(1, 2)      // [1, 2]
```
Array.of方法可以用下面的代码模拟实现。
```js
function ArrayOf(){
    return [].slice.call(arguments);
}
```

#### 数组实例的 copyWithin()
在当前数组内部，将指定位置的成员复制到其他位置（会覆盖原有成员），返回当前数组，会修改原数组
```js
Array.prototype.copyWithin(target, start = 0, end = this.length)
```
| 参数 | 作用 |
| --  | -- |
| target 必需 | 从该位置开始替换数据，如果为负数，表示倒数 
| start 可选 | 从该位置开始读取数据，默认0，负值表示从末尾开始计算 
| end 可选 | 截止到该位置停止读取数据，默认等于数组长度，负值表示从末尾开始计算 
```js
// 将3号位复制到0号位
[1, 2, 3, 4, 5].copyWithin(0, 3, 4)
// [4, 2, 3, 4, 5]

// -2相当于3号位，-1相当于4号位
[1, 2, 3, 4, 5].copyWithin(0, -2, -1)
// [4, 2, 3, 4, 5]

// 将3号位复制到0号位
[].copyWithin.call({length: 5, 3: 1}, 0, 3)
// {0: 1, 3: 1, length: 5}
```

#### 数组实例的 find() 和 findIndex()
找出数组中符合条件的第一个元素 和 元素位置下标
```js
[1, 5, 10, 15].find(function(value, index, arr) {
    return value > 9;
}) // 10

[1, 5, 10, 15].findIndex(function(value, index, arr) {
    return value > 9;
}) // 2
```
这两个方法都可以接受第二个参数，用来绑定回调函数的this对象。
```js
// find函数接收了第二个参数person对象，回调函数中的this对象指向person对象。
function f(v){
    return v > this.age;
}
let person = {name: 'John', age: 20};
[10, 12, 26, 15].find(f, person);    // 26
```

#### 数组实例的 includes() 
<font color='red'>Array.prototype.includes</font>方法返回一个布尔值，表示某个数组是否包含给定的值

可代替<font color='red'>indexOf()</font>方法，此方法使用 === 来判断，会对NaN误判，<font color='red'>includes()</font>方法不存在这种情况
```js
[1, 2, 3].includes(2)     // true
[1, 2, 3].includes(4)     // false
[1, 2, NaN].includes(NaN) // true
```

#### 数组实例的 flat()，flatMap()
- <font color='red'>Array.prototype.flat() </font>用于将嵌套的数组“拉平”，变成一维的数组。该方法返回一个新数组，对原数据没有影响

<font color='red'>flat() </font>默认只会“拉平”一层，如果想要“拉平”多层的嵌套数组，可接收一个参数：表示想要拉平的层数，默认为1。
```js
[1, 2, [3, 4]].flat()        // [1, 2, 3, 4]
[1, 2, [3, [4, 5]]].flat()   // [1, 2, 3, [4, 5]]
[1, 2, [3, [4, 5]]].flat(2)  // [1, 2, 3, 4, 5]
```
如果不管有多少层嵌套，都要转成一维数组，可以用<font color='red'>Infinity</font>关键字作为参数。
```js
[1, [2, [3]]].flat(Infinity)    // [1, 2, 3]
```

- <font color='red'>flatMap()</font>方法对原数组的每个成员执行一个函数，然后对返回值组成的数组执行<font color='red'>flat()</font>方法。
该方法返回一个新数组，不改变原数组。
```js
// 相当于 [[2, 4], [3, 6], [4, 8]].flat()
[2, 3, 4].flatMap((x) => [x, x * 2])    // [2, 4, 3, 6, 4, 8]
```
- <font color='red'>flatMap()</font>只能展开一层数组。
```js
// 相当于 [[[2]], [[4]], [[6]], [[8]]].flat()
[1, 2, 3, 4].flatMap(x => [[x * 2]])    // [[2], [4], [6], [8]]
```

- <font color='red'>flatMap()</font>方法参数是一个遍历函数，该函数可以接受三个参数，分别是当前数组成员、当前数组成员的位置（从零开始）、原数组。
```js
arr.flatMap(function callback(currentValue[, index[, array]]) {
    // ...
}[, thisArg])
```
- <font color='red'>flatMap()</font>方法还可以有第二个参数，用来绑定遍历函数里面的this。同<font color='red'>find</font>函数第二个参数用法一致