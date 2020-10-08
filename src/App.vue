<!--
 * @Date: 2020-10-08 16:25:44
 * @LastEditTime: 2020-10-08 21:57:46
 * @FilePath: \webpackDemo\src\App.vue
 * @Author: 九段刀客
 * @permission: 
-->
<template>
  <div class="blue">
    {{ test }}
    <button @click="clickTest">点击777</button>
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
<style scoped>
.blue {
  color: red;
}
</style>