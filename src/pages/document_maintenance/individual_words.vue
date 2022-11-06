<template>
  <el-container>
    <el-header>
      <a href="../../index.html">
        <h1>TARF2技術文件線上簽核系統</h1>
      </a>
      <h3>資料維護作業</h3>
      <p>{{}}</p>
    </el-header>
    <el-main>
      <el-menu
        :default-active="activeIndex"
        class="el-menu-demo index_row"
        mode="horizontal"
        @select="handleSelect"
      >
        <el-menu-item index="3"
          ><a href="../access_setting/index.html">權限設定</a></el-menu-item
        >
        <el-menu-item index="1"
          ><a href="../individual_words/index.html"
            >個人使用詞彙</a
          ></el-menu-item
        >
        <el-menu-item index="2"
          ><a href="../item_codes/index.html">系統資料維護</a></el-menu-item
        >
        <!-- <el-menu-item index="2"
					><a href="../item_codes/index.html">送審項目代碼</a></el-menu-item
				>
				<el-menu-item index="3"
					><a href="../resualt_codes/index.html">送審結果代碼</a></el-menu-item
				>
				<el-menu-item index="4"
					><a href="../condition_codes/index.html"
						>案件狀態代碼</a
					></el-menu-item
				>
				<el-menu-item index="5"
					><a href="../com_using_right/index.html"
						>廠商使用權限</a
					></el-menu-item
				> -->
      </el-menu>

      <div class="maintenance_h3">技術文件【個人使用詞彙】維護</div>

      <div class="maintenance_tool_wrap">
        <div class="maintenance_search">
          <el-input
            v-model="search"
            placeholder="搜尋"
            class="input-with-select"
            :suffix-icon="Search"
            v-on:keyup.enter="sendSearch()"
          >
          </el-input>
        </div>
      </div>
      <el-table
        :data="tableData"
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
          width="70"
          min-width="50"
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
            <el-popconfirm
              width="170px"
              title="確定要刪除嗎?"
              confirm-button-text="是"
              cancel-button-text="否"
              confirm-button-type="danger"
              cancel-button-type="primary"
              @confirm="deleteRow(scope.$index)"
            >
              <template #reference>
                <el-button>
                  <img
                    src="../../assets/icon06.png"
                    style="width: 24px; vertical-align: bottom"
                    alt=""
                  />
                </el-button>
              </template>
            </el-popconfirm>
            <el-button
              link
              size="small"
              v-show="!scope.row.editable"
              @click="scope.row.editable = true"
              class="button_edit"
            >
              <img
                src="../../assets/icon04.png"
                style="width: 24px; vertical-align: bottom"
                alt=""
              />
            </el-button>
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
    </el-main>
  </el-container>
</template>
<script lang="ts" setup>
import { ref, computed, reactive, onMounted } from "vue";
import { ElMessage, ElMessageBox } from "element-plus";
import {
  Search,
  Edit,
  Delete,
  User,
  QuestionFilled,
} from "@element-plus/icons-vue";
import axios from "axios";

const url = "https://127.0.0.1:7227/api/PhraseRecd/GetPhraseRecd?UserId=16195";

// session
// onMounted(() => {
//   const user = sessionStorage.getItem("user-info");
//   username.value = JSON.parse(user).username;
//   user_id = JSON.parse(user).id;
//   axios
//     .get(url)
//     .then((res) => {
//       console.log(res.data);
//       tableData.wordsName = res.data;
//     })
//     .catch(function (error) {
//       // handle error
//       console.log(error);
//     });
// });
// navbar
const activeIndex = ref("1");
const handleSelect = (key: string, keyPath: string[]) => {
  console.log(key, keyPath);
};

// function GetSessionData() {
//   const getSession = '<%=Session["TEST_SESSION"].ToString()%>';
// } //回傳API的值

// interface User {
// 	wordsName: string
// }
// 傳送搜尋給後台
const search = ref("");
var params = new URLSearchParams();
params.append("key", "value");
axios({
  method: "post",
  url: "https://127.0.0.1:7227/api/PhraseRecd/GetPhraseRecd?UserId=16195&argPhraseDesc=測試",
  data: params,
}).then((res) => {});
// enter測試
const sendSearch = () => {
  const queryStr = tableData.value;
  console.log("search");
};
// const filterTableData = computed(() =>
// 	tableData.filter(
// 		(data) =>
// 			!search.value ||
// 			data.wordsName.toLowerCase().includes(search.value.toLowerCase())
// 	)
// )

// const tableDateArray = { ...filterTableData }

// console.log(tableDateArray)

const tableData = ref([
  {
    wordsName: "test",
  },
]);

const tableHeader = ref([
  {
    prop: "wordsName",
    label: "詞彙名稱",
    editable: false,
    type: "input",
  },
]);

const onAddItem = (index) => {
  const item = {
    wordsName: "",
    editable: true,
  };
  tableData.value.splice(index, 0, item);
};

const handleEdit = (row) => {
  row.editable = true;
};

const deleteRow = (index: number) => {
  tableData.value.splice(index, 1);
  console.log("delete");
};
</script>
