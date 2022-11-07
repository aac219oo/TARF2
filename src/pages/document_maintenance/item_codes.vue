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
        <!-- <el-menu-item index="5"
          ><a href="../access_setting/index.html">權限設定</a></el-menu-item
        > -->
        <!-- <el-menu-item index="6"><a href="../individual_words/index.html">個人使用詞彙</a></el-menu-item> -->
        <el-menu-item index="1"
          ><a href="../item_codes/index.html">送審項目代碼</a></el-menu-item
        >
        <el-menu-item index="2"
          ><a href="../resualt_codes/index.html">送審結果代碼</a></el-menu-item
        >
        <el-menu-item index="3"
          ><a href="../condition_codes/index.html"
            >案件狀態代碼</a
          ></el-menu-item
        >
        <el-menu-item index="4"
          ><a href="../com_using_right/index.html"
            >廠商使用權限</a
          ></el-menu-item
        >
      </el-menu>

      <div class="maintenance_h3">技術文件【送審項目】代碼維護</div>

      <div class="maintenance_tool_wrap">
        <div class="maintenance_search">
          <el-input
            v-model="search"
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
      <!-- <table_words /> -->
    </el-main>
  </el-container>
</template>
<script lang="ts" setup>
import { ref, onMounted } from "vue";
import { Search, Edit, Delete } from "@element-plus/icons-vue";
import axios from "axios";

sessionStorage.setItem("UserId", "11695");
const loading = ref(true);
const tableData = ref();

// session
onMounted(() => {
  const UserId = sessionStorage.getItem("UserId");
  const url =
    "https://127.0.0.1:7227/api/AplyItemCode/GetAplyItemBasc?UserId=" + UserId;
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

// const tableData = reactive({
//   wordsName: "",
// });
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

const search = ref("");

// const item = {
//   number: '',
//   conditionCode: '',
//   conditionInstruction: '',
// }

const tableHeader = ref([
  {
    prop: "aplY_ITEM_CODE",
    label: "項目代碼",
    editable: false,
    type: "input",
  },
  {
    prop: "aplY_ITEM_NAME",
    label: "項目名稱",
    editable: false,
    type: "input",
  },
]);

// const tableData = ref([
//   {
//     itemCode: "ACP",
//     itemName: "交流供電(機電)",
//   },
//   {
//     itemCode: "AD",
//     itemName: "竣工圖",
//   },
//   {
//     itemCode: "AFC",
//     itemName: "自動收費(機電)",
//   },
//   {
//     itemCode: "BSUM",
//     itemName: "送審文件(基設)",
//   },
//   {
//     itemCode: "C",
//     itemName: "證明書",
//   },
//   {
//     itemCode: "CL",
//     itemName: "計算書",
//   },
//   {
//     itemCode: "COM",
//     itemName: "通訊(機電)",
//   },
//   {
//     itemCode: "DCP",
//     itemName: "直流供電(機電)",
//   },
//   {
//     itemCode: "DD",
//     itemName: "設計圖",
//   },
//   {
//     itemCode: "DEP",
//     itemName: "機場設備(機電)",
//   },
//   {
//     itemCode: "DMP",
//     itemName: "設計管理計畫(機電)",
//   },
//   {
//     itemCode: "ECS",
//     itemName: "環控系統(機電)",
//   },
//   {
//     itemCode: "ELE",
//     itemName: "電梯(機電)",
//   },
//   {
//     itemCode: "EMP",
//     itemName: "其他管理計畫(機電)",
//   },
//   {
//     itemCode: "ESC",
//     itemName: "電扶梯(機電)",
//   },
//   {
//     itemCode: "EST",
//     itemName: "設備及系統測試計畫(機電)",
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
    itemCode: "",
    itemName: "",
    editable: true,
  };
  tableData.value.splice(index, 0, item);
};
</script>
