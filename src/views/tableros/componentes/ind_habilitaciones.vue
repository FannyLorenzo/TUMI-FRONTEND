<template>
      <v-card>
        <v-card-text class="pa-5">
          <div class="d-flex align-center">
            <v-btn class=" warning elevation-0" fab dark @click="toDir('/agricultores/habilitacionesad/ad')">
              <v-icon>  ti-clipboard </v-icon>
            </v-btn>
            <div class="ml-2 mr-1">
              <h2 class="headline font-weight-light">
                {{indicadores.total_habilitaciones}}
              </h2>
              <h5 class="subtitle-2 font-weight-regular">
                Total de Habilitaciones
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
      this.refrescarHabilitaciones();
    },

    computed:{
    ...mapState(["indicadores"]),
    },
    methods: {  
    ...mapActions(["refrescarHabilitaciones"]),   
    toDir(ruta){
      this.$router.push({ path: ruta });
    }  
  
  }, 

}
</script>
