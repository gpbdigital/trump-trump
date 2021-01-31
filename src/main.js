import Vue from "vue";
import App from "./App.vue";
import router from "./router";
import store from "./store";

import VueSocialSharing from 'vue-social-sharing';
Vue.use(VueSocialSharing);

import VueGtag from "vue-gtag";
Vue.use(VueGtag, {
  config: { id: "UA-136690661-4" }
}, router);


import 'normalize.css';
import "@/assets/css/global.css";
import "@/assets/css/start.css";
import "@/assets/css/sequence.css";
import "@/assets/css/sort.css";
import "@/assets/css/score.css";


Vue.config.productionTip = false;

new Vue({
  router,
  store,
  render: h => h(App)
}).$mount("#app");
