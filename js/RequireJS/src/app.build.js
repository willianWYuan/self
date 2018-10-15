({
	appDir: './',
	baseUrl: './',
	dir: './build',
    // optimize: 'none',
    inlineText: false,
	mainConfigFile: './require.config.js',
	modules: [
        {
            name: 'app',
            include: ['./js/lib/jquery.js']
        }
    ]
})