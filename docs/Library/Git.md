[可视化Git学习](https://learngitbranching.js.org/?locale=zh_CN)

[猴子都能懂的git入门](https://backlog.com/git-tutorial/cn/)

## 基本概念

`git init`：git相当于生成一个虚拟区（包含`staged environment`和`local repository`）与你的实际工作区目录（`workspace`）建立联系

`git add`：表示让git追踪文件变化，变化会反映到`staged environment`

`git commit`：`staged environment`将此时追踪的文件变化生成一个节点，提交到`local repository`

`git push`：将`local repository`同步到`remote repository`

分支模型：`HEAD`是指向当前分支节点的指针，假设从`main`分支创建`feature`分支，此时`main`和`feature`两条分支的节点是相同的，分别进行提交后才会走不同的分支路线

`git merge xxx`：在当前分支上创建一个节点，合并当前分支和xxx分支的代码到此节点中

`git revert`和`git reset`：

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