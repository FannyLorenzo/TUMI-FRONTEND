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
          'items-per-page-text': 'Registros por página',
        }"
        sort-by=""
      >
        <template v-slot:top>
          <v-toolbar flat color="black">
            <v-toolbar-title>{{ tableTitle }}</v-toolbar-title>
            <v-divider class="mx-4" inset vertical></v-divider>
            <v-spacer></v-spacer>

            <v-text-field
              class="text-xs-center"
              v-model="search"
              append-icon="search"
              label="Búsqueda"
              single-line
              hide-details
            ></v-text-field>
            <v-spacer></v-spacer>

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
              <v-form ref="form" v-model="valid" lazy-validation> 
                <v-card>
                  <v-card-title class="pa-4 orange"> </v-card-title>

                  <v-card-text>
                    <v-container>
                      <v-row>
                        <h3 class="headline white--text">{{ formTitle }}</h3>
                      </v-row>
                      <v-row>
                        <v-col cols="12" sm="6" md="6">
                      <v-switch
                            v-model="esArroz"
                            inset
                            color="orange"
                            :label="`${tipoProducto}`"
                          ></v-switch>
                        </v-col>
                       <v-col cols="12" sm="6" md="6">
                       <v-text-field
                            outlined
                            prepend-inner-icon="mdi-cash-multiple"
                            v-model="PRO_COS_MAQUILA"
                            label="Costo maquila (S/)"
                            type="number"
                            :rules="cantidadRulesRequerido"
                             v-on:keypress="isPositive($event)" 
                          ></v-text-field>
                       </v-col>
                      </v-row>

                      <v-row>
                        <v-col cols="12" sm="12" md="12">
                          
                          
                      <template>
                          <v-select v-if="esArroz"

                            outlined
                            prepend-inner-icon="ti-layout-grid2-alt"
                            v-model="TR_VAR_COD"
                            :items="op_variedad"
                            item-text="TR_VAR_NOM"
                            item-value="TR_VAR_COD"
                            label="Variedad"
                            persistent-hint
                            no-data-text="No se tiene registros"
                            return-object
                          ></v-select>
                         
                          <v-text-field  v-else                       
                          prepend-inner-icon=" ti-crown"
                            v-model="PRO_NOMBRE"
                            label="Descripción"
                            :rules="nombreRules"
                            required
                            outlined
                            ref="nom_"                         
                            :counter="120"
                             v-on:keypress="isText($event,120,'nom_')" 
                          >{{TR_VAR_COD=null}}</v-text-field>
                         </template>
                        </v-col>
                        
                        <v-col cols="12" sm="6" md="6">

                          <v-text-field
                            outlined
                            v-model="PRO_CAPACIDAD"
                            label="Capacidad (Kg/saco)"
                            type="number"
                            :rules="cantidadRulesRequerido"
                            required
                             v-on:keypress="isPositive($event)" 
                          ></v-text-field>

                            <v-text-field
                            outlined
                            v-model="PRO_STOCK_MINIMO"
                            label="Stock minimo"
                            type="number"
                            :rules="cantidadRules"
                             v-on:keypress="isPositive($event)" 
                          ></v-text-field>
                        </v-col>
                           <v-col cols="12" sm="6" md="6">
                         <v-text-field
                            outlined
                            prepend-inner-icon="mdi-cash-multiple"                            
                            v-model="PRO_PREC_VENTA"
                            label="Precio de venta (S/)"
                            type="number"
                            :rules="cantidadRulesRequerido"
                             v-on:keypress="isPositive($event)" 
                          ></v-text-field>
                          <v-text-field
                            outlined
                            v-model="PRO_STOCK_CRITICO"
                            label="Stock crítico"
                            type="number"
                            :rules="cantidadRules"
                             v-on:keypress="isPositive($event)" 
                          ></v-text-field>
                          

                        

                        </v-col>
                      </v-row>

                      <v-row>
                        <!-- MENSAJE DE ALERTA DE VALIDACIÓN-->
                        <v-alert dense outlined type="error" v-if="error">
                          {{ msg_error }} <strong> </strong>
                        </v-alert>
                        <!-- FIN MENSAJE DE ALERTA -->
                      </v-row>                    

                    </v-container>
                  </v-card-text>

                  <v-card-actions>
                    <v-spacer></v-spacer>
                    <v-btn color="blue darken-1" text @click="close"
                      >Cancelar</v-btn
                    >
                    <v-btn :disabled="!valid" color="blue darken-1" text @click="save">{{
                      action_form
                    }}</v-btn>
                  </v-card-actions>
                </v-card>
              </v-form>
            </v-dialog>
          </v-toolbar>
        </template>
          <template v-slot:[`item.PRO_STOCK`]="{ item }">
          <v-chip :color="getColor(item.PRO_STOCK, item.PRO_STOCK_MINIMO, item.PRO_STOCK_CRITICO )" dark>
            {{ item.PRO_STOCK }}
          </v-chip>
        </template>
        <template v-slot:[`item.actions`]="{ item }">
          <v-icon small class="mr-2" @click="editItem(item)">mdi-pencil</v-icon>
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
  </div>
</template>

<script>
import axios from "axios";

export default {
  name: "crud_Productos",

  data: () => ({
    singular: "producto",
    tableTitle: "Lista de " + "productos",
    action: "nothing",
    campoEstado: false,
    op_estados: ["ACTIVO", "ELIMINADO"],
    esArroz : true,
    op_variedad: [], 

    dialog: false,
    headers: [
      {
        align: "start",
        sortable: false,
        // atributos de cada item
        //{ text: "" , value: "PRO_COD"},
        text: "Producto" , value: "PRO_DESCRIPCION"}, // 
        
        // PRO_NOMBRE descripcion+ capacidad
      //  {text: "Variedad" , value: "TR_VAR_COD"},
        { text: "Cantidad (sacos)" , value: "PRO_STOCK"},
        { text: "Stock mínimo" , value: "PRO_STOCK_MINIMO"},
        { text: "Stock critico" , value: "PRO_STOCK_CRITICO"},
        { text: "Capacidad (Kg/saco)" , value: "PRO_CAPACIDAD"},
        { text: "Costo maquila (S/)" , value: "PRO_COS_MAQUILA"},
        { text: "Precio de venta (S/)", value: "PRO_PREC_VENTA"},      
       // { text: "Estado" , value: "PRO_ESTADO"},
      // opciones por cada item
      { text: "Opciones", value: "actions", sortable: false },
    ],
    search: "", // BUSQUEDA
    lista: [],
    POST_add : 'pro/add/',
    DELETE_delete : 'pro/delete/',
    PUT_edit : 'pro/edit/',
    GET_list : 'pro/list/',

    /// datos para guardar
    PRO_COD : null,
    TR_VAR_COD: null,
    PRO_DESCRIPCION : "",

    PRO_NOMBRE : "",
    PRO_STOCK : null,
    PRO_STOCK_MINIMO : null,
    PRO_STOCK_CRITICO : null,
    PRO_ESTADO : "ACTIVO",
    PRO_CAPACIDAD : null,
    PRO_COS_MAQUILA : null,
    PRO_PREC_VENTA : null,

    editedIndex: -1,

    editedItem: {
    PRO_COD : null,
    TR_VAR_COD: null,
    PRO_DESCRIPCION : "",
    PRO_NOMBRE : "",
    PRO_STOCK : null,
   
    PRO_STOCK_MINIMO : null,
    PRO_STOCK_CRITICO : null,
    PRO_ESTADO : "ACTIVO",
    PRO_CAPACIDAD : null,
    PRO_COS_MAQUILA : null,
    PRO_PREC_VENTA : null,
    },
    // data validación
    valid: true,
    error: false,
    msg_error: "",
    errores: [],
    nombreRules: [
      (v) => !!v || "Este dato es requerido",
      (v) =>
        (v && v.length <= 120) || "Este campo puede tener un máximo de 120 caracteres",
    ],
    cantidadRules: [
      (v) => !v || /^[+]?\d+([,.]\d+)?$/.test(v) ||/^([0-9])*$/.test(v) || "Ingrese un número",
    ],
     cantidadRulesRequerido: [
      (v) => !!v || "Este campo es requerido",
      (v) => !!v || /^[+]?\d+([,.]\d+)?$/.test(v) ||/^([0-9])*$/.test(v) || "Ingrese un número",
    ],

    // data eliminacion
    confirmBox: {
      deleteRegister: false,
      item: null
    },
  }),
  computed: {
    formTitle() {
      return this.action === "Agregar"
        ? "Agregar " + this.singular
        : "Editar " + this.singular;
    },
     tipoProducto() {
      return this.esArroz
        ? "Es arroz"
        : "Es un derivado";
    },
    action_form() {
      return this.action === "Agregar" ? "Agregar" : "Editar";
    },
  },

  watch: {
    dialog(val) {
      val || this.close();
    },
  },

  created() {
    this.listar();
    this.listarVariedades();
  },

  methods: {
    // metodoS FORMATOS
    getColor(VALOR, minimo, critico) {
      if (VALOR > minimo ) return "green";
      else if (VALOR <= minimo && VALOR > critico ) return "orange";
      else if (VALOR <= critico && VALOR >= 0 ) return "red";
      else return "green";
    },
    // metodos de validaciónn
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
      if(/^[- |+ | e ]+$/.test(char) ) e.preventDefault();
     
  }, 
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
    listarVariedades(){
      let my = this;      
        axios.get("var/list/").then(function(response){my.op_variedad = response.data;})
        .catch(function(err) {console.log(err.response.data)});
    }, //fin listar
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

    addItem() {
      let my = this;
      my.action = "Agregar";
      my.campoEstado = false;
      my.limpiar();
      my.dialog = true;
    },

    editItem(item) {
      let my = this;
      my.action = "Editar";
      my.campoEstado = true;
      my.editedItem = Object.assign({}, item);

      my.PRO_COD= my.editedItem.PRO_COD;
      my.PRO_DESCRIPCION= my.editedItem.PRO_NOMBRE;
      //my.PRO_NOMBRE= my.editedItem.PRO_NOMBRE;
      my.TR_VAR_COD= my.editedItem.TR_VAR_COD;
      my.PRO_STOCK= my.editedItem.PRO_STOCK;
      my.PRO_STOCK_MINIMO= my.editedItem.PRO_STOCK_MINIMO;
      my.PRO_STOCK_CRITICO= my.editedItem.PRO_STOCK_CRITICO;
      my.PRO_ESTADO= my.editedItem.PRO_ESTADO;
      my.PRO_CAPACIDAD= my.editedItem.PRO_CAPACIDAD;
      my.PRO_COS_MAQUILA= my.editedItem.PRO_COS_MAQUILA;
      my.PRO_PREC_VENTA= my.editedItem.PRO_PREC_VENTA;
      if(my.editedItem.TR_VAR_COD == null){
        this.esArroz = false; 
      }else {
        this.esArroz = true;
      }

      this.dialog = true;
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
        axios
          .delete(my.DELETE_delete + my.editedItem.PRO_COD + "/", {})
          .then((response) => {
            console.log(response);
            my.listar();
          })
          .catch(function (err) {
            console.log(err.response.data);
          });
        
        this.deleteCancelar();
    },

    close() {
      this.dialog = false;
    },
    limpiar() {
      let my = this;
      my.PRO_COD = null;
      my.PRO_DESCRIPCION = "";
      my.TR_VAR_COD = null;
      my.PRO_STOCK = null;
      my.PRO_STOCK_MINIMO = null;
      my.PRO_STOCK_CRITICO = null;
      my.PRO_ESTADO = "ACTIVO";
      my.PRO_CAPACIDAD = null;
      my.PRO_COS_MAQUILA = null;
      my.PRO_PREC_VENTA = null;

      my.valid = true;
      my.error = false;
      my.msg_error = "";
      my.errores = [];
    },

    save() {
      this.$refs.form.validate();
      if (this.$refs.form.validate(true)) {
        this.errores = [];
        let my = this;
        let varCOd = null;
        if (my.TR_VAR_COD!= null && my.esArroz!=null){

         varCOd = my.TR_VAR_COD.TR_VAR_COD;
        }else{
          varCOd = null
        }
        if (my.action === "Editar") {
          axios
            .put(my.PUT_edit + my.editedItem.PRO_COD + "/", {
              PRO_COD: my.editedItem.PRO_COD,
              PRO_DESCRIPCION: my.PRO_NOMBRE,
              TR_VAR_COD: varCOd,              
              PRO_STOCK_MINIMO: my.PRO_STOCK_MINIMO,
              PRO_STOCK_CRITICO: my.PRO_STOCK_CRITICO,
              PRO_ESTADO: my.PRO_ESTADO,
              PRO_CAPACIDAD: my.PRO_CAPACIDAD,
              PRO_COS_MAQUILA: my.PRO_COS_MAQUILA,
              PRO_PREC_VENTA: my.PRO_PREC_VENTA,
            })
            .then((response) => {
              console.log(response);
              my.close();
              my.listar();
              my.limpiar();
            })
            .catch(function (err) {
              console.log(err.response.data);
              if (err.response.status == 400) {
                if (err.response.data.PRO_DESCRIPCION != null) {
                  this.errores.push("No ingresó el nombre del producto");
                }
                if (err.response.data.PRO_CAPACIDAD != null) {
                  this.errores.push("No ingresó la capacidad");
                }
                if (err.response.data.PRO_PREC_VENTA != null) {
                  this.errores.push("No ingresó la capacidad");
                }
                this.mostrarErrores();
              }
            });
        } else {
          //cod para agregar
          axios
            .post(my.POST_add, {
              PRO_DESCRIPCION: my.PRO_NOMBRE,
              TR_VAR_COD: varCOd,
              PRO_STOCK_MINIMO: my.PRO_STOCK_MINIMO,
              PRO_STOCK_CRITICO: my.PRO_STOCK_CRITICO,
              PRO_CAPACIDAD: my.PRO_CAPACIDAD,
              PRO_COS_MAQUILA: my.PRO_COS_MAQUILA,
              PRO_PREC_VENTA: my.PRO_PREC_VENTA,
              
            })
            .then(function (response) {
              console.log(response);
              my.close();
              my.listar();
              my.limpiar();
            })
            .catch(err => {
              console.log(err.response.data);
              console.log(this.TR_VAR_COD);
              if (err.response.status == 400) {
                if (err.response.data.PRO_DESCRIPCION != null) {
                  this.errores.push("No ingresó el nombre del producto");
                }
                if (err.response.data.PRO_CAPACIDAD != null) {
                  this.errores.push("No ingresó la capacidad");
                }
                if (err.response.data.PRO_PREC_VENTA != null) {
                  this.errores.push("No ingresó la capacidad");
                }
                this.mostrarErrores();
              }
            });
        }
      } // fin validación
    }, //fin método
  },

  props: {
    source: String,
  },
};
</script>