<template>
  <v-row>
     <!-- <v-col cols="12" lg="3" sm="3" class="py-0 mb-7">
    <Ind_habilitaciones></Ind_habilitaciones> </v-col> -->
    <!-- CLIENTE SELECCIONABLE-->
    <v-col cols="12" lg="3" sm="6" class="py-0 mb-7">
      <select_cliente></select_cliente> 
    </v-col>
      
  </v-row>
</template>

<script>

export default {
  name: "cabeceraEstadoCuentaCliente",
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
     select_cliente: () => import("@/views/ventas/clientes/componentes/select_cliente"),
   
  }
};
</script>