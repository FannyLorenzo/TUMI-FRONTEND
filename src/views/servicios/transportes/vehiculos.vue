<template>
  <v-container fluid class="down-top-padding">
    <BaseBreadcrumb :title="page.title" :icon="page.icon" :breadcrumbs="breadcrumbs"></BaseBreadcrumb>
    <v-row>
       <v-col cols="2" sm="2"></v-col>
      <v-col cols="8" sm="8">
        <v-card class="elevation-2" >
          <v-card-title class="headline">Mantenimiento de Vehículos</v-card-title>
          <v-card-text >
            En este apartado, se registran los vehiculos que realizar el transporte de los arroces en cáscara. 
             Solo se realiza una vez para poder ser utilizado en los diversos módulos. 
          </v-card-text>
        </v-card>
      </v-col>
      <v-col cols="12" sm="12"> <span> </span> </v-col>
      <v-col cols="2" sm="2"></v-col>
      <v-col cols="8" sm="8">
        <BaseCard heading="">
          <crud_componente></crud_componente>
        </BaseCard>
      </v-col>
      
    </v-row>
  </v-container>
</template>

<script>


export default {
  name: "vehiculos",

  data: () => ({
    page: {
      title: "Vehiculos"
    },
    breadcrumbs: [
      {
        text: "Mantenimiento",
        disabled: false,
        to: "#"
      },
      {
        text: "Vehículos",
        disabled: true
      }
    ]
  }),
  components: {
    crud_componente: () => import("@/views/servicios/transportes/componentes/crud_Vehiculos"),
     //  @/views/ingresos/componentes/crud_Variedades
    
    }
};
</script>