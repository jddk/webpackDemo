/*
 * @name:
 * @Date: 2020-09-29 09:05:47
 * @LastEditTime: 2020-10-05 17:45:12
 * @FilePath: \webpackDemo\webpack.config.js
 * @permission:
 */
const HtmlWebpackPlugin = require("html-webpack-plugin");
const { CleanWebpackPlugin } = require("clean-webpack-plugin");

module.exports = function (env, argv) {
	return {
		entry: {
			main: "./src/main.js",
			test: "./src/js/test.js",
		},
		plugins: [
			// 打包前清理dist
			new CleanWebpackPlugin(),
			// 生成HTML文件并导入js和css
			new HtmlWebpackPlugin({
				title: "webpack demo",
			}),
		],
		output: {
			path: `${__dirname}/dist`,
			// 公用部分代码块文件名，公用部分的代码会提取压缩到这个文件中
			chunkFilename:
				env.production
					? "[name].[contenthash].js"
					: "[name].chunk.js",
			// 模块名+哈希字符的文件名
			filename:
				env.production
					? "[name].[contenthash].js"
					: "[name].chunk.js",
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
		// 处理css,图片，字体文件等
		module: {
			rules: [
				{
					test: /\.css$/,
					use: ["style-loader", "css-loader"],
				},
				{
					test: /\.(png|svg|jpg|gif)$/,
					use: ["file-loader"],
				},
				{
					test: /\.(woff|woff2|eot|ttf|otf)$/,
					use: ["file-loader"],
				},
			],
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