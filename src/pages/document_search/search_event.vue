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
                <el-radio-group v-model="form.DateRange">
                  <el-radio label="三日" value="0" />
                  <el-radio label="一周" value="1" />
                  <el-radio label="一個月" value="2" />
                  <el-radio label="一年" value="3" />
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
                :size="size"
              >
                <el-option label="project1" value="project1" />
                <el-option label="project2" value="project2" />
                <el-option label="project3" value="project3" />
                <el-option label="project4" value="project4" />
              </el-select>
            </el-form-item>
            <el-form-item label="標號">
              <el-select
                v-model="form.ProjId"
                placeholder="請選擇標號"
                :size="size"
              >
                <el-option label="CF620" value="CF620" />
                <el-option label="CF621" value="CF621" />
                <el-option label="CF622" value="CF622" />
                <el-option label="CF623" value="CF623" />
              </el-select>
            </el-form-item>
            <el-form-item label=" ">
              <div class="fillEmpty"></div>
              <!-- <el-select
                v-model="form.agency"
                placeholder="請選擇承辦人"
                :size="size"
              >
                <el-option
                  label="技術發展處 蘇嘉淇"
                  value="技術發展處 蘇嘉淇"
                />
                <el-option
                  label="技術發展處 蘇嘉淇"
                  value="技術發展處 蘇嘉淇"
                />
                <el-option
                  label="技術發展處 蘇嘉淇"
                  value="技術發展處 蘇嘉淇"
                />
                <el-option
                  label="技術發展處 蘇嘉淇"
                  value="技術發展處 蘇嘉淇"
                />
              </el-select> -->
            </el-form-item>
          </div>
          <div class="searchSelectBottom">
            <el-form-item label="審查單位">
              <el-select
                v-model="form.CaseDeptNo"
                placeholder="請選擇審查單位"
                :size="size"
              >
                <el-option
                  label="技術發展處 蘇嘉淇"
                  value="技術發展處 蘇嘉淇"
                />
                <el-option
                  label="技術發展處 蘇嘉淇"
                  value="技術發展處 蘇嘉淇"
                />
                <el-option
                  label="技術發展處 蘇嘉淇"
                  value="技術發展處 蘇嘉淇"
                />
                <el-option
                  label="技術發展處 蘇嘉淇"
                  value="技術發展處 蘇嘉淇"
                />
              </el-select>
            </el-form-item>
            <el-form-item label="辦理情形">
              <el-select
                v-model="form.HandleTypeDesc"
                placeholder="請選擇辦理情形"
                :size="size"
              >
                <el-option label="如期結案(會審/受文案件)" value="如期結案" />
                <el-option label="會審中" value="會審中" />
                <el-option label="簽收結案" value="簽收結案" />
                <el-option label="退件" value="退件" />
              </el-select>
            </el-form-item>
            <el-form-item label="承辦人">
              <el-select
                v-model="form.CaseEmplSeri"
                placeholder="請選擇承辦人"
                :size="size"
              >
                <el-option
                  label="技術發展處 蘇嘉淇"
                  value="技術發展處 蘇嘉淇"
                />
                <el-option
                  label="技術發展處 蘇嘉淇"
                  value="技術發展處 蘇嘉淇"
                />
                <el-option
                  label="技術發展處 蘇嘉淇"
                  value="技術發展處 蘇嘉淇"
                />
                <el-option
                  label="技術發展處 蘇嘉淇"
                  value="技術發展處 蘇嘉淇"
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
            :data="tables"
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
              <a href="ediT_LINK"
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
                />
              </el-button>
            </el-table-column>
          </el-table>
        </el-col>
        <el-col>
          <el-pagination
            @size-change="handleSizeChange"
            @current-change="handleCurrentChange"
            v-model:current-page="currentPage"
            :disabled="disabled"
            :page-sizes="[5, 10, 15, 20]"
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

  sessionStorage.setItem("UserId", "11695") //儲存session
  sessionStorage.setItem("QueryRole", "11695") //儲存session
  sessionStorage.setItem("DeptNo", "11695") //儲存session
  const UserId = sessionStorage.getItem("UserId") // 儲存UserId
  const QueryRole = sessionStorage.getItem("QueryRole") // 儲存QueryRole
  const DeptNo = sessionStorage.getItem("DeptNo") // 儲存DeptNo
  const language = ref("zh-tw")
  const locale = computed(() => (language.value === "zh-tw" ? zhTw : en))
  const url = "https://127.0.0.1:7227/api/CaseBascQueryDept/"
  const size = ref("default")
  const tables = ref()
  const loading = ref(true)
  const pageSize = ref(5)
  const currentPage = ref(1)
  const files_count = ref()
  const disabled = ref(false)
  const handleSizeChange = (val: number) => {
    return pageSize.value
  }
  const handleCurrentChange = (val: number) => {
    return currentPage.value
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

  const optionAplyItemCode = ref()
  const optionProjId = ref()
  const optionCaseEmplSeri = ref()
  const optionCaseDeptNo = ref()
  const optionHandleTypeDesc = ref()

  onMounted(() => {
    // const urlLoadQueryData = url + "LoadQueryData?UserId=" + UserId
    const urlLoadQueryData =
      "https://localhost:7227/api/test/LoadQueryData?UserId=11695"
    loading.value = true
    axios
      .get(urlLoadQueryData)
      .then((res) => {
        // console.log(res.data)
        tables.value = res.data.slice(
          (currentPage.value - 1) * pageSize.value,
          currentPage.value * pageSize.value
        )
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
    axios
      .get(urlLoadDropDownList)
      .then((res) => {
        console.log(res.data.APLY_ITEM_CODE)
        optionAplyItemCode.value = res.data.APLY_ITEM_CODE
        optionProjId.value = res.data.PROJ_ID
        optionCaseEmplSeri.value = res.data.CASE_DEPT_NO
        optionCaseDeptNo.value = res.data.CASE_EMPL_SERI
        optionHandleTypeDesc.value = res.data.STATUS_DESC
      })
      .catch(function (error) {
        console.log(error)
      })
  })

  const onSubmit = (value) => {
    const urlGetReviewCases =
      url +
      "GetReviewCases?UserId=" +
      UserId +
      "?QueryRole=" +
      QueryRole +
      "?DeptNo=" +
      DeptNo +
      "&DateFrom=" +
      form.DateFrom +
      "&DateTo=" +
      form.DateTo +
      "&AplyItemCode=" +
      form.AplyItemCode +
      "&ProjId=" +
      form.ProjId +
      "&CaseEmplSeri=" +
      form.CaseEmplSeri +
      "&CaseDeptNo=" +
      form.CaseDeptNo +
      "&HandleTypeDesc=" +
      form.HandleTypeDesc +
      "&KeyWord=" +
      form.KeyWord
    loading.value = true
    axios
      .get(urlGetReviewCases)
      .then((res) => {
        console.log(res.data)
        loading.value = false
      })
      .catch(function (error) {
        console.log(error)
      })
  }
</script>
