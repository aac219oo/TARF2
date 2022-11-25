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

      <el-form :model="form" label-position="top">
        <div class="searchForm">
          <div class="searchSelectTop">
            <div class="searchDate">
              <div class="labelRadio">
                <span class="label">送審日期*</span>
                <el-radio-group v-model="form.DateRange" @change="dayjsChange">
                  <el-radio :label="0">三日</el-radio>
                  <el-radio :label="1">一周</el-radio>
                  <el-radio :label="2">一個月</el-radio>
                  <el-radio :label="3">一年</el-radio>
                </el-radio-group>
              </div>
              <el-form-item class="label-left">
                <el-date-picker
                  v-model="form.DateFrom"
                  type="date"
                  placeholder="請選擇日期"
                  :size="size"
                  for="apply_date1"
                />
                <span class="decoration">~</span>
                <el-date-picker
                  v-model="form.DateTo"
                  type="date"
                  placeholder="請選擇日期"
                  :size="size"
                  for="apply_date2"
                />
              </el-form-item>
            </div>
            <el-form-item label="送審項目">
              <el-select
                v-model="form.AplyItemCode"
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
                v-model="form.ProjId"
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
                v-model="form.CaseDeptNo"
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
                v-model="form.HandleTypeDesc"
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
                v-model="form.CaseEmplSeri"
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
                v-model="form.KeyWord"
                placeholder="(主旨，多組關鍵字請用空白分隔)"
                :size="size"
              />
            </el-form-item>
            <el-form-item class="button-items">
              <div class="button-items-search">
                <el-button @click="onSubmit(form)">
                  <img
                    src="../../assets/icon01.png"
                    style="width: 26px; vertical-align: bottom"
                    alt=""
                  />
                </el-button>
              </div>
              <div class="button-items-export">
                <el-button>
                  <img
                    src="../../assets/icon02.png"
                    style="width: 26px; vertical-align: bottom"
                    alt=""
                  />
                </el-button>
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
              <!-- v-for="(item, index) in ediT_LINK" :key="item"  -->
              <template #default="scope">
                <a
                  :href="
                    'http://localhost:5173/document_search/detail_info/index.html?v1=' +
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
                    alt=""
                /></a>
                <!--  @click="prN_LINK" -->
                <el-button
                  ><img
                    src="../../assets/icon03.png"
                    style="width: 25px; vertical-align: bottom"
                    alt=""
                  /> </el-button
              ></template>
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
  const url = "https://127.0.0.1:7227/api/CaseBascQueryDept/"
  // const url = "https://localhost:7227/api/test/"
  const size = ref("default")
  const tables = reactive({
    newsdata: "",
  })
  const loading = ref(true)
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
  const form = reactive({
    DateFrom: "",
    DateTo: "",
    DateRange: "",
    AplyItemCode: "",
    ProjId: "",
    CaseEmplSeri: "",
    CaseDeptNo: "",
    HandleTypeDesc: "",
    KeyWord: "",
  })

  const ediT_LINK = reactive([])
  const optionAplyItemCode = ref()
  const optionProjId = ref()
  const optionCaseEmplSeri = ref()
  const optionCaseDeptNo = ref()
  const optionHandleTypeDesc = ref()

  onMounted(() => {
    const urlLoadQueryData = url + "LoadQueryData?UserId=" + UserId
    loading.value = true
    axios
      .get(urlLoadQueryData)
      .then((res) => {
        console.log(res.data)
        tables.newsdata = res.data
        loading.value = false
        files_count.value = res.data.length
      })
      .catch(function (error) {
        console.log(error)
      })

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
        console.log(error)
      })
  })

  const dayjsChange = ref()

  const onSubmit = (Val) => {
    const DateFrom = dayjs(new Date(form.DateFrom)).format("YYYY-MM-DD")
    const DateTo = dayjs(new Date(form.DateTo)).format("YYYY-MM-DD")
    const urlGetReviewCases = url + "GetReviewCases"
    loading.value = true
    //console.log(urlGetReviewCases, ReviewCaseQuery)
    //const QueryRole = "Test"
    //const DeptNo = "Test"
    axios
      .get(urlGetReviewCases, {
        params: {
          UserId: UserId,
          QueryRole: QueryRole,
          DeptNo: DeptNo,
          DateFrom: DateFrom,
          DateTo: DateTo,
          AplyItemCode: form.AplyItemCode,
          ProjId: form.ProjId,
          CaseEmplSeri: form.CaseEmplSeri,
          CaseDeptNo: form.CaseDeptNo,
          HandleTypeDesc: form.HandleTypeDesc,
          KeyWord: form.KeyWord,
        },
      })
      .then((res) => {
        console.log(res.data)
        tables.newsdata = res.data
        files_count.value = res.data.length
        loading.value = false
      })
      .catch(function (error) {
        // console.log(
        //   UserId,
        //   QueryRole,
        //   DeptNo,
        //   DateFrom,
        //   DateTo,
        //   form.AplyItemCode,
        //   form.ProjId,
        //   form.CaseEmplSeri,
        //   form.CaseDeptNo,
        //   form.HandleTypeDesc,
        //   form.KeyWord
        // )
        console.log(error)
      })
  }
</script>
