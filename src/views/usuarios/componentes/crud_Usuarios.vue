<template>
 <div>

    <div class="mt-4">
      <v-data-table 
      :headers="headers" 
      :items="lista"
      class="elevation-1"      
      :search="search"      
        :footer-props="{
        showFirstLastPage: true,
        firstIcon: 'mdi-arrow-collapse-left',
        lastIcon: 'mdi-arrow-collapse-right',
        prevIcon: 'mdi-minus',
        nextIcon: 'mdi-plus',
        pageText: '{0}-{1} de {2}',
        'items-per-page-text':'Registros por página'
      }"
      sort-by="username">
        <template v-slot:top>
          <v-toolbar flat color="black">
            <v-toolbar-title>{{tableTitle}}</v-toolbar-title>
            <v-divider class="mx-4" inset vertical></v-divider>
            <v-spacer></v-spacer>
            
            <v-text-field class="text-xs-center" v-model="search" append-icon="search" label="Búsqueda" single-line hide-details></v-text-field>
            <v-spacer></v-spacer>
            
            <v-dialog v-model="dialog" max-width="700px">
              <template v-slot:activator="{ on }">
                <v-btn color="primary" dark class="mb-2" v-on="on" @click="addItem">Agregar {{singular}}</v-btn>
              </template>
               <v-form ref="form" v-model="valid" lazy-validation> <!-- FORMULARIO -->
              <v-card>
                <v-card-title  class="pa-4 orange">
                  
                </v-card-title>

                <v-card-text>
                  <v-container>
                    <v-card-text>
                  <v-container>
                    <v-row>
                      <h3 class="headline white--text"> {{ formTitle }}</h3>
                    </v-row>
                    
                    <v-row>
                      <v-col cols="12" sm="12" md="12">
                        <v-text-field outlined prepend-inner-icon="mdi-account" ref="nom_" :rules="textoRulesRequired"
                         v-model="username" label="Usuario" type="text" v-on:keypress="isMaxSinEspacios($event,150,'nom_')" :counter="150"></v-text-field>
                      </v-col>
                      <v-col cols="12" sm="6" md="6">
                        <v-text-field outlined prepend-inner-icon="mdi-account" ref="fir_" :rules="textoRulesRequired"
                         v-model="first_name" label="Nombres" v-on:keypress="isLetter($event,150,'fir_')" :counter="150"></v-text-field>
                      </v-col>
                      <v-col cols="12" sm="6" md="6">
                        <v-text-field outlined prepend-inner-icon="mdi-account" ref="las_" :rules="textoRulesRequired"
                        v-model="last_name" label="Apellidos" type="text" v-on:keypress="isLetter($event,150,'las_')" :counter="150"></v-text-field>
                      </v-col>
                      <v-col cols="12" sm="12" md="12">
                        <v-text-field outlined prepend-inner-icon="mdi-email" :rules="emailRules"
                          v-model="email" label="Correo:"  ref="cor_" :counter="254" v-on:keypress="isMaxSinEspacios($event,254,'cor_')"></v-text-field>
                      </v-col>
                      
                      <v-col cols="12" sm="6" md="6">
                        <v-text-field outlined  prepend-inner-icon="mdi-phone" :rules="celRules" 
                         v-model="telefono" label="Nro celular" ref="cel_" v-on:keypress="isCEL($event,15,'cel_')"  ></v-text-field>
                      </v-col>


                       <v-col cols="12" sm="12" md="12">
                        <v-text-field outlined prepend-inner-icon="mdi-password" :rules="textoRulesRequired"
                          v-model="password" label="Contraseña" ref="pas_" :counter="128" v-on:keypress="isMaxSinEspacios($event,128,'pas_')" ></v-text-field>
                      </v-col>
                                        
                      <template>                      

                     
                       <v-col class="d-flex" cols="12" sm="12" md="12" center>                           
                              <v-select 
                                    outlined
                                    prepend-inner-icon="mdi-account"
                                    v-model="selected"
                                    :items="options"
                                    :item-text="item => item.name"
                                    item-value="id"                            
                                    label="Rol"
                                    persistent-hint
                                    no-data-text="No se tiene registros"
                                    :rules="selectRules" 
                                  ></v-select>
                            </v-col>
                    </template>  
                    </v-row>
                  </v-container>
                </v-card-text>


                  </v-container>
                </v-card-text>

                <v-card-actions>
                  <v-spacer></v-spacer>
                  <v-btn color="blue darken-1" text @click="close">Cancelar</v-btn>
                  <v-btn :disabled="!valid" color="blue darken-1" text @click="save">{{action_form}}</v-btn>
                </v-card-actions>
              </v-card>
               </v-form>
            </v-dialog>
          </v-toolbar>
        </template>
        <template v-slot:item.actions="{ item }">
          <v-icon medium class="mr-2" @click="editItem(item)" >mdi-pencil</v-icon>
          <v-icon medium @click="deleteItem(item)">mdi-delete</v-icon>
        </template>
        <template v-slot:no-data>
          <v-btn color="primary" @click="listar">Reset</v-btn>
        </template>
      </v-data-table>
    </div>
  </div>
</template>

<script>
import axios from 'axios';

export default {
    
  name: "crud_Usuarios",
 // el: '...',

  data: () => ({
    
    singular: "usuario",
    tableTitle: "Lista de "+"usuarios",
    action:"nothing",
    campoEstado: false,
    selected: '2',
    options: [],      
            
    dialog: false, 
    
    headers: [
      { align: "start", sortable: false,
      // atributos de cada item
      //  text: "Codigo", value: "id" },
       text: "Usuario", value: "username" },
      { text: "Nombre", value: "first_name" },
      { text: "Apellido", value: "last_name" },
       { text: "Teléfono", value: "telefono" },
      { text: "Correo", value: "email" },
      { text: "Rol", value: "groups[0].name" },
      
      // opciones por cada item
      { text: "Opciones", value: "actions", sortable: false }
    ],

    search:"", // BUSQUEDA
    lista: [],
    POST_add : 'usr/register/',
    GET_list : 'usr/listv1/',
    PUT_edit : 'usr/edit/',
    DELETE_delete : 'usr/delete/',
    

    /// datos para guardar
    id: "",
    username: "",
    email: "",
    password: "",
    first_name: "",
    last_name: "",
    telefono:"",

    groups: [],    
    
    editedIndex: -1,

    editedItem: {
    id: "",
    username: "",
    email: "",
    password: "",
    first_name: "",
    last_name: "",
    telefono:"",
    groups: [],
    },

    // data validación
    valid: true,
    error: false,
    msg_error: "",
    errores: [],
    selectRules: [
       (v) => !!v || "Este dato es requerido",
    ],
     textoRulesRequired: [
      (v) => !!v || "Este campo es requerido",      
    ],
    textoRules: [
     
      (v) => (!v && v.length <= 160) || "El texto debe no debe exceder de 160 caracteres",
    ],
     emailRules: [
      (v) => !!v || "Este campo es requerido",     
      v => !v || /.+@.+\..+/.test(v) || "El correo debe ser válido",
     
    ],    
    celRules: [
       (v) => !!v || "Este campo es requerido",
      v => !v || /^\(?\+?\d{2,3}\)?[\s]?[0-9]{3}[\s]?[0-9]{3}[\s]?[0-9]{0,3}/.test(v) || "Ingrese un correo válido",
    ], 


  }),
  computed: {
    formTitle() {
      return this.action === "Agregar" ? ("Agregar "+this.singular) : ("Editar "+this.singular);
    },
    action_form() {
      return this.action === "Agregar" ? ("Agregar") : ("Editar");
    
    }
    
  },

  watch: {
    dialog(val) {
      val || this.close();
    }
  },

  created() {
    this.listar()
    this.listarRoles();
  },

  methods: {
     //validaciones
     isMaxSinEspacios(e,max,ref_)
  {
    if(this.$refs[ref_].value!= null){
    let n = this.$refs[ref_].value.length;
    if(n>=max) e.preventDefault();
    } 
     let char = String.fromCharCode(e.keyCode);
    if(/^[\s]+$/.test(char)) e.preventDefault();
  },
    isMax(e,max,ref_)
  {
     if(this.$refs[ref_].value!= null){
      let n = this.$refs[ref_].value.length;
      let value = this.$refs[ref_].value;
      let char = String.fromCharCode(e.keyCode);
      if(n>=max) e.preventDefault();
      if(/^[\s]+$/.test(char) && (n==0 || /^[\s]+$/.test(value[n-1]))) e.preventDefault();
      
    } 
  },
    isLetter(e, max,ref_ )
  {
  let n=0; let value=""; let char;
    if(this.$refs[ref_].value!= null){
      n = this.$refs[ref_].value.length;
      value = this.$refs[ref_].value;
      char = String.fromCharCode(e.keyCode);
      // console.log("len: "+n+" char: "+char + " value: "+value);  
     
      if(n>=max) e.preventDefault();       
      if(/^[\s]+$/.test(char) && (n==0 || /^[\s]+$/.test(value[n-1]))) e.preventDefault();
      if(/^[A-Za-z |\s ]+$/.test(char)) return true
      else  e.preventDefault();
    } 
    
  },
    isCEL(e,max,ref_) // +051946748360 , 987653457, 054345345, +51946748360
    //  /^\(?\+?\d{2,3}\)?[\s]?[0-9]{3}[\s]?[0-9]{3}[\s]?[0-9]{0,3}/
  {
    
    let n=0; let value=""; let char;
    if(this.$refs[ref_].value!= null){
      n = this.$refs[ref_].value.length;
      value = this.$refs[ref_].value;
      char = String.fromCharCode(e.keyCode);
      // console.log("len: "+n+" char: "+char + " value: "+value);
      let regexp = "";     
      if(n==0)
      regexp = /^(\(|\+|\d)*$/;
      else if (n==1)
              if( value[0] ==="(" )
              regexp = /^(\+|\d)*$/;
              else if ( value[0] ==="+")
              regexp = /^(\d)*$/;
                  else
                  regexp = /^(\d)*$/;
          else if(n >= 3 && n < 5)
                //if(n<5)
                  if(value[0] ==="(" && !value.includes(')'))
                    regexp = /^(\)|\d)*$/;
                  else  
                    regexp = /^(\d)*$/;
                    
                else if (( value.lastIndexOf(")",0)!=-1 && (n-(value.lastIndexOf(")",0)+1))%3==0) ||
                        (value.lastIndexOf(" ",0)!=-1 && (n- (value.lastIndexOf(" ",0))+1)%3==0) ) 
                      regexp = /^(\s|\d)*$/;
                      else
                      regexp = /^(\d)*$/;
    
      
      if(n==5)
        if(value[0] ==="(" && !value.includes(')'))
          regexp = /^(\))*$/;
      
      if(regexp.test(char) && n< max) return true;
        else e.preventDefault();
    }  
  },  

    //PROCEDIMIENTOS para el CRUD  
    listarRoles(){
      let my = this;                  
        axios.get("grp/list/").then(function(response){
        my.options = response.data;
          console.log(my.options);
          
          })
        .catch(function(err) {console.log(err.response.data)});
    },
    //Procedimiento Listar 
    listar(){
      let my = this;
                  
        axios.get(my.GET_list).then(function(response){
        my.lista = response.data;
          console.log(my.lista);
          
          })
        .catch(function(err) {console.log(err.response.data)});
    }, //fin listar


    addItem(){
      let my = this;      
      my.action= "Agregar";
      my.campoEstado = false,
      my.limpiar(); 
      my.dialog = true;
    },
   
    editItem(item) {
      let my = this;
      my.action= "Editar";
      my.campoEstado = true,

      this.editedItem = Object.assign({}, item);
        my.username= my.editedItem.username;
        my.email= my.editedItem.email;
        my.first_name = my.editedItem.first_name;
        my.last_name = my.editedItem.last_name;
        my.telefono = my.editedItem.telefono;
        my.password= my.editedItem.password;
        my.groups= my.editedItem.groups;
      my.dialog = true;
    },

    deleteItem(item) {
      let my = this;
      my.editedItem = Object.assign({}, item);
      confirm("¿Está seguro de querer eliminar este registro?") &&
        axios.delete(my.DELETE_delete+my.editedItem.id+"/", { 
             
         }).then(response =>{
            console.log(response);           
            my.listar(); 
            my.limpiar();          
        }).catch(function(err) {console.log(err.response.data)}); 
    },

    close() {
      this.dialog = false;
    },
    limpiar(){
    let my = this;
    my.username= "";
    my.email = "";
    my.password= "";
    my.last_name = "";
    my.first_name = "";
    my.telefono = "";
    my.groups= [];
    },

    
    save() { 
      this.$refs.form.validate();
      if (this.$refs.form.validate(true)) {
        this.errores = [];
      let my = this;  
        if(my.action==="Editar"){
                
       axios.put(my.PUT_edit+my.editedItem.id+"/", {
            "id": my.editedItem.id,
            "username" : my.username,
            "first_name" : my.first_name,
            "last_name" : my.last_name,
            "telefono" : my.telefono,
            "email" : my.email,
            "password" : my.password,
            "groups" : [my.selected],
            
         }).then(response =>{
            console.log(response);
            my.close();
            my.listar();
            my.limpiar();           
        }).catch(function(err) {console.log(err.response.data)});
        

        }else{          
          //cod para agregar              
          axios.post(my.POST_add,{
            "username" : my.username,
            "first_name" : my.first_name,
            "last_name" : my.last_name,
            "telefono" : my.telefono,
            "email" : my.email,
            "password" : my.password,
            "groups" : [my.selected],
            }).then(function(response){
            console.log(response.data);
            my.close();
            my.listar();
            my.limpiar();
          }).catch(function(err) {console.log(err.response.data)});
         
        }
      } // fin validación   
    }, //fin
  }
};
</script>