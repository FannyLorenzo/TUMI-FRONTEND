import Vue from "vue";
import Vuetify from "vuetify/lib";
import "@/scss/vuetify/overrides.scss";
Vue.use(Vuetify);

const theme = {
  primary: "#EF5350",//"#004D40",//"#004D40",// "#FF9100",// change header color from here || "#1e88e6", "#21c1d6", "#fc4b6c", "#563dea", "#9C27b0", "#ff9800"
  secondary: "#ffe082", // #caae53
  info: "#1e88e5", //#E9967A",//"#1e88e5",
  success: "#21c1d6", //"light-green accent-3",
  accent: "#fc4b6c",
  default: "#76FF03",//"#563dea",
};

export default new Vuetify({
  theme: {
    themes: {
      dark: theme,
      light: theme,
    },
    dark: true, // If you want to set dark theme then dark:true else set to false
  },
  rtl: false, // If you want to set rtl theme then rtl:true else set to false
});
