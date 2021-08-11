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
        sort-by="TR_ZON_COD"
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
                            prepend-inner-icon=" ti-home"
                            v-model="MOL_NOM_CORTO"
                            label="Nombre corto"
                            :rules="nombreRules"
                            required
                            outlined
                            ref="nom_"                         
                        :counter="25"
                        v-on:keypress="isText($event,25,'nom_')" 
                          ></v-text-field>

                          <v-text-field
                            outlined
                            v-model="MOL_DESC"
                            label="Descripción"
                            :rules="descripcionRules"
                            ref="DES_"                         
                            :counter="120"
                            v-on:keypress="isText($event,120,'DES_')" 
                          ></v-text-field>

                          <v-select
                            v-model="MOL_CONDICION"
                            :items="op_condicion"
                            outlined
                            aria-required="Este campo es requerido"
                          ></v-select>
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
          <template v-slot:[`item.MOL_CONDICION`]="{ item }">
          <v-chip :color="getColor(item.MOL_CONDICION)" dark>
            {{ item.MOL_CONDICION }}
          </v-chip>
        </template>
        <template v-slot:item.actions="{ item }">
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
  name: "crud_Molinos",

  data: () => ({
    singular: "molino",
    tableTitle: "Lista de " + "molinos",
    action: "nothing",
    campoEstado: false,
    op_estados: ["ACTIVO", "ELIMINADO"],
    op_condicion: ["OPERATIVO", "EN MANTENIMIENTO"],

    dialog: false,
    headers: [
      {
        align: "start",
        sortable: false,
        // atributos de cada item
        // text: "" , value: "MOL_COD"},
        text: "Molino", value: "MOL_NOM_CORTO" },
      { text: "Descripción", value: "MOL_DESC" },
      { text: "Condición", value: "MOL_CONDICION" },
      //{ text: "Estado" , value: "MOL_ESTADO"},
      // opciones por cada item
      { text: "Opciones", value: "actions", sortable: false },
    ],
    search: "", // BUSQUEDA
    lista: [],
    POST_add: "mol/add/",
    DELETE_delete: "mol/delete/",
    PUT_edit: "mol/edit/",
    GET_list: "mol/list/",

    /// datos para guardar
    MOL_COD: null,
    MOL_NOM_CORTO: null,
    MOL_DESC: null,
    MOL_CONDICION: "OPERATIVO",
    MOL_ESTADO: "ACTIVO",

    editedIndex: -1,

    editedItem: {
      MOL_COD: null,
      MOL_NOM_CORTO: null,
      MOL_DESC: null,
      MOL_CONDICION: "OPERATIVO",
      MOL_ESTADO: "ACTIVO",
    },
    // data validación
    valid: true,
    error: false,
    msg_error: "",
    errores: [],
    nombreRules: [
      (v) => !!v || "Este dato es requerido",
      (v) =>
        (v && v.length <= 60) || "El texto debe tener menos de 25 caracteres",
    ],
    descripcionRules: [
      (v) =>
        !v ||
        (v && v.length <= 60) ||
        "El texto debe tener menos de 120 caracteres",
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
    getColor(VALOR) {
      if (VALOR === "MALOGRADO") return "red";
      else if (VALOR === "EN MANTENIMIENTO") return "orange";
      else if (VALOR === "OPERATIVO") return "green";
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

      my.MOL_COD = my.editedItem.MOL_COD;
      my.MOL_NOM_CORTO = my.editedItem.MOL_NOM_CORTO;
      my.MOL_DESC = my.editedItem.MOL_DESC;
      my.MOL_CONDICION = my.editedItem.MOL_CONDICION;
      my.MOL_ESTADO = my.editedItem.MOL_ESTADO;

      this.dialog = true;
    },

    deleteItem(item) {
      let my = this;
      my.editedItem = Object.assign({}, item);
      confirm("¿Está seguro de querer eliminar este registro?") &&
        axios
          .delete(my.DELETE_delete + my.editedItem.MOL_COD + "/", {})
          .then((response) => {
            console.log(response);
            my.listar();
          })
          .catch(function (err) {
            console.log(err.response.data);
          });
    },

    close() {
      this.dialog = false;
    },
    limpiar() {
      let my = this;
      my.MOL_COD = null;
      my.MOL_NOM_CORTO = "";
      my.MOL_DESC = "";
      my.MOL_CONDICION = "OPERATIVO";
      my.MOL_ESTADO = "ACTIVO";

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
            .put(my.PUT_edit + my.editedItem.MOL_COD + "/", {
              MOL_COD: my.editedItem.MOL_COD,

              MOL_NOM_CORTO: my.MOL_NOM_CORTO,
              MOL_DESC: my.MOL_DESC,
              MOL_CONDICION: my.MOL_CONDICION,
              MOL_ESTADO: my.MOL_ESTADO,
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
                this.error = true;
                console.log(err.response.data);
                if (this.MOL_NOM_CORTO == "") {
                  this.errores.push("No ingresó el nombre corto");
                }
                this.mostrarErrores();
              }
            });
        } else {
          //cod para agregar
          axios
            .post(my.POST_add, {
              MOL_NOM_CORTO: my.MOL_NOM_CORTO,
              MOL_DESC: my.MOL_DESC,
              MOL_CONDICION: my.MOL_CONDICION,
            })
            .then(function (response) {
              console.log(response);
              my.close();
              my.listar();
              my.limpiar();
            })
            .catch(function (err) {
              console.log(err.response.data);
              if (err.response.status == 400) {
                this.error = true;
                console.log(err.response.data);
                if (this.MOL_NOM_CORTO == "") {
                  this.errores.push("No ingresó el nombre corto");
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