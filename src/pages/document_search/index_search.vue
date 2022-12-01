<template>
  <el-container>
    <el-header>
      <a href="../../index.html">
        <h1>TARF2技術文件線上簽核系統</h1>
      </a>
      <h3>審查案件查詢及統計</h3>
      <p>{{ username }}</p>
    </el-header>
    <el-main>
      <el-row class="index_row">
        <a href="../search_event/index.html">
          <el-button class="index_button" round>審查案件查詢</el-button>
        </a>
        <a href="../search_statistics/index.html">
          <el-button class="index_button" round>審查案件統計</el-button>
        </a>
        <a href="../contact/index.html">
          <el-button class="index_button" round>窗口資訊查詢</el-button>
        </a>
      </el-row>
    </el-main>
  </el-container>
</template>
<script>
  // import axios from "axios"
  // import { onMounted } from "vue"

  // const url = "/tarf6net/api/PhraseRecd/GetPhraseRecd?UserId=16195"

  // onMounted(() => {
  //   const user = sessionStorage.getItem("user-info")
  //   username.value = JSON.parse(user).username
  //   user_id = JSON.parse(user).id
  //   axios
  //     .get(url)
  //     .then((res) => {
  //       console.log(res.data)
  //     })
  //     .catch(function (error) {
  //       // handle error
  //       console.log(error)
  //     })
  // })

  // if (JSON && JSON.stringify && JSON.parse)
  //   var Session =
  //     Session ||
  //     (function () {
  //       // cache window 物件
  //       var win = window.top || window;

  //       // 將資料都存入 window.name 這個 property
  //       var store = win.name ? JSON.parse(win.name) : {};

  //       // 將要存入的資料轉成 json 格式
  //       function Save() {
  //         win.name = JSON.stringify(store);
  //       }

  //       // 在頁面 unload 的時候將資料存入 window.name
  //       if (window.addEventListener)
  //         window.addEventListener("unload", Save, false);
  //       else if (window.attachEvent) window.attachEvent("onunload", Save);
  //       else window.onunload = Save;

  //       // public methods
  //       return {
  //         // 設定一個 session 變數
  //         set: function (name, value) {
  //           store[name] = value;
  //         },

  //         // 列出指定的 session 資料
  //         get: function (name) {
  //           return store[name] ? store[name] : undefined;
  //         },

  //         // 清除資料 ( session )
  //         clear: function () {
  //           store = {};
  //         },

  //         // 列出所有存入的資料
  //         dump: function () {
  //           return JSON.stringify(store);
  //         },
  //       };
  //     })();

  // // 存入一個 session value/object
  // Session.set(name, object);

  // // 取出一個 session value/object
  // Session.get(name);

  // // 清除所有 session 資料
  // Session.clear();

  // // 列出所有 session 資料
  // Session.dump();
</script>
