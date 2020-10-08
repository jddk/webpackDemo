/*
 * @name:
 * @Date: 2020-09-29 09:04:05
 * @LastEditTime: 2020-10-05 18:04:50
 * @FilePath: \webpackDemo\src\main.js
 * @permission:
 */
import "./css/index.css";
// import imgurl from "./img/test.jpg";
import moment from "moment";
import Vue from "vue";

function div() {
	import(/* webpackChunkName: "jddk.js" */ "jddk.js").then(
		({ default: jddk }) => {
			const element = document.createElement("div");
			element.textContent = `测试css导入${jddk.timestamp()}`;
			element.classList.add("red");
			element.addEventListener("click", function () {
				console.log(jddk.timestamp());
				console.log(moment(new Date()).format("YYYY-MM-DD"));
			});
			document.body.appendChild(element);
		}
	);
}

function p() {
	const element = document.createElement("div");
	element.textContent = "{{name}}";
	element.classList.add("img");
	document.body.appendChild(element);
	new Vue();
}

process.env.TESTaaa = '九段刀客'
console.log(process, "process.env.production");
console.log(process.env.NODE_ENV, "NODE_ENV");
p();

setTimeout(()=>{
	div();
},1000)
