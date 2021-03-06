# js继承（二）

## 封装
Javascript是一种基于对象（object-based）的语言，你遇到的所有东西几乎都是对象。但是，它又不是一种真正的面向对象编程（OOP）语言，因为它的语法中没有class（类）备注：说的是ES6之前。
那么，如果我们要把"属性"（property）和"方法"（method），封装成一个对象，甚至要从原型对象生成一个实例对象，我们应该怎么做呢？

### 一、 生成实例对象的原始模式
假定我们把猫看成一个对象，它有"名字"和"颜色"两个属性。
```js
var Cat = {
    name : '',
    color : ''
}
```
现在，我们需要根据这个原型对象的规格（schema），生成两个实例对象。
```js
var cat1 = {}; // 创建一个空对象
cat1.name = "大毛"; // 按照原型对象的属性赋值
cat1.color = "黄色";
var cat2 = {};
cat2.name = "二毛";
cat2.color = "黑色";
```
好了，这就是最简单的封装了，把两个属性封装在一个对象里面。但是，这样的写法有两个缺点，一是如果多生成几个实例，写起来就非常麻烦；二是实例与原型之间，没有任何办法，可以看出有什么联系。<br/>

### 二、 原始模式的改进
我们可以写一个函数，解决代码重复的问题。
```js
function Cat(name,color) {
    return {
        name:name,
        color:color
    }
}
```
然后生成实例对象，就等于是在调用函数：
```js
var cat1 = Cat("大毛","黄色");
var cat2 = Cat("二毛","黑色");
```
这种方法的问题依然是，cat1和cat2之间没有内在的联系，不能反映出它们是同一个原型对象的实例。<br/>

### 三、 构造函数模式
为了解决从原型对象生成实例的问题，Javascript提供了一个构造函数（Constructor）模式。<br/>
所谓"构造函数"，其实就是一个普通函数，但是内部使用了this变量。对构造函数使用new运算符，就能生成实例，并且this变量会绑定在实例对象上。<br/>
比如，猫的原型对象现在可以这样写，
```js
function Cat(name,color){
    this.name=name;
    this.color=color;
}
```
我们现在就可以生成实例对象了。
```js
var cat1 = new Cat("大毛","黄色");
var cat2 = new Cat("二毛","黑色");
alert(cat1.name); // 大毛
alert(cat1.color); // 黄色
```
这时cat1和cat2会自动含有一个constructor属性，指向它们的构造函数。
```js
alert(cat1.constructor == Cat); //true
alert(cat2.constructor == Cat); //true
```
Javascript还提供了一个instanceof运算符，验证原型对象与实例对象之间的关系。
```js
alert(cat1 instanceof Cat); //true
alert(cat2 instanceof Cat); //true
```

### 四、构造函数模式的问题

构造函数方法很好用，但是存在一个<b>浪费内存</b>的问题。<br/>
请看，我们现在为Cat对象添加一个不变的属性type（种类），再添加一个方法eat（吃）。那么，原型对象Cat就变成了下面这样：
```js
function Cat(name,color){
    this.name = name;
    this.color = color;
    this.type = "猫科动物";
    this.eat = function(){alert("吃老鼠");};
}
```
还是采用同样的方法，生成实例：
```js
var cat1 = new Cat("大毛","黄色");
var cat2 = new Cat ("二毛","黑色");
alert(cat1.type); // 猫科动物
cat1.eat(); // 吃老鼠
```
表面上好像没什么问题，但是实际上这样做，有一个很大的弊端。那就是对于每一个实例对象，type属性和eat()方法都是一模一样的内容，<b>每一次生成一个实例，都必须为重复的内容，多占用一些内存</b>。这样既不环保，也缺乏效率。
```js
alert(cat1.eat == cat2.eat); //false
```
能不能让type属性和eat()方法在内存中只生成一次，然后所有实例都指向那个内存地址呢？回答是可以的。

### 五、 Prototype模式

Javascript规定，每一个构造函数都有一个prototype属性，指向另一个对象。这个对象的所有属性和方法，都会被构造函数的实例继承。<br/>
这意味着，我们可以把那些不变的属性和方法，直接定义在prototype对象上。
```js
function Cat(name,color){
    this.name = name;
    this.color = color;
}
Cat.prototype.type = "猫科动物";
Cat.prototype.eat = function(){alert("吃老鼠")};
```
然后，生成实例。
```js
var cat1 = new Cat("大毛","黄色");
var cat2 = new Cat("二毛","黑色");
alert(cat1.type); // 猫科动物
cat1.eat(); // 吃老鼠
```
这时所有实例的type属性和eat()方法，其实都是同一个内存地址，指向prototype对象，因此就提高了运行效率。
```js
alert(cat1.eat == cat2.eat); //true
```

### 六、 Prototype模式的验证方法

为了配合prototype属性，Javascript定义了一些辅助方法，帮助我们使用它。

#### 6.1 isPrototypeOf()
这个方法用来判断，某个proptotype对象和某个实例之间的关系。
```js
alert(Cat.prototype.isPrototypeOf(cat1)); //true
alert(Cat.prototype.isPrototypeOf(cat2)); //true
```
#### 6.2 hasOwnProperty()
每个实例对象都有一个hasOwnProperty()方法，用来判断某一个属性到底是本地属性，还是继承自prototype对象的属性。
```js
alert(cat1.hasOwnProperty("name")); // true
alert(cat1.hasOwnProperty("type")); // false
```
in运算符还可以用来遍历某个对象的所有属性。
```js
for(var prop in cat1) { alert("cat1["+prop+"]="+cat1[prop]); }
```

## 构造函数的继承

今天要介绍的是，对象之间的"继承"的五种方法。<br/>
```js
function Animal(){
    this.species = "动物";
}
```
还有一个"猫"对象的构造函数。<br/>
```js
function Cat(name,color){
　　 this.name = name;
　　 this.color = color;
}
```
怎样才能使"猫"继承"动物"呢？<br/><br/>

### 构造函数绑定
第一种方法也是最简单的方法，使用call或apply方法，将父对象的构造函数绑定在子对象上，即在子对象构造函数中加一行：
```js
function Cat(name,color){
    Animal.apply(this, arguments);
    this.name = name;
    this.color = color;
}
var cat1 = new Cat("大毛","黄色");
alert(cat1.species); // 动物
```
1. 优点
简单明了，直接继承超类构造函数的属性和方法
2. 缺点
无法继承原型链上的属性和方法

### prototype模式
第二种方法更常见，使用prototype属性。<br/>
如果"猫"的prototype对象，指向一个Animal的实例，那么所有"猫"的实例，就能继承Animal了。<br/>
```js
Cat.prototype = new Animal();
Cat.prototype.constructor = Cat;
var cat1 = new Cat("大毛","黄色");
alert(cat1.species); // 动物
```
代码的第一行，我们将Cat的prototype对象指向一个Animal的实例。
```js
Cat.prototype = new Animal();
```
<b>它相当于完全删除了prototype 对象原先的值，然后赋予一个新值</b>。但是，第二行又是什么意思呢？
```js
Cat.prototype.constructor = Cat;
```
原来，任何一个prototype对象都有一个constructor属性，指向它的构造函数。如果没有"Cat.prototype = new Animal();"这一行，Cat.prototype.constructor是指向Cat的；加了这一行以后，Cat.prototype.constructor指向Animal。
```js
alert(Cat.prototype.constructor == Animal); //true
```
更重要的是，每一个实例也有一个constructor属性，默认调用prototype对象的constructor属性。
```js
alert(cat1.constructor == Cat.prototype.constructor); // true
```
因此，在运行"Cat.prototype = new Animal();"这一行之后，cat1.constructor也指向Animal！
```js
alert(cat1.constructor == Animal); // true
```
这显然会导致继承链的紊乱（cat1明明是用构造函数Cat生成的），因此我们必须手动纠正，将Cat.prototype对象的constructor值改为Cat。这就是第二行的意思。<br/>
这是很重要的一点，编程时务必要遵守。下文都遵循这一点，即如果替换了prototype对象，
```js
o.prototype = {};
```
那么，下一步必然是为新的prototype对象加上constructor属性，并将这个属性指回原来的构造函数。
```js
o.prototype.constructor = o;
```

问题：

单纯的使用原型链继承，主要问题来自包含引用类型值的原型。

```js
function SuperType() {
    this.colors = ['red', 'blue', 'green']
}

function SubType() {}

SubType.prototype = new SuperType()

var instance1 = new SubType() var instance2 = new SubType()

instance1.colors.push('black') console.log(instance1.colors) // ["red", "blue", "green", "black"]
console.log(instance2.colors) // ["red", "blue", "green", "black"]
```

### 直接继承prototype

第三种方法是对第二种方法的改进。由于Animal对象中，不变的属性都可以直接写入Animal.prototype。所以，我们也可以让Cat()跳过 Animal()，直接继承Animal.prototype。<br/>
现在，我们先将Animal对象改写：
```js
function Animal(){}
Animal.prototype.species = "动物";
```
然后，将Cat的prototype对象，然后指向Animal的prototype对象，这样就完成了继承。
```js
Cat.prototype = Animal.prototype;
Cat.prototype.constructor = Cat;
var cat1 = new Cat("大毛","黄色");
alert(cat1.species); // 动物
```
与前一种方法相比，这样做的优缺点分别是：

* 优点
效率比较高（不用执行和建立Animal的实例了），比较省内存。

* 缺点
Cat.prototype和Animal.prototype现在指向了同一个对象，那么任何对Cat.prototype的修改，都会反映到Animal.prototype。

所以，上面这一段代码其实是有问题的。请看第二行
```js
Cat.prototype.constructor = Cat;
```
这一句实际上把Animal.prototype对象的constructor属性也改掉了！
```js
alert(Animal.prototype.constructor); // Cat
```

### 利用空对象作为中介
由于"直接继承prototype"存在上述的缺点，所以就有第四种方法，利用一个空对象作为中介。
```js
var F = function(){};
F.prototype = Animal.prototype;
Cat.prototype = new F();
Cat.prototype.constructor = Cat;
```
F是空对象，所以几乎不占内存。这时，修改Cat的prototype对象，就不会影响到Animal的prototype对象。
```js
alert(Animal.prototype.constructor); // Animal
```
我们将上面的方法，封装成一个函数，便于使用。
```js
function extend(Child, Parent) {
    var F = function(){};
    F.prototype = Parent.prototype;
    Child.prototype = new F();
    Child.prototype.constructor = Child;
    Child.uber = Parent.prototype;
}
```
使用的时候，方法如下
```js
extend(Cat,Animal);
var cat1 = new Cat("大毛","黄色");
alert(cat1.species); // 动物
```
这个extend函数，就是YUI库如何实现继承的方法。<br/>
另外，说明一点，函数体最后一行
```js
Child.uber = Parent.prototype;
```
意思是为子对象设一个uber属性，这个属性直接指向父对象的prototype属性。（uber是一个德语词，意思是"向上"、"上一层"。）这等于在子对象上打开一条通道，可以直接调用父对象的方法。这一行放在这里，只是为了实现继承的完备性，纯属备用性质。

### 拷贝继承
上面是采用prototype对象，实现继承。我们也可以换一种思路，纯粹采用"拷贝"方法实现继承。简单说，如果把父对象的所有属性和方法，拷贝进子对象，不也能够实现继承吗？这样我们就有了第五种方法。<br/>
首先，还是把Animal的所有不变属性，都放到它的prototype对象上。
```js
function Animal(){}
Animal.prototype.species = "动物";
```
然后，再写一个函数，实现属性拷贝的目的。
```js
function extend2(Child, Parent) {
    var p = Parent.prototype;
    var c = Child.prototype;
    for (var i in p) {
        c[i] = p[i];
    }
    c.uber = p;
}
```
这个函数的作用，就是将父对象的prototype对象中的属性，一一拷贝给Child对象的prototype对象。<br/>
使用的时候，这样写：
```js
extend2(Cat, Animal);
var cat1 = new Cat("大毛","黄色");
alert(cat1.species); // 动物
```
<br/><br/>

## 非构造函数的继承

### 一、什么是"非构造函数"的继承？

比如，现在有一个对象，叫做"中国人"。
```js
var Chinese = {
    nation:'中国'
};
```
还有一个对象，叫做"医生"。
```js
var Doctor ={
    career:'医生'
}
```
请问怎样才能让"医生"去继承"中国人"，也就是说，我怎样才能生成一个"中国医生"的对象？<br/>
这里要注意，这两个对象都是普通对象，不是构造函数，无法使用构造函数方法实现"继承"。


### 二、object()方法
json格式的发明人Douglas Crockford，提出了一个object()函数，可以做到这一点。
```js
function object(o) {
    function F() {}
    F.prototype = o;
    return new F();
}
```
这个object()函数，其实只做一件事，就是把子对象的prototype属性，指向父对象，从而使得子对象与父对象连在一起。<br/>
使用的时候，第一步先在父对象的基础上，生成子对象：
```js
var Doctor = object(Chinese);
```
然后，再加上子对象本身的属性：
```js
Doctor.career = '医生';
```
这时，子对象已经继承了父对象的属性了。
```js
alert(Doctor.nation); //中国
```

### 三、浅拷贝

除了使用"prototype链"以外，还有另一种思路：把父对象的属性，全部拷贝给子对象，也能实现继承。<br/>
下面这个函数，就是在做拷贝：
```js
function extendCopy(p) {
    var c = {};
    for (var i in p) {
        c[i] = p[i];
    }
    c.uber = p;
    return c;
}
```
使用的时候，这样写：
```js
var Doctor = extendCopy(Chinese);
Doctor.career = '医生';
alert(Doctor.nation); // 中国
```
但是，这样的拷贝有一个问题。那就是，如果父对象的属性等于数组或另一个对象，那么实际上，子对象获得的只是一个内存地址，而不是真正拷贝，因此存在父对象被篡改的可能。<br/>
请看，现在给Chinese添加一个"出生地"属性，它的值是一个数组。
```js
Chinese.birthPlaces = ['北京','上海','香港'];
```
通过extendCopy()函数，Doctor继承了Chinese。
```js
var Doctor = extendCopy(Chinese);
```
然后，我们为Doctor的"出生地"添加一个城市：
```js
Doctor.birthPlaces.push('厦门');
```
发生了什么事？Chinese的"出生地"也被改掉了！
```js
alert(Doctor.birthPlaces); //北京, 上海, 香港, 厦门
alert(Chinese.birthPlaces); //北京, 上海, 香港, 厦门
```
所以，extendCopy()只是拷贝基本类型的数据，我们把这种拷贝叫做"浅拷贝"。这是早期jQuery实现继承的方式。

### 四、深拷贝

所谓"深拷贝"，就是能够实现真正意义上的数组和对象的拷贝。它的实现并不难，只要递归调用"浅拷贝"就行了。
```js
function deepCopy(p, c) {
    var c = c || {};
    for (var i in p) {
        if (typeof p[i] === 'object') {
            c[i] = (p[i].constructor === Array) ? [] : {};
            deepCopy(p[i], c[i]);
        } else {
            c[i] = p[i];
        }
    }
    return c;
}
```
使用的时候这样写：
```js
var Doctor = deepCopy(Chinese);
```
现在，给父对象加一个属性，值为数组。然后，在子对象上修改这个属性：
```js
Chinese.birthPlaces = ['北京','上海','香港'];
Doctor.birthPlaces.push('厦门');
```
这时，父对象就不会受到影响了。
```js
alert(Doctor.birthPlaces); //北京, 上海, 香港, 厦门
alert(Chinese.birthPlaces); //北京, 上海, 香港
```
目前，jQuery库使用的就是这种继承方法。


## 附录：Javascript继承机制的设计思想

我一直很难理解Javascript语言的继承机制。<br/>
它没有"子类"和"父类"的概念，也没有"类"（class）和"实例"（instance）的区分，全靠一种很奇特的"原型链"（prototype chain）模式，来实现继承。<br/>
我花了很多时间，学习这个部分，还做了很多笔记。但是都属于强行记忆，无法从根本上理解。<br/><br/>

直到昨天，我读到法国程序员Vjeux的解释，才恍然大悟，完全明白了Javascript为什么这样设计。<br/>
下面，我尝试用自己的语言，来解释它的设计思想。彻底说明白prototype对象到底是怎么回事。其实根本就没那么复杂，真相非常简单。<br/>

### 一、从古代说起

要理解Javascript的设计思想，必须从它的诞生说起。<br/>
1994年，网景公司（Netscape）发布了Navigator浏览器0.9版。这是历史上第一个比较成熟的网络浏览器，轰动一时。但是，这个版本的浏览器只能用来浏览，不具备与访问者互动的能力。比如，如果网页上有一栏"用户名"要求填写，浏览器就无法判断访问者是否真的填写了，只有让服务器端判断。如果没有填写，服务器端就返回错误，要求用户重新填写，这太浪费时间和服务器资源了。<br/>

因此，网景公司急需一种网页脚本语言，使得浏览器可以与网页互动。工程师Brendan Eich负责开发这种新语言。他觉得，没必要设计得很复杂，这种语言只要能够完成一些简单操作就够了，比如判断用户有没有填写表单。<br/>

1994年正是面向对象编程（object-oriented programming）最兴盛的时期，C++是当时最流行的语言，而Java语言的1.0版即将于第二年推出，Sun公司正在大肆造势。<br/>
Brendan Eich无疑受到了影响，Javascript里面所有的数据类型都是对象（object），这一点与Java非常相似。但是，他随即就遇到了一个难题，到底要不要设计"继承"机制呢？<br/>

### 二、Brendan Eich的选择

如果真的是一种简易的脚本语言，其实不需要有"继承"机制。但是，Javascript里面都是对象，必须有一种机制，将所有对象联系起来。所以，Brendan Eich最后还是设计了"继承"。<br/>
但是，他不打算引入"类"（class）的概念，因为一旦有了"类"，Javascript就是一种完整的面向对象编程语言了，这好像有点太正式了，而且增加了初学者的入门难度。<br/>
他考虑到，C++和Java语言都使用new命令，生成实例。<br/>
C++的写法是：
```js
ClassName *object = new ClassName(param);
```
Java的写法是：
```js
Foo foo = new Foo();
```
因此，他就把new命令引入了Javascript，用来从原型对象生成一个实例对象。但是，Javascript没有"类"，怎么来表示原型对象呢？<br/>
这时，他想到C++和Java使用new命令时，都会调用"类"的构造函数（constructor）。他就做了一个简化的设计，在Javascript语言中，new命令后面跟的不是类，而是构造函数。<br/>
举例来说，现在有一个叫做DOG的构造函数，表示狗对象的原型。
```js
function DOG(name){
    this.name = name;
}
```
对这个构造函数使用new，就会生成一个狗对象的实例。
```js
var dogA = new DOG('大毛');
alert(dogA.name); // 大毛
```

### 三、new运算符的缺点

用构造函数生成实例对象，有一个缺点，那就是无法共享属性和方法。<br/>
比如，在DOG对象的构造函数中，设置一个实例对象的共有属性species。
```js
function DOG(name){
    this.name = name;
    this.species = '犬科';
}
```
然后，生成两个实例对象：
```js
var dogA = new DOG('大毛');
var dogB = new DOG('二毛');
```
这两个对象的species属性是独立的，修改其中一个，不会影响到另一个。
```js
dogA.species = '猫科';
alert(dogB.species); // 显示"犬科"，不受dogA的影响
```
每一个实例对象，都有自己的属性和方法的副本。这不仅无法做到数据共享，也是极大的资源浪费。

### 四、prototype属性的引入

考虑到这一点，Brendan Eich决定为构造函数设置一个prototype属性。<br/>
这个属性包含一个对象（以下简称"prototype对象"），所有实例对象需要共享的属性和方法，都放在这个对象里面；那些不需要共享的属性和方法，就放在构造函数里面。<br/>
实例对象一旦创建，将自动引用prototype对象的属性和方法。也就是说，实例对象的属性和方法，分成两种，一种是本地的，另一种是引用的。<br/>
还是以DOG构造函数为例，现在用prototype属性进行改写：
```js
function DOG(name){
    this.name = name;
}
DOG.prototype = { species : '犬科' };
var dogA = new DOG('大毛');
var dogB = new DOG('二毛');
alert(dogA.species); // 犬科
alert(dogB.species); // 犬科
```
现在，species属性放在prototype对象里，是两个实例对象共享的。只要修改了prototype对象，就会同时影响到两个实例对象。
```js
DOG.prototype.species = '猫科';
alert(dogA.species); // 猫科
alert(dogB.species); // 猫科
```

### 五、总结

由于所有的实例对象共享同一个prototype对象，那么从外界看起来，prototype对象就好像是实例对象的原型，而实例对象则好像"继承"了prototype对象一样。<br/>
这就是Javascript继承机制的设计思想。












