<template>
  <div>
 <v-data-table
          :headers="headers"
          :items="filteredLista"
          :items-per-page="5"
          sort-by="DET_CUE_FECHA"
          update: sort-desc
          class="elevation-1"
        > <!--  <template v-slot:[`item.actions`]="{ item }"> -->
          <template v-slot:[`header.DET_CUE_TIPO`]="{ header }">
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
                  label="Ingrese transacción"
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
          
          <template v-slot:[`header.DET_CUE_DESCRIPCION`]="{ header }">
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
                  label="Ingrese referencia"
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
          
          <template v-slot:[`header.DET_CUE_FECHA`]="{ header }">
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
import { mapState, mapActions} from "vuex";

export default {
   name: "view_estadoCuentaCliente",

 data () {
      return {
        listaName: '',
        calories: '',
        fat: '',
        startDate: '',
        endDate: '',
        
        headers: [
        { align: "start", sortable: true,
        // atributos de cada item
      //  text: "Transacción" , value: "DET_CUE_NOMBRE"},
      //{ text: "Codigo" , value: "DET_CUE_COD"},
       text: "Fecha" , value: "DET_CUE_FECHA"},
      { text: "Tipo" , value: "DET_CUE_TIPO"},
      { text: "Descripción" , value: "DET_CUE_DESCRIPCION"},
      { text: "Importe" , value: "DET_CUE_IMPORTE"},
      { text: "Acumulado" , value: "DET_CUE_ACUMULADO"},
     
      
        // opciones por cada item
      //  { text: "Opciones", value: "actions", sortable: false }
    ],
       lista: [],
       
      }
    },
   computed: {
     ...mapState(["estadosCuentaxCliente"]),

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
        return this.estadosCuentaxCliente.filter((lista) => {
          return conditions.every((condition) => {
            return condition(lista);
          })
        })
      }
      
      return this.estadosCuentaxCliente;
    }
  },
   created() {
   this.refrescarEstadoCuentaxCliente();
  },
   methods: {
     
    ...mapActions(["refrescarEstadoCuentaxCliente"]),

     limpiarFechas(){
       this.endDate = '';
       this.startDate = '';
     },
   
     fechaEnFormato(){ 
     // let my = this;
      let fechita = new Date();
     let fecha = " "+fechita.getDate()+ "/" + (fechita.getMonth() +1) +"/"+ fechita.getFullYear()+" "+
      fechita.getHours() + ":"+ fechita.getMonth() + ":"+ fechita.getSeconds(); 
 return fecha;
      
    },
     filterListaName(item) {
       return item.DET_CUE_TIPO.toLowerCase().includes(this.listaName.toLowerCase());
     },
     filterCalories(item) {
       return item.DET_CUE_DESCRIPCION.toString().toLowerCase().includes(this.calories.toLowerCase());
     },
     filterFat(item) {
       return item.DET_CUE_FECHA.toString().includes(this.fat);
     },

     filterStartDate(item){
       return item.DET_CUE_FECHA >= this.startDate;

     },
     filterEndDate(item){

       return item.DET_CUE_FECHA <= this.endDate +1;

     },
   
   }
   

}
</script>

<style>

</style>