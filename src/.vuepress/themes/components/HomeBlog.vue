<template>
  <div class="home-blog">
    <div id="ft" class="hero" :style="{ ...bgImageStyle }">
      <div
        class="mask"
        :style="{background: `url(${$frontmatter.bgImage ? $withBase($frontmatter.bgImage) : require('../images/home-bg.jpg')}) center/contain no-repeat`}">
      </div>
      <div class="landscape"></div>
      <div class="filter"></div>
      <canvas id="canvas"></canvas>
      <ModuleTransition>
        <img
          v-if="recoShowModule && $frontmatter.heroImage"
          :style="heroImageStyle || {}"
          :src="$withBase($frontmatter.heroImage)"
          alt="hero">
      </ModuleTransition>
      <!-- <ModuleTransition delay="0.04">
        <h1 v-if="recoShowModule && $frontmatter.heroText !== null">
          {{ $title }}
        </h1>
      </ModuleTransition> -->

      <ModuleTransition delay="0.08">
        <p v-if="recoShowModule && $frontmatter.tagline !== null" class="description">
          <!-- {{ $frontmatter.tagline || $description}} -->
          {{ $description }}
        </p>
      </ModuleTransition>
    </div>

    <ModuleTransition delay="0.16">
      <div v-show="recoShowModule" class="home-blog-wrapper">
        <div class="blog-list">
          <!-- 博客列表 -->
          <note-abstract
            :data="$recoPosts"
            :currentPage="currentPage"></note-abstract>
          <!-- 分页 -->
          <pagation
            class="pagation"
            :total="$recoPosts.length"
            :currentPage="currentPage"
            @getCurrentPage="getCurrentPage" />
        </div>
        <div class="info-wrapper">
          <PersonalInfo/>
          <h4><i class="iconfont reco-category"></i> {{homeBlogCfg.category}}</h4>
          <ul class="category-wrapper">
            <li class="category-item" v-for="(item, index) in this.$categories.list" :key="index">
              <router-link :to="item.path">
                <span class="category-name">{{ item.name }}</span>
                <span class="post-num" :style="{ 'backgroundColor': getOneColor() }">{{ item.pages.length }}</span>
              </router-link>
            </li>
          </ul>
          <hr>
          <h4 v-if="$tags.list.length !== 0"><i class="iconfont reco-tag"></i> {{homeBlogCfg.tag}}</h4>
          <TagList @getCurrentTag="getPagesByTags" />
          <h4 v-if="$themeConfig.friendLink && $themeConfig.friendLink.length !== 0"><i class="iconfont reco-friend"></i> {{homeBlogCfg.friendLink}}</h4>
          <FriendLink />
        </div>
      </div>
    </ModuleTransition>

    <ModuleTransition delay="0.24">
      <Content v-show="recoShowModule" class="home-center" custom/>
    </ModuleTransition>
    <!-- <Clock class='pclock' color='#fff' border="none"></Clock> -->
  </div>
</template>

<script>

import TagList from '@theme/components/TagList'
import FriendLink from '@theme/components/FriendLink'
import NoteAbstract from '@theme/components/NoteAbstract'
import pagination from '@theme/mixins/pagination'
import ModuleTransition from '@theme/components/ModuleTransition'
import PersonalInfo from '@theme/components/PersonalInfo'
import { getOneColor } from '@theme/helpers/other'
import moduleTransitonMixin from '@theme/mixins/moduleTransiton'
import Clock from '@theme/components/Clock'

export default {
  mixins: [pagination, moduleTransitonMixin],
  components: { NoteAbstract, TagList, FriendLink, ModuleTransition, PersonalInfo, Clock },
  data () {
    return {
      recoShow: false,
      currentPage: 1,
      tags: []
    }
  },
  computed: {
    homeBlogCfg () {
      return this.$recoLocales.homeBlog
    },
    actionLink () {
      const {
        actionLink: link,
        actionText: text
      } = this.$frontmatter

      return {
        link,
        text
      }
    },
    heroImageStyle () {
      return this.$frontmatter.heroImageStyle || {
        maxHeight: '200px',
        margin: '6rem auto 1.5rem'
      }
    },
    bgImageStyle () {
      const initBgImageStyle = {
        height: '350px',
        textAlign: 'center',
        overflow: 'hidden'
      }
      if(!this.isPC()) {
        initBgImageStyle.height = '200px'
      }
      const {
        bgImageStyle
      } = this.$frontmatter
      return bgImageStyle ? { ...initBgImageStyle, ...bgImageStyle } : initBgImageStyle
    },
    heroHeight () {
      return document.querySelector('.hero').clientHeight
    }
  },
  mounted () {
    this.recoShow = true
    this._setPage(this._getStoragePage())

    this.canvasInit()
  },
  methods: {
    // 获取当前页码
    getCurrentPage (page) {
      this._setPage(page)
      setTimeout(() => {
        window.scrollTo(0, this.heroHeight)
      }, 100)
    },
    // 根据分类获取页面数据
    getPages () {
      let pages = this.$site.pages
      pages = pages.filter(item => {
        const { home, date } = item.frontmatter
        return !(home == true || date === undefined)
      })
      // reverse()是为了按时间最近排序排序
      this.pages = pages.length == 0 ? [] : pages
    },
    getPagesByTags (tagInfo) {
      this.$router.push({ path: tagInfo.path })
    },
    _setPage (page) {
      this.currentPage = page
      this.$page.currentPage = page
      this._setStoragePage(page)
    },
    canvasInit() {
      function Star(id, x, y){
        this.id = id;
        this.x = x;
        this.y = y;
        this.r = Math.floor(Math.random()*2)+1;
        var alpha = (Math.floor(Math.random()*10)+1)/10/2;
        this.color = "rgba(255,255,255,"+alpha+")";
      }

      Star.prototype.draw = function() {
        ctx.fillStyle = this.color;
        ctx.shadowBlur = this.r * 2;
        ctx.beginPath();
        ctx.arc(this.x, this.y, this.r, 0, 2 * Math.PI, false);
        ctx.closePath();
        ctx.fill();
      }

      Star.prototype.move = function() {
        this.y -= .15;
        if (this.y <= -10) this.y = HEIGHT + 10;
        this.draw();
      }

      Star.prototype.die = function() {
          stars[this.id] = null;
          delete stars[this.id];
      }


      function Dot(id, x, y, r) {
        this.id = id;
        this.x = x;
        this.y = y;
        this.r = Math.floor(Math.random()*5)+1;
        this.maxLinks = 2;
        this.speed = .5;
        this.a = .5;
        this.aReduction = .005;
        this.color = "rgba(255,255,255,"+this.a+")";
        this.linkColor = "rgba(255,255,255,"+this.a/4+")";

        this.dir = Math.floor(Math.random()*140)+200;
      }

      Dot.prototype.draw = function() {
        ctx.fillStyle = this.color;
        ctx.shadowBlur = this.r * 2;
        ctx.beginPath();
        ctx.arc(this.x, this.y, this.r, 0, 2 * Math.PI, false);
        ctx.closePath();
        ctx.fill();
      }

      Dot.prototype.link = function() {
        if (this.id == 0) return;
        var previousDot1 = getPreviousDot(this.id, 1);
        var previousDot2 = getPreviousDot(this.id, 2);
        var previousDot3 = getPreviousDot(this.id, 3);
        if (!previousDot1) return;
        ctx.strokeStyle = this.linkColor;
        ctx.moveTo(previousDot1.x, previousDot1.y);
        ctx.beginPath();
        ctx.lineTo(this.x, this.y);
        if (previousDot2 != false) ctx.lineTo(previousDot2.x, previousDot2.y);
        if (previousDot3 != false) ctx.lineTo(previousDot3.x, previousDot3.y);
        ctx.stroke();
        ctx.closePath();
      }

      function getPreviousDot(id, stepback) {
        if (id == 0 || id - stepback < 0) return false;
        if (typeof dots[id - stepback] != "undefined") return dots[id - stepback];
        else return false;//getPreviousDot(id - stepback);
      }

      Dot.prototype.move = function() {
        this.a -= this.aReduction;
        if (this.a <= 0) {
          this.die();
          return
        }
        this.color = "rgba(255,255,255,"+this.a+")";
        this.linkColor = "rgba(255,255,255,"+this.a/4+")";
        this.x = this.x + Math.cos(degToRad(this.dir))*this.speed,
        this.y = this.y + Math.sin(degToRad(this.dir))*this.speed;

        this.draw();
        this.link();
      }

      Dot.prototype.die = function() {
          dots[this.id] = null;
          delete dots[this.id];
      }
      var canvas  = document.getElementById('canvas'),
        ctx = canvas.getContext('2d'),
        WIDTH,
        HEIGHT,
        mouseMoving = false,
        mouseMoveChecker,
        mouseX,
        mouseY,
        stars = [],
        initStarsPopulation = 80,
        dots = [],
        dotsMinDist = 2,
        maxDistFromCursor = 50;

      setCanvasSize();
      init();

      function setCanvasSize() {
        WIDTH = document.documentElement.clientWidth,
          // HEIGHT = document.documentElement.clientHeight;
        HEIGHT = document.getElementById('ft').offsetHeight;

        canvas.setAttribute("width", WIDTH);
        canvas.setAttribute("height", HEIGHT);
      }

      function init() {
        ctx.strokeStyle = "white";
        ctx.shadowColor = "white";
        for (var i = 0; i < initStarsPopulation; i++) {
          stars[i] = new Star(i, Math.floor(Math.random()*WIDTH), Math.floor(Math.random()*HEIGHT));
          //stars[i].draw();
        }
        ctx.shadowBlur = 0;
        animate();
      }

      function animate() {
          ctx.clearRect(0, 0, WIDTH, HEIGHT);

          for (var i in stars) {
            stars[i].move();
          }
          for (var i in dots) {
            dots[i].move();
          }
          drawIfMouseMoving();
          requestAnimationFrame(animate);
      }

      window.onmousemove = function(e){
        mouseMoving = true;
        mouseX = e.clientX;
        mouseY = e.clientY;
        clearTimeout(mouseMoveChecker);
        mouseMoveChecker = setTimeout(function() {
          mouseMoving = false;
        }, 100);
      }


      function drawIfMouseMoving(){
        if (!mouseMoving) return;

        if (dots.length == 0) {
          dots[0] = new Dot(0, mouseX, mouseY);
          dots[0].draw();
          return;
        }

        var previousDot = getPreviousDot(dots.length, 1);
        var prevX = previousDot.x; 
        var prevY = previousDot.y; 

        var diffX = Math.abs(prevX - mouseX);
        var diffY = Math.abs(prevY - mouseY);

        if (diffX < dotsMinDist || diffY < dotsMinDist) return;

        var xVariation = Math.random() > .5 ? -1 : 1;
        xVariation = xVariation*Math.floor(Math.random()*maxDistFromCursor)+1;
        var yVariation = Math.random() > .5 ? -1 : 1;
        yVariation = yVariation*Math.floor(Math.random()*maxDistFromCursor)+1;
        dots[dots.length] = new Dot(dots.length, mouseX+xVariation, mouseY+yVariation);
        dots[dots.length-1].draw();
        dots[dots.length-1].link();
      }
      //setInterval(drawIfMouseMoving, 17);

      function degToRad(deg) {
        return deg * (Math.PI / 180);
      }
    },
    isPC() {
      try {
        var userAgentInfo = navigator.userAgent;
        var Agents = ["Android", "iPhone", "SymbianOS", "Windows Phone", "iPad", "iPod"];
        var flag = true;
        for (var v = 0; v < Agents.length; v++) {
          if (userAgentInfo.indexOf(Agents[v]) > 0) {
            flag = false;
            break;
          }
        }
        return flag;
      } catch (error) {
        return true
      }
    },
    getOneColor
  }
}
</script>

<style lang="stylus">
.home-blog {
  padding: $navbarHeight 0 0;
  margin: 0px auto;

  .hero {
    position relative
    background:black;
	  background:linear-gradient(to bottom,#000000 0%,#5788fe 100%);
    box-shadow: 1px 0px 10px #888888;
    .filter {
      width:100%;
      height:100%;
      position:absolute;
      top:0;
      left:0;
      background:#fe5757;
      animation:colorChange 30s ease-in-out infinite;
      animation-fill-mode:both;
      mix-blend-mode:overlay;
    }
    @keyframes colorChange {
      0%,100% {
        opacity:0;
      }
      50% {
        opacity:.9;
      }
    }
    .landscape {
      position:absolute;
      bottom:0px;
      left:0;
      width:100%;
      height:100%;
    }
    .mask {
      position absolute
      top 0
      bottom 0
      left 0
      right 0
      // z-index -1
      &:after {
        display block
        content ' '
        background var(--mask-color)
        position absolute
        top 0
        bottom 0
        left 0
        right 0
        z-index 0
        opacity .2
      }
    }
    figure {
      position absolute
      background yellow
    }

    h1 {
      margin:7rem auto 1.8rem;
      font-size: 2.5rem;
    }

    h1, .description, .action, .huawei {
      color #fff
    }

    .description {
      margin: 1.8rem auto;
      font-size: 1.6rem;
      line-height: 1.3;
    }
  }
  .home-blog-wrapper {
    display flex
    align-items: flex-start;
    margin 20px auto 0
    max-width 1126px
    .blog-list {
      flex auto
      width 0
      .abstract-wrapper {
        .abstract-item:last-child {
          margin-bottom: 0px;
        }
      }
    }
    .info-wrapper {
      position: -webkit-sticky;
      position: sticky;
      top: 70px;
      transition all .3s
      margin-left 15px;
      flex 0 0 300px
      height auto;
      box-shadow var(--box-shadow);
      border-radius $borderRadius
      box-sizing border-box
      padding 0 15px
      background var(--background-color)
      &:hover {
        box-shadow: var(--box-shadow-hover);
      }
      h4 {
        color var(--text-color)
      }
      .category-wrapper {
        list-style none
        padding-left 0
        .category-item {
          margin-bottom .4rem
          padding: .4rem .8rem;
          transition: all .5s
          border-radius $borderRadius
          box-shadow var(--box-shadow)
          background-color var(--background-color)
          &:hover {
            transform scale(1.04)
          }
          a {
            display flex
            justify-content: space-between
            .post-num {
              width 1.6rem;
              height 1.6rem
              text-align center
              line-height 1.6rem
              border-radius $borderRadius
              background #eee
              font-size .6rem
              color #fff
            }
          }
        }
      }
    }
  }
}

@media (max-width: $MQMobile) {
  .home-blog {
    padding-left: 1.5rem;
    padding-right: 1.5rem;
    .hero {
      margin 0 -1.5rem
      height 450px
      img {
        max-height: 210px;
        margin: 2rem auto 1.2rem;
      }

      h1 {
        margin: 6rem auto 1.8rem ;
        font-size: 2rem;
      }

      h1, .description, .action {
        // margin: 1.2rem auto;
      }

      .description {
        font-size: 1.2rem;
      }

      .action-button {
        font-size: 1rem;
        padding: 0.6rem 1.2rem;
      }
    }
    .home-blog-wrapper {
      .info-wrapper {
        display none!important
      }
    }
  }
}

@media (max-width: $MQMobileNarrow) {
  .home-blog {
    padding-left: 1.5rem;
    padding-right: 1.5rem;

    .hero {
      margin 0 -1.5rem
      height 350px
      img {
        max-height: 210px;
        margin: 2rem auto 1.2rem;
      }

      h1 {
        margin: 6rem auto 1.8rem ;
        font-size: 2rem;
      }

      h1, .description, .action {
        // margin: 1.2rem auto;
      }

      .description {
        font-size: 1.2rem;
      }

      .action-button {
        font-size: 1rem;
        padding: 0.6rem 1.2rem;
      }
    }

    .home-blog-wrapper {
      .info-wrapper {
        display none!important
      }
    }
  }
}
</style>
