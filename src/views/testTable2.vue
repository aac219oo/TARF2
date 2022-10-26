<template>
  <div class="parent">
    <rule-table :excel="false" table-title="" :more="false">
      <el-button slot="button" type="success" icon="el-icon-search" class="filter-item" :loading="false">查询</el-button>
      <el-button slot="button" type="success" icon="el-icon-edit" class="filter-item" :loading="false"
                 @click="handleAdd"
      >添加
      </el-button>
      <!--      <el-button slot="button" type="info" icon="el-icon-refresh" class="filter-item" :loading="false" @click="reset">重置</el-button>-->
      <div slot="header" class="filter-container">
        <el-select v-model="type" placeholder="请选择" @change="selectChanged">
          <el-option
              v-for="item in options"
              :key="item"
              :label="item"
              :value="item"
          />
        </el-select>
      </div>
      <div style="width: 100%; height: 100%;">
        <el-table ref="table" v-loading="loading" :data="rwdata" border height="100%" @cell-click="handle"
                  element-loading-text="拼命加载中"
                  element-loading-spinner="el-icon-loading"
                  element-loading-background="rgba(0, 0, 0, 0.8)">
          <el-table-column label="工作内容/时间" width="100px" :show-overflow-tooltip="true" fixed>
            <template slot-scope="scope">
              <span>{{ scope.row.name }}</span>
            </template>
          </el-table-column>

          <el-table-column v-for="(item,index) in sftime" :prop="item" :label="item" width="57px" align="center">
            <template slot-scope="scope">
              <span>{{ getstate(scope.row.listtimes[index]) }} </span>
            </template>
          </el-table-column>
          <el-table-column label="功能" width="50px" fixed="right">
            <template slot-scope="scope">
              <el-button type="danger" icon="el-icon-delete" circle @click="delectganttchart(scope.row.id)"></el-button>
            </template>
          </el-table-column>

        </el-table>
        <Chargeganttchartadd :visible.sync="dialog.dialogFormVisible" :title="dialog.title" @close="()=>{}"/>
      </div>
    </rule-table>
  </div>
</template>

<script>


export default {
  name: 'Chargeganttchart',
  components: { Chargeganttchartadd },
  data() {
    return {
      type: '收费',
      options: ['收费', '交通'],
      sftime: [],
      rwdata: [],
      lsid: '',
      dialog: { dialogFormVisible: false, title: '' },
      sswidth: '57px',
      loading: true
    }
  },
  watch: {
    // 方法名就是指定要监听的data属性名，方法提供了两个值，newVal和oldVal故名思意
    // 即是改变之后的新值，和改变之前老值
    'dialog.dialogFormVisible': function(newVal, oldVal) {
      // console.log('dialogFormVisible值发生变化  改变的新值：' + newVal + '  之前的老值：' + oldVal)
      this.getganttchartsftimes()
      this.getganttchartsfdatas()
    }
  },
  mounted() {
    this.selectChanged()
  },
  methods: {
    async getganttchartsftimes() {
      const response = await getganttchartsftime('type=' + this.type)
      if (response) {
        this.sftime = response.data
        console.log(response)
      }
    },
    async getganttchartsfdatas() {
      const response = await getganttchartsfdata('type=' + this.type)
      if (response) {
        console.log(response)
        this.rwdata = response.data
      }
    },
    handle(row, column) {
      // console.log(row, column)
      // console.log('列property', column.property)
      // console.log('id', row.id)
      this.lsid = row.id
      // console.log('table',column.label)
      this.dpdateTime(row.listtimes, row.id, column.property)
    },
    getstate(state) {
      if (state === '0') {
        return ''
      } else {
        return '✔'
      }
    },
    dpdateTime(date, id, prop) {
      // console.log('data 修改提交数据')
      // console.log(date)
      // console.log(id)
      // console.log(prop)
      // console.log('下标', this.sftime.indexOf(prop))
      if (this.sftime.indexOf(prop) >= 0 && prop !== undefined) {
        if (date[this.sftime.indexOf(prop)] === prop) {
          date[this.sftime.indexOf(prop)] = 0
        } else {
          date[this.sftime.indexOf(prop)] = prop
        }
        updataganttchartsfdata('id=' + id + '&worktime=' + date.join(';')).then(response => {
          if (response) {
            this.getganttchartsfdatas()
          }
        })
      }
    },
    async selectChanged() {
      this.loading = true
      await this.getganttchartsftimes()
      await this.getganttchartsfdatas()
      this.$nextTick(() => {
        this.loading = false
        this.$refs.table.doLayout()
        // this.show = true
      })
      // this.$nextTick(()=>{
      //     this.key++
      //     this.$refs.table.doLayout()
      //     this.$beforeUpdate()
      //   })
    },
    handleAdd() {
      this.dialog.dialogFormVisible = true
      this.dialog.title = '甘特图 添加工作内容'
    },
    delectganttchart(id) {
      console.log('删除id', id)
      delectganttchartdata('id=' + id).then(response => {
        if (response) {
          this.selectChanged()
          this.$message({
            message: '删除成功',
            type: 'success'
          });
        }
      })
    }

  }
}
</script>