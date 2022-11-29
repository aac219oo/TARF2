import { defineConfig } from "vite"
import vue from "@vitejs/plugin-vue"
import AutoImport from "unplugin-auto-import/vite"
import Components from "unplugin-vue-components/vite"
import { ElementPlusResolver } from "unplugin-vue-components/resolvers"
import ElementPlus from "unplugin-element-plus/vite"
import zhTw from "element-plus/es/locale/lang/zh-tw"
import { resolve } from "path"
import axios from "axios"

// https://vitejs.dev/config/
export default defineConfig({
  settings: {
    "vetur.useWorkspaceDependencies": true,
    "vetur.experimental.templateInterpolationService": true,
  },
  projects: [
    "./packages/repo2", // Shorthand for specifying only the project root location
    {
      // **required**
      // Where is your project?
      // It is relative to `vetur.config.js`.
      root: "./packages/repo1",
      // **optional** default: `'package.json'`
      // Where is `package.json` in the project?
      // We use it to determine the version of vue.
      // It is relative to root property.
      package: "./package.json",
      // **optional**
      // Where is TypeScript config file in the project?
      // It is relative to root property.
      tsconfig: "./jsconfig.json",
      // **optional** default: `'./.vscode/vetur/snippets'`
      // Where is vetur custom snippets folders?
      snippetFolder: "./.vscode/vetur/snippets",
      // **optional** default: `[]`
      // Register globally Vue component glob.
      // If you set it, you can get completion by that components.
      // It is relative to root property.
      // Notice: It won't actually do it. You need to use `require.context` or `Vue.component`
      globalComponents: ["./src/components/**/*.vue"],
    },
  ],
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
  base: "./",
  build: {
    rollupOptions: {
      input: {
        main: resolve(__dirname, "index.html"),
        index_search: resolve(
          __dirname,
          "document_search/index_search/index.html"
        ),
        contact: resolve(__dirname, "document_search/contact/index.html"),
        contact_com: resolve(
          __dirname,
          "document_search/contact_com/index.html"
        ),
        contact_units: resolve(
          __dirname,
          "document_search/contact_units/index.html"
        ),
        detail_info: resolve(
          __dirname,
          "document_search/detail_info/index.html"
        ),
        search_event: resolve(
          __dirname,
          "document_search/search_event/index.html"
        ),
        search_statistics: resolve(
          __dirname,
          "document_search/search_statistics/index.html"
        ),
        index_maintenance: resolve(
          __dirname,
          "document_maintenance/index_maintenance/index.html"
        ),
        access_setting: resolve(
          __dirname,
          "document_maintenance/access_setting/index.html"
        ),
        com_using_right: resolve(
          __dirname,
          "document_maintenance/com_using_right/index.html"
        ),
        event_codes: resolve(
          __dirname,
          "document_maintenance/condition_codes/index.html"
        ),
        individual_words: resolve(
          __dirname,
          "document_maintenance/individual_words/index.html"
        ),
        item_codes: resolve(
          __dirname,
          "document_maintenance/item_codes/index.html"
        ),
        resualt_codes: resolve(
          __dirname,
          "document_maintenance/resualt_codes/index.html"
        ),
      },
    },
  },
})
