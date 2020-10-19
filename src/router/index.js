/*
 * @name: 
 * @Date: 2020-10-13 11:08:19
 * @LastEditTime: 2020-10-19 17:37:26
 * @FilePath: \webpackDemo\src\router\index.js
 * @permission: 
 */
import Vue from "vue";
import Router from 'vue-router';
import Layout from '@/views/layout/index.vue';

Vue.use(Router);

export default new Router({
	mode: "hash",
	base: process.env.BASE_URL,
	routes: [
		{
			path: "/",
			component: Layout,
			redirect: "/rent/order/list",
			children: [
				{
					path: "/rent/order/list",
					name: "orderList",
					component: () => import("@/views/rent/order/list.vue"),
				},
				{
					path: "/rent/order/detail",
					name: "orderDetail",
					component: () => import("@/views/rent/order/detail.vue"),
				},
			],
		},
	],
});
