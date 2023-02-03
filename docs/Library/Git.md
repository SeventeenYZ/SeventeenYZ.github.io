[可视化Git学习](https://learngitbranching.js.org/?locale=zh_CN)

[猴子都能懂的git入门](https://backlog.com/git-tutorial/cn/)

## 常见问题

#### 删除远程分支

```
git push origin :foo // 删除远程的foo分支
```

### 开发新功能

例如要从`master`分支创建新分支

```text
git checkout master // 切换到master分支
git pull // 拉取最新代码
git checkout -b newBranch // 创建并切换到新分支
git pull origin newBranch // 拉取远程同名分支代码
git push // 看提示
git push --set-upstream origin newBranch // 关联到远程分支
```

```text
git pull = git fetch + git merge
git pull --rebase = git fetch + git rebase
```

### 想切换分支，而本地改动还不想提交

```text
git stash // 把本地的改动先缓存
git pull
git stash pop // 把刚刚缓存的再拉出来
```