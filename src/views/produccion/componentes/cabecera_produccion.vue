<template>
  <v-row>
    <!-- AGRICULTOR SELECCIONABLE-->
    <v-col cols="12" lg="3" sm="3" class="py-0 mb-7">
      <select_agricultor></select_agricultor> </v-col>
       <v-col cols="12" lg="8" sm="8" class="py-0 mb-7">
       <graf_produccion></graf_produccion>
      </v-col>
    
      
  </v-row>
</template>

<script>

export default {
  name: "cabecera_produccion",
  data: () => ({
   }),
  created() {
  
  },

  methods: {
    },
  computed: {
    
  },
  components : {
    // Ind_habilitaciones: () => import("@/views/tableros/componentes/ind_habilitaciones"),
     graf_produccion: () => import("@/views/tableros/componentes/std_produccion/data_produccion2"), //graf_produccion
    select_agricultor: () => import("@/views/agricultores/componentes/select_agricultor"),
   
  }
};
</script>