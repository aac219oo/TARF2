import { createApp } from "vue";
// CSS樣式
import "../../src/style.css";

import IndividualWords from "../../src/pages/document_maintenance/individual_words.vue";

// 動態載入table
// import table_words from '../../src/components/table_words.vue'

// export default {
//   name: 'individual_words',
//   components: {
//     table_words
//   }
// }
// 動態載入table

createApp(IndividualWords).mount("#individual_words");
