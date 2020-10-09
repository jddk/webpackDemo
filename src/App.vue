<!--
 * @Date: 2020-10-08 16:25:44
 * @LastEditTime: 2020-10-09 17:03:28
 * @FilePath: \webpackDemo\src\App.vue
 * @Author: 九段刀客
 * @permission: 
-->
<template>
  <div class="blue">
    {{ test }}
    <button @click="clickTest">点击9999</button>
  </div>
</template>

<script>
export default {
  data() {
    return {
      test: "vue的文件",
    };
  },
  methods: {
    clickTest() {
      this.test = "新的值666";
    },
  },
};
</script>
<style>
.blue {
  color: blue;
}
</style>