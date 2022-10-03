<script lang="ts" setup>
import { ref } from 'vue'
import { ElMessage, ElMessageBox } from 'element-plus'
import { Search, Edit, Delete } from '@element-plus/icons-vue'




const input3 = ref('')



const item = {
  wordsName: '',
}

const tableHeader = ref([
        {
          prop: "wordsName",
          label: "詞彙名稱",
          editable: false,
          type: "input"
        }
        ])

const tableData = ref([
      {
        wordsName: "",
      },
])


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
        <el-row class="index_row">
          <a href="../individual_words/index.html">
            <el-button class="index_button" round>個人使用詞彙</el-button>
          </a>
          <a href="../item_codes/index.html">
            <el-button class="index_button" round>送審項目代碼</el-button>
          </a>
          <a href="../resualt_codes/index.html">
            <el-button class="index_button" round>送審結果代碼</el-button>
          </a>
          <a href="../condition_codes/index.html">
            <el-button class="index_button" round>案件狀態代碼</el-button>
          </a>
          <a href="../com_using_right/index.html">
            <el-button class="index_button" round>廠商使用權限</el-button>
          </a>
        </el-row>

    <div class="maintenance_h3">技術文件【個人使用詞彙】維護</div>

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

  <el-button class="maintenance_add" @click="onAddItem">新增詞彙</el-button>
</div>
        <el-table 
            :data="tableData" 
            border 
            stripe 
            style="width: 100%;" 
            :header-cell-style="{ background: '#ebf4f9', color: '#000', textAlign: 'center'}">
            <el-table-column type="index" label="序號" width="70" min-width="50"/>
    <el-table-column 
        :prop="item.prop"
        :label="item.label"
        v-for="(item, index) in tableHeader"
        :key="item.prop"
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
    <el-table-column label="" width="70" min-width="50">
      <template #default="scope">
          <el-button
            link
            size="small"
            @click="deleteRow(scope.$index)"
            class="button_delete"
            :icon="Delete"
            >
          </el-button>
        </template>
    </el-table-column>
    <el-table-column label="" width="70" min-width="50">
      <template #default="scope">
        <el-button
            link
            size="small" 
            v-show="!scope.row.editable" 
            @click="scope.row.editable = true"
            class="button_edit"
            :icon="Edit"
            >
        </el-button>
        <el-button
            link
            size="small"
            v-show="scope.row.editable"
            @click="scope.row.editable = false"
            class="button_edit"
            :icon="Edit"
            >
        </el-button>
      </template>
    </el-table-column>
  </el-table>
    <!-- <table_words /> -->
      </el-main>
    </el-container>
</template>

