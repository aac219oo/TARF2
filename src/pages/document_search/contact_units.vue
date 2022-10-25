<script lang="ts" setup>
import { ref, reactive, onMounted, watch, computed } from "vue";
import { Search } from "@element-plus/icons-vue";
import axios from "axios";

//navbar
const activeIndex = ref("1");
const handleSelect = (key: string, keyPath: string[]) => {
  console.log(key, keyPath);
};

// filter
const search = ref("");

const tabledata = reactive({
  newsdata: null,
});

// axios
const url = "http://tarf.grp.com.tw/api/Test/GetDeptChargQuery";

onMounted(() => {
  axios
    .get(url)
    .then((res) => {
      // console.log(res.data);
      // tabledata.newsdata = res.data;
      console.log(res);
      tabledata.newsdata = res.data.newsdata;
    })
    .catch(function (error) {
      // handle error
      console.log(error);
    })
    .then(function () {
      // always executed
    });
});

// console.log(tabledata);

// table
// const tableInfo = [
//         {
//     depT_NAME: '綜規處',
//     empL_NAME: '李心平',
//     ofF_TEL: '02-25215550-8130',
//         },{
//     depT_NAME: '土建處',
//     empL_NAME: '徐興華',
//     ofF_TEL: '02-25215550-8255',
//         },{
//     depT_NAME: '機設處',
//     empL_NAME: '廖乃寬',
//     ofF_TEL: '02-25215550-8319',
//         },{
//     depT_NAME: '工管處',
//     empL_NAME: '李昭瑢',
//     ofF_TEL: '02-25215550-8449',
//         },{
//     depT_NAME: '技術處',
//     empL_NAME: '林麗卿',
//     ofF_TEL: '02-25215550-8022',
//         },{
//     depT_NAME: '秘書室',
//     empL_NAME: '林俐妘',
//     ofF_TEL: '02-25215550-8269',
//         },{
//     depT_NAME: '會計室',
//     empL_NAME: '葉桂英',
//     ofF_TEL: '02-25215550-262',
//         },{
//     depT_NAME: '開發處',
//     empL_NAME: '詹麗燕',
//     ofF_TEL: '02-25215550-23',
//         },{
//     depT_NAME: '一區工程處土一所',
//     empL_NAME: '黃秋香',
//     ofF_TEL: '02-25215550-18',
//         },{
//     depT_NAME: '一區工程處土二所',
//     empL_NAME: '張瑛敏',
//     ofF_TEL: '02-25215550-19',
//         },{
//     depT_NAME: '一區工程處土三所',
//     empL_NAME: '張美惠',
//     ofF_TEL: '02-25215550-13',
//         },
// ]
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
    <p v-for="(item, i) in tabledata.newsdata">{{ item.ofF_TEL }}</p>
  </el-container>
</template>
