(window.webpackJsonp=window.webpackJsonp||[]).push([[47],{739:function(a,t,_){"use strict";_.r(t);var s=_(2),r=Object(s.a)({},(function(){var a=this,t=a.$createElement,_=a._self._c||t;return _("ContentSlotsDistributor",{attrs:{"slot-key":a.$parent.slotKey}},[_("h2",{attrs:{id:"_13-1-js和html的交互式如何实现的"}},[_("a",{staticClass:"header-anchor",attrs:{href:"#_13-1-js和html的交互式如何实现的"}},[a._v("#")]),a._v(" 13.1 JS和HTML的交互式如何实现的？")]),a._v(" "),_("p",[a._v("通过事件实现的")]),a._v(" "),_("h2",{attrs:{id:"_13-2什么是事件流"}},[_("a",{staticClass:"header-anchor",attrs:{href:"#_13-2什么是事件流"}},[a._v("#")]),a._v(" 13.2什么是事件流？")]),a._v(" "),_("p",[a._v("描述的是从页面中接收事件的顺序。")]),a._v(" "),_("h2",{attrs:{id:"_13-3什么是事件冒泡"}},[_("a",{staticClass:"header-anchor",attrs:{href:"#_13-3什么是事件冒泡"}},[a._v("#")]),a._v(" 13.3什么是事件冒泡？")]),a._v(" "),_("p",[a._v("事件开始时由最具体的元素接收，然后逐级向上传播到较为不具体的节点；")]),a._v(" "),_("h2",{attrs:{id:"_13-4事件捕获的目的是"}},[_("a",{staticClass:"header-anchor",attrs:{href:"#_13-4事件捕获的目的是"}},[a._v("#")]),a._v(" 13.4事件捕获的目的是？")]),a._v(" "),_("p",[a._v("在事件到达预订目标之前捕获它")]),a._v(" "),_("h2",{attrs:{id:"_13-5dom2级规定事件流三阶段是"}},[_("a",{staticClass:"header-anchor",attrs:{href:"#_13-5dom2级规定事件流三阶段是"}},[a._v("#")]),a._v(" 13.5DOM2级规定事件流三阶段是？")]),a._v(" "),_("p",[a._v("事件捕获阶段、处于目标阶段和事件冒泡阶段。")]),a._v(" "),_("h2",{attrs:{id:"_13-6什么是事件"}},[_("a",{staticClass:"header-anchor",attrs:{href:"#_13-6什么是事件"}},[a._v("#")]),a._v(" 13.6什么是事件？")]),a._v(" "),_("p",[a._v("用户或浏览器自身执行的某种动作。")]),a._v(" "),_("h2",{attrs:{id:"_13-7在html中指定事件处理程序的缺点有"}},[_("a",{staticClass:"header-anchor",attrs:{href:"#_13-7在html中指定事件处理程序的缺点有"}},[a._v("#")]),a._v(" 13.7在HTML中指定事件处理程序的缺点有？")]),a._v(" "),_("p",[a._v("一是存在时差；二是作用域链在不同浏览器会导致不同的结果；三是HTML与JS代码紧密耦合；")]),a._v(" "),_("h2",{attrs:{id:"_13-8-dom-2级事件定义的两个方法和参数是"}},[_("a",{staticClass:"header-anchor",attrs:{href:"#_13-8-dom-2级事件定义的两个方法和参数是"}},[a._v("#")]),a._v(" 13.8 DOM 2级事件定义的两个方法和参数是？")]),a._v(" "),_("p",[a._v("addEventListener()和removeEventListener():要处理的事件名、作为事件处理程序的函数和一个布尔值（true表示在纱布或阶段调用事件处理程序，false表示在冒泡阶段调用事件处理程序）；")]),a._v(" "),_("h2",{attrs:{id:"_13-9使用dom-2级方法添加事件处理程序的好处是"}},[_("a",{staticClass:"header-anchor",attrs:{href:"#_13-9使用dom-2级方法添加事件处理程序的好处是"}},[a._v("#")]),a._v(" 13.9使用DOM 2级方法添加事件处理程序的好处是？")]),a._v(" "),_("p",[a._v("可以添加多个事件处理程序。")]),a._v(" "),_("h2",{attrs:{id:"_13-10为何多数时候-将事件处理程序添加到事件流的冒泡阶段-何时添加到捕获阶段"}},[_("a",{staticClass:"header-anchor",attrs:{href:"#_13-10为何多数时候-将事件处理程序添加到事件流的冒泡阶段-何时添加到捕获阶段"}},[a._v("#")]),a._v(" 13.10为何多数时候，将事件处理程序添加到事件流的冒泡阶段？何时添加到捕获阶段？")]),a._v(" "),_("p",[a._v("因为这样可以最大限度地兼容各种浏览器；\n只在需要在事件到达目标前截获他的时候将事件处理程序添加到捕获阶段。")]),a._v(" "),_("h2",{attrs:{id:"_13-11ie中使用attachevent与使用dom-0级方法的主要区别是"}},[_("a",{staticClass:"header-anchor",attrs:{href:"#_13-11ie中使用attachevent与使用dom-0级方法的主要区别是"}},[a._v("#")]),a._v(" 13.11IE中使用attachEvent与使用DOM 0级方法的主要区别是？")]),a._v(" "),_("p",[a._v("事件处理程序的作用域，前者会在全局作用域，后者会在元素作用域内运行。")]),a._v(" "),_("h2",{attrs:{id:"_13-12使用addeventlistener-和attachevent-添加的匿名函数共同存在的问题是"}},[_("a",{staticClass:"header-anchor",attrs:{href:"#_13-12使用addeventlistener-和attachevent-添加的匿名函数共同存在的问题是"}},[a._v("#")]),a._v(" 13.12使用addEventListener()和attachEvent()添加的匿名函数共同存在的问题是？")]),a._v(" "),_("p",[a._v("不能移除")]),a._v(" "),_("h2",{attrs:{id:"_13-13事件对象包含什么"}},[_("a",{staticClass:"header-anchor",attrs:{href:"#_13-13事件对象包含什么"}},[a._v("#")]),a._v(" 13.13事件对象包含什么？")]),a._v(" "),_("p",[a._v("事件元素、类型和其他与特定事件相关的信息。")]),a._v(" "),_("h2",{attrs:{id:"_13-14如何理解事件对象的存活期"}},[_("a",{staticClass:"header-anchor",attrs:{href:"#_13-14如何理解事件对象的存活期"}},[a._v("#")]),a._v(" 13.14如何理解事件对象的存活期？")]),a._v(" "),_("p",[a._v("在事件处理程序执行期间存在，执行结束就被销毁。")]),a._v(" "),_("h2",{attrs:{id:"_13-15web浏览器中的事件类型有"}},[_("a",{staticClass:"header-anchor",attrs:{href:"#_13-15web浏览器中的事件类型有"}},[a._v("#")]),a._v(" 13.15web浏览器中的事件类型有？")]),a._v(" "),_("p",[a._v("UI事件、焦点、鼠标、滚轮、文本、键盘、合成、变动和变动名称等事件。")]),a._v(" "),_("h2",{attrs:{id:"_13-16为何在js中添加到页面上的事件处理程序数量将直接关系到页面的整体运行性能"}},[_("a",{staticClass:"header-anchor",attrs:{href:"#_13-16为何在js中添加到页面上的事件处理程序数量将直接关系到页面的整体运行性能"}},[a._v("#")]),a._v(" 13.16为何在JS中添加到页面上的事件处理程序数量将直接关系到页面的整体运行性能？")]),a._v(" "),_("p",[a._v("一是函数都是对象，对象会占内存，内存中对象越多，性能越差；\n二是必须制定所有事件的处理程序而导致的DOM访问次数，会延迟整个页面的交互就绪时间；")]),a._v(" "),_("h2",{attrs:{id:"_13-17从利用好事件处理程序的角度出发-有什么方法可以提升性能"}},[_("a",{staticClass:"header-anchor",attrs:{href:"#_13-17从利用好事件处理程序的角度出发-有什么方法可以提升性能"}},[a._v("#")]),a._v(" 13.17从利用好事件处理程序的角度出发，有什么方法可以提升性能？")]),a._v(" "),_("p",[a._v("限制数量、事件委托、移除事件处理程序")]),a._v(" "),_("h2",{attrs:{id:"_14-1获取form元素引用的方式有"}},[_("a",{staticClass:"header-anchor",attrs:{href:"#_14-1获取form元素引用的方式有"}},[a._v("#")]),a._v(" 14.1获取form元素引用的方式有？")]),a._v(" "),_("p",[a._v("一是看成与其他元素一样，使用getElementById等方法获取；\n二是通过document.forms获取页面所有的表单；")]),a._v(" "),_("h2",{attrs:{id:"_14-2提交表单可能出现的最大问题是-如何解决"}},[_("a",{staticClass:"header-anchor",attrs:{href:"#_14-2提交表单可能出现的最大问题是-如何解决"}},[a._v("#")]),a._v(" 14.2提交表单可能出现的最大问题是？如何解决？")]),a._v(" "),_("p",[a._v("重复提交表单；一是第一次提交表单后就禁用提交按钮；二是利用onsubmit事件处理程序取消后续的表单提交操作。")]),a._v(" "),_("h2",{attrs:{id:"_14-3为何在处理文本框的值时-最好不要使用dom方法"}},[_("a",{staticClass:"header-anchor",attrs:{href:"#_14-3为何在处理文本框的值时-最好不要使用dom方法"}},[a._v("#")]),a._v(" 14.3为何在处理文本框的值时，最好不要使用DOM方法？")]),a._v(" "),_("p",[a._v("对value属性所做的修改，不一定会反映在DOM中。")]),a._v(" "),_("h2",{attrs:{id:"_14-4表单序列化在什么场景下使用最多"}},[_("a",{staticClass:"header-anchor",attrs:{href:"#_14-4表单序列化在什么场景下使用最多"}},[a._v("#")]),a._v(" 14.4表单序列化在什么场景下使用最多？")]),a._v(" "),_("p",[a._v("使用Ajax请求")]),a._v(" "),_("h2",{attrs:{id:"_15-1出现在canvas元素开始和结束标签中的内容何时显示"}},[_("a",{staticClass:"header-anchor",attrs:{href:"#_15-1出现在canvas元素开始和结束标签中的内容何时显示"}},[a._v("#")]),a._v(" 15.1出现在canvas元素开始和结束标签中的内容何时显示？")]),a._v(" "),_("p",[a._v("在浏览器不支持canvas元素时显示。")]),a._v(" "),_("h2",{attrs:{id:"_15-2在使用canvas元素之前需要干啥"}},[_("a",{staticClass:"header-anchor",attrs:{href:"#_15-2在使用canvas元素之前需要干啥"}},[a._v("#")]),a._v(" 15.2在使用canvas元素之前需要干啥？")]),a._v(" "),_("p",[a._v("检测getContext()方法是否存在。")])])}),[],!1,null,null,null);t.default=r.exports}}]);