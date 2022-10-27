<script lang="ts" setup>
import { reactive, ref } from 'vue'
import { Search, Edit, Delete } from '@element-plus/icons-vue'

const search = ref('')
// navbar
const activeIndex = ref('1')
const handleSelect = (key: string, keyPath: string[]) => {
  console.log(key, keyPath)
}
// dialogAddItem
const dialogFormVisible = ref(false)
const openLabeling = ref(false)
const formLabelWidth = '100px'

// labeling選項
const form = reactive({
  userName: '',
  name: '',
  com_Name: '',  
  UniformNumbers: '',
  labeling: '',
})

const formLabeling = reactive({
  labeling: '',
})

const labeling = ref<string[]>([])
const optionsLabeling = [
  {
    labeling: 'CF620',
    label: 'CF620',
  },
  {
    labeling: 'CF624G',
    label: 'CF624G',
  },
  {
    labeling: 'CF680C',
    label: 'CF680C',
  },
]

// labelingMain選項
const labelingMain = ref<string[]>([])
const optionsLabelingMain = [
  {
    labelingMain: 'CF620',
    label: 'CF620',
  },
  {
    labelingMain: 'CF624G',
    label: 'CF624G',
  },
  {
    labelingMain: 'CF680C',
    label: 'CF680C',
  },
]

// const item = {
//   userName: '' ,
//   name: '' ,
//   com_Name: '' ,
//   accessCondition: '' ,
//   accessType: '' ,
// }

const tableHeader = ref([
        {
          prop: "userName",
          label: "帳號",
          editable: false,
        }, {
          prop: "name",
          label: "姓名",
          editable: false,
        }, {
          prop: "com_Name",
          label: "公司名稱",
          editable: false,
        }, {
          prop: "accessCondition",
          label: "權限狀態",
          editable: false,
        }, {
          prop: "accessType",
          label: "權限種類",
          editable: false,
        }
        ])

const tableData = ref([
      {
        userName: "D0002612",
        name: "楊明耀",
        com_Name: "正堯工程顧問股份有限公司",
        accessCondition: "有效",
        accessType: "審查權限",
        labeling: '',
      }, {
        userName: "D0002611",
        name: "黃健翔",
        com_Name: "中興工程顧問股份有限公司",
        accessCondition: "有效",
        accessType: "審查權限",
        labeling: '',
      }, {
        userName: "D0002610",
        name: "林彥良",
        com_Name: "中興工程顧問股份有限公司",
        accessCondition: "有效",
        accessType: "審查權限",
        labeling: '',
      }, {
        userName: "D0002609",
        name: "李宗桓",
        com_Name: "中興工程顧問股份有限公司",
        accessCondition: "有效",
        accessType: "審查權限",
        labeling: '',
      }, {
        userName: "D0002608",
        name: "李玢琦",
        com_Name: "股份有限公司",
        accessCondition: "有效",
        accessType: "審查權限",
        labeling: '',
      }, {
        userName: "D0002607",
        name: "劉兆宸",
        com_Name: "股份有限公司",
        accessCondition: "有效",
        accessType: "審查權限",
        labeling: '',
      }, {
        userName: "D0002606",
        name: "趙坤銘",
        com_Name: "千惠園藝社",
        accessCondition: "有效",
        accessType: "審查權限",
        labeling: '',
      }, {
        userName: "D0002604",
        name: "陳南宏",
        com_Name: "綠野國際建築師事務所",
        accessCondition: "有效",
        accessType: "審查權限",
        labeling: '',
      }, {
        userName: "D0002603",
        name: "吳政育",
        com_Name: "綠野國際建築師事務所",
        accessCondition: "有效",
        accessType: "審查權限",
        labeling: '',
      }, {
        userName: "D0002602",
        name: "顏家宏",
        com_Name: "綠野國際建築師事務所",
        accessCondition: "有效",
        accessType: "審查權限",
        labeling: '',
      }, {
        userName: "D0002601",
        name: "羅叡遠",
        com_Name: "綠野國際建築師事務所",
        accessCondition: "有效",
        accessType: "審查權限",
        labeling: '',
      }, {
        userName: "D0002600",
        name: "張佳文",
        com_Name: "大陸工程股份有限公司",
        accessCondition: "有效",
        accessType: "審查權限",
        labeling: '',
      }, {
        userName: "D0002599",
        name: "蔡惠婷",
        com_Name: "法商阿爾斯通運輸股份有限公司",
        accessCondition: "有效",
        accessType: "審查權限",
        labeling: '',
      }, {
        userName: "D0002598",
        name: "林浩輝",
        com_Name: "台北市停車管理工程處",
        accessCondition: "有效",
        accessType: "審查權限",
        labeling: '',
      }, {
        userName: "D0002596",
        name: "趙祥廷",
        com_Name: "千惠園藝社",
        accessCondition: "有效",
        accessType: "審查權限",
        labeling: '',
      },
])

// 註銷開關
// const deleteOn = ref(true)

</script>
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
          <el-menu
    :default-active="activeIndex"
    class="el-menu-demo index_row"
    mode="horizontal"
    @select="handleSelect"
  >
    <el-menu-item index="2"><a href="../access_setting/index.html">權限設定</a></el-menu-item>
    <!-- <el-menu-item index="3"><a href="../individual_words/index.html">個人使用詞彙</a></el-menu-item> -->
    <el-menu-item index="4"><a href="../item_codes/index.html">送審項目代碼</a></el-menu-item>
    <el-menu-item index="5"><a href="../resualt_codes/index.html">送審結果代碼</a></el-menu-item>
    <el-menu-item index="6"><a href="../condition_codes/index.html">案件狀態代碼</a></el-menu-item>
    <el-menu-item index="1"><a href="../com_using_right/index.html">廠商使用權限</a></el-menu-item>
  </el-menu>
    <div class="maintenance_h3">廠商使用權限維護</div>

    <div class="maintenance_tool_wrap">
        <div class="maintenance_search">
    <el-input
      v-model="search"
      placeholder="搜尋"
      class="input-with-select"
      :suffix-icon="Search"
    >
    </el-input>
  </div>

  <!-- dialogAddItem -->
  <template class="maintenance_add_wrap">
    <el-button class="maintenance_add" @click="dialogFormVisible = true">
    新增帳號
  </el-button>
  <el-dialog v-model="dialogFormVisible" title="新增帳號">
    <el-form :model="form">
      <el-form-item label="帳號" :label-width="formLabelWidth">
        <el-input v-model="form.userName" autocomplete="off" />
      </el-form-item>
      <el-form-item label="姓名" :label-width="formLabelWidth">
        <el-input v-model="form.name" autocomplete="off" />
      </el-form-item>
      <el-form-item label="公司名稱" :label-width="formLabelWidth">
        <el-input v-model="form.com_Name" autocomplete="off" />
      </el-form-item>
      <el-form-item label="統一編號" :label-width="formLabelWidth">
        <el-input v-model="form.UniformNumbers" autocomplete="off" />
      </el-form-item>
      <el-form-item label="標號" :label-width="formLabelWidth">
        <el-select
            v-model="labeling"
            multiple
            filterable
            allow-create
            default-first-option
            :reserve-keyword="false"
            placeholder="請選擇"
            >
            <el-option
                v-for="item in optionsLabeling"
                :key="item.labeling"
                :label="item.label"
                :value="item.labeling"
                />
        </el-select>
      </el-form-item>
      <!-- <el-form-item label="Zones" :label-width="formLabelWidth">
        <el-select v-model="form.region" placeholder="Please select a zone">
          <el-option label="Zone No.1" value="shanghai" />
          <el-option label="Zone No.2" value="beijing" />
        </el-select>
      </el-form-item> -->
    </el-form>
    <template #footer>
      <span class="dialog-footer">
        <el-button @click="dialogFormVisible = false">Cancel</el-button>
        <el-button type="primary" @click="dialogFormVisible = false">
          Confirm
        </el-button>
      </span>
    </template>
  </el-dialog>
</template>
  <!-- <el-button class="maintenance_add" @click="onAddItem">新增帳號</el-button> -->
</div>

        <el-table 
            :data="tableData" 
            class="tableComUsing"
            border 
            stripe 
            style="width: 100%;" 
            :header-cell-style="{ background: '#ebf4f9', color: '#000', textAlign: 'center'}">
            <el-table-column type="index" label="序號" width="70" min-width="50" :resizable="false"/>
    <el-table-column 
        :prop="item.prop"
        :label="item.label"
        v-for="(item, index) in tableHeader"
        :key="item.prop"
        class="tableColumnCom"
        :resizable="false"
        >
        <!-- <template #default="scope">
          <div
            v-show="item.editable || scope.row.editable"
            class="editable-row"
          >
            <template v-if="item.type === 'input'">
              <el-input
                size="small"
                v-model="scope.row[item.prop]"
                :placeholder="`請輸入${item.label}`"
                @change="handleEdit(scope.$index, scope.row)"
              />
            </template>
          </div>
          <div
            v-show="!item.editable && !scope.row.editable"
            class="editable-row"
          >
            <span class="editable-row-span">{{ scope.row[item.prop] }}</span>
          </div>
        </template> -->
    </el-table-column>
    <el-table-column label="註銷" width="100" min-width="50" :resizable="false">
      <template #default="scope">
          <el-switch v-model="scope.row.deleteOn" />
        </template>
    </el-table-column>
    <el-table-column label="標號維護" width="100" min-width="50" :resizable="false">
      <template #default>
        <el-button
            link
            @click="openLabeling = true"
            class="button_edit"
            >
            <img src="../../assets/icon04.png" style="width: 24px; vertical-align: bottom" alt="">
        </el-button>
  <el-dialog v-model="openLabeling" title="標號維護">
    <el-form :model="formLabeling">
      <el-form-item label="Zones" :label-width="formLabelWidth">
        <el-select v-model="labelingMain" placeholder="Please select a zone">
                                <el-option
                                    v-for="item in optionsLabelingMain"
                                    :key="item.labelingMain"
                                    :label="item.label"
                                    :value="item.labelingMain"
                                    />
        </el-select>
      </el-form-item>
    </el-form>
    <template #footer>
      <span class="dialog-footer">
        <el-button @click="dialogFormVisible = false">Cancel</el-button>
        <el-button type="primary" @click="dialogFormVisible = false">
          Confirm
        </el-button>
      </span>
    </template>
  </el-dialog>
      </template>
      <!-- <template #default="scope">
        <el-button
            link
            size="small" 
            v-show="!scope.row.editable" 
            @click="scope.row.editable = true"
            class="button_edit"
            >
            <img src="../../assets/icon04.png" style="width: 24px; vertical-align: bottom" alt="">
        </el-button>
        <el-button
            link
            size="small"
            v-show="scope.row.editable"
            @click="scope.row.editable = false"
            >
            <img src="../../assets/icon04.png" style="width: 24px; vertical-align: bottom" alt="">
        </el-button>
      </template> -->
    </el-table-column>
  </el-table>
      </el-main>
    </el-container>
</template>

