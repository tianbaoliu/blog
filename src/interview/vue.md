---
title: 'Vue相关'
collapsable: true
keys:
 - '10f7df2451ae3f3c02d31cbd1ee825f8'
---

### 1、vue数据响应式原理
#### 1、数据劫持（观察data数据的变化）<br>
es5利用的是Object.defineProperty和es6:proxy，进行数据代理，Object.defineProperty通过设置对象属性的getter/setter来监听数据变化，通过getter进行依赖收集，setter作为观察者，在数据变化后通知订阅者更新试图，但不支持代理数组，不能监听数组的变化，需要重写pop、push、shift、unshift、splice、sort、reverse，proxy是针对整个对象的代理，而不是对象的属性，不需要遍历所有属性，当然对于深层结构，递归还是需要进行的，多达13种拦截方法，proxy支持代理数组的变化
#### 2、依赖收集（收集视图依赖性了哪些数据，订阅者Dep类）<br>
所谓的依赖，就是watcher，data中绑定的数据，在getter中收集，哪个watcher触发了getter，就将此watcher存放到订阅者Dep的subs属性数组中(Dep.addSub(watcher))

```js
class Dep {
    constructor () {
        /* 用来存放Watcher对象的数组 */
        this.subs = [];
    }
    /* 在subs中添加一个Watcher对象 */
    addSub (sub) {
        this.subs.push(sub);
    }
    /* 通知所有Watcher对象更新视图 */
    notify () {
        this.subs.forEach((sub) => {
            sub.update();
        })
    }
}
```
#### 3、发布订阅者模式（数据变化时，自动更新视图数据）<br>
在setter中触发，当数据放生变化时，把所有的watcher都通知一遍,Dep.notify()，watcher类来表示观察订阅依赖，可以理解为一个中介，数据变化时通知中介，再由中介通知视图更新，执行update()，订阅者就会调用patch给真实的DOM打补丁，更新相应的视图

### 2、nextTick实现原理是什么？
在vue响应式中，并不是每次数据发生变化，就会立刻更新DOM，而是将这些操作缓存在一个队列，在同一事件循环中的所有数据变化完成之后，再统一进行视图更新（比如同一个watcher被多次触发），nextTick函数，就是在DOM更新后调用的，所以可以获取到更新后的DOM值

只要发现数据变化，vue会开启一个队列，并缓冲在同一事件循环中发生的所有数据变化，如果同一个watcher被触发多次，只会堆入队列一次。这里涉及到事件循环中的微任务和宏任务，js在执行栈中首先执行同步代码，发现异步代码会放入队列中等待执行，像Promise、MutationObserver等属于微任务，setTimeout等属于宏任务，先执行微任务，后执行宏任务，最后都执行完毕，清空执行栈。例如vue异步改变数据时，发现某个watcher发生变化，依次判断是否支持Promise ——> MutationObserver  ——> setImmediate  ——> setTimeout方法，在当前事件循环结束后，哪个支持就用哪个处理更新DOM，然后再开启下一次事件循环，这也是vue做的微任务向宏任务的降级方案，由于浏览器兼容问题导致。
### 3、watch 和 computed的区别及原理
- computed支持缓存，只有依赖数据发生变化时，才会改变，不支持异步
- watch不支持缓存，数据改变会直接触发相应操作，支持异步

### 4、组件中的data为什么是一个函数？
如果一个组件被复用多次的话，会创建多个实例，这些实例本质上都是同一个构造函数，如果data是对象，属于引用类型，会影响所有实例，所以为了data不冲突，必须是一个函数

### 5、Vue模版编译原理知道吗？
- 第一步是 将模板解析为 AST（抽象语法树）—— 解析器
- 第二步是 遍历 AST 标记静态节点，主要用来做虚拟DOM的渲染优化 —— 优化器
- 第三步是 使用 AST 生成 render 函数代码字符串 —— 代码生成器

### 6、Diff算法的实现
渲染真实DOM开销很大，在vue中，会根据真实DOM生成虚拟DOM树，当虚拟DOM某个节点发生变化后会生成一个新的节点Vnode，Vnode和oldVnode做对比，发现不一致的地方，修改对应的正式DOM，然后使oldVnode的值为Vnode。diff的过程就是调用名为patch的函数，比较新旧节点，一边比较一边给真实的DOM打补丁

### 7、你都做过哪些Vue的性能优化？
- 尽量减少data中的数据，data中的数据都会增加getter和setter，会收集对应的watcher
- v-if和v-for不能连用，key保证唯一
- 如果需要使用v-for给每项元素绑定事件时使用事件代理
- SPA 页面采用keep-alive缓存组件
- 合理使用v-if替代v-show
- 使用路由懒加载、异步组件
- 防抖、节流
- 第三方模块按需导入
- 图片懒加载和预加载
- 使用cdn加载第三方资源
- 预渲染
- 服务端渲染SSR
- 服务端开启gzip压缩
    
### 8、vue配置代理，为什么可以代理，原理是什么？
2.X版本实现跨域
```js
dev{
	proxyTable: {
      '/api': {
        target: 'http://192.168.0.1:200', // 要代理的域名
        changeOrigin: true,//允许跨域
        pathRewrite: {
          '^/api': '' // 这个是定义要访问的路径，名字随便写
        }
   }
}
```
3.X版本实现跨域
```js
devServer: {
    proxy: {
        '/api': {
            target: 'https://you.163.com/', //接口域名
            changeOrigin: true,             //是否跨域
            ws: true,                       //是否代理 websockets
            secure: true,                   //是否https接口
            pathRewrite: {                  //路径重置
                '^/api': ''
            }
        }
    }
}
```
- 原理：浏览器是禁止跨域的，但是服务端不禁止，在本地运行npm run dev等命令时实际上是用node运行了一个服务器，因此proxyTable实际上是将请求发给自己的服务器，再由服务器转发给后台服务器，做了一曾代理，因此解决跨域问题。

### 2、vue-router有哪些组件
```
<router-link>  <router-view>  <keep-alive>
```

### 3、vue-router的两种模式
#### hash模式  
- 原理是onhashchange事件，可以在window对象上监听这个事件
#### history模式
- 利用了HTML5 History Interface 中新增的pushState()和replaceState()方法。
- 强制刷新会丢失，需要后台配置支持。如果刷新时，服务器没有响应响应的资源，会刷出404

### 4、vue-router如何实现路由懒加载（动态加载路由）
```js
const router = new VueRouter({
    routes: [
        {
            path: '/home',
            name: 'Home'，
            component:() => import('../views/home') // 懒加载
        }
    ]
})
```

### 5、$route和 $router的区别是什么？
- router是vueRouter的实例，是一个全局路由对象，包含了路由跳转的方法，钩子等函数
- route是路由信息对象，每个路由都有一个route对象，是一个局部对象，包含 path,params,hash,query,name等路由信息参数。

### 6、vue-router 传参
- params形式，只能使用name，参数不会显示在路由上，强制刷新参数会丢失
```js
this.$router.push({
    name: 'Home',
    params: {
        number: 123, code: 99
    }
})
var p = this.$route.params // 接收参数对象
```

- query形式，name可以使用path，参数会显示在路由上，强制刷新路由参数不会被清空
```js
this.$router.push({
    name: 'Home',
    query: {
        number: 123, code: 99
    }
})
var p = this.$route.query // 接收参数对象
```
