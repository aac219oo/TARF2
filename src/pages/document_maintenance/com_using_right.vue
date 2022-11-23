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
        <!-- <el-menu-item index="2"
          ><a href="../access_setting/index.html">權限設定</a></el-menu-item
        > -->
        <!-- <el-menu-item index="3"><a href="../individual_words/index.html">個人使用詞彙</a></el-menu-item> -->
        <el-menu-item index="4"
          ><a href="../item_codes/index.html">送審項目代碼</a></el-menu-item
        >
        <el-menu-item index="5"
          ><a href="../resualt_codes/index.html">送審結果代碼</a></el-menu-item
        >
        <el-menu-item index="6"
          ><a href="../condition_codes/index.html"
            >案件狀態代碼</a
          ></el-menu-item
        >
        <el-menu-item index="1"
          ><a href="../com_using_right/index.html"
            >廠商使用權限</a
          ></el-menu-item
        >
      </el-menu>
      <div class="maintenance_h3">廠商使用權限維護</div>

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

        <!-- dialogAddItem -->
        <template class="maintenance_add_wrap">
          <el-button class="maintenance_add" @click="dialogFormVisible = true">
            新增帳號
          </el-button>
          <el-dialog
            v-model="dialogFormVisible"
            center
            align-center
            :close-on-click-modal="false"
            @close="cancel"
            :before-close="cancel"
            title="新增帳號"
            :destroy-on-close="true"
          >
            <el-form ref="ruleFormRef" :model="ruleForm" :rules="rules">
              <el-form-item
                label="帳號"
                :label-width="formLabelWidth"
                prop="EmplSeri"
              >
                <el-input
                  v-model="ruleForm.EmplSeri"
                  @keyup.enter="submitForm(ruleFormRef)"
                  placeholder="請輸入"
                  clearable
                />
              </el-form-item>
              <el-form-item
                label="姓名"
                :label-width="formLabelWidth"
                prop="UserName"
              >
                <el-input
                  v-model="ruleForm.UserName"
                  @keyup.enter="submitForm(ruleFormRef)"
                  placeholder="請輸入"
                  clearable
                />
              </el-form-item>
              <el-form-item
                label="公司名稱"
                :label-width="formLabelWidth"
                prop="DeptName"
              >
                <el-input
                  v-model="ruleForm.DeptName"
                  @keyup.enter="submitForm(ruleFormRef)"
                  placeholder="請輸入"
                  clearable
                />
              </el-form-item>
              <el-form-item
                label="權限種類"
                :label-width="formLabelWidth"
                prop="RighItem"
              >
                <el-select
                  v-model="ruleForm.RighItem"
                  filterable
                  default-first-option
                  :reserve-keyword="false"
                  placeholder="請選擇"
                >
                  <el-option
                    v-for="item in optionsRighItem"
                    :key="item.value"
                    :label="item.label"
                    :value="item.value"
                  />
                </el-select>
              </el-form-item>
              <el-form-item
                label="統一編號"
                :label-width="formLabelWidth"
                prop="CustUnifNo"
              >
                <el-input
                  v-model="ruleForm.CustUnifNo"
                  @keyup.enter="submitForm(ruleFormRef)"
                  placeholder="請輸入"
                  clearable
                />
              </el-form-item>
              <el-form-item
                label="標號"
                :label-width="formLabelWidth"
                prop="ProjIdStr"
              >
                <el-select
                  v-model="ruleForm.ProjIdStr"
                  multiple
                  filterable
                  default-first-option
                  :reserve-keyword="false"
                  placeholder="請選擇"
                >
                  <el-option
                    v-for="(item, index) in optionsProjIdStr"
                    :key="index"
                    :label="item.proJ_ID"
                    :value="item.proJ_ID"
                  />
                </el-select>
              </el-form-item>
            </el-form>
            <template #footer>
              <span class="dialog-footer">
                <el-button @click="cancel">取消</el-button>
                <el-button
                  native-type="submit"
                  type="primary"
                  @click="submitForm(ruleFormRef)"
                >
                  儲存
                </el-button>
              </span>
            </template>
          </el-dialog>
        </template>
      </div>

      <el-table
        :data="tableData"
        class="tableComUsing"
        v-loading="loading"
        border
        stripe
        style="width: 100%"
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
          :resizable="false"
        />
        <el-table-column
          label="帳號"
          prop="useR_ID"
          sortable
          width="160px"
          :resizable="false"
        />
        <el-table-column
          label="姓名"
          prop="useR_NAME"
          width="130px"
          sortable
          :resizable="false"
        />
        <el-table-column
          label="公司名稱"
          prop="depT_NAME"
          sortable
          :resizable="false"
        />
        <el-table-column
          label="權限狀態"
          prop="rigH_STAT_DESC"
          sortable
          width="130px"
          :resizable="false"
        />
        <el-table-column
          label="權限種類"
          prop="rigH_ITEM_DESC"
          sortable
          width="130px"
          :resizable="false"
        />
        <el-table-column label="註銷" width="89" :resizable="false">
          <template #default="scope">
            <el-switch
              v-model="scope.row.rigH_STAT"
              @change="changeStatus($event, scope.row, scope.$index)"
              @click="SubmitRevokE_FLAG(scope.row)"
            />
          </template>
        </el-table-column>
        <el-table-column label="標號維護" width="89" :resizable="false">
          <template #default="scope">
            <el-button
              link
              @click="openQueryProjData(scope.row)"
              class="button_edit"
            >
              <img
                src="../../assets/icon04.png"
                style="width: 24px; vertical-align: bottom"
                alt=""
              />
            </el-button>
            <el-dialog
              v-model="scope.row.openQueryProjData"
              :append-to-body="true"
              center
              align-center
              :close-on-click-modal="false"
              @update:destroy-on-close="scope.row.destroyOnClose"
              title="標號維護"
            >
              <el-form :model="QueryProjData">
                <el-form-item label="標號" :label-width="formLabelWidth">
                  <el-select
                    v-model="QueryProjData"
                    multiple
                    filterable
                    default-first-option
                    :reserve-keyword="false"
                  >
                    <!-- @change="$forceUpdate()" -->
                    <el-option
                      v-for="(item, index) in optionsProjIdStr"
                      :key="index"
                      :label="item.proJ_ID"
                      :value="item.proJ_ID"
                    />
                  </el-select>
                </el-form-item>
              </el-form>
              <template #footer>
                <span class="dialog-footer">
                  <el-button @click="cancelQueryProjData(scope.row)"
                    >取消</el-button
                  >
                  <el-button
                    type="primary"
                    @click="submitProjData(scope.row, QueryProjData)"
                  >
                    儲存
                  </el-button>
                </span>
              </template>
            </el-dialog>
          </template>
        </el-table-column>
      </el-table>
    </el-main>
  </el-container>
</template>
<script lang="ts" setup>
  import { reactive, ref, computed, onMounted, nextTick } from "vue"
  import type { FormInstance, FormRules } from "element-plus"
  import { Search } from "@element-plus/icons-vue"
  // import { ElMessage, ElMessageBox } from 'element-plus'
  import axios from "axios"
  import zhTw from "element-plus/dist/locale/zh-tw"
  import en from "element-plus/es/locale/lang/en"

  sessionStorage.setItem("UserId", "11695") //儲存session
  // const url = "https://127.0.0.1:7227/api/UserRigh/" // 連到API
  const url = "https://127.0.0.1:7227/api/test/"
  const UserId = sessionStorage.getItem("UserId") // 儲存UserId
  const language = ref("zh-tw")
  const locale = computed(() => (language.value === "zh-tw" ? zhTw : en))
  const loading = ref(true)
  const search = ref("")
  // navbar
  const activeIndex = ref("1")
  const handleSelect = (key: string, keyPath: string[]) => {
    console.log(key, keyPath)
  }
  // dialogAddItem
  const dialogFormVisible = ref(false)
  const formLabelWidth = "100px"
  // ruleForm
  const ruleFormRef = ref<FormInstance>()

  const cancel = () => {
    dialogFormVisible.value = false
  }
  const cancelQueryProjData = (row) => {
    row.openQueryProjData = false
  }
  // 新增廠商
  const ruleForm = reactive({
    EmplSeri: "",
    UserName: "",
    DeptName: "",
    RighItem: "",
    CustUnifNo: "",
    ProjIdStr: "",
  })
  const rules = reactive<FormRules>({
    EmplSeri: [
      { required: true, message: "請輸入帳號", trigger: "blur" },
      { min: 3, max: 20, message: "長度3到20字", trigger: "blur" },
    ],
    UserName: [
      {
        required: true,
        message: "請輸入姓名",
        trigger: "blur",
      },
    ],
    DeptName: [
      {
        required: true,
        message: "請輸入公司名稱",
        trigger: "blur",
      },
    ],
    RighItem: [
      {
        required: true,
        message: "請選擇權限種類",
        trigger: "blur",
      },
    ],
    CustUnifNo: [
      {
        required: true,
        message: "請輸入統一編號",
        trigger: "blur",
      },
    ],
    ProjIdStr: [
      {
        required: true,
        message: "請選擇標號",
        trigger: "blur",
      },
    ],
  })

  // 權限種類
  const optionsRighItem = [
    {
      value: "0",
      label: "查詢文件權限",
    },
    {
      value: "1",
      label: "查詢圖說權限",
    },
    {
      value: "2",
      label: "申請單權限",
    },
    {
      value: "3",
      label: "審查權限",
    },
    {
      value: "4",
      label: "委託監造",
    },
    {
      value: "5",
      label: "本局同仁",
    },
  ]

  interface ValueUpdate {
    $forceUpdate(): void //重新渲染
  }
  interface tableDataFace {
    depT_NAME: string
    message: string
    rigH_ITEM_DESC: string
    rigH_STAT: boolean
    rigH_STAT_DESC: string
    statusCode: string
    useR_ID: string
    useR_NAME: string
  }
  const QueryProjData = ref<ValueUpdate[]>([])
  const openQueryProjData = ref()
  const optionsProjIdStr = ref()
  const tableData = ref<tableDataFace[]>([])
  const storageRigH_STAT = reactive([])
  const storageData = reactive([])
  onMounted(() => {
    // 讀table資料
    const urlLoadNetUserRigh = url + "LoadNetUserRigh"
    loading.value = true
    axios
      .get(urlLoadNetUserRigh)
      .then((res) => {
        console.log(res.data)
        loading.value = false
        for (let i = 0; i < res.data.length; i++) {
          const trueOrFalse = ref()
          const booleanRigH_STAT = res.data[i].rigH_STAT
          const depT_NAME = res.data[i].depT_NAME
          const message = res.data[i].message
          const rigH_ITEM_DESC = res.data[i].rigH_ITEM_DESC
          const rigH_STAT_DESC = res.data[i].rigH_STAT_DESC
          const statusCode = res.data[i].statusCode
          const useR_ID = res.data[i].useR_ID
          const useR_NAME = res.data[i].useR_NAME
          // console.log(useR_NAME)
          if (booleanRigH_STAT === "Y") {
            trueOrFalse.value = true
          } else {
            trueOrFalse.value = false
          }
          storageData[i] = {
            depT_NAME: depT_NAME,
            message: message,
            rigH_ITEM_DESC: rigH_ITEM_DESC,
            rigH_STAT_DESC: rigH_STAT_DESC,
            statusCode: statusCode,
            useR_ID: useR_ID,
            useR_NAME: useR_NAME,
            rigH_STAT: trueOrFalse.value,
          }
        }
        tableData.value = storageData
      })
      .catch(function (error) {
        // handle error
        console.log(error)
      })
    console.log(storageData)

    // //讀取標號維護已有標號
    openQueryProjData.value = (row) => {
      row.openQueryProjData = true
      const urlQueryProjData = url + "QueryProjData?UserId=" + row["useR_ID"]
      // console.log(urlQueryProjData)
      axios
        .get(urlQueryProjData)
        .then((res) => {
          console.log(res.data)
          for (let i = 0; i < res.data.length; i++) {
            QueryProjData.value[i] = res.data[i].proJ_ID
          }
          // console.log(QueryProjData)
        })
        .catch(function (error) {
          console.log(error)
        })
    }

    // 讀標號資料
    const urlLoadProj = url + "LoadProj"
    axios
      .get(urlLoadProj)
      .then((res) => {
        optionsProjIdStr.value = res.data
        // console.log(res.data)
      })
      .catch(function (error) {
        // handle error
        console.log(error)
      })
  })

  // 送出新增帳號表單
  const submitForm = async (formEl: FormInstance | undefined) => {
    if (!formEl) return
    await formEl.validate((valid, fields) => {
      if (valid) {
        console.log(ruleForm)
        dialogFormVisible.value = false
        const urlSavingNew =
          url +
          "SavingNew?EmplSeri=" +
          ruleForm.EmplSeri +
          "&UserId=" +
          UserId +
          "&UserName=" +
          ruleForm.UserName +
          "&DeptName=" +
          ruleForm.DeptName +
          "&RighItem=" +
          ruleForm.RighItem +
          "&CustUnifNo=" +
          ruleForm.CustUnifNo +
          "&ProjIdStr=" +
          ruleForm.ProjIdStr
        axios
          .get(urlSavingNew)
          .then((res) => {
            tableData.value = res.data
          })
          .catch(function (error) {
            // handle error
            console.log(error)
          })
      } else {
        console.log("error submit!", fields)
        dialogFormVisible.value = true
      }
    })
  }

  // 註銷開關
  const RighStat = ref()
  const changeStatus = (e, row, index) => {
    // console.log(e, row, index) // e返回狀態，row當前行數據，index下標
    // console.log(rigH_STAT[4].rigH_STAT)
    if (e == true) {
      RighStat.value = "Y"
    } else {
      RighStat.value = "N"
    }
    // console.log(row["rigH_STAT"])
  }
  const SubmitRevokE_FLAG = (row) => {
    // const urlRevokeNetUserRigh =
    //   url +
    //   "RevokeNetUserRigh?UserId=" +
    //   row["useR_ID"] +
    //   "&UserName=" +
    //   row["useR_NAME"] +
    //   "&RighStat=" +
    //   RighStat.value
    // console.log(urlRevokeNetUserRigh)
    // axios
    //   .get(urlRevokeNetUserRigh)
    //   .then((res) => {
    //     console.log(res.data)
    //   })
    //   .catch(function (error) {
    //     console.log(error)
    //   })
  }

  // 送出標號維護
  const submitProjData = (row, val) => {
    row.openQueryProjData = false
    const urlSaveProj =
      url +
      "SaveProj?EmplSeri=" +
      UserId +
      "&UserId=" +
      row["useR_ID"] +
      "&ProjIdStr=" +
      val.join(";")
    console.log(urlSaveProj)
    axios
      .get(urlSaveProj)
      .then((res) => {
        // const statusCode = res.data[0].statusCode //儲存狀態代碼
        // const message = res.data[0].message //儲存狀態訊息
        console.log(res)
        // if (statusCode == "1002") {
        //   alert(message)
        //   // window.location.reload() //重整頁面
        // } else {
        //   alert(message)
        // }
        // console.log(statusCode + "Save") //狀態代碼為新增
      })
      .catch(function (error) {
        console.log(error)
      })
  }
</script>
