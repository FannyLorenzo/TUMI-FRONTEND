<template>
      <v-card>
        <v-card-text class="pa-5">
          <div class="d-flex align-center">
            <v-btn class=" orange elevation-0" fab dark @click="toDir('/agricultores/agricultoresad/ad')">
              <v-icon> ti-user </v-icon>
            </v-btn>
            <div class="ml-2 mr-1">
              <h2 class="headline font-weight-light">
                {{indicadores.total_agricultores}} Agricultores
              </h2>          
             
            </div>
          </div>
          <div>
               <!-- AGRICULTOR SELECCIONABLE-->
              
      <select_agricultor></select_agricultor>
          </div>
        </v-card-text>
      </v-card>
  
</template>

<script>
import { mapState, mapActions } from "vuex";
export default {
   created(){ 
      this.refrescarNroAgricultores();
    },

    computed:{
    ...mapState(["indicadores"]),
    },
    methods: {   
       ...mapActions(["refrescarNroAgricultores"]),     
  toDir(ruta){
    this.$router.push({ path: ruta });
  }  
  
  }, 
  components: {
    select_agricultor: () => import("@/views/agricultores/componentes/select_agricultor"),
   
  }

}
</script>
