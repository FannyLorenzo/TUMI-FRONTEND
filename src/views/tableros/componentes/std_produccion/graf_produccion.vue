<template>
    <v-card class="mb-7">
        <v-toolbar flat>
            <v-toolbar-title>Total Producción en Sacos</v-toolbar-title>
        </v-toolbar>
        <v-divider></v-divider>
        <div class="mt-4 pa-4">
            <div>
                <apexchart ref="demo"
                 type="bar" height="350"
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
  name: "graf_produccion",

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
  
  }

  
};
</script>


