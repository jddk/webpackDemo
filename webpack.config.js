/*
 * @name:
 * @Date: 2020-09-29 09:05:47
 * @LastEditTime: 2020-10-04 22:13:42
 * @FilePath: \webpackDemo\webpack.config.js
 * @permission:
 */
const HtmlWebpackPlugin = require("html-webpack-plugin");
const { CleanWebpackPlugin } = require("clean-webpack-plugin");

module.exports = function (env, argv) {
	console.log(env, argv);
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
				title: "管理输出",
			}),
		],
		output: {
			path: `${__dirname}/dist`,
			// 用于代码分离（获取更小的bundle，以及控制资源加载优先级），动态引入：通过模块的内联函数调用来分离代码。
			chunkFilename:
				process.env.NODE_ENV == "production"
					? "[name].[contenthash].js"
					: "[name].chunk.js",
			// 模块名+哈希字符的文件名
			filename:
				process.env.NODE_ENV == "production"
					? "[name].[contenthash].js"
					: "[name].chunk.js",
		},
		optimization: {
			runtimeChunk: "single",
			splitChunks: {
				cacheGroups: {
					vendor: {
						test: /[\\/]node_modules[\\/]/,
						name: "vendors",
						chunks: "all",
					},
				},
			},
		},
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
