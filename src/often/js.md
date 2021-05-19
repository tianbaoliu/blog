---
title: '常用方法封装'
sidebar: auto
categories: 技术积累
tags:
 - js
collapsable: true
---

## 1、全屏功能
以Vue代码为例。<br/>
```js
dataFull: 初始值，判断当前页面是否是全屏状态，默认false
show: 控制全屏图标切换显示

// 切换全屏
fullORno() {
    if (this.dataFull == true) {
        this.exitFullscreen();
        this.dataFull = false;
        this.show = true;
    } else {
        this.launchFullscreen(document.documentElement);
        this.dataFull = true;
        this.show = false;
    }
}
// 进入全屏
launchFullscreen(element) {
    if (element.requestFullscreen) {
        element.requestFullscreen();
    } else if (element.mozRequestFullScreen) {
        element.mozRequestFullScreen();
    } else if (element.webkitRequestFullscreen) {
        element.webkitRequestFullscreen();
    } else if (element.msRequestFullscreen) {
        element.msRequestFullscreen();
    }
}
 // 退出全屏
exitFullscreen() {
    if (document.exitFullscreen) {
        document.exitFullscreen();
    } else if (document.mozCancelFullScreen) {
        document.mozCancelFullScreen();
    } else if (document.webkitExitFullscreen) {
        document.webkitExitFullscreen();
    }
}
```

## 2、检测PC端和移动端设备
例子：如果条件成立是移动端，跳转到百度，可根据业务需求进行不同操作。
```js
(function(a, b) {
    if(/(android|bb\d+|meego).+mobile|avantgo|bada\/|blackberry|blazer|compal|elaine|fennec|hiptop|iemobile|ip(hone|od)|iris|kindle|lge |maemo|midp|mmp|mobile.+firefox|netfront|opera m(ob|in)i|palm( os)?|phone|p(ixi|re)\/|plucker|pocket|psp|series(4|6)0|symbian|treo|up\.(browser|link)|vodafone|wap|windows ce|xda|xiino/i.test(a) || /1207|6310|6590|3gso|4thp|50[1-6]i|770s|802s|a wa|abac|ac(er|oo|s\-)|ai(ko|rn)|al(av|ca|co)|amoi|an(ex|ny|yw)|aptu|ar(ch|go)|as(te|us)|attw|au(di|\-m|r |s )|avan|be(ck|ll|nq)|bi(lb|rd)|bl(ac|az)|br(e|v)w|bumb|bw\-(n|u)|c55\/|capi|ccwa|cdm\-|cell|chtm|cldc|cmd\-|co(mp|nd)|craw|da(it|ll|ng)|dbte|dc\-s|devi|dica|dmob|do(c|p)o|ds(12|\-d)|el(49|ai)|em(l2|ul)|er(ic|k0)|esl8|ez([4-7]0|os|wa|ze)|fetc|fly(\-|_)|g1 u|g560|gene|gf\-5|g\-mo|go(\.w|od)|gr(ad|un)|haie|hcit|hd\-(m|p|t)|hei\-|hi(pt|ta)|hp( i|ip)|hs\-c|ht(c(\-| |_|a|g|p|s|t)|tp)|hu(aw|tc)|i\-(20|go|ma)|i230|iac( |\-|\/)|ibro|idea|ig01|ikom|im1k|inno|ipaq|iris|ja(t|v)a|jbro|jemu|jigs|kddi|keji|kgt( |\/)|klon|kpt |kwc\-|kyo(c|k)|le(no|xi)|lg( g|\/(k|l|u)|50|54|\-[a-w])|libw|lynx|m1\-w|m3ga|m50\/|ma(te|ui|xo)|mc(01|21|ca)|m\-cr|me(rc|ri)|mi(o8|oa|ts)|mmef|mo(01|02|bi|de|do|t(\-| |o|v)|zz)|mt(50|p1|v )|mwbp|mywa|n10[0-2]|n20[2-3]|n30(0|2)|n50(0|2|5)|n7(0(0|1)|10)|ne((c|m)\-|on|tf|wf|wg|wt)|nok(6|i)|nzph|o2im|op(ti|wv)|oran|owg1|p800|pan(a|d|t)|pdxg|pg(13|\-([1-8]|c))|phil|pire|pl(ay|uc)|pn\-2|po(ck|rt|se)|prox|psio|pt\-g|qa\-a|qc(07|12|21|32|60|\-[2-7]|i\-)|qtek|r380|r600|raks|rim9|ro(ve|zo)|s55\/|sa(ge|ma|mm|ms|ny|va)|sc(01|h\-|oo|p\-)|sdk\/|se(c(\-|0|1)|47|mc|nd|ri)|sgh\-|shar|sie(\-|m)|sk\-0|sl(45|id)|sm(al|ar|b3|it|t5)|so(ft|ny)|sp(01|h\-|v\-|v )|sy(01|mb)|t2(18|50)|t6(00|10|18)|ta(gt|lk)|tcl\-|tdg\-|tel(i|m)|tim\-|t\-mo|to(pl|sh)|ts(70|m\-|m3|m5)|tx\-9|up(\.b|g1|si)|utst|v400|v750|veri|vi(rg|te)|vk(40|5[0-3]|\-v)|vm40|voda|vulc|vx(52|53|60|61|70|80|81|83|85|98)|w3c(\-| )|webc|whit|wi(g |nc|nw)|wmlb|wonu|x700|yas\-|your|zeto|zte\-/i.test(a.substr(0, 4))){
        window.location = b;
    }
})(
  navigator.userAgent || navigator.vendor || window.opera,
  "https://www.baidu.com"
);
```

## 3、dom片段生成图片
<!-- > 业务场景：海报等活动业务，指定一块区域或者整个页面获取信息后，在移动端可长按保存图片，PC端可以右键保存图片到本地。 -->
::: tip 业务场景：
海报等活动业务，指定一块区域或者整个页面获取信息后，在移动端可长按保存图片，PC端可以右键保存图片到本地。
:::

* cdn链接：https://cdn.bootcss.com/html2canvas/0.5.0-beta4/html2canvas.min.js
* html2canvas.js：可将 htmldom 转为 canvas 元素<br/>
* canvasAPI：toDataUrl() 可将 canvas 转为 base64 格式<br/>
* base64转成file，通过upload接口生成url<br/>

1、设备像素比 (简称 dpr) 定义了物理像素和设备独立像素的对应关系，它的值可以按如下的公式的得到：设备像素比 = 物理像素 / 设备独立像素
所以我们可以先获取设备像素比，然后根据比例创建尺寸更大的canvas，如二倍屏就是二倍，三倍屏就是三倍...<br/>
2、图片不能使用background，必须用img标签，具体原因不清楚，亲测。。。（应该是插件本身原因）<br/>
3、跨域图片绘制不出来<br/>
4、box-shadow在tocanvas时会丢失<br/>
```js
/*
* 法一
*/
// 要生成图片的dom片段
var div = document.getElementsByClassName('page')[0];
var canvas = document.createElement("canvas");
var w = parseInt($(div).css('width'))
var h = parseInt($(div).css('height'))

// 宽高放大两倍
canvas.width  = w * 2;
canvas.height = h * 2;
canvas.style.width = w + "px";
canvas.style.height = h + "px";
var context = canvas.getContext("2d");

//然后将画布缩放，将图像放大两倍画到画布上
context.scale(2,2);
html2canvas(div, {
    canvas: canvas,
    onrendered: function(canvas) {
        //这里返回了一个canvas 定位一下
        $(canvas).css({
            'position':'absolute',
            'top':'0'
        })     
        document.body.appendChild(canvas);
        _this.isShowCanvas = true;
        setTimeout(()=>{
            // 将canvas.toDataURL()生成的地址赋给img元素
            $('#canvasImg').attr('src',canvas.toDataURL())
            $(canvas).hide()
        },0)
    }
});
/*-----------------------------------------------------------*/
/*
* 法二（随着插件的更新，调用方式随之改变，看版本）
*/
// 要生成图片的dom片段
var div = document.getElementsByClassName('page')[0];
div.querySelector('.mask').style.height = '100%';
div.style.zIndex = -1;
document.body.appendChild(div);
var canvas = document.createElement("canvas"); // canvas可提前创建，可动态创建
const scaleBy = DPR(); // 获取像素比

// 设定 canvas 元素属性宽高为 DOM 节点宽高 * 像素比
const defaultCanvasOptions = {
  canvas: canvas || (canvas = document.createElement('canvas')),
  removeContainer: true,
  allowTaint: true,
  imageTimeout: 0,
  async: true,
  ignoreElements(element){
    let id = element.id
    if ( id.startsWith('slide') ) {
      if ( id=== 'slide12' || id === 'loading-page') return false
        else return true
      }
      return false
  }
}
let canvas1 = await html2canvas(div,{...defaultCanvasOptions, scale: scaleBy})
document.body.removeChild(div)
let img = getImage('thumbnail-img', (img)=>{
  document.querySelector('#share-page .snapshot').appendChild(img);
})
img.src = canvas1.toDataURL('image/png');
```
5、base64转file，使用new FIle会有兼容性支持问题，可以使用toBlob
```js
function dataURLtoBlob(data) {
  var mimeString = data.split(',')[0].split(':')[1].split(';')[0]
  var byteString = atob(data.split(',')[1])
  var ab = new ArrayBuffer(byteString.length)
  var ia = new Uint8Array(ab)

  for (var i = 0; i < byteString.length; i++) {
    ia[i] = byteString.charCodeAt(i)
  }
  var bb = (window.BlobBuilder || window.WebKitBlobBuilder || window.MozBlobBuilder)

  if (bb) {
    bb = new (window.BlobBuilder || window.WebKitBlobBuilder || window.MozBlobBuilder)()
    bb.append(ab)
    return bb.getBlob(mimeString)
  } else {
    bb = new Blob([ab], {
      'type': (mimeString)
    })
    return bb
  }
}
```

## 4、url生成二维码
vue为例
```js
import QRCode from 'qrcode';
Vue.prototype.QRCode = QRCode; // 建议挂载到原型上，供他组件调用
// 生成二维码
useqrcode(url) {
    const canvas = document.getElementById('canvas');
    this.QRCode.toCanvas(canvas, url, (error) => {
        if (error) console.error(error);
        console.log('success!');
    });
}
```

## 5、时间戳转换成日期
```js
// 方法一
function timeData(val) {
    const d = new Date(val);
    const year = d.getFullYear();
    const month = d.getMonth() < 9 ? `0${d.getMonth() + 1}` : `${d.getMonth() + 1}`;
    const day = d.getDate() < 10 ? `0${d.getDate()}` : `${d.getDate()}`;
    const hour = d.getHours() <10 ? '0' + d.getHours() : '' + d.getHours();
    const minutes = d.getMinutes() <10 ? '0' + d.getMinutes() : '' + d.getMinutes();
    return  year+ '-' + month + '-' + day + ' ' + hour + ':' + minutes;
}

// 方法二
function formatDate(date, format) {
  format = format || 'yyyy-MM-dd hh:mm:ss';
  date = new Date(date);
  let o = {
    "MM": date.getMonth() + 1, //month
    "dd": date.getDate(), //day
    "hh": date.getHours(), //hour
    "mm": date.getMinutes(), //minute
    "ss": date.getSeconds(), //second
    "qq": Math.floor((date.getMonth() + 3) / 3), //quarter
    "S": date.getMilliseconds() //millisecond
  }
  // RegExp.$1是RegExp的一个属性,指的是与正则表达式匹配的第一个 子匹配(以括号为标志)字符串
  if (/(y+)/.test(format)) format = format.replace(RegExp.$1, (date.getFullYear() + "").substr(4 - RegExp.$1.length)); //获取年份
  for (let k in o) {
    if (new RegExp("(" + k + ")").test(format)) {
      format = format.replace(RegExp.$1, RegExp.$1.length === 1 ? o[k] : ('00' + o[k]).substr(("" + o[k]).length))
    }
  }
  return format;
};

let time = 1615517559258

timeData(time)
formatDate(time, "hh:mm") // hh:mm格式
```

## 6、判断是否是微信浏览器
```js
function isWxUa() {
    const ua = navigator.userAgent.toLowerCase();
    if (ua.match(/MicroMessenger/i) == 'micromessenger') {
        return true;
    } else {
        return false;
    }
}
```

## 7、判断IOS环境
```js
function isIOS() {
  const isIphone = navigator.userAgent.includes('iPhone');
  const isIpad = navigator.userAgent.includes('iPad');
  return isIphone || isIpad;
}
```

## 8、rem布局
```js
//封装设置rem的方法
function setREM(){
	//建议 设置UI设计图宽度尺寸 （以1440为例）
	const whdef = 100/1440;
	//获取浏览器可见区域宽度
	const wW = document.documentElement.clientWidth || document.body.clientWidth;
	//以默认比例值乘以当前窗口宽度,得到该宽度下的相应FONT-SIZE值
	const rem = wW * whdef;
	//设置字体值  (当屏幕宽度为1440时，font-size = 100px 即1rem = 100px)
	document.documentElement.style.fontSize = rem + 'px'
}
//先首次调用
window.onload = function () {
	setREM();
}	
//设置监听浏览器窗口变化函数  动态改变font-size的值
window.onresize = function(){
	setREM();
}
```

## 9、绑定虚拟键盘
```js
/*
 * 给元素添加事件（用来触发键盘事件）
 * el模拟事件的触发元素，evtType事件类型，keycode对应的键盘事件的键值,key对应事件所触发的键名,
 */
function createKeyEvent(el, evtType, keyCode ,key) {
    let doc = el.ownerDocument,
        win = doc.defaultView || doc.parentWindow,
        evtObj;
    if(doc.createEvent){
        if(win.KeyEvent) {
            evtObj = doc.createEvent('KeyEvents');
            evtObj.initKeyEvent( evtType, true, true, win, false, false, false, false, keyCode, 0 );
        } else {
            evtObj = doc.createEvent('UIEvents');
            Object.defineProperty(evtObj, 'keyCode', {
                get : function() { return this.keyCodeVal; }
            });
            Object.defineProperty(evtObj, 'which', {
                get : function() { return this.keyCodeVal; }
            });
            evtObj.initUIEvent( evtType, true, true, win, 1 );
            evtObj.key = key;
            evtObj.keyCodeVal = keyCode;
            if (evtObj.keyCode !== keyCode) {
                console.log("keyCode " + evtObj.keyCode + " 和 (" + evtObj.which + ") 不匹配");
            }
        }
        el.dispatchEvent(evtObj);
    } else if(doc.createEventObject){
        evtObj = doc.createEventObject();
        evtObj.keyCode = keyCode;
        el.fireEvent('on' + evtType, evtObj);
    }
};
/*
 * 给数组元素批量添加事件（用来触发键盘事件）
 */
function batchAddEvent(el,list) {
    list = list || [];
    if(!Array.isArray(list)) return false;
    for(let i=0,len=list.length;i<len;i++){
        // PC端绑定点击事件触发键盘事件
        // list[i].obj.onclick = function () {
        //     createKeyEvent(el, 'keydown', list[i].keyCode , list[i].key);
        // }
        // 移动端需要按下抬起两个动作 touchstart触发keydpown  touchend触发keyup
        list[i].obj.addEventListener("touchstart",(e) => {
            e.preventDefault()
            list[i].obj.classList.add("active")
            createKeyEvent(el, 'keydown', list[i].keyCode , list[i].key);
        });
        list[i].obj.addEventListener("touchend",(e) => {
            e.preventDefault()
            list[i].obj.classList.remove("active")
            createKeyEvent(el, 'keyup', list[i].keyCode , list[i].key);
        });
    }
};
function bindkeys() {
    const space = document.querySelector('#space');
    const up = document.querySelector('#up');
    const down = document.querySelector('#down');
    const left = document.querySelector('#left');
    const right = document.querySelector('#right');
    // 需要模拟键盘操控的区域
    const canvas = document.getElementById('ocanvas');

    // 如果你需要添加事件的元素比较多。可以使用index.js里面的 batchAddEvent方法 批量绑定
    let aele = [
        {
            obj: space,
            keyCode: 32,
            key: " "
        },
        {
            obj: down,
            keyCode: 40,
            key: "ArrowDown"
        },
        {
            obj: left,
            keyCode: 37,
            key: "ArrowLeft"
        },
        {
            obj: right,
            keyCode: 39,
            key: "ArrowRight"
        },
        {
            obj: up,
            keyCode: 38,
            key: "ArrowUp"
        }
    ];
    batchAddEvent(canvas,aele)

    // 监听事件（移动端举例）
    canvas.addEventListener('touchmove', () => {});
    canvas.addEventListener('touchstart', () => {});
    canvas.addEventListener('touchend', () => {});

    document.addEventListener('keydown', () => {});
    document.addEventListener('keyup', () => {});
}
```

## 10、录屏
::: tip 参考链接：
- https://www.javascriptcn.com/read-34705.html
- https://www.webrtc-experiment.com/RecordRTC/Canvas-Recording/
::: 
#### <font color="#016ab8">原生JS实现录屏，复制后可直接在浏览器运行</font>
```html
<!DOCTYPE html>
<html>
	<head>
		<meta charset="UTF-8">
		<title></title>
		<style>
		    #btn {
		    	position: absolute;
		    	width: 150px;
		    	left: 100px;
		    	top: 500px;
		    	margin: auto;
		    }
		    #div {
		    	position: absolute;
		    	top: 0;
		    	border: 5px solid gray;
		    	border-radius: 5px; 
		    	padding: 20px; 
		    	margin: 20px;
		    	width: 300px; 
		    	height: 300px;
		    }
		    #div #share {
		    	position: absolute;
		    	top: 0;
		    	left: 0;
		    	width: 100%;
		    	height: 100%;
		    	background: red;
		    	display: none;
		    }
		    #parentVideo {
    	    	position: absolute;
			    top: 0%;
			    right: 6%;
		        width: 300px; 
		    	height: 300px;
		    }
		    #parentVideo>video{
	        	width: 100%;
	        }
	        #audio {
	        	position: absolute;
	        	top: 400px;
	        }
		</style>
	</head>
	<body>
		<div id="btn">
			<button id="btn-start">开始录制</button>
			<button id="btn-stop">结束录制</button>
		</div>
		<div id="parentVideo">
			<h1>播放区域</h1>
		    <video controls autoplay playsinline id="video"></video>
		</div>
		<div id="div">
			<h1>屏幕录制区域</h1>
		    <input value="请开始你的表演" style="width: 80%;font-size: 16px;"><br><br>
		    <div id="share">
		    	<h1>等待录音中。。。。。请稍等。。。。。。。红色背景消失开始录制</h1>
		    </div>
		</div>

		<canvas id="canvas" style="position:absolute; top:-99999999px; left:-9999999999px;"></canvas>
		
		<script src="https://www.webrtc-experiment.com/RecordRTC.js"></script>
		<script src="https://webrtc.github.io/adapter/adapter-latest.js"></script>
		<script src="https://www.webrtc-experiment.com/html2canvas.min.js"></script>
		
		<script>
			var elementToRecord = document.getElementById('div');
			var canvas2d = document.getElementById('canvas');
			canvas2d.width = elementToRecord.clientWidth;
			canvas2d.height = elementToRecord.clientHeight;
			var context = canvas2d.getContext('2d');
			var canvasStream = canvas.captureStream();
			var finalStream = new MediaStream();
			var audioStream = null
			var isStoppedRecording = false;
			var recorderVideo = null
			var isRecorder = false // 控制是否需要录音
			
			document.getElementById('btn-start').onclick = function() {
				document.getElementById('video').src = '';
				document.getElementById('btn-stop').disabled = false;
				isStoppedRecording = false
				isRecorder = confirm('视频需要录音吗')
			    isRecorder ? (startAudio(),document.getElementById('share').style.display = 'block') : startVideo()
			};
			
			document.getElementById('btn-stop').onclick = function() {
			    isStoppedRecording = true;
			    stopAudioOrVideo()
            };
            
            // 生成canvas视频
			function looper() {
				if(isStoppedRecording) {
		            return;
		        }
			    html2canvas(elementToRecord).then(function(canvas) {
			        context.clearRect(0, 0, canvas2d.width, canvas2d.height);
			        context.drawImage(canvas, 0, 0, canvas2d.width, canvas2d.height);
			    });
			    requestAnimationFrame(looper);
			}
			
			// 开始录屏方法
			function startVideo () {
				recorderVideo = new RecordRTC(canvas2d, {	// 录制canvas生成视频
				    type: 'canvas'
				});
				recorderVideo.startRecording();
			    setTimeout(looper,500)
			}
			
			// 开始录音方法
			function startAudio () {
				navigator.mediaDevices.getUserMedia({ audio: true }).then(successAudioCallback).catch(()=>{});
			}
			// 录音设备准备成功后回调
			function successAudioCallback(audioStream) {
				getTracks(audioStream, 'audio').forEach(function(track) {
					finalStream.addTrack(track);
				});
				getTracks(canvasStream, 'video').forEach(function(track) {
					finalStream.addTrack(track);
				});
				
				recorderVideo = RecordRTC(finalStream, {
					type: 'video'
				});
				recorderVideo.startRecording();
			    setTimeout(looper,500)
			    console.log('可以开始录音了')
			    document.getElementById('share').style.display = 'none'
			}
			// 结束录音录屏方法
			function stopAudioOrVideo () {
				recorderVideo.stopRecording(function(audioURL) {
	                document.getElementById('video').src = audioURL;
	                console.log(audioURL)
	                recorderVideo.getDataURL(function(dataURL) {
	                	console.log(dataURL)
	                });
	                var recordedBlob = recorderVideo.getBlob();
	                console.log(recordedBlob)
	                var fd = new FormData();
					fd.append("audioData", recordedBlob);
					console.log(fd)
	                // document.getElementById('video').src = URL.createObjectURL(recordedBlob)
	                // canvasStream.stop();
					// audioStream.stop();
					recorderVideo.clearRecordedData();
	            });
			}
			
			// 上传到后台，根据业务自行修改
			function upLoad () {
				var fd = new FormData();
				fd.append("audioData", blob);
				$.ajax({
				    url: '/upload',
				    type: 'POST',
				    cache: false,
				    data: fd,
				    processData: false,
				    contentType: false
				})
			}
			
		</script>
	</body>
</html>
```

## 11、图片预加载
```js
imgSrc: [
  'static/homepage/map/s1bg.jpg',
  'static/homepage/map/s1Blur.jpg',
  'static/courseList/imgs/returnMapHover.png',
  'static/courseList/imgs/returnCourseHover.png',
], // 地图背景

this.preloadImg(this.imgSrc);
preloadImg(arr) {
  for (let i = 0; i < arr.length; i++) { // 预加载
    this.imgWrap[i] = new Image();
    this.imgWrap[i].src = arr[i];
  }
  var timers = setInterval(() => {
    if (this.imgWrap[arr.length - 1].complete) {
      // to do sth
      clearInterval(timers);
    }
  }, 50);
},
```

## 12、区分input框中英文字符长度
```js
function validTxtLength(input) {
    var i;
    var sum = 0;
    for (i = 0; i < input.length; i++) {   
        // 英文一个字符长度，中文两个字符长度
        if ((input.charCodeAt(i) >= 0) && (input.charCodeAt(i) <= 255)) {   
            sum += 1;   
        } else {   
            sum += 2;   
        }   
    }
    return sum; 
}
```

## 13、vue2.0路由切换后页面滚动位置不变BUG
解决办法很简单，如下，直接监测watch路由变化，然后将body的滚动距离scrollTop赋值为0。
```js
watch:{
    '$route':function(to,from){
        document.body.scrollTop = '0';    // 这句比较重要（微信端可以这么写）
        document.documentElement.scrollTop = 0; // pc端这么写
    }
}
```

## 14、九宫格抽奖
```vue
<template>
  <div class="gameBox">
    <div class="bg1"></div>
    <div class="bg2" v-show="lampShow"></div>
    <div class="start" @click="move">
      <p>（{{ number_of_draws }}次）</p>
    </div>
    <ul>
      <li
        v-for="(item, i) in list"
        :key="i"
        :class="['item' + (i + 1), { active: index == i }]"
      >
        <div class="img1">
          <img :src="item.image" alt />
        </div>
        <p>{{ item.prize_name }}</p>
      </li>
    </ul>
  </div>
</template>
    
<script type="text/javascript">
export default {
  data () {
    return {
      list: [], // 奖品列表
      index: 0, // 当前转动到哪个位置，第一次起点位置0,对应页面item1位置
      count: 8, // 总共有多少个位置
      times: 0, // 转动跑格子次数,
      cycle: 20, // 转动基本次数：即至少需要转动多少次再进入抽奖环节
      speed: 200, // 初始转动速度
      lampShow: false, //开始抽奖，灯光闪烁
      timer: 0, // 转动定时器
      prize: 0, // 中奖位置，接口返回
      number_of_draws: 0, // 用户剩余抽奖次数
      prize_data: {}
    };
  },
  created () {
    this.getLotteryGoods()
  },
  methods: {
    // 获取奖品列表
    getLotteryGoods () {
      // api.getLotteryGoods(param).then(res => {
      this.list = [
        {
          id: 1,
          number: 1,
          prize_name: "积分"
        },
        {
          id: 2,
          number: 2,
          prize_name: "优惠券"
        },
        {
          id: 3,
          number: 3,
          prize_name: "积分"
        },
        {
          id: 4,
          number: 4,
          prize_name: "红包"
        },
        {
          id: 5,
          number: 5,
          prize_name: "优惠券"
        },
        {
          id: 6,
          number: 6,
          prize_name: "积分"
        },
        {
          id: 7,
          number: 7,
          prize_name: "红包"
        },
        {
          id: 8,
          number: 8,
          prize_name: "优惠券"
        }
      ];
      this.number_of_draws = 3;
      // })
    },
    // 点击抽奖，获取中奖位置信息
    getUserLottery () {
      // api.getUserLottery(param).then(res => {
      this.prize_data = ''
      this.prize = Math.floor(Math.random() * this.count);
      console.log('中奖位置是：', this.prize)
      // })
    },
    //点击开始抽奖
    move () {
      if (this.times != 0) {
        console.log("正在抽奖中，请勿重复点击");
      } else if (this.number_of_draws == 0) {
        console.log("今日抽奖次数已用完,明天再来吧");
      } else {
        this.number_of_draws--; // 抽奖开始，次数-1
        this.speed = 150; // 每次抽奖速度初始化为150
        this.getUserLottery()
        this.startRoll(); //执行抽奖
      }
    },
    // 开始转动
    startRoll () {
      // this.lampShow = !this.lampShow; // 跑马灯，小心闪瞎，谨慎使用
      this.times += 1; // 转动次数
      this.oneRoll(); // 转动过程调用的每一次转动方法，这里是第一次调用初始化
      this.usePrize();
    },

    // 每一次转动
    oneRoll () {
      let index = this.index; // 当前转动到哪个位置
      index += 1;
      if (index > this.count - 1) {
        index = 0;
      }
      this.index = index;
    },
    usePrize () {
      // 如果当前转动次数达到要求 && 目前转到的位置是中奖位置
      if (this.times > this.cycle + 10 && this.prize === this.index) {
        clearTimeout(this.timer); // 清除转动定时器
        this.lampShow = false; // 白色灯隐藏
        this.times = 0; // 转动跑格子次数初始化为0，可以开始下次抽奖
        console.log("中奖啦"); //中奖弹出提示
      } else {
        this.speed -= 3; // 加快转动速度
        if (this.times > this.cycle - 5) {
          this.speed += 15; // 抽奖即将结束，放慢转动速度
        }
        this.timer = setTimeout(this.startRoll, this.speed); //开始转动
      }
    }
  }
};
</script>
<style scoped lang="scss">
.gameBox {
  display: flex;
  align-items: center;
  justify-content: center;
  width: 326px;
  height: 326px;
  margin: 150px auto 0;
  border-radius: 8px;
  background: red no-repeat left top;
  background-size: 326px 326px;
  position: relative;
  .bg1 {
    position: absolute;
    left: 4.5px;
    top: 4px;
    width: 317px;
    height: 317px;
    background: yellow no-repeat center;
    background-size: 317px 317px;
  }
  .bg2 {
    position: absolute;
    left: 4.5px;
    top: 4px;
    width: 317px;
    height: 317px;
    background: blue no-repeat center;
    background-size: 317px 317px;
  }
  .start {
    position: relative;
    width: 86px;
    height: 86px;
    background: black no-repeat center;
    border-radius: 8px;
    display: flex;
    align-items: center;
    justify-content: center;
    p {
      font-size: 12px;
      color: rgba(255, 255, 255, 1);
    }
  }
  ul {
    li {
      position: absolute;
      width: 86px;
      height: 86px;
      background: rgba(255, 255, 255, 1);
      box-shadow: 0px -4px 12px 0px #fea784 inset,
        0px -2px 22px 3px #fea784 inset, 0px -4px 6px 6px #ffd7c8 inset;
      border-radius: 8px;
      .img1 {
        margin: 15px auto 3px;
        width: 35px;
        height: 35px;
        img {
          width: 100%;
          height: auto;
        }
      }
      p {
        text-align: center;
        font-size: 13px;
        font-weight: 500;
        color: rgba(153, 153, 153, 1);
      }
    }
    .item1 {
      left: 25px;
      top: 25px;
    }
    .item2 {
      left: 120px;
      top: 25px;
    }
    .item3 {
      left: 215px;
      top: 25px;
    }
    .item4 {
      left: 215px;
      top: 120px;
    }
    .item5 {
      left: 215px;
      top: 215px;
    }
    .item6 {
      left: 120px;
      top: 215px;
    }
    .item7 {
      left: 25px;
      top: 215px;
    }
    .item8 {
      left: 25px;
      top: 120px;
    }
    .active {
      background: #fff2b1;
    }
  }
}
</style>
```

## 15、时间倒计时
```js
function show_time(time_end) {
  let time_now = new Date(); // 获取当前时间
  time_now = time_now.getTime();
  let time_distance = time_end - time_now; // 结束时间减去当前时间
  let day, hour, minute, second;
  if (time_distance > 0) {
    // 天时分秒换算
    day = Math.floor(time_distance / 86400000)
    time_distance -= day * 86400000;
    hour = Math.floor(time_distance / 3600000)
    time_distance -= hour * 3600000;
    minute = Math.floor(time_distance / 60000)
    time_distance -= minute * 60000;
    second = Math.floor(time_distance / 1000)

    // 时分秒为单数时、前面加零站位
    if (hour < 10)
      hour = "0" + hour;
    if (minute < 10)
      minute = "0" + minute;
    if (second < 10)
      second = "0" + second;

    // 显示时间
    return {
      day,
      hour,
      minute,
      second
    }
  } else {
    return false
  }
}
// 使用
let timeData;
let time_end = new Date("2022/03/06 15:11:00");  // 设定结束时间
time_end = time_end.getTime();
let timeNum = setInterval(() => {
  timeData = show_time(time_end)
  if (!timeData) {
    clearInterval(timeNum)
    timeNum = null
  }
}, 1000)
```

## 16、移动端关闭软键盘导致页面不下落
```
<input type="text" @blur.prevent="inputLoseFocus">

inputLoseFocus() {
  setTimeout(() => {
    window.scrollTo(0, 0);
  }, 100);
}
```