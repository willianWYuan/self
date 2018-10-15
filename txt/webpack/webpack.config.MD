@charset "utf-8"

>npm install -g webpack

>npm init   ==>  package.json
>npm install --save-dev webpack    ==>/mode_mudules/

>npm install --save-dev 
	webpack-dev-server

	style.loader css-loader postcss-loader postcss-import sass-loader node-sass autoprefixer

	html-webpack-plugin extract-text-webpack-plugin

	babel-loader babel-core babel-preset-latest babel-cli babel-preset-es2015 babel-preset-stage-2

	file-loader url-loader images-loader



/*----------------- package.json -----------------*/
{
  ..
  "script": {
    "test": "echo \"Error: no test specifiied\" && exit 1",
    "start": "webpack",
    "server": "webpack-dev-server --open"
  }
}

>npm run server




/*----------------- webpack.config.js-----------------*/

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
				test: /\.css$/,
				loaders: [
					'style-loader',
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
					}
				]
			},
			{
				test: /\.scss$/,
				loader: 'style-loader!css-loader!sass-loader'
			},
			{
				test: /\.(jpg|png|gif)$/i,
				loader: 'file-loader'
			},
/ {
			// 	test: /\.(css|scss|less)$/,
			// 	use: extractTextPlugin.extract({
			// 		fallback: "style-loader",
			// 		use: [
			// 			'css-loader', 
			// 			'sass-loader'
			// 		]
	  // 			})
			// }
		]
	},
	plugins: [
		new webpack.BannerPlugin('copy right!'),
		// new webpack.optimize.UglifyJsPlugin(),
		new htmlWebpackPlungin({
			template: 'app/default.html',
			title: 'webpack',
			style: 'css/reset.css',
			// minify: {     //Ñ¹Ëõ´úÂë,Ä¬ÈÏfalse
			//    removeComments: true,    //É¾³ý×¢ÊÍ
			//    collapseWhitespace: true
		 //    },   
		}),
		new extractTextPlugin('css/style.css')
	]
}




<%= htmlWebpackPlugin.options.title%>
<img src="${require('./silde6.jpg')}">



