<template>
  <v-container fluid class="down-top-padding">
    <v-card class="mb-7">
      <v-card-text class="pa-5">
        <v-row justify="space-between">
          <v-col cols="12" lg="4">
            <v-text-field
              v-model="search"
              prepend-inner-icon="mdi-magnify"
              label="Search Contacts"
              filled
              background-color="transparent"
              hide-details
            ></v-text-field>
          </v-col>
          
        </v-row>
      </v-card-text>
    </v-card>

    <v-row justify="center">
      <v-col cols="12" sm="6" lg="4" v-for="(contactgrid, index) in contactgrids" :key="index">
        <v-card class="mb-7">
          <v-card-text class="pa-5 text-center">
            <img
              :src="contactgrid.foto"
              alt="user"
              class="rounded-circle"
              width="200"
            />
            <h4 class="title mt-3 mb-0">{{ contactgrid.nombre }} {{ contactgrid.apellido }}</h4>
            <div class="mt-3">
              <v-btn depressed small color="orange" class="mr-2" @click="toDir(contactgrid.usuario_id)" >Perfil</v-btn>
          
            </div>
            <div class="mt-3 pt-3">
              <address class="subtitle-2 font-weight-regular">{{ contactgrid.correo }}</address>
            </div>
          </v-card-text>

          <div class="pa-3 blue text-center">
            <h4 style="text-align: center;">Calificación</h4> 
             <v-rating                
                :value="contactgrid.calificacion / contactgrid.npersonas"
                background-color="yellow"
                color="yellow"
                large
                ></v-rating>
               
          </div>
          <v-card-text class="px-4 py-3">
            <v-row>
            
                <v-chip pill>
                  <v-avatar left>
                    <v-btn color="light-green accent-3" class="white--text">
                      <v-icon small>mdi-whatsapp</v-icon>
                    </v-btn>
                  </v-avatar>
                  {{ contactgrid.telefono }}
                  
                </v-chip>            
                <v-chip pill>
                  <v-avatar left>
                    <v-btn color="pink darken-1" class="white--text">
                      <v-icon small>mdi-web</v-icon>
                    </v-btn>
                  </v-avatar>
                  {{ contactgrid.website }}
                </v-chip>
             
              
            </v-row>
          </v-card-text>
        </v-card>
      </v-col>
    </v-row>
  </v-container>
</template>


<script>

import axios from "axios";

export default {
  name: "productores",
  data: () => ({
    valid: true,
    dialog: false,
    search: "",
    contactname: "",
    phone: "",
    role: "",
    img: "/1.jpg",
    address: "",
    twitterfollowers: "",
    instafollowers: "",
    fbfollowers: "",
    contactfilter: [
{"DNI_RUC":"98765432",
"apellido":"apellido2",
"calificacion":202.0,
"correo":"correo2@gmail.com",
"descripcion_larga":"descripcion2",
"nombre":"nombre2","npersonas":120,
"password":"password2","telefono":"12345678",
"ubicacion_map_lat":-16.398612833254646,
"ubicacion_map_long":-71.53695924733312,
"usuario_id":3,"website":"lalalpansitos2.com"
},
{
  "DNI_RUC":"78007943",
"apellido":"Lorenzo",
"calificacion":0.0,
"correo":"{correo}","descripcion_larga":"",
"nombre":"Nombrecito",
"npersonas":0,
"password":"contrasena1",
"telefono":"946748360",
"ubicacion_map_lat":0.0,
"ubicacion_map_long":0.0,
"usuario_id":5,
"website":""},

    ],
   
  }),
  created(){
    this.listar();
  },
  methods: {
     toDir(cod){      
       
      this.$router.push(
        {
          name: "Productores",
          params:{
            id: cod,
          }
        }     
      );
    },
  
     listar(){
      let my = this;                  
        axios.get("https://capacitacion-docente.herokuapp.com/users/").then(function(response){
       console.log("datadata "+response.data.data);
       my.contactfilter = response.data.data;
       console.log("entro okii");
          console.log(my.options);
          
          })
        .catch(err => {
          console.log(err.response.data)
        });
    },
  },
  computed: {
    events() {
      return this.$store.state.contactEvents;
    },
   
    contactgrids() {
      return this.contactfilter.filter(
        contactgrid =>
          contactgrid.nombre
            .toLowerCase()
            .includes(this.search.toLowerCase()) ||
          contactgrid.apellido.toLowerCase().includes(this.search.toLowerCase())
      );
    },
    
  }
};
</script>