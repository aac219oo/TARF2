<script lang="ts" setup>
import { ref } from 'vue'
import { Search } from '@element-plus/icons-vue'

// navbar
const activeIndex = ref('1')
const handleSelect = (key: string, keyPath: string[]) => {
  console.log(key, keyPath)
}

// table
const input1 = ref('')
const tableInfo = [
        {
    address: 'CF614A',
    unit: '皇昌營造股份有限公司',
    name: '龐靖恩',
    phonenumber: '2218-3918#508',
        },{
    address: 'CF614A',
    unit: '中興工程顧問股份有限公司',
    name: '施淑芬',
    phonenumber: '2218-3918#508',
        },{
    address: 'CF614B',
    unit: '中華工程股份有限公司',
    name: '許秀鳳',
    phonenumber: '2218-3918#508',
        },{
    address: 'CF614C',
    unit: '遠揚營造工程股份有限公司',
    name: '朱之豪',
    phonenumber: '2218-3918#508',
        },{
    address: 'CF614C',
    unit: '亞新工程顧問股份有限公司',
    name: '陳建仲',
    phonenumber: '2218-3918#508',
        },{
    address: 'CF614D',
    unit: '春原營造股份有限公司',
    name: '陳瑋鈞',
    phonenumber: '2218-3918#508',
        },{
    address: 'CF614D',
    unit: '亞新工程顧問股份有限公司',
    name: '龐靖恩',
    phonenumber: '2218-3918#508',
        },{
    address: 'CF614D',
    unit: '泰興工程顧問股份有限公司',
    name: '施又綾',
    phonenumber: '2218-3918#508',
        },{
    address: 'CF614A',
    unit: '皇昌營造股份有限公司',
    name: '龐靖恩',
    phonenumber: '2218-3918#508',
        },{ 
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
        <el-menu
    :default-active="activeIndex"
    class="el-menu-demo index_row"
    mode="horizontal"
    @select="handleSelect"
  >
    <el-menu-item index="2"><a href="../contact_units/index.html">捷運局各單位窗口資訊</a></el-menu-item>
    <el-menu-item index="1"><a href="../contact_com/index.html">各標號廠商窗口資訊</a></el-menu-item>
  </el-menu>

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
          
  
  <el-table class="tableForm tableContactCom" :data="tableInfo" stripe border :header-cell-style="{ background: '#ebf4f9', color: '#000', textAlign: 'center'}">    
    <el-table-column type="index" label="序號" width="90"/>
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


