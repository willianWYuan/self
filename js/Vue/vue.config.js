const path = require('path');
// const isDel = process.env.NODE_ENV === 'production'


function resolve(dir) {
	return path.join(__dirname, dir)
}

module.exports = {
	baseUrl: '/',
	outputDir: 'dist', //输出文件目录
	lintOnSave: false,
	pages: {
		index: {
			entry: 'src/main.js', // page 的入口
			template: 'public/index.html', // 模板来源
			filename: 'index.html', // 在 dist/index.html 的输出
		}
	},
	devServer: {
		host: 'localhost',
		port: 81,
		proxy: {
			'/': {
				target: 'http://localhost:3000', //设置你调用的接口域名和端口号 别忘了加http
				changeOrigin: true, // 如果接口跨域，需要进行这个参数配置
				ws: false,
				pathRewrite: {
					'^/': '' //这里理解成用‘/api’代替target里面的地址，后面组件中我们掉接口时直接用api代替 比如我要调用'http://40.00.100.100:3002/user/add'，直接写‘/api/user/add’即可
				}
			}
		}
	},
	chainWebpack: config => {
		config.resolve.alias
			.set('components', resolve('src/components'))
			.set('layout', resolve('src/layout'))
			.set('base', resolve('src/base'))
			.set('static', resolve('src/static'))
	},
	configureWebpack: {
		externals: {
			AMap: "AMap"
		}
	}
}