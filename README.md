#### lerna 常用

1. `lerna init`
创建 lerna 仓库，默认 Fixed 模式。 `lerna init --independent` 可以创建 Independent 模式。
> Fixed 模式 -> 所有 package 版本一致
Independent 模式 -> 可以独立控制各个 package 版本

2. `lerna create xxx`
创建新模块

3. `lerna add <package>[@version] [--dev] [--exact] [--peer]`
假如有两个 package-1, package-2,。
`lerna add babel` , 该命令会在package-1和package-2下安装babel
`lerna add react --scope=package-1` ,该命令会在package-1下安装react
`lerna add package-2 --scope=package-1`，该命令会在package-1下安装package-2 (软链)

4. `lerna bootstrap | yarn install`
安装所有依赖项并链接所有的交叉依赖 

5. `lerna exec`
在 packages 中对应包下的执行任意命令。
如要执行 package-A 下的 `yarn start`：
`lerna exec --scope package-A -- yarn start`
如果不带 --scope package，则默认在根目录执行，如
`lerna exec -- rm -rf ./node_modules`

6. `lerna run --scope my-component test`
执行 my-component 下的 npm scripts `test`

7. `lerna ls`
查看 packages
`lerna list --json` 带路径一起查

8. `lerna changed/updated/diff`
查出待 publish 的 packages
`diff` 的话会可视化修改
不主动 `git commit | tag `的话，lerna 不会检测到，lerna 底层就是基于 git npm 开发的

9. `lerna clean`
删除 packages 下的 node_modules
（lerna clean 不会删除项目最外层的根 node_modules）

10. `lerna publish`
发布 packages 到 npm 仓库，发包前需要登录 npm 账号，否则会上传 git 成功，上传 npm 失败。
（package.json中的”private“: true 不会发布）
> publish 内部做得事情：
> 1. 运行 lerna updated 来决定哪一个包需要被 publish
> 2. 如果有必要，将会更新 lerna.json 中的 version (Fixed 模式)
> 3. 将所有更新过的的包中的 package.json 的 version 字段更新
> 4. 将所有更新过的包中的依赖更新
> 5. 为新版本创建一个 git commit 或 tag
> 6. 将包 publish 到 npm 上

该命令也有许多的参数，例如 `--skip-git` 将不会创建 git commit 或 tag，`--skip-npm` 将不会把包 publish 到 npm 上。

#### 结合 yarn workspace 与 Lerna 
```json
// root -> lerna.json
{
  "npmClient": "yarn",
  "useWorkspaces": true
}
```

```json
// root -> package.json
{
  "workspaces": [
    "packages/*"
  ],
}
```

因 lerna 本身就是基于 yarn 、npm、git 开发，所以开启 yarn workspace 功能仅作如上配置即可。

#### yarn workspaces 常用

1. `yarn install`
跟 `lerna bootstrap` 效果一致，会自动帮忙解决安装和 link 问题

2. `yarn workspaces info`
各 package 依赖树关系

3. 安装 | 删除依赖
i. 给某个 package 安装 | 删除依赖：
  `yarn workspace packageB add packageA@xx.xx.xx` 将 packageA 作为 packageB 的依赖进行安装，如果想要不同 package 间的 link，必须明确指定版本号。
  `yarn workspace packageB add -D react`
  删除： `yarn workspace packageB remove packageA`
ii. 给根目录 安装 | 删除依赖(适用所有 packages)：
  `yarn add -W -D commitizen` root package 安装 commitizen
  `yarn remove -W commitizen` root package 移除 commitizen

4. 执行 `scripts`
运行 packageA 的 dev 命令: `yarn workspace packageA dev`
每个工作区运行命令: `yarn workspaces run xxx`


