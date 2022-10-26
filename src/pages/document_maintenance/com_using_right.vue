<script lang="ts" setup>
import { ref } from 'vue'
import { Search, Edit, Delete } from '@element-plus/icons-vue'

// navbar
const activeIndex = ref('1')
const handleSelect = (key: string, keyPath: string[]) => {
  console.log(key, keyPath)
}


const input3 = ref('')

const item = {
  userName: '' ,
  name: '' ,
  units: '' ,
  accessCondition: '' ,
  accessType: '' ,

}

const tableHeader = ref([
        {
          prop: "userName",
          label: "帳號",
          editable: false,
          type: "input"
        }, {
          prop: "name",
          label: "姓名",
          editable: false,
          type: "input"
        }, {
          prop: "units",
          label: "單位",
          editable: false,
          type: "input"
        }, {
          prop: "accessCondition",
          label: "權限狀態",
          editable: false,
          type: "input"
        }, {
          prop: "accessType",
          label: "權限種類",
          editable: false,
          type: "input"
        }, 
        // {
        //   prop: "labeling",
        //   label: "標號",
        //   editable: false,
        //   type: "input"
        // },
        ])

const tableData = ref([
      {
        userName: "D0002612",
        name: "楊明耀",
        units: "正堯工程顧問股份有限公司",
        accessCondition: "有效",
        accessType: "審查權限",
        labeling: '',
      }, {
        userName: "D0002611",
        name: "黃健翔",
        units: "中興工程顧問股份有限公司",
        accessCondition: "有效",
        accessType: "審查權限",
        labeling: '',
      }, {
        userName: "D0002610",
        name: "林彥良",
        units: "中興工程顧問股份有限公司",
        accessCondition: "有效",
        accessType: "審查權限",
        labeling: '',
      }, {
        userName: "D0002609",
        name: "李宗桓",
        units: "中興工程顧問股份有限公司",
        accessCondition: "有效",
        accessType: "審查權限",
        labeling: '',
      }, {
        userName: "D0002608",
        name: "李玢琦",
        units: "股份有限公司",
        accessCondition: "有效",
        accessType: "審查權限",
        labeling: '',
      }, {
        userName: "D0002607",
        name: "劉兆宸",
        units: "股份有限公司",
        accessCondition: "有效",
        accessType: "審查權限",
        labeling: '',
      }, {
        userName: "D0002606",
        name: "趙坤銘",
        units: "千惠園藝社",
        accessCondition: "有效",
        accessType: "審查權限",
        labeling: '',
      }, {
        userName: "D0002604",
        name: "陳南宏",
        units: "綠野國際建築師事務所",
        accessCondition: "有效",
        accessType: "審查權限",
        labeling: '',
      }, {
        userName: "D0002603",
        name: "吳政育",
        units: "綠野國際建築師事務所",
        accessCondition: "有效",
        accessType: "審查權限",
        labeling: '',
      }, {
        userName: "D0002602",
        name: "顏家宏",
        units: "綠野國際建築師事務所",
        accessCondition: "有效",
        accessType: "審查權限",
        labeling: '',
      }, {
        userName: "D0002601",
        name: "羅叡遠",
        units: "綠野國際建築師事務所",
        accessCondition: "有效",
        accessType: "審查權限",
        labeling: '',
      }, {
        userName: "D0002600",
        name: "張佳文",
        units: "大陸工程股份有限公司",
        accessCondition: "有效",
        accessType: "審查權限",
        labeling: '',
      }, {
        userName: "D0002599",
        name: "蔡惠婷",
        units: "法商阿爾斯通運輸股份有限公司",
        accessCondition: "有效",
        accessType: "審查權限",
        labeling: '',
      }, {
        userName: "D0002598",
        name: "林浩輝",
        units: "台北市停車管理工程處",
        accessCondition: "有效",
        accessType: "審查權限",
        labeling: '',
      }, {
        userName: "D0002596",
        name: "趙祥廷",
        units: "千惠園藝社",
        accessCondition: "有效",
        accessType: "審查權限",
        labeling: '',
      },
])

// 註銷開關
const deleteOn = ref(true)

const deleteRow = (index: number) => {
  tableData.value.splice(index, 1)
}


const onAddItem = () => {  
  item.editable = true;
  tableData.value.push(item)
}


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
    <el-menu-item index="3"><a href="../individual_words/index.html">個人使用詞彙</a></el-menu-item>
    <el-menu-item index="4"><a href="../item_codes/index.html">送審項目代碼</a></el-menu-item>
    <el-menu-item index="5"><a href="../resualt_codes/index.html">送審結果代碼</a></el-menu-item>
    <el-menu-item index="6"><a href="../condition_codes/index.html">案件狀態代碼</a></el-menu-item>
    <el-menu-item index="1"><a href="../com_using_right/index.html">廠商使用權限</a></el-menu-item>
  </el-menu>
    <div class="maintenance_h3">廠商使用權限維護</div>

    <div class="maintenance_tool_wrap">
        <div class="maintenance_search">
    <el-input
      v-model="input3"
      placeholder="搜尋"
      class="input-with-select"      
      :suffix-icon="Search"
    >
    </el-input>
  </div>

  <el-button class="maintenance_add" @click="onAddItem">新增帳號</el-button>
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
        <template #default="scope">
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
        </template>
    </el-table-column>
    <el-table-column label="註銷" width="100" min-width="50" :resizable="false">
      <template #default="scope">
          <!-- <el-button
            link
            size="small"
            @click="deleteRow(scope.$index)"
            class="button_delete"
            :icon="Delete"
            >
          </el-button> -->
          <el-switch v-model="deleteOn" />
        </template>
    </el-table-column>
    <el-table-column label="標號維護" width="100" min-width="50" :resizable="false">
      <template #default="scope">
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
      </template>
    </el-table-column>
  </el-table>
      </el-main>
    </el-container>
</template>

