<template>
  <div>

            
    <el-table :data="tableData" style="width: 100%">
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
                :placeholder="`请输入${item.label}`"
                @change="handleEdit(scope.$index, scope.row)"
              />
            </template>
          </div>
          <div
            v-show="!item.editable && !scope.row.editable"
            class="editable-row"
          >
            <span class="editable-row-span">{{ scope.row[item.prop] }}</span>
            <el-popover
              placement="right"
              :width="120"
              trigger="hover"
              content="this is content, this is content, this is content"
            >
              <template #reference>
                <el-icon class="icon" :size="18">
                  <Edit />
                </el-icon>
              </template>
              <div class="menu-list">
                <div
                  class="menu-item"
                  @click="prepend(scope.$index)"
                >
                  上方插入一行
                </div>
              </div>
            </el-popover>
          </div>
        </template>
      </el-table-column>
      <el-table-column label="註銷">
        <template #default="scope">
          <el-button
            size="small"
            type="danger"
            @click="handleDelete(scope.$index)"
            >删除</el-button
          >
        </template>
      </el-table-column>
      <el-table-column label="代碼維護">
        <template #default="scope">
          <el-button
            v-show="!scope.row.editable"
            size="small"
            @click="scope.row.editable = true"
            >编辑</el-button
          >
          <el-button
            v-show="scope.row.editable"
            size="small"
            type="success"
            @click="scope.row.editable = false"
            >确定</el-button
          >
        </template>
      </el-table-column>
    </el-table>
  </div>
</template>
<script>
import { 
  Search,
  Edit
} from '@element-plus/icons-vue';
const item = {
  number: '',
  conditionCode: '',
  conditionInstruction: '',
}
export default {
  name: "testTable",
  data() {
    return {
      tableHeader: [
        {
          prop: "number",
          label: "序號",
          editable: false,
          type: "input",
        },
        {
          prop: "conditionCode",
          label: "狀態代號",
          editable: false,
          type: "input"
        },
        {
          prop: "conditionInstruction",
          label: "狀態說明",
          editable: false,
          type: "input"
        }
      ],
      tableData: [{
        number: '1',
        conditionCode: "00",
        conditionInstruction: "退件(已簽收結案)"
      }, {
        number: '2',
        conditionCode: "01",
        conditionInstruction: "退件(尚未簽收結案)"
      }, {
        number: '3',
        conditionCode: "02",
        conditionInstruction: "退回/抽回"
      }, {
        number: '4',
        conditionCode: "03",
        conditionInstruction: "案件登錄"
      }, {
        number: '5',
        conditionCode: "04",
        conditionInstruction: "廠商簽章中"
      }, {
        number: '6',
        conditionCode: "05",
        conditionInstruction: "廠商簽章完成"
      }, {
        number: '7',
        conditionCode: "09",
        conditionInstruction: "廠商送件"
      }, {
        number: '8',
        conditionCode: "11",
        conditionInstruction: "窗口接收"
      }, {
        number: '9',
        conditionCode: "12",
        conditionInstruction: "設定回覆及結案日期"
      }, {
        number: '10',
        conditionCode: "13",
        conditionInstruction: "窗口分案"
      }, {
        number: '11',
        conditionCode: "14",
        conditionInstruction: "單位窗口改分案"
      }, {
        number: '12',
        conditionCode: "20",
        conditionInstruction: "返回上一流程"
      }, {
        number: '13',
        conditionCode: "30",
        conditionInstruction: "承辦退籤"
      }, {
        number: '14',
        conditionCode: "31",
        conditionInstruction: "承辦中(簽收)"
      }]
    }
  },
  methods: {
    handleEdit(row) {
      row.editable = true;
    },
    handleDelete(index) {
      this.tableData.splice(index, 1);
    },
    prepend(index) {
      item.editable = true;
      this.tableData.splice(index, 0, item);
    },
  }
}
</script>