/*
 * @name:
 * @Date: 2020-09-29 09:05:47
 * @LastEditTime: 2020-10-08 21:57:12
 * @FilePath: \webpackDemo\webpack.config.js
 * @permission:
 */
// 生成HTML
const HtmlWebpackPlugin = require("html-webpack-plugin");
// 清空文件夹
const { CleanWebpackPlugin } = require("clean-webpack-plugin");
// 提取css文件
const MiniCssExtractPlugin = require('mini-css-extract-plugin');
// 实现处理.vue文件
const VueLoaderPlugin = require('vue-loader/lib/plugin')

module.exports = function (env, argv) {
	return {
		// 入口
		entry: {
			main: "./src/main.js"
		},
		// 出口
		output: {
			path: `${__dirname}/dist`,
			// 公用部分代码块文件名，公用部分的代码会提取压缩到这个文件中
			chunkFilename:
				argv.mode == 'production'
					? "[name].[contenthash].js"
					: "[name].chunk.js",
			// 模块名+哈希字符的文件名
			filename:
				argv.mode == 'production'
					? "[name].[contenthash].js"
					: "[name].chunk.js",
		},
		// 插件配置
		plugins: [
			// 打包前清理dist
			new CleanWebpackPlugin(),
			// 将css提取到一个单独的文件
			new MiniCssExtractPlugin(),
			// 生成HTML文件并导入js和css
			new HtmlWebpackPlugin({
				template: 'public/index.html'
			}),
			new VueLoaderPlugin()
		],
		// 加载器：处理css,图片，字体文件等
		module: {
			rules: [
				{
					test: /\.css$/i,
					use: [MiniCssExtractPlugin.loader, 'css-loader'],
				},
				{
					test: /\.(png|svg|jpg|gif)$/,
					use: ["file-loader"],
				},
				{
					test: /\.(woff|woff2|eot|ttf|otf)$/,
					use: ["file-loader"],
				},
				{
					test: /\.m?js$/,
					exclude: /(node_modules|bower_components)/,
					use: {
						loader: 'babel-loader',
						options: {
							presets: ['@babel/preset-env']
						}
					}
				},
				{
					test: /\.vue$/,
					loader: 'vue-loader'
				}
			],
		},
		// 优化
		optimization: {
			//压缩： production 模式下默认true
			// minimize: true,
			// 运行的公用文件，设置为single时会将所有的共享依赖合并成一个文件，当有多个入口文件时需要这样做
			runtimeChunk: "single",
			// 动态模块导入的共享模块配置
			splitChunks: {
				cacheGroups: {
					vendor: {
						test: /[\\/]node_modules[\\/]/,
						name: "vendors",
						// 值为all时，import动态导入的模块也会被打包的共享部分代码文件里,值为async时只会共享异步的模块，initial时只共享同步的模块
						chunks: "initial",
					},
				},
			},
		},
		// 开发服务器
		devServer: {
			// 监听文件的位置
			contentBase: `${__dirname}/dist`,
			compress: true,
			port: 9000,
			//允许通过外部访问
			host: "0.0.0.0",
			// 模块热替换，实现只更新局部
			hot: true,
		},
	};
};
