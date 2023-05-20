#!/bin/bash

# 运行 npm run build-only 以进行项目构建
npm run build-only

# 定义变量
COMMIT_MESSAGE="Update site"
DIST_DIR="dist"
REPO_URL="https://github.com/yuanwer/xml-pretty.git"
SITE_BRANCH="site"

# 切换到 dist 目录
cd $DIST_DIR

# 初始化 Git 仓库
git init

# 添加所有文件到 Git
git add .

# 提交更改
git commit -m "$COMMIT_MESSAGE"

# 添加远程仓库
git remote add origin $REPO_URL

# 推送到 site 分支
git push origin master:$SITE_BRANCH --force

# 清理临时仓库
cd ..
rm -rf $DIST_DIR
