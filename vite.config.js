import { defineConfig } from "vite";
import vue from "@vitejs/plugin-vue";
import AutoImport from "unplugin-auto-import/vite";
import Components from "unplugin-vue-components/vite";
import { ElementPlusResolver } from "unplugin-vue-components/resolvers";
import ElementPlus from "unplugin-element-plus/vite";
import zhTw from "element-plus/es/locale/lang/zh-tw";
import { resolve } from "path";
import axios from "axios";

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [
    vue(),
    AutoImport({
      resolvers: [ElementPlusResolver()],
    }),
    Components({
      resolvers: [ElementPlusResolver()],
    }),
    ElementPlus({
      useSource: true,
    }),
  ],
  build: {
    rollupOptions: {
      input: {
        main: resolve(__dirname, "index.html"),
        index_search: resolve(__dirname, "document_search/index_search/index.html"),
        contact: resolve(__dirname, "document_search/contact/index.html"),
        contact_com: resolve(__dirname, "document_search/contact_com/index.html"),
        contact_units: resolve(__dirname, "document_search/contact_units/index.html"),
        detail_info: resolve(__dirname, "document_search/detail_info/index.html"),
        search_event: resolve(__dirname, "document_search/search_event/index.html"),
        search_statistics: resolve(__dirname, "document_search/search_statistics/index.html"),
        index_maintenance: resolve(__dirname, "document_maintenance/index_maintenance/index.html"),
        access_setting: resolve(__dirname, "document_maintenance/access_setting/index.html"),
        com_using_right: resolve(__dirname, "document_maintenance/com_using_right/index.html"),
        event_codes: resolve(__dirname, "document_maintenance/condition_codes/index.html"),
        individual_words: resolve(__dirname, "document_maintenance/individual_words/index.html"),
        item_codes: resolve(__dirname, "document_maintenance/item_codes/index.html"),
        resualt_codes: resolve(__dirname, "document_maintenance/resualt_codes/index.html"),
      },
    },
  },
});
