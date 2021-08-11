<template>
  <div class="mt-4">
    <v-card class="mx-auto" tile>
      <v-row>
        <v-col cols="12" lg="3" sm="6" md="6">
          <v-card
    class="mx-auto"  
  >
        
            <v-img height="250" :src="current_user.foto"></v-img>
         
          <v-card-title
            >{{ current_user.nombre }} {{ current_user.apellido }}
          </v-card-title>
          <v-card-subtitle>
            {{ current_user.descripcion_larga }}
          </v-card-subtitle>
          </v-card>
        </v-col>
        <v-col cols="12" lg="8" sm="6" md="6">
          <v-img
            height="320"
            :src="current_user.landpage"
          ></v-img>
        </v-col>
      </v-row>
    </v-card>
   
  </div>
</template>

    
    <script>
import { mapState } from "vuex";

export default {
  name: "perfil_cabecera",

  created() {
    // this.refrescarCurrentUsuario();
  },
  computed: {
    ...mapState("auth", ["current_user"]),
  },
};
</script>
    
 