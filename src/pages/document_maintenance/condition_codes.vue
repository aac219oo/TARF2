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
      <el-menu :default-active="activeIndex" class="el-menu-demo index_row" mode="horizontal" @select="handleSelect">
        <!-- <el-menu-item index="3"
          ><a href="../access_setting/index.html">權限設定</a></el-menu-item
        > -->
        <!-- <el-menu-item index="4"><a href="../individual_words/index.html">個人使用詞彙</a></el-menu-item> -->
        <el-menu-item index="5"><a href="../item_codes/index.html">送審項目代碼</a></el-menu-item>
        <el-menu-item index="6"><a href="../resualt_codes/index.html">送審結果代碼</a></el-menu-item>
        <el-menu-item index="1"><a href="../condition_codes/index.html">案件狀態代碼</a></el-menu-item>
        <el-menu-item index="2"><a href="../com_using_right/index.html">廠商使用權限</a></el-menu-item>
      </el-menu>

      <div class="maintenance_h3">技術文件【案件狀態】代碼維護</div>

      <div class="maintenance_tool_wrap">
        <div class="maintenance_search">
          <el-input v-model="search" placeholder="搜尋" class="input-with-select" :suffix-icon="Search">
          </el-input>
        </div>
      </div>

      <el-table :data="tableData" v-loading="loading" border stripe style="width: 100%; max-width: 800px"
        :header-cell-style="{
          background: '#ebf4f9',
          color: '#000',
          textAlign: 'center',
        }">
        <el-table-column type="index" label="序號" width="57" :resizable="false" />
        <el-table-column :prop="item.prop" :label="item.label" v-for="(item, index) in tableHeader" :key="item.prop"
          :resizable="false">
          <template #default="scope">
            <div v-show="item.editable || scope.row.editable" class="editable-row">
              <template v-if="item.type === 'input'">
                <el-input size="small" v-model="scope.row[item.prop]" :placeholder="`請輸入${item.label}`"
                  @change="handleAdd(scope.row)" />
              </template>
            </div>
            <div v-show="!item.editable && !scope.row.editable" class="editable-row">
              <span class="editable-row-span">{{ scope.row[item.prop] }}</span>
            </div>
          </template>
        </el-table-column>
        <el-table-column width="120px" align="right" :resizable="false">
          <template #header>
            <el-button class="maintenance_plus" @click="onAddItem"><img src="../../assets/icon07.png"
                style="width: 26px; vertical-align: bottom" alt="" /></el-button>
          </template>
          <template #default="scope">
            <el-popconfirm width="170px" title="確定要刪除嗎?" confirm-button-text="是" cancel-button-text="否"
              confirm-button-type="danger" cancel-button-type="primary" @confirm="deleteRow(scope.$index)">
              <template #reference>
                <el-button>
                  <img src="../../assets/icon06.png" style="width: 24px; vertical-align: bottom" alt="" />
                </el-button>
              </template>
            </el-popconfirm>
            <el-button link size="small" v-show="!scope.row.editable" @click="handleEdit(scope.row)"
              class="button_edit">
              <img src="../../assets/icon04.png" style="width: 24px; vertical-align: bottom" alt="" />
            </el-button>
            <el-button link size="small" v-show="scope.row.editable" @click="handleSave(scope.row)" class="button_edit">
              <img src="../../assets/icon05.png" style="width: 24px; vertical-align: bottom" alt="" />
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
import { Search, Edit, Delete } from "@element-plus/icons-vue";
import axios from "axios";

sessionStorage.setItem("UserId", "11695"); //儲存session
// navbar
const activeIndex = ref("1");
const handleSelect = (key: string, keyPath: string[]) => {
  console.log(key, keyPath);
};
const search = ref(""); // search
const loading = ref(true);
const tableData = ref(); //渲染結果在畫面上
const url = ref("https://127.0.0.1:7227/api/StatusCode/") // 連到API
const UserId = ref(() => { sessionStorage.getItem("UserId"); }) // 儲存UserId
// 編輯表格功能
const AddorEdit = ref(true); //新增編輯變數 新增:true 編輯:false
const argPhraseDescDB = ref(""); //更改資料變數

// 確認session + axios取得API中的JSON
onMounted(() => {
  const UserId = sessionStorage.getItem("UserId");
  const urlTableData = url + "GetPhraseRecd?UserId=" + UserId; //接收API + session
  // loading.value = false;
  setTimeout(() => (loading.value = false), 1000);
  axios
    .get(urlTableData)
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

// 表頭渲染
const tableHeader = ref([
  {
    prop: "casE_STATUS",
    label: "狀態代號",
    editable: false,
    type: "input",
  },
  {
    prop: "statuS_DESC",
    label: "狀態說明",
    editable: false,
    type: "input",
  },
]);

const handleAdd = (row) => {
  //console.log(row["phrasE_DESC"]); //印JSON中需獲取的值 //row['需要的值']
  // 判斷編輯新增
  if (AddorEdit.value) { //執行新增
    const UserId = sessionStorage.getItem("UserId"); //session判斷是否可以從後台接收或傳送
    const urlAdd = url + "SavingNew?UserId=" + UserId + "&argPhraseDesc=" + row["casE_STATUS, statuS_DESC"]; //取得新增資料的API
    axios
      .get(urlAdd)
      .then((res) => {
        const statusCode = res.data[0].statusCode; //儲存狀態代碼
        const message = res.data[0].message; //儲存狀態訊息
        //console.log(res.data);
        // 傳送值狀態錯誤並顯示訊息
        if (statusCode == "1002") {
          alert(message);
          window.location.reload();
        } else {
        }
        tableData.value = res.data;
        //console.log(res.data);
        console.log(statusCode + "Add"); //狀態代碼為新增
        //console.log(tableData.value[0].statusCode);
      })
      .catch(function (error) {
        console.log(error);
      });
  } else { //執行編輯
    const UserId = sessionStorage.getItem("UserId");
    const urlEdit = url + "SavingModify?UserId=" + UserId + "&argPhraseDesc=" + row["casE_STATUS, statuS_DESC"] + "&argPhraseDescDB=" + argPhraseDescDB.value; //取得編輯資料的API，並回傳舊資料的值
    axios
      .get(urlEdit)
      .then((res) => {
        const statusCode = res.data[0].statusCode; //儲存狀態代碼
        const message = res.data[0].message; //儲存狀態訊息
        //console.log(res.data);
        //顯示錯誤警告
        if (statusCode == "1002") {
          alert(message);
          window.location.reload();
        } else {
        }
        tableData.value = res.data;
        //console.log(res.data);
        console.log(statusCode + "Edit"); //狀態代碼為編輯
        //console.log(tableData.value[0].statusCode);
      })
      .catch(function (error) {
        // handle error
        console.log(error);
      });
  }
};

const onAddItem = (index) => {
  AddorEdit.value = true; //判斷為新增表格
  // 定義新增表格
  const item = {
    casE_STATUS: "",
    statuS_DESC: "",
    editable: true,
  };
  tableData.value.splice(index, 0, item);
  // console.log("AddorEdit：" + AddorEdit.value); //印確認編輯或新增變數
};

// 編輯表格
const handleEdit = (row) => {
  AddorEdit.value = false; //編輯
  row.editable = true;
  argPhraseDescDB.value = row["casE_STATUS, statuS_DESC"];
  console.log(
    "AddorEdit：" +
    AddorEdit.value +
    "argPhraseDescDB：" +
    argPhraseDescDB.value
  ); //印編輯值
};

// 儲存表格
const handleSave = (row) => {
  row.editable = false;
};

//刪除表格
const deleteRow = (index: number) => {
  // 儲存session
  const UserId = sessionStorage.getItem("UserId");
  const urlDelete = url + "DeletePhraseBasc?UserId=" + UserId + "&argPhraseDesc=" + index["casE_STATUS, statuS_DESC"];  // 儲存刪除api
  axios
    .get(urlDelete)
    .then((res) => {
      const statusCode = res.data[0].statusCode;
      const message = res.data[0].message;
      //console.log(res.data);
      // 錯誤訊息顯示
      if (statusCode == "1002") {
        alert(message);
        window.location.reload(); //重整頁面
      } else {
        alert(message);
        tableData.value = res.data;
      }
      //console.log(res.data);
      console.log(statusCode);

      //console.log(tableData.value[0].statusCode);
    })
    .catch(function (error) {
      // handle error
      console.log(error);
    });
};

</script>
