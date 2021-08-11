<template>
    <v-card class="mb-7">
        <v-toolbar flat>        

            <v-toolbar-title>Total Producción en Sacos</v-toolbar-title>        
                
        </v-toolbar>
        <v-divider>    <select_agricultor></select_agricultor>   </v-divider>
        <div class="mt-4 pa-4">
            <div>
                <apexchart ref="demo"
                 type="bar" height="200"
                :options="chartOptions"
                :series="series"
              ></apexchart>
            </div>
        </div>
    </v-card>
</template>

<script>
import { mapState, mapActions } from "vuex";
//import VueApexCharts from "vue-apexcharts";

export default {  
  name: "data_produccion2",

  data: () => ({            


  }),
created(){ 
  this.refrescarIndiProduccion();
},
computed:{
    ...mapState(["barChart","series", "chartOptions"]),

},

methods: {  
    ...mapActions(["refrescarIndiProduccion"]),  
    
    load(){// no se usa
       this.$apexcharts.exec('vuechart-example', 'updateSeries', [{
        data: this.barChart.series[0].data//chartOptions.xaxis.categories
      }])
    }
  
  },
   components : {
     select_agricultor: () => import("@/views/agricultores/componentes/select_agricultor"),
   
  }

  
};
</script>


