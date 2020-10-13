/*
 * @name:
 * @Date: 2020-09-29 09:04:05
 * @LastEditTime: 2020-10-13 14:56:27
 * @FilePath: \webpackDemo\src\main.js
 * @permission:
 */
import Vue from "vue";
import App from "./App.vue";
import router from './router/index.js';
import ElementUI from "element-ui";
import "element-ui/lib/theme-chalk/index.css";
// .vue文件中使用vue-loader 将.vue文件转化为AST(抽象语法树)，html中直接使用vue;vue会使用内部的方法实现模版编译，编译成VNode
// console.log('App',App);
Vue.use(ElementUI);
new Vue({
	el: "#app",
	router,
	render(h) {
		// 用render渲染函数将AST转化为VNode虚拟DOM
		return h(App);
	},
	// render: h => h(App)
});
