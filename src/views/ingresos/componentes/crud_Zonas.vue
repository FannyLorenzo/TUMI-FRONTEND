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
                          prepend-inner-icon=" ti-location-pin"
                            v-model="nombre"
                            label="Nueva zona"
                            :rules="textoRulesRequired"                            
                            class="mt-4"
                            required
                            outlined
                            ref="nom_"
                            :counter="60"
                            v-on:keypress="isLetter($event,60,'nom_')" 
                          ></v-text-field>
                          <!-- MENSAJE DE ALERTA DE VALIDACIÓN-->
                          <v-alert dense outlined type="error" v-if="error">
                            {{ msg_error }} <strong> </strong>
                          </v-alert>
                          <!-- FIN MENSAJE DE ALERTA -->
                        </v-col>
                      </v-row>

                   <!-- 
                        <template hidden v-if="campoEstado">
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
                </v-card>
              </v-form>
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
  name: "crud_Zonas",

  data: () => ({
    singular: "zona",
    tableTitle: "Lista de " + "zonas",
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
        value: "TR_ZON_COD",
      },
      { text: "Zona", value: "TR_ZON_NOM" },
    //  { text: "Estado", value: "TR_ZON_ESTADO" },
      // opciones por cada item
      { text: "Opciones", value: "actions", sortable: false },
    ],
    search: "", // BUSQUEDA
    lista: [],
    POST_add: "zon/add/",
    DELETE_delete: "zon/delete/",
    PUT_edit: "zon/edit/",
    GET_list: "zon/list/",
    PUT_retrieve: "zon/retrieve/",

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
    
    // metodos de validación
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
    mostrarErrores() {
      // se entiende que ya hay errores almacenados
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
          console.log(err.response.data);
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
      (my.campoEstado = true), (this.editedItem = Object.assign({}, item));
      my.estado = my.editedItem.TR_ZON_EST;
      my.nombre = my.editedItem.TR_ZON_NOM;
      this.dialog = true;
    },

    deleteItem(item) {
      let my = this;
      my.editedItem = Object.assign({}, item);
      confirm("¿Está seguro de querer eliminar este registro?") &&
        axios
          .delete(my.DELETE_delete + my.editedItem.TR_ZON_COD + "/", {})
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
      (this.codigo = 0), (this.estado = "ACTIVO"), (this.nombre = "");
      this.valid = true;
      this.error = false;
      this.msg_error = "";
      this.errores = [];
    },

    save() {
      this.$refs.form.validate();
      if (this.$refs.form.validate(true)) {
        this.errores = [];
        let my = this;
        if (my.action === "Editar") {
          axios
            .put(my.PUT_edit + my.editedItem.TR_ZON_COD + "/", {
              TR_ZON_COD: my.editedItem.TR_ZON_COD,
              TR_ZON_NOM: my.nombre,
              TR_ZON_ESTADO: my.estado,
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
                if (err.response.data.TR_ZON_NOM != null) {
                  this.errores.push(err.response.data.TR_ZON_NOM[0]);
                }
                this.mostrarErrores();
              }
            })
        } else {
          //cod para agregar
          axios
            .post(my.POST_add, {
              TR_ZON_NOM: my.nombre,
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
                if (err.response.data.TR_ZON_NOM != null) {
                  this.errores.push(err.response.data.TR_ZON_NOM[0]);
                }
                this.mostrarErrores();
              }
            })
        }
      } // fin validación
    }, //fin método
  },

    props: {
    source: String
  }
};
</script>