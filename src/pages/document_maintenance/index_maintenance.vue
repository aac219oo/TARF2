<template>
  <el-container>
    <el-header>
      <a href="../../index.html">
        <h1>TARF2技術文件線上簽核系統</h1>
      </a>
      <h3>資料維護作業</h3>
      <p>蘇家淇(11548)</p>
    </el-header>
    <el-main>
      <el-menu
        :default-active="activeIndex"
        class="el-menu-demo index_row"
        mode="horizontal"
        @select="handleSelect"
      >
        <el-menu-item
          ><a href="../access_setting/index.html">權限設定</a></el-menu-item
        >
        <el-menu-item
          ><a href="../individual_words/index.html"
            >個人使用詞彙</a
          ></el-menu-item
        >
        <el-menu-item
          ><a href="../item_codes/index.html">系統資料維護</a></el-menu-item
        >
        <!-- <el-menu-item><a href="../resualt_codes/index.html">送審結果代碼</a></el-menu-item>
    <el-menu-item><a href="../condition_codes/index.html">案件狀態代碼</a></el-menu-item>
    <el-menu-item><a href="../com_using_right/index.html">廠商使用權限</a></el-menu-item> -->
      </el-menu>
    </el-main>
  </el-container>
</template>

<script lang="ts" setup>
import { ref } from "vue";

const activeIndex = ref("1");
const handleSelect = (key: string, keyPath: string[]) => {
  console.log(key, keyPath);
};
</script>
