<template>
  <v-container id="login" class="fill-height justify-center" tag="section">
    <v-row justify="center">
      <v-col lg="11" sm="8" xl="7">
        <v-card class="elevation-4">
          <v-row>
            <v-col
              lg="7"
              class="red lighten-1 d-none d-md-flex align-center justify-center"
            >
              <div class="d-none d-sm-block">
                <div class="d-flex align-center pa-10">
                  <div>
                    <h2 class="display-1 white--text font-weight-bold">TUMI</h2>
                    <h6
                      class="subtitle-1 mt-4 white--text op-5 font-weight-bold"
                    >
                      TU mercado, MI mercado
                    </h6>
                  </div>
                </div>
              </div>

              <v-carousel>
                <v-carousel-item
                  v-for="(item, i) in items"
                  :key="i"
                  :src="item.src"
                  reverse-transition="fade-transition"
                  transition="fade-transition"
                ></v-carousel-item>
              </v-carousel>
            </v-col>
            <v-col lg="5">
              <div class="pa-7 pa-sm-12">
                <img src="@/assets/images/molinos/arroz.png" />
                <h2 class="font-weight-bold mt-4 white--text text--darken-2">
                  Iniciar sesión
                </h2>
                <h6 class="subtitle-1">
                  Ingrese sus datos de usuario para iniciar sesión
                </h6>

                <v-form
                  ref="form"
                  v-model="valid"
                  lazy-validation
                  action="/tableros/indicadores"
                >
                  <v-text-field
                    v-model="username"
                    :rules="usernameRules"
                    label="Usuario"
                    class="mt-4"
                    required
                    outlined
                  ></v-text-field>
                  <v-text-field
                    v-model="password"
                    :counter="255"
                    :rules="passwordRules"
                    label="Contraseña"
                    required
                    outlined
                    :append-icon="show1 ? 'mdi-eye' : 'mdi-eye-off'"
                    :type="show1 ? 'text' : 'password'"
                  ></v-text-field>

                  <div class="d-block d-sm-flex align-center mb-4 mb-sm-0">
                    <v-checkbox
                      v-model="checkbox"
                      label="Recordarme?"
                    ></v-checkbox>

                    <!--                    
                    <div class="ml-auto">
                      <a href="javascript:void(0)" class="link">OLvidó su contraseña?</a>
                    </div> 
                    -->
                  </div>
                  <v-alert dense outlined type="error" v-if="error">
                    {{ msg_error }} <strong>!</strong>
                  </v-alert>
                  <v-btn
                    :disabled="!valid"
                    color="#EF5350"
                    block
                    class="mr-4"
                    submit
                    @click="submit"
                    >Iniciar sesión</v-btn
                  >
                  <div class="d-block d-sm-flex align-center mb-4 mb-sm-0">
                    <div class="ml-auto">
                      <a href="javascript:void(0)" class="link">_</a>
                    </div>
                  </div>
                  <v-btn
                    color="#EF5350"
                    class="mr-4"
                    block
                    submit
                    @click="register"
                    >Registrarse</v-btn
                  >
                </v-form>
              </div>
            </v-col>
          </v-row>
        </v-card>
      </v-col>
    </v-row>
  </v-container>
</template>

<script>
import axios from "axios";
import { mapMutations, mapState } from "vuex";

export default {
  name: "login",

  data: () => ({
    // carrusel
    items: [
      {
        src: "https://cdn.vuetifyjs.com/images/carousel/squirrel.jpg",
      },
      {
        src: "https://cdn.vuetifyjs.com/images/carousel/sky.jpg",
      },
      {
        src: "https://cdn.vuetifyjs.com/images/carousel/bird.jpg",
      },
      {
        src: "https://cdn.vuetifyjs.com/images/carousel/planet.jpg",
      },
    ],
    // fin carrusel
    valid: true,
    password: "",
    show1: false,
    passwordRules: [
      (v) => !!v || "Contraseña es requerida",
      (v) =>
        (v && v.length <= 225) ||
        "La contraseña debe ser menor a 255 carateres",
    ],
    username: "",
    usernameRules: [
      (v) => !!v || "El usuario es requerido", //,
      // => (v && v.length <= 10) || "El nombre debe tener menos de 10 caracteres"
    ],

    checkbox: false,

    error: false,
    msg_error: "",
    errores: [],
  }),
  computed: {
    ...mapState("auth", ["current_user", "current_id", "token"]),
  },
  methods: {
    // mutaciones de store
    ...mapMutations("auth", ["SET_CURRENT_ID", "SET_TOKEN"]),

    mostrarErrores() {
      this.msg_error = "";
      for (let i = 0; i < this.errores.length; i++) {
        this.msg_error = this.msg_error + "\n" + this.errores[i];
      }
    },
    register() {
      this.$router.push({ path: "/registro" });
    },

    submit() {
      this.$refs.form.validate();
      if (this.$refs.form.validate(true)) {
        this.errores = [];
        console.log(this.username);
        console.log(this.password);
        let json = {
          correo: this.username,
          password: this.password,
        };

        axios
          .post("https://capacitacion-docente.herokuapp.com/login/", json)
          .then((data) => {
            console.log("entroo");
            console.log(data.data.message);
            console.log(data.data.usuario.usuario_id);
            this.SET_CURRENT_ID(data.data.usuario.usuario_id);
            this.SET_TOKEN(data.data.usuario.usuario_id);
            console.log(this.current_id);
            console.log(this.token);

            this.$router.push({
              name: "Productores",
              params: {
                id: this.current_id,
              },
            });
          })
          .catch((err) => {
            console.log(err.response);
          });
      }
    },
  },
  props: {
    source: String,
  },
};
</script>
