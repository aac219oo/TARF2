<script lang="ts" setup>
import { ref } from 'vue'
import { Search } from '@element-plus/icons-vue'

//navbar
const activeIndex = ref('1')
const handleSelect = (key: string, keyPath: string[]) => {
  console.log(key, keyPath)
}


// table
const input1 = ref('')
const tableInfo = [
        {
    unit: '綜規處',
    name: '李心平',
    phoneNumber: '02-25215550-8130',
        },{
    unit: '土建處',
    name: '徐興華',
    phoneNumber: '02-25215550-8255',
        },{
    unit: '機設處',
    name: '廖乃寬',
    phoneNumber: '02-25215550-8319',
        },{
    unit: '工管處',
    name: '李昭瑢',
    phoneNumber: '02-25215550-8449',
        },{
    unit: '技術處',
    name: '林麗卿',
    phoneNumber: '02-25215550-8022',
        },{
    unit: '秘書室',
    name: '林俐妘',
    phoneNumber: '02-25215550-8269',
        },{
    unit: '會計室',
    name: '葉桂英',
    phoneNumber: '02-25215550-262',
        },{
    unit: '開發處',
    name: '詹麗燕',
    phoneNumber: '02-25215550-23',
        },{
    unit: '一區工程處土一所',
    name: '黃秋香',
    phoneNumber: '02-25215550-18',
        },{
    unit: '一區工程處土二所',
    name: '張瑛敏',
    phoneNumber: '02-25215550-19',
        },{
    unit: '一區工程處土三所',
    name: '張美惠',
    phoneNumber: '02-25215550-13',
        },
]

</script>
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
    <el-menu-item index="1"><a href="../contact_units/index.html">捷運局各單位窗口資訊</a></el-menu-item>
    <el-menu-item index="2"><a href="../contact_com/index.html">各標號廠商窗口資訊</a></el-menu-item>
  </el-menu>

        <el-row>
          <div class="title_main contact-title"><h4>捷運局各單位窗口資訊</h4></div>
          <el-form class="contact-search">
    <el-form-item>
      <el-input
      v-model="input1"
      class="w-50 m-2"
      size="large"
      placeholder="搜尋"
      :suffix-icon="Search"
    />
    </el-form-item>
  </el-form>
  
  <el-table class="tableForm tableContactUnits" :data="tableInfo" stripe border :header-cell-style="{ background: '#ebf4f9', color: '#000', textAlign: 'center'}">    
    <el-table-column type="index" label="序號" width="90"/>
    <el-table-column prop="unit" sortable label="單位" class="unitAlign"/>
    <el-table-column prop="name" sortable label="姓名"/>
    <el-table-column prop="phoneNumber" sortable label="電話"/>
  </el-table>
        </el-row>
      </el-main>
    </el-container>
</template>


