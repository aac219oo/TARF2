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
        <!-- <el-menu-item index="4"
          ><a href="../access_setting/index.html">權限設定</a></el-menu-item
        > -->
        <!-- <el-menu-item index="5"><a href="../individual_words/index.html">個人使用詞彙</a></el-menu-item> -->
        <el-menu-item index="6"
          ><a href="../item_codes/index.html">送審項目代碼</a></el-menu-item
        >
        <el-menu-item index="1"
          ><a href="../resualt_codes/index.html">送審結果代碼</a></el-menu-item
        >
        <el-menu-item index="2"
          ><a href="../condition_codes/index.html"
            >案件狀態代碼</a
          ></el-menu-item
        >
        <el-menu-item index="3"
          ><a href="../com_using_right/index.html"
            >廠商使用權限</a
          ></el-menu-item
        >
      </el-menu>

      <div class="maintenance_h3">技術文件【送審結果】代碼維護</div>

      <div class="maintenance_tool_wrap">
        <div class="maintenance_search">
          <el-input
            v-model="input3"
            placeholder="搜尋"
            class="input-with-select"
            :suffix-icon="Search"
          >
          </el-input>
        </div>
      </div>

      <el-table
        :data="tableData"
        v-loading="loading"
        border
        stripe
        style="width: 100%; max-width: 800px"
        :header-cell-style="{
          background: '#ebf4f9',
          color: '#000',
          textAlign: 'center',
        }"
      >
        <el-table-column
          type="index"
          label="序號"
          width="57"
          :resizable="false"
        />
        <el-table-column
          :prop="item.prop"
          :label="item.label"
          v-for="(item, index) in tableHeader"
          :key="item.prop"
          :resizable="false"
        >
          <template #default="scope">
            <div
              v-show="item.editable || scope.row.editable"
              class="editable-row"
            >
              <template v-if="item.type === 'input'">
                <el-input
                  size="small"
                  v-model="scope.row[item.prop]"
                  :placeholder="`請輸入${item.label}`"
                  @change="handleEdit(scope.$index)"
                />
              </template>
            </div>
            <div
              v-show="!item.editable && !scope.row.editable"
              class="editable-row"
            >
              <span class="editable-row-span">{{ scope.row[item.prop] }}</span>
            </div>
          </template>
        </el-table-column>
        <el-table-column width="120px" align="right" :resizable="false">
          <template #header>
            <el-button class="maintenance_plus" @click="onAddItem"
              ><img
                src="../../assets/icon07.png"
                style="width: 26px; vertical-align: bottom"
                alt=""
            /></el-button>
          </template>
          <template #default="scope">
            <el-button
              link
              size="small"
              v-show="scope.row.editable"
              @click="scope.row.editable = false"
              class="button_edit"
            >
              <img
                src="../../assets/icon05.png"
                style="width: 24px; vertical-align: bottom"
                alt=""
              />
            </el-button>
          </template>
        </el-table-column>
      </el-table>
      <!-- <table_words /> -->
    </el-main>
  </el-container>
</template>
<script lang="ts" setup>
import { ref, onMounted } from "vue";
import { Search } from "@element-plus/icons-vue";
import axios from "axios";

sessionStorage.setItem("UserId", "11695");
const loading = ref(true);
const tableData = ref();

// session
onMounted(() => {
  const UserId = sessionStorage.getItem("UserId");
  const url =
    "https://127.0.0.1:7227/api/ResultCode/GetResultBasc?UserId=" + UserId;
  loading.value = false;
  axios
    .get(url)
    .then((res) => {
      //console.log(res.data);
      tableData.value = res.data;
      //console.log(res.data);
      console.log(tableData.value);
    })
    .catch(function (error) {
      // handle error
      console.log(error);
    });
});

// navbar
const activeIndex = ref("1");
const handleSelect = (key: string, keyPath: string[]) => {
  console.log(key, keyPath);
};

const input3 = ref("");

const item = {
  number: "",
  conditionCode: "",
  conditionInstruction: "",
};

const tableHeader = ref([
  {
    prop: "resulT_CODE",
    label: "送審結果代碼",
    editable: false,
    type: "input",
  },
  {
    prop: "resulT_NAME",
    label: "送審結果說明",
    editable: false,
    type: "input",
  },
]);

// const tableData = ref([
//   {
//     resultCode: "A",
//     resultCaption: "『A』接受",
//   },
//   {
//     resultCode: "B",
//     resultCaption:
//       "『B』接受，但需將依審查意見修正後之內容併下一階段成果文件提送",
//   },
//   {
//     resultCode: "C",
//     resultCaption: "『C』修正後再接受(請重新提送修正後之文件)",
//   },
//   {
//     resultCode: "D",
//     resultCaption: "『D』退件",
//   },
//   {
//     resultCode: "E",
//     resultCaption: "『E』存查參辦",
//   },
//   {
//     resultCode: "F",
//     resultCaption: "『F』同意備查",
//   },
//   {
//     resultCode: "G",
//     resultCaption: "『G』釐清檢討後提送修正文件續審",
//   },
//   {
//     resultCode: "M1",
//     resultCaption: "『M1』存查參辦",
//   },
//   {
//     resultCode: "M2",
//     resultCaption: "『M2』意見回覆，如附",
//   },
//   {
//     resultCode: "M3",
//     resultCaption: "『M3』無意見",
//   },
//   {
//     resultCode: "N1",
//     resultCaption: "『1』准予備查",
//   },
//   {
//     resultCode: "N2",
//     resultCaption: "『2』部分改善後重送，其餘准予備查",
//   },
//   {
//     resultCode: "N3",
//     resultCaption: "『3』不同意備查，全部改善後重送",
//   },
//   {
//     resultCode: "N4",
//     resultCaption: "『4』免審查",
//   },
// ]);

const handleEdit = (row) => {
  row.editable = true;
};

const deleteRow = (index: number) => {
  tableData.value.splice(index, 1);
};

const onAddItem = (index) => {
  const item = {
    resultCode: "",
    resultCaption: "",
    editable: true,
  };
  tableData.value.splice(index, 0, item);
};
</script>
