---
title: 'es6相关'
collapsable: true
keys:
 - '10f7df2451ae3f3c02d31cbd1ee825f8'
---

### 1、promise原理，手写
```js
```

### 2、手写promise.all()
```js
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

### 3、class类的继承
- 通过calss关键字声明对象，constructor属性作为构造方法，在方法中可自定义属性，默认自行调用，可以理解为就是构造器函数
- 子类通过extends实现继承
- 子类如果没有自定义constructor函数，会默认添加一个，然后执行super()方法，相当于调用父类的构造函数，super函数可以获取父类的this，调用之后this指向子类，也就是 父类.prototype.constructor.call(this)
- 子类如果有constructor方法，则必须调用super()函数，如果不调用，子类得不到this对象，super()作为父类的构造函数，只能出现在子类的constructor方法中，super指向的是父类的原型对象，所以可以调用父类的属性和方法

- static关键字加在属性和方法前面，表示该属性和方法是私有的，不会被继承，是类的属性，不是类的实例属性
- new.target用在构造函数中，constructor中应用返回当前class
- 子类.__proto__ === 父类
- 子类.prototype.__proto__ === 父类.prototype（可以看出子类.prototype相当于父类的实例）
- 子类实例.__proto__.__proto__ === 父类实例.__proto__
```js
class Animal {
    static color = '红色';
    constructor(name,age) {
        this.name = name
        this.age = age
        console.log(new.target === Animal)
    }
    say() {
        return this.name + '::' + this.age
    }
    static consoleColor() {
        return `Animal颜色为${this.color}`
    }
}
var animals = new Animal()
console.log(Animal.color)
console.log(Animal.consoleColor())

class Cat extends Animal {
    constructor(name,age,color) {
        super(name,age)
        this.color = color
    }
    eat() {
        return '猫捉老鼠！'
    }
}
var cats = new Cat('小花',12,'红色')

console.log(cats.__proto__.__proto__ === animals.__proto__) // true
console.log(cats.name)
console.log(cats.age)
console.log(cats.say())
console.log(cats.eat())
console.log(cats.consoleColor()) // cats.consoleColor is not a function
```