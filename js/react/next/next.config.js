const withCSS = require('@zeit/next-css')    // 组件能 import 样式表文件
const path = require('path')

function resolve(url) {
	return path.resolve(__dirname, url);
}


module.exports = withCSS({
	// pageExtensions: ['jsx', 'js'],
	exportPathMap: () => ({
		'/': { page: '/index' },
		'/about': { page: '/about' },
		'/text': { page: '/text' }
	}),
	webpack: config => {
		Object.assign(config.resolve.alias, {
			'@pages': resolve('./pages'),
			'@component': resolve('./component'),
			'@modules': resolve('./node_modules'),
		})
		return config
	}
	// distDir: 'build'    // 更改   .next名称
})