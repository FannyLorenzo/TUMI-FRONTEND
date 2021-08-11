<template>
  <v-row>
      <v-col cols="12" lg="3" sm="3" class="py-0 mb-7">
      <Ind_pagosVehiculos></Ind_pagosVehiculos> </v-col>
    <!-- AGRICULTOR SELECCIONABLE-->
    <v-col cols="12" lg="3" sm="6" class="py-0 mb-7">
      <select_vehiculo></select_vehiculo> </v-col>
   
  </v-row>
</template>

<script>

export default {
  name: "cabeceraPagos",
  data: () => ({
   
  }),
  created() {

  },

  methods: {
   
  },
  computed: {
  },
    components : {
     Ind_pagosVehiculos: () => import("@/views/tableros/componentes/ind_pagosVehiculos"),
     select_vehiculo: () => import("@/views/servicios/transportes/componentes/select_vehiculos"),
   
  }
};
</script>