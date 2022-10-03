import { createApp } from "vue";
// CSS樣式
import "./style.css";
// 首頁
import App from "./App.vue";
import zhTw from "element-plus/es/locale/lang/zh-tw";

createApp(App).mount("#app");
App.use(ElementPlus, {
  locale: zhTw,
});
