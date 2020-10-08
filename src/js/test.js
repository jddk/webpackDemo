/*
 * @name:
 * @Date: 2020-09-29 11:16:51
 * @LastEditTime: 2020-10-08 15:17:24
 * @FilePath: \webpackDemo\src\js\test.js
 * @permission:
 */
/* webpackChunkName: "jddk.js" */
import("jddk.js").then(({ default: jddk }) => {
	console.log(jddk.timestamp(), "test中");
});
// import moment from "moment";
// console.log(moment(new Date()).format("YYYY-MM-DD"));
export default {
	name: "小明",
	age: 18,
};

function box() {
	new Promise((resolve, reject) => {
		setTimeout(() => {
			return resolve(135300)
		})
	})
}

async function test() {
	let a = await box()
}
console.log(test())