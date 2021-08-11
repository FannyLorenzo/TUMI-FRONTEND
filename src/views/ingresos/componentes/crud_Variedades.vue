<template>
  <div>
    <div class="mt-4">
      <v-data-table
        :headers="headers"
        :items="lista"
        class="elevation-1"
        :search="search"
        sort-by="Variedad"
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
        <template v-slot:top>
          <v-toolbar flat color="black">
            <v-toolbar-title>{{ plural }}</v-toolbar-title>
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
              <v-card>
                <v-card-title class="pa-4 orange"> </v-card-title>
                <v-card-title>
                  <span class="headline">{{ formTitle }}</span>
                </v-card-title>

                <v-form ref="form" v-model="valid" lazy-validation>
                  <v-card-text>
                    <v-container>
                      <v-row>
                        <v-col cols="12" sm="12" md="12">
                          <v-text-field
                            prepend-inner-icon="ti-layout-grid2-alt"
                            v-model="nombre"
                            :rules="textoRulesRequired"
                            label="Nueva variedad"
                            class="mt-4"                           
                            required
                            outlined
                            ref="nom_"
                            :counter="60"
                            v-on:keypress="isText($event,60,'nom_')"                          
                            
                          ></v-text-field>

                      <!-- MENSAJE DE ALERTA DE VALIDACIÓN-->
                      <v-alert dense outlined type="error" v-if="error">
                        {{ msg_error }} <strong>!</strong>
                      </v-alert>
                      <!-- FIN MENSAJE DE ALERTA -->
                        </v-col>
                      </v-row>

<!--                      <template hidden v-if="campoEstado">
                        <v-row>
                        <v-col class="d-flex" cols="12" sm="12" md="12">
                          <v-select
                            v-model="estado"
                            :items="op_estados"
                            label="Estado"
                            outlined
                          ></v-select>
                        </v-col>
                        </v-row>
                      </template>
       -->              
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
                </v-form>
              </v-card>
            </v-dialog>
          </v-toolbar>
        </template>
        <template v-slot:[`item.actions`]="{ item }">
          <v-icon small class="mr-2" @click="editItem(item)">mdi-pencil</v-icon>
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
import axios from "axios";

export default {
  name: "crud_Variedades",

  data: () => ({
    singular: "variedad",
    plural: "Variedades",
    tableTitle: "Lista de " + "variedades",
    action: "nothing",
    campoEstado: false,
    op_estados: ["ACTIVO", "INACTIVO"],

    dialog: false,
    headers: [
      {
        align: "start",
        sortable: false,
        // atributos de cada item
        text: "Codigo",
        value: "TR_VAR_COD",
      },
      { text: "Variedad", value: "TR_VAR_NOM" },
     // { text: "Estado", value: "TR_VAR_EST" },
      // opciones por cada item
      { text: "Opciones", value: "actions", sortable: false },
    ],
    search: "", // BUSQUEDA
    lista: [],
    lista_: [],
    POST_add: "var/add/",
    DELETE_delete: "var/delete/",
    PUT_edit: "var/edit/",
    GET_list: "var/list/",
    PUT_retrieve: "var/retrieve/",

    /// datos para guardar
    codigo: 0,
    estado: "ACTIVO",
    nombre: "",

    editedIndex: -1,

    editedItem: {
      TR_VAR_COD: 0,
      TR_VAR_NOM: "",
      TR_VAR_EST: "ACTIVO",
    },
    // data validación
    valid: true,
    error: false,
    msg_error: "",
    errores: [],
    textoRulesRequired: [
      (v) => !!v || "Este dato es requerido",
      (v) =>
        (v && v.length <= 60) || "El texto debe tener menos de 60 caracteres",
    ]
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
    // metodos de validaciónn
    isText(e,max,ref_)
  {
     if(this.$refs[ref_].value!= null){
      let n = this.$refs[ref_].value.length;
      let value = this.$refs[ref_].value;
      let char = String.fromCharCode(e.keyCode);
      if(n>=max) e.preventDefault();
      if(/^[\s]+$/.test(char) && (n==0 || /^[\s]+$/.test(value[n-1]))) e.preventDefault();
      
    } 
  },
    mostrarErrores() {
      this.msg_error = "";
      for (let i = 0; i < this.errores.length; i++) {
        this.msg_error = this.msg_error + "\n" + this.errores[i];
      }
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
          console.log(err);
        });
    }, //fin listar

    addItem() {
      let my = this;
      my.action = "Agregar";
      (my.campoEstado = false), my.limpiar();
      my.dialog = true;
    },

    editItem(item) {
      let my = this;
      my.action = "Editar";
      (my.campoEstado = true), (my.editedIndex = my.lista.indexOf(item));
      my.editedItem = Object.assign({}, item);
      my.estado = my.editedItem.TR_VAR_EST;
      my.nombre = my.editedItem.TR_VAR_NOM;
      my.dialog = true;
    },

    deleteItem(item) {
      let my = this;
      my.editedItem = Object.assign({}, item);
      confirm("¿Está seguro de querer eliminar este registro?") &&
        axios
          .delete(my.DELETE_delete + my.editedItem.TR_VAR_COD + "/", {})
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
    },
    limpiar() {
      this.estado = false;
      this.nombre = "";
       this.valid= true;
      this.error= false;
    },

    save() {
      this.$refs.form.validate();
      if (this.$refs.form.validate(true)) {
        this.errores = [];

        let my = this;
        if (my.action === "Editar") {
          axios
            .put(my.PUT_edit + my.editedItem.TR_VAR_COD + "/", {
              TR_VAR_COD: my.editedItem.codigo,
              TR_VAR_NOM: my.nombre,
              TR_VAR_EST: my.estado,
            })
            .then((response) => {
              console.log(response);
              my.close();
              my.listar();
              my.limpiar();
            })
            .catch(function (err) {
              this.error = true;
              console.log(err.response.data);
              if (err.response.status == 400) {
                console.log(err.response.data);
                if (err.response.data.TR_VAR_NOM != null) {
                  this.errores.push(err.response.data.TR_VAR_NOM[0]);
                }
                this.mostrarErrores();
              }
            });
        } else {
          //cod para agregar
          axios
            .post(my.POST_add, {
              TR_VAR_NOM: my.nombre,
            })
            .then(function (response) {
              console.log(response);
              my.close();
              my.listar();
              my.limpiar();
            })
            .catch(function (err) {
                this.error = true;
              console.log(err);
              if (err.response.status == 400) {
                console.log(err.response.data);
                if (err.response.data.TR_VAR_NOM != null) {
                  this.errores.push(err.response.data.TR_VAR_NOM[0]);
                }
                
                this.mostrarErrores();
              }
            });
        }
      } // fin validación
    }, //fin método
  },
  props: {
    source: String
  }
};
</script>