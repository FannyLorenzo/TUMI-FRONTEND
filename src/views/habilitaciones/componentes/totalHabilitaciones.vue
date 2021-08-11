<template>
  <v-row>
    <v-col cols="12" lg="3" sm="3" class="py-0 mb-7">
      <Ind_habilitaciones></Ind_habilitaciones> </v-col>
    <!-- AGRICULTOR SELECCIONABLE-->
    <v-col cols="12" lg="3" sm="6" class="py-0 mb-7">
      <select_agricultor></select_agricultor> </v-col>
      
  </v-row>
</template>

<script>

export default {
  name: "totalHabilitaciones",
  data: () => ({
   }),
  created() {
  
  },

  methods: {
    },
  computed: {
    
  },
  components : {
     Ind_habilitaciones: () => import("@/views/tableros/componentes/ind_habilitaciones"),
     select_agricultor: () => import("@/views/agricultores/componentes/select_agricultor"),
   
  }
};
</script>