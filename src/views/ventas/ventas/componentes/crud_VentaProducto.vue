<template>
  <div>
    <div class="mt-4">
      <!-- :search="(search = agricultorSeleccionado.nombreCompleto)" -->
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
          'items-per-page-text': 'Registros por página',
        }"
        sort-by="AGR_NOM"
      >
        <template v-slot:top>
          <v-toolbar flat color="black">
            <v-toolbar-title>{{ tableTitle }}</v-toolbar-title>
            <v-divider class="mx-4" inset vertical></v-divider>
            <v-spacer></v-spacer>

             <v-text-field class="text-xs-center" v-model="search" append-icon="search" label="Búsqueda" single-line hide-details></v-text-field>
            <v-spacer></v-spacer>

            <!-- DIALOG DE LISTA DE ITEMS -->
            <template>
              <div>
                <v-dialog v-model="dialogList" max-width="1100px">
                  <v-card>
                    <v-card-title class="pa-4 info"> </v-card-title>

                    <v-card-text>
                      <v-container>
                        <v-card-text>
                          <v-container>


                    <v-row>
                    <v-col cols="12" sm="6" md="6"> 
                      <v-text-field
                            outlined
                            v-model="fechaEnFormato"                            
                            label="Fecha registro"
                            disabled
                            ></v-text-field>
                       
                      </v-col>  
                       <v-col cols="12" sm="6" md="6"> 
                      <v-text-field
                            outlined
                            v-model="CAB_VENT_NOM"                            
                            label="Ticket generado"
                            disabled
                            ></v-text-field>
                       
                      </v-col> 
                                         
       
                         </v-row>

                         
                          <v-row>
                            
                   
                    <v-col class="d-flex" cols="12" sm="6" md="6" >                             
                       <v-select outlined
                            prepend-inner-icon="mdi-account"
                            v-model="CLI_COD"
                            :items="op_clientes"
                            :item-text="item => item.CLI_NOM +' '+ item.CLI_APE"
                            item-value="CLI_COD"                            
                            label="Cliente"
                            persistent-hint
                             disabled
                            no-data-text="No se tiene registros"
                          > </v-select>
                    </v-col>                  
                  
                      <v-col class="d-flex" cols="12" sm="6" md="6"  >                             
                       <v-select 
                            outlined
                            prepend-inner-icon="fas fa-hand-spock"
                            v-model="CAB_OPERADOR"
                            :items="op_trabajadores"
                            :item-text="item => item.TRA_NOM +' '+item.TRA_APE"
                            item-value="TRA_COD"                            
                            label="Operador"
                             disabled                          
                            no-data-text="No se tiene registros"
                          > </v-select>
                    </v-col>
   
                          </v-row>
                           <v-row>                          
                            <v-col cols="12" sm="6" md="6">
                              <v-radio-group v-model="CAB_VENT_TIPO_VENT" label="Condición de Pago" row >
                                <v-radio disabled label="Al contado" color="orange" value="AL CONTADO"></v-radio>
                                <v-radio disabled label="AL crédito" color="orange" value="CREDITO"></v-radio>  
                              </v-radio-group>
                            </v-col>
                            <v-col cols="12" sm="6" md="6">
                              <v-text-field
                            outlined
                            hide-details
                            v-model="CAB_VENT_TOTAL"                            
                            label="TOTAL: "
                            background-color="black"
                            disabled
                            ></v-text-field>
                            </v-col>
                        
                          </v-row>

<!--
                            <v-row>
                              <h3 class="headline white--text">
                                Lista de registros
                              </h3>
                            </v-row>  -->

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
            <!-- DIALOG DE REGISTRO DE VENTA-->
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
                    <v-col cols="12" sm="6" md="6"> 
                      <v-text-field
                            outlined
                            v-model="fechaEnFormato"                            
                            label="Fecha registro"
                            disabled
                            ></v-text-field>
                       
                      </v-col>  
                       <v-col cols="12" sm="6" md="6"> 
                      <v-text-field
                            outlined v-if="campoEstado"
                            v-model="CAB_VENT_NOM"                            
                            label="Ticket generado"
                            disabled
                            ></v-text-field>
                       
                      </v-col> 
                                         
       
                         </v-row>

                         
                          <v-row>
                   
                    <v-col class="d-flex" cols="12" sm="6" md="6" >                             
                       <v-select outlined
                            prepend-inner-icon="mdi-account"
                            v-model="CLI_COD"
                            :items="op_clientes"
                            :item-text="item => item.CLI_NOM +' '+ item.CLI_APE"
                            item-value="CLI_COD"                            
                            label="Cliente"
                            persistent-hint
                            :rules="selectRules"
                             required
                            no-data-text="No se tiene registros"
                          > </v-select>
                    </v-col>                  
                  
                      <v-col class="d-flex" cols="12" sm="6" md="6"  >                             
                       <v-select 
                            outlined
                            prepend-inner-icon="fas fa-hand-spock"
                            v-model="CAB_OPERADOR"
                            :items="op_trabajadores"
                            :item-text="item => item.TRA_NOM +' '+item.TRA_APE"
                            item-value="TRA_COD"                            
                            label="Operador"
                            persistent-hint 
                            :rules="selectRules"                           
                            no-data-text="No se tiene registros"
                          > </v-select>
                    </v-col>
   
                          </v-row>
                          <v-row>                          
                            <v-col cols="12" sm="6" md="6">
                              <v-radio-group v-model="CAB_VENT_TIPO_VENT" label="Condición de Pago" row >
                                <v-radio label="Al contado" color="orange" value="AL CONTADO"></v-radio>
                                <v-radio label="AL crédito" color="orange" value="CREDITO"></v-radio>  
                              </v-radio-group>
                            </v-col>
                            <v-col cols="12" sm="6" md="6">
                              <v-text-field
                            outlined
                            hide-details
                            v-model="subtotal"                            
                            label="TOTAL: "
                            background-color="black"
                            disabled
                            ></v-text-field>
                            </v-col>
                        
                          </v-row>
                       

 <!-- DIALOG DE REGISTRO DE ORDENNNNN    -->
            <v-dialog v-model="dialogOrden" max-width="1000px">
              <template v-slot:activator="{ on }">
                 <v-btn 
                  color="primary"
                  dark dense
                  class="mb-2"
                  v-on="on"
                  @click="addItemOrden"
                  >Seleccionar productos</v-btn
                >
              </template>
               <v-card>
                  <v-card-title class="pa-4 orange"> </v-card-title>

                  <v-card-text>
                    <v-container>
                      <v-card-text>
                        <v-container>
                          <v-row>
                            <h3 class="headline white--text">
                              Pedidos
                            </h3>
                          </v-row>

                          <v-row>
                            <v-col cols="12" sm="12" md="12">
                             <!-- TABLA DE STOCKS LISTA -->
                          <v-row> <v-col cols="12" sm="12" md="12">
                              <v-data-table
                                v-model="stockSelected"
                                :headers="headersListaStock"
                                :items="listaStock"
                                :single-select="false"
                                item-key="index"
                                show-select                              
                                class="elevation-1"
                                :search="searchStock"
                                multi-sort                                
                                hide-default-footer  
                                
                              >
                              <template v-slot:top>
                                <v-toolbar flat color="black">
                                  <v-toolbar-title>Seleccion productos</v-toolbar-title>
                                  <v-divider class="mx-4" inset vertical></v-divider>
                                                    <v-spacer></v-spacer>
                                                    <v-text-field class="text-xs-center" v-model="searchStock" append-icon="search" label="Búsqueda" single-line hide-details></v-text-field>
                                                    <v-spacer></v-spacer>
                                                                                                    
                                </v-toolbar>
                              </template>
                              

                               <template v-slot:[`item.actions`]="{ item }"> <!-- NO SE MUESTRA actions -->
                                  <v-icon small class="mr-2" @click="showItems(item)">mdi-menu</v-icon>
                                  <v-icon small class="mr-2" @click="editItem(item)"
                                    >mdi-pencil</v-icon
                                  >
                                  <v-icon medium @click="deleteItem(item)">mdi-delete</v-icon>
                                </template>
                              </v-data-table> 
                              </v-col>
                              
                       </v-row>
                                 </v-col>
                              
                                    
                          </v-row>

                          
                          <!-- antes lo de si pagaba o no el pilado saco kilo-->
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
                    <v-btn color="orange" text @click="addDetalles">Validar selección</v-btn>
                  </v-card-actions>
                </v-card>
              
            </v-dialog>

            <!-- FIN DIALOG DE ooooooooo -->

                          <!-- TABLA DE ORDENES AÑADIDAS-->
                          <v-row> <v-col cols="12" sm="12" md="12">
                              <v-data-table
                                :headers="headersOrdenes"
                                :items="DETALLES_VENTA"
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
                        <template v-slot:[`item.saldo`]="{ item }"> <!-- NO SE MUESTRA actions -->
                                  <v-text-field
                            
                            background-color="black"
                            v-model="item.saldo"
                            :rules="[v => !v || v>=0  ||'Supera stock']"
                            disabled
                          >{{item.saldo  = item.STOCK-item.DET_VENT_CANTIDAD}}</v-text-field> 
                                  
                        </template> 
                        <template v-slot:[`item.DET_VENT_CANTIDAD`]="{ item }"> <!-- NO SE MUESTRA actions -->
                                  <v-text-field
                            
                            background-color="black"
                            v-model="item.DET_VENT_CANTIDAD"
                            type="number"
                            :rules="cantidadRulesRequired"
                            v-on:keypress="isPositive($event)"
                          ></v-text-field> 
                                  
                        </template> 
                       <template v-slot:[`item.DET_VENT_PRECIO_VENT`]="{ item }">
                                 <v-text-field
                           
                            background-color="black"
                            v-model="item.DET_VENT_PRECIO_VENT"
                            type="number"
                            :rules="cantidadRulesRequired"
                            v-on:keypress="isPositive($event)"                            
                          ></v-text-field> 
                                </template> 
                            
                        <template v-slot:[`item.DET_VENT_SUBTOTAL`]="{ item }">
                           <v-text-field
                            v-model="item.DET_VENT_SUBTOTAL"
                            background-color="black"
                            disabled
                            >{{item.DET_VENT_SUBTOTAL = item.DET_VENT_PRECIO_VENT * item.DET_VENT_CANTIDAD}}</v-text-field>
                               
                           </template>

                          <template v-slot:[`item.actions`]="{ item }">
                               
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
                    :disabled="!valid" color="blue darken-1" text @click="addMSJConfirmacion">{{
                      action_form
                    }}</v-btn>
                  </v-card-actions>
                </v-card>
              </v-form>
              
            </v-dialog>

            <!-- FIN DIALOG DE REGISTRO DE VENTA -->
          </v-toolbar>
        </template>
        
        <template v-slot:[`item.actions`]="{ item }">
          <v-icon medium class="mr-2" @click="showItems(item)">ti-eye</v-icon>
       <!--   <v-icon  medium class="mr-2" @click="editItem(item)">mdi-pencil</v-icon>  -->
          <v-icon small @click="deleteMSJConfirmacion(item)">mdi-delete</v-icon>
        </template>
        <template v-slot:no-data>
          <v-btn color="primary" @click="listar">Reset</v-btn>
        </template>
      </v-data-table>
    </div>
      <div>

    <template>
        <!-- ====================================== -->
                        <!-- Delete Contact confirmbox -->
                        <!-- ====================================== -->
                        <v-dialog v-model="confirmBox.deleteRegister" max-width="290">
                          <v-card class="confirm-box">
                            <v-card-title>
                              <span>Eliminar registro</span>
                            </v-card-title>
                            <v-card-text class="py-2">Está segugro de querer eliminar el registro?</v-card-text>
                            <v-card-actions>
                              <v-spacer></v-spacer>
                              <v-btn color="error" text @click="deleteCancelar">Cancelar</v-btn>

                              <v-btn color="error" @click="deleteItem(confirmBox.item)">Eliminar</v-btn>
                            </v-card-actions>
                          </v-card>
                        </v-dialog>
    </template>
  </div>
   <div>

    <template>
        <!-- ====================================== -->
                        <!-- Add  venta confirmbox -->
                        <!-- ====================================== -->
                        <v-dialog v-model="confirmBox.addRegister" max-width="290">
                          <v-card class="confirm-box">
                            <v-card-title>
                              <span>Añadir registro</span>
                            </v-card-title>
                            <v-card-text v-if="no_detalles" class="py-2">Debe registrar detalles primero</v-card-text>
                            <v-card-text v-else class="py-2">¿Está seguro de querer guardar el registro?</v-card-text>
                            
                            <v-card-actions>
                              <v-spacer></v-spacer>
                              <v-btn color="error" text @click="deleteCancelar">Cancelar</v-btn>
                              <v-btn v-if="!no_detalles" color="success" @click="save">Guardar</v-btn>                              
                            </v-card-actions>
                          </v-card>
                        </v-dialog>
    </template>
  </div>
  </div>
</template>

<script>
import axios from "axios";
import { mapState, mapActions } from "vuex";

export default {
  name: "crud_VentaProducto",

  data: () => ({
    singular: "venta productos ",
    tableTitle: "Venta de productos",
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
    op_clientes: [],
    op_trabajadores: [],
    op_envases: [],
    op_productos: [],
    op_productosAgr: [], // this

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
      text: "Nro Ticket" , value: "CAB_VENT_NOM"},
      { text: "Fecha" , value: "CAB_VENT_FECHA"},
      //{ text: "" , value: "CLI_COD"}, 
      { text: "Cliente" , value: "CLIE_NOM_COMPLETO"},
      //{ text: "" , value: "CAB_VENT_COD"},
      { text: "Cantidad" , value: "CAB_VENT_CANT_SACOS"},
      { text: "Venta total" , value: "CAB_VENT_TOTAL"},
      //{ text: "" , value: "CAB_VENT_ESTADO"},
      { text: "Operador" , value: "OPER_NOM_COMPLETO"},
      //{ text: "" , value: "CAB_OPERADOR"},
      { text: "Pago" , value: "CAB_VENT_TIPO_VENT"},
      // opciones por cada item
      { text: "Opciones", value: "actions", sortable: false },

      
    ],

    headersList: [ // lista de detalles por TICKET
      {
        align: "start",
        sortable: true,
        // atributos de cada item
        //text: "" , value: "CAB_VENT_COD"},
        //{ text: "" , value: "PRO_COD"},
        //{ text: "" , value: "AGR_COD"},
        //{ text: "" , value: "DET_VENT_COD"},
         text: "Producto" , value: "PRO_DESCRIPCION"},
         { text: "Agricultor" , value: "AGR_NOM_COMPLETO"},
          { text: "Envase" , value: "ENV_NOM"},
       // { text: "Unidad" , value: "DET_VENT_UNIDAD"},
        { text: "Descripción" , value: "DET_VENT_DESCRIPCION"},
        { text: "Cantidad" , value: "DET_VENT_CANTIDAD"},
        { text: "Precio U." , value: "DET_VENT_PRECIO_VENT"},
        { text: "Total" , value: "DET_VENT_SUBTOTAL"},
        //{ text: "" , value: "DET_VENT_ESTADO"},
    ],

    headersOrdenes: [ // detalle de venta
       { align: "start", 
         text: "Producto" , value: "PRO_DESCRIPCION"}, // PRODUCTO_DESCRIPCION
        { text: "Agricultor" , value: "AGR_NOM_COMPLETO"},
       { text: "Envase" , value: "ENV_NOM"},
       // { text: "Unidad" , value: "DET_VENT_UNIDAD"},
       // { text: "Descripción" , value: "DET_VENT_DESCRIPCION"},
       { text: "Saldo" , value: "saldo"},
        { text: "Cantidad" , value: "DET_VENT_CANTIDAD"},
        { text: "Precio U." , value: "DET_VENT_PRECIO_VENT"}, //DET_VENT_PRECIO_VENT
        { text: "Total" , value: "DET_VENT_SUBTOTAL"},    
        
       { text: "Opciones", value: "actions", sortable: false },       
       
    ],
    headersListaStock:[ // detalle de venta
       { align: "start", 
         text: "Producto" , value: "PRO_DESCRIPCION"}, // PRODUCTO_DESCRIPCION
       { text: "Envase" , value: "ENV_NOM"},
       { text: "Agricultor" , value: "AGR_NOM_COMPLETO"},
       { text: "Precio U." , value: "DET_VENT_PRECIO_VENT"},
       { text: "Stock" , value: "STOCK"}, 
       //{ text: "Opciones", value: "actions", sortable: false },       
       
    ],
    listaStock:[]	,
    searchStock:"", //buscar stock
    stockSelected:[],
    
    listaRegistros: [],

    search: "", // BUSQUEDA
    lista: [],
    POST_add : 'vent/add/',
    DELETE_delete : 'vent/delete/',
    PUT_edit : 'vent/edit/',
    GET_list : 'vent/list/',
    GET_total : 'vent/total/',

    /// datos para guardar VENTA
    CLI_COD : null,
    CAB_VENT_FECHA : null,
    CAB_VENT_COD : null,
    CAB_VENT_TOTAL : 0,
    CAB_VENT_NOM : null,
    CAB_VENT_CANT_SACOS : 0,
    CAB_VENT_ESTADO : null,
    CAB_OPERADOR : null,
    CAB_VENT_TIPO_VENT:"AL CONTADO",

    editedIndex: -1,

    editedItem: {
    CLI_COD : null,
    CAB_VENT_FECHA : null,
    CAB_VENT_COD : null,
    CAB_VENT_TOTAL : 0,
    CAB_VENT_NOM : null,
    CAB_VENT_CANT_SACOS : 0,
    CAB_VENT_ESTADO : null,
    CAB_OPERADOR : null,
    CAB_VENT_TIPO_VENT:"AL CONTADO",
    },
// datos ORDEN VENTA
   // CAB_VENT_COD : null,
    PRO_COD : null,
    AGR_COD : null,
    ENV_COD: null,    
    DET_VENT_COD : null,
    DET_VENT_UNIDAD : 'SACO',
    DET_VENT_PRECIO_VENT : null,
    DET_VENT_DESCRIPCION : null,
    DET_VENT_CANTIDAD : null,
    DET_VENT_SUBTOTAL : null,
    DET_VENT_ESTADO : null,
    ENV_NOM : null,

    
    orden:{
    CAB_VENT_COD : null,
    PRO_COD : null,
    AGR_COD : null,
    ENV_COD: null,
    DET_VENT_COD : null,
    DET_VENT_UNIDAD : 'SACO',
    DET_VENT_PRECIO_VENT : null,
    DET_VENT_DESCRIPCION : null,
    DET_VENT_CANTIDAD : null,
    DET_VENT_SUBTOTAL : null,
    DET_VENT_ESTADO : null,
    PRO_DESCRIPCION : null, // this
    ENV_NOM : null,
    AGR_NOM_COMPLETO : null // this
    },

    DETALLES_VENTA: [],
    no_detalles:true,

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
       (v) => !!v || "Es requerido",  
      (v) => !!v || /^[+-]?\d+([,.]\d+)?$/.test(v) ||/^([0-9])*$/.test(v) || "Ingrese un número",
    ],

     // data eliminacion
    confirmBox: {
      deleteRegister: false,
      addRegister: false,
      item: null
    },


  }),

  computed: {
   
    formTitle() {
      return this.action === "Agregar"
        ? "Agregar " + this.singular
        : "Editar " + this.singular;
    },
    isSAco(){
      return this.DET_VENT_UNIDAD==="KILO";
    },
    action_form() {
      return this.action === "Agregar" ? "Agregar" : "Editar";
    },
    action_ordenForm() {
      return this.action_orden === "Agregar" ? "Agregar" : "Editar";
    },
    subtotal(){
      return (this.DETALLES_VENTA.length>0) ? this.sumarDetalles() :0;
    },
    calculo_pesoneto() {
      //this.REC_PE_NE = this.REC_PE_B - this.REC_TAR;
      return this.REC_PE_B > 0 ? (this.REC_PE_B- this.REC_TAR) : 0;
    
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
   
      this.listarClientes();
      this.listarTrabajadores();
      this.listarEnvases();
      this.listarProductos();
      this.listarProductosAgr();
    //
  },

  methods: {
...mapActions(["refrescarVentas"]),
     from_indicadores(){
      if(this.$route.params.ad==="ad")
      this.addItem();
    },

    // metodos de validaciónn
    isPositive(e)
  {
      let char = String.fromCharCode(e.keyCode);
      if(/^[-]+$/.test(char) ) e.preventDefault();
     
  },
    mostrarErrores() {
      // se entiende que ya hay errores almacenados
      this.msg_error = "";
      for (let i = 0; i < this.errores.length; i++) {
        this.msg_error = this.msg_error + "\n" + this.errores[i];
      }
      this.error = true;
    },

sumarDetalles(){
  let suma=0;
  for(let i = 0; i< this.DETALLES_VENTA.length; i++){
    suma=suma+this.DETALLES_VENTA[i].DET_VENT_SUBTOTAL;

  } 
  return suma;
},
    listarStock(){ // 
      let my = this;
      let count=0;
      axios
        .get("prod/stockV2/") // CAMBIARRRR
        .then(function (response) {
         my.listaStock = response.data.map((item) => {
          // item['index']=count++;
          
          my.orden = {
                  "index" : count++,
                  "STOCK": item.STOCK,
                  "saldo": item.STOCK,
                  "CAB_VENT_COD" : null,
                  "PRO_COD" : item.PRO_COD,
                  "AGR_COD" : item.AGR_COD,
                  "ENV_COD" : item.ENV_COD,
                  "DET_VENT_COD" : null,
                  "DET_VENT_UNIDAD" : item.DET_VENT_UNIDAD,
                  "DET_VENT_PRECIO_VENT" : item.PRO_PREC_VENTA,
                  "DET_VENT_DESCRIPCION" : item.DET_VENT_DESCRIPCION,
                  "DET_VENT_CANTIDAD" : 1,
                  "DET_VENT_SUBTOTAL" : item.DET_VENT_SUBTOTAL,
                  "DET_VENT_ESTADO" : "ACTIVO",
                  "ENV_NOM" : item.ENV_NOM,
                  "PRO_DESCRIPCION" : item.PRO_DESCRIPCION,
                  "AGR_NOM_COMPLETO" : item.AGR_FULL_NAME,

                  };
           
           return my.orden;}); // aqui se pretende tener un INDEX
          console.log(response);
          count=0;
       
        })
        .catch(function (err) {
          
          console.log(err.response.data);
        });
    }, //fin listar
    //PROCEDIMIENTOS para el CRUD
     listarClientes() {
      let my = this;
      axios
        .get("cli/list/")
        .then(function (response) {
          my.op_clientes = response.data;
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
    //  prod/listStockEnv/
//prod/listStockEnvAgr/1/
     listarProductos() {
      let my = this;
      axios
        .get("prod/listStockEnv/") //pro/list/
        .then(function (response) {
          my.op_productos = response.data;
        })
        .catch(function (err) {
          console.log(err.response.data);
        });
    }, //fin listar
    listarProductosAgr() {
      let my = this;
      if(my.AGR_COD === "" || my.AGR_COD ===null || my.AGR_COD ==='<< No asignado >>' ){
          axios
        .get("prod/listStockEnv/") //pro/list/
        .then(function (response) {
          my.op_productos = response.data;
        })
        .catch(function (err) {
          console.log(err.response.data);
        });
      }else{
      axios.get("prod/listStockEnvAgr/"+my.AGR_COD+"/").
          then(function(response){        
          my.op_productos = response.data;
        })
        .catch(function (err) {
          console.log(err.response.data);
        });
    }
    }, //fin listar
    listarAgricultores() {
      let my = this;
      axios
        .get("agr/list/")
        .then(function (response) {          
          my.op_agricultores = response.data;
          my.op_agricultores.push('<< No asignado >>');
         
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
        .get("dvent/list/" + my.parteSelected + "/")
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
        .get("dvent/list/" + cod + "/")
        .then(function (response) {
          my.DETALLES_VENTA = response.data;
          
        })
        .catch(function (err) {
          console.log(err.response.data);
        });
    }, //fin listar

    showItems(item) {
      let my = this;
      my.parteSelected = Object.assign({}, item).CAB_VENT_COD;
      console.log("REGISTRO : " + my.parteSelected);
      //nuevoo
      my.viewItem(item);
       //fin nuevo
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
    addDetalles(){
      
      let my = this;
       my.DETALLES_VENTA = my.stockSelected.map((item) => item);
       my.closeOrden();
     
        //my.limpiarOrden();
      //  my.refrescarVentas(); // THIS

    },
     addItemOrden() {
      let my = this;
      my.action_orden = "Agregar";
      my.campoEstadoOrden = false;
     my.listarStock(); // para que liste lo q se quiere
     
    
      
      my.dialogOrden = true;
    },

  
    deleteOrden(item){
      
      if(this.campoEstadoOrden){ // se está editando el parte
      let my = this;
      my.orden = Object.assign({}, item);
      confirm("¿Está seguro de querer eliminar este registro?") &&
        axios
          .delete("dvent/delete/" + my.orden.DET_VENT_COD + "/", {})
          .then((response) => {
            console.log(response);
            
           my.listarRegistros();
           my.listarRegistrosOrden(my.orden.DET_VENT_COD);
           my.refrescarVentas(); // THIS
            my.limpiarOrden();
          })
          .catch(function (err) {
            console.log(err.response.data);
          });

      }else{ // en agregar
       const index = this.DETALLES_VENTA.indexOf(item);
       confirm("¿Está seguro de querer eliminar este registro?") &&
        this.DETALLES_VENTA.splice(index, 1);
        this.stockSelected.splice(index, 1); // AQUI MERO MERITO
      }
      },

     
      limpiar_detallesOrden(){
        this.DETALLES_VENTA = [];

      },
    limpiarOrden(){
      let my = this;
      my.ENV_COD = null;
      my.PRO_COD = null;
      my.AGR_COD = null;
      //my.DET_VENT_COD = null;
      my.DET_VENT_UNIDAD = 'SACO';
      my.DET_VENT_PRECIO_VENT = null;
      my.DET_VENT_DESCRIPCION = null;
      my.DET_VENT_CANTIDAD = null;
      my.DET_VENT_SUBTOTAL = null;
      my.DET_VENT_ESTADO = null;

   // this.DETALLES_VENTA = []; PROHIBIDO
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
      this.ENV_COD = this.pro_selected.ENV_COD;
      this.ENV_NOM = this.pro_selected.ENV_NOM;
    //  this.DET_VENT_PRECIO_VENT = this.pro_selected.PRO_PREC_VENTA;
      // aqui los meros buenos
      this.DET_VENT_PRECIO_VENT = 12;//this.stockSelected[0].PRO_PREC_VENTA;


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

      my.CAB_VENT_COD= my.editedItem.CAB_VENT_COD;
      my.CLI_COD= my.editedItem.CLI_COD;
      my.CAB_VENT_FECHA= my.editedItem.CAB_VENT_FECHA;
      my.CAB_VENT_TOTAL= my.editedItem.CAB_VENT_TOTAL;
      my.CAB_VENT_NOM= my.editedItem.CAB_VENT_NOM;
      my.CAB_VENT_CANT_SACOS= my.editedItem.CAB_VENT_CANT_SACOS;
      my.CAB_VENT_ESTADO= my.editedItem.CAB_VENT_ESTADO;
      my.CAB_OPERADOR= my.editedItem.CAB_OPERADOR;
      my.CAB_VENT_TIPO_VENT= my.editedItem.CAB_VENT_TIPO_VENT;
      
      my.listarRegistrosOrden(my.editedItem.CAB_VENT_COD);
      console.log(this.editedItem);
      my.dialog = true;
    },
     viewItem(item) {
      let my = this;
      my.action = "Ver";
     // my.campoEstado = true;
      this.editedItem = Object.assign({}, item);

      my.CAB_VENT_COD= my.editedItem.CAB_VENT_COD;
      my.CLI_COD= my.editedItem.CLI_COD;
      my.CAB_VENT_FECHA= my.editedItem.CAB_VENT_FECHA;
      my.CAB_VENT_TOTAL= my.editedItem.CAB_VENT_TOTAL;
      my.CAB_VENT_NOM= my.editedItem.CAB_VENT_NOM;
      my.CAB_VENT_CANT_SACOS= my.editedItem.CAB_VENT_CANT_SACOS;
      my.CAB_VENT_ESTADO= my.editedItem.CAB_VENT_ESTADO;
      my.CAB_OPERADOR= my.editedItem.CAB_OPERADOR;
      my.CAB_VENT_TIPO_VENT= my.editedItem.CAB_VENT_TIPO_VENT;
      
    },
// agregar con mensaj de confirmación
    addMSJConfirmacion() {

      this.$refs.form.validate();
      if (this.$refs.form.validate(true)){
       
       if(this.DETALLES_VENTA===[] || this.DETALLES_VENTA==null || this.DETALLES_VENTA.length==0)
          this.no_detalles=true;
          else 
          this.no_detalles=false;
      
      this.confirmBox = {
          addRegister: true,
          item : null
          
        };

      }
    },

    // Eliiminar registro
    deleteCancelar() {
      this.confirmBox = {
        deleteRegister: false,
        item: null
      };
    },
    deleteMSJConfirmacion(item) {
      this.confirmBox = {
        deleteRegister: true,
        item: Object.assign({}, item)
      };
       this.editedItem = Object.assign({}, item);
    },
    deleteItem(item) {
      let my = this;
      my.editedItem = Object.assign({}, item);
     // confirm("¿Está seguro de querer eliminar este registro?") &&
        axios
          .delete(my.DELETE_delete + my.editedItem.CAB_VENT_COD + "/", {})
          .then((response) => {
            console.log(response);
            my.listar();
            my.limpiar();
            my.refrescarVentas(); // THIS
          })
          .catch(function (err) {
            console.log(err.response.data);
          });
           this.deleteCancelar();
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
          this.limpiarOrden();
    },

    limpiar() {
    let my = this;
    //my.CLI_COD = null;
    my.CAB_VENT_FECHA = new Date();
    //my.CAB_VENT_COD = null;
    //my.CAB_VENT_TOTAL = null;
    my.CAB_VENT_NOM = null;
    my.CAB_VENT_CANT_SACOS = 0;
    my.CAB_VENT_ESTADO = 'ACTIVO';
    my.CAB_OPERADOR = null;
    my.CAB_VENT_TIPO_VENT= 'AL CONTADO';

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
  my.fecha = " "+my.CAB_VENT_FECHA.getDate()+ "/" + (my.CAB_VENT_FECHA.getMonth() +1) +"/"+ my.CAB_VENT_FECHA.getFullYear()+" "+
      my.CAB_VENT_FECHA.getHours() + ":"+ my.CAB_VENT_FECHA.getMonth() + ":"+ my.CAB_VENT_FECHA.getSeconds(); 
}
      if (my.action === "Editar") {
        axios
          .put(my.PUT_edit + my.editedItem.CAB_VENT_COD + "/", {
            //CAB_VENT_COD: my.editedItem.CAB_VENT_COD,
            CLI_COD: my.CLI_COD,
            CAB_VENT_FECHA: my.CAB_VENT_FECHA,
            CAB_VENT_TOTAL: my.CAB_VENT_TOTAL,
            CAB_VENT_NOM: my.CAB_VENT_NOM,
            CAB_VENT_CANT_SACOS: my.CAB_VENT_CANT_SACOS,
            //CAB_VENT_ESTADO: my.CAB_VENT_ESTADO,
            CAB_OPERADOR: my.CAB_OPERADOR,
            CAB_VENT_TIPO_VENT: my.CAB_VENT_TIPO_VENT
          })
          .then((response) => {
            console.log(response); 
                  
            my.close();
            my.listar();
            my.refrescarVentas(); // THIS
             my.listarStock();
            my.limpiar();
          })
          .catch(err => {
            console.log(err.response.data);
            if (err.response.status == 400) {
                
                console.log(err.response.data);
                if (err.response.data.CLI_COD != null) {
                  this.errores.push("Seleccione un agricultor");
                }
                if (err.response.data.CAB_OPERADOR != null) {
                  this.errores.push("Seleccione un molino");
                }
                if (this.CAB_VENT_TOTAL == null) {
                  this.errores.push("Esto debiera ser calculado internamente");
                }                
                this.mostrarErrores();
              }
          })
   


      } else {
        //cod para agregar
        axios
          .post(my.POST_add, {
            CLI_COD: my.CLI_COD,
            CAB_VENT_FECHA: my.CAB_VENT_FECHA,
            CAB_OPERADOR: my.CAB_OPERADOR,
            CAB_VENT_TIPO_VENT: my.CAB_VENT_TIPO_VENT, 
            DETALLES_VENTA: my.DETALLES_VENTA
          })
          .then(function (response) {
            console.log(response.data);
            my.deleteCancelar(); // THISSSS
            my.close();
            my.listar();
             my.listarStock();
            my.refrescarVentas(); // THIS
            my.limpiar();
          })
          .catch(err => {
            
            console.log(err.response.data);
           
            if (err.response.status == 400) {
                
                console.log(err.response.data);
                if (err.response.data.CLI_COD != null) {
                  this.errores.push("Seleccione un cliente");
                }
                if (err.response.data.CAB_OPERADOR != null) {
                  this.errores.push("Seleccione un operador");
                }
                if (this.CAB_VENT_TOTAL == null) {
                  this.errores.push("Esto debiera ser calculado internamente");
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