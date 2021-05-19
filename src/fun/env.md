---
title: 'Mac系统环境配置'
sidebar: auto
categories: 教程
collapsable: true
tags:
 - js
---

## 配置终端
Terminal程序一般我都会放在快捷入口，然后把shell改为oh~my-zsh, 因为shell的类型有很多种，Mac默认的bash的功能虽然已经很强大，但提示功能不够强大，界面也不够炫。而zsh的功能极其强大，只是配置过于复杂，起初只有极客才在用。后来，有个穷极无聊的程序员创建了一个名为oh-my-zsh的开源项目...

从此，只需简单的安装配置，小白们就可以用上狂拽炫酷吊炸天的zsh,配置过程如下：

```
查看系统是否安装了zsh:
  cat /etc/shells 
Mac默认有，没有则安装：
  brew install zsh
查看当前系统的shell:
  echo $SHELL
不是zsh，则切换
  chsh -s /bin/zsh
安装oh my zsh:
  wget https://github.com/robbyrussell/oh-my-zsh/raw/master/tools/install.sh -O - | sh
配置文件
  cp ~/.oh-my-zsh/templates/zshrc.zsh-template ~/.zshrc
```

建议大家把一些常用的命令写到.zshrc中，如：
```
alias vb="vi ~/.zshrc"
alias ob="open ~/.zshrc"
alias sb="source ~/.zshrc"

alias ni="npm install"
alias ns="npm start"
alias nl="npm run lint"
alias nb="npm run build"
alias nd="npm run dev"
alias nt="npm run test"
alias np="npm run prod"
alias npd="npm run pdeploy"
alias ndt="npm run tdeploy"

alias ga="git add ."
alias gs="git status"
alias gp="git push"
alias gl="git pull"
alias gr="git reset --hard"
alias gc="git clone"
alias gcd="git checkout dev"
alias gcm="git checkout master"
alias gst="git stash"
alias gsp="git stash pop"
```

操作流程：
```
打开编辑：vi ~/.zshrc
重起生效：source ~/.zshrc
```

## 安装node和npm
最简单的就是使用braw install node, 但作为一个专业的js 码农，建议大家先安装nvm这个node版本管理工具, 维护多个版本的node将会是一件非常麻烦的事情，而nvm就是为解决这个问题而产生的：
```
  sudo curl -o- https://raw.githubusercontent.com/creationix/nvm/v0.33.8/install.sh | bash
```
常用命令
```
nvm ls-remote // 查看node有哪些版本可以安装
nvm ls // 查看本地 所有安装的版本
nvm install node // 安装最新版 Node.js
nvm install --lts // 安装最新稳定版
nvm install v10.10.0 // 安装 node 10.10.0
nvm use v9.6.2 // 切换到node 9.6.2
```
一般安装node的时候,就会同时安装npm了，大家可以根据需要安装崭新的经过重新设计的npm客户端yarn。
```
sudo npm install -g yarn
```

## 安装编辑器vscode 
下载官网：
```
https://code.visualstudio.com/
```
安装好后，根据自己的需要添加一下常用的插件：
```
Auto Close Tag
Auto Rename Tag
Bracket Pair Colorizer
Color Highlight
HTML Snippets
HTML CSS Support
HTMLHint
file-icons
JavaScript (ES6) code snippets
Material Icon Theme
GitLens 
eslint
vueur
Vue 2 Snippets
Vue Peek
VueHelper
Node modules resolve
```

## 安装mysql
这里只分享MySQL在Mac的两种方式安装方式, 5.7后的大版本直接跳到了8.0了，建议大家先使用5.7，且5.7后为了安全，首次安装会默认生成一个特别复杂的密码，需要在安装时记下或截图：

通过brew安装：
```
brew install mysql // 安装最新8.0以后的版本
brew install mysql@5.7 
```
通过官网下载安装包：
```
https://www.mysql.com/downloads/
选择最下面的MySQL Community Downloads
然后下载 MySQL Community Server
```

安装成功后 一般服务启动的设置，在Mac的系统设置的最下面。然后通过以下命令验证是否安装成功和服务使用正常：
```
mysql -u root -p
```

而其他软件的安装，比如react-native 或者 weex等，根据官网提示操作即可。