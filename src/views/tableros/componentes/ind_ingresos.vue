<template>
      <v-card>
        <v-card-text class="pa-5">
          <div class="d-flex align-center">
            <v-btn class=" info elevation-0" fab dark @click="toDir('/agricultores/arrozcascarad/ad')">
              <v-icon> fab fa-pagelines </v-icon>
            </v-btn>
            <div class="ml-2 mr-1">
              <h2 class="headline font-weight-light">
                {{indicadores.total_ingresos}}
              </h2>
              <h5 class="subtitle-2 font-weight-regular">
                Arroz cáscara
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
      this.refrescarIngresos();
    }, 

    computed:{
    ...mapState(["indicadores"]),
    },
    methods: {   
    ...mapActions(["refrescarIngresos"]),    
  toDir(ruta){
    this.$router.push({ path: ruta });
  }  
  
  }, 

}
</script>
