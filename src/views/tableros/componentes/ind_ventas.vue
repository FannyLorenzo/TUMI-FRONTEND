<template>
      <v-card>
        <v-card-text class="pa-5">
          <div class="d-flex align-center">
            <v-btn class=" green elevation-0" fab dark @click="toDir('/ventas/ventasad/ad')">
              <v-icon> mdi-cash-multiple </v-icon>
            </v-btn>
            <div class="ml-2 mr-1">
              <h2 class="headline font-weight-light">
                {{total_ventas}}
              </h2>
              <h5 class="subtitle-2 font-weight-regular">
                Total ventas
              </h5>
            </div>
          </div>
        </v-card-text>
      </v-card>
 
</template>

<script>
import { mapState, mapActions } from "vuex";
export default {
    created(){ 
      this.refrescarVentas();
    },  
    computed:{
    ...mapState(["total_ventas"]),
    },
    methods: {  
    ...mapActions(["refrescarVentas"]),  
       
  toDir(ruta){
    this.$router.push({ path: ruta });
  },
  
  
  }, 

}
</script>
