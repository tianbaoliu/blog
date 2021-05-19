---
home: true
# heroImage: /img/ltbLogo.png
bgImage: '/img/bg.jpg'
# bgImage: '/img/xkbg.png'
bgImageStyle: {
  # height: '350px',
  background: 'url(/img/bg.jpg) center center / cover repeat #FFE98B',
  # background: 'url(/blog/img/bs.gif) center center / cover repeat #FFE98B',
  # background: 'url(/blog/img/ky.gif) left no-repeat #C1EDE7',
  # background: 'url(/blog/img/1.gif) center no-repeat #fff',
  # background: 'url(/blog/img/xkbg.png) center no-repeat',
  # background-size: 'cover',
}
actionText: 开始学习
actionLink: /js/1
features:
- title: 正直
  details: 热爱并践行优秀中文传统文化，自我的成长来自成就他人！
- title: 专业
  details: 热爱编程，苦修基本功，立志开发维护让自己做梦都笑出声的代码！
- title: 高效
  details: 想尽一切办法，让日常工作更加高效、充满创新和无比有趣，享受编程！
footer: Copyright © 2019
---
<script>
export default {
  mounted () {
    var dom = document.getElementsByClassName("theme-container")[0].classList
    dom.add("index-page-class")

    const ifJanchor = document.getElementById("JanchorDown"); 
    ifJanchor && ifJanchor.parentNode.removeChild(ifJanchor);
    let a = document.createElement('a');
    a.id = 'JanchorDown';
    a.className = 'anchor-down';
    document.getElementsByClassName('hero')[0].append(a);
    let targetA = document.getElementById("JanchorDown");
    targetA.addEventListener('click', e => { // 添加点击事件
      this.scrollFn();
    })
  },
  methods: {
    scrollFn() {
      const windowH = document.getElementsByClassName('hero')[0].clientHeight; // 获取窗口高度
      // document.documentElement.scrollTop = windowH; // 滚动条滚动到指定位置
      window.scrollTo({ 
        top: windowH, 
        behavior: "smooth" 
      });
    }
  },
  beforeDestroy() {
    var dom = document.getElementsByClassName("theme-container")[0].classList
    dom.remove("index-page-class")
  }
}
</script>

<style>
.anchor-down {
  display: block;
  margin: 12rem auto 0;
  bottom: 45px;
  width: 20px;
  height: 20px;
  font-size: 34px;
  text-align: center;
  animation: bounce-in 5s 3s infinite;
  position: absolute;
  left: 50%;
  bottom: 30%;
  margin-left: -10px;
  cursor: pointer;
}
@-webkit-keyframes bounce-in{
  0%{transform:translateY(0)}
  20%{transform:translateY(0)}
  50%{transform:translateY(-20px)}
  80%{transform:translateY(0)}
  to{transform:translateY(0)}
}
.anchor-down::before {
  content: "";
  width: 20px;
  height: 20px;
  display: block;
  border-right: 3px solid #fff;
  border-top: 3px solid #fff;
  transform: rotate(135deg);
  position: absolute;
  bottom: 10px;
}
.anchor-down::after {
  content: "";
  width: 20px;
  height: 20px;
  display: block;
  border-right: 3px solid #fff;
  border-top: 3px solid #fff;
  transform: rotate(135deg);
}
</style>
