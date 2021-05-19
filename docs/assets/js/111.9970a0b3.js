(window.webpackJsonp=window.webpackJsonp||[]).push([[111],{706:function(e,a,r){"use strict";r.r(a);var t=r(2),s=Object(t.a)({},(function(){var e=this,a=e.$createElement,r=e._self._c||a;return r("ContentSlotsDistributor",{attrs:{"slot-key":e.$parent.slotKey}},[r("h1",{attrs:{id:"异步操作"}},[r("a",{staticClass:"header-anchor",attrs:{href:"#异步操作"}},[e._v("#")]),e._v(" 异步操作")]),e._v(" "),r("p",[e._v("JavaScript 从诞生起就是单线程，原因是不想让浏览器变得太复杂，因为多线程需要共享资源、且有可能修改彼此的运行结果，对于一种网页脚本语言来说，这就太复杂了。")]),e._v(" "),r("p",[e._v("这种模式的好处是实现起来比较简单，执行环境相对单纯；坏处是只要有一个任务耗时很长，后面的任务都必须排队等着，会拖延整个程序的执行。")]),e._v(" "),r("p",[e._v("JavaScript 语言的设计者意识到，这时 CPU 完全可以不管 IO 操作，挂起处于等待中的任务，先运行排在后面的任务。等到 IO 操作返回了结果，再回过头，把挂起的任务继续执行下去。这种机制就是 JavaScript 内部采用的“事件循环”机制（Event Loop）。")]),e._v(" "),r("h2",{attrs:{id:"基础概念"}},[r("a",{staticClass:"header-anchor",attrs:{href:"#基础概念"}},[e._v("#")]),e._v(" 基础概念")]),e._v(" "),r("h3",{attrs:{id:"同步和异步"}},[r("a",{staticClass:"header-anchor",attrs:{href:"#同步和异步"}},[e._v("#")]),e._v(" 同步和异步")]),e._v(" "),r("p",[e._v("程序里面所有的任务，可以分成两类：同步任务（synchronous）和异步任务（asynchronous）。")]),e._v(" "),r("p",[e._v("同步任务是那些没有被引擎挂起、在主线程上排队执行的任务。只有前一个任务执行完毕，才能执行后一个任务。")]),e._v(" "),r("p",[e._v('所谓"异步"，简单说就是一个任务不是连续完成的，可以理解成该任务被人为分成两段，先执行第一段，然后转而执行其他任务，等做好了准备，再回过头执行第二段')]),e._v(" "),r("p",[e._v("异步任务是那些被引擎放在一边，不进入主线程、而进入任务队列的任务。只有引擎认为某个异步任务可以执行了（比如 Ajax 操作从服务器得到了结果），该任务（采用回调函数的形式）才会进入主线程执行。")]),e._v(" "),r("h3",{attrs:{id:"任务队列和事件循环"}},[r("a",{staticClass:"header-anchor",attrs:{href:"#任务队列和事件循环"}},[e._v("#")]),e._v(" 任务队列和事件循环")]),e._v(" "),r("p",[e._v("JavaScript 运行时，除了一个正在运行的主线程，引擎还提供一个任务队列（task queue），里面是各种需要当前程序处理的异步任务。")]),e._v(" "),r("p",[e._v("主线程会去执行所有的同步任务。等到同步任务全部执行完，就会去看任务队列里面的异步任务。")]),e._v(" "),r("p",[e._v("异步任务的写法通常是回调函数。一旦异步任务重新进入主线程，就会执行对应的回调函数。")]),e._v(" "),r("p",[e._v("JavaScript 引擎怎么知道异步任务有没有结果，能不能进入主线程呢？答案就是引擎在不停地检查，一遍又一遍，只要同步任务执行完了，引擎就会去检查那些挂起来的异步任务，是不是可以进入主线程了。这种循环检查的机制，就叫做事件循环（Event Loop）。")]),e._v(" "),r("h3",{attrs:{id:"异步操作的模式"}},[r("a",{staticClass:"header-anchor",attrs:{href:"#异步操作的模式"}},[e._v("#")]),e._v(" 异步操作的模式")]),e._v(" "),r("p",[e._v("回调函数是异步操作最基本的方法，")]),e._v(" "),r("div",{staticClass:"language- extra-class"},[r("pre",{pre:!0,attrs:{class:"language-text"}},[r("code",[e._v("function f1(callback) {\n  // ...\n  callback();\n}\n\nfunction f2() {\n  // ...\n}\n\nf1(f2);\n")])])]),r("p",[e._v("回调函数的优点是简单、容易理解和实现，缺点是不利于代码的阅读和维护，各个部分之间高度耦合（coupling），使得程序结构混乱、流程难以追踪（尤其是多个回调函数嵌套的情况），而且每个任务只能指定一个回调函数。")]),e._v(" "),r("p",[e._v("另一种思路是采用事件驱动模式。异步任务的执行不取决于代码的顺序，而取决于某个事件是否发生。")]),e._v(" "),r("p",[e._v("这种方法的优点是比较容易理解，可以绑定多个事件，每个事件可以指定多个回调函数，而且可以“去耦合”（decoupling），有利于实现模块化。缺点是整个程序都要变成事件驱动型，运行流程会变得很不清晰。阅读代码的时候，很难看出主流程。")]),e._v(" "),r("p",[e._v("事件完全可以理解成“信号”，如果存在一个“信号中心”，某个任务执行完成，就向信号中心“发布”（publish）一个信号，其他任务可以向信号中心“订阅”（subscribe）这个信号，从而知道什么时候自己可以开始执行。这就叫做”发布/订阅模式”（publish-subscribe pattern），又称“观察者模式”（observer pattern）。")]),e._v(" "),r("h2",{attrs:{id:"promise-对象"}},[r("a",{staticClass:"header-anchor",attrs:{href:"#promise-对象"}},[e._v("#")]),e._v(" Promise 对象")]),e._v(" "),r("p",[e._v("Promise 是异步编程的一种解决方案，比传统的解决方案——回调函数和事件——更合理和更强大。它由社区最早提出和实现，ES6 将其写进了语言标准，统一了用法，原生提供了Promise对象。")]),e._v(" "),r("p",[e._v("所谓Promise，简单说就是一个容器，里面保存着某个未来才会结束的事件（通常是一个异步操作）的结果。从语法上说，Promise 是一个对象，从它可以获取异步操作的消息。Promise 提供统一的 API，各种异步操作都可以用同样的方法进行处理。")]),e._v(" "),r("p",[e._v("Promise 的设计思想是，所有异步任务都返回一个 Promise 实例。Promise 实例有一个then方法，用来指定下一步的回调函数。")]),e._v(" "),r("div",{staticClass:"language- extra-class"},[r("pre",{pre:!0,attrs:{class:"language-text"}},[r("code",[e._v("// 传统写法\nstep1(function (value1) {\n  step2(value1, function(value2) {\n    step3(value2, function(value3) {\n      step4(value3, function(value4) {\n        // ...\n      });\n    });\n  });\n});\n\n// Promise 的写法\n(new Promise(step1))\n  .then(step2)\n  .then(step3)\n  .then(step4);\n")])])]),r("h3",{attrs:{id:"promise-对象的状态"}},[r("a",{staticClass:"header-anchor",attrs:{href:"#promise-对象的状态"}},[e._v("#")]),e._v(" Promise 对象的状态")]),e._v(" "),r("p",[e._v("Promise 对象通过自身的状态，来控制异步操作。Promise 实例具有三种状态。")]),e._v(" "),r("ul",[r("li",[e._v("异步操作未完成（pending）")]),e._v(" "),r("li",[e._v("异步操作成功（fulfilled）")]),e._v(" "),r("li",[e._v("异步操作失败（rejected）\n上面三种状态里面，fulfilled和rejected合在一起称为resolved（已定型）。")])]),e._v(" "),r("p",[e._v("一旦状态发生变化，就凝固了，不会再有新的状态变化。这也是 Promise 这个名字的由来，它的英语意思是“承诺”，一旦承诺成效，就不得再改变了。这也意味着，Promise 实例的状态变化只可能发生一次。")]),e._v(" "),r("p",[e._v("因此，Promise 的最终结果只有两种。")]),e._v(" "),r("ul",[r("li",[e._v("异步操作成功，Promise 实例传回一个值（value），状态变为fulfilled。")]),e._v(" "),r("li",[e._v("异步操作失败，Promise 实例抛出一个错误（error），状态变为rejected。")])]),e._v(" "),r("h3",{attrs:{id:"promise-构造函数"}},[r("a",{staticClass:"header-anchor",attrs:{href:"#promise-构造函数"}},[e._v("#")]),e._v(" Promise 构造函数")]),e._v(" "),r("p",[e._v("JavaScript 提供原生的Promise构造函数，用来生成 Promise 实例。")]),e._v(" "),r("div",{staticClass:"language- extra-class"},[r("pre",{pre:!0,attrs:{class:"language-text"}},[r("code",[e._v("var promise = new Promise(function (resolve, reject) {\n  // ...\n\n  if (/* 异步操作成功 */){\n    resolve(value);\n  } else { /* 异步操作失败 */\n    reject(new Error());\n  }\n});\n")])])]),r("p",[e._v("上面代码中，Promise构造函数接受一个函数作为参数，该函数的两个参数分别是resolve和reject。它们是两个函数，由 JavaScript 引擎提供，不用自己实现。")]),e._v(" "),r("p",[e._v("resolve函数的作用是，将Promise实例的状态从“未完成”变为“成功”（即从pending变为fulfilled），在异步操作成功时调用，并将异步操作的结果，作为参数传递出去。")]),e._v(" "),r("p",[e._v("reject函数的作用是，将Promise实例的状态从“未完成”变为“失败”（即从pending变为rejected），在异步操作失败时调用，并将异步操作报出的错误，作为参数传递出去。")]),e._v(" "),r("h3",{attrs:{id:"then方法"}},[r("a",{staticClass:"header-anchor",attrs:{href:"#then方法"}},[e._v("#")]),e._v(" then方法")]),e._v(" "),r("p",[e._v("Promise 实例的then方法，用来添加回调函数。")]),e._v(" "),r("p",[e._v("then方法可以接受两个回调函数，第一个是异步操作成功时（变为fulfilled状态）的回调函数，第二个是异步操作失败（变为rejected）时的回调函数（该参数可以省略）。一旦状态改变，就调用相应的回调函数。")]),e._v(" "),r("p",[e._v("Promise 的用法，简单说就是一句话：使用then方法添加回调函数。")]),e._v(" "),r("p",[e._v("Promise 的回调函数不是正常的异步任务，而是微任务（microtask）。它们的区别在于，正常任务追加到下一轮事件循环，微任务追加到本轮事件循环。这意味着，微任务的执行时间一定早于正常任务。")]),e._v(" "),r("p",[e._v("Promise也有一些缺点。首先，无法取消Promise，一旦新建它就会立即执行，无法中途取消。其次，如果不设置回调函数，Promise内部抛出的错误，不会反应到外部。第三，当处于pending状态时，无法得知目前进展到哪一个阶段（刚刚开始还是即将完成）。")]),e._v(" "),r("p",[e._v("Promise 的写法只是回调函数的改进，使用then方法以后，异步任务的两段执行看得更清楚了，除此以外，并无新意。")]),e._v(" "),r("h2",{attrs:{id:"generator-函数"}},[r("a",{staticClass:"header-anchor",attrs:{href:"#generator-函数"}},[e._v("#")]),e._v(" Generator 函数")]),e._v(" "),r("p",[e._v("Generator 函数将 JavaScript 异步编程带入了一个全新的阶段。")]),e._v(" "),r("p",[e._v("整个 Generator 函数就是一个封装的异步任务，或者说是异步任务的容器。异步操作需要暂停的地方，都用yield语句注明。")]),e._v(" "),r("div",{staticClass:"language- extra-class"},[r("pre",{pre:!0,attrs:{class:"language-text"}},[r("code",[e._v("function* gen(x) {\n  var y = yield x + 2;\n  return y;\n}\n\nvar g = gen(1);\ng.next() // { value: 3, done: false }\ng.next() // { value: undefined, done: true }\n")])])]),r("p",[e._v("上面代码中，调用 Generator 函数，会返回一个内部指针（即遍历器）g。这是 Generator 函数不同于普通函数的另一个地方，即执行它不会返回结果，返回的是指针对象。调用指针g的next方法，会移动内部指针（即执行异步任务的第一段），指向第一个遇到的yield语句，上例是执行到x + 2为止。")]),e._v(" "),r("p",[e._v("换言之，next方法的作用是分阶段执行Generator函数。每次调用next方法，会返回一个对象，表示当前阶段的信息（value属性和done属性）。value属性是yield语句后面表达式的值，表示当前阶段的值；done属性是一个布尔值，表示 Generator 函数是否执行完毕，即是否还有下一个阶段。")]),e._v(" "),r("p",[e._v("Generator 函数可以暂停执行和恢复执行，这是它能封装异步任务的根本原因。除此之外，它还有两个特性，使它可以作为异步编程的完整解决方案：函数体内外的数据交换和错误处理机制。")]),e._v(" "),r("h2",{attrs:{id:"async-函数"}},[r("a",{staticClass:"header-anchor",attrs:{href:"#async-函数"}},[e._v("#")]),e._v(" async 函数")]),e._v(" "),r("p",[e._v("ES2017 标准引入了 async 函数，使得异步操作变得更加方便。")]),e._v(" "),r("p",[e._v("async 函数是什么？一句话，它就是 Generator 函数的语法糖。")]),e._v(" "),r("p",[e._v("async函数就是将 Generator 函数的星号（*）替换成async，将yield替换成await，仅此而已。")]),e._v(" "),r("p",[e._v("async 函数的实现原理，就是将 Generator 函数和自动执行器，包装在一个函数里。")]),e._v(" "),r("p",[e._v("async函数对 Generator 函数的改进，体现在以下四点。")]),e._v(" "),r("ul",[r("li",[e._v("内置执行器: Generator 函数的执行必须靠执行器，所以才有了co模块，而async函数自带执行器。也就是说，async函数的执行，与普通函数一模一样，只要一行。")]),e._v(" "),r("li",[e._v("更好的语义: async和await，比起星号和yield，语义更清楚了。async表示函数里有异步操作，await表示紧跟在后面的表达式需要等待结果。")]),e._v(" "),r("li",[e._v("更广的适用性: co模块约定，yield命令后面只能是 Thunk 函数或 Promise 对象，而async函数的await命令后面，可以是 Promise 对象和原始类型的值（数值、字符串和布尔值，但这时会自动转成立即 resolved 的 Promise 对象）。")]),e._v(" "),r("li",[e._v("返回值是 Promise: async函数的返回值是 Promise 对象，这比 Generator 函数的返回值是 Iterator 对象方便多了。你可以用then方法指定下一步的操作。进一步说，async函数完全可以看作多个异步操作，包装成的一个 Promise 对象，而await命令就是内部then命令的语法糖。")])]),e._v(" "),r("p",[e._v("async函数的语法规则总体上比较简单，难点是错误处理机制。")]),e._v(" "),r("p",[e._v("async函数返回的 Promise 对象，必须等到内部所有await命令后面的 Promise 对象执行完，才会发生状态改变，除非遇到return语句或者抛出错误。也就是说，只有async函数内部的异步操作执行完，才会执行then方法指定的回调函数。")]),e._v(" "),r("p",[e._v("根据语法规格，await命令只能出现在 async 函数内部，否则都会报错。")])])}),[],!1,null,null,null);a.default=s.exports}}]);