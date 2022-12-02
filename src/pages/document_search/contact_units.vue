<template>
  <el-config-provider :locale="locale"> </el-config-provider>
  <el-container>
    <el-header>
      <a href="../../index.html">
        <h1>TARF2技術文件線上簽核系統</h1>
      </a>
      <h3>窗口資訊查詢</h3>
      <p>蘇家淇(11548)</p>
    </el-header>
    <el-main>
      <el-menu
        :default-active="activeIndex"
        class="el-menu-demo index_row"
        mode="horizontal"
        @select="handleSelect"
      >
        <el-menu-item index="1"
          ><a href="../contact_units/index.html"
            >捷運局各單位窗口資訊</a
          ></el-menu-item
        >
        <el-menu-item index="2"
          ><a href="../contact_com/index.html"
            >各標號廠商窗口資訊</a
          ></el-menu-item
        >
      </el-menu>

      <el-row>
        <div class="title_main contact-title">
          <h4>捷運局各單位窗口資訊</h4>
        </div>
        <!-- <el-form class="contact-search">
          <el-form-item>
            <el-input
              v-model="search"
              class="w-50 m-2"
              size="default"
              placeholder="搜尋"
              :suffix-icon="Search"
            />
          </el-form-item>
        </el-form> -->

        <el-table
          class="tableForm tableContactUnits"
          v-loading="loading"
          :data="filterTableData"
          stripe
          border
          :header-cell-style="{
            background: '#ebf4f9',
            color: '#000',
            textAlign: 'center',
          }"
        >
          <el-table-column
            type="index"
            label="序號"
            width="57"
            :resizable="false"
          />
          <el-table-column
            prop="depT_NAME"
            sortable
            label="單位"
            class="unitAlign"
            ><template #header>
              <p>單位</p>
              <el-select
                v-model="searchDepT_NAME"
                filterable
                default-first-option
                :reserve-keyword="false"
                placeholder="選擇搜尋單位"
              >
                <el-option
                  v-for="item in optionsDepT_NAME"
                  :key="item.depT_NAME"
                  :label="item.label"
                  :value="item.depT_NAME"
                /> </el-select></template
          ></el-table-column>
          <el-table-column
            prop="empL_NAME"
            :sortable="sortable"
            label="姓名"
            :resizable="false"
            ><template #header>
              <p>姓名</p>
              <el-input
                v-model="searchEmpL_NAME"
                class="w-50 m-2"
                size="default"
                placeholder="搜尋姓名"
                :suffix-icon="Search"
                @keypress="stopEnter"
                @click.stop.prevent="stopSortable"
              /> </template
          ></el-table-column>
          <el-table-column
            prop="ofF_TEL"
            sortable
            label="電話"
            :resizable="false"
          />
        </el-table>
      </el-row>
    </el-main>
    <!-- <p>{{ tabledata.newsdata }}</p> -->
  </el-container>
</template>
<script lang="ts" setup>
  import { ref, onMounted, computed, reactive } from "vue"
  import { Search } from "@element-plus/icons-vue"
  import axios from "axios"
  import zhTw from "element-plus/dist/locale/zh-tw"
  import en from "element-plus/es/locale/lang/en"

  const language = ref("zh-tw")
  const locale = computed(() => (language.value === "zh-tw" ? zhTw : en))
  //navbar
  const activeIndex = ref("1")
  const handleSelect = (key: string, keyPath: string[]) => {
    console.log(key, keyPath)
  }
  const sortable = ref(true)
  const stopSortable = () => {
    console.log(false)
  }
  // loading
  const loading = ref(true)
  // filter
  interface User {
    depT_NAME: string
    empL_NAME: string
    ofF_TEL: string
  }

  const searchDepT_NAME = ref("")
  const searchEmpL_NAME = ref("")
  const filterTableData = computed<User[]>(() => {
    return tabledata.value.filter(
      (data) =>
        data.depT_NAME
          .toLowerCase()
          .includes(searchDepT_NAME.value.toLowerCase()) &&
        data.empL_NAME
          .toLowerCase()
          .includes(searchEmpL_NAME.value.toLowerCase())
    )
    // return tabledata.value
  })
  const stopEnter = (e) => {
    const code = e.keyCode ? e.keyCode : e.which // in case of browser compatibility
    if (code == 13) {
      e.preventDefault()
      // do something
      /* also can use return false; instead. */
    }
  }

  // axios
  //各單位窗口資訊查詢
  const url = "/tarf6net/api/ContactInfoQuery/GetDeptChargQuery"
  // const url = "https://localhost:7227/api/ContactInfoQuery/GetDeptChargQuery"

  const tabledata = ref<User[]>([])

  onMounted(() => {
    loading.value = true
    axios
      .get(url)
      .then((res) => {
        const noSpace = reactive([])
        for (let i = 0; i < res.data.length; i++) {
          noSpace[i] = {
            depT_NAME: res.data[i].depT_NAME.replace(/\s*/g, ""),
            empL_NAME: res.data[i].empL_NAME.replace(/\s*/g, ""),
            ofF_TEL: res.data[i].ofF_TEL.replace(/\s*/g, ""),
          }
        }
        tabledata.value = noSpace
        console.log(res.data)
        loading.value = false
      })
      .catch(function (error) {
        // handle error
        alert("資料無法讀取，請洽系統人員")
        console.log(error)
      })
      .then(function () {
        // always executed
      })

    // const urlSelectDepT_NAME = url + "&DepT_NAME=" + DepT_NAME
    // axios
    //   .get(urlSelectDepT_NAME)
    //   .then((res) => {
    //     console.log(res.data)
    //     tabledata.value = res.data
    //     loading.value = false
    //   })
    //   .catch(function (error) {
    //     // handle error
    //     console.log(error)
    //   })
    //   .then(function () {
    //     // always executed
    //   })
  })

  const optionsDepT_NAME = [
    {
      depT_NAME: "",
      label: "選擇搜尋單位",
    },
    {
      depT_NAME: "綜規處",
      label: "綜規處",
    },
    {
      depT_NAME: "土建處",
      label: "土建處",
    },
    {
      depT_NAME: "機設處",
      label: "機設處",
    },
    {
      depT_NAME: "工管處",
      label: "工管處",
    },
    {
      depT_NAME: "技術處",
      label: "技術處",
    },
    {
      depT_NAME: "秘書室",
      label: "秘書室",
    },
    {
      depT_NAME: "會計室",
      label: "會計室",
    },
    {
      depT_NAME: "一區工程處",
      label: "一區工程處",
    },
    {
      depT_NAME: "二區工程處",
      label: "二區工程處",
    },
    {
      depT_NAME: "機電工程處",
      label: "機電工程處",
    },
  ]
</script>
