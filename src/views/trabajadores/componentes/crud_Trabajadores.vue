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
      sort-by="AGR_NOM">
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
                      <v-col cols="12" sm="6" md="6">
                        <v-text-field outlined prepend-inner-icon="mdi-account"  :rules="textoRulesRequired" ref="nom_"
                         v-model="TRA_NOM" label="Nombres" type="text" value="" v-on:keypress="isLetter($event,160,'nom_')" :counter="160"></v-text-field>
                      </v-col>
                      <v-col cols="12" sm="6" md="6">
                        <v-text-field outlined prepend-inner-icon="mdi-account" :rules="textoRulesRequired" ref="ape_"
                        v-model="TRA_APE" label="Apellidos" value="" v-on:keypress="isLetter($event,160,'ape_')" :counter="160"></v-text-field>
                      </v-col>
                         <v-col cols="12" sm="6" md="6">
                        <v-text-field outlined prepend-inner-icon="mdi-account" :rules="dniRules"
                         v-model="TRA_DNI" label="DNI" ref="dni_" v-on:keypress="isDNI($event)"  ></v-text-field>
                      </v-col>
                          <v-col cols="12" sm="6" md="6">
                        <v-text-field outlined prepend-inner-icon="mdi-phone" :rules="celRules"
                         v-model="TRA_CEL" label="Celular" ref="cel_" v-on:keypress="isCEL($event)" ></v-text-field>
                      </v-col>                    
                  
                      <v-col cols="12" sm="6" md="6">
                        <v-text-field outlined prepend-inner-icon="mdi-email" :rules="emailRules"
                          v-model="TRA_COR" label="Correo" value="" ref="cor_" :counter="160" v-on:keypress="isMaxSinEspacios($event,254,'cor_')" ></v-text-field>
                      </v-col>
                      <v-col cols="12" sm="6" md="6">
                        <v-text-field outlined prepend-inner-icon="mdi-home"
                         v-model="TRA_DIR" label="Dirección" value="" ref="dir_" :counter="160" v-on:keypress="isMax($event,160,'dir_')"></v-text-field>
                      </v-col>
                    <!--                    
                      <template  v-if=false > 
                        <v-col class="d-flex" cols="12" sm="6" md="6" center>
                        <v-select v-model="TRA_ESTADO" :items="op_estados" label="Estado" outlined ></v-select>
                      </v-col>
                    </template>
                      -->
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
              </v-form> <!-- fin formulario -->
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
    
  name: "crud_Trabajadores",

  data: () => ({
    singular: "trabajador",
    tableTitle: "Lista de "+"trabajadores",
    action:"nothing",
    campoEstado: false,
    op_estados: ['ACTIVO', 'INACTIVO'],
            
    dialog: false, 
    
    headers: [
      { align: "start", sortable: false,
      // atributos de cada item
        text: "Nombre" , value: "TRA_NOM"},
      {text: "Apellido" , value: "TRA_APE"},
    //  { text: "Estado" , value: "TRA_ESTADO"},
      { text: "DNI", value: "TRA_DNI" },
      { text: "Celular", value: "TRA_CEL" },
      { text: "Correo", value: "TRA_COR" },
      { text: "Dirección", value: "TRA_DIR" },
      
      // opciones por cada item
      { text: "Opciones", value: "actions", sortable: false }
    ],

    search:"", // BUSQUEDA
    lista: [],
    POST_add : 'tra/add/',
    DELETE_delete : 'tra/delete/',
    PUT_edit : 'tra/edit/',
    GET_list : 'tra/list/',
  
    /// datos para guardar
    TRA_COD : null,
    TRA_NOM : null,
    TRA_APE : null,
    TRA_ESTADO : "ACTIVO",
    TRA_DNI : null,
    TRA_CEL : null,
    TRA_COR : null,
    TRA_DIR : null,

    editedIndex: -1,

    editedItem: {
    TRA_COD : null,
    TRA_NOM : null,
    TRA_APE : null,
    TRA_ESTADO : "ACTIVO",
    TRA_DNI : null,
    TRA_CEL : null,
    TRA_COR : null,
    TRA_DIR : null,
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
      (v) => !!v || "Este campo es requerido",
    ],
     emailRules: [
      v => !v || /.+@.+\..+/.test(v) || "El correo debe ser válido",
    ],
    rucRules: [
      v => !v || /[1-2]{1}[0-9]{10}/.test(v) || "Ingrese un RUC válido",
    ],
    dniRules: [
     
      v => !v || (/[0-9]{8,12}/).test(v) || "Ingrese un DNI/Carnet válido",
    ],
    celRules: [
      v => !v || /^\(?\+?\d{2,3}\)?[\s]?[0-9]{3}[\s]?[0-9]{3}[\s]?[0-9]{0,3}/.test(v) || "Ingrese un celular válido",
    ],      
  }),
  computed: {
    formTitle() {
      return this.action === "Agregar" ? ("Agregar "+this.singular) : ("Editar "+this.singular);
    },
    action_form() {
      return this.action === "Agregar" ? ("Agregar") : ("Editar");
    
    },
    
  },

  watch: {
    dialog(val) {
      val || this.close();
    }
  },

  created() {
    this.listar()
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
      let len = this.$refs[ref_].value.length;
    if(len!=null && len>=max) e.preventDefault();
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
  isNumber(e)
  {
    let numero = String.fromCharCode(e.keyCode);
    if (!/^([0-9])*$/.test(numero)) 
              e.preventDefault();
  },
  isRUC(e) // no puede tener mas de 13 caracteres
  {
    let max = 11;
    let n = this.$refs["ruc_"].value.length;
    let char = String.fromCharCode(e.keyCode);
    let regexp = "";     
    switch(n){
      case 0: regexp = /[1-2]/; break;
      case 1: regexp = /[0]/; break;
      default: regexp = /^([0-9])*$/; break;    
    } 
    if(regexp.test(char) && n< max) return true;
    else e.preventDefault();
  },
    isDNI(e)
  {
    let max = 12;
    let n = this.$refs["dni_"].value.length;
    let char = String.fromCharCode(e.keyCode);
    let regexp = /^([0-9])*$/;    
    
    if(regexp.test(char) && n< max) return true;
    else e.preventDefault();
  },
    isCEL(e) // +051946748360 , 987653457, 054345345, +51946748360
    //  /^\(?\+?\d{2,3}\)?[\s]?[0-9]{3}[\s]?[0-9]{3}[\s]?[0-9]{0,3}/
  {
    let max = 15;
    let n = this.$refs["cel_"].value.length;    
    let value = this.$refs["cel_"].value;
    let char = String.fromCharCode(e.keyCode);
    console.log("char: "+char + "value: "+value);
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
                  
              else if (( value.lastIndexOf(")",0)!=-1 && (n-(value.lastIndexOf(")",0)+1))%3==0) || (value.lastIndexOf(" ",0)!=-1 && (n- (value.lastIndexOf(" ",0))+1)%3==0) ) 
                    regexp = /^(\s|\d)*$/;
                    else
                    regexp = /^(\d)*$/;
   
    
    if(n==5)
      if(value[0] ==="(" && !value.includes(')'))
       regexp = /^(\))*$/;
    
  if(regexp.test(char) && n< max) return true;
    else e.preventDefault();
    
  },
  
    // metodos de validaciónn
    mostrarErrores() {
      // se entiende que ya hay errores almacenados
      this.msg_error = "";
      for (let i = 0; i < this.errores.length; i++) {
        this.msg_error = this.msg_error + "\n" + this.errores[i];
      }
      this.error = true; // MUESTRA ALERTA
    },
 
    //PROCEDIMIENTOS para el CRUD  
    //Procedimiento Listar 
    listar(){
      let my = this;      
        axios.get(my.GET_list).then(function(response){my.lista = response.data;})
        .catch(function(err) {console.log(err.response.data)});
    }, //fin listar


    addItem(){
      let my = this;      
      my.action= "Agregar";
      my.campoEstado = false;
      my.limpiar(); 
      my.dialog = true;
    },
   
    editItem(item) {
      let my = this;
      my.action= "Editar";
      my.campoEstado = true,

      my.editedItem = Object.assign({}, item);
      my.TRA_COD= my.editedItem.TRA_COD;
      my.TRA_NOM= my.editedItem.TRA_NOM;
      my.TRA_APE= my.editedItem.TRA_APE;
      my.TRA_ESTADO= my.editedItem.TRA_ESTADO;
      my.TRA_DNI= my.editedItem.TRA_DNI;
      my.TRA_CEL= my.editedItem.TRA_CEL;
      my.TRA_COR= my.editedItem.TRA_COR;
      my.TRA_DIR= my.editedItem.TRA_DIR;

      my.dialog = true;
    },

    deleteItem(item) {
      let my = this;
      my.editedItem = Object.assign({}, item);
      confirm("¿Está seguro de querer eliminar este registro?") &&
        axios.delete(my.DELETE_delete+my.editedItem.TRA_COD+"/", { 
             
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
    my.TRA_COD = "";
    my.TRA_NOM = "";
    my.TRA_APE = "";
    my.TRA_ESTADO = "ACTIVO";
    my.TRA_DNI = "";
    my.TRA_CEL = "";
    my.TRA_COR = "";
    my.TRA_DIR = "";
    },

    
    save() { this.$refs.form.validate();
      if (this.$refs.form.validate(true)) {
        this.errores = [];
      let my = this;  
        if(my.action==="Editar"){
                
       axios.put(my.PUT_edit+my.editedItem.TRA_COD+"/", {
            "TRA_COD": my.editedItem.TRA_COD,
            "TRA_NOM" : my.TRA_NOM,
            "TRA_APE" : my.TRA_APE,
            "TRA_ESTADO" : my.TRA_ESTADO,
            "TRA_DNI" : my.TRA_DNI,
            "TRA_CEL" : my.TRA_CEL,
            "TRA_COR" : my.TRA_COR,
            "TRA_DIR" : my.TRA_DIR,
         }).then(response =>{
            console.log(response);
            my.close();
            my.listar();
            my.limpiar();           
        }).catch(err => {
            console.log(err.response.data);
            if (err.response.status == 400) {
                console.log(err.response.data);
                if (err.response.data.TRA_APE != null) {
                  this.errores.push("Debe ingresar un apellido");
                }
                if (err.response.data.TRA_NOM != null) {
                  this.errores.push("Debe ingresar un nombre");
                }
                this.mostrarErrores();
              }
        
        });
        

        }else{          
          //cod para agregar 
          axios.post(my.POST_add,{
            "TRA_NOM" : my.TRA_NOM,
            "TRA_APE" : my.TRA_APE,
            "TRA_ESTADO" : my.TRA_ESTADO,
            "TRA_DNI" : my.TRA_DNI,
            "TRA_CEL" : my.TRA_CEL,
            "TRA_COR" : my.TRA_COR,
            "TRA_DIR" : my.TRA_DIR
          }).then(function(response){
            console.log(response.data);
            my.close();
            my.listar();
            my.limpiar();
          }).catch(err => {
            console.log(err.response.data);
            if (err.response.status == 400) {
                
                console.log(err.response.data);
                if (err.response.data.TRA_APE != null) {
                  this.errores.push("Debe ingresar un apellido");
                }
                if (err.response.data.TRA_NOM != null) {
                  this.errores.push("Debe ingresar un nombre");
                }
                this.mostrarErrores();
              }
          });
         
        }
        
     } // fin validación
    }, //fin método
  }
};
</script>