---
title: 'js原生相关'
collapsable: true
keys:
 - '10f7df2451ae3f3c02d31cbd1ee825f8'
---

### 1、请说出js的数据类型，判断数据类型的方法有哪些？如何精准的判断数据类型？
- 基本类型 Number、Boolean、String、Null、Undefined、Symbol 和 引用类型：Object（包含Function、Array、Data等等）
- 判断数据类型的方式有 typeof、instanceof、constructor、toString()
- typeof null 输出的是 Object，无法精准判断null类型
- instanceof 是通过原型判断，只能判断两个对象是否属于实例关系，不能判断类型，例如 [] instanceof Array 和 [] instanceof Object 都返回true（原因： [ ].__proto__  指向 Array.prototype，而 Array.prototype.__proto__ 又指向了Object.prototype）
- constructor 无法判断null和undefined，原因：constructor是原型prototype的一个属性，当函数被定义的时候，js引擎会为函数添加原型prototype，并且原型的constructor属性指向该函数，null和undefined没有constructor属性，因此判断不了
- Object.prototype.toString.call() 可以精准判断类型，输出 [object String]、[object Number]、[object Boolean]等

### 2、手写js的防抖、节流函数
- 防抖：启动一个定时器延迟一个频繁发生的动作，如果在延迟时间内监测到该定时器，就将其清除，重新启动定时任务，直到延迟时间内监测不到为止，保证只执行最后一个定时任务（比如屏幕不断放大缩小，滚动频繁拖动等行为）
```js
function debounce(fn, wait = 200) { // fn 防抖函数，wait等待时间            
    let timer = 0
    return function(...args) {
        if(timer) {
            clearTimeout(timer)
        } else {
            timer = setTimeout(() => {
                fn.call(this, ...args)
            }, wait)
        }
    }
}
```
- 节流：控制频繁发生的动作，在规定时间内指执行一次，例如：疯狂点击按钮
```js
function throttle(fn, wait = 200) {
    let flag = null
    return function(...args) {
        if(!flag) {
            flag = true
            setTimeout(() => {
                flag = null
                fn.call(this, ...args)
            }, wait)
        }
    }
}
```

### 3、说一下对js事件循环机制Event Loop的理解
- js在执行的时候会在执行栈中进行，遇到同步语句则执行，异步语句会放到消息队列中等待执行，这里的消息队列由分为宏任务队列和微任务队列，例如整个script代码、定时器，I/O操作等属于宏任务，而像promise属于微任务，因此js开始是先执行了宏任务中的同步代码，等同步代码执行完成后，清空执行栈，查询是否有异步代码需要执行，如果有，优先执行微任务队列，清空执行栈，到此第一次事件循环完毕，第二次循环开始，在执行宏任务队列中的任务，此时可能还会包含微任务，还是优先执行微任务，发现没有宏任务，事件循环结束。
- 上一次的setTimeout宏任务会在下次循环开始时执行，又开始一次循环，直到微任务执行完毕，不再有宏任务时，事件循环结束。

### 4、数组去重有哪些方法、列举数组排序的方法、手写bind原理
- [点击查看参考答案](/often/code.html)

### 5、如何实现浅拷贝和深拷贝
- Object.assign()、JSON.parse(JSON.stringify(obj))方法可以实现浅拷贝，如果拷贝对象的属性值不是引用类型，则也可以视作是深拷贝
- 深拷贝
```js
function deepCopy(obj) {
    const objCopy = obj instanceof Array ? [] : {};
    for (const o in obj) {
        if(obj.hasOwnProperty(o)) {
            if(typeof obj[o] === 'object' && obj[o] !== null) {
                objCopy[o] = deepCopy(obj[o])
            } else {
                objCopy[o] = obj[o]
            }
        }
    }
    return objCopy
}
```

### 6、谈谈对必包的理解
外层函数嵌套内层函数，内层函数可以访问到外层函数的局部变量
- 好处：可以避免污染全局变量
- 弊端：因为由于闭包引用另外一个函数的活动对象(可理解为变量)，因此这个活动对象无法被销毁，会导致内存泄漏

### 7、继承有哪些方式
#### 一、原型链继承：将父类的实例作为子类的原型
- 优点：父类新增的原型属性和方法，子类都能访问。
- 缺点：来自原型上的所有属性被所有实例共享，一个修改都改变，因为原型是共同引用的。创建子类时，无法像父类构造函数传参，无法多继承
```js
function Animal() {
    this.age = 12
}
Animal.prototype.eat = function() {
    console.log('猫捉老鼠！')
}
function Cat() {}
Cat.prototype = new Animal()
Cat.prototype.name = '小花'

var cat = new Cat()
console.log(cat.name) // 小花
console.log(cat.age)  // 12
console.log(cat.eat()) // 猫捉老鼠！
```

#### 二、构造函数继承：子类在构造函数中继承父类
- 优点：可以实现多继承，call多个父类，创建子类时，可以向父类传参
- 缺点：只能继承父类构造器中的属性/方法，无法继承原型上的属性/方法，不能函数复用
```js
function Animal() {
    this.age = 12
}
Animal.prototype.eat = function() {
    console.log('猫捉老鼠！')
}
function Cat(age) {
    Animal.call(this) // 可以call多个父类
    this.age = age
}
var cat = new Cat(6)
console.log(cat.age) // 6
console.log(cat.eat()) // 报错cat.eat is not a function
```
#### 三、组合继承：通过原型链实现原型方法的继承，通过构造函数实现实例属性的继承
- 优点：可以继承实例属性方法，也可以继承原型属性方法。不存在引用属性共享问题。可传参。函数可复用
- 缺点：调用了两次父类构造器
```js
function Animal() {
    this.age = 12
}
Animal.prototype.eat = function() {
    console.log('猫捉老鼠！')
}
function Cat(name) {
    Animal.call(this) // 可以call多个父类
    this.name = name
}
Cat.prototype = new Animal()
Cat.prototype.constructor = Cat

var cat = new Cat('小花')
console.log(cat.name) // 小花
console.log(cat.age)  // 12
console.log(cat.eat()) // 猫捉老鼠！
```

#### 四、寄生继承：创建一个封装继承过程的函数，该函数在内部以某种方式来增强对象，最后返回对象。
- 缺点：不能函数复用，即不能继承原型的方法。
```js
function createAnother(obj) {
    let clone = Object.create(obj)
    clone.say = function() {
        console.log('Hi~')
    }
    return clone
}
var Animal = {
    age : 12
}
Animal.prototype.eat = function() {
    console.log('猫捉老鼠！')
}
var cat = createAnother(Animal)

console.log(cat.age)  // 12
console.log(cat.say())  // Hi~
console.log(cat.eat()) // 报错 Cannot set property 'eat' of undefined
```

#### 五、寄生组合继承：实现只用一次父类构造器的组合继承方式
- 堪称完美，就是实现比较复杂
```js
function Animal() {
    this.age = 12
}
Animal.prototype.eat = function() {
    console.log('猫捉老鼠！')
}
function Cat(name) {
    Animal.call(this) // 可以call多个父类
    this.name = name
}

// 下面这部分替代给子类原型赋值的过程，不调用父类构造函数，直接继承父类原型
var proObj = Object.create(Animal.prototype);
proObj.constructor = Cat;
Cat.prototype  = proObj;

var cat = new Cat('小花')
console.log(cat.name) // 小花
console.log(cat.age)  // 12
console.log(cat.eat()) // 猫捉老鼠！
```

### 8、数组有哪些方法？ES6新增哪些？
原生：join()、concat()、slice()、splice()、sort()、push()、pop()、shift()、unshift()、indexOf()、forEach()、map()、reverse()、filter()、every()、some()<br/>
ES6新增：includes()、find()、findIndex()、Array.from()、Array.of()

### 9、请输出以下代码的结果
```js
// 执⾏环境为Node 11.0版本以上
console.log('main1') // 1
process.nextTick(() => {
    console.log('next tick1') // 4
})
setTimeout(() => {
    console.log('settimeout') // 5
    process.nextTick(() => {
        console.log('next tick2') // 7
    }) 
}, 0)
setTimeout(() => {
    console.log('setTimeout2') // 6
    process.nextTick(() => {
        console.log('next tick3') // 8
    }) 
})
new Promise((resolve, reject) => {
    setTimeout(() => {
        resolve()
    }) 
    console.log('promise1') // 2
}).then(() => {
    console.log('promise2') // 9
})
console.log('main2') //3

// main1、promise1、main2、next tick1、settimeout、setTimeout2、next tick2、next tick3、promise2
```

### 10、请实现allKeys => 
```js
const obj = {
    a: "12",
    b: "23",
    first: {
        c: "34",
        d: "45",
    second: { e: "56", f: "67", three: { g: "78", h: "89", i: "90" } },
    },
}

var arr = []
Object.prototype.allKeys = function() {
    var objs = this
    for (const o in objs) {
        if(typeof objs[o] === 'object') {
            objs[o].allKeys()
        } else if(typeof objs[o] !== 'function') {
            arr.push(o)
        }
    }
    return arr
}
console.log(obj.allKeys()) // => [a,b,c,d,e,f,g,h,i]
```