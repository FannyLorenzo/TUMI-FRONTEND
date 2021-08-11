<template>
  <v-app-bar
    app
    clipped-left
    clipped-right
    :color="navbarColor"
    :dark="navbarColor !== 'white'"
  >
    <!---Logo part -->
    <v-toolbar-title
      class="align-center d-flex logo-width"
      :class="`${showLogo ? 'logo-width' : ''}`"
      v-if="navbarColor !== 'white'"
    >
      <span class="logo-icon">
        <img src="../../../assets/images/molinos//agriculturaP.png" class="mt-2" />
      </span>
      <span class="logo-text ml-2" :class="`${showLogo ? '' : 'hidelogo'}`">   TUMI APP 
        <img src="" class="mt-2" />
      </span>
    </v-toolbar-title>
    <!---Dark Logo part -->
    <v-toolbar-title
      class="align-center d-flex logo-width"
      :class="`${showLogo ? 'logo-width' : ''}`"
      v-else
    >
      <span class="logo-icon">    TUMI APP 
        <img src="../../../assets/images/molinos/agriculturaP.png" class="mt-2" />
      </span>
      <span class="logo-text ml-2" :class="`${showLogo ? '' : 'hidelogo'}`">
        <img src="" class="mt-2" />
      </span>
    </v-toolbar-title>
    <!---Logo part -->
    <!---/Toggle sidebar part -->
    <div @click="showhideLogo">
      <v-app-bar-nav-icon
        @click="
          $vuetify.breakpoint.smAndDown
            ? setSidebarDrawer(!Sidebar_drawer)
            : $emit('input', !value)
        "
      />
    </div>
    <!---/Toggle sidebar part -->
    <!---Search part -->
    <v-btn dark icon class="mr-1 d-sm-block d-none" @click="searchbox">
      <v-icon>mdi-magnify</v-icon>
    </v-btn>

    <v-card v-if="showSearch" class="searchinput">
      <template>
        <v-text-field
          placeholder="Buscar & y presiones Enter"
          class="mt-3 mb-0"
          append-icon="mdi-close"
          @click:append="searchbox"
        ></v-text-field>
      </template>
    </v-card>
    <!---/Search part -->
    <v-spacer />
    <!---right part -->
    <!---Notification 
    <v-menu
      bottom
      left
      offset-y
      origin="top right"
      transition="scale-transition"
    >
      <template v-slot:activator="{ on }">
        <v-btn dark icon v-on="on" class="mr-1">
          <v-badge color="red" dot>
            <v-icon>mdi-message</v-icon>
          </v-badge>
        </v-btn>
      </template>

      <v-list>
        <h4 class="px-5 py-3 pt-2 font-weight-medium title">Notificaciones</h4>
        <v-divider></v-divider>
        <v-list-item v-for="(item, i) in notifications" :key="i" @click="href">
          <v-list-item-title>
            <div class="d-flex align-center py-3">
              <div class>
                <v-btn
                  class="mr-3"
                  depressed
                  fab
                  small
                  dark
                  :color="item.iconbg"
                >
                  <v-icon dark>{{ item.icon }}</v-icon>
                </v-btn>
              </div>
              <div>
                <h4 class="font-weight-medium">{{ item.title }}</h4>
                <span
                  class="text--secondary caption descpart d-block text-truncate"
                  >{{ item.desc }}</span
                >
                <small class="text--secondary">{{ item.time }}</small>
              </div>
            </div>
          </v-list-item-title>
        </v-list-item>
      </v-list>
    </v-menu>
    -->
    <!---Notification -->
    <!---Messages 
    <v-menu
      bottom
      left
      offset-y
      origin="top right"
      transition="scale-transition"
    >
      <template v-slot:activator="{ on }">
        <v-btn dark icon v-on="on" class="mr-2">
          <v-badge color="red" dot>
            <v-icon>mdi-bell</v-icon>
          </v-badge>
        </v-btn>
      </template>

      <v-list>
        <h4 class="px-5 pt-2 py-3 font-weight-medium title">Mensajes</h4>
        <v-divider></v-divider>
        <v-list-item v-for="(item, i) in messages" :key="i" @click="href">
          <v-list-item-title>
            <div class="d-flex align-center py-3">
              <div class="mr-3">
                <v-badge
                  bordered
                  bottom
                  :color="item.avatarstatus"
                  dot
                  offset-x="10"
                  offset-y="10"
                >
                  <v-avatar>
                    <img
                      :src="
                        'https://www.wrappixel.com/demos/admin-templates/materialpro-bootstrap-latest/material-pro/src/assets/images/users/' +
                        item.avatar +
                        '.jpg'
                      "
                      :alt="item.title"
                    />
                  </v-avatar>
                </v-badge>
              </div>
              <div>
                <h4 class="font-weight-medium">{{ item.title }}</h4>
                <span
                  class="text--secondary caption descpart d-block text-truncate"
                  >{{ item.desc }}</span
                >
                <small class="text--secondary">{{ item.time }}</small>
              </div>
            </div>
          </v-list-item-title>
        </v-list-item>
      </v-list>
    </v-menu>
    -->
    <!---Messages -->
    <!---User -->
    <v-menu
      bottom
      left
      offset-y
      origin="top right"
      transition="scale-transition"
    >
      <template v-slot:activator="{ on }">
        <v-btn dark icon v-on="on" class="mr-1">
          <v-avatar size="40">
            <img src="https://cdn.vuetifyjs.com/images/john.jpg" alt="John" />
          </v-avatar>
        </v-btn>
      </template>

      <v-list>
        <v-list-item
          v-for="(item, i) in userprofile"
          :key="i"
          :to="item.to"
          @click="href"
        >
          <v-list-item-title>{{ item.title }}</v-list-item-title>
        </v-list-item>
      </v-list>
    </v-menu>
    <!---User -->
  </v-app-bar>
</template>
<script>
// Utilities
import { mapState, mapMutations } from "vuex";
export default {
  name: "VerticalHeader",

  components: {},

  props: {
    value: {
      type: Boolean,
      default: false,
    },
  },
  data: () => ({
    showLogo: true,
    showSearch: false,
    notifications: [
      {
        title: "Hora de almuerzo",
        iconbg: "error",
        icon: "mdi-link-variant",
        desc: "Just see the my new admin!",
        time: "9:30AM",
      },
      {
        title: "Evento del día",
        iconbg: "success",
        icon: "mdi-calendar-check",
        desc: "Just a reminder that you have event",
        time: "10:30AM",
      },
      {
        title: "Configuración",
        iconbg: "info",
        icon: "mdi-cog",
        desc: "You can customize this template as you want",
        time: "11:30AM",
      },
      {
        title: "Sra Contreras",
        iconbg: "indigo",
        icon: "mdi-account",
        desc: "Sent you an notification",
        time: "12:30AM",
      },
    ],
    messages: [
      {
        title: "Sr Pedro Pérez",
        avatar: "1",
        avatarstatus: "success",
        desc: "Singing Show tonigh at 9pm!",
        time: "9:30AM",
      },
      {
        title: "Srta Andrea Galindo",
        avatar: "2",
        avatarstatus: "error",
        desc: "The greate malody songs ever sung",
        time: "10:30AM",
      },
      {
        title: "Sr Arturo López",
        avatar: "3",
        avatarstatus: "warning",
        desc: "You can customize this template as you want",
        time: "11:30AM",
      },
      {
        title: "Sra Anastasia Casas",
        avatar: "4",
        avatarstatus: "success",
        desc: "Sent you an notification",
        time: "12:30AM",
      },
    ],
    userprofile: [
      { title: "Mi perfil", to: "/perfil" },
      { title: "Mis clientes", to: "/apps/contact" },
      { title: "Mis proveedores", to: "/apps/contact-grid" },
      { title: "Correos", to: "/apps/email/inbox" },
      { title: "Configuración de usuario", to: "/form-layouts/flformbasic" },
      { title: "Cerrar sesión", to: "/" }, // to: "/authentication/boxedlogin"
    ],
    href() {
      return undefined;
    },
  }),

  computed: {
    ...mapState(["navbarColor", "Sidebar_drawer"]),
  },

  methods: {
    ...mapMutations({
      setSidebarDrawer: "SET_SIDEBAR_DRAWER",
    }),
    showhideLogo: function () {
      this.showLogo = !this.showLogo;
    },
    searchbox: function () {
      this.showSearch = !this.showSearch;
    },
  },
};
</script>

<style lang="scss">
.hidelogo {
  display: none;
}
.searchinput {
  position: absolute;
  width: 100%;
  margin: 0;
  left: 0;
  z-index: 10;
  padding: 0 15px;
}
.descpart {
  max-width: 220px;
}
</style>