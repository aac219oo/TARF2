<template>
  <el-config-provider :locale="locale"> </el-config-provider>
  <el-container>
    <el-header>
      <a href="../../index.html">
        <h1>TARF2技術文件線上簽核系統</h1>
      </a>
      <a href="./index.html">
        <h3>審查案件查詢</h3>
      </a>
      <p>蘇家淇(11548)</p>
    </el-header>
    <el-main>
      <!-- searhForm -->

      <el-form
        ref="ruleFormRef"
        :rules="rules"
        :model="ruleForm"
        label-position="top"
      >
        <div class="searchForm">
          <div class="searchSelectTop">
            <div class="searchDate">
              <div class="labelRadio">
                <span class="label">送審日期*</span>
                <el-radio-group
                  v-model="ruleForm.DateRange"
                  @change="dayjsChange"
                >
                  <el-radio :label="0">三日</el-radio>
                  <el-radio :label="1">一周</el-radio>
                  <el-radio :label="2">一個月</el-radio>
                  <el-radio :label="3">一年</el-radio>
                </el-radio-group>
              </div>
              <div class="DateGroup">
                <el-form-item class="label-left" prop="DateFrom">
                  <el-date-picker
                    v-model="ruleForm.DateFrom"
                    type="date"
                    placeholder="請選擇日期"
                    :size="size"
                    for="apply_date1"
                  />
                </el-form-item>
                <span class="decoration">~</span>
                <el-form-item prop="DateTo">
                  <el-date-picker
                    v-model="ruleForm.DateTo"
                    type="date"
                    placeholder="請選擇日期"
                    :size="size"
                    for="apply_date2"
                  />
                </el-form-item>
              </div>
            </div>
            <el-form-item label="送審項目">
              <el-select
                v-model="ruleForm.AplyItemCode"
                placeholder="請選擇送審項目"
                clearable
                filterable
                :size="size"
              >
                <el-option
                  v-for="(item, index) in optionAplyItemCode"
                  :key="index"
                  :label="item"
                  :value="item"
                />
              </el-select>
            </el-form-item>
            <el-form-item label="標號">
              <el-select
                v-model="ruleForm.ProjId"
                placeholder="請選擇標號"
                clearable
                filterable
                :size="size"
              >
                <el-option
                  v-for="(item, index) in optionProjId"
                  :key="index"
                  :label="item"
                  :value="item"
                />
              </el-select>
            </el-form-item>
            <el-form-item label=" ">
              <div class="fillEmpty"></div>
            </el-form-item>
          </div>
          <div class="searchSelectBottom">
            <el-form-item label="審查單位">
              <el-select
                v-model="ruleForm.CaseDeptNo"
                placeholder="請選擇審查單位"
                clearable
                filterable
                :size="size"
              >
                <el-option
                  v-for="(item, index) in optionCaseDeptNo"
                  :key="index"
                  :label="item"
                  :value="item"
                />
              </el-select>
            </el-form-item>
            <el-form-item label="辦理情形">
              <el-select
                v-model="ruleForm.HandleTypeDesc"
                placeholder="請選擇辦理情形"
                clearable
                filterable
                :size="size"
              >
                <el-option
                  v-for="(item, index) in optionHandleTypeDesc"
                  :key="index"
                  :label="item"
                  :value="item"
                />
              </el-select>
            </el-form-item>
            <el-form-item label="承辦人">
              <el-select
                v-model="ruleForm.CaseEmplSeri"
                placeholder="請選擇承辦人"
                clearable
                filterable
                :size="size"
              >
                <el-option
                  v-for="(item, index) in optionCaseEmplSeri"
                  :key="index"
                  :label="item"
                  :value="item"
                />
              </el-select>
            </el-form-item>
            <el-form-item label="關鍵字" class="searchTitle">
              <el-input
                v-model="ruleForm.KeyWord"
                placeholder="(主旨，多組關鍵字請用空白分隔)"
                :size="size"
              />
            </el-form-item>
            <el-form-item class="button-items">
              <div class="button-items-search">
                <el-button @click="onSubmit(ruleFormRef)">
                  <img
                    src="../../assets/icon01.png"
                    style="width: 26px; vertical-align: bottom"
                    alt="搜尋"
                    title="搜尋"
                  />
                </el-button>
              </div>
              <!-- https://localhost:7227/api/CaseBascQueryDept/GetCaseFile?FileName=
              /tarf6net/api/CaseBascQueryDept/GetCaseFile?FileName= -->
              <div class="button-items-export">
                <a
                  :href="
                    '/tarf6net/api/CaseBascQueryDept/GetCaseFile?FileName=' +
                    filE_PATH
                  "
                  target="_blank"
                >
                  <img
                    src="../../assets/icon02.png"
                    style="width: 26px; vertical-align: bottom"
                    alt="匯出Excel"
                    title="匯出Excel"
                  />
                </a>
              </div>
            </el-form-item>
          </div>
        </div>
      </el-form>

      <!-- searchTable -->
      <div class="title_main">
        <h4>審查案件查詢清單</h4>
      </div>
      <el-row class="tableForm">
        <el-col>
          <!-- .slice((currentPage - 1) * pageSize, currentPage * pageSize) -->
          <el-table
            border
            :data="
              tables.newsdata.slice(
                (currentPage - 1) * pageSize,
                currentPage * pageSize
              )
            "
            v-loading="loading"
            :stripe="true"
            :header-cell-style="{
              background: '#ebf4f9',
              color: '#000',
              textAlign: 'center',
            }"
          >
            <!-- :index="indexMethoud" -->
            <el-table-column
              type="index"
              :index="indexMethoud"
              label="序號"
              width="57"
              :resizable="false"
            />
            <el-table-column
              label="案號"
              prop="casE_ID_VER"
              sortable
              :min-width="25"
              :resizable="false"
            >
            </el-table-column>
            <el-table-column
              label="標號"
              prop="proJ_ID"
              sortable
              align="center"
              :min-width="20"
              :resizable="false"
            >
            </el-table-column>
            <el-table-column
              label="主旨"
              prop="casE_SUBJECT"
              sortable
              :resizable="false"
            ></el-table-column>
            <el-table-column
              label="申請日期"
              prop="aplY_DATE_DESC"
              sortable
              align="center"
              :min-width="21"
              :resizable="false"
            >
            </el-table-column>
            <el-table-column
              label="案件承辦人"
              prop="casE_EMPL"
              sortable
              :min-width="25"
              :resizable="false"
            >
            </el-table-column>
            <el-table-column
              label="狀態"
              prop="casE_STATUS_DESC"
              sortable
              :min-width="20"
              :resizable="false"
            >
            </el-table-column>
            <el-table-column
              label="狀態日期"
              prop="statuS_DATE_DESC"
              sortable
              align="center"
              :min-width="21"
              :resizable="false"
            ></el-table-column>
            <el-table-column :min-width="15" :resizable="false">
              <template #default="scope">
                <a
                  :href="
                    '/tarf6net/document_search/detail_info/index.html?v1=' +
                    scope.row.v1 +
                    '&v2=' +
                    scope.row.v2 +
                    '&v3=' +
                    scope.row.v3 +
                    '&t=' +
                    scope.row.t
                  "
                  ><img
                    src="../../assets/icon02.png"
                    style="width: 25px; vertical-align: bottom"
                    alt="詳細資料"
                    title="詳細資料"
                /></a>
                <!--  @click="prN_LINK" -->
                <!-- <a
                  :href="'https://localhost:7227/'"
                  ><img
                    src="../../assets/icon03.png"
                    style="width: 25px; vertical-align: bottom"
                    alt="列印詳細資料"
                    title="列印詳細資料"
                  /> </a
              > -->
              </template>
            </el-table-column>
          </el-table>
        </el-col>
        <el-col>
          <el-pagination
            @update:size-change="handleSizeChange"
            @update:current-change="handleCurrentChange"
            v-model:current-page="currentPage"
            :disabled="disabled"
            :page-sizes="pageSizes"
            v-model:page-size="pageSize"
            layout="total, sizes, prev, pager, next, jumper"
            :total="files_count"
          />
        </el-col>
      </el-row>
    </el-main>
  </el-container>
</template>

<script lang="ts" setup>
  import { computed, reactive, ref, onMounted } from "vue"
  // import { ElementPlus, Printer, Search, Edit } from "@element-plus/icons-vue"
  import zhTw from "element-plus/dist/locale/zh-tw"
  import en from "element-plus/es/locale/lang/en"
  import type { FormInstance, FormRules } from "element-plus"
  import axios from "axios"
  import dayjs from "dayjs"

  sessionStorage.setItem("UserId", "11695") //儲存session
  sessionStorage.setItem("QueryRole", "") //儲存session
  sessionStorage.setItem("DeptNo", "") //儲存session
  const UserId = sessionStorage.getItem("UserId") // 儲存UserId
  const QueryRole = sessionStorage.getItem("QueryRole") // 儲存QueryRole
  const DeptNo = sessionStorage.getItem("DeptNo") // 儲存DeptNo
  const language = ref("zh-tw")
  const locale = computed(() => (language.value === "zh-tw" ? zhTw : en))
  const url = "/tarf6net/api/CaseBascQueryDept/"
  // const url = "https://localhost:7227/api/CaseBascQueryDept/"
  // const url = "https://localhost:7227/api/test/"
  const size = ref("default")
  const tables = reactive({
    newsdata: "",
  })
  const loading = ref(false)
  const pageSize = ref(5)
  const pageSizes = [5, 10, 15, 20]
  const currentPage = ref(1)
  const files_count = ref()
  const disabled = ref(false)
  const handleSizeChange = (val: number) => {
    console.log(`${val} items per page`)
    // return pageSize.value
  }
  const handleCurrentChange = (val: number) => {
    console.log(`current page: ${val}`)
    // return currentPage.value
  }
  // console.log(pageSize.value)
  // const handleSizeChange = ref()
  // const handleCurrentChange = ref()
  const indexMethoud = (index: number) => {
    return (currentPage.value - 1) * pageSize.value + index + 1
  }
  // do not use same name with ref
  const ruleFormRef = ref<FormInstance>()
  const ruleForm = reactive({
    DateFrom: "",
    DateTo: "",
    DateRange: [],
    AplyItemCode: "",
    ProjId: "",
    CaseEmplSeri: "",
    CaseDeptNo: "",
    HandleTypeDesc: "",
    KeyWord: "",
  })
  const rules = reactive<FormRules>({
    DateFrom: [
      {
        type: "date",
        required: true,
        message: "",
        trigger: "change",
      },
    ],
    DateTo: [
      {
        type: "date",
        required: true,
        message: "",
        trigger: "change",
      },
    ],
  })
  const optionAplyItemCode = ref()
  const optionProjId = ref()
  const optionCaseEmplSeri = ref()
  const optionCaseDeptNo = ref()
  const optionHandleTypeDesc = ref()
  const filE_PATH = ref()

  onMounted(() => {
    // const urlLoadQueryData = url + "LoadQueryData?UserId=" + UserId
    // loading.value = true
    // axios
    //   .get(urlLoadQueryData)
    //   .then((res) => {
    //     console.log(res.data)
    //     tables.newsdata = res.data
    //     loading.value = false
    //     files_count.value = res.data.length
    //     filE_PATH.value = res.data[0].filE_PATH
    //     console.log(filE_PATH)
    //   })
    //   .catch(function (error) {
    //     console.log(error)
    //     loading.value = false
    //   })
    const urlLoadDropDownList =
      url +
      "LoadDropDownList?UserId=" +
      UserId +
      "?QueryRole=" +
      QueryRole +
      "?DeptNo=" +
      DeptNo
    // console.log(urlLoadDropDownList)
    axios
      .get(urlLoadDropDownList)
      .then((res) => {
        // console.log(res.data[0].aplY_ITEM_CODE)
        optionAplyItemCode.value = res.data[0].aplY_ITEM_CODE
        optionProjId.value = res.data[0].proJ_ID
        optionCaseEmplSeri.value = res.data[0].casE_EMPL_SERI
        optionCaseDeptNo.value = res.data[0].casE_DEPT_NO
        optionHandleTypeDesc.value = res.data[0].statuS_DESC
      })
      .catch(function (error) {
        alert("選單資料無法讀取，請洽系統人員")
        console.log(error)
      })
  })

  const DateFromDay = ref()
  const DateFromWeek = ref()
  const DateFromMonth = ref()
  const DateFromYear = ref()
  const DateTo = ref(dayjs(new Date()).format("YYYY-MM-DD"))

  const dayjsChange = ref((val) => {
    if (val === 0) {
      DateFromDay.value = dayjs().subtract(2, "day").format("YYYY-MM-DD")
      ruleForm.DateFrom = DateFromDay.value
      ruleForm.DateTo = DateTo.value
    }
    if (val === 1) {
      DateFromWeek.value = dayjs().subtract(6, "day").format("YYYY-MM-DD")
      ruleForm.DateFrom = DateFromWeek.value
      ruleForm.DateTo = DateTo.value
    }
    if (val === 2) {
      DateFromMonth.value = dayjs().subtract(1, "month").format("YYYY-MM-DD")
      ruleForm.DateFrom = DateFromMonth.value
      ruleForm.DateTo = DateTo.value
    }
    if (val === 3) {
      DateFromYear.value = dayjs().subtract(1, "year").format("YYYY-MM-DD")
      ruleForm.DateFrom = DateFromYear.value
      ruleForm.DateTo = DateTo.value
    }
  })

  const onSubmit = async (formEl: FormInstance | undefined) => {
    const DateFrom = dayjs(new Date(ruleForm.DateFrom)).format("YYYY-MM-DD")
    const DateTo = dayjs(new Date(ruleForm.DateTo)).format("YYYY-MM-DD")
    console.log(DateFrom + ";" + DateTo)
    if (!formEl) return
    await formEl.validate((valid, fields) => {
      if (valid) {
        const urlGetReviewCases = url + "GetReviewCases"
        loading.value = true
        axios
          .get(urlGetReviewCases, {
            params: {
              UserId: UserId,
              QueryRole: QueryRole,
              DeptNo: DeptNo,
              DateFrom: DateFrom,
              DateTo: DateTo,
              AplyItemCode: ruleForm.AplyItemCode,
              ProjId: ruleForm.ProjId,
              CaseEmplSeri: ruleForm.CaseEmplSeri,
              CaseDeptNo: ruleForm.CaseDeptNo,
              HandleTypeDesc: ruleForm.HandleTypeDesc,
              KeyWord: ruleForm.KeyWord,
            },
          })
          .then((res) => {
            console.log(res.data)
            const statusCode = res.data[0].statusCode //儲存狀態代碼
            const message = res.data[0].message //儲存狀態訊息
            files_count.value = res.data.length
            filE_PATH.value = res.data[0].filE_PATH
            console.log(filE_PATH)
            if (statusCode == "1002") {
              alert(message)
              loading.value = false
              tables.newsdata = ""
            } else {
              // alert(message)
              tables.newsdata = res.data
              loading.value = false
            }
          })
          .catch(function (error) {
            console.log(error)
            alert("資料無法搜尋，請洽系統人員")
            loading.value = false
          })
        console.log("submit!")
      } else {
        // console.log("error submit!", fields)
      }
    })
  }
</script>
