<template>
  <v-row>
    <v-col cols="12" lg="3" sm="3" class="py-0 mb-7">
      <Ind_Maquila></Ind_Maquila> </v-col>
    <!-- AGRICULTOR SELECCIONABLE-->
    <v-col cols="12" lg="3" sm="6" class="py-0 mb-7">
      <select_agricultor></select_agricultor> </v-col>
      
  </v-row>
</template>

<script>

export default {
  name: "cabecera_maquila",
  data: () => ({
   }),
  created() {
  
  },

  methods: {
    },
  computed: {
    
  },
  components : {
     Ind_Maquila: () => import("@/views/tableros/componentes/ind_maquila"),
     select_agricultor: () => import("@/views/agricultores/componentes/select_agricultor"),
   
  }
};
</script>