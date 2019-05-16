const path = require('path');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const CleanWebpackPlugin = require('clean-webpack-plugin');

module.exports = {
	entry: {
		default: './src/default/index.js',
		about: './src/about/index.js',
	},
	output: {
		filename: '[name].[hash:6].js',
		// path: path.resolve(__dirname, '_output'),
		publicPath: './dist/'
	},
	module: {rules: [{test: /\.css$/, use: ['style-loader', 'css-loader'] }, {test: /\.(png|svg|jpg|gif)$/, use: ['file-loader'] }, {test: /\.(woff|woff2|eot|ttf|otf)$/, use: ['file-loader'] }] },
	plugins: [
		new CleanWebpackPlugin(),    // 清理output.path的文件
		new HtmlWebpackPlugin({      // 导出index.html
			title: 'Index',
			template: path.resolve(__dirname, 'src/default/index.html'),
			filename: 'default/index.html',
			// inject: {
			// 	head: ['chunks2'],
			// 	body: ['chunks1', 'chunks3', 'vendor']
			// },
			chunks: ['default']   // 指定添加 entry的js
		}),
		new HtmlWebpackPlugin({      // about.html
			title: 'About',
			template: path.resolve(__dirname, 'src/about/index.html'),
			filename: 'about/index.html',
			chunks: ['about']
		}),
	],
	devtool: 'source-map',  // console.log  指定哪个文件(inline-source-map)
	devServer: {  // 热更新   npm install webpack-dev-server    暂不能个server.js并用
		contentBase: '_output',
		// hot: true,
		// historyApiFallback: true,
		// inline: true,
		// port: 80,
	}
};