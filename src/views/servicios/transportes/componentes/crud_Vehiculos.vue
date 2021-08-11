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
               <v-form ref="form" v-model="valid" lazy-validation> <!-- FORMULARIO -->
              <v-card>
                <v-card-title class="pa-4 orange"> </v-card-title>
                <v-card-title>
                  <span class="headline">{{ formTitle }}</span>
                </v-card-title>

                <v-card-text>
                  <v-container>
                    <v-row>

                   <v-col cols="12" sm="6" md="6">
                      <v-switch
                            v-model="TR_VEH_ES_DEL_MOLINO"
                            inset
                            color="orange"
                            :label="`${txtPropietario}`"
                          ></v-switch>
                  </v-col> 
                  <v-col cols="12" sm="6" md="6">
                        <v-text-field
                          outlined
                          v-model="TR_VEH_PLA"
                          label="Placa"
                          :rules="textoRulesRequired"
                          type="text"
                          ref="pla_"
                          v-on:keypress="isMaxSinEspacios($event,7,'pla_')" :counter="7"
                        ></v-text-field>
                      </v-col>

                      <v-col cols="12" sm="12" md="12" >                      
                        <template v-if="!TR_VEH_ES_DEL_MOLINO">
                          <v-text-field
                            outlined
                            prepend-inner-icon="mdi-account"
                            v-model="TR_VEH_PROPIETARIO"
                            label="Nombre propietario"
                             ref="nom_"
                             type="text"
                          v-on:keypress="isName($event,60,'nom_')" :counter="60"
                          ></v-text-field>
                        </template>
                      </v-col>
                    </v-row>
                    <v-row>
                      
                      <v-col cols="12" sm="6" md="6">
                        <v-text-field
                          outlined
                          v-model="TR_VEH_MARCA"
                          label="Marca"
                          ref="mar_"
                          type="text"
                          v-on:keypress="isText($event,25,'mar_')" :counter="25"
                        ></v-text-field>
                      </v-col>
                      <v-col cols="12" sm="6" md="6">
                        <v-text-field
                          outlined
                          v-model="TR_VEH_MODELO"
                          label="Modelo"
                          type="text"
                          ref="mod_"
                          v-on:keypress="isText($event,25,'mod_')" :counter="25"
                        ></v-text-field>
                      </v-col>
                    </v-row>
                    <template v-if="campoEstado">
                      <v-col class="d-flex" cols="12" sm="6" md="6">
                        <v-select
                          v-model="TR_VEH_ESTADO"
                          :items="op_estados"
                          label="Estado"
                          outlined
                        ></v-select>
                      </v-col>
                    </template>
                  </v-container>
                </v-card-text>

                <v-card-actions>
                  <v-spacer></v-spacer>
                  <v-btn color="blue darken-1" text @click="close"
                    >Cancelar</v-btn
                  >
                  <v-btn color="blue darken-1" text @click="save">{{
                    action_form
                  }}</v-btn>
                </v-card-actions>
              </v-card>
               </v-form>

            </v-dialog>
          </v-toolbar>
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
  name: "crud_Vehiculos",

  data: () => ({
    //ad:false,
    singular: "vehículo",
    plural: "Vehículos",
    tableTitle: "Lista de " + "vehículos",
    action: "nothing",
    campoEstado: false,
    op_estados: ["ACTIVO", "INACTIVO"],

    dialog: false,
    headers: [
      {
        align: "start",
        sortable: false,
        // atributos de cada item
        // text: "" , value: "TR_VEH_COD"},
        text: "Placa",
        value: "TR_VEH_PLA",
      },
      { text: "Propietario", value: "TR_VEH_PROPIETARIO" },
      { text: "Marca", value: "TR_VEH_MARCA" },
      { text: "Modelo", value: "TR_VEH_MODELO" },
      //{ text: "" , value: "TR_VEH_ES_DEL_MOLINO"},
      //{ text: "" , value: "TR_VEH_ESTADO"},
      //{ text: "" , value: "TR_VEH_FECHA"},
      // opciones por cada item
      { text: "Opciones", value: "actions", sortable: false },
    ],
    search: "", // BUSQUEDA
    lista: [],
    lista_: [],
    POST_add: "veh/add/",
    DELETE_delete: "veh/delete/",
    PUT_edit: "veh/edit/",
    GET_list: "veh/list/",
    PUT_retrieve: "veh/retrieve/",

    /// datos para guardar
    TR_VEH_COD: null,
    TR_VEH_PLA: null,
    TR_VEH_PROPIETARIO: "",
    TR_VEH_MARCA: null,
    TR_VEH_MODELO: null,
    TR_VEH_ES_DEL_MOLINO: false,
    TR_VEH_ESTADO: null,
    TR_VEH_FECHA: null,

    editedIndex: -1,

    editedItem: {
      TR_VEH_COD: null,
      TR_VEH_PLA: null,
      TR_VEH_PROPIETARIO: "",
      TR_VEH_MARCA: null,
      TR_VEH_MODELO: null,
      TR_VEH_ES_DEL_MOLINO: false,
      TR_VEH_ESTADO: null,
      TR_VEH_FECHA: null,
    },

    // data validación
    valid: true,
    error: false,
    msg_error: "",
    errores: [],
    //validaciones
    textoRulesRequired: [
      (v) => !!v || "Este campo es requerido",      
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
    txtPropietario(){
      return this.TR_VEH_ES_DEL_MOLINO ? "Propietario Molino" : "Propietario externo"
    }
  },

  watch: {
    dialog(val) {
      val || this.close();
    },
  },

  created() {
    this.listar();
    this.from_indicadores();
  },

  methods: {
//validaciones
    isName(e, max,ref_ )
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
  isMaxSinEspacios(e,max,ref_)
  {
    if(this.$refs[ref_].value!= null){
    let n = this.$refs[ref_].value.length;
    if(n>=max) e.preventDefault();
    } 
     let char = String.fromCharCode(e.keyCode);
    if(/^[\s]+$/.test(char)) e.preventDefault();
  },

  
    from_indicadores(){
      if(this.$route.params.ad==="ad")
        this.dialog = true; 
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
      (my.TR_VEH_ESTADO = "ACTIVO"), my.limpiar();
      my.dialog = true;
    },

    editItem(item) {
      let my = this;
      my.action = "Editar";
      // my.campoEstado = true,
      my.editedItem = Object.assign({}, item);

      my.TR_VEH_COD = my.editedItem.TR_VEH_COD;
      my.TR_VEH_PLA = my.editedItem.TR_VEH_PLA;
      my.TR_VEH_PROPIETARIO = my.editedItem.TR_VEH_PROPIETARIO;
      my.TR_VEH_MARCA = my.editedItem.TR_VEH_MARCA;
      my.TR_VEH_MODELO = my.editedItem.TR_VEH_MODELO;
      my.TR_VEH_ES_DEL_MOLINO = my.editedItem.TR_VEH_ES_DEL_MOLINO;
      my.TR_VEH_ESTADO = my.editedItem.TR_VEH_ESTADO;
      my.TR_VEH_FECHA = my.editedItem.TR_VEH_FECHA;

      my.dialog = true;
    },

    deleteItem(item) {
      let my = this;
      my.editedItem = Object.assign({}, item);
      confirm("¿Está seguro de querer eliminar este registro?") &&
        axios
          .delete(my.DELETE_delete + my.editedItem.TR_VEH_COD + "/", {})
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
      let my = this;
      my.TR_VEH_COD = null;
      my.TR_VEH_PLA = "";
      my.TR_VEH_PROPIETARIO = "";
      my.TR_VEH_MARCA = "";
      my.TR_VEH_MODELO = "";
      my.TR_VEH_ES_DEL_MOLINO = false;
      my.TR_VEH_ESTADO = "ACTIVO";
      my.TR_VEH_FECHA = null;
    },

    save() { 
      this.$refs.form.validate();
      if (this.$refs.form.validate(true)) {
        this.errores = [];
      let my = this;  
        if(my.action==="Editar"){
        axios
          .put(my.PUT_edit + my.editedItem.TR_VEH_COD + "/", {
            TR_VEH_COD: my.TR_VEH_COD,
            TR_VEH_PLA: my.TR_VEH_PLA,
            TR_VEH_PROPIETARIO: my.TR_VEH_PROPIETARIO,
            TR_VEH_MARCA: my.TR_VEH_MARCA,
            TR_VEH_MODELO: my.TR_VEH_MODELO,
            TR_VEH_ES_DEL_MOLINO: my.TR_VEH_ES_DEL_MOLINO,
            TR_VEH_ESTADO: my.TR_VEH_ESTADO,
            //"TR_VEH_FECHA" : my.TR_VEH_FECHA,
          })
          .then((response) => {
            console.log(response);
            my.close();
            my.listar();
            my.limpiar();
          })
          .catch(function (err) {
            console.log(err.response.data);
          });
      } else {
        //cod para agregar
        console.log(my.TR_VEH_PROPIETARIO);
        axios
          .post(my.POST_add, {
            TR_VEH_COD: my.TR_VEH_COD,
            TR_VEH_PLA: my.TR_VEH_PLA,
            TR_VEH_PROPIETARIO: my.TR_VEH_PROPIETARIO,
            TR_VEH_ES_DEL_MOLINO: my.TR_VEH_ES_DEL_MOLINO,
            TR_VEH_MARCA: my.TR_VEH_MARCA,
            TR_VEH_MODELO: my.TR_VEH_MODELO,
            TR_VEH_ESTADO: my.TR_VEH_ESTADO,
            TR_VEH_FECHA: my.TR_VEH_FECHA,
          })
          .then(function (response) {
            console.log(response);
            my.close();
            my.listar();
            my.limpiar();
          })
          .catch(function (err) {
            console.log(err);
          });
      }
      } // fin validación  
    }, //fin
  },
};
</script>