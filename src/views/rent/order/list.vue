<!--
 * @name: 
 * @Date: 2020-10-13 14:20:04
 * @LastEditTime: 2020-10-19 17:04:06
 * @FilePath: \webpackDemo\src\views\rent\order\list.vue
 * @permission: 
-->
<template>
  <div>
    {{ test }}
    <el-button @click="change">change</el-button>
  </div>
</template>

<script lang="ts">
import {Vue, Component} from 'vue-property-decorator';

@Component
export default class list extends Vue{
    test = 'list6'
    
    change(){
        this.test = 'list'+ new Date().getTime()
    }
}
</script>

<style lang="scss" scoped>
div {
  color: red;
}
</style>