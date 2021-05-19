---
title: 'Git常用命令'
sidebar: auto
categories: 日常总结
tags:
 - git
collapsable: true
---

## git简单配置
拉取项目到本地，并配置git提交时的用户信息
```
git clone 项目地址
git config --global user.name "用户名"
git config --global user.email "邮箱"
```

## branch
```
git branch              列出所有本地分支
git branch -r           列出所有远程分支
git branch -a           列出所有本地分支和远程分支
git branch 分支名        新建本地分支
git branch -d 分支名     删除本地分支
```

## checkout
```
git checkout 分支名                 切换分支，没有则新建分支
git checkout -b 分支名              新建分支，并切换到该分支
git checkout 提交版本号 -b 分支名     基于某个commit提交创建分支
git checkout -- 文件名              放弃单个未使用git add缓存的文件修改
git checkout .                     放弃所有未使用git add缓存文件的修改
```
## fetch
```
git fetch origin 分支名          拉取指定分支到本地，不合并
简写：git fetch
```

## merge
```
git merge 分支名                 合并分支
git merge --continue            合并时有修改但无冲突，执行此命令继续
快捷键：shift（按住） + z（按两次z）
```

## add
```
git add 文件名      提交指定文件修改到缓存区
git add .          提交所有修改到缓存区
```

## commit
```
git commit -m "注释"     提交缓存区到本地仓库
```

## pull
```
git pull origin 分支名              拉取远程分支代码更新合并
简写：git pull
等同于：git fetch + git merge
```

## push
```
git push origin 分支名       上传代码到远程仓库
简写：git push

git push -u origin 分支名     -u 表示第一次推送分支的所有内容，后面再推送就不需要-u了
git push origin -d 分支名     删除远程分支
```

## cherry-pick
```
git cherry-pick 提交版本号         某次commit合并到指定分支，如master，需要切换到master分支下执行此命令
git cherry-pick --continue       合并时有修改但无冲突，执行此命令继续
git cherry-pick --abort          撤销上次cherry-pick
```

## reset
```
git reset HEAD            取消所有add文件的修改，不影响已经commit了的文件
git reset HEAD 文件名      取消指定add文件的修改，不影响已经commit了的文件
                
git reset --hard HEAD^          回滚代码到上一次commit
git reset --hard 提交版本号       回滚代码到某个commit
```

## bisect
#### git bisect是用来查找哪一次代码提交引入了错误，查找两次提交之间的问题
```
格式 ：git bisect start [终点版本号] [起点版本号]

1、首先，检查一下代码提交历史 （比如有101次提交）
   git log --pretty=oneline

2、执行下面的命令以后，代码库就会切换到这段范围内的中间的（第51次）一个提交版本
   git bisect start HEAD 4d83cf     起点是第一次提交4d83cf，终点是最近一次的HEAD

3、如果此版本没有问题，执行下面的命令 （说明问题出现在此版本之后，继续执行上面命令查找问题）
   git bisect good                  标识本次提交没有问题

4、如果没有问题，继续执行第二步骤，此时会切换到第76次提交，如果有问题，继续往下

5、如果发现此次提交版本有问题，执行下面命令，就自动切换到第51次到第76次的中点，第63次提交
   git bisect bad                   标识本次提交有问题

6、不断重复这个过程，直到成功找到出问题的那一次提交为止，Git会提示
   b47892 is the first bad commit

7、最后，执行以下命令
   git bisect reset                 退出查错，回到最近一次的代码提交

8、开始修复错误，判断是否错，去页面点吧点吧
```

## 其他命令
```
git log                     查看日志，查看commit所有提交版本
git status                  显示所有修改的文件
git rm 文件名                删除指定文件
git diff 文件名              比较文件修改后的差异，commit之前
git remote remove origin    删除远端仓库
```

## 强制提交
<font color="red">强制提交，并且删除此次提交之后的版本（除非只有自己一个人用，不然用此命令的都要把手剁了！！！）</font>
```
git push -f     了解就行，没把握别用
```
::: warning 假设一个场景
将代码回退到10个commit版本之前，然后修改后，强制提交，那么在此提交后的10个版本就会被删除，如果多人协作，会删除别人的提交。<br>
为什么会强制提交：原因是回退到某个commit后，必须要先pull才能正常push，如果先pull一下，又会回到最新版本的提交，那么commit回退就没意义了。<br>
建议：如果碰到此类问题，建议基于commit提交版本号拉取新分支在做修改
:::

## 清除git缓存
:::tip
应用场景，如：文件名称大小写修改，同名图片替换，因为有缓存，不会提交跟新，此时需要清除后重新提交，完整操作流程：
:::
```
git rm -r --cache .
git add .
git commit -m '...'
```

## 提交五步
```
1、git pull      取回远程主机某个分支的更新，再与本地的指定分支合并
2、git status    查看状态，是否冲突
3、git add .     将修改保存到缓存区
4、git commit -m "注释"      提交缓存区到本地仓库
5、git push origin 分支名    提交到远程分支
```

## 查看用户提交行数

#### 统计指定用户代码提交情况
```
使用 git config user.name 命令查看git用户名

切换到指定项目下执行：
git log --author="你的git用户名" --pretty=tformat: --numstat | awk '{ add += $1; subs += $2; loc += $1 - $2 } END { printf "added lines: %s, removed lines: %s, total lines: %s\n", add, subs, loc }' -

例如：
git log --author="liutianbao" --pretty=tformat: --numstat | awk '{ add += $1; subs += $2; loc += $1 - $2 } END { printf "added lines: %s, removed lines: %s, total lines: %s\n", add, subs, loc }' -
```

#### 统计所有人代码提交情况
```
切换到指定项目下执行：
git log --format='%aN' | sort -u | while read name; do echo -en "$name\t"; git log --author="$name" --pretty=tformat: --numstat | awk '{ add += $1; subs += $2; loc += $1 - $2 } END { printf "added lines: %s, removed lines: %s, total lines: %s\n", add, subs, loc }' -; done
```