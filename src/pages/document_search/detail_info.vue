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
        <el-tabs v-model="activeName" class="demo-tabs" @tab-click="handleClick">
          <el-tab-pane label="送審案件基本資料" name="first">
            <h3>送審案件基本資料</h3>
            <el-divider border-style="double" />
            <el-descriptions title="" :column="2" border>
              <el-descriptions-item label-align="right" v-for="item in GetReviewCaseBasc" :key="">
                <template #label>案件編號:</template>
                {{}}
              </el-descriptions-item>
              <el-descriptions-item label-align="right" v-for="" :key="">
                <template #label>審驗結果:</template>
                {{}}
              </el-descriptions-item>
              <el-descriptions-item label-align="right" v-for="" :key="">
                <template #label>主旨:</template>
                {{}}
              </el-descriptions-item>
              <el-descriptions-item label-align="right" v-for="" :key="">
                <template #label>說明:</template>
                {{}}
              </el-descriptions-item>
              <el-descriptions-item label-align="right" v-for="" :key="">
                <template #label>審查方式:</template>
                <span>{{}}</span>
              </el-descriptions-item>
              <el-descriptions-item label-align="right" v-for="" :key="">
                <template #label>決行者:</template>
                {{}}
              </el-descriptions-item>
            </el-descriptions>

            <h3>案件負責單位</h3>
            <el-divider border-style="double" />
            <el-descriptions title="" :column="2" border>
              <el-descriptions-item label-align="right" v-for="" :key="">
                <template #label> 工程名稱:</template>
                環狀線北環段及南環段「機電系統工程標」
              </el-descriptions-item>
              <el-descriptions-item label-align="right" v-for="" :key="">
                <template #label> 契約編號:</template>
                E1342-110Y001-000
              </el-descriptions-item>
              <el-descriptions-item label-align="right" v-for="" :key="">
                <template #label> 負責廠商:</template>
                法商阿爾斯通運輸股份有限公司
              </el-descriptions-item>
              <el-descriptions-item label-align="right" v-for="" :key="">
                <template #label> 主辦機關:</template>
                台北市政府捷運工程局機電工程處
              </el-descriptions-item>
              <el-descriptions-item label-align="right" v-for="" :key="">
                <template #label> 案件承辦人:</template>
                蔡惠婷(D0002599)
              </el-descriptions-item>
              <el-descriptions-item label-align="right" v-for="" :key="">
                <template #label> 案件承辦人:</template>
                楊政南 工程司
              </el-descriptions-item>
              <el-descriptions-item label-align="right" v-for="" :key="">
                <template #label> 聯絡電話:</template>
                02-22182800
              </el-descriptions-item>
              <el-descriptions-item label-align="right" v-for="" :key="">
                <template #label> 聯絡電話:</template>
                02-27881300-625
              </el-descriptions-item>
            </el-descriptions>

            <h3>辦理日期</h3>
            <el-divider border-style="double" />
            <el-descriptions title="" :column="2" border>
              <el-descriptions-item label-align="right" v-for="" :key="">
                <template #label> 申請日期:</template>
                111.07.01
              </el-descriptions-item>
              <el-descriptions-item label-align="right" v-for="" :key="">
                <template #label> 預定結案日期:</template>
                111.08.04
              </el-descriptions-item>
              <el-descriptions-item label-align="right" v-for="" :key="">
                <template #label> 會審回復日期:</template>
                111.07.22
              </el-descriptions-item>
              <el-descriptions-item label-align="right" v-for="" :key="">
                <template #label> 審驗(結案)日期:</template>
                111.07.05
              </el-descriptions-item>
              <el-descriptions-item label-align="right" v-for="" :key="">
                <template #label> 綜整日期:</template>
                111.07.29
              </el-descriptions-item>
            </el-descriptions>
          </el-tab-pane>

          <el-tab-pane label="審核流程" name="second">
            <h3>分/會審單位</h3>
            <el-divider border-style="double" />
            <el-table :data="GetReviewExamRecd" stripe border :header-cell-style="{
              background: '#ebf4f9',
              color: '#000',
              textAlign: 'center',
            }" style="width: 100%">
              <el-table-column type="index" label="序號" :min-width="40" :resizable="false" />
              <el-table-column prop="EXAM_DEPT_NO" label="分/會審單位" :min-width="150" :resizable="false" />
              <el-table-column prop="SIGN_STATUS" label="流程狀態" :resizable="false" />
              <el-table-column prop="SIGN_COMM" label="審查意見" :resizable="false" />
              <el-table-column prop="RESULT_CODE_DESC" label="審驗結果" :resizable="false" />
              <el-table-column prop="SIGN_TIME" label="簽核時間" :resizable="false" />
            </el-table>

            <h3>協審同仁</h3>
            <el-divider border-style="double" />
            <el-table :data="GetReviewPsnExamRecd" stripe border :header-cell-style="{
              background: '#ebf4f9',
              color: '#000',
              textAlign: 'center',
            }" style="width: 100%">
              <el-table-column type="index" label="序號" :min-width="40" :resizable="false" />
              <el-table-column prop="EXAM_DEPT_NO" label="分/會審單位" :min-width="150" :resizable="false" />
              <el-table-column prop="SIGN_STATUS" label="流程狀態" :resizable="false" />
              <el-table-column prop="SIGN_COMM" label="審查意見" :resizable="false" />
              <el-table-column prop="RESULT_CODE_DESC" label="審驗結果" :resizable="false" />
              <el-table-column prop="SIGN_TIME" label="簽核時間" :resizable="false" />
            </el-table>
          </el-tab-pane>

          <el-tab-pane label="答覆意見" name="third">
            <h3>答覆意見</h3>
            <el-divider border-style="double" />
            <el-table :data="GetReviewAnswerComm" stripe border :header-cell-style="{
              background: '#ebf4f9',
              color: '#000',
              textAlign: 'center',
            }" style="width: 100%">
              <el-table-column label="圖說/章節/頁次" :min-width="30" :resizable="false" />
              <el-table-column prop="REPLY_COMM" label="審查意見" :min-width="150" :resizable="false" />
              <el-table-column prop="ANSWER_COMM" label="答覆內容" :resizable="false" />
            </el-table>
            <h3>送審檔案</h3>
            <el-divider border-style="double" />
            <el-table :data="GetReviewCaseFile" stripe border :header-cell-style="{
              background: '#ebf4f9',
              color: '#000',
              textAlign: 'center',
            }" style="width: 100%">
              <el-table-column type="index" label="序號" :min-width="16" :resizable="false" />
              <el-table-column prop="FILE_NAME" label="檔案名稱" :min-width="100" :resizable="false" />
              <el-table-column prop="FILE_DESC" label="檔案說明" :resizable="false" />
              <el-table-column prop="UPLOAD_DATE_TIME" label="上傳時間" :resizable="false" />
              <el-table-column :resizable="false">
                <template #default>
                  <a href="DETL_LINK">查閱</a>
                </template>
              </el-table-column>
            </el-table>
            <h3>附件檔案</h3>
            <el-divider border-style="double" />
            <el-table :data="GetReviewAttachFile" stripe border :header-cell-style="{
              background: '#ebf4f9',
              color: '#000',
              textAlign: 'center',
            }" style="width: 100%">
              <el-table-column type="index" label="序號" :min-width="16" :resizable="false" />
              <el-table-column prop="FILE_NAME" label="檔案名稱" :min-width="100" :resizable="false" />
              <el-table-column prop="FILE_DESC" label="檔案說明" :resizable="false" />
              <el-table-column prop="UPLOAD_DATE_TIME" label="上傳時間" :resizable="false" />
              <el-table-column :resizable="false">
                <template #default>
                  <a href="DETL_LINK">查閱</a>
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
.demo-tabs>.el-tabs__content {
  padding: 32px;
  color: #000;
  font-size: 32px;
  font-weight: 600;
}
</style>
<script lang="ts" setup>
import { ref, onMounted, computed } from "vue"
import type { TabsPaneContext } from "element-plus"
import zhTw from "element-plus/dist/locale/zh-tw"
import en from "element-plus/es/locale/lang/en"
import axios from "axios"

const language = ref("zh-tw")
const locale = computed(() => (language.value === "zh-tw" ? zhTw : en))
const url = "https://localhost:7227/api/CaseBascQueryDetail/"
const CaseId = ""
const CaseVer = ""
const CaseSeqNo = ""
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
})

</script>
