<template>
  <div class="attr-table">
    <el-row :gutter="20">
      <el-col :span="10">
        <el-date-picker style="width: 100%" @change="timeChange" v-model="timeRange" type="datetimerange" range-separator="-" start-placeholder="开始时间" end-placeholder="结束时间" />
      </el-col>
      <el-col :span="6">
        <el-input @clear="searchClearFn" clearable v-model="dataForm.attr" placeholder="属性编码" />
      </el-col>
      <el-col :span="4">
        <el-button type="primary" @click="getData">查询</el-button>
      </el-col>
    </el-row>
    <br />
    <el-row :gutter="20">
      <el-col :span="24" style="text-align: right">
        <el-button @click="addAttr()" type="primary">新增</el-button>
        <el-button @click="save()" type="warning">保存</el-button>
        <el-button @click="deleteRow" type="danger">删除</el-button>
      </el-col>
    </el-row>
    <br />
    <div class="main-table">
      <el-table ref="attrTableRef" @selection-change="handleSelectionChange" v-loading="loading" :data="tableData" style="width: 100%">
        <el-table-column type="selection" width="55" />
        <el-table-column prop="ts" label="时间">
          <template v-slot="scope">
            <el-form :ref="`formRef${scope.$index}ts`" v-if="scope.row.ts_editing" :model="scope.row">
              <el-form-item prop="ts" :rules="{ required: true, message: '请输入时间', trigger: 'blur' }">
                <el-date-picker format="YYYY-MM-DD HH:mm:ss" value-format="YYYY-MM-DD HH:mm:ss" v-model="scope.row.ts" type="datetime" placeholder="时间"> </el-date-picker>
              </el-form-item>
            </el-form>
            <span v-else @click="itemClick(scope)" class="fill-p">{{ scope.row.ts }}</span>
          </template>
        </el-table-column>
        <el-table-column prop="key" label="属性编码">
          <template v-slot="scope">
            <el-form :ref="`formRef${scope.$index}key`" v-if="scope.row.key_editing" :model="scope.row">
              <el-form-item prop="key" :rules="{ required: true, message: '请输入属性编码', trigger: 'blur' }">
                <el-input type="text" size="small" v-model="scope.row.key" placeholder="属性编码" />
              </el-form-item>
            </el-form>
            <span @click="itemClick(scope)" class="fill-p" v-else>{{ scope.row.key }}</span>
          </template>
        </el-table-column>
        <el-table-column prop="value" label="属性值">
          <template v-slot="scope">
            <el-form :ref="`formRef${scope.$index}value`" v-if="scope.row.value_editing" :model="scope.row">
              <el-form-item prop="value" :rules="{ required: true, message: '请输入属性值', trigger: 'blur' }">
                <el-input type="text" size="small" v-model="scope.row.value" placeholder="属性值" />
              </el-form-item>
            </el-form>
            <span class="fill-p" @click="itemClick(scope)" v-else>{{ scope.row.value }}</span>
          </template>
        </el-table-column>
      </el-table>
    </div>
  </div>
</template>

<script setup>
import { ref, getCurrentInstance, defineProps, onMounted, defineEmits, defineExpose, watch } from "vue";
import { ElMessage } from "element-plus";
import { toRefs } from "@vueuse/core";
import baseService from "@/service/baseService";
import { formatDate } from "../../tool.js";

const props = defineProps(["loading", "hasSearch", "defaultData", "thingCode"]);
const emits = defineEmits(["save"]);
const { loading, hasSearch, defaultData, thingCode } = toRefs(props);
const tableData = ref([]);
const initData = ref([]);
const selectedRow = ref([]);
const attrTableRef = ref();
// 查询之前的tableData
const copyTableData = ref([]);
// 用于判断修改之后是否保存
const changeHasSave = ref(true);
const dataForm = ref({
  beginTime: "",
  endTime: "",
  attr: ""
});
const timeRange = ref([]);

watch(defaultData, (v) => {
  tableData.value = v;
});

onMounted(() => {
  const data = [
    // {
    //   code: "1",
    //   startTime: "2022-02-22 06:23:56",
    //   latestTime: "",
    //   frequency: "2"
    // }
  ];
  initData.value = data;

  data.forEach((d) => {
    for (const k in d) {
      d[`${k}_editing`] = false;
    }
  });

  tableData.value = data;
});

// 获取属性编码
function getAttr() {
  if (!changeHasSave.value) {
    ElMessage({
      type: "warning",
      message: "请先保存数据"
    });
    return;
  }
  baseService.get("/cache/cachethingattr/getCacheThingAttrList", { thingCode: thingCode.value, thingAttr: dataForm.value.attr }).then((res) => {
    const data = res?.data || data;
    tableData.value = data.map((e) => {
      return {
        id: e.id,
        ts: e.thingAttr,
        key: e.firstTs,
        value: e.lastTs
      };
    });
  });
}

const context = getCurrentInstance();

const tableKey = ref(0);

const firstLineForm = {
  isUpdate: true,
  isNewLine: true,
  ts: "",
  ts_editing: true,
  key: "",
  key_editing: true,
  value: "",
  value_editing: true
};

/* 用来修改当前表格的某一行的某个数据 */
function upDateTable(index, key, value, newLine) {
  const newTableData = JSON.parse(JSON.stringify(tableData.value));

  if (newLine) {
    newTableData.unshift(newLine);
  } else {
    newTableData[index][key] = value;
  }
  tableData.value = newTableData.map((e, index) => {
    // 给每行加上一个index
    return {
      ...e,
      index
    };
  });
}

function getData() {
  // 查询之前先校验
  if (!tableValidate() || !thingCode.value) return;

  if (!changeHasSave.value) {
    // 没有点击保存，或者没有新增数据
    ElMessage({
      type: "warning",
      message: "当前有没有保存的数据，请先保存"
    });
    return;
  }
  baseService.get("/thing/thing/getSequentialInformationByCondition", { ...dataForm.value, thingCode: thingCode.value }).then((res) => {
    const data = res?.data || [];
    console.log("查询的数据：", data);
    tableData.value = data.map((e) => {
      return {
        ts: formatDate(+e.ts),
        key: e.key || "",
        value: e.value || ""
      };
    });
  });
}

function searchClearFn() {
  if (thingCode.value) {
    getAttr();
    return;
  }
  tableData.value = copyTableData.value;
}

function timeChange(v) {
  dataForm.value.beginTime = formatDate(v[0]);
  dataForm.value.endTime = formatDate(v[1]);
}

function addAttr() {
  upDateTable("", "", "", { ...firstLineForm });
  changeHasSave.value = false;
}

function save(row) {
  /* 物管理的这个保存和缓存设置页面的保存是两个后端写的
   * 这里的基础信息的保存和时许属性的保存是两个分开的接口，所以这里直接用组件保存就行了
   * 缓存设置页面的基础信息的保存和属性的保存是公用一个接口
   * */
  if (!tableValidate()) return;

  if (changeHasSave.value) {
    ElMessage({
      type: "warning",
      message: "没有需要保存的数据"
    });
    return;
  }

  // 都通过了验证，取消编辑状态
  tableData.value.forEach((e) => {
    e.ts_editing = false;
    e.key_editing = false;
    e.value_editing = false;
  });

  // 保存备份用于查询
  // copyTableData.value = JSON.parse(JSON.stringify(tableData.value));

  // 提交
  const tsKvReqParamList = tableData.value.map((e) => {
    return {
      ts: new Date(e.ts).getTime(),
      values: {
        [e.key]: e.value
      }
    };
  });
  baseService.post("/thing/thing/saveSequentialInformationToTb", { thingCode: thingCode.value, tsKvReqParamList }).then((res) => {
    if (res.code === 0) {
      ElMessage({
        type: "success",
        message: "保存成功"
      });
      getData();
    }
  });

  // 已经点击保存
  changeHasSave.value = true;
}

function itemClick(row) {
  const { $index, column } = row;
  /* 修改时已有数据的时间和属性编码不能修改 */
  if (!column.isNewLine && (column.property === "ts" || column.property === "key")) return;
  tableData.value[$index][`${column.property}_editing`] = true;
  if (changeHasSave.value) changeHasSave.value = false;
}

function deleteRow() {
  if (selectedRow.value.length <= 0) {
    ElMessage({
      type: "warning",
      message: "请选择需要删除的属性"
    });
    return;
  }

  // const hasEditing = selectedRow.value.some((e) => {
  //   return e.key_editing || e.ts_editing || e.value_editing;
  // });
  // console.log("当前选择有正在编辑", hasEditing);
  // if(hasEditing){
  //   ElMessage({
  //     type: "warning",
  //     message: "请先保存正在修改的数据"
  //   });
  //   return;
  // }

  // 先删除新增的行。数据库有的暂时不动
  const newLineList = selectedRow.value.filter((e) => {
    return e.isNewLine;
  });
  console.log("是新增：", newLineList);

  const indexs = newLineList.map((e) => e.index).sort((a, b) => b - a); // 把索引从大到小排列
  const newTableData = JSON.parse(JSON.stringify(tableData.value));
  // 从tableData中删除选择的数据
  indexs.forEach((e) => {
    newTableData.splice(e, 1);
  });
  tableData.value = newTableData;
}

function handleSelectionChange(sel) {
  selectedRow.value = sel;
}

// 表格的校验方法
function tableValidate() {
  const { refs } = context;
  let allPassValidate = true;
  // 这里是调用所有行的validate()方法
  for (let ref in refs) {
    if (ref === "attrTableRef") continue;

    refs[ref]?.validate((v) => {
      if (!v) {
        allPassValidate = false;
      }
    });
  }

  return allPassValidate;
}

// 当前组件抛出给父组件的用于清空的方法
function clear() {
  tableData.value = [];
}

// 用于判断是否保存或是否新增了属性
function hasSaved() {
  // 判断之前先校验
  if (!tableValidate()) return false;
  return copyTableData.value.length > 0;
}

defineExpose({ clear, hasSaved });
</script>

<style lang="less">
.fill-p {
  display: inline-block;
  width: 100%;
  height: 24px;
}
</style>