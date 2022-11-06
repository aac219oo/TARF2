<script></script>
<template>
  <el-container>
    <el-header>
      <a href="../../index.html">
        <h1>TARF2技術文件線上簽核系統</h1>
      </a>
      <h3>窗口資訊查詢</h3>
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
          ><a href="../contact_units/index.html"
            >捷運局各單位窗口資訊</a
          ></el-menu-item
        >
        <el-menu-item
          ><a href="../contact_com/index.html"
            >各標號廠商窗口資訊</a
          ></el-menu-item
        >
      </el-menu>
    </el-main>
  </el-container>
</template>
