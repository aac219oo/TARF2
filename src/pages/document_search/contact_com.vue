<script setup>
import { ref } from 'vue'
import { Search } from '@element-plus/icons-vue'

const input1 = ref('')
const tableInfo = [
        {
    number: '1',
    address: 'CF614A',
    unit: '皇昌營造股份有限公司',
    name: '龐靖恩',
    phonenumber: '2218-3918#508',
        },{
    number: '2',
    address: 'CF614A',
    unit: '中興工程顧問股份有限公司',
    name: '施淑芬',
    phonenumber: '2218-3918#508',
        },{
    number: '3',
    address: 'CF614B',
    unit: '中華工程股份有限公司',
    name: '許秀鳳',
    phonenumber: '2218-3918#508',
        },{
    number: '4',
    address: 'CF614C',
    unit: '遠揚營造工程股份有限公司',
    name: '朱之豪',
    phonenumber: '2218-3918#508',
        },{
    number: '5',
    address: 'CF614C',
    unit: '亞新工程顧問股份有限公司',
    name: '陳建仲',
    phonenumber: '2218-3918#508',
        },{
    number: '6',
    address: 'CF614D',
    unit: '春原營造股份有限公司',
    name: '陳瑋鈞',
    phonenumber: '2218-3918#508',
        },{
    number: '7',
    address: 'CF614D',
    unit: '亞新工程顧問股份有限公司',
    name: '龐靖恩',
    phonenumber: '2218-3918#508',
        },{
    number: '8',
    address: 'CF614D',
    unit: '泰興工程顧問股份有限公司',
    name: '施又綾',
    phonenumber: '2218-3918#508',
        },{
    number: '9',
    address: 'CF614A',
    unit: '皇昌營造股份有限公司',
    name: '龐靖恩',
    phonenumber: '2218-3918#508',
        },{ 
    number: '10',
    address: 'CF614C',
    unit: '皇昌營造股份有限公司',
    name: '龐靖恩',
    phonenumber: '2218-3918#508',
        },
]

</script>
<template>
    <el-container>
      <el-header>
        <a class="list" href="../../index.html">
          <h1>TARF2技術文件線上簽核系統</h1>
        </a>
        <h3 class="list">窗口資訊查詢</h3>
        <p class="list">蘇家淇(11548)</p>
      </el-header>
      <el-main class="contact_main">
        <el-row class="index_row">
          <a href="../contact_units/index.html">
            <el-button class="index_button" round>捷運局各單位窗口資訊</el-button>
          </a>
          <a href="./index.html">
            <el-button class="index_button" round>各標號廠商窗口資訊</el-button>
          </a>
        </el-row>      
        <el-row>
          <div class="title_main contact-title"><h4>各標號廠商窗口資訊</h4></div>
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
    <el-table-column sortable label="標號">
      <template #default="{ row }">
        {{row.address}}
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


