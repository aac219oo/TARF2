<template>
  <el-config-provider :locale="locale"> </el-config-provider>
  <div class="common-layout">
    <el-container>
      <el-header>
        <a href="../../index.html">
          <h1>TARF2技術文件線上簽核系統</h1>
        </a>
        <a href="../search_event/index.html">
          <h3>審查案件查詢</h3>
        </a>
        <p>蘇家淇(11548)</p>
      </el-header>
      <el-main>
        <el-tabs
          v-model="activeName"
          class="demo-tabs"
          @tab-click="handleClick"
        >
          <el-tab-pane label="送審案件基本資料" name="first">
            <h3>送審案件基本資料</h3>
            <el-divider border-style="double" />
            <el-descriptions title="" :column="2" border>
              <el-descriptions-item
                label-align="right"
                v-for="item in GetReviewCaseBasc"
                :key="item"
              >
                <template #label>案件編號:</template>
                {{ item.casE_ID_VER }}
              </el-descriptions-item>
              <el-descriptions-item
                label-align="right"
                v-for="item in GetReviewCaseBasc"
                :key="item"
              >
                <template #label>審驗結果:</template>
                {{ item.resulT_CODE }}
              </el-descriptions-item>
              <el-descriptions-item
                label-align="right"
                v-for="item in GetReviewCaseBasc"
                :key="item"
              >
                <template #label>主旨:</template>
                {{ item.casE_SUBJECT }}
              </el-descriptions-item>
              <el-descriptions-item
                label-align="right"
                v-for="item in GetReviewCaseBasc"
                :key="item"
              >
                <template #label>說明:</template>
                {{ item.casE_DESC }}
              </el-descriptions-item>
              <el-descriptions-item
                label-align="right"
                v-for="item in GetReviewCaseBasc"
                :key="item"
              >
                <template #label>審查方式:</template>
                <span>{{ item.cloS_EMPL_SERI }}</span>
              </el-descriptions-item>
              <el-descriptions-item
                label-align="right"
                v-for="item in GetReviewCaseBasc"
                :key="item"
              >
                <template #label>決行者:</template>
                {{ item.cloS_EMPL_SERI }}
              </el-descriptions-item>
            </el-descriptions>

            <h3>案件負責單位</h3>
            <el-divider border-style="double" />
            <el-descriptions title="" :column="2" border>
              <el-descriptions-item
                label-align="right"
                v-for="item in GetReviewCaseBasc"
                :key="item"
              >
                <template #label> 工程名稱:</template>
                {{ item.proJ_NAME_C }}
              </el-descriptions-item>
              <el-descriptions-item
                label-align="right"
                v-for="item in GetReviewCaseBasc"
                :key="item"
              >
                <template #label> 契約編號:</template>
                {{ item.conT_ID }}
              </el-descriptions-item>
              <el-descriptions-item
                label-align="right"
                v-for="item in GetReviewCaseBasc"
                :key="item"
              >
                <template #label> 負責廠商:</template>
                {{ item.cusT_NAME }}
              </el-descriptions-item>
              <el-descriptions-item
                label-align="right"
                v-for="item in GetReviewCaseBasc"
                :key="item"
              >
                <template #label> 主辦機關:</template>
                {{ item.casE_WORK_NAME }}
              </el-descriptions-item>
              <el-descriptions-item
                label-align="right"
                v-for="item in GetReviewCaseBasc"
                :key="item"
              >
                <template #label> 案件承辦人:</template>
                {{ item.useR_NAME }}
              </el-descriptions-item>
              <el-descriptions-item
                label-align="right"
                v-for="item in GetReviewCaseBasc"
                :key="item"
              >
                <template #label> 案件承辦人:</template>
                {{ item.empL_NAME }}
              </el-descriptions-item>
              <el-descriptions-item
                label-align="right"
                v-for="item in GetReviewCaseBasc"
                :key="item"
              >
                <template #label> 聯絡電話:</template>
                {{ item.useR_TEL }}
              </el-descriptions-item>
              <el-descriptions-item
                label-align="right"
                v-for="item in GetReviewCaseBasc"
                :key="item"
              >
                <template #label> 聯絡電話:</template>
                {{ item.empL_TEL }}
              </el-descriptions-item>
            </el-descriptions>

            <h3>辦理日期</h3>
            <el-divider border-style="double" />
            <el-descriptions title="" :column="2" border>
              <el-descriptions-item
                label-align="right"
                v-for="item in GetReviewCaseBasc"
                :key="item"
              >
                <template #label> 申請日期:</template>
                {{ item.aplY_DATE }}
              </el-descriptions-item>
              <el-descriptions-item
                label-align="right"
                v-for="item in GetReviewCaseBasc"
                :key="item"
              >
                <template #label> 預定結案日期:</template>
                {{ item.prE_CLOSE_DATE }}
              </el-descriptions-item>
              <el-descriptions-item
                label-align="right"
                v-for="item in GetReviewCaseBasc"
                :key="item"
              >
                <template #label> 會審回復日期:</template>
                {{ item.checK_DATE }}
              </el-descriptions-item>
              <el-descriptions-item
                label-align="right"
                v-for="item in GetReviewCaseBasc"
                :key="item"
              >
                <template #label> 審驗(結案)日期:</template>
                {{ item.exaM_DATE }}
              </el-descriptions-item>
              <el-descriptions-item
                label-align="right"
                v-for="item in GetReviewCaseBasc"
                :key="item"
              >
                <template #label> 綜整日期:</template>
                {{ item.casE_COLL_DATE }}
              </el-descriptions-item>
            </el-descriptions>
          </el-tab-pane>

          <el-tab-pane label="審核流程" name="second">
            <h3>分/會審單位</h3>
            <el-divider border-style="double" />
            <el-table
              :data="GetReviewExamRecd"
              stripe
              border
              :header-cell-style="{
                background: '#ebf4f9',
                color: '#000',
                textAlign: 'center',
              }"
              style="width: 100%"
            >
              <el-table-column
                type="index"
                label="序號"
                :min-width="40"
                :resizable="false"
              />
              <el-table-column
                prop="exaM_DEPT_NO"
                label="分/會審單位"
                :min-width="150"
                :resizable="false"
              />
              <el-table-column
                prop="sigN_STATUS"
                label="流程狀態"
                :resizable="false"
              />
              <el-table-column
                prop="sigN_COMM"
                label="審查意見"
                :resizable="false"
              />
              <el-table-column
                prop="resulT_CODE_DESC"
                label="審驗結果"
                :resizable="false"
              />
              <el-table-column
                prop="sigN_TIME"
                label="簽核時間"
                :resizable="false"
              />
            </el-table>

            <h3>協審同仁</h3>
            <el-divider border-style="double" />
            <el-table
              :data="GetReviewPsnExamRecd"
              stripe
              border
              :header-cell-style="{
                background: '#ebf4f9',
                color: '#000',
                textAlign: 'center',
              }"
              style="width: 100%"
            >
              <el-table-column
                type="index"
                label="序號"
                :min-width="40"
                :resizable="false"
              />
              <el-table-column
                prop="exaM_DEPT_NO"
                label="分/會審單位"
                :min-width="150"
                :resizable="false"
              />
              <el-table-column
                prop="sigN_STATUS"
                label="流程狀態"
                :resizable="false"
              />
              <el-table-column
                prop="sigN_COMM"
                label="審查意見"
                :resizable="false"
              />
              <el-table-column
                prop="resulT_CODE_DESC"
                label="審驗結果"
                :resizable="false"
              />
              <el-table-column
                prop="sigN_TIME"
                label="簽核時間"
                :resizable="false"
              />
            </el-table>
          </el-tab-pane>

          <el-tab-pane label="答覆意見" name="third">
            <h3>答覆意見</h3>
            <el-divider border-style="double" />
            <el-table
              :data="GetReviewAnswerComm"
              stripe
              border
              :header-cell-style="{
                background: '#ebf4f9',
                color: '#000',
                textAlign: 'center',
              }"
              style="width: 100%"
            >
              <el-table-column
                prop="replY_ITEM"
                label="圖說/章節/頁次"
                :min-width="30"
                :resizable="false"
              />
              <el-table-column
                prop="replY_COMM"
                label="審查意見"
                :min-width="150"
                :resizable="false"
              />
              <el-table-column
                prop="answeR_COMM"
                label="答覆內容"
                :resizable="false"
              />
            </el-table>
            <h3>送審檔案</h3>
            <el-divider border-style="double" />
            <el-table
              :data="GetReviewCaseFile"
              stripe
              border
              :header-cell-style="{
                background: '#ebf4f9',
                color: '#000',
                textAlign: 'center',
              }"
              style="width: 100%"
            >
              <el-table-column
                type="index"
                label="序號"
                :min-width="16"
                :resizable="false"
              />
              <el-table-column
                prop="filE_NAME"
                label="檔案名稱"
                :min-width="100"
                :resizable="false"
              />
              <el-table-column
                prop="filE_DESC"
                label="檔案說明"
                :resizable="false"
              />
              <el-table-column
                prop="uploaD_DATE_TIME"
                label="上傳時間"
                :resizable="false"
              />
              <el-table-column :resizable="false">
                <template #default>
                  <a href="{{ GetReviewCaseFile.value.detL_LINK }}">查閱</a>
                </template>
              </el-table-column>
            </el-table>
            <h3>附件檔案</h3>
            <el-divider border-style="double" />
            <el-table
              :data="GetReviewAttachFile"
              stripe
              border
              :header-cell-style="{
                background: '#ebf4f9',
                color: '#000',
                textAlign: 'center',
              }"
              style="width: 100%"
            >
              <el-table-column
                type="index"
                label="序號"
                :min-width="16"
                :resizable="false"
              />
              <el-table-column
                prop="filE_NAME"
                label="檔案名稱"
                :min-width="100"
                :resizable="false"
              />
              <el-table-column
                prop="filE_DESC"
                label="檔案說明"
                :resizable="false"
              />
              <el-table-column
                prop="uploaD_DATE_TIME"
                label="上傳時間"
                :resizable="false"
              />
              <el-table-column :resizable="false">
                <template #default>
                  <a href="{{ GetReviewAttachFile.value.detL_LINK }}">查閱</a>
                </template>
              </el-table-column>
            </el-table>
          </el-tab-pane>
        </el-tabs>
      </el-main>
    </el-container>
  </div>
</template>
<style>
  .demo-tabs > .el-tabs__content {
    padding: 32px;
    color: #000;
    font-size: 32px;
    font-weight: 600;
  }
</style>
<script lang="ts" setup>
  import { ref, onMounted, computed, watch } from "vue"
  import type { TabsPaneContext } from "element-plus"
  import zhTw from "element-plus/dist/locale/zh-tw"
  import en from "element-plus/es/locale/lang/en"
  import axios from "axios"
  import router from "../../router"

  const language = ref("zh-tw")
  const locale = computed(() => (language.value === "zh-tw" ? zhTw : en))
  const url = "https://localhost:7227/api/CaseBascQueryDetail/"
  const geturl = window.location.href
  console.log(geturl)
  const getqyinfo = geturl.split("?")[1]
  const getqys = new URLSearchParams("?" + getqyinfo)
  const CaseId = getqys.get("v1")
  const CaseVer = getqys.get("v2")
  const CaseSeqNo = getqys.get("v3")
  const activeName = ref("first")
  const GetReviewCaseBasc = ref()
  const GetReviewExamRecd = ref()
  const GetReviewPsnExamRecd = ref()
  const GetReviewAnswerComm = ref()
  const GetReviewCaseFile = ref()
  const GetReviewAttachFile = ref()
  const TmDsGetFile = ref()

  const handleClick = (tab: TabsPaneContext, event: Event) => {
    console.log(tab, event)
  }

  onMounted(() => {
    // 送審案件基本資料
    const urlGetReviewCaseBasc =
      url +
      "GetReviewCaseBasc?CaseId=" +
      CaseId +
      "&CaseVer=" +
      CaseVer +
      "&CaseSeqNo=" +
      CaseSeqNo
    axios
      .get(urlGetReviewCaseBasc)
      .then((res) => {
        GetReviewCaseBasc.value = res.data
      })
      .catch(function (error) {
        console.log(error)
      })

    // 分/會審單位
    const urlGetReviewExamRecd =
      url +
      "GetReviewExamRecd?CaseId=" +
      CaseId +
      "&CaseVer=" +
      CaseVer +
      "&CaseSeqNo=" +
      CaseSeqNo
    axios
      .get(urlGetReviewExamRecd)
      .then((res) => {
        GetReviewExamRecd.value = res.data
      })
      .catch(function (error) {
        console.log(error)
      })

    // 協審同仁
    const urlGetReviewPsnExamRecd =
      url +
      "GetReviewPsnExamRecd?CaseId=" +
      CaseId +
      "&CaseVer=" +
      CaseVer +
      "&CaseSeqNo=" +
      CaseSeqNo
    axios
      .get(urlGetReviewPsnExamRecd)
      .then((res) => {
        GetReviewPsnExamRecd.value = res.data
      })
      .catch(function (error) {
        console.log(error)
      })

    // 答覆意見
    const urlGetReviewAnswerComm =
      url +
      "GetReviewAnswerComm?CaseId=" +
      CaseId +
      "&CaseVer=" +
      CaseVer +
      "&CaseSeqNo=" +
      CaseSeqNo
    axios
      .get(urlGetReviewAnswerComm)
      .then((res) => {
        console.log(res.data)
        GetReviewAnswerComm.value = res.data
      })
      .catch(function (error) {
        console.log(error)
      })

    // 送審檔案
    const urlGetReviewCaseFile =
      url +
      "GetReviewCaseFile?CaseId=" +
      CaseId +
      "&CaseVer=" +
      CaseVer +
      "&CaseSeqNo=" +
      CaseSeqNo
    axios
      .get(urlGetReviewCaseFile)
      .then((res) => {
        GetReviewCaseFile.value = res.data
      })
      .catch(function (error) {
        console.log(error)
      })

    // 附件檔案
    const urlGetReviewAttachFile =
      url +
      "GetReviewAttachFile?CaseId=" +
      CaseId +
      "&CaseVer=" +
      CaseVer +
      "&CaseSeqNo=" +
      CaseSeqNo
    axios
      .get(urlGetReviewAttachFile)
      .then((res) => {
        GetReviewAttachFile.value = res.data
      })
      .catch(function (error) {
        console.log(error)
      })
  })

  // 讀取檔案
  const onClickTmDsGetFile = () => {
    const urlTmDsGetFile =
      url +
      "TmDsGetFile?CaseId=" +
      CaseId +
      "&CaseVer=" +
      CaseVer +
      "&CaseSeqNo=" +
      CaseSeqNo
    axios
      .get(urlTmDsGetFile)
      .then((res) => {
        TmDsGetFile.value = res.data
      })
      .catch(function (error) {
        console.log(error)
      })
  }
</script>
