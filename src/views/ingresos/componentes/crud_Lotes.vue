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
                                <template v-slot:[`item.REC_TARADO`]="{ item }">
                                  <v-chip
                                    v-if="item.REC_TARADO"
                                    :color="getColor(item.REC_TARADO)"
                                    dark
                                  >
                                    Sí
                                  </v-chip>
                                  <v-chip
                                    v-else
                                    :color="getColor(item.REC_TARADO)"
                                    dark
                                  >
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
            <!-- DIALOG DE REGISTRO DE LOTE-->
            <v-dialog v-model="dialog" max-width="500px">
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
                             <v-col class="d-flex" cols="12" sm="12" md="12" center>                           
                              <v-select 
                                    outlined
                                    prepend-inner-icon="mdi-account"
                                    v-model="AGR_COD"
                                    :items="op_agricultores"
                                    :item-text="item => item.AGR_NOM +' '+ item.AGR_APE"
                                    item-value="AGR_COD"                            
                                    label="Agricultores"
                                    persistent-hint
                                    no-data-text="No se tiene registros"
                                    :rules="selectRules" 
                                  ></v-select>
                            </v-col>
                           
                            <v-col class="d-flex" cols="12" sm="6" md="6" center>                           
                              <v-select 
                                    outlined
                                    prepend-inner-icon=" ti-location-pin"
                                    v-model="TR_ZON_COD"
                                    :items="op_zonas"
                                    :item-text="item => item.TR_ZON_NOM"
                                    item-value="TR_ZON_COD"                            
                                    label="ZONA"
                                    persistent-hint
                                    no-data-text="No se tiene registros"
                                    :rules="selectRules" 
                                  ></v-select>
                            </v-col>

                             <v-col class="d-flex" cols="12" sm="6" md="6">
                                <v-select
                                  outlined
                                  v-model="LT_ANIO"
                                  :items="op_years"
                                  label="AÑO"                              
                                  persistent-hint
                                  no-data-text="No se tiene registros"
                                  :rules="selectRules" 
                                ></v-select>
                              </v-col>
                            <!--                                               
                            <v-col class="d-flex" cols="12" sm="12" md="12">
                              <v-text-field 
                                prepend-inner-icon="ti-server"
                                v-model="LT_LOTE_NOM"
                                label="Lote"
                                type="text"
                                :rules="textoRules"
                                placeholder="Si no lo ingresa, será autogenerado"   
                                outlined
                              ></v-text-field>  
                            </v-col> 
                            -->                        
                            <template v-if="campoEstado">
                              <v-col class="d-flex" cols="12" sm="6" md="6">
                                <v-text-field
                                 outlined 
                                  v-model="LT_HUM_ACTUAL"
                                  label="Humedad"
                                  type ="number"
                                  :rules="cantidadRules"
                                  placeholder="0.0"
                                  
                                ></v-text-field>
                              </v-col>
                              <v-col class="d-flex" cols="12" sm="6" md="6">
                                <v-select
                                outlined
                                v-model="LT_CERRADO"
                                :items="op_condicion"
                                label="Condición"                                  
                                :rules="selectRules" 
                                required
                                ></v-select>
                              </v-col>
                            </template>
                          </v-row>

                               <v-row>
                      <!-- MENSAJE DE ALERTA DE VALIDACIÓN-->
                          <v-alert  v-if="error" dense type="error">
                            <li v-for="item in errores" v-bind:key="item">{{ item }} </li>
                             <strong> </strong>
                          </v-alert>
                          <!-- FIN MENSAJE DE ALERTA -->
                          </v-row>


                        </v-container>
                      </v-card-text>
                    </v-container>
                  </v-card-text>

                  <v-card-actions>
                    <v-spacer></v-spacer>
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
          <v-icon small class="mr-2" @click="showItems(item)">mdi-menu</v-icon>
          <v-icon small class="mr-2" @click="editItem(item)"
            >mdi-pencil</v-icon
          >
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
import axios from "axios";
import { mapState, mapActions } from "vuex";

export default {
  name: "crud_Lotes",

  data: () => ({
    singular: "lotes",
    tableTitle: "Lista de " + " lotes",
    action: "nothing",
    campoEstado: false,
    op_estados: ["ACTIVO", "INACTIVO"],

    op_condicion: ["ABIERTO", "CERRADO", "PARADO"],
    op_years: [],

    op_agricultores: [],
    op_zonas: [],
    op_variedad: [],
    op_placas: [],
    op_lotes: [],

    agr_selected: "4",
    zon_selected: "5",
    var_selected: "17",
    pla_selected: "2",
    lote_selected: "2",

    dialog: false,

    dialogList: false,

    headers: [
      {
        align: "start",
        sortable: true,
        // atributos de cada item
        //   text: "Cód Lote", value: "LT_COD" },

        text: "Fecha reg.",
        value: "LT_FECHA",
      },
      { text: "Lote", value: "LT_LOTE_NOM" },
      { text: "Año", value: "LT_ANIO" },
      { text: "Zona", value: "TR_ZON_COD.TR_ZON_NOM" }, // AQUI
      //{ text: "Cod agr.", value: "AGR_COD.AGR_COD" },
      //{ text: "Nombre agr.", value: "AGR_COD.AGR_NOM" },
      //{ text: "Apellido agr.", value: "AGR_COD.AGR_APE" },
      { text: "Agricultor", value: "AGR_NOM_COMPLETO" },
      { text: "Celular", value: "AGR_COD.AGR_CEL" },
      { text: "Total peso neto", value: "LT_TOTAL" },
      { text: "Humedad (%)", value: "LT_HUM_ACTUAL" },
      // { text: "Humedad prom", value: "LT_HUM_PROM" },
      // { text: "Impureza prom", value: "LT_IMP_PROM" },
      // { text: "Estado.", value: "LT_ESTADO" },
      { text: "Condición.", value: "LT_CERRADO" },

      // opciones por cada item
      { text: "Opciones", value: "actions", sortable: false },
    ],

    headersList: [
      {
        align: "start",
        sortable: true,
        // atributos de cada item
        //   text: "Registro", value: "REC_COD" },
        text: "Fecha registro",
        value: "REC_FECHA",
      },
      { text: "Humedad", value: "REC_HUM" },
      { text: "Impureza", value: "REC_IMP" },
      { text: "Variedad", value: "TR_VAR_COD.TR_VAR_NOM" },
      { text: "Zona", value: "TR_ZON_COD.TR_ZON_NOM" },
      //{ text: "Mat. prima", value: "MPR_COD" },
      { text: "Placa Veh.", value: "TR_VEH_COD.TR_VEH_PLA" },
      { text: "Peso bruto (Kg)", value: "REC_PE_B" },
      { text: "Tara (Kg)", value: "REC_TAR" },
      { text: "Peso neto (Kg)", value: "REC_PE_NE" },
      { text: "Flete (S/)", value: "REC_FLE" },
      { text: "Tarado", value: "REC_TARADO" },
    ],
    listaRegistros: [],

    search: "", // BUSQUEDA
    lista: [],
    POST_add: "lot/add/",
    DELETE_delete: "lot/delete/",
    PUT_edit: "lot/edit/",
    GET_list: "lot/list/",
    PUT_retrieve: "lot/retrieve/",

    GET_total: "cas/total/",

    /// datos para guardar
    LT_COD: 0,
    AGR_COD: 0,
    LT_ESTADO: "ACTIVO",
    LT_CERRADO: false,
    LT_TOTAL: 0.0,
    LT_LOTE_NOM: "",
    LT_ANIO:null,
    LT_HUM_PROM: 0.0,
    LT_IMP_PROM: 0.0,
    LT_HUM_ACTUAL: 0.0,
    LT_FECHA: new Date(),
    LT_FECHA_MOD: new Date(),
    REC_TARADO: true,
    TR_ZON_COD: 0,

    editedIndex: -1,

    editedItem: {
      LT_COD: 0,
      AGR_COD: 0,
      LT_ESTADO: "ACTIVO",
      LT_CERRADO: false,
      LT_TOTAL: 0.0,
      LT_LOTE_NOM: "",
      LT_ANIO:null,
      LT_HUM_PROM: 0.0,
      LT_IMP_PROM: 0.0,
      LT_HUM_ACTUAL: 0.0,
      LT_FECHA: new Date(),
      LT_FECHA_MOD: new Date(),
      TR_ZON_COD: 0,
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
      (v) =>
        (!v || v.length <= 60) || "El texto debe tener menos de 60 caracteres",
    ],
    cantidadRules: [
      (v) => !v || /^[+]?\d+([,.]\d+)?$/.test(v) ||/^([0-9])*$/.test(v) || "Ingrese una cantidad válida",
    ],
  }),

  computed: {
    formTitle() {
      return this.action === "Agregar"
        ? "Agregar " + this.singular
        : "Editar " + this.singular;
    },
    action_form() {
      return this.action === "Agregar" ? "Agregar" : "Editar";
    },
    computedDateFormatted() {
      // fecha
      return this.formatDate(this.date);
    },
    // generador de listas referenciales no BD
     
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
  },

  created() {
    this.listar(),
      this.listarAgricultores(),
      this.listarZonas(),
      this.listarRegistros();
      this.years();
    //
  },

  methods: {
    ...mapActions(["refrescarIngresos"]),
    
    years () { //2 años antes y 2 despues del año actual
      const year = new Date().getFullYear()
      //this.op_years =  Array.from({length: (year+2) - (year-2)}, (value, index) => (year-2) + index)
      for(let i=(year-2); i<(year+2); i++){
        this.op_years.push(""+i);

      }
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
    listarZonas() {
      let my = this;
      axios
        .get("zon/list/")
        .then(function (response) {
          my.op_zonas = response.data;
          console.log(my.op_zonas);
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
        .get("cas/list/" + my.lote_selected + "/")
        .then(function (response) {
          my.listaRegistros = response.data;
          my.lote_selected = null;
        })
        .catch(function (err) {
          console.log(err.response.data);
        });
      // console.log("Entro a listarRegistro"+my.listaRegistros);
    }, //fin listar

    showItems(item) {
      let my = this;
      my.lote_selected = Object.assign({}, item).LT_COD;
      console.log("REGISTRO : " + my.lote_selected);
      this.listarRegistros();
      my.dialogList = true;
    },

    addItem() {
      let my = this;
      my.action = "Agregar";
    my.campoEstado = false;
       my.limpiar();
      //my.generarOpZonas();
      my.dialog = true;
    },

    editItem(item) {
      let my = this;
      my.action = "Editar";
      my.campoEstado = true;
      my.editedItem = Object.assign({}, item);

      my.LT_COD = my.editedItem.LT_COD;
      my.AGR_COD = my.editedItem.AGR_COD.AGR_COD;
      my.LT_ESTADO = my.editedItem.LT_ESTADO;
      my.LT_CERRADO = my.editedItem.LT_CERRADO;
      my.LT_TOTAL = my.editedItem.LT_TOTAL;
      my.LT_LOTE_NOM = my.editedItem.LT_LOTE_NOM;
      my.LT_ANIO = my.editedItem.LT_ANIO; // aquii
      my.TR_ZON_COD = my.editedItem.TR_ZON_COD.TR_ZON_COD; //AQUI hBILITAR CUANDO SE TENGA LO DE MIKE
      my.LT_HUM_PROM = my.editedItem.LT_HUM_PROM;
      my.LT_IMP_PROM = my.editedItem.LT_IMP_PROM;
      my.LT_HUM_ACTUAL = my.editedItem.LT_HUM_ACTUAL;
      my.LT_FECHA = my.editedItem.LT_FECHA;
      my.LT_FECHA_MOD = my.editedItem.LT_FECHA_MOD;
      console.log(this.editedItem);

      my.dialog = true;
    },

    deleteItem(item) {
      let my = this;
      my.editedItem = Object.assign({}, item);
      confirm("¿Está seguro de querer eliminar este registro?") &&
        axios
          .delete(my.DELETE_delete + my.editedItem.LT_COD + "/", {})
          .then((response) => {
            console.log(response);
            my.listar();
            my.limpiar();
            my.refrescarIngresos(); // por si elimina su contenido también en reg cascara 
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

    limpiar() {
      let my = this;
      
      // my.LT_COD = 0,
      //my.AGR_COD = 0,
      my.LT_ESTADO = "ACTIVO";
        my.LT_CERRADO = "ABIERTO";
        my.LT_TOTAL = 0.0;
        my.LT_LOTE_NOM = "";
        my.LT_ANIO = '2021';
        my.TR_ZON_COD = null;
        my.LT_HUM_PROM = 0.0;
        my.LT_IMP_PROM = 0.0;
        my.LT_HUM_ACTUAL = 0.0;
        my.LT_FECHA = new Date();
        my.LT_FECHA_MOD = new Date();
      console.log(" aqui fecha");
      console.log(my.LT_FECHA);

   //  my.valid= true;
   // my.error= false;
   // my.msg_error= "";
    //my.errores= [];
    

    },

    save() {
      this.$refs.form.validate();
      if (this.$refs.form.validate(true)) {
        this.errores = [];
      let my = this;    

      //my.REC_PE_NE = my.this.REC_PE_B- my.REC_TAR;
      if (my.action === "Editar") {
        axios
          .put(my.PUT_edit + my.editedItem.LT_COD + "/", {
            LT_COD: my.editedItem.LT_COD,
            TR_ZON_COD: my.TR_ZON_COD, // AQUII
            LT_LOTE_NOM: my.LT_LOTE_NOM, // AQUII
            LT_ANIO: my.LT_ANIO, // AQUII
            AGR_COD: my.AGR_COD,
            LT_ESTADO: my.LT_ESTADO,
            LT_CERRADO: my.LT_CERRADO,
            LT_HUM_ACTUAL: my.LT_HUM_ACTUAL,
            LT_FECHA: my.LT_FECHA,
          })
          .then((response) => {
            console.log(response);
            my.close();
            my.listar();
            my.limpiar();
          })
          .catch(err => {
            console.log(err.response.data);
            if (err.response.status == 400) {
                
                console.log(err.response.data);
                if (err.response.data.AGR_COD != null) {
                  this.errores.push("Debe seleccionar un agricultor");
                }
                if (err.response.data.TR_ZON_COD != null) {
                  this.errores.push("Debe seleccionar una zona");
                }
                if (err.response.data.LT_HUM_ACTUAL != null) {
                  this.errores.push("En humedad ingrese un número válido");
                }
                this.mostrarErrores();
              }
          })
      } else {
        //cod para agregar
        axios
          .post(my.POST_add, {
            AGR_COD: my.AGR_COD,
            LT_FECHA: my.LT_FECHA,
            TR_ZON_COD: my.TR_ZON_COD, // AQUII
            LT_LOTE_NOM: my.LT_LOTE_NOM, // AQUII
            LT_ANIO: my.LT_ANIO // AQUII
          })
          .then(function (response) {
            console.log(response.data);
            my.close();
            my.listar();
            my.limpiar();
          })
          .catch(err => {
            
            console.log(err.response.data);
           
               if (err.response.status == 400) {                 
                            
                if (err.response.data.AGR_COD != null) {
                  this.errores.push("Debe seleccionar un agricultor");
                }
                if (err.response.data.TR_ZON_COD != null) {
                  this.errores.push("Debe seleccionar una zona");
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