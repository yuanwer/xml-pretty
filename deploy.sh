#!/usr/bin/env sh

# 进入生成的打包文件夹
cd dist

# 初始化仓库并添加README
git init

# 提交所有修改
git add -A
git commit -m 'deploy'

# 推送到 GitHub 的 main 分支
git push -f https://github.com/yuanwer/xml-pretty.git master:site

cd -
