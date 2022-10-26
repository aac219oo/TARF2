<script lang="ts" setup>
import { ref, reactive, onMounted } from 'vue'
import { Search, SetUp } from '@element-plus/icons-vue'
import axios from 'axios'

// navbar
const activeIndex = ref('1')
const handleSelect = (key: string, keyPath: string[]) => {
  console.log(key, keyPath)
}

// filter
const input1 = ref('')

// axios
const url = 'http://tarf.grp.com.tw/api/Test/GetOtherChargQuery';

const data = reactive({
    newsdata:'',
})
  
onMounted(() => {
  axios.get(url)
    .then(res => {
      console.log(res.data);
      data.newsdata = res.data
    })
    .catch(function (error) {
      // handle error
      console.log(error)
    })
    .then(function () {
      // always executed
    })
});


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
      size="default"
      placeholder="搜尋"
      :suffix-icon="Search"
    />
    </el-form-item>
  </el-form>
          
  
  <el-table class="tableForm tableContactCom" :data="data.newsdata" stripe border :header-cell-style="{ background: '#ebf4f9', color: '#000', textAlign: 'center'}">    
    <el-table-column type="index" label="序號" width="90" :resizable="false"/>
    <el-table-column prop="proJ_ID" sortable label="標號" :resizable="false"/>
    <el-table-column prop="useR_ID" sortable label="單位" :resizable="false"/>
    <el-table-column prop="depT_NAME" sortable label="姓名" :resizable="false"/>
    <el-table-column prop="useR_NAME" sortable label="電話" :resizable="false"/>
  </el-table>
        </el-row>
      </el-main>
      <!-- <p>{{data.newsdata}}</p> -->
    </el-container>
</template>


