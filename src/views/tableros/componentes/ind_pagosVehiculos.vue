<template>
     <v-card>
        <v-card-text class="pa-5">
          <div class="d-flex align-center">
            <v-btn class=" deep-purple accent-2 elevation-0" fab dark @click="toDir('/servicios/transporte/pagos')">
              <v-icon>  ti-truck </v-icon>
            </v-btn>
            <div class="ml-2 mr-1">
              <h2 class="headline font-weight-light">
                {{indicadores.total_pagos_vehiculos}}
              </h2>
              <h5 class="subtitle-2 font-weight-regular">
                Total pagar vehículos
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
      this.refrescarPagarVehiculos();
    }, 
    computed:{
    ...mapState(["indicadores"]),
    },
    methods: {   
       ...mapActions(["refrescarPagarVehiculos"]),   
  toDir(ruta){
    this.$router.push({ path: ruta });
  }  
  
  }, 

}
</script>
