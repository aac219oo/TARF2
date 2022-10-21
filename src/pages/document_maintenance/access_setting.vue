<script lang="ts" setup>
import { computed, reactive, ref } from 'vue'
import type { TableColumnCtx } from 'element-plus/es/components/table/src/table-column/defaults'
import zhTw from 'element-plus/dist/locale/zh-tw.mjs'

const language = ref('zh-tw')
const locale = computed(() => (language.value === 'zh-tw' ? zhTw : en))

// navbar
const activeIndex = ref('1')
const handleSelect = (key: string, keyPath: string[]) => {
  console.log(key, keyPath)
}

// 選項
const valueContact = ref<string[]>([])
const optionsContact = [
  {
    valueContact: 'HTML',
    label: 'HTML',
  },
  {
    valueContact: 'CSS',
    label: 'CSS',
  },
  {
    valueContact: 'JavaScript',
    label: 'JavaScript',
  },
]

const valueSetting = ref<string[]>([])
const optionsSetting = [
  {
    valueSetting: 'HTML',
    label: 'HTML',
  },
  {
    valueSetting: 'CSS',
    label: 'CSS',
  },
  {
    valueSetting: 'JavaScript',
    label: 'JavaScript',
  },
]

const valueDate = ref('')


</script>


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
    <el-menu-item index="1"><a href="../access_setting/index.html">權限設定</a></el-menu-item>
    <el-menu-item index="2"><a href="../individual_words/index.html">個人使用詞彙</a></el-menu-item>
    <el-menu-item index="3"><a href="../item_codes/index.html">送審項目代碼</a></el-menu-item>
    <el-menu-item index="4"><a href="../resualt_codes/index.html">送審結果代碼</a></el-menu-item>
    <el-menu-item index="5"><a href="../condition_codes/index.html">案件狀態代碼</a></el-menu-item>
    <el-menu-item index="6"><a href="../com_using_right/index.html">廠商使用權限</a></el-menu-item>
  </el-menu>
                <div class="access_select">
                    <div class="select_box_wrap">
                        <div class="select_h3">兼任其他單位聯絡窗口</div>
                        <div class="select_box">
                            <el-select
                                v-model="valueContact"
                                multiple
                                filterable
                                allow-create
                                default-first-option
                                :reserve-keyword="false"
                                placeholder="請選擇"
                                >
                                <el-option
                                    v-for="item in optionsContact"
                                    :key="item.valueContact"
                                    :label="item.label"
                                    :value="item.valueContact"
                                    />
                            </el-select>
                        </div>
                    </div>
                    <div class="select_box_wrap">
                        <div class="select_h3">代理人設定</div>
                        <div class="select_box">
                            <el-select
                                v-model="valueSetting"
                                multiple
                                filterable
                                allow-create
                                default-first-option
                                :reserve-keyword="false"
                                placeholder="請選擇"
                                >
                                <el-option
                                    v-for="item in optionsSetting"
                                    :key="item.valueSetting"
                                    :label="item.label"
                                    :value="item.valueSetting"
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
                        <el-button>儲存</el-button>
                    </div>
                </div>
            </el-main>
        </el-container>
</template>

