<template>
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
              <el-descriptions-item label-align="right">
                <template #label>案件編號:</template>
                CF620-SIG-TD-YC-OCS-CD-GR-0018-A
              </el-descriptions-item>
              <el-descriptions-item label-align="right">
                <template #label>審驗結果:</template>
                『1』准予備查
              </el-descriptions-item>
              <el-descriptions-item label-align="right">
                <template #label>主旨:</template>
                檢送台北捷運環狀線北環段及南環段機電系統
              </el-descriptions-item>
              <el-descriptions-item label-align="right">
                <template #label>說明:</template>
                1.依照契約特別技術規範第1.6.1,1.6.3,2.2,2.2.1條辦理
              </el-descriptions-item>
              <el-descriptions-item label-align="right">
                <template #label>審查方式:</template>
                <span>線上簽核</span>
              </el-descriptions-item>
              <el-descriptions-item label-align="right">
                <template #label>決行者:</template>
                工務所主孫禮賢(111年7月05日07時52分56秒)
              </el-descriptions-item>
            </el-descriptions>

            <h3>案件負責單位</h3>
            <el-divider border-style="double" />
            <el-descriptions title="" :column="2" border>
              <el-descriptions-item label-align="right">
                <template #label> 工程名稱:</template>
                環狀線北環段及南環段「機電系統工程標」
              </el-descriptions-item>
              <el-descriptions-item label-align="right">
                <template #label> 契約編號:</template>
                E1342-110Y001-000
              </el-descriptions-item>
              <el-descriptions-item label-align="right">
                <template #label> 負責廠商:</template>
                法商阿爾斯通運輸股份有限公司
              </el-descriptions-item>
              <el-descriptions-item label-align="right">
                <template #label> 主辦機關:</template>
                台北市政府捷運工程局機電工程處
              </el-descriptions-item>
              <el-descriptions-item label-align="right">
                <template #label> 案件承辦人:</template>
                蔡惠婷(D0002599)
              </el-descriptions-item>
              <el-descriptions-item label-align="right">
                <template #label> 案件承辦人:</template>
                楊政南 工程司
              </el-descriptions-item>
              <el-descriptions-item label-align="right">
                <template #label> 聯絡電話:</template>
                02-22182800
              </el-descriptions-item>
              <el-descriptions-item label-align="right">
                <template #label> 聯絡電話:</template>
                02-27881300-625
              </el-descriptions-item>
            </el-descriptions>

            <h3>辦理日期</h3>
            <el-divider border-style="double" />
            <el-descriptions title="" :column="2" border>
              <el-descriptions-item label-align="right">
                <template #label> 申請日期:</template>
                111.07.01
              </el-descriptions-item>
              <el-descriptions-item label-align="right">
                <template #label> 預定結案日期:</template>
                111.08.04
              </el-descriptions-item>
              <el-descriptions-item label-align="right">
                <template #label> 會審回復日期:</template>
                111.07.22
              </el-descriptions-item>
              <el-descriptions-item label-align="right">
                <template #label> 審驗(結案)日期:</template>
                111.07.05
              </el-descriptions-item>
              <el-descriptions-item label-align="right">
                <template #label> 綜整日期:</template>
                111.07.29
              </el-descriptions-item>
            </el-descriptions>
          </el-tab-pane>
          <!-- <el-tab-pane label="案件負責單位" name="second"
            >案件負責單位
            <el-divider border-style="double" />
            <el-descriptions class="margin-top" title="" :column="2" border>
              <el-descriptions-item>
                <template #label> 工程名稱:</template>
                環狀線北環段及南環段「機電系統工程標」
              </el-descriptions-item>
              <el-descriptions-item>
                <template #label> 契約編號:</template>
                E1342-110Y001-000
              </el-descriptions-item>
              <el-descriptions-item>
                <template #label> 負責廠商:</template>
                法商阿爾斯通運輸股份有限公司
              </el-descriptions-item>
              <el-descriptions-item>
                <template #label> 主辦機關:</template>
                台北市政府捷運工程局機電工程處
              </el-descriptions-item>
              <el-descriptions-item>
                <template #label> 案件承辦人:</template>
                蔡惠婷(D0002599)
              </el-descriptions-item>
              <el-descriptions-item>
                <template #label> 案件承辦人:</template>
                楊政南 工程司
              </el-descriptions-item>
              <el-descriptions-item>
                <template #label> 聯絡電話:</template>
                02-22182800
              </el-descriptions-item>
              <el-descriptions-item>
                <template #label> 聯絡電話:</template>
                02-27881300-625
              </el-descriptions-item>
            </el-descriptions>
          </el-tab-pane> -->
          <!-- <el-tab-pane label="辦理日期" name="third"
            >辦理日期
            <el-divider border-style="double" />
            <el-descriptions class="margin-top" title="" :column="2" border>
              <el-descriptions-item>
                <template #label> 申請日期:</template>
                111.07.01
              </el-descriptions-item>
              <el-descriptions-item>
                <template #label> 預定結案日期:</template>
                111.08.04
              </el-descriptions-item>
              <el-descriptions-item>
                <template #label> 會審回復日期:</template>
                111.07.22
              </el-descriptions-item>
              <el-descriptions-item>
                <template #label> 審驗(結案)日期:</template>
                111.07.05
              </el-descriptions-item>
              <el-descriptions-item>
                <template #label> 綜整日期:</template>
                111.07.29
              </el-descriptions-item>
            </el-descriptions>
          </el-tab-pane> -->
          <el-tab-pane label="審核流程" name="second">
            <h3>分/會審單位</h3>
            <el-divider border-style="double" />
            <el-table
              :data="tableData1"
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
                prop="unit"
                label="分/會審單位"
                :min-width="150"
                :resizable="false"
              />
              <el-table-column
                prop="condition"
                label="流程狀態"
                :resizable="false"
              />
              <el-table-column
                prop="opinion"
                label="審查意見"
                :resizable="false"
              />
              <el-table-column
                prop="result"
                label="審驗結果"
                :resizable="false"
              />
              <el-table-column
                prop="date"
                label="簽核時間"
                :resizable="false"
              />
            </el-table>

            <h3>協審同仁</h3>
            <el-divider border-style="double" />
            <el-table
              :data="tableData2"
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
                prop="unit"
                label="分/會審單位"
                :min-width="150"
                :resizable="false"
              />
              <el-table-column
                prop="condition"
                label="流程狀態"
                :resizable="false"
              />
              <el-table-column
                prop="opinion"
                label="審查意見"
                :resizable="false"
              />
              <el-table-column
                prop="result"
                label="審驗結果"
                :resizable="false"
              />
              <el-table-column
                prop="date"
                label="簽核時間"
                :resizable="false"
              />
            </el-table>
          </el-tab-pane>
          <!-- <el-tab-pane label="協審同仁" name="fifth"
            >協審同仁
            <el-divider border-style="double" />
            <el-table
              :data="tableData2"
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
                prop="unit"
                label="分/會審單位"
                :min-width="150"
                :resizable="false"
              />
              <el-table-column
                prop="condition"
                label="流程狀態"
                :resizable="false"
              />
              <el-table-column
                prop="opinion"
                label="審查意見"
                :resizable="false"
              />
              <el-table-column
                prop="result"
                label="審驗結果"
                :resizable="false"
              />
              <el-table-column
                prop="date"
                label="簽核時間"
                :resizable="false"
              />
            </el-table>
          </el-tab-pane> -->
          <el-tab-pane label="答覆意見" name="third">
            <h3>答覆意見</h3>
            <el-divider border-style="double" />
            <el-table
              :data="tableData3"
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
                label="圖說/章節/頁次"
                :min-width="30"
                :resizable="false"
              />
              <el-table-column
                prop="suggestion"
                label="審查意見"
                :min-width="150"
                :resizable="false"
              />
              <el-table-column
                prop="response"
                label="答覆內容"
                :resizable="false"
              />
            </el-table>
            <h3>送審檔案</h3>
            <el-divider border-style="double" />
            <el-table
              :data="tableData4"
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
                prop="fileName"
                label="檔案名稱"
                :min-width="100"
                :resizable="false"
              />
              <el-table-column
                prop="fileExplain"
                label="檔案說明"
                :resizable="false"
              />
              <el-table-column
                prop="uploadTime"
                label="上傳時間"
                :resizable="false"
              />
              <el-table-column :resizable="false">
                <template #default>
                  <a href="http://">查閱</a>
                </template>
              </el-table-column>
            </el-table>
            <h3>附件檔案</h3>
            <el-divider border-style="double" />
            <el-table
              :data="tableData5"
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
                prop="fileName"
                label="檔案名稱"
                :min-width="100"
                :resizable="false"
              />
              <el-table-column
                prop="fileExplain"
                label="檔案說明"
                :resizable="false"
              />
              <el-table-column
                prop="uploadTime"
                label="上傳時間"
                :resizable="false"
              />
              <el-table-column :resizable="false">
                <template #default>
                  <a href="http://">查閱</a>
                </template>
              </el-table-column>
            </el-table>
          </el-tab-pane>
          <!-- <el-tab-pane label="計價項目" name="seventh">計價項目</el-tab-pane>
          <el-tab-pane label="關聯案件" name="eighth">關聯案件</el-tab-pane>
          <el-tab-pane label="送審檔案" name="ninth">送審檔案</el-tab-pane>
          <el-tab-pane label="附件檔案" name="tenth">附件檔案</el-tab-pane> -->
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
import { ref } from "vue";
import type { TabsPaneContext } from "element-plus";

const activeName = ref("first");

const handleClick = (tab: TabsPaneContext, event: Event) => {
  console.log(tab, event);
};
const tableData1 = [
  {
    unit: "綜 規 處",
    condition: "結案",
    opinion: "檢視",
    result: "『A』接受",
    date: "111年5月1日 08:30",
  },
  {
    unit: "工 管 處",
    condition: "結案",
    opinion: "檢視",
    result: "『A』接受",
    date: "111年5月1日 08:30",
  },
  {
    unit: "一區工程處土 六 所",
    condition: "結案",
    opinion: "檢視",
    result: "『F』同意備查",
    date: "111年5月1日 08:30",
  },
  {
    unit: "一區工程處土 木 科",
    condition: "結案",
    opinion: "檢視",
    result: "『F』同意備查",
    date: "111年5月1日 08:30",
  },
  {
    unit: "一區工程處水電環控科",
    condition: "結案",
    opinion: "檢視",
    result: "『F』同意備查",
    date: "111年5月1日 08:30",
  },
];

const tableData2 = [
  {
    unit: "土 建 處/黃作元(線上簽核方式送審)",
    condition: "結案",
    opinion: "檢視",
    result: "『A』接受",
    date: "111年5月1日 08:30",
  },
  {
    unit: "土 建 處/朱慶村(線上簽核方式送審)",
    condition: "結案",
    opinion: "檢視",
    result: "『F』同意備查",
    date: "111年5月1日 08:30",
  },
  {
    unit: "土 建 處/高雪莉(線上簽核方式送審)",
    condition: "結案",
    opinion: "檢視",
    result: "『A』接受",
    date: "111年5月1日 08:30",
  },
  {
    unit: "一區工程處水電環控科",
    condition: "結案",
    opinion: "檢視",
    result: "『F』同意備查",
    date: "111年5月1日 08:30",
  },
];

const tableData3 = [
  {
    suggestion: "無意見(二區工程處材試所)",
    response: "N/A",
  },
];
const tableData4 = [
  {
    fileName: "0505E-11_Rev.0.docx",
    fileExplain: "0505E-11_Rev.0_WORD",
    uploadTime: "111年10月17日13時34分18秒",
  },
];
const tableData5 = [
  {
    fileName: "APN11-201_221018-122637-1dc.pdf",
    fileExplain: "工審單(二區工程處)",
    uploadTime: "111年10月18日12時43分31秒",
  },
];
</script>
