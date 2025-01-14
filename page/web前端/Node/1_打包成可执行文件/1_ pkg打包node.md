

# 使用 pkg 打包 node服务端 项目

###### 了解 pkg原理

`pkg`实际上并不是直接将程序转换成`可执行文件`，而是将node环境一起打包到了程序中，这样就可以做到`在没有node环境下的电脑上运行node项目了`。

然后我们使用`pkg --help`先看下有哪些可用的命令

```shell
 pkg [options] <input>

  Options:

    -h, --help           output usage information
    -v, --version        output pkg version
    -t, --targets        comma-separated list of targets (see examples)
    -c, --config         package.json or any json file with top-level config
    --options            bake v8 options into executable to run with them on
    -o, --output         output file name or template for several files
    --out-path           path to save output one or more executables
    -d, --debug          show more information during packaging process [off]
    -b, --build          don't download prebuilt base binaries, build them
    --public             speed up and disclose the sources of top-level project
    --public-packages    force specified packages to be considered public
    --no-bytecode        skip bytecode generation and include source files as plain js
    --no-native-build    skip native addons build
    --no-dict            comma-separated list of packages names to ignore dictionaries. Use --no-dict * to disable all dictionaries
    -C, --compress       [default=None] compression algorithm = Brotli or GZip

  Examples:

  – Makes executables for Linux, macOS and Windows
    $ pkg index.js
  – Takes package.json from cwd and follows 'bin' entry
    $ pkg .
  – Makes executable for particular target machine
    $ pkg -t node14-win-arm64 index.js
  – Makes executables for target machines of your choice
    $ pkg -t node12-linux,node14-linux,node14-win index.js
  – Bakes '--expose-gc' and '--max-heap-size=34' into executable
    $ pkg --options "expose-gc,max-heap-size=34" index.js
  – Consider packageA and packageB to be public
    $ pkg --public-packages "packageA,packageB" index.js
  – Consider all packages to be public
    $ pkg --public-packages "*" index.js
  – Bakes '--expose-gc' into executable
    $ pkg --options expose-gc index.js
  – reduce size of the data packed inside the executable with GZip
    $ pkg --compress GZip index.js

```

`pkg`可以一次为多个目标计算机生成可执行文件。可以通过`--targets `（简写 -t）选项指定以`逗号分隔`的目标列表。规范目标由3个元素组成，例如用短划线分隔，`node6-macos-x64`或者`node4-linux-armv6`

> 以下是一些常见的 `--target` 值示例：
>
> - `node14-win`：适用于 Windows 平台的 x64 架构的可执行文件。
> - `node14-alpine`：适用于基于 Alpine Linux 的 Docker 容器。
> - `node14-macos`：适用于 macOS 平台的 x64 架构的可执行文件。

==**package.json**==

```json
"scripts": {
    "test": "echo \"Error: no test specified\" && exit 1",
    "pkg":"pkg . -t node6-macos-x64 --out-path=dist/"
  },
```

在 `pkg` 中，除了 `-t` 选项用于指定目标平台和架构类型外，还可以使用其他一些选项来控制打包程序的生成。以下是一些常用的选项：

- `--out-path`：指定输出路径，即生成的可执行文件存放的目录。
- `--config`：指定配置文件路径，可以在配置文件中设置多个选项，如入口文件、输出路径、目标平台等。
- `--options`：指定选项文件路径，可以在选项文件中设置多个选项，如版本信息、图标、控制台输出等。
- `--base-path`：指定程序根目录，即程序中代码和资源的根目录位置。
- `--public-packages`：将指定的 npm 包视为公共包，使其在最终生成的可执行文件中以 CommonJS 模块的形式存在。

例如，以下命令同时指定输出路径和程序根目录，并将 `lodash` 包视为公共包：

```shell
pkg . -t node12-win-x64 --out-path dist/ --base-path ./src --public-packages lodash
```

这将生成一个适用于 Windows 平台 x64 架构的可执行文件，并将其存放在 `dist/` 目录下，其中程序代码和资源位于 `./src` 目录下。此外，打包程序中的 `lodash` 包将被视为公共包。

- 配置

打包过程中`pkg`会解析项目中的资源，检测到`require`，遍历项目的依赖项并将它们包含到可执行文件中。有些时候我们需要**手动加入资源文件路径**，比如我们这个项目中的`js`和`views`，我们需要改一下

```json
 "scripts": {
    "start": "hotnode index.js", //热启动
    "pkg": "pkg . --out-path=dist/",//需要打包时直接终端输入 npm run pkg
    "test": "echo \"Error: no test specified\" && exit 1"
  },
  "bin":"./index.js",//打包的入口文件
  "pkg": {
    "scripts": "js/*.js",
    "assets": "views/**/*",//需要打包的静态文件目录
    "targets": ["node18"]//打包的类型 node18 node16
  },
```

> ```json
> {
>   "name": "pngservice",
>   "version": "0.0.0",
>   "private": true,
>   "bin": "./bin/www",
>   "scripts": {
>     "start": "node ./bin/www",
>     "restart": "pm2 start ./bin/www --watch",
>     "pkg": "pkg . -t  node12-win-x64 --out-path dist/",
>     "pkgout": "pkg . -t  node12-win-x64 --out-path D:/ --dist"
>   },
>   "pkg": {
>     "assets": ["public/**/*","views/**/*"],
>     "scripts": "workers/**/*.js"
>   },
>   "dependencies": {
>     "cookie-parser": "~1.4.4",
>     "debug": "~2.6.9",
>     "ejs": "^3.1.6",
>     "express": "~4.16.1",
>     "http-errors": "~1.6.3",
>     "jade": "~1.11.0",
>     "mime": "^2.5.2",
>     "morgan": "~1.9.1",
>     "mssql": "^6.2.3",
>     "pngjs": "^6.0.0",
>     "request": "^2.88.2",
>     "tedious": "^9.2.1"
>   },
>   "devDependencies": {
>     "babel-preset-env": "^1.7.0",
>     "babel-register": "^6.26.0"
>   }
> }
> ```

终端输入命令

```
npm run pkg
```

耐心等待完成后，项目中会出现 dist 文件夹，里面的 server 就是一个二进制可执行文件，双击就可以启动 node 项目了。

#### 外置配置文件

有时会有这种需求，我需要把配置文件放在外面，不用打包进exe中，方便部署时修改相关配置。这时就需要用到process.cwd了，具体如下：

```js
js复制代码// 配置文件会打包到执行文件exe中
var config = require("../config/cfg.json")

// 配置文件不会被打包，文件exe与config目录需要整体部署
const fs = require("fs");
const path = require("path");

var config =  null;
fs.readFileSync(path.join(process.cwd(), '../config/config.json'), callback)
function callback(err, data){
  config = JSON.parse(data)
}
```

需要注意的是这里最好用fs.readFileSync同步写法，而不是fs.readFile异步写法，这样保证后续代码在用到config值时不会报错，不然打包会出错。
