<template>
 <div>
    <div class="mt-4">
      <v-data-table 
      :headers="headers" 
      :items="lista"
      class="elevation-1"      
      :search="search = agricultorSeleccionado.nombreCompleto"          
      :footer-props="{
        showFirstLastPage: true,
        firstIcon: 'mdi-arrow-collapse-left',
        lastIcon: 'mdi-arrow-collapse-right',
        prevIcon: 'mdi-minus',
        nextIcon: 'mdi-plus',
        pageText: '{0}-{1} de {2}',
        'items-per-page-text':'Registros por página'
      }"
      >
        <template v-slot:top>
          <v-toolbar flat color="black">
            <v-toolbar-title>{{tableTitle}}</v-toolbar-title>
            <v-divider class="mx-4" inset vertical></v-divider>
            <v-spacer></v-spacer>
            
            <v-text-field hidden class="text-xs-center" v-model="search" append-icon="" label="" single-line hide-details></v-text-field>
            <v-spacer></v-spacer>
            
            <v-dialog v-model="dialog" max-width="500px">
              <template v-slot:activator="{ on }">
                <v-btn color="primary" dark class="mb-2" v-on="on" @click="addItem">Agregar {{singular}}</v-btn>
              </template>

                <v-form ref="form" v-model="valid" lazy-validation> <!-- FORMULARIO -->              
            
              <v-card>
                
                <v-card-title  class="pa-4 orange">
                </v-card-title>
                <v-card-title>
                  <span class="headline">{{ formTitle }}</span>
                </v-card-title>

                <v-card-text>
                  <v-container>
                   <template v-if="campoEstado">
                    <v-row>
                      <v-col cols="12" sm="12" md="12">
                        <h2 >{{HB_CORRELATIVO}}</h2>
                      </v-col>                      
                    </v-row>
                    </template>
                   <v-row>
                    <v-col class="d-flex" cols="12" sm="12" md="12" center>                           
                              <v-select 
                                    outlined
                                    prepend-inner-icon="mdi-account"
                                    v-model="AGR_COD"
                                    :items="op_agricultores"
                                    :item-text="item => item.AGR_NOM +' '+ item.AGR_APE"
                                    item-value="AGR_COD"                            
                                    label="Agricultor"
                                    persistent-hint
                                    no-data-text="No se tiene registros"
                                    :rules="selectRules" 
                                  ></v-select>
                            </v-col>
                    </v-row>
                 
                     <v-row>
                      <v-col cols="12" sm="12" md="12">
                        <v-text-field outlined prepend-inner-icon="ti-clipboard" v-model="HB_DESCRIPCION" :rules="textoRules" label="Descripción" 
                        ref="des_"                         
                        :counter="120"
                        v-on:keypress="isText($event,120,'des_')"
                        ></v-text-field>
                      </v-col>                      
                    </v-row>
                     <v-row>
                      <v-col cols="12" sm="12" md="12">
                        <v-text-field outlined prepend-inner-icon="mdi-cash-multiple" v-model="HB_MONTO" type="number"  :rules="cantidadRules" label="Monto (S/)" v-on:keypress="isPositive($event)"></v-text-field>
                      </v-col>                      
                    </v-row>
                     <v-row>
                      <v-col cols="12" sm="12" md="12">
                        <v-text-field outlined v-model="HB_OBSERVACIONES" type="text" label="Observaciones"
                         ref="com_"                         
                        :counter="120"
                        v-on:keypress="isText($event,120,'com_')"
                        ></v-text-field>
                      </v-col>                      
                    </v-row>
                  <!--  <template hidden v-if="campoEstado" >                      
                        <v-col class="d-flex" cols="12" sm="12" md="12" >
                        <v-select hidden v-model="HB_CONDICION" :items="op_estados" label="Estado" outlined ></v-select>
                      </v-col>
                    </template> -->
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
        <template v-slot:[`item.actions`]="{ item }">
          <v-icon small class="mr-2" @click="editItem(item)" >mdi-pencil</v-icon>
          <v-icon small @click="deleteItem(item)">mdi-delete</v-icon>
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
import { mapState, mapActions } from "vuex";

export default {
  
  name: "crud_Habilitaciones",

  data: () => ({
    singular: "habilitacion",
    tableTitle: "Lista de "+"habilitaciones",
    action:"nothing",
    campoEstado: false,
    op_estados: ['NO LIQUIDADO', 'LIQUIDADO'],
    op_agricultores: [],

    dialog: false,
    headers: [
      { align: "start", sortable: false,
      // atributos de cada item
    // text: "" , value: "HB_COD"},
      text: "Habilitación" , value: "HB_CORRELATIVO"},
      {  text: "Fecha" , value: "HB_FECHA"},
      { text: "Agricultor" , value: "AGR_NOM_APE"},
     // { text: "Agr. apellido" , value: "AGR_COD.AGR_APE"},
      { text: "Descripción" , value: "HB_DESCRIPCION"},
      { text: "Observación" , value: "HB_OBSERVACIONES"},
      { text: "Monto (S/)" , value: "HB_MONTO"},
      //{ text: "Condición" , value: "HB_CONDICION"},
      // opciones por cada item
      { text: "Opciones", value: "actions", sortable: false }
    ],
    search:"", // BUSQUEDA
    lista: [],
    lista_: [],
    POST_add : 'hab/add/',
    DELETE_delete : 'hab/delete/',
    PUT_edit : 'hab/edit/',
    GET_list : 'hab/list/',
    PUT_retrieve : 'hab/retrieve/',  

    /// datos para guardar
    HB_COD : null,
    AGR_COD : null,
    HB_FECHA : new Date(),
    HB_DETALLE : "",
    HB_DESCRIPCION : "",
    HB_MONTO : null,
    HB_CORRELATIVO : null,
    HB_OBSERVACIONES : "",
    HB_CONDICION : "NO LIQUIDADO",

    editedIndex: -1,

    editedItem: {
    HB_COD : null,
    AGR_COD : null,
    HB_FECHA : new Date(),
    HB_DETALLE : "",
    HB_DESCRIPCION : "",
    HB_MONTO : null,
    HB_CORRELATIVO : null,
    HB_OBSERVACIONES : "",
    HB_CONDICION : "NO LIQUIDADO",
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
      (v) => !!v || "Este dato es requerido",      
    ],
     cantidadRules: [
      (v) => !v || /^[+]?\d+([,.]\d+)?$/.test(v) ||/^([0-9])*$/.test(v) || "Ingrese una cantidad válida",
    ],    
  }),
  computed: {
    formTitle() {
      return this.action === "Agregar" ? ("Agregar "+this.singular) : ("Editar "+this.singular);
    },
    action_form() {
      return this.action === "Agregar" ? ("Agregar") : ("Editar");
    },

    
    // variables de store
        ...mapState(["agricultorSeleccionado"]),
    agricultorSeleccionado: {
      get() {
        return this.$store.state.agricultorSeleccionado;
      },
      set(val) {
        this.$store.commit("SET_AGRICULTOR", val);
      },
    },
    // fin variables de store

  },

  watch: {
    dialog(val) {
      val || this.close();
    }
  },

  created() {
    this.from_indicadores(),
    this.listar(),
    this.listarAgricultores()
  },

  methods: {
        
    ...mapActions(["refrescarHabilitaciones"]),
    //validaciones
     isText(e,max,ref_)
  {
     if(this.$refs[ref_].value!= null){
      let n = this.$refs[ref_].value.length;
      let value = this.$refs[ref_].value;
      let char = String.fromCharCode(e.keyCode);
      if(n>=max) e.preventDefault();
      if(/^[\s]+$/.test(char) && (n==0 || /^[\s]+$/.test(value[n-1]))) e.preventDefault();
      
    }else { e.preventDefault(); this.$refs[ref_].value="";}
  },
  isPositive(e)
  {
      let char = String.fromCharCode(e.keyCode);
      if(/^[-]+$/.test(char) ) e.preventDefault();
     
  },

    from_indicadores(){
      if(this.$route.params.ad==="ad")
      this.addItem();
    },
    //PROCEDIMIENTOS para el CRUD  
    listarAgricultores(){
      let my = this;      
        axios.get("agr/list/").then(function(response){my.op_agricultores = response.data;})
        .catch(function(err) {console.log(err.response.data)});
    }, //fin listar

    //Procedimiento Listar 
    listar(){
      let my = this;      
        axios.get(my.GET_list).then(function(response){my.lista = response.data;})
        .catch(function(err) {console.log(err)});
        
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

      my.editedIndex = my.lista.indexOf(item);
      my.editedItem = Object.assign({}, item);

      my.HB_COD= my.editedItem.HB_COD;
      my.AGR_COD= my.editedItem.AGR_COD.AGR_COD;
      my.HB_FECHA= my.editedItem.HB_FECHA;
      my.HB_DETALLE= my.editedItem.HB_DETALLE;
      my.HB_DESCRIPCION= my.editedItem.HB_DESCRIPCION;
      my.HB_MONTO= my.editedItem.HB_MONTO;
      my.HB_CORRELATIVO= my.editedItem.HB_CORRELATIVO;
      my.HB_OBSERVACIONES= my.editedItem.HB_OBSERVACIONES;
      my.HB_CONDICION= my.editedItem.HB_CONDICION;

      my.dialog = true;
    },

    deleteItem(item) {
      let my = this;
      my.editedItem = Object.assign({}, item);
      confirm("¿Está seguro de querer eliminar este registro?") &&
        axios.delete(my.DELETE_delete+my.editedItem.HB_COD+"/", { 
              
         }).then(response =>{
            console.log(response);           
            my.listar(); 
            my.limpiar();
            my.refrescarHabilitaciones();          
        }).catch(err => {console.log(err.response.data)}); 
    },

    close() {
      this.dialog = false;
    },
    limpiar(){

   let my =this;
    my.HB_COD = null;
    my.AGR_COD = null;
    my.HB_FECHA = new Date();
    my.HB_DETALLE = null;
    my.HB_DESCRIPCION = null;
    my.HB_MONTO = null;
    my.HB_CORRELATIVO = "";
    my.HB_OBSERVACIONES = "";
    my.HB_CONDICION = "NO LIQUIDADO";
    },

    
    save() {
       this.$refs.form.validate();
      if (this.$refs.form.validate(true)) {
        this.errores = [];
      let my = this;  
        if(my.action==="Editar"){
                
       axios.put(my.PUT_edit+my.editedItem.HB_COD+"/", {
      "HB_COD" : my.editedIndex.HB_COD,
      "AGR_COD" : my.AGR_COD,
      "HB_FECHA" : my.HB_FECHA,
      "HB_DETALLE" : my.HB_DETALLE,
      "HB_DESCRIPCION" : my.HB_DESCRIPCION,
      "HB_MONTO" : my.HB_MONTO,
      "HB_CORRELATIVO" : my.HB_CORRELATIVO,
      "HB_OBSERVACIONES" : my.HB_OBSERVACIONES,
      "HB_CONDICION" : my.HB_CONDICION
         }).then(response =>{
            console.log(response);
            my.close();
            my.refrescarHabilitaciones();
            my.listar();            
            my.limpiar();           
        }).catch(err =>{console.log(err.response.data)});      

        }else{          
          //cod para agregar              
          axios.post(my.POST_add,{
      //"HB_COD" : my.editedIndex.HB_COD,
      "AGR_COD" : my.AGR_COD,
      "HB_FECHA" : my.HB_FECHA,
      "HB_DETALLE" : my.HB_DETALLE,
      "HB_DESCRIPCION" : my.HB_DESCRIPCION,
      "HB_MONTO" : my.HB_MONTO,
      //"HB_CORRELATIVO" : my.editedIndex.HB_CORRELATIVO,
      "HB_OBSERVACIONES" : my.HB_OBSERVACIONES

          }).then(function(response){
            console.log(response);
            my.close();
            my.refrescarHabilitaciones();
            my.listar();
            my.limpiar();
          }).catch(err => {console.log(err)});
        }
      }// validación 
    }, //fin
  }
};
</script>