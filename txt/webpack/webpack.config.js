
const htmlWebpackPlungin = require('html-webpack-plugin');
const webpack = require('webpack');
const extractTextPlugin = require('extract-text-webpack-plugin');

module.exports = {
	entry: __dirname + '/app/main.js',
	output: {
		path: __dirname + '/public',
		// publicPath: 'http://cdn/',
		filename:  'js/bundle.js'
	},
	devtool: 'none',
	devServer: {
		contentBase: './public',
		historyApiFallback: true,
		inline: true,
		port: 80
	},
	module: {
		loaders: [
			{
				test: /\.js$/,
				loader: 'babel',
				exclude: __dirname + '/node_modules',
				include: __dirname + '/app',
				query: {
					presets: ['latest']
				}
			},
			{
				test: /\.(css|scss|less)$/,
				loaders: [
					// 'style-loader',
					{loader: 'css-loader?importLoaders=1'},
					{
						loader: 'postcss-loader', 
						options: {
							plugins: function(){
								return [
									require('postcss-import')(),
									require('autoprefixer')({
										browers: ['last 5 versions']
									})
								];
							}
						}
					},
					'sass-loader'
				]
			},
			// {
			// 	test: /\.(css|scss|less)$/,
			// 	use: extractTextPlugin.extract({
			// 		fallback: "style-loader",
			// 		use: [
			// 			'css-loader', 
			// 			'sass-loader'
			// 		]
	  // 			})
			// },
			{
				test: /\.(jpg|png|gif)$/i,
				loader: 'file-loader'
			}
		]
	},
	plugins: [
		new webpack.BannerPlugin('copy right!'),
		// new webpack.optimize.UglifyJsPlugin(),
		new htmlWebpackPlungin({
			template: 'app/default.html',
			title: 'webpack',
			style: 'css/reset.css',
			// minify: {     //压缩代码,默认false
			//    removeComments: true,    //删除注释
			//    collapseWhitespace: true
		 //    },   
		}),
		new extractTextPlugin('css/style.css')
	]
}

