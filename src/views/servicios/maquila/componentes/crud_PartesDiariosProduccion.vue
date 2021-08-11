<template>
  <div>
    <div class="mt-4">
      <v-data-table
        :headers="headers"
        :items="lista"
        class="elevation-1"
        :search="(search = agricultorSeleccionado.nombreCompleto)"
        :footer-props="{
          showFirstLastPage: true,
          firstIcon: 'mdi-arrow-collapse-left',
          lastIcon: 'mdi-arrow-collapse-right',
          prevIcon: 'mdi-minus',
          nextIcon: 'mdi-plus',
          pageText: '{0}-{1} de {2}',
          'items-per-page-text': 'Registros por página',
        }"
        sort-by="AGR_NOM"
      >
        <template v-slot:top>
          <v-toolbar flat color="black">
            <v-toolbar-title>{{ tableTitle }}</v-toolbar-title>
            <v-divider class="mx-4" inset vertical></v-divider>
            <v-spacer></v-spacer>

            <!-- <v-text-field class="text-xs-center" v-model="search" append-icon="search" label="Búsqueda" single-line hide-details></v-text-field>
            <v-spacer></v-spacer> -->

            <!-- DIALOG DE LISTA DE ITEMS-->
            <template>
              <div>
                <v-dialog v-model="dialogList" max-width="1200px">
                  <v-card>
                    <v-card-title class="pa-4 info"> </v-card-title>

                    <v-card-text>
                      <v-container>
                        <v-card-text>
                          <v-container>
                            <v-row>
                              <h3 class="headline white--text">
                                Lista de registros
                              </h3>
                            </v-row>

                            <v-row>
                              <v-data-table
                                :headers="headersList"
                                :items="listaRegistros"
                                class="elevation-1"
                                :footer-props="{
                                  showFirstLastPage: true,
                                  firstIcon: 'mdi-arrow-collapse-left',
                                  lastIcon: 'mdi-arrow-collapse-right',
                                  prevIcon: 'mdi-minus',
                                  nextIcon: 'mdi-plus',
                                  pageText: '{0}-{1} de {2}',
                                  'items-per-page-text': 'Registros por página',
                                }"
                              >
                                <template>
                                  <v-toolbar flat color="black">
                                    <v-toolbar-title
                                      >lista de registros</v-toolbar-title
                                    >
                                    <v-divider
                                      class="mx-4"
                                      inset
                                      vertical
                                    ></v-divider>
                                    <v-spacer></v-spacer>
                                  </v-toolbar>
                                </template>
                                 <template v-slot:[`item.OR_PIL_PAGA_PILADO`]="{ item }">
                                    <v-chip v-if="item.OR_PIL_PAGA_PILADO" :color="getColor(item.OR_PIL_PAGA_PILADO)" dark>
                                      Sí
                                    </v-chip>
                                    <v-chip v-else :color="getColor(item.OR_PIL_PAGA_PILADO)" dark >
                                      No
                                    </v-chip>
                                  </template>
                                  <template v-slot:[`item.OR_PIL_PAGA_ENVASE`]="{ item }">
                                    <v-chip v-if="item.OR_PIL_PAGA_ENVASE" :color="getColor(item.OR_PIL_PAGA_ENVASE)" dark>
                                      Sí
                                    </v-chip>
                                    <v-chip v-else :color="getColor(item.OR_PIL_PAGA_ENVASE)" dark >
                                      No
                                    </v-chip>
                                  </template> 
                                
                              </v-data-table>
                            </v-row>
                          </v-container>
                        </v-card-text>
                      </v-container>
                    </v-card-text>

                    <v-card-actions>
                      <v-spacer></v-spacer>
                      <v-btn color="blue darken-1" text @click="closeList"
                        >Salir</v-btn
                      >
                    </v-card-actions>
                  </v-card>
                </v-dialog>
              </div>
            </template>

            <!-- FIN DIALOG LISTA DE ITEMS-->
            <!-- DIALOG DE REGISTRO DE PARTE DIARIO-->
            <v-dialog v-model="dialog" max-width="1000px">
              <template v-slot:activator="{ on }">
                <v-btn
                  color="primary"
                  dark
                  class="mb-2"
                  v-on="on"
                  @click="addItem"
                  >Agregar {{ singular }}</v-btn
                >
              </template>
              <v-form ref="form" v-model="valid" lazy-validation> <!-- FORMULARIO -->
                <v-card>
                  <v-card-title class="pa-4 orange"> </v-card-title>

                  <v-card-text>
                    <v-container>
                      <v-card-text>
                        <v-container>
                          <v-row>
                            <h3 class="headline white--text">
                              {{ formTitle }}
                            </h3>
                          </v-row>

                          <v-row>
                    <v-col class="d-flex" cols="12" sm="4" md="4"  >                             
                       <v-select 
                            outlined
                            prepend-inner-icon=" ti-home"
                            v-model="MOL_COD"
                            :items="op_molinos"
                            :item-text="item => item.MOL_NOM_CORTO +' '"
                            item-value="MOL_COD"                            
                            label="Molino"
                            persistent-hint
                            :rules="selectRules"  
                             required
                            no-data-text="No se tiene registros"
                          > </v-select>
                    </v-col>
                    <v-col class="d-flex" cols="12" sm="4" md="4" >                             
                       <v-select outlined
                            prepend-inner-icon="mdi-account"
                            v-model="AGR_COD"
                             @change="listarLotesAgr()"
                            :items="op_agricultores"
                            :item-text="item => item.AGR_NOM +' '+ item.AGR_APE"
                            item-value="AGR_COD"                            
                            label="Agricultor"
                            persistent-hint
                            :rules="selectRules"
                             required
                            no-data-text="No se tiene registros"
                          > </v-select>
                    </v-col>
                   <v-col class="d-flex" cols="12" sm="4" md="4"  >                             
                       <v-select 
                            outlined
                            prepend-inner-icon="ti-server"
                            v-model="LT_COD"
                            :items="op_lotesxAgr"
                            :item-text="item => item.LT_LOTE_NOM +' '"
                            item-value="LT_COD"                            
                            label="Lote"
                            persistent-hint
                            :rules="selectRules"  
                             required
                            no-data-text="No se tiene registros"
                          > </v-select>
                    </v-col>
                  
                      <v-col class="d-flex" cols="12" sm="4" md="4"  >                             
                       <v-select 
                            outlined
                            prepend-inner-icon="fas fa-hand-spock"
                            v-model="PART_OPERADOR"
                            :items="op_trabajadores"
                            :item-text="item => item.TRA_NOM +' '+item.TRA_APE"
                            item-value="TRA_COD"                            
                            label="Operador"
                            persistent-hint                            
                            no-data-text="No se tiene registros"
                          > </v-select>
                    </v-col>
                      <v-col class="d-flex" cols="12" sm="4" md="4"  >                             
                       <v-select 
                            outlined
                            prepend-inner-icon="fas fa-hand-spock"
                            v-model="PART_PESADOR"
                            :items="op_trabajadores"
                            :item-text="item => item.TRA_NOM +' '+item.TRA_APE"
                            item-value="TRA_COD"                            
                            label="Pesador"
                            persistent-hint
                            no-data-text="No se tiene registros"
                          > </v-select>
                    </v-col>  
                      <v-col class="d-flex" cols="12" sm="4" md="4"  >                             
                       <v-select 
                            outlined
                            prepend-inner-icon="fas fa-hand-spock"
                            v-model="PART_POLVILLERO"
                            :items="op_trabajadores"
                            :item-text="item => item.TRA_NOM +' '+item.TRA_APE"
                            item-value="TRA_COD"                            
                            label="Polvillero"
                            persistent-hint
                            no-data-text="No se tiene registros"
                          > </v-select>
                          
                    </v-col> 
                      <v-col class="d-flex" cols="12" sm="4" md="4"  >                             
                       <v-select 
                            outlined
                            prepend-inner-icon="fas fa-hand-spock"
                            v-model="PART_ESTIBADOR1"
                            :items="op_trabajadores"
                            :item-text="item => item.TRA_NOM +' '+item.TRA_APE"
                            item-value="TRA_COD"                            
                            label="Estibador 1"
                            persistent-hint
                            no-data-text="No se tiene registros"
                          > </v-select>
                       
                    </v-col> 
                  <v-col class="d-flex" cols="12" sm="4" md="4"  >                             
                       <v-select 
                            outlined
                            prepend-inner-icon="fas fa-hand-spock"
                            v-model="PART_ESTIBADOR2"
                            :items="op_trabajadores"
                            :item-text="item => item.TRA_NOM +' '+item.TRA_APE"
                            item-value="TRA_COD"                            
                            label="Estibador 2"
                            persistent-hint
                            no-data-text="No se tiene registros"
                          > </v-select>
                  </v-col>
                  <v-col class="d-flex" cols="12" sm="4" md="4"  >              <!-- CERRAR EL LOTE AL FINALIZAR INGRESOS --> 
                      <v-switch 
                            v-model="CERRAR_LOTE"
                            color="info"
                            inset
                            :label="`${txt_cerrarLote}`"
                      ></v-switch>
                        
                  </v-col> 


                          </v-row>
                         <v-row>
                    <v-col cols="12" sm="3" md="3"> 
                      <v-text-field
                            outlined
                            v-model="fechaEnFormato"                            
                            label="Fecha registro"
                            disabled
                            ></v-text-field>
                       
                      </v-col>
                     
                       <v-col cols="12" sm="3" md="3">
                        <v-text-field outlined prepend-inner-icon="mdi-time"  :rules="selectRules"
                         v-model="PART_HORA_INICIO" label="Hora inicio" type="time"  ></v-text-field>
                      </v-col> 
                      <v-col cols="12" sm="3" md="3">
                        <v-text-field outlined prepend-inner-icon="mdi-time"  :rules="selectRules"
                         v-model="PART_HORA_FIN" label="Hora fin" type="time"  ></v-text-field>
                      </v-col> 
                      <v-col cols="12" sm="3" md="3">
                       <v-switch 
                            v-model="PART_EXCEDE_DIA"
                            color="orange"
                            inset
                            label="Excede 1 día"
                          ></v-switch>
                      </v-col>
                         </v-row>

 <!-- DIALOG DE REGISTRO DE ORDENNNNN    -->
            <v-dialog v-model="dialogOrden" max-width="500px">
              <template v-slot:activator="{ on }">
                 <v-btn 
                  color="primary"
                  dark dense
                  class="mb-2"
                  v-on="on"
                  @click="addItemOrden"
                  >agregar orden</v-btn
                >
              </template>
              <v-form ref="form2" v-model="valid2" lazy-validation> <!-- FORMULARIO -->
                <v-card>
                  <v-card-title class="pa-4 orange"> </v-card-title>

                  <v-card-text>
                    <v-container>
                      <v-card-text>
                        <v-container>
                          <v-row>
                            <h3 class="headline white--text">
                              {{action_ordenForm}} orden
                            </h3>
                          </v-row>

                          <v-row>
                              <v-col cols="12" sm="12" md="12"> 
                       <v-select 

                            outlined
                            prepend-inner-icon=" ti-crown"
                            v-model="pro_selected"
                            :items="op_productos"
                            :item-text="item => item.PRO_DESCRIPCION "
                            item-value="PRO_COD"                            
                            label="Producto"
                            return-object
                            no-data-text="No se tiene registros"
                            @change="asignarNombrePro"
                            :rules="selectRules"
                          >
                          
                          </v-select>
                              </v-col>
                                 <v-col cols="12" sm="12" md="12">
                            <v-select 

                            outlined
                            prepend-inner-icon="ti-archive"
                            v-model="vas_selected"
                            :items="op_envases"
                            :item-text="item => item.ENV_NOM "
                            item-value="ENV_COD"                            
                            label="Vasija"
                            return-object
                            type="text"
                            :rules="selectRules" 
                            no-data-text="No se tiene registros"
                            @change="asignarNombreVas" 
                          >
                          
                          </v-select>
                                 </v-col>
                          </v-row>

                          <v-row>                          
                            <v-col cols="12" sm="6" md="6">
                              <v-radio-group v-model="OR_PIL_UNIDAD" label="Unidad de empaque" row >
                                <v-radio label="Sacos" color="orange" value="SACO"></v-radio>
                                <v-radio label="Kilos" color="orange" value="KILO"></v-radio>
                              </v-radio-group>
                            </v-col>
                          <v-col cols="12" sm="6" md="6">
                          <v-text-field
                            outlined
                            v-model="OR_PIL_CANTIDAD"
                            label="Cantidad"
                            type="number"
                            :rules="cantidadRulesRequired"
                          ></v-text-field>                    


                            </v-col>
                          </v-row>
                     
                          <v-row>
                            <template v-if="isSAco">
                              <v-col cols="12" sm="6" md="6">
                      <v-switch 
                            v-model="OR_PIL_PAGA_PILADO"
                            inset
                            color="orange"
                            label="Paga servicio de pilado"
                          ></v-switch>
                        </v-col>
                         <v-col cols="12" sm="6" md="6">
                      <v-switch 
                            v-model="OR_PIL_PAGA_ENVASE"
                            inset
                            color="orange"
                            label="Paga vasijas"
                          ></v-switch>
                        </v-col>
                            </template>
                          </v-row>

                               <v-row>
                                 <v-col  cols="12" sm="12" md="12">
                      <!-- MENSAJE DE ALERTA DE VALIDACIÓN-->
                          <v-alert  v-if="error" type="error">
                            <li v-for="item in errores" v-bind:key="item">{{ item }} </li>
                             <strong> </strong>
                          </v-alert>
                          <!-- FIN MENSAJE DE ALERTA -->
                                 </v-col>
                          </v-row>


                        </v-container>
                      </v-card-text>
                    </v-container>
                  </v-card-text>

                  <v-card-actions>
                    <v-spacer></v-spacer>
                    <v-btn color="orange" text @click="closeOrden"
                      >Cancelar</v-btn
                    >
                    <v-btn 
                    :disabled="!valid2" color="orange" text @click="addOrden">{{action_ordenForm}}</v-btn>
                  </v-card-actions>
                </v-card>
              </v-form>
              
            </v-dialog>

            <!-- FIN DIALOG DE ooooooooo -->



                          <!-- TABLA DE ORDENES AÑADIDAS-->
                          <v-row> <v-col cols="12" sm="12" md="12">
                              <v-data-table
                                :headers="headersOrdenes"
                                :items="ORD_PILADO_DETALLES"
                                class="elevation-1"
                                 hide-default-footer 
                              >
                                <template>
                                  <v-toolbar flat color="black">
                                    <v-toolbar-title
                                      >lista de registros</v-toolbar-title
                                    >
                                    <v-divider
                                      class="mx-4"
                                      inset
                                      vertical
                                    ></v-divider>
                                    <v-spacer></v-spacer>
                                  </v-toolbar>
                                </template>
                                
                          <template v-slot:[`item.actions`]="{ item }">

                               <v-icon  medium class="mr-2" @click="editOrden(item)">mdi-pencil</v-icon>
                                <v-icon medium @click="deleteOrden(item)">mdi-delete</v-icon>
                                </template>                             

                              </v-data-table>
                              </v-col>
                              
                       </v-row>
                                            
                  

                               <v-row> <v-col cols="12" sm="12" md="12">
                      <!-- MENSAJE DE ALERTA DE VALIDACIÓN-->
                          <v-alert  v-if="error" dense type="error">
                            <li v-for="item in errores" v-bind:key="item">{{ item }} </li>
                             <strong> </strong>
                          </v-alert>
                          <!-- FIN MENSAJE DE ALERTA -->
                          </v-col>
                          </v-row>

 <template v-slot:[`item.LT_CERRADO`]="{ item }">
          <v-chip :color="getColor(item.LT_CERRADO)" dark>
            {{ item.LT_CERRADO }}
          </v-chip>
        </template>


                        </v-container>
                      </v-card-text>
                    </v-container>
                  </v-card-text>

                  <v-card-actions>  
                     <v-spacer>                   
                     </v-spacer>
                    <v-btn color="blue darken-1" text @click="close"
                      >Cancelar</v-btn
                    >
                    <v-btn 
                    :disabled="!valid" color="blue darken-1" text @click="save">{{
                      action_form
                    }}</v-btn>
                  </v-card-actions>
                </v-card>
              </v-form>
              
            </v-dialog>

            <!-- FIN DIALOG DE REGISTRO DE ARROZ CASCARA -->
          </v-toolbar>
        </template>
        <template v-slot:[`item.LT_CERRADO`]="{ item }">
          <v-chip :color="getColor(item.LT_CERRADO)" dark>
            {{ item.LT_CERRADO }}
          </v-chip>
        </template>
        <template v-slot:[`item.actions`]="{ item }">
          <v-icon medium class="mr-2" @click="showItems(item)">mdi-menu</v-icon>
          <v-icon v-if="item.LT_CERRADO==='ABIERTO'" medium class="mr-2" @click="editItem(item)">mdi-pencil</v-icon>
          <v-icon v-if="item.LT_CERRADO==='ABIERTO'" medium @click="deleteItem(item)">mdi-delete</v-icon>
        </template>
        <template v-slot:no-data>
          <v-btn color="primary" @click="listar">Reset</v-btn>
        </template>
      </v-data-table>
    </div>
  </div>
</template>

<script>
import axios from "axios";
import { mapState } from "vuex";

export default {
  name: "crud_PartesDiariosProduccion",

  data: () => ({
    singular: "parte de producción ",
    tableTitle: "Servicio de maquila",
    action: "nothing",
    action_orden: "nothing",
    campoEstado: false,
    campoEstadoOrden: false,
    CERRAR_LOTE : true,
    op_estados: ["ACTIVO", "INACTIVO"],

    op_condicion: ["SACO", "KILO"],
    fecha :"",
    op_agricultores: [],
    op_lotes: [],
    op_molinos: [],
    op_trabajadores: [],
    op_envases: [],
    op_productos: [],

    op_variedad: [],

    op_lotesxAgr:[],

    parteSelected: null,
    agr_selected: null,
    mol_selected: null,
    lot_selected: null,
    operador_Selected : null,
    pesador_Selected : null,
    polvillero_Selected : null,
    estibador1_Selected : null,
    estibador2_Selected : null,

    vas_selected: { "ENV_COD":null, "ENV_NOM":null},
    pro_selected: {"PRO_COD": null, "PRO_DESCRIPCION": null},
//isSAco: true,
    dialog: false,

    dialogList: false,
    dialogOrden: false,
    editedIndexOrden :null,

    headers: [
      {
        align: "start",
        sortable: true,
        // atributos de cada item
        //   text: "Cód Lote", value: "LT_COD" },

        text: "Parte" , value: "PART_NOM"},


{ text: "Agricultor" , value: "AGR_NOM_COMPLETO"},
{ text: "Lote" , value: "LT_NOMBRE"},
{ text: "Molino" , value: "MOL_NOMBRE"},
{ text: "Prod/Hr" , value: "PART_PROD_HORA"},
{ text: "Observación" , value: "PART_OBSERVACION"},
//{ text: "" , value: "PART_OPERADOR"},
//{ text: "" , value: "PART_PESADOR"},
//{ text: "" , value: "PART_POLVILLERO"},
//{ text: "" , value: "PART_ESTIBADOR1"},
//{ text: "" , value: "PART_ESTIBADOR2"},
{ text: "Fecha" , value: "PART_FECHA"},
{ text: "Hr. inicio" , value: "PART_HORA_INICIO"},
{ text: "Hr. fin" , value: "PART_HORA_FIN"},
{ text: "Condición", value: "LT_CERRADO"},
//{ text: "" , value: "PART_TOTAL_SACOS"},
//{ text: "" , value: "PART_TOTAL_KILOS"},
//{ text: "" , value: "PART_ESTADO"},

      // opciones por cada item
      { text: "Opciones", value: "actions", sortable: false },

      
    ],

    headersList: [
      {
        align: "start",
        sortable: true,
        // atributos de cada item
        text: "Orden" , value: "OR_PIL_COD"},     
     // { text: "" , value: "PART_COD"},
      { text: "Producto" , value: "PRO_DESCRIPCION"},
      { text: "Cantidad" , value: "OR_PIL_CANTIDAD"},
      { text: "Envase" , value: "ENV_NOM"},
      { text: "Costo maquila" , value: "OR_PIL_COSTO_MAQ"},
     // { text: "" , value: "OR_PIL_ESTADO"},
      { text: "Subtotal" , value: "OR_PIL_SUB_TOTAL"},
      { text: "Paga pilado" , value: "OR_PIL_PAGA_PILADO"},
      { text: "Paga vasija" , value: "OR_PIL_PAGA_ENVASE"},
      { text: "Unidad" , value: "OR_PIL_UNIDAD"}, // SACO o KILO
    ],

    headersOrdenes: [
       { align: "start",sortable: false, text: "Cantidad" , value: "OR_PIL_CANTIDAD"},
      { text: "Producto" , value: "PRO_DESCRIPCION"},
      { text: "Vasija" , value: "ENV_NOM"},
      { text: "Unidad" , value: "OR_PIL_UNIDAD"}, // SACO o KILO 
       { text: "Opciones", value: "actions", sortable: false },       
       
    ],
    listaRegistros: [],

    search: "", // BUSQUEDA
    lista: [],
    POST_add : 'part/add/',
    DELETE_delete : 'part/delete/',
    PUT_edit : 'part/edit/',
    GET_list : 'part/list/',

    GET_total: "cas/total/",

    /// datos para guardar
    PART_COD : null,
    MOL_COD : null,
    AGR_COD : null,
    LT_COD : null,
    LT_CERRADO : null,
    PART_OPERADOR : null,
    PART_PESADOR : null,
    PART_POLVILLERO : null,
    PART_ESTIBADOR1 : null,
    PART_ESTIBADOR2 : null,
    PART_FECHA : new Date(),
    PART_HORA_INICIO : null,
    PART_HORA_FIN : null,
    PART_OBSERVACION : null,
    PART_TOTAL_SACOS : null,
    PART_TOTAL_KILOS : null,
    PART_PROD_HORA : null,
    PART_EXCEDE_DIA: false,

    editedIndex: -1,

    editedItem: {
    PART_COD : null,
    MOL_COD : null,
    AGR_COD : null,
    LT_COD : null,
    LT_CERRADO : null,
    PART_OPERADOR : null,
    PART_PESADOR : null,
    PART_POLVILLERO : null,
    PART_ESTIBADOR1 : null,
    PART_ESTIBADOR2 : null,
    PART_FECHA : new Date(),
    PART_HORA_INICIO : null,
    PART_HORA_FIN : null,
    PART_OBSERVACION : null,
    PART_TOTAL_SACOS : null,
    PART_TOTAL_KILOS : null,
    PART_PROD_HORA : null,
    PART_EXCEDE_DIA: false,
    },

    OR_PIL_CANTIDAD: null,
    PRO_COD: null,
    ENV_COD: null,
    OR_PIL_PAGA_PILADO: true,
    OR_PIL_PAGA_ENVASE: true,
    OR_PIL_UNIDAD: "SACO",
    PRO_DESCRIPCION: "",
    ENV_NOM: "",

    
    orden:{
    OR_PIL_COD : null,
    PART_COD : null,
    OR_PIL_CANTIDAD : null,
    PRO_COD : null,
    ENV_COD : null,
    OR_PIL_COSTO_MAQ : null,
    OR_PIL_ESTADO : null,
    OR_PIL_SUB_TOTAL : null,
    OR_PIL_PAGA_PILADO : null,
    OR_PIL_PAGA_ENVASE : null,
    OR_PIL_UNIDAD : "SACO",
    },

    ORD_PILADO_DETALLES: [],

     // data validación
    valid: true,
    valid2:true,
    error: false,
    msg_error: "",
    errores: [],
    selectRules: [
       (v) => !!v || "Este dato es requerido",
    ],
    textoRules: [
      (v) => !!v || "Este campo es obligatorio",
      (v) =>
        (v && v.length <= 60) || "El texto debe tener menos de 60 caracteres",
    ],
     cantidadRules: [
      (v) => !v || /^[+-]?\d+([,.]\d+)?$/.test(v) ||/^([0-9])*$/.test(v) || "Ingrese un número",
    ],
     cantidadRulesRequired: [
      (v) => !!v || /^[+-]?\d+([,.]\d+)?$/.test(v) ||/^([0-9])*$/.test(v) || "Ingrese un número",
    ],


  }),

  computed: {
    formTitle() {
      return this.action === "Agregar"
        ? "Agregar " + this.singular
        : "Editar " + this.singular;
    },
    isSAco(){
      return this.OR_PIL_UNIDAD==="KILO";
    },
    action_form() {
      return this.action === "Agregar" ? "Agregar" : "Editar";
    },
    action_ordenForm() {
      return this.action_orden === "Agregar" ? "Agregar" : "Editar";
    },
    txt_cerrarLote(){
      return this.CERRAR_LOTE ? "Cerrar lote al finalizar" : "Mantener lote abierto"
    },
    txt_excedeDia(){
      return this.PART_EXCEDE_DIA ? "Excede 1 día" : "No excede el día"
    },
    fechaEnFormato(){ 
      let my = this;
      let fechita = new Date();
     my.fecha = " "+fechita.getDate()+ "/" + (fechita.getMonth() +1) +"/"+ fechita.getFullYear()+" "+
      fechita.getHours() + ":"+ fechita.getMonth() + ":"+ fechita.getSeconds(); 
 return my.fecha;
      
    },
    computedDateFormatted() {
      // fecha
      return this.formatDate(this.date);
    },
    // generador de listas referenciales no BD
     years () { //2 años antes y 2 despues del año actual
      const year = new Date().getFullYear()
      return Array.from({length: (year+2) - (year-2)}, (value, index) => (year-2) + index)
    },
    // FIN listas referenciales no BD
   
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
    },
     dialogOrden(val) {
      val || this.closeOrden();
    },
  },

  created() {
    this.from_indicadores(),
    this.listar(),
      this.listarAgricultores(),
      this.listarLotes(),
     //this.listarRegistros();
   
      this.listarMolinos();
      this.listarTrabajadores();
      this.listarEnvases();
      this.listarProductos();
    //
  },

  methods: {

     from_indicadores(){
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


    cerrarLote(cod){ // cerrar lote
        axios
          .put("lot/cerrar/" + cod + "/", {})
          .then((response) => {
            console.log(response);
            console.log("Si se camio el lote");
            
          })
          .catch(err => {
            console.log("algun error");
            console.log(err.response.data);
            
          })

    },
    listarLotesAgr(){ // lot/listAbiertosAgr/   agr/listLotes/
      let my = this;      
        axios.get("lot/listAbiertosAgr/"+my.AGR_COD+"/").then(function(response){
          my.op_lotesxAgr = response.data;
          console.log("si corre: ");
          console.log("ENTRO +" +my.op_lotesxAgr);
          })
        .catch(function(err) {console.log(err.response.data)});
    }, //fin listar
    //PROCEDIMIENTOS para el CRUD
     listarMolinos() {
      let my = this;
      axios
        .get("mol/list/")
        .then(function (response) {
          my.op_molinos = response.data;
        })
        .catch(function (err) {
          console.log(err.response.data);
        });
    }, //fin listar
    listarTrabajadores() {
      let my = this;
      axios
        .get("tra/list/")
        .then(function (response) {
          my.op_trabajadores = response.data;
        })
        .catch(function (err) {
          console.log(err.response.data);
        });
    }, //fin listar
        listarEnvases() {
      let my = this;
      axios
        .get("env/list/")
        .then(function (response) {
          my.op_envases = response.data;
        })
        .catch(function (err) {
          console.log(err.response.data);
        });
    }, //fin listar
        listarProductos() {
      let my = this;
      axios
        .get("pro/list/")
        .then(function (response) {
          my.op_productos = response.data;
        })
        .catch(function (err) {
          console.log(err.response.data);
        });
    }, //fin listar
    listarAgricultores() {
      let my = this;
      axios
        .get("agr/list/")
        .then(function (response) {
          my.op_agricultores = response.data;
        })
        .catch(function (err) {
          console.log(err.response.data);
        });
    }, //fin listar
    listarLotes() {
      let my = this;
      axios
        .get("lot/list/")
        .then(function (response) {
          my.op_lotes = response.data;
          console.log(my.op_lotes);
        })
        .catch(function (err) {
          console.log(err.response.data);
        });
    }, //fin listar
    //Procedimiento Listar
    listar() {
      let my = this;
      axios
        .get(my.GET_list)
        .then(function (response) {
          my.lista = response.data;
        })
        .catch(function (err) {
          console.log(err.response.data);
        });
    }, //fin listar

    listarRegistros() {
      let my = this;
      axios
        .get("ord/list/" + my.parteSelected + "/")
        .then(function (response) {
          my.listaRegistros = response.data;
          my.parteSelected = null;
        })
        .catch(function (err) {
          console.log(err.response.data);
        });
    }, //fin listar

     listarRegistrosOrden(cod) {
      let my = this;
      axios
        .get("ord/list/" + cod + "/")
        .then(function (response) {
          my.ORD_PILADO_DETALLES = response.data;
          
        })
        .catch(function (err) {
          console.log(err.response.data);
        });
    }, //fin listar

    showItems(item) {
      let my = this;
      my.parteSelected = Object.assign({}, item).PART_COD;
      console.log("REGISTRO : " + my.parteSelected);
      this.listarRegistros();
      my.dialogList = true;
    },

    addItem() {
      let my = this;
      my.action = "Agregar";
      my.campoEstado = false;
      my.limpiar();
      my.limpiar_detallesOrden(); // resetear lo antes
      my.dialog = true;
      
    },
     addItemOrden() {
      let my = this;
      my.action_orden = "Agregar";
      my.campoEstadoOrden = false;
      my.limpiarOrden();
      
      my.dialogOrden = true;
    },

   addOrden() {
       this.$refs.form2.validate();
      if (this.$refs.form2.validate(true)) {
        this.errores = [];
      let my = this;       

      if(my.campoEstado){ // enla vista de EDITAR GENERAL
        
        if(my.campoEstadoOrden){ // si se estad editando el fom
         axios
          .put("ord/edit/" + my.orden.OR_PIL_COD + "/", {
          OR_PIL_COD: my.orden.OR_PIL_COD,
          PART_COD: my.orden.PART_COD,          
          OR_PIL_CANTIDAD: my.OR_PIL_CANTIDAD,
          PRO_COD: my.PRO_COD,
          ENV_COD: my.ENV_COD,
          OR_PIL_PAGA_PILADO: my.OR_PIL_PAGA_PILADO,
          OR_PIL_PAGA_ENVASE: my.OR_PIL_PAGA_ENVASE,
          OR_PIL_UNIDAD: my.OR_PIL_UNIDAD,
          })
          .then((response) => {
            console.log(response);
            my.closeOrden();
            my.listarRegistrosOrden(my.orden.PART_COD);
            my.limpiarOrden();
          })
          .catch(err => {
            console.log(err.response.data);
            if (err.response.status == 400) {
                
                console.log(err.response.data);
                if (err.response.data.PRO_COD != null) {
                  this.errores.push("Seleccione un producto");
                }
                if (err.response.data.ENV_COD != null) {
                  this.errores.push("Seleccione una vasija");
                }
                if (err.response.data.OR_PIL_CANTIDAD != null) {
                  this.errores.push("Ingrese una cantidad");
                }
                this.mostrarErrores();
              }
          })

        }else{ 
        //editando - SE AGREGA CON ENDPOINT
     
     axios.post("ord/add/", {
         // OR_PIL_COD: my.OR_PIL_COD,
          PART_COD: my.PART_COD,
          OR_PIL_CANTIDAD: my.OR_PIL_CANTIDAD,
          PRO_COD: my.PRO_COD,
          ENV_COD: my.ENV_COD,
         // OR_PIL_COSTO_MAQ: my.OR_PIL_COSTO_MAQ,
         // OR_PIL_ESTADO: my.OR_PIL_ESTADO,
         // OR_PIL_SUB_TOTAL: my.OR_PIL_SUB_TOTAL,
          OR_PIL_PAGA_PILADO: my.OR_PIL_PAGA_PILADO,
          OR_PIL_PAGA_ENVASE: my.OR_PIL_PAGA_ENVASE,
          OR_PIL_UNIDAD: my.OR_PIL_UNIDAD,
          })
          .then(function (response) {
            console.log(response.data);
            my.closeOrden();
            //my.listarRegistros();
            if(my.PART_COD != null)
            my.listarRegistrosOrden(my.PART_COD);
           
            my.limpiarOrden();
          })
          .catch(err => {
            
            console.log(err.response.data);
           
            if (err.response.status == 400) {
                
                console.log(err.response.data);
                if (err.response.data.PRO_COD != null) {
                  this.errores.push("Seleccione un producto");
                }
                if (err.response.data.ENV_COD != null) {
                  this.errores.push("Seleccione una vasija");
                }
                if (err.response.data.OR_PIL_CANTIDAD != null) {
                  this.errores.push("Ingrese una cantidad");
                }
                this.mostrarErrores();
              }
          });

        }// ñasido
      }else{ // LOCALES 
            //vALIDACIÓN
      if (this.PRO_COD==null || this.OR_PIL_CANTIDAD ==null || this.ENV_COD ==null || this.OR_PIL_CANTIDAD == "") {                
               
                if (this.PRO_COD == null) {
                  this.errores.push("Seleccione un producto");
                }
                if (this.ENV_COD == null) {
                  this.errores.push("Seleccione una vasija");
                }
                if (this.OR_PIL_CANTIDAD == null || this.OR_PIL_CANTIDAD == "") {
                  this.errores.push("Ingrese una cantidad");
                }
                this.mostrarErrores();
      }else{ // si tiene los datos requeridos
      
                my.orden = {
                  "OR_PIL_COD" : this.OR_PIL_COD,
                  "PART_COD" : this.PART_COD,
                  "OR_PIL_CANTIDAD":this.OR_PIL_CANTIDAD,
                  "PRO_COD": this.PRO_COD,
                  "PRO_DESCRIPCION": this.PRO_DESCRIPCION,
                  "ENV_COD":this.ENV_COD,
                  "ENV_NOM":this.ENV_NOM,
                  "OR_PIL_PAGA_PILADO":this.OR_PIL_PAGA_PILADO,
                  "OR_PIL_PAGA_ENVASE":this.OR_PIL_PAGA_ENVASE,
                  "OR_PIL_UNIDAD":this.OR_PIL_UNIDAD
                  };
                  console.log(my.orden); 
            if(my.campoEstadoOrden){ // EDITANDO EL LOCAL
              console.log("recuperado: " + my.editedIndexOrden);
                if (my.editedIndexOrden > -1) {
                     Object.assign(my.ORD_PILADO_DETALLES[my.editedIndexOrden], my.orden);
                      my.closeOrden();
                      my.limpiarOrden();
                      my.editedIndexOrden =-1;
                }
            }else{ // AGREGANDO AL LOCAL               
                my.ORD_PILADO_DETALLES.push(my.orden);
                my.closeOrden();
                my.limpiarOrden();
            }
            
            }
      }
      } 
    },
    deleteOrden(item){
      
      if(this.campoEstadoOrden){ // se está editando el parte
      let my = this;
      my.orden = Object.assign({}, item);
      confirm("¿Está seguro de querer eliminar este registro?") &&
        axios
          .delete("ord/delete/" + my.orden.OR_PIL_COD + "/", {})
          .then((response) => {
            console.log(response);
            
           my.listarRegistros();
           my.listarRegistrosOrden(my.orden.OR_PIL_COD);
            my.limpiarOrden();
          })
          .catch(function (err) {
            console.log(err.response.data);
          });

      }else{ // en agregar
       const index = this.ORD_PILADO_DETALLES.indexOf(item);
      confirm("¿Está seguro de querer eliminar este registro?") &&
        this.ORD_PILADO_DETALLES.splice(index, 1);
      }
      },

      editOrden(item){
      let my = this;
      // validar formulario
      my.action_orden = "Editar";
      my.campoEstadoOrden = true;
      
      if(my.campoEstado){
       my.orden = Object.assign({}, item);
      }else{
      my.editedIndexOrden = my.ORD_PILADO_DETALLES.indexOf(item);
      my.orden = Object.assign({}, item);
          
      }
      my.OR_PIL_COD= my.orden.OR_PIL_COD;
      my.PART_COD= my.orden.PART_COD;
      my.OR_PIL_CANTIDAD= my.orden.OR_PIL_CANTIDAD;
      my.PRO_COD= my.orden.PRO_COD;
      my.ENV_COD= my.orden.ENV_COD;
      my.OR_PIL_PAGA_PILADO= my.orden.OR_PIL_PAGA_PILADO;
      my.OR_PIL_PAGA_ENVASE= my.orden.OR_PIL_PAGA_ENVASE;
      my.OR_PIL_UNIDAD= my.orden.OR_PIL_UNIDAD;
      my.PRO_DESCRIPCION = my.orden.PRO_DESCRIPCION; //add
      my.ENV_NOM = my.orden.ENV_NOM; // add

      my.pro_selected= {"PRO_COD":my.orden.PRO_COD, "PRO_DESCRIPCION":my.orden.PRO_DESCRIPCION },

      my.vas_selected= {"ENV_COD":my.orden.ENV_COD, "ENV_NOM":my.orden.ENV_NOM },

      console.log("orden edit "+this.orden);

      
      my.dialogOrden = true;   

      
      },
      limpiar_detallesOrden(){
        this.ORD_PILADO_DETALLES = [];

      },
    limpiarOrden(){
      let my = this;
    this.OR_PIL_CANTIDAD= null;
    this.PRO_COD= null;
    this.ENV_COD= null;
    this.OR_PIL_PAGA_PILADO= true;
    this.OR_PIL_PAGA_ENVASE= true;
    this.OR_PIL_UNIDAD= "SACO";
   // this.ORD_PILADO_DETALLES = []; PROHIBIDO
    this.vas_selected= { "ENV_COD":null, "ENV_NOM":null};
    this.pro_selected= {"PRO_COD": null, "PRO_DESCRIPCION": null};

   my.valid2= true;
   my.error= false;
   my.msg_error= "";
   my.errores= [];

    },
    asignarNombrePro(){
      this.PRO_COD = this.pro_selected.PRO_COD;
      this.PRO_DESCRIPCION = this.pro_selected.PRO_DESCRIPCION;


    },
    asignarNombreVas(){
      this.ENV_COD = this.vas_selected.ENV_COD;
      this.ENV_NOM = this.vas_selected.ENV_NOM;
    },

    editItem(item) {
      let my = this;
      my.action = "Editar";
      my.campoEstado = true;
      this.editedItem = Object.assign({}, item);

      my.PART_COD= my.editedItem.PART_COD;
      my.MOL_COD= my.editedItem.MOL_COD;
      my.AGR_COD= my.editedItem.AGR_COD;
      my.LT_COD= my.editedItem.LT_COD;
      my.PART_OPERADOR= my.editedItem.PART_OPERADOR;
      my.PART_PESADOR= my.editedItem.PART_PESADOR;
      my.PART_POLVILLERO= my.editedItem.PART_POLVILLERO;
      my.PART_ESTIBADOR1= my.editedItem.PART_ESTIBADOR1;
      my.PART_ESTIBADOR2= my.editedItem.PART_ESTIBADOR2;
      my.PART_FECHA= my.editedItem.PART_FECHA;
      my.PART_HORA_INICIO= my.editedItem.PART_HORA_INICIO;
      my.PART_HORA_FIN= my.editedItem.PART_HORA_FIN;
      my.PART_OBSERVACION= my.editedItem.PART_OBSERVACION;
      my.PART_TOTAL_SACOS= my.editedItem.PART_TOTAL_SACOS;
      my.PART_TOTAL_KILOS= my.editedItem.PART_TOTAL_KILOS;
      my.PART_PROD_HORA= my.editedItem.PART_PROD_HORA;
      my.PART_EXCEDE_DIA = my.editedItem.PART_EXCEDE_DIA;

      
      my.listarRegistrosOrden(my.editedItem.PART_COD);
      console.log(this.editedItem);
      my.dialog = true;
    },

    deleteItem(item) {
      let my = this;
      my.editedItem = Object.assign({}, item);
      confirm("¿Está seguro de querer eliminar este registro?") &&
        axios
          .delete(my.DELETE_delete + my.editedItem.PART_COD + "/", {})
          .then((response) => {
            console.log(response);
            my.listar();
            my.limpiar();
          })
          .catch(function (err) {
            console.log(err.response.data);
          });
    },

    close() {
      this.dialog = false;
      
          this.error = false;
    },
    closeList() {
      this.dialogList = false;
    },
    closeOrden() {
      this.dialogOrden = false;
      
          this.error = false;
    },

    limpiar() {
    let my = this;
    my.PART_COD = null;
    my.MOL_COD = null;
    my.AGR_COD = null;
    my.LT_COD = null;
    my.PART_OPERADOR = null;
    my.PART_PESADOR = null;
    my.PART_POLVILLERO = null;
    my.PART_ESTIBADOR1 = null;
    my.PART_ESTIBADOR2 = null;
    my.PART_FECHA = new Date();
    my.PART_HORA_INICIO = null;
    my.PART_HORA_FIN = null;
    my.PART_OBSERVACION = null;
    my.PART_TOTAL_SACOS = true;
    my.PART_TOTAL_KILOS = true;
    my.PART_PROD_HORA = null;
    my.PART_EXCEDE_DIA = false;

   my.valid= true;
   my.error= false;
   my.msg_error= "";
   my.errores= [];
    

    },

    save() {
      this.$refs.form.validate();
      if (this.$refs.form.validate(true)) {
        this.errores = [];
      let my = this;       
if(my.action ==="agregar"){
  my.fecha = " "+my.PART_FECHA.getDate()+ "/" + (my.PART_FECHA.getMonth() +1) +"/"+ my.PART_FECHA.getFullYear()+" "+
      my.PART_FECHA.getHours() + ":"+ my.PART_FECHA.getMonth() + ":"+ my.PART_FECHA.getSeconds(); 
}
      if (my.action === "Editar") {
        axios
          .put(my.PUT_edit + my.editedItem.PART_COD + "/", {
            PART_COD: my.editedItem.PART_COD,
            MOL_COD: my.MOL_COD,
            AGR_COD: my.AGR_COD,
            LT_COD: my.LT_COD,
            LT_CERRADO: my.LT_CERRADO,
            PART_OPERADOR: my.PART_OPERADOR,
            PART_PESADOR: my.PART_PESADOR,
            PART_POLVILLERO: my.PART_POLVILLERO,
            PART_ESTIBADOR1: my.PART_ESTIBADOR1,
            PART_ESTIBADOR2: my.PART_ESTIBADOR2,
            PART_FECHA: my.PART_FECHA,
            PART_HORA_INICIO: my.PART_HORA_INICIO,
            PART_HORA_FIN: my.PART_HORA_FIN,
            PART_OBSERVACION: my.PART_OBSERVACION,
            PART_EXCEDE_DIA: my.PART_EXCEDE_DIA,
           // PART_TOTAL_SACOS: my.PART_TOTAL_SACOS,
           // PART_TOTAL_KILOS: my.PART_TOTAL_KILOS,
           // PART_PROD_HORA: my.PART_PROD_HORA,
          })
          .then((response) => {
            console.log(response); 
            
            if( my.LT_COD != null && my.CERRAR_LOTE){
              my.cerrarLote(my.LT_COD);
            }else{
              console.log("No implica cerrar");
            }       
            my.close();
            my.listar();
            my.limpiar();
          })
          .catch(err => {
            console.log(err.response.data);
            if (err.response.status == 400) {
                
                console.log(err.response.data);
                if (err.response.data.AGR_COD != null) {
                  this.errores.push("Seleccione un agricultor");
                }
                if (err.response.data.MOL_COD != null) {
                  this.errores.push("Seleccione un molino");
                }
                if (err.response.data.LT_COD != null) {
                  this.errores.push("Seleccione un lote");
                }
                 if (err.response.data.PART_ESTIBADOR1 != null) {
                  this.errores.push("Seleccione un estibador");
                }
                 if (err.response.data.PART_OPERADOR != null) {
                  this.errores.push("Seleccione un operador");
                }
                 if (err.response.data.PART_PESADOR != null) {
                  this.errores.push("Seleccione un pesador");
                }
                 if (err.response.data.PART_POLVILLERO != null) {
                  this.errores.push("Seleccione un polvillero");
                }
                if (err.response.data.PART_HORA_INICIO != null) {
                  this.errores.push("Ingrese hora de inicio");
                }
                if (err.response.data.PART_HORA_FIN != null) {
                  this.errores.push("Ingrese hora fin");
                }
                this.mostrarErrores();
              }
          })
   


      } else {
        //cod para agregar
        axios
          .post(my.POST_add, {
            MOL_COD: my.MOL_COD,
            AGR_COD: my.AGR_COD,
            LT_COD: my.LT_COD,
            LT_CERRADO: my.LT_CERRADO,
            PART_OPERADOR: my.PART_OPERADOR,
            PART_PESADOR: my.PART_PESADOR,
            PART_POLVILLERO: my.PART_POLVILLERO,
            PART_ESTIBADOR1: my.PART_ESTIBADOR1,
            PART_ESTIBADOR2: my.PART_ESTIBADOR2,
            PART_FECHA: my.PART_FECHA,
            PART_HORA_INICIO: my.PART_HORA_INICIO,
            PART_HORA_FIN: my.PART_HORA_FIN,
            PART_OBSERVACION: my.PART_OBSERVACION,
            PART_EXCEDE_DIA: my.PART_EXCEDE_DIA,
            ORD_PILADO_DETALLES: my.ORD_PILADO_DETALLES
          })
          .then(function (response) {
            console.log(response.data);
            if( my.LT_COD != null && my.CERRAR_LOTE){
              my.cerrarLote(my.LT_COD);
            }else{
              console.log("No implica cerrar");
            }
            my.close();
            my.listar();
            my.limpiar();
          })
          .catch(err => {
            
            console.log(err.response.data);
           
            if (err.response.status == 400) {
                
                console.log(err.response.data);
                if (err.response.data.AGR_COD != null) {
                  this.errores.push("Seleccione un agricultor");
                }
                if (err.response.data.MOL_COD != null) {
                  this.errores.push("Seleccione un molino");
                }
                if (err.response.data.LT_COD != null) {
                  this.errores.push("Seleccione un lote");
                }
                 if (err.response.data.PART_ESTIBADOR1 != null) {
                  this.errores.push("Seleccione un estibador");
                }
                 if (err.response.data.PART_OPERADOR != null) {
                  this.errores.push("Seleccione un operador");
                }
                 if (err.response.data.PART_PESADOR != null) {
                  this.errores.push("Seleccione un pesador");
                }
                 if (err.response.data.PART_POLVILLERO != null) {
                  this.errores.push("Seleccione un polvillero");
                }
                 if (err.response.data.PART_HORA_INICIO != null) {
                  this.errores.push("Ingrese hora de inicio");
                }
                if (err.response.data.PART_HORA_FIN != null) {
                  this.errores.push("Ingrese hora fin");
                }
                this.mostrarErrores();
              }
          });
      }
       }
    }, //fin método

    // metodoS FORMATOS
    getColor(VALOR) {
      if (VALOR === "CERRADO") return "red";
      else if (VALOR === "PARADO") return "orange";
      else if (VALOR === "ABIERTO") return "green";
      else if (VALOR) return "green";
      else return "red";
    },
  },

    props: {
    source: String
  }
};
</script>