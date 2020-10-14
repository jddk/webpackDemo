/*
 * @name:
 * @Date: 2020-09-29 09:05:47
 * @LastEditTime: 2020-10-13 17:10:19
 * @FilePath: \webpackDemo\webpack.config.js
 * @permission:
 */
// 生成HTML
const HtmlWebpackPlugin = require("html-webpack-plugin");
// 清空文件夹
const { CleanWebpackPlugin } = require("clean-webpack-plugin");
// 提取css文件
const MiniCssExtractPlugin = require("mini-css-extract-plugin");
// 实现处理.vue文件
const VueLoaderPlugin = require("vue-loader/lib/plugin");
// gzip压缩
const CompressionWebpackPlugin = require("compression-webpack-plugin");

module.exports = function(env, argv) {
	// 根据不同的mode配置不同的loader
	let scssCssUse = [];
	if (argv.mode == "production") {
		scssCssUse = [MiniCssExtractPlugin.loader, "css-loader", "sass-loader"];
	} else {
		scssCssUse = [
			"vue-style-loader",
			"style-loader",
			"css-loader",
			"sass-loader",
		];
	}
	return {
		// 入口
		entry: {
			main: "./src/main.js",
		},
		// 出口
		output: {
			path: `${__dirname}/dist`,
			// 公用部分代码块文件名，公用部分的代码会提取压缩到这个文件中
			chunkFilename:
				argv.mode == "production"
					? "[name].[contenthash].js"
					: "[name].chunk.js",
			// 模块名+哈希字符的文件名
			filename:
				argv.mode == "production"
					? "[name].[contenthash].js"
					: "[name].chunk.js",
		},
		resolve: {
			// 配置相对路径
			alias: {
				"@": `${__dirname}/src`,
			},
		},
		// 插件配置
		plugins: [
			// 打包前清理dist
			new CleanWebpackPlugin(),
			// 生成HTML文件并导入js和css
			new HtmlWebpackPlugin({
				template: "public/index.html",
			}),
			new VueLoaderPlugin(),
			// 将css提取到一个单独的文件
			new MiniCssExtractPlugin({
				filename: "[name].[contenthash].css",
			}),
			// gzip压缩
			new CompressionWebpackPlugin({
				// asset: "[path].gz[query]",
				algorithm: "gzip",
				test: /\.(js|css|woff|ttf)$/,
				threshold: 10240,
				minRatio: 0.8
			}),
		],
		// 加载器：处理css,图片，字体文件等
		module: {
			rules: [
				{
					test: /\.(css|scss)$/,
					use: scssCssUse,
				},
				{
					test: /\.(png|svg|jpg|jpeg|gif)$/,
					use: ["file-loader", "url-loader"],
				},
				{
					test: /\.(woff|woff2|eot|ttf|otf|wtff)$/,
					use: ["file-loader", "url-loader"],
				},
				{
					test: /\.m?js$/,
					exclude: /(node_modules|bower_components)/,
					use: {
						loader: "babel-loader",
						options: {
							presets: ["@babel/preset-env"],
						},
					},
				},
				{
					test: /\.vue$/,
					loader: "vue-loader",
				},
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
			// contentBase: `${__dirname}/dist`,
			// compress: true,
			port: 9000,
			//允许通过外部访问
			// host: "0.0.0.0",
			// 模块热替换，实现只更新局部
			hot: true,
		},
	};
};
