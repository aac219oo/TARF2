import { createApp } from "vue";
// CSS樣式
import "./style.css";
// 首頁
import App from "./App.vue";
import zhTw from "element-plus/es/locale/lang/zh-tw";
import axios from "axios";
//axios.defaults.baseURL = "http://localhost:2345";

// 配置vue啟動axios
// app.config.globalProperties.$axios = axios;

createApp(App).mount("#app");
App.use(ElementPlus, {
  locale: zhTw,
});
