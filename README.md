lerna 常用用法：

1. `lerna init`
创建 lerna 仓库，默认 Fixed 模式。 `lerna init --independent` 可以创建 Independent 模式。

2. `lerna create xxx`
创建新模块

3. `lerna add <package>[@version] [--dev] [--exact] [--peer]`
假如有两个 package-1, package-2,。
`lerna add babel` , 该命令会在package-1和package-2下安装babel
`lerna add react --scope=package-1` ,该命令会在package-1下安装react
`lerna add package-2 --scope=package-1`，该命令会在package-1下安装package-2 (软链)

4. `lerna bootstrap`
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

8. `lerna changed`
查出待 publish 的 packages

9. `lerna clean`
删除 packages 下的 node_modules
（lerna clean 不会删除项目最外层的根 node_modules）
10. `lerna publish`
发布 packages 到 npm 仓库
（package.json中的”private“: true 不会发布）


