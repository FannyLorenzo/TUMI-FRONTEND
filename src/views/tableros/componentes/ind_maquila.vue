<template>
      <v-card>
        <v-card-text class="pa-5">
          <div class="d-flex align-center">
            <v-btn class=" error elevation-0" fab dark @click="toDir('/servicios/maquila/partesDiariosProduccionad/ad')">
              <v-icon>  ti-home </v-icon>
            </v-btn>
            <div class="ml-2 mr-1">
              <h2 class="headline font-weight-light">
                {{indicadores.total_maquila}}
              </h2>
              <h5 class="subtitle-2 font-weight-regular">
                Total de Maquila
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
      this.refrescarMaquila();
    },

    computed:{
    ...mapState(["indicadores"]),
    },
    methods: {
    ...mapActions(["refrescarMaquila"]),       
  toDir(ruta){
    this.$router.push({ path: ruta });
  }  
  
  }, 

}
</script>
