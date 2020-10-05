/*
 * @name:
 * @Date: 2020-09-29 11:16:51
 * @LastEditTime: 2020-10-05 17:22:53
 * @FilePath: \webpackDemo\src\js\test.js
 * @permission:
 */
/* webpackChunkName: "jddk.js" */
import("jddk.js").then(({ default: jddk }) => {
	console.log(jddk.timestamp(), "test中");
});
import moment from "moment";
console.log(moment(new Date()).format("YYYY-MM-DD"));
export default {
	name: "小明",
	age: 18,
};
