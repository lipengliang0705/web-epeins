# web-epeins前端项目

## 项目结构

```
web-epeins/                     # 项目名 
├── mobile/                 # 手机端开发目录
├── node_modules/   
├── views/                  # PC端开发目录               
│     ├── css/              
│     ├── fonts/         
│     ├── general/           
│     ├── img/                  
│     ├── imgs/                    
│     ├── js/               # js
│     ├── l10n/
│     ├── tpl/              # html
│     └── vendor/           # 插件
├── .gitignore
├── gulp.config.js
├── gulpfile.js
├── index.html
├── package.json
└── README.md
```

## 搭建开发环境
**nodejs(推荐v8.15.0)**

下载地址：[https://nodejs.org/download/release/v8.15.0/]()


**IDE推荐**: [vscode](https://code.visualstudio.com/)，[webstorm](http://www.jetbrains.com/webstorm/)

## 项目开发准备
1.登录 github，fork 项目到自己的仓库，项目地址：
```
https://github.com/lipengliang0705/web-epeins.git
```

2.将自己仓库的项目克隆到本地(以xiaoliang0705为例)
```
git clone https://github.com/xiaoliang0705/web-epeins.git
```

3.新增上游分支
```
git remote add upstream  https://github.com/lipengliang0705/web-epeins.git
```
## 项目运行
**第一次运行**
```
cd web-epeins
npm install //或 yarn install,需要安装yarn
npm run serve
```

## 如何提交代码

1.本地代码开发完成，每次提交前，先合并上游仓库代码：
```
git pull upstream master
```
2. 如果有冲突，请手动解决。
3. 提交代码到自己仓库。
```
git add . 
git commit -m '提交描述...'
git push origin master
```
4. 进入 gitlab，点击头部左侧的 **+**，选择`New merge request`，提交合并请求到`master`分支。

## 项目如何打包

暂不支持自动化构建代码，请联系项目管理员。

## 项目如何发布

暂不支持自动化发布，请联系项目管理员。

## 如何切换后台接口地址

打开`gulp.config.js`文件，修改`url`地址即可。
# web-epeins
