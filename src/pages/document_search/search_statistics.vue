<template>
  <el-config-provider :locale="locale"> </el-config-provider>
  <el-container>
    <el-header>
      <a href="../../index.html">
        <h1>TARF2技術文件線上簽核系統</h1>
      </a>
      <h3>審查案件統計</h3>
      <p>蘇家淇(11548)</p>
    </el-header>

    <!-- main start -->

    <el-main>
      <el-row>
        <el-tabs
          :tab-position="tabPosition"
          style="height: auto; width: 100%"
          class="demo-tabs"
        >
          <!-- 各標送審文件統計 -->

          <el-tab-pane label="各標送審文件統計">
            <div class="search-top">
              <el-form
                :inline="true"
                :model="formDatePicker"
                class="demo-form-inline"
                label-position="top"
              >
                <div class="container_left">
                  <div class="input_position">
                    <el-form-item class="datepicker" label="統計月份">
                      <el-date-picker
                        v-model="BascDateValue"
                        type="daterange"
                        unlink-panels
                        range-separator="~"
                        start-placeholder="請選擇日期"
                        end-placeholder="請選擇日期"
                        :size="size"
                      />
                    </el-form-item>
                    <el-form-item class="button-items">
                      <div class="button-items-search">
                        <el-button @click="SubmitBascDateValue"
                          ><img
                            src="../../assets/icon01.png"
                            style="width: 26px; vertical-align: bottom"
                            alt=""
                        /></el-button>
                      </div>
                      <div class="button-items-export">
                        <el-button @click="getBascDate">
                          <img
                            src="../../assets/icon02.png"
                            style="width: 26px; vertical-align: bottom"
                            alt=""
                          />
                        </el-button>
                      </div>
                    </el-form-item>
                  </div>
                  <div class="msg_position">
                    <div class="title_msg">
                      <h4>訊息</h4>
                    </div>
                    <el-carousel
                      indicator-position="none"
                      height="50px"
                      direction="vertical"
                      :autoplay="false"
                    >
                      <el-carousel-item v-for="item in 4" :key="item">
                        <h3 text="2xl" justify="center">{{ item }}</h3>
                      </el-carousel-item>
                    </el-carousel>
                  </div>
                </div>
              </el-form>
            </div>
            <div class="title_main">
              <h4>各標送審文件統計</h4>
            </div>
            <el-table
              class="tableForm"
              :data="tableDataBasc"
              border
              stripe
              show-summary
              :summary-method="getSummaries"
              style="width: 100%"
              :header-cell-style="{
                background: '#ebf4f9',
                color: '#000',
                textAlign: 'center',
              }"
            >
              <el-table-column
                prop="PROJ_ID"
                label="&ensp;&ensp;線別&ensp;&ensp;&ensp;&ensp;&ensp;&ensp;&ensp;&ensp;&ensp;&ensp;&ensp;&ensp;&ensp;&ensp;&ensp;標別"
                width="150"
                :resizable="false"
              />
              <!-- <el-table-column prop="TuchengDingpu" label="土城頂埔段" :resizable="false"/>
    <el-table-column prop="airport" label="機場線" :resizable="false"/>
    <el-table-column prop="Wanda" label="萬大線" :resizable="false"/>
    <el-table-column prop="Songshan" label="松山線" :resizable="false"/>
    <el-table-column prop="TaichungGreen" label="台中綠線" :resizable="false"/>
    <el-table-column prop="Xinzhuang" label="新莊線" :resizable="false"/>
    <el-table-column prop="ring" label="環狀縣" :resizable="false"/>
    <el-table-column prop="Xinyi" label="信義線" :resizable="false"/> -->
              <el-table-column
                prop="CUNT_1"
                label="CUNT_1"
                :resizable="false"
              />
              <el-table-column
                prop="CUNT_A"
                label="CUNT_A"
                :resizable="false"
              />
              <el-table-column
                prop="CUNT_E"
                label="CUNT_E"
                :resizable="false"
              />
              <el-table-column
                prop="CUNT_G"
                label="CUNT_G"
                :resizable="false"
              />
              <el-table-column
                prop="CUNT_J"
                label="CUNT_J"
                :resizable="false"
              />
              <el-table-column
                prop="CUNT_K"
                label="CUNT_K"
                :resizable="false"
              />
              <el-table-column
                prop="CUNT_Q"
                label="CUNT_Q"
                :resizable="false"
              />
              <el-table-column
                prop="CUNT_R"
                label="CUNT_R"
                :resizable="false"
              />
            </el-table>
          </el-tab-pane>

          <!-- 單位審查案件數量統計 -->

          <el-tab-pane label="單位審查案件數量統計">
            <div class="search-top">
              <el-form
                :inline="true"
                :model="formInline"
                class="demo-form-inline"
                label-position="top"
              >
                <div class="container_left">
                  <div class="input_position">
                    <el-form-item class="datepicker" label="統計月份">
                      <el-date-picker
                        v-model="CaseTotleValue"
                        type="daterange"
                        unlink-panels
                        range-separator="~"
                        start-placeholder="請選擇日期"
                        end-placeholder="請選擇日期"
                        :size="size"
                      />
                    </el-form-item>
                    <el-form-item class="button-items">
                      <div class="button-items-search">
                        <el-button @click="SubmitCaseTotleValue"
                          ><img
                            src="../../assets/icon01.png"
                            style="width: 26px; vertical-align: bottom"
                            alt=""
                        /></el-button>
                      </div>
                      <div class="button-items-export">
                        <el-button @click="getCaseTotle">
                          <img
                            src="../../assets/icon02.png"
                            style="width: 26px; vertical-align: bottom"
                            alt=""
                          />
                        </el-button>
                      </div>
                    </el-form-item>
                  </div>
                  <div class="msg_position">
                    <div class="title_msg">
                      <h4>訊息</h4>
                    </div>
                    <el-carousel
                      indicator-position="none"
                      height="50px"
                      direction="vertical"
                      :autoplay="false"
                    >
                      <el-carousel-item v-for="item in 4" :key="item">
                        <h3 text="2xl" justify="center">{{ item }}</h3>
                      </el-carousel-item>
                    </el-carousel>
                  </div>
                </div>
              </el-form>
            </div>

            <div class="title_main">
              <h4>技術處第二課　歷年審查案件數量統計</h4>
            </div>
            <el-table
              class="tableForm"
              :data="tableDataCaseTotle"
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
                prop="YEARS"
                label="年份"
                width="100"
                :resizable="false"
              />
              <el-table-column prop="CUNT_01" label="1月" :resizable="false" />
              <el-table-column prop="CUNT_02" label="2月" :resizable="false" />
              <el-table-column prop="CUNT_03" label="3月" :resizable="false" />
              <el-table-column prop="CUNT_04" label="4月" :resizable="false" />
              <el-table-column prop="CUNT_05" label="5月" :resizable="false" />
              <el-table-column prop="CUNT_06" label="6月" :resizable="false" />
              <el-table-column prop="CUNT_07" label="7月" :resizable="false" />
              <el-table-column prop="CUNT_08" label="8月" :resizable="false" />
              <el-table-column prop="CUNT_09" label="9月" :resizable="false" />
              <el-table-column prop="CUNT_10" label="10月" :resizable="false" />
              <el-table-column prop="CUNT_11" label="11月" :resizable="false" />
              <el-table-column prop="CUNT_12" label="12月" :resizable="false" />
              <el-table-column
                prop="CUNT_ALL"
                label="合計"
                :resizable="false"
              />
            </el-table>
          </el-tab-pane>

          <!-- 審查案件辦理情形統計 -->

          <el-tab-pane label="審查案件辦理情形統計">
            <div class="search-top">
              <el-form
                :inline="true"
                :model="formInline"
                class="demo-form-inline"
                label-position="top"
              >
                <div class="container_left">
                  <div class="input_position">
                    <el-form-item class="datepicker" label="統計月份">
                      <el-date-picker
                        v-model="HandleCountValue"
                        type="daterange"
                        unlink-panels
                        range-separator="~"
                        start-placeholder="請選擇日期"
                        end-placeholder="請選擇日期"
                        :size="size"
                      />
                    </el-form-item>
                    <el-form-item class="button-items">
                      <div class="button-items-search">
                        <el-button @click="SubmitHandleCountValue"
                          ><img
                            src="../../assets/icon01.png"
                            style="width: 26px; vertical-align: bottom"
                            alt=""
                        /></el-button>
                      </div>
                      <div class="button-items-export">
                        <el-button @click="getHandleCount">
                          <img
                            src="../../assets/icon02.png"
                            style="width: 26px; vertical-align: bottom"
                            alt=""
                          />
                        </el-button>
                      </div>
                    </el-form-item>
                  </div>
                  <div class="msg_position">
                    <div class="title_msg">
                      <h4>訊息</h4>
                    </div>
                    <el-carousel
                      indicator-position="none"
                      height="50px"
                      direction="vertical"
                      :autoplay="false"
                    >
                      <el-carousel-item v-for="item in 4" :key="item">
                        <h3 text="2xl" justify="center">{{ item }}</h3>
                      </el-carousel-item>
                    </el-carousel>
                  </div>
                </div>
              </el-form>
            </div>
            <div class="title_main">
              <h4>審查案件辦理情形統計</h4>
            </div>
            <el-table
              class="tableForm tableSearchCondition"
              :data="tableDataHandleCount"
              row-key="id"
              border
              stripe
              show-summary
              :summary-method="getSummaries"
              :expand-row-keys="expands"
              @expand-change="expandColumn"
              style="width: 100%"
              :header-cell-style="{
                background: '#ebf4f9',
                color: '#000',
                textAlign: 'center',
              }"
            >
              <el-table-column
                prop="DEPT_NAME"
                label="單位"
                width="180"
                :resizable="false"
              />
              <el-table-column
                prop="TOTLE_COUNT"
                label="案件總數(1)"
                :resizable="false"
              />
              <el-table-column
                prop="SCHEDULED_COUNT"
                label="如期結案(2)"
                :resizable="false"
              />
              <el-table-column
                prop="LATE_CLOSE_COUNT"
                label="逾期結案(3)"
                :resizable="false"
              />
              <el-table-column
                prop="NOT_CLOSE_COUNT"
                label="未結案(4)"
                :resizable="false"
              />
              <el-table-column
                prop="NOT_CLOSE_SCHEDULED_COUNT"
                label="如期未結案(5)"
                :resizable="false"
              />
              <el-table-column
                prop="NOT_CLOSE_LATE_COUNT"
                label="逾期未結案(6)"
                :resizable="false"
              />
              <el-table-column
                prop="LATE_RATE"
                label="逾期比例(7)"
                :resizable="false"
              />
            </el-table>

            <p class="illustrate" style="margin-top: 10px">
              案件總數(1) = 如期結案(2) + 逾期結案(3) + 未結案(4)
            </p>
            <p class="illustrate">未結案(4) = 如期未結案(5) + 逾期未結案(6)</p>
            <p class="illustrate">
              逾期比例(7) = (逾期結案(3) + 逾期未結案(6)) / 案件總數(1)
            </p>
          </el-tab-pane>

          <!-- 主辦單位審查文件數量統計 -->

          <el-tab-pane label="主辦單位審查文件數量統計">
            <div class="search-top">
              <el-form
                :inline="true"
                :model="formInline"
                class="demo-form-inline"
                label-position="top"
              >
                <div class="container_left">
                  <div class="input_position">
                    <el-form-item class="datepicker" label="統計月份">
                      <el-date-picker
                        v-model="TotleCountsValue"
                        type="daterange"
                        unlink-panels
                        range-separator="~"
                        start-placeholder="請選擇日期"
                        end-placeholder="請選擇日期"
                        :size="size"
                      />
                    </el-form-item>
                    <el-form-item class="button-items">
                      <div class="button-items-search">
                        <el-button @click="SubmitTotleCountsValue"
                          ><img
                            src="../../assets/icon01.png"
                            style="width: 26px; vertical-align: bottom"
                            alt=""
                        /></el-button>
                      </div>
                      <div class="button-items-export">
                        <el-button @click="getCountDetail">
                          <img
                            src="../../assets/icon02.png"
                            style="width: 26px; vertical-align: bottom"
                            alt=""
                          />
                        </el-button>
                      </div>
                    </el-form-item>
                  </div>
                  <div class="msg_position active">
                    <div class="msg_title">
                      <h4>訊息</h4>
                    </div>
                    <div class="msg_content">
                      <h3>{{ item }}</h3>
                    </div>
                  </div>
                </div>
              </el-form>
            </div>
            <div class="title_main">
              <h4>主辦單位審查文件數量統計</h4>
            </div>
            <el-table
              class="tableForm"
              :data="tableDataTotleCounts"
              row-key="id"
              border
              stripe
              show-summary
              :summary-method="getSummaries"
              style="width: 100%"
              :header-cell-style="{
                background: '#ebf4f9',
                color: '#000',
                textAlign: 'center',
              }"
            >
              <el-table-column
                prop="DEPT_NAME"
                label="單位名稱"
                min-width="120"
                :resizable="false"
              />
              <el-table-column
                prop="TOTLE_COUNT"
                label="全部數量"
                :resizable="false"
              />
              <el-table-column
                prop="SCHEDULED_COUNT"
                label="111年6月數量"
                :resizable="false"
              />
              <el-table-column
                prop="LATE_CLOSE_COUNT"
                label="本月數量"
                :resizable="false"
              />
            </el-table>
          </el-tab-pane>
        </el-tabs>
      </el-row>
    </el-main>
  </el-container>
</template>
<script lang="ts" setup>
  import { computed, reactive, ref } from "vue"
  import type { TableColumnCtx } from "element-plus/es/components/table/src/table-column/defaults"
  import { ElementPlus, Search } from "@element-plus/icons-vue"
  import zhTw from "element-plus/dist/locale/zh-tw"
  import en from "element-plus/es/locale/lang/en"
  import axios from "axios"
  import dayjs from "dayjs"
  import type { FormInstance, FormRules } from "element-plus"

  sessionStorage.setItem("UserId", "11695")
  const UserId = sessionStorage.getItem("UserId")
  const language = ref("zh-tw")
  const locale = computed(() => (language.value === "zh-tw" ? zhTw : en))
  const url = "https://localhost:7227/api/StatisticsProjidCount/"
  // 統計圖表
  interface Product {
    id: string
    name: string
    amount1: string
    amount2: string
    amount3: number
  }

  interface SummaryMethodProps<T = Product> {
    columns: TableColumnCtx<T>[]
    data: T[]
  }

  const getSummaries = (param: SummaryMethodProps) => {
    const { columns, data } = param
    const sums: string[] = []
    columns.forEach((column, index) => {
      if (index === 0) {
        sums[index] = "合計"
        return
      }
      const values = data.map((item) => Number(item[column.property]))
      if (!values.every((value) => Number.isNaN(value))) {
        sums[index] = ` ${values.reduce((prev, curr) => {
          const value = Number(curr)
          if (!Number.isNaN(value)) {
            return prev + curr
          } else {
            return prev
          }
        }, 0)}`
      } else {
        sums[index] = "N/A"
      }
    })

    return sums
  }

  // 其他設定值
  const tabPosition = ref("top")

  const formInline = reactive({
    StartDate: "",
    EndDate: "",
  })

  const ruleFormRef = ref<FormInstance>()
  const formDatePicker = reactive({
    date: "",
  })

  const size = ref("default")

  // DateValue
  const BascDateValue = ref("")
  const CaseTotleValue = ref("")
  const HandleCountValue = ref("")
  const TotleCountsValue = ref("")
  // tableData
  const tableDataBasc = ref()
  const tableDataCaseTotle = ref()
  const tableDataHandleCount = ref()
  const tableDataTotleCounts = ref()

  // children展開只盞開一行
  const expands = ref()
  const getRowKeys = (row) => {
    return row.id
  }
  const expandColumn = (row, expandedRows) => {
    if (expandedRows.length) {
      expands.value = []
      if (row) {
        expands.value.push(row.id)
      }
    } else {
      expands.value = []
    }
  }

  // submit
  const SubmitBascDateValue = () => {
    const StartDate = dayjs(new Date(BascDateValue.value["0"])).format(
      "YYYY-MM-DD"
    )
    const EndDate = dayjs(new Date(BascDateValue.value["1"])).format(
      "YYYY-MM-DD"
    )
    console.log(StartDate + ";" + EndDate)
    const urlBascDateValue =
      url + "GetCaseBascDate?StartDate=" + StartDate + "&EndDate=" + EndDate
    console.log(urlBascDateValue)
    axios
      .get(urlBascDateValue)
      .then((res) => {
        tableDataBasc.value = res.data
      })
      .catch(function (error) {
        console.log(error)
      })
  }
  const SubmitCaseTotleValue = () => {
    const QueryRole = {}
    const DeptNo = {}
    const urlCaseTotleValue =
      url +
      "GetStatisticsDeptCaseTotle?UserId=" +
      UserId +
      "&QueryRole=" +
      QueryRole +
      "&DeptNo=" +
      DeptNo
    console.log(urlCaseTotleValue)
    axios
      .get(urlCaseTotleValue)
      .then((res) => {
        tableDataCaseTotle.value = res.data
      })
      .catch(function (error) {
        console.log(error)
      })
  }
  const SubmitHandleCountValue = () => {
    const CountYear = dayjs(new Date(HandleCountValue.value["0"])).format(
      "YYYY-MM-DD"
    )
    const CountMonth = dayjs(new Date(HandleCountValue.value["1"])).format(
      "YYYY-MM-DD"
    )
    console.log(CountYear + ";" + CountMonth)
    const urlBascDateValue =
      url +
      "GetCaseBascDate?CountYear=" +
      CountYear +
      "&CountMonth=" +
      CountMonth
    console.log(urlBascDateValue)
    axios
      .get(urlBascDateValue)
      .then((res) => {
        tableDataHandleCount.value = res.data
      })
      .catch(function (error) {
        console.log(error)
      })
  }
  const SubmitTotleCountsValue = () => {
    const CountDate = {}
    const DeptNo = {}
    const CountTarget = {}
    const urlTotleCountsValue =
      url +
      "GetCaseBascDate?CountDate=" +
      CountDate +
      "&DeptNo=" +
      DeptNo +
      "&CountTarget=" +
      CountTarget
    console.log(urlTotleCountsValue)
    axios
      .get(urlTotleCountsValue)
      .then((res) => {
        tableDataTotleCounts.value = res.data
      })
      .catch(function (error) {
        console.log(error)
      })
  }

  // 資料匯出
  const getBascDate = () => {
    console.log("匯出各標送審文件統計")
  }
  const getCaseTotle = () => {
    console.log("匯出單位審查案件數量統計")
  }
  const getHandleCount = () => {
    console.log("匯出審查案件辦理情形統計")
  }
  const getCountDetail = () => {
    console.log("匯出主辦單位審查文件數量統計")
  }
  // msg
  const item =
    "總計：229,253筆　　　111年06月合計：2,249筆 　　　本月(111/07)合計：685筆"
</script>
