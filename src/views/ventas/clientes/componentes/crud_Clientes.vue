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
      sort-by="CLI_NOM">
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
                <v-card-title  class="pa-4 info">
                  <span >{{ formTitle }}</span>
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
                         v-model="CLI_NOM" label="Nombres" type="text" value="" v-on:keypress="isLetter($event,160,'nom_')" :counter="160"></v-text-field>
                      </v-col>
                      <v-col cols="12" sm="6" md="6">
                        <v-text-field outlined prepend-inner-icon="mdi-account" :rules="textoRulesRequired" ref="ape_"
                        v-model="CLI_APE" label="Apellidos" value="" type="text" v-on:keypress="isLetter($event,160,'ape_')" :counter="160"></v-text-field>
                      </v-col>
                         <v-col cols="12" sm="6" md="6">
                        <v-text-field outlined prepend-inner-icon="mdi-account" :rules="dniRules"  ref="dni_"
                         v-model="CLI_DNI" label="DNI" type="text" v-on:keypress="isDNI($event)" ></v-text-field>
                      </v-col>
                          <v-col cols="12" sm="6" md="6">
                        <v-text-field outlined prepend-inner-icon="mdi-phone" :rules="celRules"
                         v-model="CLI_CEL" label="Celular"  ref="cel_" v-on:keypress="isCEL($event)"  ></v-text-field>
                      </v-col>
                      <v-col cols="12" sm="6" md="6">
                        <v-text-field outlined prepend-inner-icon="mdi-account"
                        v-model="CLI_RAZ_SOC" label="Razón social" value="" ref="raz_" :counter="160" v-on:keypress="isMax($event,160,'raz_')" ></v-text-field>
                      </v-col>
                   
                      <v-col cols="12" sm="6" md="6">
                        <v-text-field outlined prepend-inner-icon="mdi-domain" :rules="rucRules" ref="ruc_"
                        v-model="CLI_RUC" label="RUC" type="number" v-on:keypress="isRUC($event)" ></v-text-field>
                      </v-col>                      
                  
                      <v-col cols="12" sm="6" md="6">
                        <v-text-field outlined prepend-inner-icon="mdi-email" :rules="emailRules"
                          v-model="CLI_COR" label="Correo" value="" ref="cor_" :counter="160" v-on:keypress="isMax($event,160,'cor_')" ></v-text-field>
                      </v-col>
                      <v-col cols="12" sm="6" md="6">
                        <v-text-field outlined prepend-inner-icon="mdi-home" ref="dir_"
                         v-model="CLI_DIR" label="Dirección" type="text" value="" :counter="160" v-on:keypress="isMax($event,160,'dir_')" ></v-text-field>
                      </v-col>
                    <!--                    
                      <template  v-if=false > 
                        <v-col class="d-flex" cols="12" sm="6" md="6" center>
                        <v-select v-model="AGR_EST" :items="op_estados" label="Estado" outlined ></v-select>
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
                  <v-btn color="blue darken-1" text @click="save">{{action_form}}</v-btn>
                </v-card-actions>
              </v-card>
              </v-form> <!-- fin formulario -->
            </v-dialog>
          </v-toolbar>
        </template>
        <template v-slot:[`item.nombre_completo`]="{ item }"> {{item.CLI_NOM}} {{item.CLI_APE}}
        </template>
        <template v-slot:[`item.actions`]="{ item }">
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
    
  name: "crud_Clientes",

  data: () => ({
    singular: "cliente",
    tableTitle: "Lista de "+"clientes",
    action:"nothing",
    campoEstado: false,
    op_estados: ['ACTIVO', 'INACTIVO'],
            
    dialog: false, 
    
    headers: [
      { align: "start", sortable: false,
      // atributos de cada item
      //text: "" , value: "CLI_COD"},
       text: "Cliente" , value: "nombre_completo"},
      { text: "Razón social" , value: "CLI_RAZ_SOC"},
      { text: "DNI" , value: "CLI_DNI"},
      { text: "RUC" , value: "CLI_RUC"},
      { text: "Celular" , value: "CLI_CEL"},
      { text: "Correo" , value: "CLI_COR"},
      { text: "Dirección" , value: "CLI_DIR"},
      //{ text: "" , value: "CLI_EST"},
      //{ text: "" , value: "CLI_FE_CREA"},
      
      // opciones por cada item
      { text: "Opciones", value: "actions", sortable: false }
    ],

    search:"", // BUSQUEDA
    lista: [],
    POST_add : 'cli/add/',
    DELETE_delete : 'cli/delete/',
    PUT_edit : 'cli/edit/',
    GET_list : 'cli/list/',
  
    /// datos para guardar
    CLI_COD : null,
    CLI_NOM : null,
    CLI_APE : null,
    CLI_RAZ_SOC : null,
    CLI_DNI : null,
    CLI_RUC : null,
    CLI_CEL : null,
    CLI_COR : null,
    CLI_DIR : null,
    CLI_EST : "ACTIVO",
    CLI_FE_CREA : new Date(),

    editedIndex: -1,

    editedItem: {
      CLI_COD : null,
      CLI_NOM : null,
      CLI_APE : null,
      CLI_RAZ_SOC : null,
      CLI_DNI : null,
      CLI_RUC : null,
      CLI_CEL : null,
      CLI_COR : null,
      CLI_DIR : null,
      CLI_EST : "ACTIVO",
      CLI_FE_CREA : new Date(),
    },
     // data validación
    valid: true,
    error: false,
    msg_error: "",
    errores: [],
    selectRules: [
       (v) => !!v || "Este dato es requerido",
    ],
    textoRules: [
      (v) => (!v || v.length <= 60) || "El texto debe tener menos de 60 caracteres",
    ],
    textoRulesRequired: [
      (v) => !!v || "Este campo es requerido",
      (v) =>
        (v && v.length <= 60) || "El texto debe tener menos de 60 caracteres",
    ],
     emailRules: [
      v => !v || /.+@.+\..+/.test(v) || "El correo debe ser válido",
      v => (!v && v.length <= 160) || "El texto debe no debe exceder de 160 caracteres", 
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
    this.from_indicadores(),
    this.listar()
  },

  methods: {
      //validaciones 
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

    from_indicadores(){ // solo si se quiere un acceso directo
      if(this.$route.params.ad==="ad")
      this.addItem();
    },
    // metodos de validaciónn
    mostrarErrores() {
      // se entiende que ya hay errores almacenados
      this.msg_error = "";
      for (let i = 0; i < this.errores.length; i++) {
        this.msg_error = this.msg_error + "\n" + this.errores[i];
      }
      this.error = true;
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

      this.editedItem = Object.assign({}, item);
      my.CLI_COD= my.editedItem.CLI_COD;
      my.CLI_NOM= my.editedItem.CLI_NOM;
      my.CLI_APE= my.editedItem.CLI_APE;
      my.CLI_RAZ_SOC= my.editedItem.CLI_RAZ_SOC;
      my.CLI_DNI= my.editedItem.CLI_DNI;
      my.CLI_RUC= my.editedItem.CLI_RUC;
      my.CLI_CEL= my.editedItem.CLI_CEL;
      my.CLI_COR= my.editedItem.CLI_COR;
      my.CLI_DIR= my.editedItem.CLI_DIR;
      my.CLI_EST= my.editedItem.CLI_EST;
      my.CLI_FE_CREA= my.editedItem.CLI_FE_CREA;

      my.dialog = true;
    },

    deleteItem(item) {
      let my = this;
      my.editedItem = Object.assign({}, item);
      confirm("¿Está seguro de querer eliminar este registro?") &&
        axios.delete(my.DELETE_delete+my.editedItem.CLI_COD+"/", { 
             
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
    my.CLI_COD = "";
    my.CLI_NOM = "";
    my.CLI_APE = "";
    my.CLI_RAZ_SOC = "";
    my.CLI_DNI = "";
    my.CLI_RUC = "";
    my.CLI_CEL = "";
    my.CLI_COR = "";
    my.CLI_DIR = "";
    my.CLI_EST = "ACTIVO";
    my.CLI_FE_CREA = new Date();
    },

    
    save() { this.$refs.form.validate();
      if (this.$refs.form.validate(true)) {
        this.errores = [];
      let my = this;  
        if(my.action==="Editar"){
                
       axios.put(my.PUT_edit+my.editedItem.CLI_COD+"/", {
            "CLI_COD": my.editedItem.CLI_COD,
            "CLI_NOM" : my.CLI_NOM,
            "CLI_APE" : my.CLI_APE,
            "CLI_RAZ_SOC" : my.CLI_RAZ_SOC,
            "CLI_DNI" : my.CLI_DNI,
            "CLI_RUC" : my.CLI_RUC,
            "CLI_CEL" : my.CLI_CEL,
            "CLI_COR" : my.CLI_COR,
            "CLI_DIR" : my.CLI_DIR,
            "CLI_EST" : my.CLI_EST,
            "CLI_FE_CREA" : my.CLI_FE_CREA
         }).then(response =>{
            console.log(response);
            my.close();
            my.listar();
            my.limpiar();           
        }).catch(err => {
            console.log(err.response.data);
            if (err.response.status == 400) {
                console.log(err.response.data);
                if (err.response.data.CLI_APE != null) {
                  this.errores.push("Debe ingresar un apellido");
                }
                if (err.response.data.CLI_NOM != null) {
                  this.errores.push("Debe ingresar un nombre");
                }
                this.mostrarErrores();
              }
        
        });
        

        }else{          
          //cod para agregar 
          axios.post(my.POST_add,{
            "CLI_NOM" : my.CLI_NOM,
            "CLI_APE" : my.CLI_APE,
            "CLI_RAZ_SOC" : my.CLI_RAZ_SOC,
            "CLI_DNI" : my.CLI_DNI,
            "CLI_RUC" : my.CLI_RUC,
            "CLI_CEL" : my.CLI_CEL,
            "CLI_COR" : my.CLI_COR,
            "CLI_DIR" : my.CLI_DIR,
            "CLI_EST" : my.CLI_EST,
            "CLI_FE_CREA" : my.CLI_FE_CREA
          }).then(function(response){
            console.log(response.data);
            my.close();
            my.listar();
            my.limpiar();
          }).catch(err => {
            console.log(err.response.data);
            if (err.response.status == 400) {
                console.log(err.response.data);
                if (err.response.data.CLI_APE != null) {
                  this.errores.push("Debe ingresar un apellido");
                }
                if (err.response.data.CLI_NOM != null) {
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