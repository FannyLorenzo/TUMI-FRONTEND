<template>
 <div>

    <div class="mt-4">
      <v-data-table 
      :headers="headers" 
      :items="lista"
      class="elevation-1"      
      :search="search = agricultorSeleccionado.nombreCompleto"       
      :footer-props="{
        showFirstLastPage: true,
        firstIcon: 'mdi-arrow-collapse-left',
        lastIcon: 'mdi-arrow-collapse-right',
        prevIcon: 'mdi-minus',
        nextIcon: 'mdi-plus',
        pageText: '{0}-{1} de {2}',
        'items-per-page-text':'Registros por página'
      }"
      
      >
        <template v-slot:top>
          <v-toolbar flat color="black">
            <v-toolbar-title>Arroz cáscara</v-toolbar-title>
            <v-divider class="mx-4" inset vertical></v-divider>
            <v-spacer></v-spacer>
            
            <v-text-field hidden class="text-xs-center" v-model="search"  label="" single-line hide-details></v-text-field>
            <v-spacer></v-spacer>
            
            <!-- DIALOG DE REGISTRO DE LOTE-->
            <v-dialog v-model="dialogLote" max-width="500px">              
              <template v-slot:activator="{ on }">
                <v-btn color="info" dark class="mb-2" v-on="on" @click="addLote">Agregar Lote</v-btn>
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
                            v-model="agr_selected"
                            :items="op_agricultores"
                            :item-text="item => ' '+item.AGR_NOM +' '+ item.AGR_APE"
                            item-value="AGR_COD"                            
                            label="AGRICULTOR"
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
                                placeholder="Si no lo ingresa, será autogenerado"   
                                outlined
                              ></v-text-field>  
                            </v-col> 
                         -->
                        </v-row>
                        </v-container>
                      </v-card-text>
                    </v-container>
                  </v-card-text>

                  <v-card-actions>
                    <v-spacer></v-spacer>
                    <v-btn color="blue darken-1" text @click="closeLote"
                      >Cancelar</v-btn
                    >
                    <v-btn :disabled="!valid"
                     color="blue darken-1" text @click="addLoteOk">Agregar</v-btn>
                  </v-card-actions>
                </v-card>
             
              </v-form>
            </v-dialog>

            <!-- FIN DIALOG DE REGISTRO DE LOTE  -->

            <!-- DIALOG DE REGISTRO DE ARROZ CASCARA-->
            <v-dialog v-model="dialog" max-width="900px">
              <template v-slot:activator="{ on }">
                <v-btn color="primary" dark class="mb-2" v-on="on" @click="addItem">Agregar {{singular}}</v-btn>
              </template>
          <v-form ref="form" v-model="valid" lazy-validation> <!-- FORMULARIO -->
              
              <v-card>
                <v-card-title  class="pa-4 orange">
                </v-card-title>

                <v-card-text>
                  <v-container>
                    <v-card-text>
                  <v-container>
                    <v-row>
                      <h3 class="headline white--text"> {{ formTitle }}</h3>
                    </v-row>
                    
                    <v-row>
                       <v-col class="d-flex" cols="12" sm="4" md="4" center>
                           <v-select
                            outlined
                            prepend-inner-icon="mdi-account"
                            v-model="AGR_COD"
                            :items="op_agricultores"
                            :item-text="item => ' '+item.AGR_NOM +' '+ item.AGR_APE"
                            item-value="AGR_COD"                            
                            label="AGRICULTOR"
                            @change="listarLotesAgr()" 
                            persistent-hint
                            no-data-text="No se tiene registros"
                            :rules="selectRules" 
                          ></v-select> 
                      </v-col>
                        <v-col class="d-flex" cols="12" sm="4" md="4" center>
                           <v-select 
                            outlined
                            prepend-inner-icon="ti-server"
                            v-model="LT_COD"
                            :items="op_lotesxAgr"
                            :item-text="item => ' '+item.LT_LOTE_NOM "
                            item-value="LT_COD"                            
                            label="LOTE:"
                            persistent-hint
                            no-data-text="No se tiene registros"
                            :rules="selectRules" 
                          ></v-select> 
                      </v-col>
                      <v-col class="d-flex" cols="12" sm="4" md="4" center>
                           <v-select 
                            outlined
                            prepend-inner-icon="ti-layout-grid2-alt"
                            v-model="TR_VAR_COD"
                            :items="op_variedad"
                            :item-text="item => ' '+item.TR_VAR_NOM "
                            item-value="TR_VAR_COD"                            
                            label="VARIEDAD:"
                            persistent-hint
                            no-data-text="No se tiene registros"
                            :rules="selectRules" 
                          ></v-select> 
                      </v-col>
                      <v-col class="d-flex" cols="12" sm="4" md="4" center>
                           <v-select 
                            outlined
                            prepend-inner-icon="ti-truck"
                            v-model="TR_VEH_COD"
                            :items="op_placas"
                            :item-text="item => ' '+item.TR_VEH_PLA+' - '+ item.TR_VEH_PROPIETARIO "
                            item-value="TR_VEH_COD"                            
                            label="VEHICULO / PROPIETARIO:"
                            persistent-hint
                            no-data-text="No se tiene registros"
                            :rules="selectRules" 
                          ></v-select> 
                      </v-col>
                  
                      <v-col cols="12" sm="4" md="4">
                        <v-text-field outlined prepend-inner-icon="mdi-account"
                           v-model="REC_CONDUCTOR" label="Conductor" type="text" 
                            ref="nom_"
                            :counter="60"
                            v-on:keypress="isName($event,65,'nom_')" 
                           ></v-text-field>
                      </v-col>  
                       <v-col cols="12" sm="4" md="4">
                        <v-text-field outlined type="number" :rules="cantidadRules" prepend-inner-icon="mdi-cash-multiple"
                         v-model="REC_FLE" label="Flete (S/)"  ></v-text-field>
                      </v-col> 
                      
                      
                      <v-col cols="12" sm="4" md="4">
                        <v-text-field outlined type="number" :rules="cantidadRules"
                         v-model="REC_PE_B" label="Peso bruto (Kg)" v-on:keypress="isPositive($event)" ></v-text-field>
                      </v-col>
                      <v-col cols="12" sm="4" md="4">
                        <v-text-field outlined type="number" ref="tar_" :rules="[v => !v || v>=0  ||'La tara no puede ser negativa']"
                         v-model="REC_TAR" label="Tara (Kg)" v-on:keypress="isPositive($event)" ></v-text-field>
                      </v-col>
                      <v-col cols="12" sm="4" md="4">
                        <v-text-field
                            outlined
                            v-model="calculo_pesoneto"                            
                            label="Peso neto (Kg):"
                            background-color="black"
                            :rules="[v => !v || v>=0  ||'Este campo no puede ser negativo, revise la Tara']"
                            disabled
                            ></v-text-field>
                           
                         </v-col> 
                      <v-col cols="12" sm="4" md="4">
                        <v-text-field outlined type="number" :rules="cantidadRules" 
                        v-model="REC_HUM" label="Humedad (%)" v-on:keypress="isPositive($event)" ></v-text-field>
                      </v-col>
                      <v-col cols="12" sm="4" md="4">
                        <v-text-field outlined type="number" :rules="cantidadRules"
                         v-model="REC_IMP" label="Impureza (%)" v-on:keypress="isPositive($event)" ></v-text-field>
                      </v-col>
                 
                      <template>
                       <v-col cols="12" sm="4" md="4">
                         <v-switch v-if="REC_TAR > 0" 
                            v-model="REC_TARADO"
                            inset
                            color="green"
                            :label="`${txt_tarado}`"
                          >{{REC_TARADO =true}}</v-switch>
                           <v-switch v-else 
                            v-model="REC_TARADO"
                            inset
                            color="green"
                            :label="`${txt_tarado}`"
                          >{{REC_TARADO =false}}</v-switch>
                       </v-col>
                      </template>
                         <v-col cols="12" sm="8" md="8">
                        <v-text-field outlined 
                         v-model="REC_OBS" 
                         label="Comentario" 
                         type="text"
                         ref="com_"                         
                        :counter="60"
                        v-on:keypress="isText($event,60,'com_')"  
                        ></v-text-field>
                      </v-col>                  
                               
                    </v-row>
                     <!-- MENSAJE DE ALERTA DE VALIDACIÓN-->
                      <v-alert dense outlined type="error" v-if="error">
                        {{ msg_error }} <strong>!</strong>
                      </v-alert>
                      <!-- FIN MENSAJE DE ALERTA -->
         
                  </v-container>
                </v-card-text>


                  </v-container>
                </v-card-text>

                <v-card-actions>
                  <v-spacer></v-spacer>
                  <v-btn color="blue darken-1" text @click="close">Cancelar</v-btn>
                  <v-btn :disabled="!valid" color="blue darken-1" text @click="save">{{action_form}}</v-btn>
                </v-card-actions>
              </v-card>
          </v-form> <!-- FIN DE VALIDACION-->
            </v-dialog>

            <!-- FIN DIALOG DE REGISTRO DE ARROZ CASCARA -->

          </v-toolbar>
        </template>

    <!-- V SLOTS YEAH-->
    <template v-slot:[`item.REC_TAR`]="props">
        <v-edit-dialog
          :return-value.sync="props.item.REC_TAR"
          large
          persistent
          @save="tar_save(props.item)"
          @cancel="tar_cancel"
          @open="tar_open"
          @close="tar_close"
        >
          <div>{{ props.item.REC_TAR }}</div>
          <template v-slot:input>
            <div class="mt-4 text-h6">
              Editar Tara (Kg)
            </div>
            <v-text-field            
              v-model="props.item.REC_TAR"
              :rules="cantidadRules"              
              label="Edit"
              single-line
              counter
              autofocus
            ></v-text-field>
          </template>
        </v-edit-dialog>
      </template>    
    <template v-slot:[`item.REC_TARADO`]="{ item }">
      <v-chip v-if="item.REC_TARADO" :color="getColor(item.REC_TARADO)" dark>
        Sí
      </v-chip>
      <v-chip v-else :color="getColor(item.REC_TARADO)" dark >
        No
      </v-chip>
    </template>
       <template v-slot:[`item.actions`]="{ item }">
          <v-icon medium class="mr-2" @click="editItem(item)" >mdi-pencil</v-icon>
          <v-icon medium @click="deleteItem(item)">mdi-delete</v-icon>
        </template>
        <template v-slot:no-data>
          <v-btn color="primary" @click="listar">Reset</v-btn>
        </template>
      </v-data-table>

      <!-- SNACK MODIFICAR DESDE TABLA TARA KG -->
      <v-snackbar
      v-model="snack"
      :timeout="3000"
      :color="snackColor"
    >
      {{ snackText }}

      <template v-slot:action="{ attrs }">
        <v-btn
          v-bind="attrs"
          text
          @click="snack = false"
        >
          Cerrar
        </v-btn>
      </template>
    </v-snackbar>
    </div>
  </div>
</template>

<script>
import axios from 'axios';
import { mapState, mapActions} from "vuex";

export default {
     
  name: "crud_Arrozcascara",

  data: () => ({
    singular: "arroz cáscara",
    tableTitle: "Lista de "+" ingresos de arroz cáscara",
    action:"nothing",
    campoEstado: false,
    op_estados: ['ACTIVO', 'INACTIVO'],
    op_years:[],
    op_agricultores: [],
    op_zonas: [], 
    op_variedad: [], 
    op_placas: [],
    op_lotes: [],
    op_lotesxAgr:[],
    
    agr_selected:'4',
    var_selected:'17',
    pla_selected:'2',
    lote_selected:'2',

//switch1: true, // TARADO
            
    dialog: false,
    dialogLote: false,
    
    headers: [
      { align: "start",
      // atributos de cada item
      
       text: "Fecha", value: "REC_FECHA" },
    //    text: "Lote cod", value: "LT_COD.LT_NOM" },
      { text: "Agricultor", value: "AGR_NOM_COMPLETO" },
    //   { text: "Registro", value: "REC_COD" },      
    // { text: "Agr. nombre", value: "LT_COD.AGR_COD.AGR_NOM" },     
    // { text: "Agr. apellido", value: "LT_COD.AGR_COD.AGR_APE" },
      { text: "Humedad (%)", value: "REC_HUM" },
      { text: "Impureza (%)", value: "REC_IMP" },
      { text: "Variedad", value: "TR_VAR_COD.TR_VAR_NOM" },
     // { text: "Zona", value: "TR_ZON_COD.TR_ZON_NOM" },
      //{ text: "Mat. prima", value: "MPR_COD" },
      { text: "Placa Veh.", value: "TR_VEH_COD.TR_VEH_PLA" },
      { text: "Conductor.", value: "REC_CONDUCTOR" },
      { text: "Peso bruto (Kg)", value: "REC_PE_B" },
      { text: "Tara (Kg)", value: "REC_TAR" },      
      { text: "Peso neto (Kg)", value: "REC_PE_NE" },
      { text: "Flete (S/)", value: "REC_FLE" },
      { text: "Tarado", value: "REC_TARADO" },
      // opciones por cada item
      { text: "Opciones", value: "actions", sortable: false }
    ],

    search:"", // BUSQUEDA
    lista: [],
    POST_add : 'cas/add/',
    DELETE_delete : 'cas/delete/',
    PUT_edit : 'cas/edit/',
    GET_list : 'cas/list/',
    PUT_retrieve : 'cas/retrieve/',
    GET_total : 'cas/total/',
  
    /// datos para guardar
    LT_COD : null,
    LT_LOTE_NOM : "",    
    LT_FECHA : new Date(),
    LT_ANIO:null,

    REC_COD : 0,
    AGR_COD : 0,  // sii
    AGR_NOM : 0,  // sii
    AGR_APE : 0,  // sii
    TR_VAR_COD : 0, // sii
    REC_HUM : 0.0,
    REC_IMP : 0.0,
    TR_ZON_COD : 0,
    TR_VEH_COD : 0, 
    PAGA_MOLINO:false, // sii
    REC_CONDUCTOR: "",
    //MPR_COD : 0,
    REC_FLE : 0,
    REC_TARADO : false,
    REC_OBS : "",
    REC_PLA_VE : "",
    REC_PE_B : 0.0,
    REC_TAR : 0.0,
    REC_PE_NE : 0.0,
    REC_ESTADO : "ACTIVO",
    REC_FECHA : new Date(),
    //REC_FE_CREA : new Date(),

    editedIndex: -1,

    editedItem: {
    LT_COD : null,
    REC_COD : 0,
    AGR_COD : 0,  // sii
    TR_VAR_COD : 0, // sii
    REC_HUM : 0.0,
    REC_IMP : 0.0,
    TR_ZON_COD : 0,
    TR_VEH_COD : 0,  // sii
    PAGA_MOLINO:false,
    REC_CONDUCTOR: "",
    //MPR_COD : 0,
    REC_FLE : null,
    REC_TARADO : false,
    REC_OBS : "",
    REC_PLA_VE : "",
    REC_PE_B : 0,
    REC_TAR : 0.0,
    REC_PE_NE : 0.0,
    REC_ESTADO : "ACTIVO",
    REC_FECHA : new Date(),
    },
    
    // mofificar tarado desde tabla
    snack: false,
    snackColor: '',
    snackText: '',
        
    // data validación
    valid: true,
    error: false,
    msg_error: "",
    errores: [],
    selectRules: [
       (v) => !!v || "Este dato es requerido",
    ],
    textoRules: [
      (v) => !!v || "Este dato es requerido",
      (v) =>
        (v && v.length <= 60) || "El texto debe tener menos de 60 caracteres",
    ],
     cantidadRules: [
      (v) => !v || /^[+]?\d+([,.]\d+)?$/.test(v) ||/^([0-9])*$/.test(v) || "Ingrese una cantidad válida",
    ],
    cantidadRulesTara: [
      (v) => !v ||  v>=0  || "La tara no puede ser negativa, revise.",
    ],
  }),
  computed: {
    formTitle() {
      return this.action === "Agregar" ? ("Agregar "+this.singular) : ("Editar "+this.singular);
    },
    action_form() {
      return this.action === "Agregar" ? ("Agregar") : ("Editar");
    
    },
    calculo_pesoneto() {
      //this.REC_PE_NE = this.REC_PE_B - this.REC_TAR;
      return this.REC_PE_B > 0 ? (this.REC_PE_B- this.REC_TAR) : 0;
    
    },
    txt_tarado(){
      return this.REC_TARADO ? "TARADO" : "NO TARADO";
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
    // fin variables de store|  
    
  },

  watch: {
    dialog(val) {
      val || this.close();
    }
  },

  created() {
      
     this.from_indicadores(),
    this.listar(),    
    this.listarVariedades(),
    this.listarZonas(),
    this.listarAgricultores(),
    this.listarPlacas(),
    this.listarLotes(),
      this.years();
    
  // 
  },

  methods: {    
    ...mapActions(["refrescarIngresos"]),

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
  isPositive(e)
  {
      let char = String.fromCharCode(e.keyCode);
      if(/^[-]+$/.test(char) ) e.preventDefault();
     
  },
  /*
  isMax(ref_)
  {
   
      if(this.$refs[ref_].value > this.REC_PE_B){
       //this.$refs[ref_].value = "";
        //this.$refs[ref_].value = this.REC_PE_B; 
          this.REC_TAR = this.REC_PE_B
      }else
            return false;
  }, */
  
   mostrarErrores() {
      this.msg_error = "";
      for (let i = 0; i < this.errores.length; i++) {
        this.msg_error = this.msg_error + "\n" + this.errores[i];
      }
    },
    
    from_indicadores(){
      if(this.$route.params.ad==="ad")
      this.addItem();
    },
 // generador de listas referenciales no BD     
    years () { //2 años antes y 2 despues del año actual
      const year = new Date().getFullYear()
      //this.op_years =  Array.from({length: (year+2) - (year-2)}, (value, index) => (year-2) + index)
      for(let i=(year-2); i<(year+2); i++){
        this.op_years.push(""+i);

      }
    },
    // metodoS FORMATOS
    getColor (REC_TARADO) {
        if (REC_TARADO) return 'green'
        
        else return 'red'
      },
      // metodos de validaciónn
    
    
    //PROCEDIMIENTOS para el CRUD  
      listarPlacas(){
      let my = this;      
        axios.get("veh/list/").then(function(response){
          my.op_placas = response.data;
          console.log(my.op_placas);
          })
        .catch(function(err) {console.log(err.response.data)});
    }, //fin listar
    listarZonas(){
      let my = this;      
        axios.get("zon/list/").then(function(response){my.op_zonas = response.data;})
        .catch(function(err) {console.log(err.response.data)});
    }, //fin listar     
      listarVariedades(){
      let my = this;      
        axios.get("var/list/").then(function(response){my.op_variedad = response.data;})
        .catch(function(err) {console.log(err.response.data)});
    }, //fin listar
      listarAgricultores(){
      let my = this;      
        axios.get("agr/list/").then(function(response){my.op_agricultores = response.data;})
        .catch(function(err) {console.log(err.response.data)});
    }, //fin listar
     listarLotes(){
      let my = this;      
        axios.get("lot/list/").then(function(response){my.op_lotes = response.data;})
        .catch(function(err) {console.log(err.response.data)});
    }, //fin listar+

    //Procedimiento Listar 
    listar(){
      let my = this;      
        axios.get(my.GET_list).then(function(response){my.lista = response.data;})
        .catch(function(err) {console.log(err.response.data)});
    }, //fin listar

      listarLotesAgr(){// http://64.225.59.243:8006/lot/listAbiertosAgr/35/    agr/listLotes/
      let my = this;      
        axios.get("lot/listAbiertosAgr/"+my.AGR_COD+"/").then(function(response){
          my.op_lotesxAgr = response.data;
          console.log("si corre: ");
          console.log(my.op_lotesxAgr);
          })
        .catch(function(err) {console.log(err.response.data)});
    }, //fin listar


    addItem(){
      let my = this;      
      my.action= "Agregar";
      my.campoEstado = false,
      my.limpiar(); 
      //my.generarOpZonas();
      my.dialog = true;
    },
      addLote(){
      let my = this;      
     // my.LT_COD = 0,
      //my.AGR_COD = 0,
      my.LT_LOTE_NOM = "",
      my.dialogLote = true;
    },
    addLoteOk(){
      this.$refs.form.validate();
      if (this.$refs.form.validate(true)) {
        this.errores = [];
      let my = this;      
     //cod para agregar              
      axios
          .post("lot/add/", {
            AGR_COD: my.agr_selected,//my.AGR_COD,
            LT_FECHA: my.LT_FECHA,
            TR_ZON_COD: my.TR_ZON_COD, // AQUII
            LT_LOTE_NOM: my.LT_LOTE_NOM, // AQUII
            LT_ANIO: my.LT_ANIO, // AQUII
          })
          .then(function (response) {
            console.log(response.data);
            my.closeLote();
            my.listarLotes();
            my.limpiar();
          })
          .catch(err => {
            
            console.log(err.response.data);
           
 
          });
      }// fin valid
    },
   
    editItem(item) {
      let my = this;
      my.action= "Editar";
      my.campoEstado = true,

      this.editedItem = Object.assign({}, item);
      my.LT_COD= my.editedItem.LT_COD.LT_COD; // AQUI
      my.REC_COD= my.editedItem.REC_COD;
      my.TR_VAR_COD= my.editedItem.TR_VAR_COD.TR_VAR_COD; //AQUI
      my.REC_HUM= my.editedItem.REC_HUM;
      my.REC_IMP= my.editedItem.REC_IMP;
//my.TR_ZON_COD= my.editedItem.TR_ZON_COD.TR_ZON_COD; //AQUI
      my.TR_VEH_COD= my.editedItem.TR_VEH_COD.TR_VEH_COD; //AQUI
      my.REC_CONDUCTOR = my.editedItem.REC_CONDUCTOR; //AQUI
      my.REC_PE_B= my.editedItem.REC_PE_B;
      my.REC_TAR= my.editedItem.REC_TAR;
      my.REC_PE_NE= my.editedItem.REC_PE_NE;
      my.REC_ESTADO= my.editedItem.REC_ESTADO;
      my.REC_FECHA= my.editedItem.REC_FECHA;
      my.REC_FLE= my.editedItem.REC_FLE;
      my.REC_TARADO= my.editedItem.REC_TARADO;
      my.REC_OBS= my.editedItem.REC_OBS;
      console.log("AQUI MERO");
      console.log(this.editedItem);
      
      my.dialog = true;
    },
  
    deleteItem(item) {
      let my = this;
      my.editedItem = Object.assign({}, item);  
      
      confirm("¿Está seguro de querer eliminar este registro?") &&   
        axios.delete(my.DELETE_delete+my.editedItem.REC_COD+"/", { 
             
         }).then(response =>{
            console.log(response);           
            my.listar(); 
            my.limpiar(); 
            my.refrescarIngresos();         
        }).catch(function(err) {console.log(err.response.data)}); 
    },

    close() {
      this.dialog = false;
    },
     closeLote() {
      this.dialogLote = false;
    },

    limpiar(){
    let my = this;
   // my.REC_COD = 0;
   // my.AGR_COD = 0;
    //my.TR_VAR_COD = 0;
    my.REC_HUM = null;
    my.REC_IMP = null;
    //my.REC_ZON = 0;
    my.REC_VEH_COD = null;
    my.REC_CONDUCTOR = "";  // AQUII
    my.REC_PE_B = null;
    my.REC_TAR = null;
    my.REC_PE_NE = null;
    my.REC_FLE =null;
    my.REC_ESTADO = "ACTIVO";
    my.REC_FECHA = new Date();
    my.REC_OBS=""
    
    },

    
    save() {
     let my = this; 
       this.$refs.form.validate();
      if (this.$refs.form.validate(true)) {
        this.errores = [];
        if(my.action==="Editar"){
                
       axios.put(my.PUT_edit+my.editedItem.REC_COD+"/", {
          "REC_COD" : my.editedItem.REC_COD,
          //"LT_COD" : my.LT_COD,
          "TR_VAR_COD" : my.TR_VAR_COD,
          "REC_HUM" : my.REC_HUM,
          "REC_IMP" : my.REC_IMP,
        //  "TR_ZON_COD" : my.TR_ZON_COD,
          "TR_VEH_COD" : my.TR_VEH_COD,
          "REC_CONDUCTOR" : my.REC_CONDUCTOR, // AQUII
          "REC_PE_B" : my.REC_PE_B,
          "REC_TAR" : my.REC_TAR,
          "REC_ESTADO" : my.REC_ESTADO,
          "REC_FECHA" : my.REC_FECHA,
          "REC_FLE" : my.REC_FLE,
          "REC_TARADO" : my.REC_TARADO,
          "REC_OBS" : my.REC_OBS,
          "PAGA_MOLINO":my.PAGA_MOLINO,
         }).then(response =>{
            console.log(response);
            my.close();
            my.listar();
            my.limpiar();           
        }).catch(err => {console.log(err.response.data)
     
        });
        

        }else{          
          //cod para agregar              
          axios.post(my.POST_add,{
          "LT_COD" : my.LT_COD,
          "TR_VAR_COD" : my.TR_VAR_COD,
          "REC_HUM" : my.REC_HUM,
          "REC_IMP" : my.REC_IMP,
          //"TR_ZON_COD" : my.TR_ZON_COD,
          "TR_VEH_COD" : my.TR_VEH_COD,
          "REC_CONDUCTOR" : my.REC_CONDUCTOR, // AQUII
          "REC_PE_B" : my.REC_PE_B,
          "REC_TAR" : my.REC_TAR,
          "REC_FECHA" : my.REC_FECHA,
          "REC_FLE" : my.REC_FLE,
          "REC_TARADO" : my.REC_TARADO,
          "REC_OBS" : my.REC_OBS,
          "PAGA_MOLINO":my.PAGA_MOLINO,

          }).then(function(response){
            console.log(response.data);
            my.close();
            my.listar();
            my.limpiar();
            my.refrescarIngresos();
          }).catch(err => {console.log(err.response.data)});
         
        }
        
        
      }
    }, //fin método

    // MODIFICAR TARADO DESDE TABLA

     tar_save (item) {
       let my = this;

        my.editedItem = Object.assign({}, item);
        
      my.LT_COD= my.editedItem.LT_COD.LT_COD; // AQUI
      my.REC_COD= my.editedItem.REC_COD;
      my.TR_VAR_COD= my.editedItem.TR_VAR_COD.TR_VAR_COD; //AQUI
      my.REC_HUM= my.editedItem.REC_HUM;
      my.REC_IMP= my.editedItem.REC_IMP;
//my.TR_ZON_COD= my.editedItem.TR_ZON_COD.TR_ZON_COD; //AQUI
      my.TR_VEH_COD= my.editedItem.TR_VEH_COD.TR_VEH_COD; //AQUI
      my.REC_CONDUCTOR = my.editedItem.REC_CONDUCTOR; //AQUI
      my.REC_PE_B= my.editedItem.REC_PE_B;
      my.REC_TAR= (my.editedItem.REC_TAR=="" ? 0: my.editedItem.REC_TAR );
      my.REC_PE_NE= my.editedItem.REC_PE_NE;
      my.REC_ESTADO= my.editedItem.REC_ESTADO;
      my.REC_FECHA= my.editedItem.REC_FECHA;
      my.REC_FLE= my.editedItem.REC_FLE;
      my.REC_TARADO= (my.editedItem.REC_TAR > 0 ? true: false);
      my.REC_OBS= my.editedItem.REC_OBS;
//editando
             
       axios.put(my.PUT_edit+my.editedItem.REC_COD+"/", {
          "REC_COD" : my.editedItem.REC_COD,
          //"LT_COD" : my.LT_COD,
          "TR_VAR_COD" : my.TR_VAR_COD,
          "REC_HUM" : my.REC_HUM,
          "REC_IMP" : my.REC_IMP,
        //  "TR_ZON_COD" : my.TR_ZON_COD,
          "TR_VEH_COD" : my.TR_VEH_COD,
          "REC_CONDUCTOR" : my.REC_CONDUCTOR, // AQUII
          "REC_PE_B" : my.REC_PE_B,
          "REC_TAR" : my.REC_TAR,
          "REC_ESTADO" : my.REC_ESTADO,
          "REC_FECHA" : my.REC_FECHA,
          "REC_FLE" : my.REC_FLE,
          "REC_TARADO" : my.REC_TARADO,
          "REC_OBS" : my.REC_OBS,
          "PAGA_MOLINO":my.PAGA_MOLINO,
         }).then(response =>{
            console.log(response);
            my.close();
            my.listar();
            my.limpiar();           
        }).catch(err => {console.log(err.response.data)
     
        });


        this.snack = true
        this.snackColor = 'success'
        this.snackText = 'Registro guardado'
      },
      tar_cancel () {
        this.snack = true
        this.snackColor = 'error'
        this.snackText = 'Registro cancelado'
      },
      tar_open () {
        this.snack = true
        this.snackColor = 'info'
        this.snackText = 'Edición abierta'
      },
      tar_close () {
        console.log('Edición cerrada')
      },

  },
props: {
    source: String
  }
};
</script>