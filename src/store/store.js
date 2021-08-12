import Vue from "vue";
import Vuex from "vuex";

//modulos importados
import auth from "@/store/auth.js"

Vue.use(Vuex);

export default new Vuex.Store({
  state: {
// datos de usuario

accessToken: null,
loggingIn: false,
loginError: null,

id_actual:null,
usuario_actual:[],

SET_USUARIO_ACTUAL(state, payload) {
  state.usuario_actual = payload;
},



    Sidebar_drawer: null,
    Customizer_drawer: false,
    SidebarColor: "white", //Change Sidebar Color || 'white', | "#2b2b2b" | "rgb(44, 59, 164)" | "rgb(96, 44, 164)" | "rgb(151, 210, 219)" | "rgb(77, 86, 100)"
    SidebarBg: "",
    navbarColor: "primary",
    setHorizontalLayout: false, // Horizontal layout

  

  },
  mutations: {
    // usuario
    loginStop: (state, errorMessage) => {
      state.loggingIn = false;
      state.loginError = errorMessage;
    },
    updateAccessToken: (state, accessToken) => {
      state.accessToken = accessToken;
    },

  
    
    SET_SIDEBAR_DRAWER(state, payload) {
      state.Sidebar_drawer = payload;
    },
    SET_CUSTOMIZER_DRAWER(state, payload) {
      state.Customizer_drawer = payload;
    },
    SET_SIDEBAR_COLOR(state, payload) {
      state.SidebarColor = payload;
    },
    SET_NAVBAR_COLOR(state, payload) {
      state.navbarColor = payload;
    },
    SET_LAYOUT(state, payload) {
      state.setHorizontalLayout = payload;
    },

   
},

  actions: {  


  },
  getters: {},
  modules: {
    auth

  }
});
