<template>
  <v-container id="login" class="fill-height justify-center" tag="section">
    <v-row justify="center">
      <v-col lg="11" sm="8" xl="7">
        <v-card class="elevation-4">
          <v-row>
            <v-col lg="7" class="red lighten-1 d-none d-md-flex align-center justify-center">
              <div class="d-none d-sm-block">
                <div class="d-flex align-center pa-10">
                  <div>
                    <h2
                      class="display-1 white--text font-weight-bold"
                    >TUMI</h2>
                    <h6
                      class="subtitle-1 mt-4 white--text op-5 font-weight-bold"
                    >TU mercado, MI mercado</h6>
                 </div>
                </div>
              </div>
             
                <v-carousel>
                  <v-carousel-item
                    v-for="(item,i) in items"
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
                <h2 class="font-weight-bold mt-4 white--text text--darken-2">Registro de usuario</h2>
                <h6 class="subtitle-1">
                  Ingrese sus datos de usuario para Registrarse
                </h6>

                <v-form ref="form" v-model="valid" lazy-validation action="/tableros/indicadores">
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
                    :counter="10"
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
                  </div>
                   <v-alert 
                          dense
                          outlined
                          type="error"
                          v-if="error"
                        >
                          {{msg_error}} <strong>!</strong> </v-alert>
                  <v-btn
                    :disabled="!valid"
                    color="#EF5350"                   
                    class="mr-4"
                    block
                    submit
                    @click="submit"
                  >Registrarse</v-btn>
                  <div class="d-block d-sm-flex align-center mb-4 mb-sm-0">                                     
                    <div class="ml-auto">
                      <a href="javascript:void(0)" class="link">_</a>
                    </div>                  
                  </div>
              
                  <v-btn
                    color="#EF5350"
                    block
                    class="mr-4"
                    submit
                    @click="login"
                  >Iniciar sesión</v-btn>   
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

import axios from 'axios';
import { mapMutations } from "vuex";

export default {
  
  name: "registro",

  data: () => ({
    // carrusel 
items: [
          {
            src: 'https://cdn.vuetifyjs.com/images/carousel/squirrel.jpg',
          },
          {
            src: 'https://cdn.vuetifyjs.com/images/carousel/sky.jpg',
          },
          {
            src: 'https://cdn.vuetifyjs.com/images/carousel/bird.jpg',
          },
          {
            src: 'https://cdn.vuetifyjs.com/images/carousel/planet.jpg',
          },
        ],
    // fin carrusel
    valid: true,
    password: "",
    show1: false,
    passwordRules: [
      v => !!v || "Contraseña es requerida",
      v => (v && v.length <= 10) || "La contraseña debe ser menor a 10 carateres"
    ],
    username: "",
    usernameRules: [
      v => !!v || "El usuario es requerido"//,
      // => (v && v.length <= 10) || "El nombre debe tener menos de 10 caracteres"
    ],
    
    checkbox: false,
    
    error : false,
    msg_error : "",
    errores : [],

  }),
  computed: {},
  methods: {
     // mutaciones de store
    ...mapMutations("auth", ["SET_CURRENT_ID"]),

    mostrarErrores(){
      this.msg_error = "";
      for(let i = 0; i<this.errores.length; i++){
          this.msg_error = this.msg_error +"\n"+this.errores[i];  
      }
    },
    login(){
       this.$router.push({ path: "/login" });
    },
    submit() {
      this.$refs.form.validate();
      if (this.$refs.form.validate(true)) {
          

      this.errores = [];
      console.log(this.username);
      console.log(this.password);
      let json = {
        "correo" : this.username,
        "password": this.password,

      };
     
       axios.post("https://capacitacion-docente.herokuapp.com/users/add/",json
       ).then(data =>{
            console.log("entroo");
            console.log(data.data.message);
            this.SET_CURRENT_ID(data.usuario_id);
            localStorage.setItem("token", 1);
            this.$router.push({ path: "/perfil" });             
          }).catch(err => {console.log(err.response)});

      
        
      }

    }
  },
    props: {
    source: String
  }
};
</script>
