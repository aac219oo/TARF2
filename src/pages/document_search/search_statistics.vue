<script lang="ts" setup>
import { computed, reactive, ref } from 'vue'
import type { TableColumnCtx } from 'element-plus/es/components/table/src/table-column/defaults'
import {
  ElementPlus,
  Search,
} from '@element-plus/icons-vue'
import zhTw from 'element-plus/dist/locale/zh-tw.mjs'

const language = ref('zh-tw')
const locale = computed(() => (language.value === 'zh-tw' ? zhTw : en))
// 統計圖表

interface Product {
  id: string
  name: string
  amount1: string
  amount2: string
  amount3: number
}

interface SummaryMethodProps<T = Product> {
  columns: TableColumnCtx<T>[]
  data: T[]
}

const getSummaries = (param: SummaryMethodProps) => {
  const { columns, data } = param
  const sums: string[] = []
  columns.forEach((column, index) => {
    if (index === 0) {
      sums[index] = '合計'
      return
    }
    const values = data.map((item) => Number(item[column.property]))
    if (!values.every((value) => Number.isNaN(value))) {
      sums[index] = ` ${values.reduce((prev, curr) => {
        const value = Number(curr)
        if (!Number.isNaN(value)) {
          return prev + curr
        } else {
          return prev
        }
      }, 0)}`
    } else {
      sums[index] = 'N/A'
    }
  })

  return sums
}

// 其他設定值
const tabPosition = ref('top')

const value = ref('')

const formInline = reactive({
  user: '',
  region: '',
})

const size = ref('large')

const onSubmit = () => {
  console.log('submit!')
}

const tableData1 = [
  {
    labelNumber: 'CR285',
    TuchengDingpu: '-',
    airport: '-',
    Wanda: '-',
    Songshan: '-',
    TaichungGreen: '-',
    Xinzhuang: '-',
    ring: '-',
    Xinyi: '-',
  },
  {
    labelNumber: 'CR380E',
    TuchengDingpu: '-',
    airport: '-',
    Wanda: '-',
    Songshan: '-',
    TaichungGreen: '-',
    Xinzhuang: '-',
    ring: '-',
    Xinyi: '-',
  },
  {
    labelNumber: 'CR382A',
    TuchengDingpu: '-',
    airport: '-',
    Wanda: '-',
    Songshan: '-',
    TaichungGreen: '-',
    Xinzhuang: '-',
    ring: '-',
    Xinyi: '-',
  },
  {
    labelNumber: 'CR383A',
    TuchengDingpu: '-',
    airport: '-',
    Wanda: '-',
    Songshan: '-',
    TaichungGreen: '-',
    Xinzhuang: '-',
    ring: '-',
    Xinyi: '-',
  },
  {
    labelNumber: 'CR385A',
    TuchengDingpu: '-',
    airport: '-',
    Wanda: '-',
    Songshan: '-',
    TaichungGreen: '-',
    Xinzhuang: '-',
    ring: '-',
    Xinyi: '-',
  },
  {
    labelNumber: 'CR387A',
    TuchengDingpu: '-',
    airport: '-',
    Wanda: '-',
    Songshan: '-',
    TaichungGreen: '-',
    Xinzhuang: '-',
    ring: '-',
    Xinyi: '-',
  },
  {
    labelNumber: 'CR580C',
    TuchengDingpu: '-',
    airport: '-',
    Wanda: '-',
    Songshan: '-',
    TaichungGreen: '-',
    Xinzhuang: '-',
    ring: '-',
    Xinyi: '-',
  },
  {
    labelNumber: 'CR581A',
    TuchengDingpu: '-',
    airport: '-',
    Wanda: '-',
    Songshan: '-',
    TaichungGreen: '-',
    Xinzhuang: '-',
    ring: '-',
    Xinyi: '-',
  },
  {
    labelNumber: 'CF620',
    TuchengDingpu: '-',
    airport: '-',
    Wanda: '-',
    Songshan: '-',
    TaichungGreen: '-',
    Xinzhuang: '-',
    ring: '-',
    Xinyi: '-',
  },
]

const tableData2 = [
  {}
]
const tableData3 = [
  {
    id: 1,
    labelNumber: '綜規處',
    TuchengDingpu: '-',
    airport: '-',
    Wanda: '-',
    Songshan: '-',
    TaichungGreen: '-',
    Xinzhuang: '-',
    ring: '-',
    Xinyi: '-',
    children: [
      {
    labelNumber: '綜規處處本部',
    TuchengDingpu: '-',
    airport: '-',
    Wanda: '-',
    Songshan: '-',
    TaichungGreen: '-',
    Xinzhuang: '-',
    ring: '-',
    Xinyi: '-',
      },{
    labelNumber: '綜規處第一課',
    TuchengDingpu: '-',
    airport: '-',
    Wanda: '-',
    Songshan: '-',
    TaichungGreen: '-',
    Xinzhuang: '-',
    ring: '-',
    Xinyi: '-',
      },{
    labelNumber: '綜規處第二課',
    TuchengDingpu: '-',
    airport: '-',
    Wanda: '-',
    Songshan: '-',
    TaichungGreen: '-',
    Xinzhuang: '-',
    ring: '-',
    Xinyi: '-',
      },
    ]
  },
  {
    id: 2,
    labelNumber: '土建處',
    TuchengDingpu: '-',
    airport: '-',
    Wanda: '-',
    Songshan: '-',
    TaichungGreen: '-',
    Xinzhuang: '-',
    ring: '-',
    Xinyi: '-',
  },
  {
    id: 3,
    labelNumber: '機設處',
    TuchengDingpu: '-',
    airport: '-',
    Wanda: '-',
    Songshan: '-',
    TaichungGreen: '-',
    Xinzhuang: '-',
    ring: '-',
    Xinyi: '-',
  },
  {
    id: 4,
    labelNumber: '工管處',
    TuchengDingpu: '-',
    airport: '-',
    Wanda: '-',
    Songshan: '-',
    TaichungGreen: '-',
    Xinzhuang: '-',
    ring: '-',
    Xinyi: '-',
  },
  {
    id: 5,
    labelNumber: '開發處',
    TuchengDingpu: '-',
    airport: '-',
    Wanda: '-',
    Songshan: '-',
    TaichungGreen: '-',
    Xinzhuang: '-',
    ring: '-',
    Xinyi: '-',
  },
  {
    id: 6,
    labelNumber: '技術處',
    TuchengDingpu: '-',
    airport: '-',
    Wanda: '-',
    Songshan: '-',
    TaichungGreen: '-',
    Xinzhuang: '-',
    ring: '-',
    Xinyi: '-',
  },
  {
    id: 7,
    labelNumber: '一區工程處',
    TuchengDingpu: '-',
    airport: '-',
    Wanda: '-',
    Songshan: '-',
    TaichungGreen: '-',
    Xinzhuang: '-',
    ring: '-',
    Xinyi: '-',
  },
  {
    id: 8,
    labelNumber: '二區工程處',
    TuchengDingpu: '-',
    airport: '-',
    Wanda: '-',
    Songshan: '-',
    TaichungGreen: '-',
    Xinzhuang: '-',
    ring: '-',
    Xinyi: '-',
  },
  {
    id: 9,
    labelNumber: '機電工程處',
    TuchengDingpu: '-',
    airport: '-',
    Wanda: '-',
    Songshan: '-',
    TaichungGreen: '-',
    Xinzhuang: '-',
    ring: '-',
    Xinyi: '-',
  },
]
const tableData4 = [
  {
    id: 1,
    labelNumber: '台灣世曦工程顧問股份有限公司',
    TuchengDingpu: '16,545',
    airport: '0',
    Wanda: '0',
    children: [
      {
        labelNumber: '台灣世曦工程顧問股份有限公司',
        TuchengDingpu: '16,545',
        airport: '0',
        Wanda: '0',
      }
    ]
  },
  {
    id: 2,
    labelNumber: '翰品聯合建築師事務所',
    TuchengDingpu: '1,698',
    airport: '0',
    Wanda: '0',
  },
  {
    id: 3,
    labelNumber: '綜規處',
    TuchengDingpu: '6',
    airport: '0',
    Wanda: '0',
    children: [
      {
        labelNumber: '綜規處第四課',
        TuchengDingpu: '6',
        airport: '0',
        Wanda: '0',
      }
    ]
  },
]
</script>
<template>
<el-config-provider :locale="locale">
  </el-config-provider>
    <el-container>
      <el-header>
        <a href="../../index.html">
          <h1>TARF2技術文件線上簽核系統</h1>
        </a>
        <h3>審查案件統計</h3>
        <p>蘇家淇(11548)</p>
      </el-header>
      <el-main>
        <el-row>
          <el-tabs :tab-position="tabPosition" style="height: auto; width: 100%;" class="demo-tabs">
    <el-tab-pane label="各標送審文件統計">
      <div class="search-top">        
      <el-form :inline="true" :model="formInline" class="demo-form-inline" label-position="top">
    <div class="container_left">
    <div class="input_position">
    <el-form-item class="datepicker" label="統計月份">
      <el-date-picker
        v-model="value"
        type="daterange"
        unlink-panels
        range-separator="~"
        start-placeholder="請選擇日期"
        end-placeholder="請選擇日期"
        :size="size"
      />
    </el-form-item>
          <el-form-item class="button-items">
            <div class="button-items-search">
            <el-button @click="onSubmit"><el-icon><Search /></el-icon></el-button>
            </div>
            <div class="button-items-export">
            <el-button>
              <a href="../detail_info/index.html">
            <img src="../../assets/Box-arrow-up-right.svg" style="width: 1.5rem; height: 1.5rem;" alt="">
            </a>
            </el-button>
            </div>
          </el-form-item>
    </div>
    <div class="msg_position">  
    <div class="title_msg"><h4>訊息</h4></div>  
  <el-carousel indicator-position="none" height="50px" direction="vertical" :autoplay="false">
    <el-carousel-item v-for="item in 4" :key="item">
      <h3 text="2xl" justify="center">{{ item }}</h3>
    </el-carousel-item>
  </el-carousel>
  </div>
    </div>
  </el-form>
  
  </div>
  <div class="title_main"><h4>各標送審文件統計</h4></div>
  <el-table 
  class="tableForm"
  :data="tableData1" 
  border 
  stripe
  show-summary 
  :summary-method="getSummaries" 
  style="width: 100%"
  :header-cell-style="{ background: '#ebf4f9', color: '#000', textAlign: 'center'}">
    <el-table-column prop="labelNumber" label="標號" width="100"/>
    <el-table-column prop="TuchengDingpu" label="土城頂埔段"/>
    <el-table-column prop="airport" label="機場線" />
    <el-table-column prop="Wanda" label="萬大線" />
    <el-table-column prop="Songshan" label="松山線" />
    <el-table-column prop="TaichungGreen" label="台中綠線" />
    <el-table-column prop="Xinzhuang" label="新莊線" />
    <el-table-column prop="ring" label="環狀縣" />
    <el-table-column prop="Xinyi" label="信義線" />
  </el-table>
    </el-tab-pane>
    <el-tab-pane label="單位審查案件數量統計">
      
      <div class="search-top">        
      <el-form :inline="true" :model="formInline" class="demo-form-inline" label-position="top">
    <div class="container_left">
    <div class="input_position">
    <el-form-item class="datepicker" label="統計月份">
      <el-date-picker
        v-model="value"
        type="daterange"
        unlink-panels
        range-separator="~"
        start-placeholder="請選擇日期"
        end-placeholder="請選擇日期"
        :size="size"
      />
    </el-form-item>
    <el-form-item label="統計類別選擇">
      <el-select v-model="formInline.region" :size="size" placeholder=" ">
        <el-option label="Zone one" value="shanghai" />
        <el-option label="Zone two" value="beijing" />
      </el-select>
    </el-form-item>
    </div>
    <div class="msg_position">  
    <div class="title_msg"><h4>訊息</h4></div>  
  <el-carousel indicator-position="none" height="50px" direction="vertical" :autoplay="false">
    <el-carousel-item v-for="item in 4" :key="item">
      <h3 text="2xl" justify="center">{{ item }}</h3>
    </el-carousel-item>
  </el-carousel>
  </div>
    </div>
    <div class="button_position">
    <el-form-item> 
      <el-button type="primary" @click="onSubmit">查詢</el-button>
      <el-button type="primary" @click="onSubmit">匯出結果</el-button>
    </el-form-item>
    </div>    
  </el-form>
  </div>

  <div class="title_main"><h4>單位審查案件數量統計</h4></div>
  <el-table  
  class="tableForm"
  :data="tableData1" 
  border 
  stripe 
  show-summary 
  :summary-method="getSummaries" 
  style="width: 100%"
  :header-cell-style="{ background: '#ebf4f9', color: '#000', textAlign: 'center'}">
    <el-table-column prop="labelNumber" label="標號" width="100"/>
    <el-table-column prop="TuchengDingpu" label="土城頂埔段"/>
    <el-table-column prop="airport" label="機場線" />
    <el-table-column prop="Wanda" label="萬大線" />
    <el-table-column prop="Songshan" label="松山線" />
    <el-table-column prop="TaichungGreen" label="台中綠線" />
    <el-table-column prop="Xinzhuang" label="新莊線" />
    <el-table-column prop="ring" label="環狀縣" />
    <el-table-column prop="Xinyi" label="信義線" />
  </el-table>
  </el-tab-pane>
    <el-tab-pane label="審查案件辦理情形統計">
      <div class="search-top">        
      <el-form :inline="true" :model="formInline" class="demo-form-inline" label-position="top">
    <div class="container_left">
    <div class="input_position">
    <el-form-item class="datepicker" label="統計月份">
      <el-date-picker
        v-model="value"
        type="daterange"
        unlink-panels
        range-separator="~"
        start-placeholder="請選擇日期"
        end-placeholder="請選擇日期"
        :size="size"
      />
    </el-form-item>
    <el-form-item label="統計類別選擇">
      <el-select v-model="formInline.region" :size="size" placeholder=" ">
        <el-option label="Zone one" value="shanghai" />
        <el-option label="Zone two" value="beijing" />
      </el-select>
    </el-form-item>
    </div>
    <div class="msg_position">  
    <div class="title_msg"><h4>訊息</h4></div>  
  <el-carousel indicator-position="none" height="50px" direction="vertical" :autoplay="false">
    <el-carousel-item v-for="item in 4" :key="item">
      <h3 text="2xl" justify="center">{{ item }}</h3>
    </el-carousel-item>
  </el-carousel>
  </div>
    </div>
    <div class="button_position">
    <el-form-item> 
      <el-button type="primary" @click="onSubmit">查詢</el-button>
      <el-button type="primary" @click="onSubmit">匯出結果</el-button>
    </el-form-item>
    </div>    
  </el-form>
  </div>
  <div class="title_main"><h4>審查案件辦理情形統計</h4></div>
  <el-table  
  class="tableForm"
  :data="tableData3" 
  row-key="id"
  border 
  stripe 
  show-summary 
  :summary-method="getSummaries" 
  style="width: 100%"
  :header-cell-style="{ background: '#ebf4f9', color: '#000', textAlign: 'center'}">
    <el-table-column prop="labelNumber" label="單位" width="200"/>
    <el-table-column prop="TuchengDingpu" label="案件總數(1)"/>
    <el-table-column prop="airport" label="如期結案(2)" />
    <el-table-column prop="Wanda" label="逾期結案(3)" />
    <el-table-column prop="Songshan" label="未結案(4)" />
    <el-table-column prop="TaichungGreen" label="如期未結案(5)" />
    <el-table-column prop="Xinzhuang" label="逾期未結案(6)" />
    <el-table-column prop="ring" label="逾期比例(7)" />
  </el-table>

<p class="illustrate" style="margin-top: 10px;">案件總數(1) = 如期結案(2) + 逾期結案(3) + 未結案(4)</p>
<p class="illustrate">未結案(4) = 如期未結案(5) + 逾期未結案(6)</p>
<p class="illustrate">逾期比例(7) = (逾期結案(3) + 逾期未結案(6)) / 案件總數(1)</p>

  </el-tab-pane>
    <el-tab-pane label="主辦單位審查文件數量統計">
      <div class="search-top">        
      <el-form :inline="true" :model="formInline" class="demo-form-inline" label-position="top">
    <div class="container_left">
    <div class="input_position">
    <el-form-item class="datepicker" label="統計月份">
      <el-date-picker
        v-model="value"
        type="daterange"
        unlink-panels
        range-separator="~"
        start-placeholder="請選擇日期"
        end-placeholder="請選擇日期"
        :size="size"
      />
    </el-form-item>
    <el-form-item label="統計類別選擇">
      <el-select v-model="formInline.region" :size="size" placeholder=" ">
        <el-option label="Zone one" value="shanghai" />
        <el-option label="Zone two" value="beijing" />
      </el-select>
    </el-form-item>
    </div>
    <div class="msg_position">  
    <div class="title_msg"><h4>訊息</h4></div>  
  <el-carousel indicator-position="none" height="50px" direction="vertical" :autoplay="false">
    <el-carousel-item v-for="item in 4" :key="item">
      <h3 text="2xl" justify="center">{{ item }}</h3>
    </el-carousel-item>
  </el-carousel>
  </div>
    </div>
    <div class="button_position">
    <el-form-item> 
      <el-button type="primary" @click="onSubmit">查詢</el-button>
      <el-button type="primary" @click="onSubmit">匯出結果</el-button>
    </el-form-item>
    </div>    
  </el-form>
  </div>
  <div class="title_main"><h4>主辦單位審查文件數量統計</h4></div>
  <el-table  
  class="tableForm"
  :data="tableData4" 
  row-key="id"
  border 
  stripe 
  show-summary 
  :summary-method="getSummaries" 
  style="width: 100%"
  :header-cell-style="{ background: '#ebf4f9', color: '#000', textAlign: 'center'}">
    <el-table-column prop="labelNumber" label="單位名稱" min-width="100"/>
    <el-table-column prop="TuchengDingpu" label="全部數量"/>
    <el-table-column prop="airport" label="111年6月數量" />
    <el-table-column prop="Wanda" label="本月數量" />
  </el-table>
  </el-tab-pane>
  </el-tabs>
        </el-row>
      </el-main>
    </el-container>
</template>


<style scoped>
.el-carousel__item h3 {
  color: #475669;
  opacity: 0.75;
  line-height: 200px;
  margin: 0;
  text-align: center;
}

.el-carousel__item:nth-child(2n) {
  background-color: #fff;
}

.el-carousel__item:nth-child(2n + 1) {
  background-color: #fff;
}
</style>


