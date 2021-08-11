<template>
  <v-row>
    <v-col cols="12" lg="3" sm="3" class="py-0 mb-7">
      <Ind_ingresos></Ind_ingresos> </v-col>
    <!-- AGRICULTOR SELECCIONABLE-->
    <v-col cols="12" lg="3" sm="6" class="py-0 mb-7">
      <select_agricultor></select_agricultor> </v-col>
      
  </v-row>
</template>

<script>

export default {
  name: "TheRevenueCards",
  data: () => ({
   }),
  created() {
  
  },

  methods: {
    },
  computed: {
    
  },
  components : {
     Ind_ingresos: () => import("@/views/tableros/componentes/ind_ingresos"),
     select_agricultor: () => import("@/views/agricultores/componentes/select_agricultor"),
   
  }
};
</script>