/*
 * @name:
 * @Date: 2020-09-29 09:04:05
 * @LastEditTime: 2020-10-09 16:22:06
 * @FilePath: \webpackDemo\src\main.js
 * @permission:
 */
import Vue from "vue";
import App from "./App.vue";
console.log('App',App);
new Vue({
	el: "#app",
	render(h) {
		// console.log(h(App));
		return h(App);
	},
	// render: h => h(App)
});
