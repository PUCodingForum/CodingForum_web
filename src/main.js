import { createApp } from "vue";
import App from "./App.vue";
import store from "./store";

import router from "./router";

import "./assets/css/nucleo-icons.css";
import "./assets/css/nucleo-svg.css";
import SoftUIDashboard from "./soft-ui-dashboard";

import ElementPlus from "element-plus";
import locale from "element-plus/lib/locale/lang/zh-tw";
import "element-plus/dist/index.css";
import "element-plus/theme-chalk/display.css";

import axios from "axios";
import VueAxios from "vue-axios";

const app = createApp(App);

app.use(ElementPlus, {
  locale: { locale },
});
app.config.globalProperties.$axios = axios;

app
  .use(store)
  .use(VueAxios, axios)
  .use(router)
  .use(require("vue-cookies"))
  .use(SoftUIDashboard)
  .mount("#app");
//ncu --upgrade
//npm install --legacy-peer-deps 衝突時用
