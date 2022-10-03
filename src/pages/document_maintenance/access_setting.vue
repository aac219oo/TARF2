<script lang="ts" setup>
import { computed, reactive, ref } from 'vue'
import type { TableColumnCtx } from 'element-plus/es/components/table/src/table-column/defaults'
import zhTw from 'element-plus/dist/locale/zh-tw.mjs'

const language = ref('zh-tw')
const locale = computed(() => (language.value === 'zh-tw' ? zhTw : en))



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
                            <el-date-picker
                                v-model="valueDate"
                                type="daterange"
                                range-separator="至"
                                start-placeholder="請選擇日期"
                                end-placeholder="請選擇日期"
                            />
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

