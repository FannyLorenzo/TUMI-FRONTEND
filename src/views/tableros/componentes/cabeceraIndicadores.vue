<template>
 <v-row>
    <v-col cols="12" lg="4" sm="4" class="py-0 mb-7">
      <Ind_ingresos></Ind_ingresos> 
      <Ind_habilitaciones></Ind_habilitaciones>
     </v-col>
     <v-col cols="12" lg="4" sm="4" class="py-0 mb-7">
       <Ind_pagosVehiculos></Ind_pagosVehiculos> 
      <Ind_Maquila></Ind_Maquila></v-col>

     <v-col cols="12" lg="4" sm="4" class="py-0 mb-7">
  
      <Ind_totalAgricultores></Ind_totalAgricultores>    </v-col>

      <v-col cols="12" lg="12" sm="12" class="py-0 mb-7">
      <Ind_Ventas></Ind_Ventas></v-col>
    
 
    

 </v-row>
</template>

<script>
import { mapState } from "vuex";
import { mapActions } from "vuex";

export default {
  name: "cabeceraIndicadores",
  data: () => ({

   
  }),
   created() {
    this.refrescarIndicadores();  
    this.refrescarVentas();
  },
  computed:{
    ...mapState(["indicadores"]),

  },
  methods: {  
    ...mapActions([ "refrescarIndicadores", "refrescarVentas"]),
 
  toDir(ruta){
    this.$router.push({ path: ruta });
  }  
  
  }, 
  components : {
     Ind_ingresos: () => import("@/views/tableros/componentes/ind_ingresos"),
     Ind_habilitaciones: () => import("@/views/tableros/componentes/ind_habilitaciones"),
     Ind_pagosVehiculos: () => import("@/views/tableros/componentes/ind_pagosVehiculos"),
     Ind_totalAgricultores: () => import("@/views/tableros/componentes/ind_totalAgricultores"),
     Ind_Maquila: () => import("@/views/tableros/componentes/ind_maquila"),
     Ind_Ventas: () => import("@/views/tableros/componentes/ind_ventas"),
     
     
     
         
  }
 
}
</script>