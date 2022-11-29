<template>
  <el-config-provider :locale="locale"></el-config-provider>
  <el-container>
    <el-header>
      <a href="../../index.html">
        <h1>TARF2技術文件線上簽核系統</h1>
      </a>
      <h3>權限設定</h3>
      <p>蘇家淇(11548)</p>
    </el-header>
    <el-main>
      <el-menu
        :default-active="activeIndex"
        class="el-menu-demo index_row"
        mode="horizontal"
        @select="handleSelect"
      >
        <el-menu-item index="1"
          ><a href="../access_setting/index.html">權限設定</a></el-menu-item
        >
        <el-menu-item index="2"
          ><a href="../individual_words/index.html"
            >個人使用詞彙</a
          ></el-menu-item
        >
        <el-menu-item index="3"
          ><a href="../item_codes/index.html">系統資料維護</a></el-menu-item
        >
        <!-- <el-menu-item index="3"
          ><a href="../item_codes/index.html">送審項目代碼</a></el-menu-item
        >
        <el-menu-item index="4"
          ><a href="../resualt_codes/index.html">送審結果代碼</a></el-menu-item
        >
        <el-menu-item index="5"
          ><a href="../condition_codes/index.html"
            >案件狀態代碼</a
          ></el-menu-item
        >
        <el-menu-item index="6"
          ><a href="../com_using_right/index.html"
            >廠商使用權限</a
          ></el-menu-item
        > -->
      </el-menu>
      <div class="access_select">
        <div class="select_box_wrap">
          <div class="select_h3">兼任其他單位聯絡窗口</div>
          <div class="select_box">
            <el-select
              v-model="valueContact"
              filterable
              default-first-option
              :reserve-keyword="false"
              placeholder="請選擇"
            >
              <el-option
                v-for="item in optionsContact"
                :key="item.depA_CODE"
                :label="item.depA_NAME"
                :value="item.depA_CODE"
                @click="openContactInfo(item.depA_CODE)"
              />
            </el-select>
          </div>
        </div>
        <div class="select_box_wrap">
          <div class="select_h3">代理人設定</div>
          <div class="select_box">
            <el-select
              v-model="valueSetting"
              @change="change"
              multiple
              filterable
              default-first-option
              :reserve-keyword="false"
              placeholder="請選擇"
            >
              <el-option
                v-for="(item, index) in optionsSettingLabel"
                :key="index"
                :label="item.empL_NAME_AGENT"
                :value="item.empL_NAME_AGENT + ';' + item.empL_SERI_AGENT"
              />
            </el-select>
          </div>
        </div>
      </div>
      <div class="access_button_wrap">
        <div class="access_button_exit access_button">
          <a href="../index_maintenance/index.html">離開</a>
        </div>
        <div class="access_button_save access_button">
          <el-button @click="onSubmitSetting">儲存</el-button>
        </div>
      </div>

      <el-form :model="contactInfo">
        <el-dialog v-model="dialogTableVisible" title="現有聯絡窗口資訊">
          <el-descriptions :column="1" border>
            <el-descriptions-item
              label="單位名稱"
              label-align="right"
              align="center"
              label-class-name="my-label"
              class-name="my-content"
              v-for="item in contactInfo"
              :key="item.depT_NO"
              >{{ item.depT_NO }}
            </el-descriptions-item>
            <el-descriptions-item
              label="員工編號"
              label-align="right"
              align="center"
              v-for="item in contactInfo"
              :key="item.empL_SERI"
              >{{ item.empL_SERI }}</el-descriptions-item
            >
            <el-descriptions-item
              label="員工姓名"
              label-align="right"
              align="center"
              v-for="item in contactInfo"
              :key="item.empL_NAME"
              >{{ item.empL_NAME }}</el-descriptions-item
            >
            <el-descriptions-item
              label="建立日期"
              label-align="right"
              align="center"
              v-for="item in contactInfo"
              :key="item.iN_DATE"
              >{{ item.iN_DATE }}</el-descriptions-item
            >
            <el-descriptions-item
              label="使用狀態"
              label-align="right"
              align="center"
              v-for="item in contactInfo"
              :key="item.status"
              >{{ item.status }}</el-descriptions-item
            >
          </el-descriptions>
          <template #footer>
            <span class="dialog-footer">
              <el-button @click="dialogTableVisible = false">取消</el-button>
              <el-button type="primary" @click="onSubmitContact(valueContact)">
                儲存兼任窗口
              </el-button>
            </span>
          </template>
        </el-dialog>
      </el-form>
    </el-main>
  </el-container>
</template>
<script lang="ts" setup>
  import { computed, reactive, ref, onMounted } from "vue"
  import zhTw from "element-plus/dist/locale/zh-tw"
  import en from "element-plus/es/locale/lang/en"
  import axios from "axios"

  const language = ref("zh-tw")
  const locale = computed(() => (language.value === "zh-tw" ? zhTw : en))
  const dialogTableVisible = ref(false)
  // navbar
  const activeIndex = ref("1")
  const handleSelect = (key: string, keyPath: string[]) => {
    console.log(key, keyPath)
  }

  // session
  sessionStorage.setItem("UserId", "11695")
  sessionStorage.setItem("UserName", "唐經魁")
  sessionStorage.setItem("DeptNo1", "1")
  sessionStorage.setItem("DeptNo2", "J8")
  const UserId = sessionStorage.getItem("UserId")
  const UserName = sessionStorage.getItem("UserName")
  const DeptNo1 = sessionStorage.getItem("DeptNo1")
  const DeptNo2 = sessionStorage.getItem("DeptNo2")
  const url = "/api/DeptChargOtherDept/"
  // const url = "https://localhost:7227/api/Test/"

  // 單位聯絡窗口選項
  const valueContact = ref<string[]>([])
  const optionsContact = ref()
  // 代理人設定
  const valueSetting = ref<string[]>([])
  interface valueFace {
    empL_SERI_AGENT: string
    empL_NAME_AGENT: string
  }
  const optionsSettingLabel = ref<valueFace[]>([])
  const optionsSettingValue = ref()
  const storageValue1 = reactive([])
  const storageValue2 = ref()
  // axios請求選單資料
  onMounted(() => {
    // 單位聯絡窗口選項
    const urlOptionsContact =
      url + "LoadDeptNo?UserId=" + UserId + "&DeptNo=" + DeptNo1
    console.log(urlOptionsContact)
    axios
      .get(urlOptionsContact)
      .then((res) => {
        const statusCode = res.data[0].statusCode //儲存狀態代碼
        const message = res.data[0].message //儲存狀態訊息
        // console.log(res.data)
        optionsContact.value = res.data
        if (statusCode == "1002") {
          // console.log(message)
        } else {
        }
      })
      .catch(function (error) {
        // handle error
        console.log(error)
      })

    // 讀取代理人
    const urlLoadStuffAll =
      url + "LoadStuffAll?UserId=" + UserId + "&UserName=" + UserName
    console.log(urlLoadStuffAll)
    axios
      .get(urlLoadStuffAll)
      .then((res) => {
        // valueSetting.value = res.data
        for (let i = 0; i < res.data.length; i++) {
          valueSetting.value[i] =
            res.data[i].empL_NAME_AGENT + ";" + res.data[i].empL_SERI_AGENT
        }
        console.log(valueSetting)
        // console.log(res.data)
      })
      .catch(function (error) {
        // handle error
        console.log(error)
      })

    // 代理人設定
    const urlOptionsSetting =
      url +
      "LoadDropDownList?UserId=" +
      UserId +
      "&UserName=" +
      UserName +
      "&DeptNo=" +
      DeptNo2
    // console.log(urlOptionsSetting)
    axios
      .get(urlOptionsSetting)
      .then((res) => {
        const re = /\s*(?:;|$)\s*/ // 符號分割
        const empL_NAME_AGENT = res.data[0].empL_NAME_AGENT.split(re)
        const empL_SERI_AGENT = res.data[0].empL_SERI_AGENT.split(re)
        // console.log(empL_NAME_AGENT.length)
        for (let i = 0; i < empL_NAME_AGENT.length; i++) {
          storageValue1[i] = {
            empL_SERI_AGENT: empL_SERI_AGENT[i],
            empL_NAME_AGENT: empL_NAME_AGENT[i],
          }

          optionsSettingLabel.value = storageValue1
        }
        // console.log(optionsSettingLabel.value)
      })
      .catch(function (error) {
        // handle error
        console.log(error)
      })
  })

  // 聯絡資訊
  const contactInfo = ref()
  // 單位聯絡窗口彈跳視窗
  const openContactInfo = (DeptNo) => {
    dialogTableVisible.value = true
    // console.log(row)
    // console.log(optionsContact.value[row].depA_CODE)
    const urlOptionsContact =
      url + "LoadDeptChargData?UserId=" + UserId + "&DeptNo=" + DeptNo
    console.log(urlOptionsContact)
    axios
      .get(urlOptionsContact)
      .then((res) => {
        console.log(res.data)
        contactInfo.value = res.data
      })
      .catch(function (error) {
        // handle error
        console.log(error)
      })
  }

  const onSubmitContact = (DeptNo) => {
    const urlSubmitContact =
      url + "ChargDataSavingNew?UserId=" + UserId + "&DeptNo=" + DeptNo
    axios
      .get(urlSubmitContact)
      .then((res) => {
        const statusCode = res.data[0].statusCode //儲存狀態代碼
        const message = res.data[0].message //儲存狀態訊息
        console.log(res.data)
        if (statusCode == "1002") {
          alert(message)
          // window.location.reload() //重整頁面
        } else {
          alert(message)
        }
        //console.log(res.data);
        console.log(statusCode + "Add") //狀態代碼為新增
        //console.log(tableData.value[0].statusCode);
        dialogTableVisible.value = false
      })
      .catch(function (error) {
        console.log(error)
      })
  }
  const change = () => {}
  const onSubmitSetting = () => {
    const re = /\s*(?:;|$)\s*/ // 符號分割
    const value = reactive([])
    const EmpName = reactive([])
    const EmpId = reactive([])
    for (let i = 0; i < valueSetting.value.length; i++) {
      value[i] = valueSetting.value[i].split(re)
      EmpName[i] = value[i][0]
      EmpId[i] = value[i][1]
    }
    const urlSubmitContact =
      url +
      "AgentDataSavingNew?UserId=" +
      UserId +
      "&UserName=" +
      UserName +
      "&EmpId=" +
      EmpId.join(";") +
      "&EmpName=" +
      EmpName.join(";")
    axios
      .get(urlSubmitContact)
      .then((res) => {
        const statusCode = res.data[0].statusCode //儲存狀態代碼
        const message = res.data[0].message //儲存狀態訊息
        console.log(res.data)
        if (statusCode == "1002") {
          alert(message)
          // window.location.reload() //重整頁面
        } else {
          alert(message)
        }
        console.log(statusCode + "Add") //狀態代碼為新增
      })
      .catch(function (error) {
        console.log(error)
      })
  }
</script>
