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

import { QuillEditor } from "@vueup/vue-quill";
import "@vueup/vue-quill/dist/vue-quill.snow.css";

import YouTube from "vue3-youtube";

import "@fortawesome/fontawesome-free/css/all.css";
import "@fortawesome/fontawesome-free/js/all.js";

const app = createApp(App);
app.component("QuillEditor", QuillEditor);
app.component("YouTube", YouTube);
app.use(ElementPlus, {
  locale: { locale },
});
app.config.globalProperties.$axios = axios;
app.config.globalProperties.$app_name = "程式交流網";

app
  .use(store)
  .use(VueAxios, axios)
  .use(router)
  .use(require("vue-cookies"))
  .use(SoftUIDashboard)
  .mount("#app");
//ncu --upgrade
//npm install --legacy-peer-deps 衝突時用
