<template>
  <el-config-provider :locale="locale"> </el-config-provider>
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
        :data="filterTableData"
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
          v-for="item in tableHeader"
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
                  @change="handleAdd(scope.row)"
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
              @confirm="deleteRow(scope.row)"
            >
              <template #reference>
                <el-button v-if="scope.row.codE_USED">
                  <img
                    src="../../assets/icon06.png"
                    style="width: 24px; vertical-align: bottom"
                    alt=""
                  />
                </el-button>
              </template>
            </el-popconfirm>
            <div class="Save&Edit">
              <el-button
                link
                size="small"
                v-if="scope.row.codE_USED"
                v-show="!scope.row.editable"
                @click="handleEdit(scope.row)"
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
                v-if="scope.row.codE_USED"
                v-show="scope.row.editable"
                @click="handleSave(scope.row)"
                class="button_edit"
              >
                <img
                  src="../../assets/icon05.png"
                  style="width: 24px; vertical-align: bottom"
                  alt=""
                />
              </el-button>
            </div>
          </template>
        </el-table-column>
      </el-table>
      <!-- <table_words /> -->
    </el-main>
  </el-container>
</template>
<script lang="ts" setup>
  import { ref, onMounted, computed, reactive } from "vue"
  import { Search } from "@element-plus/icons-vue"
  import axios from "axios"
  import zhTw from "element-plus/dist/locale/zh-tw"
  import en from "element-plus/es/locale/lang/en"

  const language = ref("zh-tw")
  const locale = computed(() => (language.value === "zh-tw" ? zhTw : en))
  sessionStorage.setItem("UserId", "11695") //儲存session
  // navbar
  const activeIndex = ref("1")
  const handleSelect = (key: string, keyPath: string[]) => {
    console.log(key, keyPath)
  }
  //search
  interface User {
    aplY_ITEM_CODE: string
    aplY_ITEM_NAME: string
    message: string
    codE_USED: boolean
    statusCode: string
    editable: boolean
  }
  const search = ref("")
  const filterTableData = computed<User[]>(() => {
    return tableData.value.filter(
      (data) =>
        data.aplY_ITEM_CODE
          .toLowerCase()
          .includes(search.value.toLowerCase()) ||
        data.aplY_ITEM_NAME.toLowerCase().includes(search.value.toLowerCase())
    )
    // return tabledata.value
  })
  // loading
  const loading = ref(true)
  const tableData = ref<User[]>([]) //渲染結果在畫面上
  const url = "https://127.0.0.1:7227/api/AplyItemCode/" // 連到API
  const UserId = ref(() => {
    sessionStorage.getItem("UserId")
  }) // 儲存UserId
  // 編輯表格功能
  const AddorEdit = ref(true) //新增編輯變數 新增:true 編輯:false
  const AplyItemCodeOrg = ref("") //更改資料變數
  const storageData = reactive([]) //儲存資料

  // axios取得API中的JSON
  onMounted(() => {
    const urlTableData = url + "GetAplyItemBasc" //接收API + session
    loading.value = true //讀取畫面動畫
    axios
      .get(urlTableData)
      .then((res) => {
        // console.log(res.data)
        for (let i = 0; i < res.data.length; i++) {
          const trueOrFalse = ref()
          const codE_USED = res.data[i].codE_USED
          const message = res.data[i].message
          const aplY_ITEM_CODE = res.data[i].aplY_ITEM_CODE
          const aplY_ITEM_NAME = res.data[i].aplY_ITEM_NAME
          const statusCode = res.data[i].statusCode
          if (codE_USED === "1") {
            trueOrFalse.value = true
          } else {
            trueOrFalse.value = false
          }
          storageData[i] = {
            codE_USED: trueOrFalse.value,
            message: message,
            aplY_ITEM_CODE: aplY_ITEM_CODE,
            aplY_ITEM_NAME: aplY_ITEM_NAME,
            statusCode: statusCode,
          }
          tableData.value = storageData
        }
        // tableData.value = res.data
        loading.value = false
        // console.log(tableData.value[0].statusCode) //印JSON陣列第零項後台傳送的訊息判斷1001、1002
      })
      // 錯誤API提示
      .catch(function (error) {
        console.log(error)
      })
  })

  // 表頭渲染
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
  ])

  // 儲存表格到API //row['需要的值']
  const handleAdd = (row) => {
    if (AddorEdit.value) {
      //執行新增
      // console.log(row.aplY_ITEM_CODE, row.aplY_ITEM_NAME)
      const urlAdd =
        url +
        "SavingNew?AplyItemCode=" +
        row.aplY_ITEM_CODE +
        "&AplyItemName=" +
        row.aplY_ITEM_NAME //取得新增資料的API
      // console.log(urlAdd)
      axios
        .get(urlAdd)
        .then((res) => {
          const statusCode = res.data[0].statusCode //儲存狀態代碼
          const message = res.data[0].message //儲存狀態訊息
          //console.log(res.data);
          // 傳送值狀態錯誤並顯示訊息
          if (statusCode == "1002") {
            alert(message)
            window.location.reload() //重整頁面
          } else {
          }
          tableData.value = res.data
          //console.log(res.data);
          console.log(statusCode + "Add") //狀態代碼為新增
          //console.log(tableData.value[0].statusCode);
        })
        .catch(function (error) {
          console.log(error)
        })
    } else {
      //執行編輯
      // console.log(row.aplY_ITEM_CODE, row.aplY_ITEM_NAME)
      const urlEdit =
        url +
        "SavingModify?AplyItemCode=" +
        row.aplY_ITEM_CODE +
        "&AplyItemCodeOrg=" +
        AplyItemCodeOrg.value +
        "&AplyItemName=" +
        row.aplY_ITEM_NAME //取得編輯資料的API，並回傳舊資料的值
      axios
        .get(urlEdit)
        .then((res) => {
          const statusCode = res.data[0].statusCode //儲存狀態代碼
          const message = res.data[0].message //儲存狀態訊息
          //console.log(res.data);
          //顯示錯誤警告
          if (statusCode == "1002") {
            alert(message)
            window.location.reload()
          } else {
          }
          tableData.value = res.data
          //console.log(res.data);
          console.log(statusCode + "Edit") //狀態代碼為編輯
          //console.log(tableData.value[0].statusCode);
        })
        .catch(function (error) {
          // handle error
          console.log(error)
        })
    }
  }

  const onAddItem = (index) => {
    AddorEdit.value = true //判斷為新增表格
    const item = {
      aplY_ITEM_CODE: "",
      aplY_ITEM_NAME: "",
      codE_USED: true,
      editable: true,
      message: "",
      statusCode: "",
    }
    tableData.value.splice(index, 0, item)
    // console.log("AddorEdit：" + AddorEdit.value); //印確認編輯或新增變數
  }

  // 編輯表格
  const handleEdit = (row) => {
    AddorEdit.value = false //編輯
    row.editable = true
    AplyItemCodeOrg.value = row.aplY_ITEM_CODE //原本的值
    console.log(
      "AddorEdit：" +
        AddorEdit.value +
        "&AplyItemCodeOrg=" +
        AplyItemCodeOrg.value
    ) //印編輯值
  }

  // 儲存表格
  const handleSave = (row) => {
    row.editable = false
  }

  //刪除表格
  const deleteRow = (index: number) => {
    tableData.value.splice(index, 1)
    const urlDelete =
      url + "DeleteAplyItemCode?AplyItemCode=" + index["aplY_ITEM_CODE"] // 連api刪除功能
    // console.log(urlDelete)
    axios
      .get(urlDelete)
      .then((res) => {
        const statusCode = res.data[0].statusCode
        const message = res.data[0].message
        //console.log(res.data);
        // 錯誤訊息顯示
        if (statusCode == "1002") {
          alert(message)
          // window.location.reload()
        } else {
          alert(message)
          tableData.value = res.data
        }
        //console.log(res.data);
        // console.log(statusCode)
        //console.log(tableData.value[0].statusCode);
      })
      .catch(function (error) {
        // handle error
        console.log(error)
      })
  }
</script>
