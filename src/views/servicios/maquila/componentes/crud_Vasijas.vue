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
                        <v-col cols="12" sm="12" md="12">
                          <v-text-field
                          prepend-inner-icon="ti-archive"
                            v-model="ENV_NOM"
                            label="Nombre vasija"
                            :rules="nombreRules"
                            required
                            outlined
                            ref="nom_"                         
                            :counter="35"
                            v-on:keypress="isText($event,35,'nom_')" 
                          ></v-text-field>
                        </v-col>
                         <v-col cols="12" sm="6" md="6">
                          <!--
                          <v-text-field
                            outlined
                            v-model="ENV_STOCK_INICIAL"
                            label="Stock inicial"
                            type="number"
                            :rules="cantidadRulesRequerido"
                            v-on:keypress="isPositive($event)" 
                          ></v-text-field>
-->
                          <v-text-field
                            outlined
                            v-model="ENV_STOCK_MINIMO"
                            label="Stock minimo"
                            type="number"
                            :rules="cantidadRules"
                            v-on:keypress="isPositive($event)" 
                          ></v-text-field>
                         </v-col>
                         <v-col cols="12" sm="6" md="6">
                          

                          <v-text-field
                            outlined
                            v-model="ENV_STOCK_CRITICO"
                            label="Stock crítico"
                            type="number"
                            :rules="cantidadRules"
                            required
                            v-on:keypress="isPositive($event)" 
                          ></v-text-field>
                           <v-text-field
                            outlined
                            prepend-inner-icon="mdi-cash-multiple"
                            v-model="ENV_COSTO"
                            label="Costo unitario (S/)"
                            type="number"
                            :rules="cantidadRulesRequerido"
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
          <template v-slot:[`item.ENV_STOCK`]="{ item }">
          <v-chip :color="getColor(item.ENV_STOCK, item.ENV_STOCK_MINIMO, item.ENV_STOCK_CRITICO )" dark>
            {{ item.ENV_STOCK }}
          </v-chip>
        </template>
        <template v-slot:item.actions="{ item }">
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
        <div class="text-center">

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
        </div>
      </template>    
    </div>
  </div>
</template>

<script>
import axios from "axios";

export default {
  name: "crud_Vasijas",

  data: () => ({
    singular: "vasija",
    tableTitle: "Lista de " + "vasijas",
    action: "nothing",
    campoEstado: false,
    op_estados: ["ACTIVO", "ELIMINADO"],

    dialog: false,
    headers: [
      {
        align: "start",
        sortable: false,
        // atributos de cada item
        //{ text: "" , value: "ENV_COD"},
        text: "Vasija" , value: "ENV_NOM"},
        { text: "Cantidad" , value: "ENV_STOCK"},
       // { text: "Stock inicial" , value: "ENV_STOCK_INICIAL"},
        { text: "Stock mínimo" , value: "ENV_STOCK_MINIMO"},
        { text: "Stock critico" , value: "ENV_STOCK_CRITICO"},
        { text: "Costo Unitario" , value: "ENV_COSTO"},
       // { text: "" , value: "ENV_ESTADO"},
      // opciones por cada item
      { text: "Opciones", value: "actions", sortable: false },
    ],
    search: "", // BUSQUEDA
    lista: [],
    POST_add : 'env/add/',
    DELETE_delete : 'env/delete/',
    PUT_edit : 'env/edit/',
    GET_list : 'env/list/',

    /// datos para guardar
    ENV_COD : null,
    ENV_NOM : null,
    ENV_STOCK : null,
    ENV_STOCK_INICIAL : null,
    ENV_STOCK_MINIMO : null,
    ENV_STOCK_CRITICO : null,
    ENV_COSTO: null,
    ENV_ESTADO : "ACTIVO",

    editedIndex: -1,

    editedItem: {
    ENV_COD : null,
    ENV_NOM : null,
    ENV_STOCK : null,
    ENV_STOCK_INICIAL : null,
    ENV_STOCK_MINIMO : null,
    ENV_STOCK_CRITICO : null,
    ENV_ESTADO : "ACTIVO",
    ENV_COSTO: null,
    },
    // data validación
    valid: true,
    error: false,
    msg_error: "",
    errores: [],
    nombreRules: [
      (v) => !!v || "Este dato es requerido",
      (v) =>
        (v && v.length <= 35) || "Este campo puede tener un máximo de 35 caracteres",
    ],
    cantidadRules: [
      (v) => !v || /^([0-9])*$/.test(v) || "Ingrese un número",
    ],
    cantidadRulesRequerido: [
      (v) => !!v || /^([0-9])*$/.test(v) || "Este campo es requerido",
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
  },

  methods: {
    // metodoS FORMATOS
    getColor(VALOR, minimo, critico) {
      if (VALOR > minimo ) return "green";
      else if (VALOR <= minimo && VALOR > critico ) return "orange";
      else return "red";
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

      my.ENV_COD= my.editedItem.ENV_COD;
      my.ENV_NOM= my.editedItem.ENV_NOM;
      my.ENV_STOCK= my.editedItem.ENV_STOCK;
      my.ENV_STOCK_INICIAL= my.editedItem.ENV_STOCK_INICIAL;
      my.ENV_STOCK_MINIMO= my.editedItem.ENV_STOCK_MINIMO;
      my.ENV_STOCK_CRITICO= my.editedItem.ENV_STOCK_CRITICO;
      my.ENV_ESTADO= my.editedItem.ENV_ESTADO;
      my.ENV_COSTO = my.editedItem.ENV_COSTO;

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
          .delete(my.DELETE_delete + my.editedItem.ENV_COD + "/", {})
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
      my.ENV_COD = null;
      my.ENV_NOM = "";
      my.ENV_STOCK = null;
      my.ENV_STOCK_MINIMO = null;
      my.ENV_STOCK_CRITICO = null;
      my.ENV_ESTADO = "ACTIVO";
      my.ENV_COSTO = null;

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
        if (my.action === "Editar") {
          axios
            .put(my.PUT_edit + my.editedItem.ENV_COD + "/", {
              ENV_COD: my.editedItem.ENV_COD,
              ENV_NOM: my.ENV_NOM,
              ENV_COSTO: my.ENV_COSTO,
              ENV_STOCK_INICIAL: my.ENV_STOCK_INICIAL,
              ENV_STOCK_MINIMO: my.ENV_STOCK_MINIMO,
              ENV_STOCK_CRITICO: my.ENV_STOCK_CRITICO,
              ENV_ESTADO: my.ENV_ESTADO
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
                this.error = true;
                console.log(err.response.data);
                if (this.ENV_NOM == "") {
                  this.errores.push("No ingresó el nombre de la vasija");
                }
                this.mostrarErrores();
              }
            });
        } else {
          //cod para agregar
          axios
            .post(my.POST_add, {
              ENV_NOM: my.ENV_NOM,
              ENV_COSTO: my.ENV_COSTO,
              ENV_STOCK_INICIAL: my.ENV_STOCK_INICIAL,
              ENV_STOCK_MINIMO: my.ENV_STOCK_MINIMO,
              ENV_STOCK_CRITICO: my.ENV_STOCK_CRITICO
              
            })
            .then(function (response) {
              console.log(response);
              my.close();
              my.listar();
              my.limpiar();
            })
            .catch(err => {
              console.log(err.response.data);
              if (err.response.status == 400) {
                this.error = true;
                console.log(err.response.data);
                if (this.ENV_NOM == "") {
                  this.errores.push("No ingresó el nombre de la vasija");
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