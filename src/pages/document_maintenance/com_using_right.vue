<template>
  <el-container>
    <el-header>
      <a href="../../index.html">
        <h1>TARF2技術文件線上簽核系統</h1>
      </a>
      <h3>資料維護作業</h3>
      <p>蘇家淇(11548)</p>
    </el-header>
    <el-main>
      <el-menu :default-active="activeIndex" class="el-menu-demo index_row" mode="horizontal" @select="handleSelect">
        <!-- <el-menu-item index="2"
          ><a href="../access_setting/index.html">權限設定</a></el-menu-item
        > -->
        <!-- <el-menu-item index="3"><a href="../individual_words/index.html">個人使用詞彙</a></el-menu-item> -->
        <el-menu-item index="4"><a href="../item_codes/index.html">送審項目代碼</a></el-menu-item>
        <el-menu-item index="5"><a href="../resualt_codes/index.html">送審結果代碼</a></el-menu-item>
        <el-menu-item index="6"><a href="../condition_codes/index.html">案件狀態代碼</a></el-menu-item>
        <el-menu-item index="1"><a href="../com_using_right/index.html">廠商使用權限</a></el-menu-item>
      </el-menu>
      <div class="maintenance_h3">廠商使用權限維護</div>

      <div class="maintenance_tool_wrap">
        <div class="maintenance_search">
          <el-input v-model="search" placeholder="搜尋" class="input-with-select" :suffix-icon="Search">
          </el-input>
        </div>

        <!-- dialogAddItem -->
        <template class="maintenance_add_wrap">
          <el-button class="maintenance_add" @click="dialogFormVisible = true">
            新增帳號
          </el-button>
          <el-dialog v-model="dialogFormVisible" center align-center :close-on-click-modal="false" @close="cancel"
            :before-close="cancel" title="新增帳號" :destroy-on-close="true">
            <el-form ref="ruleFormRef" :model="ruleForm" :rules="rules">
              <el-form-item label="帳號" :label-width="formLabelWidth" prop="userName">
                <el-input v-model="ruleForm.userName" @keyup.enter="submitForm(ruleFormRef)" placeholder="請輸入"
                  clearable />
              </el-form-item>
              <el-form-item label="姓名" :label-width="formLabelWidth" prop="name">
                <el-input v-model="ruleForm.name" @keyup.enter="submitForm(ruleFormRef)" placeholder="請輸入" clearable />
              </el-form-item>
              <el-form-item label="公司名稱" :label-width="formLabelWidth" prop="com_Name">
                <el-input v-model="ruleForm.com_Name" @keyup.enter="submitForm(ruleFormRef)" placeholder="請輸入"
                  clearable />
              </el-form-item>
              <el-form-item label="權限種類" :label-width="formLabelWidth" prop="accessType">
                <el-select v-model="ruleForm.accessType" multiple filterable allow-create default-first-option
                  :reserve-keyword="false" placeholder="請選擇">
                  <el-option v-for="item in optionsAccessType" :key="item.accessType" :label="item.label"
                    :value="item.accessType" />
                </el-select>
              </el-form-item>
              <el-form-item label="統一編號" :label-width="formLabelWidth" prop="UniformNumbers">
                <el-input v-model="ruleForm.UniformNumbers" @keyup.enter="submitForm(ruleFormRef)" placeholder="請輸入"
                  clearable />
              </el-form-item>
              <el-form-item label="標號" :label-width="formLabelWidth" prop="labeling">
                <el-select v-model="ruleForm.labeling" multiple filterable allow-create default-first-option
                  :reserve-keyword="false" placeholder="請選擇">
                  <el-option v-for="item in optionsLabeling" :key="item.labeling" :label="item.label"
                    :value="item.labeling" />
                </el-select>
              </el-form-item>
            </el-form>
            <template #footer>
              <span class="dialog-footer">
                <el-button @click="cancel">取消</el-button>
                <el-button native-type="submit" type="primary" @click="submitForm(ruleFormRef)">
                  儲存
                </el-button>
              </span>
            </template>
          </el-dialog>
        </template>
      </div>

      <el-table :data="tableData" class="tableComUsing" border stripe style="width: 100%" :header-cell-style="{
        background: '#ebf4f9',
        color: '#000',
        textAlign: 'center',
      }">
        <el-table-column type="index" label="序號" width="57" :resizable="false" />
        <el-table-column label="帳號" prop="userName" sortable width="160px" :resizable="false" />
        <el-table-column label="姓名" prop="name" width="130px" sortable :resizable="false" />
        <el-table-column label="公司名稱" prop="com_Name" sortable :resizable="false" />
        <el-table-column label="權限狀態" prop="accessCondition" sortable width="130px" :resizable="false" />
        <el-table-column label="權限種類" prop="accessType" sortable width="130px" :resizable="false" />
        <el-table-column label="註銷" width="89" :resizable="false">
          <template #default="scope">
            <el-switch v-model="scope.row.deleteOn" />
          </template>
        </el-table-column>
        <el-table-column label="標號維護" width="89" :resizable="false">
          <template #default="scope">
            <el-button link v-show="" @click="scope.row.openLabeling = true" class="button_edit">
              <img src="../../assets/icon04.png" style="width: 24px; vertical-align: bottom" alt="" />
            </el-button>
            <el-dialog v-model="scope.row.openLabeling" append-to-body="true" center align-center
              :close-on-click-modal="false" title="標號維護">
              <el-form :model="scope.row.formLabeling">
                <el-form-item label="標號" :label-width="formLabelWidth">
                  <el-select v-model="lableling01" multiple filterable allow-create default-first-option
                    :reserve-keyword="false" placeholder=" ">
                    <el-option v-for="item in optionsLabeling" :key="item.labeling" :label="item.label"
                      :value="item.labeling" />
                  </el-select>
                </el-form-item>
              </el-form>
              <template #footer>
                <span class="dialog-footer">
                  <el-button @click="scope.row.openLabeling = false">取消</el-button>
                  <el-button type="primary" @click="scope.row.openLabeling = false">
                    儲存
                  </el-button>
                </span>
              </template>
            </el-dialog>
          </template>
        </el-table-column>
      </el-table>
    </el-main>
  </el-container>
</template>
<script lang="ts" setup>
import { reactive, ref } from "vue";
import type { FormInstance, FormRules } from "element-plus";
import { Search } from "@element-plus/icons-vue";
// import { ElMessage, ElMessageBox } from 'element-plus'

const search = ref("");
// navbar
const activeIndex = ref("1");
const handleSelect = (key: string, keyPath: string[]) => {
  console.log(key, keyPath);
};
// dialogAddItem
const dialogFormVisible = ref(false);
// const openLabeling = ref(false)
const formLabelWidth = "100px";
// ruleForm
const ruleFormRef = ref<FormInstance>();
// 註銷開關
// const deleteOn = ref(true)
const cancel = () => {
  dialogFormVisible.value = false;
};
// 顯示或隱藏按鍵
// const showButton = ref(true)
// const getStatus = () => {
//   const used = tableData.values
// }

// labeling選項
const ruleForm = reactive({
  userName: "",
  name: "",
  com_Name: "",
  accessType: "",
  UniformNumbers: "",
  labeling: "",
});
const rules = reactive<FormRules>({
  userName: [
    { required: true, message: "請輸入帳號", trigger: "blur" },
    { min: 3, max: 20, message: "長度3到20字", trigger: "blur" },
  ],
  name: [
    {
      required: true,
      message: "請輸入姓名",
      trigger: "blur",
    },
  ],
  com_Name: [
    {
      required: true,
      message: "請輸入公司名稱",
      trigger: "blur",
    },
  ],
  accessType: [
    {
      required: true,
      message: "請選擇權限種類",
      trigger: "blur",
    },
  ],
  UniformNumbers: [
    {
      required: true,
      message: "請輸入統一編號",
      trigger: "blur",
    },
  ],
  labeling: [
    {
      required: true,
      message: "請選擇標號",
      trigger: "blur",
    },
  ],
});
const submitForm = async (formEl: FormInstance | undefined) => {
  if (!formEl) return;
  await formEl.validate((valid, fields) => {
    if (valid) {
      console.log("submit!");
      dialogFormVisible.value = false;
    } else {
      console.log("error submit!", fields);
      dialogFormVisible.value = true;
    }
  });
};

// const testEnterSubmit = () => {
//   console.log("test");
// };

// const formLabeling = reactive({
//   labeling: '',
// })

const labeling = ref<string[]>([]);
const lableling01 = ref<string[]>(["CF620", "CF680C"]);
const optionsLabeling = [
  {
    labeling: "CF620",
    label: "CF620",
  },
  {
    labeling: "CF624G",
    label: "CF624G",
  },
  {
    labeling: "CF680C",
    label: "CF680C",
  },
];

const optionsAccessType = [
  {
    accessType: "審查權限",
    label: "審查權限",
  },
  {
    accessType: "審查權限2",
    label: "審查權限2",
  },
  {
    accessType: "審查權限3",
    label: "審查權限3",
  },
];

// const handleClose = (done: () => void) => {
//   ElMessageBox.confirm('確定取消儲存?',
//     {
//       confirmButtonText: '是',
//       cancelButtonText: '否',
//     })
//     .then(() => {
//       done()
//     })
//     .catch(() => {
//       // catch error
//     })
// }

// labelingMain選項
// const labelingMain = ref<string[]>([])
// const optionsLabelingMain = [
//   {
//     labelingMain: 'CF620',
//     label: 'CF620',
//   },
//   {
//     labelingMain: 'CF624G',
//     label: 'CF624G',
//   },
//   {
//     labelingMain: 'CF680C',
//     label: 'CF680C',
//   },
// ]

// const item = {
//   userName: '' ,
//   name: '' ,
//   com_Name: '' ,
//   accessCondition: '' ,
//   accessType: '' ,
// }

// table
// const tableHeader = ref([
//   {
//     prop: "userName",
//     label: "帳號",
//     editable: false,
//   },
//   {
//     prop: "name",
//     label: "姓名",
//     editable: false,
//   },
//   {
//     prop: "com_Name",
//     label: "公司名稱",
//     editable: false,
//   },
//   {
//     prop: "accessCondition",
//     label: "權限狀態",
//     editable: false,
//   },
//   {
//     prop: "accessType",
//     label: "權限種類",
//     editable: false,
//   },
// ]);

const tableData = [
  {
    userName: "D0002612",
    name: "楊明耀",
    com_Name: "正堯工程顧問股份有限公司",
    accessCondition: "有效",
    accessType: "審查權限",
    labeling: "",
    used: '1'
  },
  {
    userName: "D0002611",
    name: "黃健翔",
    com_Name: "中興工程顧問股份有限公司",
    accessCondition: "有效",
    accessType: "審查權限",
    labeling: "",
    used: '0'
  },
  {
    userName: "D0002610",
    name: "林彥良",
    com_Name: "中興工程顧問股份有限公司",
    accessCondition: "有效",
    accessType: "審查權限",
    labeling: "",
    used: '1'
  },
  {
    userName: "D0002609",
    name: "李宗桓",
    com_Name: "中興工程顧問股份有限公司",
    accessCondition: "有效",
    accessType: "審查權限",
    labeling: "",
    used: '1'
  },
  {
    userName: "D0002608",
    name: "李玢琦",
    com_Name: "00股份有限公司",
    accessCondition: "有效",
    accessType: "審查權限",
    labeling: "",
    used: '1'
  },
  {
    userName: "D0002607",
    name: "劉兆宸",
    com_Name: "00股份有限公司",
    accessCondition: "有效",
    accessType: "審查權限",
    labeling: "",
    used: '1'
  },
  {
    userName: "D0002606",
    name: "趙坤銘",
    com_Name: "千惠園藝社",
    accessCondition: "有效",
    accessType: "審查權限",
    labeling: "",
    used: '1'
  },
  {
    userName: "D0002604",
    name: "陳南宏",
    com_Name: "綠野國際建築師事務所",
    accessCondition: "有效",
    accessType: "審查權限",
    labeling: "",
    used: '1'
  },
  {
    userName: "D0002603",
    name: "吳政育",
    com_Name: "綠野國際建築師事務所",
    accessCondition: "有效",
    accessType: "審查權限",
    labeling: "",
    used: '1'
  },
  {
    userName: "D0002602",
    name: "顏家宏",
    com_Name: "綠野國際建築師事務所",
    accessCondition: "有效",
    accessType: "審查權限",
    labeling: "",
    used: '1'
  },
  {
    userName: "D0002601",
    name: "羅叡遠",
    com_Name: "綠野國際建築師事務所",
    accessCondition: "有效",
    accessType: "審查權限",
    labeling: "",
    used: '1'
  },
  {
    userName: "D0002600",
    name: "張佳文",
    com_Name: "大陸工程股份有限公司",
    accessCondition: "有效",
    accessType: "審查權限",
    labeling: "",
    used: '1'
  },
  {
    userName: "D0002599",
    name: "蔡惠婷",
    com_Name: "法商阿爾斯通運輸股份有限公司",
    accessCondition: "有效",
    accessType: "審查權限",
    labeling: "",
    used: '1'
  },
  {
    userName: "D0002598",
    name: "林浩輝",
    com_Name: "台北市停車管理工程處",
    accessCondition: "有效",
    accessType: "審查權限",
    labeling: "",
    used: '1'
  },
  {
    userName: "D0002596",
    name: "趙祥廷",
    com_Name: "千惠園藝社",
    accessCondition: "有效",
    accessType: "審查權限",
    labeling: "",
    used: '1'
  },
];

</script>
