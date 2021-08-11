<template>
 <div>
    <div class="mt-4">
      <v-data-table 
      v-model="selected"
      :headers="headers" 
      :items="lista"
      :single-select="false"
      item-key="PVE_COD"
      :show-select="debeHabilitarseComputed"
     
      class="elevation-1"      
      :search="search = vehiculoSeleccionado.placa_propietario"  
      
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
            <v-toolbar-title>{{plural}}</v-toolbar-title>
            <v-divider class="mx-4" inset vertical></v-divider>
            <v-spacer></v-spacer>
           
         <v-text-field hidden class="text-xs-center" v-model="search" label="" single-line hide-details ></v-text-field>
            <v-spacer></v-spacer>
            
            <v-dialog v-model="dialog" max-width="600px">
              <!--
              <template v-slot:activator="{ on }">
                <v-btn color="primary" dark class="mb-2" v-on="on" @click="prepararFormulario">Pagar</v-btn>
              </template>
              -->
              <v-card>
                
                <v-card-title  class="pa-4 orange">
                </v-card-title>
                <v-card-title>
                  <span class="headline">Realizar pagos por fletes</span>
                </v-card-title>

                <v-card-text>
                  <v-container>
                    <v-row>
                      <v-col cols="12" sm="12" md="12"> 
                          <v-text-field
                            outlined
                            v-model="VEH_PLA_CONDUCTOR"                            
                            label="PAGO A NOMBRE DE:"
                            background-color="black"
                            disabled
                            ></v-text-field>
                              <v-text-field
                            outlined
                            hide-details
                            v-model="fecha"                            
                            label="CON FECHA: "
                            background-color="black"
                            disabled
                            ></v-text-field>
                        
                      </v-col>          
                       <v-col cols="12" sm="6" md="6">
                          <v-switch 
                            v-model="PAGA_EL_MOLINO"
                            color="orange" inset
                            :label="`${txtPagaMolino}`"
                          ></v-switch>
                  
                       </v-col>
                 
                      <div class="mt-4">
                    <v-data-table 
                    :headers="headers2" 
                    :items="selected"
                    
                    class="elevation-1"         
                    hide-default-footer                  
                    >      
                    </v-data-table>
                      </div>

                    </v-row> 

                    <!-- TOTAL-->
                   <v-row>
                     <v-col cols="12" sm="4" md="4"> 
                        <h4  > </h4>
                      </v-col>
                      <v-col cols="12" sm="4" md="4"> 
                        <h4  > </h4>
                      </v-col>
                      <v-col cols="12" sm="4" md="4"> 
                        <h4 outlined > Total : {{ aPagar }} </h4>
                      </v-col>                
                    </v-row>               

                  </v-container>
                </v-card-text>

                <v-card-actions>
                  <v-spacer></v-spacer>
                  <v-btn color="blue darken-1" text @click="close">Cancelar</v-btn>
                  <v-btn color="blue darken-1" text @click="pagar">Confirmar pago</v-btn>
                </v-card-actions>
              </v-card>
            </v-dialog>
<!--
      <v-switch hidden 
        v-model="singleSelect"
        label="Single select"
        class="pa-3"
      ></v-switch>
-->
 <v-card-actions class="px-3 pb-3">
            <v-flex text-xs-left>
           <v-btn color="primary" dark class="mb-2" @click="prepararFormulario">Pagar</v-btn> 
            </v-flex>
            </v-card-actions>
          </v-toolbar>
        </template>
   
   

         <template v-slot:no-data>
          <v-btn color="primary" @click="listar">Reset</v-btn>
        </template>

        
      </v-data-table>

    </div>
  <div>
         <template>
  <div class="text-center">
    <v-dialog
      v-model="dialog2"
      width="400"
    >
    
      <v-card>
        <v-card-title class="headline orange lighten-2">
         </v-card-title>
        <v-card-text>
          <h3> Pasos para realizar un pago de fletes </h3>
          <br>
           <h4> 1. Seleccione un vehículo </h4>
           <h4> 2. Seleccione registros a pagar del vehículo </h4>
            </v-card-text>

        <v-divider></v-divider>

        <v-card-actions>
          <v-spacer></v-spacer>
          <v-btn
            color="orange"
            text
            @click="close2"
          >
            Entiendo
          </v-btn>
        </v-card-actions>
      </v-card>
    </v-dialog>
  </div>
</template>
  </div>
  
  </div>

  
</template>

<script>
import axios from 'axios';
import { mapState, mapActions } from "vuex";


export default {
  
  name: "crud_Pagos",

  data: () => ({
    singular: "pago",
    plural: "Pagos",
    tableTitle: "Lista de "+"pagos",
    action:"nothing",
    campoEstado: false,
    op_estados: ['ACTIVO', 'INACTIVO'],
    fecha : "",

    singleSelect: false,
    selected: [],
    listaSelected: [],
    montoAPagar:0,
    debeHabilitarse : false,

    dialog: false,
    dialog2:false,
    headers: [
      { align: "start", sortable: false,
      // atributos de cada item
       text: "Fecha" , value: "PVE_FECHA"},
      //{ text: "" , value: "PVE_COD"},
      { text: "Placa-Propietario" , value: "VEH_PLA_CONDUCTOR"},
      { text: "Agricultor" , value: "AGR_NOM_COMPLETO"},
      { text: "Zona" , value: "PVE_ZONA"},
      { text: "Monto" , value: "PVE_MONTO"},
      //{ text: "" , value: "PVE_ESTADO_PAGO"},
      //{ text: "" , value: "PVE_PAGA_MOLINO"},
      //{ text: "" , value: "PVE_ESTADO"},
      // opciones por cada item
     // { text: "Seleccionar", value: "actions", sortable: false }
    ],
      headers2: [
      { align: "start", sortable: false,
      // atributos de cada item
       text: "Fecha" , value: "PVE_FECHA"},
      { text: "Agricultor" , value: "AGR_NOM_COMPLETO"},
      { text: "Zona" , value: "PVE_ZONA"},
      { text: "Flete" , value: "PVE_MONTO"},
      ],

    search:"", // BUSQUEDA
    lista: [],
    seleccionado: null,
    GET_list : 'pve/list/',
    GET_totalPorPagar : 'pve/totalPorPagar/',
    GET_porPagarVeh : 'pve/porPagarVeh/', // pide cod
    POST_pagar : 'pve/pagar/',

    /// datos para guardar
    PVE_COD : null,
    TR_VE_COD : null,
    AGR_COD : null,
    AGR_NOM_COMPLETO: "",
    VEH_PLA_CONDUCTOR: "",
    PVE_ZONA : null,
    PVE_FECHA : new Date(),
    PVE_MONTO : null,
    PVE_ESTADO_PAGO : false,
    PVE_PAGA_MOLINO : null,
    PVE_ESTADO : null,
    PAGA_EL_MOLINO:true,

    editedIndex: -1,

    editedItem: {
    PVE_COD : null,
    TR_VE_COD : null,
    AGR_COD : null,
    AGR_NOM_COMPLETO: "",
    VEH_PLA_CONDUCTOR: "",
    PVE_ZONA : null,
    PVE_FECHA : null,
    PVE_MONTO : null,
    PVE_ESTADO_PAGO : false,
    PVE_PAGA_MOLINO : null,
    
    PAGA_EL_MOLINO:true,
    PVE_ESTADO : null,
    }    
  }),
  computed: {
    formTitle() {
      return this.action === "Agregar" ? ("Agregar "+this.singular) : ("Editar "+this.singular);
    },
    action_form() {
      return this.action === "Agregar" ? ("Agregar") : ("Editar");
    },
     aPagar() {
      return this.montoAPagar;
    },
    debeHabilitarseComputed(){
      return (this.vehiculoSeleccionado  ) ? (true) : (false);
    },
    txtPagaMolino(){
      return this.PAGA_EL_MOLINO ? "Paga el molino": "Paga agricultor"
    },

    
    // variables de store
        ...mapState(["vehiculoSeleccionado", "codigosSeleccionados"]),
    vehiculoSeleccionado: {
      get() {
        return this.$store.state.vehiculoSeleccionado;
      },
      set(val) {
        this.$store.commit("SET_PLACA", val);
      },
    },
      codigosSeleccionados: {
      get() {
        return this.$store.state.codigosSeleccionados;
      },
      set(val) {
        this.$store.commit("SET_CONJUNTO", val);
      },
    },
    // fin variables de store

  },

  watch: {
    dialog(val) {
      val || this.close();
    },
    dialog2(val){
      val || this.close2();
    }
  },

  created() {
    this.listar(),
    this.from_indicadores()
  },

  methods: {
    
    ...mapActions(["refrescarPagarVehiculos"]),
     from_indicadores(){
      if(this.$route.params.ad==="ad")
        this.dialog = true; 
    },
    
    //PROCEDIMIENTOS para el CRUD  
    //Procedimiento Listar 

  
    listar(){
      let my = this;      
        axios.get(my.GET_list).then(function(response){
          my.lista = response.data;})
        .catch(function(err) {console.log(err)});
        
    }, //fin listar

 prepararFormulario(){
   if(this.selected.length==0 || this.vehiculoSeleccionado.placa_propietario ==="" || this.vehiculoSeleccionado.placa_propietario === undefined || this.vehiculoSeleccionado.placa_propietario === null){
     this.dialog2 = true;
          this.dialog = false;

   }else{
      let my = this;      
      my.action= "Pagar";
      my.montoAPagar =0;

      this.PVE_FECHA = new Date();
      this.VEH_PLA_CONDUCTOR = this.vehiculoSeleccionado.placa_propietario;
      my.fecha = " "+my.PVE_FECHA.getDate()+ "/" + (my.PVE_FECHA.getMonth() +1) +"/"+ my.PVE_FECHA.getFullYear()+" "+
      my.PVE_FECHA.getHours() + ":"+ my.PVE_FECHA.getMonth() + ":"+ my.PVE_FECHA.getSeconds(); 

      
       console.log(this.selected);

    for(let i=0; i< my.selected.length;i++ ){
       my.listaSelected.push(my.selected[i].PVE_COD);
       my.montoAPagar = my.montoAPagar +my.selected[i].PVE_MONTO;
     }
     console.log(my.listaSelected);
      console.log(my.total);


        my.dialog = true;
   }
    },
    
    pagar(){ 
     let my = this;  
   
     axios
          .post(my.POST_pagar, { // pve/pagar/
            PAGA_EL_MOLINO: my.PAGA_EL_MOLINO,
            lista_pagos: my.listaSelected,//my.listaSelected,
          })
          .then((response) => {
            console.log(response);
            my.close();
            my.listar();
            my.refrescarPagarVehiculos();
            my.limpiar();
          })
          .catch(function (err) {
            console.log(err.response.data);
          }); 
      
    },
     

    

    deleteItem(item) {
      let my = this;
      my.editedItem = Object.assign({}, item);
      confirm("¿Está seguro de querer eliminar este registro?") &&
        axios.delete(my.DELETE_delete+my.editedItem.PVE_COD+"/", { 
              
         }).then(response =>{
            console.log(response);           
            my.listar();
            my.refrescarPagarVehiculos(); 
            my.limpiar();          
        }).catch(function(err) {console.log(err.response.data)}); 
    },

    close() {
      this.dialog = false;
      this.selected = [];
    },
    close2() {
      this.dialog2 = false;
      this.selected = [];
    },
    limpiar(){
       this.PVE_COD = null; 
    this.AGR_NOM_COMPLETO= "";
    this.VEH_PLA_CONDUCTOR= "";
    this.PVE_ZONA = null;
    this.PVE_FECHA = null;
    this.PVE_MONTO = null,
    this.PVE_ESTADO_PAGO = false;
    this.PVE_PAGA_MOLINO = false;
    this.PVE_ESTADO = null;
    this.PAGA_EL_MOLINO = true;
    },

     


  }
};
</script>