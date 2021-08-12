<template>
  <v-dialog v-model="dialog" max-width="900px">
    <template v-slot:activator="{ on }">
      <v-btn color="primary" dark class="mb-2" v-on="on" @click="addItem"
        >Agregar {{ singular }}</v-btn
      >
    </template>

    <v-form ref="form" v-model="valid" lazy-validation>
      <!-- FORMULARIO -->

      <v-card>
        <v-card-title class="pa-4 orange"> </v-card-title>
        <v-card-title>
          <span class="headline">{{ formTitle }}</span>
        </v-card-title>

        <v-card-text>
          <v-container>
              <v-row>
              <v-col cols="6" sm="6" md="6">
                <v-select
                  outlined
                
                  v-model="producto.tags_tipo"
                  :items="op_tipo"
                  :item-text="(item) => item"
                  item-value="item"
                  label="Tipo"
                  persistent-hint
                  no-data-text="No se tiene registros"
                  :rules="selectRules"
                ></v-select>
              </v-col>
               <v-col cols="6" sm="6" md="6">
               <v-text-field
                  outlined
                  v-model="producto.tags_var"
                  type="text"
                  label="Variedad"
                ></v-text-field>
              </v-col>

              </v-row>
              <v-row>
            <v-col cols="6" sm="6" md="6">
              <v-text-field
                outlined
                v-model="producto.nombre"
                :rules="textoRules"
                label="Nombre"
                ref="nom_"
                :counter="120"
                v-on:keypress="isText($event, 120, 'des_')"
              ></v-text-field>
            </v-col>
             <v-col cols="6" sm="6" md="6">
              <v-text-field
                outlined
                v-model="producto.descripcion"
                :rules="textoRules"
                label="Descripción"
                ref="des_"
                :counter="120"
                v-on:keypress="isText($event, 120, 'des_')"
              ></v-text-field>
            </v-col>
            </v-row>
             <v-row>
              
              <v-col cols="6" sm="6" md="6">
                <v-select
                  outlined
                  v-model="producto.calidad"
                  :items="op_calidad"
                  :item-text="(item) => item"
                  item-value="item"
                  label="Calidad"
                  persistent-hint
                  no-data-text="No se tiene registros"
                  :rules="selectRules"
                ></v-select>
              </v-col>
              <v-col cols="6" sm="6" md="6">
                <v-text-field
                  outlined                  
                  v-model="producto.unidad"
                  type="text"
                  label="Unidad de medida"
                ></v-text-field>
              </v-col>

            </v-row>
            <v-row>
              <v-col cols="6" sm="6" md="6">
                <v-text-field
                  outlined
                  prepend-inner-icon="mdi-cash-multiple"
                  v-model="producto.precio"
                  type="text"
                  label="Precio (S/)"
                ></v-text-field>
                 <v-text-field
                  outlined                
                  v-model="producto.descuento"
                  label="Descuento (%)"
                ></v-text-field>
                   
              </v-col>
              <v-col cols="6" sm="6" md="6">
                  
                               <v-checkbox
                  v-model="producto.temporada"
                  :label="`Temporada: ${producto.temporada.toString()}`"
                ></v-checkbox>
                 <v-radio-group v-model="producto.tags_cs" row>
                  <v-radio label="Sin pepa" value="Sin pepa"></v-radio>
                  <v-radio label="Con pepa" value="Con pepa"></v-radio>
                </v-radio-group>
              </v-col>
            </v-row>          

            <v-row>
              <v-col cols="6" sm="6" md="6">
                <v-text-field
                  outlined                
                  v-model="producto.foto"
                  label="Link Foto"
                ></v-text-field>


              </v-col>
            </v-row>
            <v-row>
              <v-col cols="12" sm="12" md="12"> </v-col>
            </v-row>
          </v-container>
        </v-card-text>

        <v-card-actions>
          <v-spacer></v-spacer>
          <v-btn color="blue darken-1" text @click="close">Cancelar</v-btn>
          <v-btn :disabled="!valid" color="blue darken-1" text @click="save">{{
            action_form
          }}</v-btn>
        </v-card-actions>
      </v-card>
    </v-form>
  </v-dialog>
</template>

<script>
import axios from "axios";
import { mapActions, mapMutations, mapState } from "vuex";

export default {
  name: "addProducto",

  data: () => ({
    singular: "producto",
    action: "nothing",
    campoEstado: false,

    op_tipo: ["Frutas", "Vegetales", "Quesos", "Tuberculos", "Artesanias"],
    op_cs: ["Sin Pepa", "Con pepa"],
    op_calidad: ["1ra", "2da", "3ra", "4ta", "5ta", "6ta"],
    op_temporada: ["No es temporada", "Temporada"],

    dialog: false,

    POST_anticipo: "cli/anticipo/",

    /// datos para guardar
    producto: {
      nombre: "calabaza",
      precio: "s/. 10 ",
      descripcion: "Calabaza fresca",
      tags_tipo: "Verdura",
      tags_var: "amarilla",
      tags_cs: "",
      calidad: "2da",
      temporada: "Si",
      fecha: "12-15-2021",
      foto: "https://www.comercializadoradelcampo.com/tiendaonline/imagenes/producto_7.png",
      descuento: "s/. 0",
      calificacion: 4.5,
      npersonas: 5,
      usuario_id: 2,
      unidad: "caja",
    },

    EST_FECHA: new Date(),
    editedIndex: -1,

    // data validación
    valid: true,
    error: false,
    msg_error: "",
    errores: [],
    selectRules: [(v) => !!v || "Este dato es requerido"],
    textoRules: [(v) => !!v || "Este dato es requerido"],
    cantidadRules: [
      (v) =>
        !v ||
        /^[+]?\d+([,.]\d+)?$/.test(v) ||
        /^([0-9])*$/.test(v) ||
        "Ingrese una cantidad válida",
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
    
  },

  methods: {
    // mutaciones de store
    ...mapState("auth", ["current_id"]),
    ...mapMutations('auth', ['listarProductos']),
    ...mapActions(["refrescarEstadoCuentaxCliente"]),
    //validaciones
    isText(e, max, ref_) {
      if (this.$refs[ref_].value != null) {
        let n = this.$refs[ref_].value.length;
        let value = this.$refs[ref_].value;
        let char = String.fromCharCode(e.keyCode);
        if (n >= max) e.preventDefault();
        if (/^[\s]+$/.test(char) && (n == 0 || /^[\s]+$/.test(value[n - 1])))
          e.preventDefault();
      }
    },
    isPositive(e) {
      let char = String.fromCharCode(e.keyCode);
      if (/^[-]+$/.test(char)) e.preventDefault();
    },

    from_indicadores() {
      if (this.$route.params.ad === "ad") this.addItem();
    },
    //PROCEDIMIENTOS para el CRUD

    addItem() {
      let my = this;
      my.action = "Agregar";
      (my.campoEstado = false), my.limpiar();
   //  if(my.current_id!=null || my.current_id!=undefined || my.current_id!="")
     //   my.producto.usuario_id = my.current_id;
      my.dialog = true;
    },

    editItem(item) {
      let my = this;
      my.action = "Editar";
      (my.campoEstado = true), (my.editedIndex = my.lista.indexOf(item));
      my.producto = Object.assign({}, item);

      my.dialog = true;
    },

    close() {        
      this.dialog = false;
    },

    limpiar() {
      let my = this;
      my.EST_FECHA = new Date();
    },
    listar(){
      let my = this;                  
        axios.get("https://capacitacion-docente.herokuapp.com/products/").then(function(response){
       console.log("datadata "+response.data.data);
       my.productfilter = response.data.data;
       console.log("entro okii");
          
          })
        .catch(err => {
          console.log(err.response.data)
        });
    },

    save() {
      this.$refs.form.validate();
      if (this.$refs.form.validate(true)) {
        this.errores = [];
        let my = this;
        if (my.action === "Editar") {
          axios
            .put("PARA - EDITAR" + my.producto.EST_COD + "/", this.producto)
            .then((response) => {
              console.log(response);
              my.close();
              my.listarProductos();
              my.limpiar();
            })
            .catch((err) => {
              console.log(err.response.data);
            });
        } else {
          //cod para agregar

          axios
            .post(
              "https://capacitacion-docente.herokuapp.com/products/add/",
              this.producto
            )
            .then(function (response) {
              console.log(response);
              my.close();
               my.listar(); 
              my.limpiar();
            })
            .catch((err) => {
              console.log(err);
            });
        }
      } // validación
    }, //fin
  },
};
</script>

<style>
</style>