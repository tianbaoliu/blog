(window.webpackJsonp=window.webpackJsonp||[]).push([[46],{740:function(t,e,a){"use strict";a.r(e);var r=a(2),s=Object(r.a)({},(function(){var t=this,e=t.$createElement,a=t._self._c||e;return a("ContentSlotsDistributor",{attrs:{"slot-key":t.$parent.slotKey}},[a("h2",{attrs:{id:"_10-1-什么是dom"}},[a("a",{staticClass:"header-anchor",attrs:{href:"#_10-1-什么是dom"}},[t._v("#")]),t._v(" 10.1 什么是DOM？")]),t._v(" "),a("p",[t._v("DOM是针对HTML和XML文档的一个API;")]),t._v(" "),a("h2",{attrs:{id:"_10-2在确定节点类型时-如何确保兼容性"}},[a("a",{staticClass:"header-anchor",attrs:{href:"#_10-2在确定节点类型时-如何确保兼容性"}},[t._v("#")]),t._v(" 10.2在确定节点类型时，如何确保兼容性？")]),t._v(" "),a("p",[t._v("讲nodeType属性与数字值进行比较；")]),t._v(" "),a("h2",{attrs:{id:"_10-3为何说nodeilist是有生命、有呼吸的对象"}},[a("a",{staticClass:"header-anchor",attrs:{href:"#_10-3为何说nodeilist是有生命、有呼吸的对象"}},[t._v("#")]),t._v(" 10.3为何说NodeiList是有生命、有呼吸的对象？")]),t._v(" "),a("p",[t._v("因为它是基于DOM结构动态执行查询的结果，因此DOM结构的变化能够自动反映在NodeList对象中。")]),t._v(" "),a("h2",{attrs:{id:"_10-4dom中操作节点的方法有"}},[a("a",{staticClass:"header-anchor",attrs:{href:"#_10-4dom中操作节点的方法有"}},[t._v("#")]),t._v(" 10.4DOM中操作节点的方法有？")]),t._v(" "),a("p",[t._v("appendChild();insertBefore();\nreplaceChild();removeChild();\ncloneNode();normalize();")]),t._v(" "),a("h2",{attrs:{id:"_10-5document对象获取特定某个或某组元素引用的方法有"}},[a("a",{staticClass:"header-anchor",attrs:{href:"#_10-5document对象获取特定某个或某组元素引用的方法有"}},[t._v("#")]),t._v(" 10.5document对象获取特定某个或某组元素引用的方法有？")]),t._v(" "),a("p",[t._v("getElementById()和getElementsByTagName()\ngetElementsByName()(HTMLDocument类型有，XML类型没有)")]),t._v(" "),a("h2",{attrs:{id:"_10-6如果页面中多个元素的id相同-getelementbyid-如何处理"}},[a("a",{staticClass:"header-anchor",attrs:{href:"#_10-6如果页面中多个元素的id相同-getelementbyid-如何处理"}},[t._v("#")]),t._v(" 10.6如果页面中多个元素的ID相同，getElementById()如何处理？")]),t._v(" "),a("p",[t._v("只返回文档中第一次出现的元素；")]),t._v(" "),a("h2",{attrs:{id:"_10-7为何最好在比较之前将标签名转换为相同的大小写形式"}},[a("a",{staticClass:"header-anchor",attrs:{href:"#_10-7为何最好在比较之前将标签名转换为相同的大小写形式"}},[t._v("#")]),t._v(" 10.7为何最好在比较之前将标签名转换为相同的大小写形式？")]),t._v(" "),a("p",[t._v("因为HTML和XML中标签名大小写 规则不一样；")]),t._v(" "),a("h2",{attrs:{id:"_10-8操作特性的dom方法有"}},[a("a",{staticClass:"header-anchor",attrs:{href:"#_10-8操作特性的dom方法有"}},[t._v("#")]),t._v(" 10.8操作特性的DOM方法有？")]),t._v(" "),a("p",[t._v("getAttribute();setAttribute();removeAttribute();")]),t._v(" "),a("h2",{attrs:{id:"_10-9attributes属性的方法有"}},[a("a",{staticClass:"header-anchor",attrs:{href:"#_10-9attributes属性的方法有"}},[t._v("#")]),t._v(" 10.9attributes属性的方法有？")]),t._v(" "),a("p",[t._v("getNameItem();removeNameItem();setNameItem();item();")]),t._v(" "),a("h2",{attrs:{id:"_10-10操作节点中的文本有"}},[a("a",{staticClass:"header-anchor",attrs:{href:"#_10-10操作节点中的文本有"}},[t._v("#")]),t._v(" 10.10操作节点中的文本有？")]),t._v(" "),a("p",[t._v("appendData();deleteData();insertData();\nreplaceData();splitText();substringData();")]),t._v(" "),a("h2",{attrs:{id:"_10-11什么是动态样式"}},[a("a",{staticClass:"header-anchor",attrs:{href:"#_10-11什么是动态样式"}},[t._v("#")]),t._v(" 10.11什么是动态样式？")]),t._v(" "),a("p",[t._v("在页面加载时不存在的样式，加载后才动态添加到页面中。")]),t._v(" "),a("h2",{attrs:{id:"_10-12为何dom操作在处理-script和style元素时存在一些复杂性"}},[a("a",{staticClass:"header-anchor",attrs:{href:"#_10-12为何dom操作在处理-script和style元素时存在一些复杂性"}},[t._v("#")]),t._v(" 10.12为何DOM操作在处理,script和style元素时存在一些复杂性？")]),t._v(" "),a("p",[t._v("因为这两个元素分别包含脚本和样式信息，浏览器会将他们和其他元素区别对待。")]),t._v(" "),a("h2",{attrs:{id:"_10-13如何理解dom对性能的影响"}},[a("a",{staticClass:"header-anchor",attrs:{href:"#_10-13如何理解dom对性能的影响"}},[t._v("#")]),t._v(" 10.13如何理解DOM对性能的影响？")]),t._v(" "),a("p",[t._v("DOM操作往往是JS程序中开销最大的部分，因此要尽量减少对DOM的操作。")]),t._v(" "),a("h2",{attrs:{id:"_11-01选择符api的目的是"}},[a("a",{staticClass:"header-anchor",attrs:{href:"#_11-01选择符api的目的是"}},[t._v("#")]),t._v(" 11.01选择符API的目的是？")]),t._v(" "),a("p",[t._v("致力于让浏览器原生支持CSS查询，让解析和树查询操作可以在浏览器内部通过编译后的代码来完成，去改善性能。")]),t._v(" "),a("h2",{attrs:{id:"_11-02queryselectorall-和queryselector的异同"}},[a("a",{staticClass:"header-anchor",attrs:{href:"#_11-02queryselectorall-和queryselector的异同"}},[t._v("#")]),t._v(" 11.02querySelectorAll()和querySelector的异同？")]),t._v(" "),a("p",[t._v("接收的参数都是一个CSS选择符，若传入浏览器不支持的选择符或者选择符中有语法错误，都会抛出错误；\n而前者返回的是所有的元素，后者只返回一个元素；")]),t._v(" "),a("h2",{attrs:{id:"_11-03返回nodelist的dom方法杜具有的同样问题是"}},[a("a",{staticClass:"header-anchor",attrs:{href:"#_11-03返回nodelist的dom方法杜具有的同样问题是"}},[t._v("#")]),t._v(" 11.03返回NodeList的DOM方法杜具有的同样问题是？")]),t._v(" "),a("p",[t._v("性能问题")]),t._v(" "),a("h2",{attrs:{id:"_11-04document的readystate属性的可能值有"}},[a("a",{staticClass:"header-anchor",attrs:{href:"#_11-04document的readystate属性的可能值有"}},[t._v("#")]),t._v(" 11.04Document的readyState属性的可能值有？")]),t._v(" "),a("p",[t._v("Loading 正在加载文档；complete已经加载完文档。")]),t._v(" "),a("h2",{attrs:{id:"_11-05如何避免在使用innerhtml、outerhtml属性和insertadjacenthtml-方法时可能导致的内存占用问题"}},[a("a",{staticClass:"header-anchor",attrs:{href:"#_11-05如何避免在使用innerhtml、outerhtml属性和insertadjacenthtml-方法时可能导致的内存占用问题"}},[t._v("#")]),t._v(" 11.05如何避免在使用innerHTMl、outerHTML属性和insertAdjacentHTML()方法时可能导致的内存占用问题？")]),t._v(" "),a("p",[t._v("手工删除被替换元素的所有事件处理程序和JS对象属性。")]),t._v(" "),a("h2",{attrs:{id:"_11-06h5中选择的滚动页面的标准方法为"}},[a("a",{staticClass:"header-anchor",attrs:{href:"#_11-06h5中选择的滚动页面的标准方法为"}},[t._v("#")]),t._v(" 11.06H5中选择的滚动页面的标准方法为？")]),t._v(" "),a("p",[t._v("scrollIntoView()")]),t._v(" "),a("h2",{attrs:{id:"_11-07为何要为dom元素定义额外的属性"}},[a("a",{staticClass:"header-anchor",attrs:{href:"#_11-07为何要为dom元素定义额外的属性"}},[t._v("#")]),t._v(" 11.07为何要为DOM元素定义额外的属性？")]),t._v(" "),a("p",[t._v("因为浏览器处理DOM元素间空白符的方式不一样")]),t._v(" "),a("h2",{attrs:{id:"_12-01dom2级和3级的目的是"}},[a("a",{staticClass:"header-anchor",attrs:{href:"#_12-01dom2级和3级的目的是"}},[t._v("#")]),t._v(" 12.01DOM2级和3级的目的是？")]),t._v(" "),a("p",[t._v("扩展DOM API，以满足操作XML的所有需求，同时提供更好的错误处理和特性检测能力。")])])}),[],!1,null,null,null);e.default=s.exports}}]);