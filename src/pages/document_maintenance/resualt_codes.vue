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
                  @keyup="
                    scope.row[item.prop] = scope.row[item.prop].toUpperCase()
                  "
                  @keydown.esc="closeEdit(scope.row)"
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
              @confirm="deleteRow(scope.row, scope.$index)"
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
              @click="handleSave(scope.row, scope.$index)"
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
  // search
  interface User {
    resulT_CODE: string
    resulT_NAME: string
    message: string
    codE_USED: boolean
    statusCode: string
    editable: boolean
  }
  const search = ref("")
  const filterTableData = computed<User[]>(() => {
    return tableData.value.filter(
      (data) =>
        data.resulT_CODE.toLowerCase().includes(search.value.toLowerCase()) ||
        data.resulT_NAME.toLowerCase().includes(search.value.toLowerCase())
    )
    // return tabledata.value
  })
  //loading
  const loading = ref(true)
  const tableData = ref<User[]>([]) //渲染結果在畫面上
  const url = "/tarf6net/api/ResultCode/" // 連到API
  // const url = "https://localhost:7227/api/ResultCode/" // 連到test API
  const UserId = ref(() => {
    sessionStorage.getItem("UserId")
  }) // 儲存UserId
  // 編輯表格功能
  const AddorEdit = ref(true) //新增編輯變數 新增:true 編輯:false
  const ResultCodeOrg = ref("") //更改資料變數
  const storageData = reactive([]) //儲存資料

  // axios取得API中的JSON
  onMounted(() => {
    const urlTableData = url + "GetResultBasc"
    loading.value = true
    axios
      .get(urlTableData)
      .then((res) => {
        // console.log(res.data)
        for (let i = 0; i < res.data.length; i++) {
          const trueOrFalse = ref()
          const codE_USED = res.data[i].codE_USED
          const message = res.data[i].message
          const resulT_CODE = res.data[i].resulT_CODE
          const resulT_NAME = res.data[i].resulT_NAME
          const statusCode = res.data[i].statusCode
          if (codE_USED === "0") {
            trueOrFalse.value = true
          } else {
            trueOrFalse.value = false
          }
          storageData[i] = {
            codE_USED: trueOrFalse.value,
            message: message,
            resulT_CODE: resulT_CODE,
            resulT_NAME: resulT_NAME,
            statusCode: statusCode,
          }
          tableData.value = storageData
        }
        // tableData.value = res.data
        loading.value = false
        // console.log(tableData.value) //印JSON陣列第零項後台傳送的訊息判斷1001、1002
      })
      // 錯誤API提示
      .catch(function (error) {
        // handle error
        alert("資料無法讀取，請洽系統人員")
        console.log(error)
        loading.value = false
      })
  })

  // 表頭渲染
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
  ])

  // 儲存表格到API
  const handleAdd = (row) => {}
  const disabledAdd = () => {}
  const onAddItem = (index) => {
    AddorEdit.value = true //判斷為新增表格
    const item = {
      resulT_CODE: "",
      resulT_NAME: "",
      codE_USED: true,
      editable: true,
      message: "",
      statusCode: "",
    }
    tableData.value.splice(index, 0, item) //自第一行新增表格
    // console.log("AddorEdit：" + AddorEdit.value); //印確認編輯或新增變數
  }

  // 編輯表格
  const handleEdit = (row) => {
    sessionStorage.setItem("resulT_CODE", JSON.stringify(row["resulT_CODE"]))
    sessionStorage.setItem("resulT_NAME", JSON.stringify(row["resulT_NAME"]))
    AddorEdit.value = false //編輯
    row.editable = true
    ;(ResultCodeOrg.value = row["resulT_CODE"]), row["resulT_NAME"]
    console.log(
      "AddorEdit：" +
        AddorEdit.value +
        "argPhraseDescDB：" +
        ResultCodeOrg.value
    ) //印編輯值
  }

  // 儲存表格
  const handleSave = (row, index: number) => {
    row.editable = false
    //console.log(row["phrasE_DESC"]); //印JSON中需獲取的值 //row['需要的值']
    // 判斷編輯新增
    if (AddorEdit.value) {
      //執行新增
      // console.log(row.resulT_CODE, row.resulT_NAME)
      const urlAdd =
        url +
        "SavingNew?ResultCode=" +
        row.resulT_CODE +
        "&ResultName=" +
        row.resulT_NAME //取得新增資料的API
      axios
        .get(urlAdd)
        .then((res) => {
          const statusCode = res.data[0].statusCode //儲存狀態代碼
          const message = res.data[0].message //儲存狀態訊息
          //console.log(res.data);
          // 傳送值狀態錯誤並顯示訊息
          if (statusCode == "1002") {
            alert(message)
            row.editable = false
            tableData.value.splice(index, 1)
            // window.location.reload() //重整頁面
          } else {
            alert(message)
            tableData.value = storageData
          }
          //console.log(res.data);
          console.log(statusCode + "Add") //狀態代碼為新增
          //console.log(tableData.value[0].statusCode);
        })
        .catch(function (error) {
          alert("資料無法儲存，請洽系統人員")
          console.log(error)
        })
    } else {
      //執行編輯
      // console.log(storageEdit)
      const UserId = sessionStorage.getItem("UserId")
      const urlEdit =
        url +
        "SavingModify?ResultCode=" +
        row.resulT_CODE +
        "&ResultCodeOrg=" +
        ResultCodeOrg.value +
        "&ResultName=" +
        row.resulT_NAME //取得編輯資料的API，並回傳舊資料的值
      axios
        .get(urlEdit)
        .then((res) => {
          const statusCode = res.data[0].statusCode //儲存狀態代碼
          const message = res.data[0].message //儲存狀態訊息
          //console.log(res.data);
          //顯示錯誤警告
          if (statusCode == "1002") {
            alert(message)
            row.editable = false
            const resulT_CODE = JSON.parse(
              sessionStorage.getItem("resulT_CODE")
            )
            const resulT_NAME = JSON.parse(
              sessionStorage.getItem("resulT_NAME")
            )
            row.resulT_CODE = resulT_CODE
            row.resulT_NAME = resulT_NAME
            // window.location.reload()
          } else {
            alert(message)
            row.editable = false
            tableData.value = storageData
          }
          // tableData.value = res.data
          //console.log(res.data);
          console.log(statusCode + "Edit") //狀態代碼為編輯
          //console.log(tableData.value[0].statusCode);
        })
        .catch(function (error) {
          // handle error
          alert("資料無法編輯，請洽系統人員")
          console.log(error)
        })
    }
  }

  const deleteRow = (row, index: number) => {
    // tableData.value.splice(index, 1)
    const urlDelete = url + "DeleteResultCode?ResultCode=" + row["resulT_CODE"]
    axios
      .get(urlDelete)
      .then((res) => {
        const statusCode = res.data[0].statusCode
        const message = res.data[0].message
        //console.log(res.data);
        // 錯誤訊息顯示
        if (statusCode == "1002") {
          alert(message)
          tableData.value = storageData
          // window.location.reload()
        } else {
          alert(message)
          tableData.value.splice(index, 1)
          // window.location.reload()
          // tableData.value = storageData
        }
        //console.log(res.data);
        console.log(storageData)
        //console.log(tableData.value[0].statusCode);
      })
      .catch(function (error) {
        // handle error
        alert("資料無法刪除，請洽系統人員")
        console.log(error)
      })
  }

  const closeEdit = (row) => {
    row.editable = false
  }
</script>
