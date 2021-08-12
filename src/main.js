import Vue from "vue";
import App from "./App.vue";
import vuetify from "./plugins/vuetify";
import router from "./router";
import store from "./store/store"; 
import Vuebar from "vuebar";
import "./plugins/base";
import VueSkycons from "vue-skycons";
import InstantSearch from "vue-instantsearch";
//instalación de apexchart
import VueApexCharts from 'vue-apexcharts';
//INstalación de axios
import axios from 'axios'
import VueAxios from 'vue-axios'
Vue.use(VueAxios, axios)
//Instalación de fuente y material design
import '@fortawesome/fontawesome-free/css/all.css'
import 'material-design-icons-iconfont/dist/material-design-icons.css'
//mapa

import * as VueGoogleMaps from "vue2-google-maps";

Vue.use(VueGoogleMaps, {
  load: {
    key: "AIzaSyBYGaQD-G88NKZMQpXw2E_vufOH-2FYNSw",
  },
});

// URL POR DEFECTO

Vue.use(VueSkycons, {
  color: "#1e88e5",
});
Vue.use(InstantSearch);
Vue.config.productionTip = false;
Vue.use(Vuebar);
Vue.use(VueApexCharts); // apexchart

Vue.component('apexchart', VueApexCharts) // apexchart

new Vue({
  vuetify,
  store,
  router,
  axios,
  render: (h) => h(App),
}).$mount("#app");
