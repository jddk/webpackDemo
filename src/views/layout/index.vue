<!--
 * @name: 
 * @Date: 2020-10-13 11:12:04
 * @LastEditTime: 2020-10-13 14:59:45
 * @FilePath: \webpackDemo\src\views\layout\index.vue
 * @permission: 
-->
<template>
    <div class="layout">
        <router-link to="/rent/order/detail"><el-button type="primary">to Detail</el-button></router-link>
        <router-link to="/rent/order/list"><el-button>to List</el-button></router-link>
        <router-view></router-view>
    </div>
</template>

<script>
    export default {
        
    }
</script>

<style lang="scss" scoped>
.layout{
    background: pink;
    box-sizing: border-box;
    padding:20px;
}
</style>