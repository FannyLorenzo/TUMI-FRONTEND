<template>
  <div>
 <v-data-table
          :headers="headers"
          :items="filteredLista"
          :items-per-page="5"
          class="elevation-1"
        > <!--  <template v-slot:[`item.actions`]="{ item }"> -->
          <template v-slot:[`header.AGR_NOM_COMPLETO`]="{ header }">
            {{ header.text }}
            <v-menu offset-y :close-on-content-click="false">
              <template v-slot:activator="{ on, attrs }">
                <v-btn icon v-bind="attrs" v-on="on">
                  <v-icon small :color="listaName ? 'primary' : ''">
                    mdi-filter
                  </v-icon>
                </v-btn>
              </template>
              <div style="background-color: white; width: 280px">
                <v-text-field
                  v-model="listaName"
                  class="pa-4"
                  type="text"
                  outlined
                  hide-details
                  dense
                  background-color="orange"
                  color="black"
                  label="Ingrese agricultor"
                ></v-text-field>
                
                <v-btn
                  @click="listaName = ''"
                  small
                  text
                  color="primary"
                  class="ml-2 mb-2"
                >limpiar</v-btn>
              </div>
            </v-menu>
          </template>
          
          <template v-slot:[`header.LT_NOMBRE`]="{ header }">
            {{ header.text }}
            <v-menu offset-y :close-on-content-click="false">
              <template v-slot:activator="{ on, attrs }">
                <v-btn icon v-bind="attrs" v-on="on">
                  <v-icon small :color="calories ? 'primary' : ''">
                    mdi-filter
                  </v-icon>
                </v-btn>
              </template>
              <div style="background-color: white; width: 280px">
                <v-text-field
                  v-model="calories"
                  class="pa-4"
                  type="text"
                  outlined
                  hide-details
                  dense
                  background-color="orange"
                  color="black"                  
                  label="Ingrese lote"
                ></v-text-field>
                <v-btn
                  @click="calories = ''"
                  small
                  text
                  color="primary"
                  class="ml-2 mb-2"
                >limpiar</v-btn>
              </div>
            </v-menu>
          </template>
          
          <template v-slot:[`header.PROD_FECHA_PROD`]="{ header }">
            {{ header.text }}
            <v-menu offset-y :close-on-content-click="false">
              <template v-slot:activator="{ on, attrs }">
                <v-btn icon v-bind="attrs" v-on="on">
                  <v-icon small :color="fat ? 'primary': ''">
                    mdi-filter
                  </v-icon>
                </v-btn>
              </template>
              <div style="background-color: white; width: 280px">
                <v-text-field
                  v-model="startDate"
                  class="pa-4"
                  type="date"
                  outlined
                  hide-details
                  dense
                  background-color="orange"
                  color="black" 
                  label="Ingrese fecha inicio"
                ></v-text-field>
                <v-text-field
                  v-model="endDate"
                  class="pa-4"
                  type="date"
                  outlined
                  hide-details
                  dense
                  background-color="orange"
                  color="black" 
                  label="Ingrese fecha fin"
                ></v-text-field>
                <v-btn
                  @click="limpiarFechas"  
                  small
                  text
                  color="primary"
                  class="ml-2 mb-2"
                >limpiar</v-btn>
              </div>
            </v-menu>
          </template>
           <template v-slot:[`item.PROD_FECHA_PROD`]="{ item }">
            {{ item.PROD_FECHA_PROD }} <!-- item.PROD_FECHA_PROD.replace(/-/g,"/") -->
         
        </template>
        </v-data-table>
</div>
</template>

<script>
import axios from 'axios'
export default {

 data () {
      return {
        listaName: '',
        calories: '',
        fat: '',
        startDate: '',
        endDate: '',
        
        headers: [
        { align: "start", sortable: false,
        // atributos de cada item
        //text: "" , value: "PROD_COD"},
        text: "Parte" , value: "PART_NOMBRE"},
        {text: "Agricultor" , value: "AGR_NOM_COMPLETO"},
        {text: "Lote" , value: "LT_NOMBRE"},
        { text: "Producto" , value: "PRO_DESCRIPCION"},
        { text: "Envase" , value: "ENV_NOM"},
        { text: "Unidad" , value: "PROD_UNIDAD"},
        { text: "Costo Unit." , value: "PROD_COSTO_UNITARIO"},
        { text: "Costo Total" , value: "PROD_COSTO_TOTAL"},
        { text: "Cantidad" , value: "PROD_CANTIDAD_ACTUAL"},
        { text: "Fecha" , value: "PROD_FECHA_PROD"},
        // opciones por cada item
      //  { text: "Opciones", value: "actions", sortable: false }
    ],
       lista: [],
       
      }
    },
   computed: {
    filteredLista() {
      
      let conditions = [];
      
      if (this.listaName) {
        conditions.push(this.filterListaName);
      }
      
      if (this.calories) {
        conditions.push(this.filterCalories);
      }
      
      if (this.fat) {
        conditions.push(this.filterFat);
        console.log("haber "+this.fat);
      }
      if (this.startDate) {
        conditions.push(this.filterStartDate);
        console.log("sdate "+this.startDate);
     }
      if (this.endDate) {
        conditions.push(this.filterEndDate);
        console.log("edate "+this.endDate);
      }
      
      if (conditions.length > 0) {
        return this.lista.filter((lista) => {
          return conditions.every((condition) => {
            return condition(lista);
          })
        })
      }
      
      return this.lista;
    }
  },
   created() {
    this.listar()
  },
   methods: {
     limpiarFechas(){
       this.endDate = '';
       this.startDate = '';
     },
     listar(){
      let my = this;      
        axios.get("prod/list/").then(function(response){my.lista = response.data;})
        .catch(function(err) {console.log(err)});
        
    }, //fin listar
     fechaEnFormato(){ 
     // let my = this;
      let fechita = new Date();
     let fecha = " "+fechita.getDate()+ "/" + (fechita.getMonth() +1) +"/"+ fechita.getFullYear()+" "+
      fechita.getHours() + ":"+ fechita.getMonth() + ":"+ fechita.getSeconds(); 
 return fecha;
      
    },
     filterListaName(item) {
       return item.AGR_NOM_COMPLETO.toLowerCase().includes(this.listaName.toLowerCase());
     },
     filterCalories(item) {
       return item.LT_NOMBRE.toString().toLowerCase().includes(this.calories.toLowerCase());
     },
     filterFat(item) {
       return item.PROD_FECHA_PROD.toString().includes(this.fat);
     },

     filterStartDate(item){
       return item.PROD_FECHA_PROD >= this.startDate;

     },
     filterEndDate(item){

       return item.PROD_FECHA_PROD <= this.endDate +1;

     },
   
   }
   

}
</script>

<style>

</style>