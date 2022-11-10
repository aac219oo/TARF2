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
                :model="formInline"
                class="demo-form-inline"
                label-position="top"
              >
                <div class="container_left">
                  <div class="input_position">
                    <el-form-item class="datepicker" label="統計月份">
                      <el-date-picker
                        v-model="value"
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
                        <el-button @click="onSubmit"
                          ><img
                            src="../../assets/icon01.png"
                            style="width: 26px; vertical-align: bottom"
                            alt=""
                        /></el-button>
                      </div>
                      <div class="button-items-export">
                        <el-button>
                          <a href="../detail_info/index.html">
                            <img
                              src="../../assets/icon02.png"
                              style="width: 26px; vertical-align: bottom"
                              alt=""
                            />
                          </a>
                        </el-button>
                      </div>
                    </el-form-item>
                  </div>
                  <div class="msg_position">
                    <div class="title_msg"><h4>訊息</h4></div>
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
            <div class="title_main"><h4>各標送審文件統計</h4></div>
            <el-table
              class="tableForm"
              :data="tableData1"
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
                prop="labelNumber"
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
              <el-table-column prop="jan" label="1月" :resizable="false" />
              <el-table-column prop="feb" label="2月" :resizable="false" />
              <el-table-column prop="mar" label="3月" :resizable="false" />
              <el-table-column prop="apr" label="4月" :resizable="false" />
              <el-table-column prop="may" label="5月" :resizable="false" />
              <el-table-column prop="jun" label="6月" :resizable="false" />
              <el-table-column prop="jul" label="7月" :resizable="false" />
              <el-table-column prop="aug" label="8月" :resizable="false" />
              <el-table-column prop="sep" label="9月" :resizable="false" />
              <el-table-column prop="oct" label="10月" :resizable="false" />
              <el-table-column prop="nov" label="11月" :resizable="false" />
              <el-table-column prop="dec" label="12月" :resizable="false" />
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
                        v-model="value"
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
                        <el-button @click="onSubmit"
                          ><img
                            src="../../assets/icon01.png"
                            style="width: 26px; vertical-align: bottom"
                            alt=""
                        /></el-button>
                      </div>
                      <div class="button-items-export">
                        <el-button>
                          <a href="../detail_info/index.html">
                            <img
                              src="../../assets/icon02.png"
                              style="width: 26px; vertical-align: bottom"
                              alt=""
                            />
                          </a>
                        </el-button>
                      </div>
                    </el-form-item>
                  </div>
                  <div class="msg_position">
                    <div class="title_msg"><h4>訊息</h4></div>
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
              :data="tableData2"
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
                prop="years"
                label="年份"
                width="100"
                :resizable="false"
              />
              <el-table-column prop="jan" label="1月" :resizable="false" />
              <el-table-column prop="feb" label="2月" :resizable="false" />
              <el-table-column prop="mar" label="3月" :resizable="false" />
              <el-table-column prop="apr" label="4月" :resizable="false" />
              <el-table-column prop="may" label="5月" :resizable="false" />
              <el-table-column prop="jun" label="6月" :resizable="false" />
              <el-table-column prop="jul" label="7月" :resizable="false" />
              <el-table-column prop="aug" label="8月" :resizable="false" />
              <el-table-column prop="sep" label="9月" :resizable="false" />
              <el-table-column prop="oct" label="10月" :resizable="false" />
              <el-table-column prop="nov" label="11月" :resizable="false" />
              <el-table-column prop="dec" label="12月" :resizable="false" />
              <el-table-column prop="tatle" label="合計" :resizable="false" />
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
                        v-model="value"
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
                        <el-button @click="onSubmit"
                          ><img
                            src="../../assets/icon01.png"
                            style="width: 26px; vertical-align: bottom"
                            alt=""
                        /></el-button>
                      </div>
                      <div class="button-items-export">
                        <el-button>
                          <a href="../detail_info/index.html">
                            <img
                              src="../../assets/icon02.png"
                              style="width: 26px; vertical-align: bottom"
                              alt=""
                            />
                          </a>
                        </el-button>
                      </div>
                    </el-form-item>
                  </div>
                  <div class="msg_position">
                    <div class="title_msg"><h4>訊息</h4></div>
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
            <div class="title_main"><h4>審查案件辦理情形統計</h4></div>
            <el-table
              class="tableForm tableSearchCondition"
              :data="tableData3"
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
                prop="labelNumber"
                label="單位"
                width="180"
                :resizable="false"
              />
              <el-table-column
                prop="TuchengDingpu"
                label="案件總數(1)"
                :resizable="false"
              />
              <el-table-column
                prop="airport"
                label="如期結案(2)"
                :resizable="false"
              />
              <el-table-column
                prop="Wanda"
                label="逾期結案(3)"
                :resizable="false"
              />
              <el-table-column
                prop="Songshan"
                label="未結案(4)"
                :resizable="false"
              />
              <el-table-column
                prop="TaichungGreen"
                label="如期未結案(5)"
                :resizable="false"
              />
              <el-table-column
                prop="Xinzhuang"
                label="逾期未結案(6)"
                :resizable="false"
              />
              <el-table-column
                prop="ring"
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
                        v-model="value"
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
                        <el-button @click="onSubmit"
                          ><img
                            src="../../assets/icon01.png"
                            style="width: 26px; vertical-align: bottom"
                            alt=""
                        /></el-button>
                      </div>
                      <div class="button-items-export">
                        <el-button>
                          <a href="../detail_info/index.html">
                            <img
                              src="../../assets/icon02.png"
                              style="width: 26px; vertical-align: bottom"
                              alt=""
                            />
                          </a>
                        </el-button>
                      </div>
                    </el-form-item>
                  </div>
                  <div class="msg_position active">
                    <div class="msg_title"><h4>訊息</h4></div>
                    <div class="msg_content">
                      <h3>{{ item }}</h3>
                    </div>
                  </div>
                </div>
              </el-form>
            </div>
            <div class="title_main"><h4>主辦單位審查文件數量統計</h4></div>
            <el-table
              class="tableForm"
              :data="tableData4"
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
                prop="labelNumber"
                label="單位名稱"
                min-width="120"
                :resizable="false"
              />
              <el-table-column
                prop="TuchengDingpu"
                label="全部數量"
                :resizable="false"
              />
              <el-table-column
                prop="airport"
                label="111年6月數量"
                :resizable="false"
              />
              <el-table-column
                prop="Wanda"
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

  const language = ref("zh-tw")
  const locale = computed(() => (language.value === "zh-tw" ? zhTw : en))
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

  const value = ref("")

  const formInline = reactive({
    user: "",
    region: "",
  })

  const size = ref("default")

  const onSubmit = () => {
    console.log("submit!")
  }

  const tableData1 = [
    {
      labelNumber: "CR285",
      TuchengDingpu: "-",
      airport: "-",
      Wanda: "-",
      Songshan: "-",
      TaichungGreen: "-",
      Xinzhuang: "-",
      ring: "-",
      Xinyi: "-",
    },
    {
      labelNumber: "CR380E",
      TuchengDingpu: "-",
      airport: "-",
      Wanda: "-",
      Songshan: "-",
      TaichungGreen: "-",
      Xinzhuang: "-",
      ring: "-",
      Xinyi: "-",
    },
    {
      labelNumber: "CR382A",
      TuchengDingpu: "-",
      airport: "-",
      Wanda: "-",
      Songshan: "-",
      TaichungGreen: "-",
      Xinzhuang: "-",
      ring: "-",
      Xinyi: "-",
    },
    {
      labelNumber: "CR383A",
      TuchengDingpu: "-",
      airport: "-",
      Wanda: "-",
      Songshan: "-",
      TaichungGreen: "-",
      Xinzhuang: "-",
      ring: "-",
      Xinyi: "-",
    },
    {
      labelNumber: "CR385A",
      TuchengDingpu: "-",
      airport: "-",
      Wanda: "-",
      Songshan: "-",
      TaichungGreen: "-",
      Xinzhuang: "-",
      ring: "-",
      Xinyi: "-",
    },
    {
      labelNumber: "CR387A",
      TuchengDingpu: "-",
      airport: "-",
      Wanda: "-",
      Songshan: "-",
      TaichungGreen: "-",
      Xinzhuang: "-",
      ring: "-",
      Xinyi: "-",
    },
    {
      labelNumber: "CR580C",
      TuchengDingpu: "-",
      airport: "-",
      Wanda: "-",
      Songshan: "-",
      TaichungGreen: "-",
      Xinzhuang: "-",
      ring: "-",
      Xinyi: "-",
    },
    {
      labelNumber: "CR581A",
      TuchengDingpu: "-",
      airport: "-",
      Wanda: "-",
      Songshan: "-",
      TaichungGreen: "-",
      Xinzhuang: "-",
      ring: "-",
      Xinyi: "-",
    },
    {
      labelNumber: "CF620",
      TuchengDingpu: "-",
      airport: "-",
      Wanda: "-",
      Songshan: "-",
      TaichungGreen: "-",
      Xinzhuang: "-",
      ring: "-",
      Xinyi: "-",
    },
  ]

  const tableData2 = [
    {
      years: "101",
      jan: "-",
      feb: "-",
      mar: "-",
      apr: "-",
      may: "-",
      jun: "-",
      jul: "-",
      aug: "-",
      sep: "-",
      oct: "-",
      nov: "-",
      dec: "-",
    },
    {
      years: "102",
      jan: "-",
      feb: "-",
      mar: "-",
      apr: "-",
      may: "-",
      jun: "-",
      jul: "-",
      aug: "-",
      sep: "-",
      oct: "-",
      nov: "-",
      dec: "-",
    },
    {
      years: "103",
      jan: "-",
      feb: "-",
      mar: "-",
      apr: "-",
      may: "-",
      jun: "-",
      jul: "-",
      aug: "-",
      sep: "-",
      oct: "-",
      nov: "-",
      dec: "-",
    },
    {
      years: "104",
      jan: "-",
      feb: "-",
      mar: "-",
      apr: "1",
      may: "1",
      jun: "-",
      jul: "-",
      aug: "-",
      sep: "-",
      oct: "-",
      nov: "-",
      dec: "-",
      tatle: "2",
    },
    {
      years: "105",
      jan: "-",
      feb: "-",
      mar: "-",
      apr: "1",
      may: "-",
      jun: "-",
      jul: "-",
      aug: "-",
      sep: "-",
      oct: "-",
      nov: "-",
      dec: "-",
      tatle: "1",
    },
    {
      years: "106",
      jan: "-",
      feb: "-",
      mar: "-",
      apr: "-",
      may: "-",
      jun: "-",
      jul: "-",
      aug: "-",
      sep: "-",
      oct: "-",
      nov: "-",
      dec: "-",
    },
    {
      years: "107",
      jan: "1",
      feb: "-",
      mar: "-",
      apr: "-",
      may: "-",
      jun: "-",
      jul: "1",
      aug: "1",
      sep: "-",
      oct: "-",
      nov: "-",
      dec: "-",
      tatle: "3",
    },
    {
      years: "108",
      jan: "-",
      feb: "-",
      mar: "-",
      apr: "-",
      may: "-",
      jun: "-",
      jul: "3",
      aug: "14",
      sep: "45",
      oct: "16",
      nov: "10",
      dec: "9",
      tatle: "97",
    },
    {
      years: "109",
      jan: "11",
      feb: "17",
      mar: "51",
      apr: "58",
      may: "65",
      jun: "64",
      jul: "54",
      aug: "39",
      sep: "44",
      oct: "35",
      nov: "28",
      dec: "29",
      tatle: "495",
    },
    {
      years: "110",
      jan: "22",
      feb: "19",
      mar: "21",
      apr: "11",
      may: "13",
      jun: "15",
      jul: "13",
      aug: "18",
      sep: "23",
      oct: "18",
      nov: "18",
      dec: "16",
      tatle: "207",
    },
    {
      years: "111",
      jan: "19",
      feb: "13",
      mar: "17",
      apr: "10",
      may: "10",
      jun: "12",
      jul: "10",
      aug: "-",
      sep: "-",
      oct: "-",
      nov: "-",
      dec: "-",
      tatle: "91",
    },
  ]
  const tableData3 = [
    {
      id: 1,
      labelNumber: "綜規處",
      TuchengDingpu: "-",
      airport: "-",
      Wanda: "-",
      Songshan: "-",
      TaichungGreen: "-",
      Xinzhuang: "-",
      ring: "-",
      Xinyi: "-",
      children: [
        {
          labelNumber: "綜規處處本部",
          TuchengDingpu: "-",
          airport: "-",
          Wanda: "-",
          Songshan: "-",
          TaichungGreen: "-",
          Xinzhuang: "-",
          ring: "-",
          Xinyi: "-",
        },
        {
          labelNumber: "綜規處第一課",
          TuchengDingpu: "-",
          airport: "-",
          Wanda: "-",
          Songshan: "-",
          TaichungGreen: "-",
          Xinzhuang: "-",
          ring: "-",
          Xinyi: "-",
        },
        {
          labelNumber: "綜規處第二課",
          TuchengDingpu: "-",
          airport: "-",
          Wanda: "-",
          Songshan: "-",
          TaichungGreen: "-",
          Xinzhuang: "-",
          ring: "-",
          Xinyi: "-",
        },
      ],
    },
    {
      id: 2,
      labelNumber: "土建處",
      TuchengDingpu: "-",
      airport: "-",
      Wanda: "-",
      Songshan: "-",
      TaichungGreen: "-",
      Xinzhuang: "-",
      ring: "-",
      Xinyi: "-",
    },
    {
      id: 3,
      labelNumber: "機設處",
      TuchengDingpu: "-",
      airport: "-",
      Wanda: "-",
      Songshan: "-",
      TaichungGreen: "-",
      Xinzhuang: "-",
      ring: "-",
      Xinyi: "-",
    },
    {
      id: 4,
      labelNumber: "工管處",
      TuchengDingpu: "-",
      airport: "-",
      Wanda: "-",
      Songshan: "-",
      TaichungGreen: "-",
      Xinzhuang: "-",
      ring: "-",
      Xinyi: "-",
    },
    {
      id: 5,
      labelNumber: "開發處",
      TuchengDingpu: "-",
      airport: "-",
      Wanda: "-",
      Songshan: "-",
      TaichungGreen: "-",
      Xinzhuang: "-",
      ring: "-",
      Xinyi: "-",
    },
    {
      id: 6,
      labelNumber: "技術處",
      TuchengDingpu: "-",
      airport: "-",
      Wanda: "-",
      Songshan: "-",
      TaichungGreen: "-",
      Xinzhuang: "-",
      ring: "-",
      Xinyi: "-",
    },
    {
      id: 7,
      labelNumber: "一區工程處",
      TuchengDingpu: "-",
      airport: "-",
      Wanda: "-",
      Songshan: "-",
      TaichungGreen: "-",
      Xinzhuang: "-",
      ring: "-",
      Xinyi: "-",
    },
    {
      id: 8,
      labelNumber: "二區工程處",
      TuchengDingpu: "-",
      airport: "-",
      Wanda: "-",
      Songshan: "-",
      TaichungGreen: "-",
      Xinzhuang: "-",
      ring: "-",
      Xinyi: "-",
    },
    {
      id: 9,
      labelNumber: "機電工程處",
      TuchengDingpu: "-",
      airport: "-",
      Wanda: "-",
      Songshan: "-",
      TaichungGreen: "-",
      Xinzhuang: "-",
      ring: "-",
      Xinyi: "-",
    },
  ]
  const tableData4 = [
    {
      id: 1,
      labelNumber: "台灣世曦工程顧問股份有限公司",
      TuchengDingpu: "16,545",
      airport: "0",
      Wanda: "0",
      children: [
        {
          labelNumber: "台灣世曦工程顧問股份有限公司",
          TuchengDingpu: "16,545",
          airport: "0",
          Wanda: "0",
        },
      ],
    },
    {
      id: 2,
      labelNumber: "翰品聯合建築師事務所",
      TuchengDingpu: "1,698",
      airport: "0",
      Wanda: "0",
    },
    {
      id: 3,
      labelNumber: "綜規處",
      TuchengDingpu: "6",
      airport: "0",
      Wanda: "0",
      children: [
        {
          labelNumber: "綜規處第四課",
          TuchengDingpu: "6",
          airport: "0",
          Wanda: "0",
        },
      ],
    },
  ]

  // msg

  const item =
    "總計：229,253筆　　　111年06月合計：2,249筆 　　　本月(111/07)合計：685筆"
</script>
