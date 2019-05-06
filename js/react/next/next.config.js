const path = require('path')


function resolve(url) {
	return path.resolve(__dirname, url);
}


module.exports = {
	// pageExtensions: ['jsx', 'js'],
	exportPathMap: () => ({
		'/': { page: '/' },
		'/about': { page: '/about' },
		'/index': { page: '/index' },
		'/text': { page: '/text' }
	}),
	webpack: config => {
		Object.assign(config.resolve.alias, {
			'@pages': resolve('./pages'),
			'@layout': resolve('./layout'),
			'@plugin': resolve('./plugin'),
		})
		return config
	}
	// distDir: 'build'    // 更改   .next名称
}