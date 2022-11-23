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
                <el-radio-group v-model="form.date3">
                  <el-radio label="三日" value="三日" />
                  <el-radio label="一周" value="一周" />
                  <el-radio label="一個月" value="一個月" />
                  <el-radio label="一年" value="一年" />
                </el-radio-group>
              </div>
              <el-form-item class="label-left">
                <el-date-picker
                  v-model="form.date1"
                  type="date"
                  placeholder="請選擇日期"
                  :size="size"
                  for="apply_date1"
                />
                <span class="decoration">~</span>
                <el-date-picker
                  v-model="form.date2"
                  type="date"
                  placeholder="請選擇日期"
                  :size="size"
                  for="apply_date2"
                />
              </el-form-item>
            </div>
            <el-form-item label="送審項目">
              <el-select
                v-model="form.items"
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
                v-model="form.labelNumber"
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
                v-model="form.department"
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
                v-model="form.condition"
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
              </el-select>
            </el-form-item>
            <el-form-item label="關鍵字" class="searchTitle">
              <el-input
                v-model="form.title"
                placeholder="(主旨，多組關鍵字請用空白分隔)"
                :size="size"
              />
            </el-form-item>
            <el-form-item class="button-items">
              <div class="button-items-search">
                <el-button @click="onSubmit">
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
            ></el-table-column>
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
            ></el-table-column>
            <el-table-column
              label="狀態"
              prop="casE_STATUS_DESC"
              sortable
              :min-width="20"
              :resizable="false"
            ></el-table-column>
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
              <el-button type="print"
                ><img
                  src="../../assets/icon03.png"
                  style="width: 25px; vertical-align: bottom"
                  alt=""
              /></el-button>
            </el-table-column>
          </el-table>
        </el-col>
        <el-col>
          <el-pagination
            @size-change="handleSizeChange"
            @current-change="handleCurrentChange"
            v-model:current-page="currentPage"
            :page-sizes="[5, 10, 15, 20]"
            v-model:page-size="pageSize"
            layout="total, sizes, prev, pager, next, jumper"
            :total="files_count"
          >
          </el-pagination>
        </el-col>
      </el-row>
    </el-main>
  </el-container>
</template>

<script lang="ts" setup>
  import { computed, reactive, ref, onMounted } from "vue"
  import { ElementPlus, Printer, Search, Edit } from "@element-plus/icons-vue"
  import zhTw from "element-plus/dist/locale/zh-tw"
  import en from "element-plus/es/locale/lang/en"
  import { paginationEmits } from "element-plus"
  import axios from "axios"

  const language = ref("zh-tw")
  const locale = computed(() => (language.value === "zh-tw" ? zhTw : en))
  const size = ref("default")
  const loading = ref(true)
  const currentPage = ref(1)
  const pageSize = ref(5)
  const files_count = ref()
  const handleSizeChange = (val: number) => {
    console.log(`${val} items per page`)
  }
  const handleCurrentChange = (val: number) => {
    console.log(`current page: ${val}`)
  }
  // const indexMethoud = (index: number) => {
  //   return (currentPage.value - 1) * pageSize.value + index + 1
  // }
  // do not use same name with ref
  const form = reactive({
    date1: "",
    date2: "",
    date3: "",
    items: "",
    labelNumber: "",
    agency: "",
    department: "",
    condition: "",
    reading: "",
    title: "",
  })

  const onSubmit = () => {
    console.log("submit!")
  }

  const tables = ref()
  onMounted(() => {
    const url =
      "https://localhost:7227/api/CaseBascQueryDept/LoadQueryData?UserId=11695"
    loading.value = true
    axios
      .get(url)
      .then((res) => {
        // console.log(res.data)
        tables.value = res.data
        loading.value = false
        files_count.value = res.data.length
      })
      .catch(function (error) {
        console.log(error)
      })
  })
</script>
