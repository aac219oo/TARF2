<script lang="ts" setup>
import { ref, reactive, onMounted, watch, computed } from "vue";
import { Search } from "@element-plus/icons-vue";
import axios from "axios";
// import { setTimeout } from "timers/promises";

//navbar
const activeIndex = ref("1");
const handleSelect = (key: string, keyPath: string[]) => {
  console.log(key, keyPath);
};

// filter
const search = ref("");
// loading
const loading = ref(true);

// const callback = '<%=Session["TEST_SESSION"].ToString()%>' 回傳API的值

const tabledata = reactive({
  newsdata: "",
});

// axios
//各單位窗口資訊查詢
const url = "https://127.0.0.1:7227/api/ContactInfoQuery/GetDeptChargQuery";

onMounted(() => {
  // loading.value = false;
  setTimeout(() => (loading.value = false), 3000);
  axios
    .get(url)
    .then((res) => {
      console.log(res.data);
      tabledata.newsdata = res.data;
    })
    .catch(function (error) {
      // handle error
      console.log(error);
    })
    .then(function () {
      // always executed
    });
});
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
        <el-menu-item index="1"
          ><a href="../contact_units/index.html"
            >捷運局各單位窗口資訊</a
          ></el-menu-item
        >
        <el-menu-item index="2"
          ><a href="../contact_com/index.html"
            >各標號廠商窗口資訊</a
          ></el-menu-item
        >
      </el-menu>

      <el-row>
        <div class="title_main contact-title">
          <h4>捷運局各單位窗口資訊</h4>
        </div>
        <el-form class="contact-search">
          <el-form-item>
            <el-input
              v-model="search"
              class="w-50 m-2"
              size="default"
              placeholder="搜尋"
              :suffix-icon="Search"
            />
          </el-form-item>
        </el-form>

        <el-table
          class="tableForm tableContactUnits"
          v-loading="loading"
          :data="tabledata.newsdata"
          stripe
          border
          :header-cell-style="{
            background: '#ebf4f9',
            color: '#000',
            textAlign: 'center',
          }"
        >
          <el-table-column type="index" label="序號" width="90" />
          <el-table-column
            prop="depT_NAME"
            sortable
            label="單位"
            class="unitAlign"
          />
          <el-table-column prop="empL_NAME" sortable label="姓名" />
          <el-table-column prop="ofF_TEL" sortable label="電話" />
        </el-table>
      </el-row>
    </el-main>
    <!-- <p>{{ tabledata.newsdata }}</p> -->
  </el-container>
</template>
