module.exports = {
  base: '/',
  dest: 'docs', // 如果部署在github上 需要改成docs
  title:'天宝的博客',
  heroText: '天宝的博客',
  // description:'执着于更高的技术追求！',
  port: 8080,
  head:[
    ['link', { rel: 'icon', href: 'ltbicon.ico' }],
    ['meta', { name: 'theme-color', content: '#3eaf7c' }],
    ['meta', { name: 'viewport', content: 'width=device-width,initial-scale=1,user-scalable=no' }]
  ],
  theme: 'reco',
  themeConfig: {
    type: 'blog',
    author: '天宝的博客',
    authorAvatar: '/img/ltbLogo.png',
    sidebarDepth: 3,
    navBar: true,
    startYear: '2018',
    noFoundPageByTencent: false,
    logo: '/img/ltbLogo.png',
    // lastUpdated: '最后更新时间：',
    nav: [
      {
        text: '教程',
        icon: 'reco-document',
        items: [
          { text: '环境配置', link: '/fun/env'},
          { text: 'eslint规则', link: '/fun/eslint'},
          { text: '深入浅出前端脚手架', link: '/fun/scaffold' },
          { text: 'markdown语法', link: '/fun/md' },
          { text: '全栈入门', link: '/static/1_1' },
          { text: 'JS基础', link: '/js/1' },
          { text: 'JS高级导读', link: '/dd/1-3' },
          { text: '前端进阶', link: '/fe/vue' },
          { text: '博客部署', link: '/coding/blog' },
          // { text: '带你面试', link: '/job/sf' },
        ]
      },
      {
        text: '日常总结',
        icon: 'reco-tag',
        items: [
          { text: 'JS继承', link: '/often/inherit' },
          { text: 'JS各种小知识点', link: '/often/js-tip' },
          { text: '公众号开发总结', link: '/wx/wechat' },
          { text: '小程序原生开发', link: '/wx/mp'},
          { text: '小程序uni-app开发', link: '/wx/uniapp'},
          { text: '移动端优化与踩坑', link: '/phone/optimize' },
          { text: 'web性能优化', link: '/fun/opt'},
          { text: 'ES6知识点', link: '/es6/1'},
          { text: 'Git常用命令', link: '/git/git'},
        ]
      },
      {
        text: 'webpack知识',
        icon: 'reco-other',
        items: [
          { text: 'webpack入门', link: '/webpack/webpack-base' },
          { text: 'webpack随手记', link: '/webpack/webpack-note' },
          { text: 'webpack配置vue', link: '/webpack/webpack-vue' },
          { text: '深入webpack', link: '/webpack/webpack' },
          { text: 'webpack4 拆包', link: '/webpack/webpack-opt' },
        ]
      },
      {
        text: '技术积累',
        icon: 'reco-coding',
        items: [
          { text: 'CSS样式封装', link: '/often/css' },
          { text: 'JS方法封装', link: '/often/js' },
          { text: 'JS手写源码', link: '/often/code' },
          { text: '深入skulpt', link: '/skulpt/1'},
          { text: '深入scratch', link: '/scratch/1' },
          { text: 'SSR搭建部署', link: '/often/ssr' },
          { text: '常用特效', link: '/css/c1' },
        ]
      },
      {
        text: '实战分享',
        icon: 'reco-category',
        items: [
          { text: '开发环境配置参考', link: '/share/env'},
          { text: 'vue服务端渲染', link: '/share/ssr'},
          { text: 'go+vue前后端分离实战', link: '/share/iris'},
          { text: 'uni-app多端开发回顾', link: '/share/uni'},
          { text: 'koa+vue全栈开发实战', link: '/share/koa'},
          { text: '面试必备', link: '/interview/js'},
          { text: '笔试题', link: '/write/write'}
        ]
      },
      // {
      //   text: '计算机英语',
      //   items: [
      //     { text: 'webpack 英文', link: '/en/webpack'},
      //     { text: 'npm 英文', link: '/en/npm'},
      //     { text: 'skulpt 英文', link: '/en/skulpt'},
      //     { text: 'scratch 英文', link: '/en/scratch'},
      //     { text: 'ecma 英文', link: '/en/ecma'},
      //   ]
      // },
      {
        text: '其他',
        icon: 'reco-github',
        items: [
          { text: '常用网址', link: '/url/fe'},
        ]
      },
      // {
      //   text: '项目地址',
      //   link: 'https://github.com/tianbaoliu'
      // },
    ],
    sidebar: {
      '/skulpt/': genSidebarConfig('skulpt', ['links', '1']),
      '/job/': genSidebarConfig('如何面试', ['sf', 'html', 'css', 'js', 'bom', 'node', 'vue', 'mp', 'self']),
      '/fe/': genSidebarConfig('前端教程', ['vue', 'VueRouter', 'vuex',  'linux', 'vscode', 'node', 'code', 'suanfa', 'ngnix', 'pm2', 'ssh']),
      '/js/': genSidebarConfig('JS基础', ['1', '2', '3', '4', '5', '6', '7', '8', '9']),
      '/dom/': genSidebarConfig('JS与浏览器', ['1']),
      '/dd/': genSidebarConfig('JS高阶导读', ['1-3', '4-6', '7-9', '10-12', '13-15', '16-18', '19-21', '22-25']),
      '/static/': genSidebarConfig('全栈入门',  ['1_1', '1_2', '1_3', '2_1', '2_2', '3_1', '3_2', '3_3', '4_1', '4_2', '4_3', '5_1', '5_2', '5_3', '6_1','6_2', '6_3']),
      '/phone/': genSidebarConfig('移动端优化与踩坑', ['optimize', 'optimize2', 'mobile-bug', 'wx-share']),
      '/scratch/': genSidebarConfig('Scratch相关技术点', ['1', '2', '3', '4', '5', '6', '7', 'links']),
      '/often/': genSidebarConfig('JS继承', ['inherit', 'inherit2']),
      '/es6/': genSidebarConfig('ES6知识点', ['1','2','3','4','5','6','7','8','9','10','11','12', '13', '14', '15', '16', '17']),
      '/interview/': genSidebarConfig('面试必备', ['js','es6','http', 'vue','webpack']),
      '/css/': genSidebarConfig('常用特效', ['c1','c2','c3','c4','c5','c6']),
      '/coding/': genSidebarConfig('博客托管部署', ['blog','vercel']),
    },
    valineConfig: { // https://leancloud.cn/dashboard/applist.html#/apps
      appId: 'Te90DqtWO8zJeJvkbs2AJ3lB-gzGzoHsz',
      appKey: 'wxvNPJbnra6vla5xrOL7xAUA',
      placeholder: '评价一下吧～',
      avatar: 'monsterid'
    }
  },
  // 语言
  locales: {
    '/': {
      lang: 'zh-CN'
    }
  },
  plugins: [
    [
       "ribbon", // 背景彩带
       {
          size: 90, // 彩带的宽度，默认为 90
          opacity: 0.3, // 彩带的不透明度，默认为 0.3
          zIndex: -1 // 彩带的 z-index 属性，默认值为 -1
       }
    ],
    [
      "@vuepress-reco/vuepress-plugin-kan-ban-niang", // 看板娘
      {
        // theme: ["blackCat"], // ['blackCat', 'whiteCat', 'haru1', 'haru2', 'haruto', 'koharu', 'izumi', 'shizuku', 'wanko', 'miku', 'z16']
        theme: ['blackCat', 'whiteCat', 'haru1', 'haru2', 'haruto', 'koharu', 'izumi', 'shizuku', 'wanko', 'miku', 'z16'],
        clean: true,
        messages: {
          welcome: '欢迎你的关注 ',
          home: '心里的花，我想要带你回家。',
          theme: '好吧，希望你能喜欢我的其他小伙伴。',
          close: '再见哦！',
        },
        messageStyle: {
          position: 'absolut',
          height: 'auto',
          padding: '20px 10px',
          right: '28px',
          bottom: '170px',
          fontWeight: 'bold',
          background: 'linear-gradient(270deg,#76ea8c,#0ac497)',
          borderRadius: '10px',
          color: '#fff',
        },
        modelStyle: {
          right: '40px',
          bottom: '-20px',
          opacity: '0.9'
        },
        btnStyle: {
          right: '50px',
          bottom: '40px',
        }
      }
    ],
    // [
    //   "@vuepress-reco/vuepress-plugin-bgm-player", // 音乐播放器
    //   {
    //     audios: [
    //       // 网络文件示例
    //       // {
    //       //   name: '用胳膊当枕头',
    //       //   artist: '최낙타',
    //       //   url: 'https://assets.smallsunnyfox.com/music/3.mp3',
    //       //   cover: 'https://assets.smallsunnyfox.com/music/3.jpg'
    //       // },
    //       // {
    //       //   name: '강남역 4번 출구',
    //       //   artist: 'Plastic',
    //       //   url: 'https://assets.smallsunnyfox.com/music/2.mp3',
    //       //   cover: 'https://assets.smallsunnyfox.com/music/3.jpg'
    //       // },
    //       {
    //         name: '逆流成河',
    //         artist: '金南玲',
    //         url: '/blog/mp3/nlch.mp3',
    //         cover: '/blog/img/jnl.jpg'
    //       },
    //       {
    //         name: '难念的经',
    //         artist: '周华健',
    //         url: '/blog/mp3/nndj.mp3',
    //         cover: '/blog/img/zhj.png'
    //       }
    //     ],
    //     autoShrink: true, // 是否默认缩小
    //     shrinkMode: 'mini'  // float  mini
    //   }
    // ],
    [
      "@vuepress-reco/vuepress-plugin-pagation", // 分页
      {
        perPage: 6
      }
    ],
    ["cursor-effects"], // 鼠标点击效果
    ['meting', {
      //metingApi: "https://meting.sigure.xyz/api/music",
      meting: {
        // 网易
        server: "netease",
        // 读取歌单
        type: "playlist",
        mid: "696441716", //  696441716 1835544930
      },          
      // 不配置该项的话不会出现全局播放器
      aplayer: {
        // 吸底模式
        fixed: true,
        mini: true,
        // 自动播放
        autoplay: true,
        // 歌曲栏折叠
        listFolded:true,
        // 颜色
        theme: '#f9bcdd',
        // 播放顺序为随机
        order: 'random',
        // 初始音量
        volume: 0.7,
        // 关闭歌词显示
        lrcType: 0
      },
      mobile :{
        // 手机端去掉cover图
        cover: false,
      }
    }]
  ]
}

function genSidebarConfig (title, children) {
  return [
    { title, children }
  ]
}