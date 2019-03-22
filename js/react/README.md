## npm run eject

创建配置文件 文件夹config、scripts




## scripts - start.js

注释openBrowser(urls.localUrlForBrowser)        修改npm start自动打开浏览器




## config - paths.js

修改路径




## config - webpack.config.js

修改alias

const UglifyJsPlugin = require('uglifyjs-webpack-plugin');   // 生产后  不打印console.log
module.exports.plugins = [
	...,
	new UglifyJsPlugin({
		uglifyOptions: {
			compress: {
				warnings: false,
				drop_console: true, //console
				drop_debugger: false,
				pure_funcs: ['console.log'] //移除console
			}
		}
	})
]






## package.json

scripts.start: set PORT=9000 && node scripts/start.js    // 修改端口
proxy: url    // 跨域
dependencies
	react-app-polyfill    // 解决IE兼容   开发模式只有IE11能用   生产模式>=9都能打开    在./src/index.js 引用 'react-app-polyfill/ie9', 'core-js/es6/map', 'core-js/es6/set';
	react-router-dom      // 路由