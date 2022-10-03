<script setup>
import { ref } from 'vue'
import { Search } from '@element-plus/icons-vue'

const input1 = ref('')
const tableInfo = [
        {
    number: '1',
    unit: '綜規處',
    name: '李心平',
    phonenumber: '02-25215550-8130',
        },{
    number: '2',
    unit: '土建處',
    name: '徐興華',
    phonenumber: '02-25215550-8255',
        },{
    number: '3',
    unit: '機設處',
    name: '廖乃寬',
    phonenumber: '02-25215550-8319',
        },{
    number: '4',
    unit: '工管處',
    name: '李昭瑢',
    phonenumber: '02-25215550-8449',
        },{
    number: '5',
    unit: '技術處',
    name: '林麗卿',
    phonenumber: '02-25215550-8022',
        },{
    number: '6',
    unit: '秘書室',
    name: '林俐妘',
    phonenumber: '02-25215550-8269',
        },{
    number: '7',
    unit: '會計室',
    name: '葉桂英',
    phonenumber: '02-25215550-262',
        },{
    number: '8',
    unit: '開發處',
    name: '詹麗燕',
    phonenumber: '02-25215550-23',
        },{
    number: '9',
    unit: '一區工程處土一所',
    name: '黃秋香',
    phonenumber: '02-25215550-18',
        },{
    number: '10',
    unit: '一區工程處土二所',
    name: '張瑛敏',
    phonenumber: '02-25215550-19',
        },{
    number: '11',
    unit: '一區工程處土三所',
    name: '張美惠',
    phonenumber: '02-25215550-13',
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
        <el-row class="index_row">
          <a href="./index.html">
            <el-button class="index_button" round>捷運局各單位窗口資訊</el-button>
          </a>
          <a href="../contact_com/index.html">
            <el-button class="index_button" round>各標號廠商窗口資訊</el-button>
          </a>
        </el-row>      
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
  
  <el-table class="tableForm" :data="tableInfo" stripe border :header-cell-style="{ background: '#ebf4f9', color: '#000', textAlign: 'center'}">    
    <el-table-column sortable label="序號" width="90">
      <template #default="{ row }">
        {{row.number}}
      </template>
    </el-table-column>
    <el-table-column sortable label="單位">
      <template #default="{ row }">
        {{row.unit}}
      </template>
    </el-table-column>
    <el-table-column sortable label="姓名">
      <template #default="{ row }">
        {{row.name}}
      </template>
    </el-table-column>
    <el-table-column sortable label="電話">
      <template #default="{ row }">
        {{row.phonenumber}}
      </template>
    </el-table-column>
  </el-table>
        </el-row>
      </el-main>
    </el-container>
</template>


