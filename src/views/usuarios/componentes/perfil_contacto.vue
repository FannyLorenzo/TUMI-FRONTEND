<template>
  <v-card class="mb-7">
   
    <v-card-text class="pa-5 border-bottom">
      <form>
        <v-row>
          <v-col cols="12" sm="6" lg="6" class="pt-0">
            <v-text-field label="First Name" v-model="current_user.nombre" :disabled="!editando"></v-text-field>
            <v-text-field label="Username" v-model="current_user.username" :disabled="!editando"></v-text-field>
          </v-col>
          <v-col cols="12" sm="6" lg="6" class="pt-0">
            <v-text-field label="Last Name" v-model="current_user.apellido" :disabled="!editando"></v-text-field>
            <v-text-field label="DNI/RUC" v-model="current_user.DNI_RUC" :disabled="!editando"></v-text-field>
          </v-col>
        </v-row>
      </form>
    </v-card-text>
    <v-card-text class="pa-5">
      <v-row class="mt-3">
        <v-col class="12" sm="6" lg="6">
          <v-text-field label="Email" v-model="current_user.correo" :disabled="!editando"></v-text-field>
        </v-col>
        <v-col class="12" sm="6" lg="6">
          <v-text-field label="Website" v-model="current_user.website" :disabled="!editando"></v-text-field>
        </v-col>
        <v-col cols="12">
          <v-text-field label="Contact no" v-model="current_user.telefono" :disabled="!editando"></v-text-field>
        </v-col>
        <v-col cols="6">
          <v-text-field label="Link de Foto" v-model="current_user.foto" :disabled="!editando"></v-text-field>
        </v-col>
        <v-col cols="6">
          <v-text-field label="Link de Imagen de Cabecera" v-model="current_user.landpage" :disabled="!editando"></v-text-field>
        </v-col>
        <v-col cols="12">
          <v-textarea counter label="Quienes somos?" rows="2" :rules="rules" v-model="current_user.descripcion_larga" :disabled="!editando"></v-textarea>
        </v-col>
      </v-row>
    </v-card-text>
    <div class="pa-5 border-top text-right">
      <v-btn  v-show="!editando" color="primary" class="mr-2 text-capitalize" @click="editar" >Editar</v-btn>
      <v-btn  v-show="editando" color="black" class="text-capitalize" @click="guardar" dark>Guardar cambios</v-btn>
    </div>
  </v-card>
</template>

<script>
//import axios from 'axios';
import { mapState } from "vuex";
import axios from "axios";

export default {
  name: "perfil_contacto",
  data: () => ({
    // variable accesoria
    editando: false,
    options:[],

    //datos
    nombre: "",
    apellido:"",
    username:"",
    email:"",
    website:"",
    celular:"",
    dni_ruc:"",
    descripcion_larga:"",
       
    
    rules: [v => v.length <= 250 || "Max 250 characters"]
  }),
  created(){
    this.rellenar_datos();
  },
  computed: {
       
    // variables de store
        ...mapState('auth', ['current_user','count', 'current_id','token']),
        
   
    // fin variables de store

  },
  methods:{
   
    rellenar_datos(){
      let my = this;
    my.nombre= "Carla";
    my.apellido="Martinez";
    my.username="CarlaMartinez";
    my.email="finca_amanecer@gmail.com";
    my.website="http://finca_amanecer.com";
    my.celular="(054) 946748360";
    my.dni_ruc="10584698421";
    my.descripcion_larga="En la finca tenemos todo bien bonis :)";

    },
        editar(){
      this.editando = true;
     
        },
    guardar(){
      this.editando = false;
       let my = this;
       let json = my.current_user;
                         
        axios.post("https://capacitacion-docente.herokuapp.com/users/edit/",json).then(function(response){
       console.log("datadata "+response.data.message);
       console.log("entro okii");
             
          })
        .catch(function(err) {
          console.log(err.response.data)
        });


    },
    cancelar(){
      this.editando = false;
    }

  }
};
</script>