<template>
  <v-container fluid class="down-top-padding">
    <BaseBreadcrumb :title="page.title" :icon="page.icon" :breadcrumbs="breadcrumbs"></BaseBreadcrumb>
    <v-row>
       <v-col cols="2" sm="2"></v-col>
      <v-col cols="8" sm="8">
        <v-card class="elevation-2" >
          <v-card-title class="headline">Mantenimiento de Variedades</v-card-title>
          <v-card-text >
            En este apartado, se registran las variedades de productos de los posibles ingresos de arroz cáscara. 
             Solo se realiza una vez para poder ser utilizado en los diversos módulos. 
          </v-card-text>
        </v-card>
      </v-col>
      <v-col cols="12" sm="12"> <span> </span> </v-col>
      <v-col cols="2" sm="2"></v-col>
      <v-col cols="8" sm="8">
        <BaseCard heading="">
          <crud_Variedades></crud_Variedades>
        </BaseCard>
      </v-col>
      
    </v-row>
  </v-container>
</template>

<script>


export default {
  name: "variedades",

  data: () => ({
    page: {
      title: "Registro de variedades de arroz"
    },
    breadcrumbs: [
      {
        text: "Mantenimiento",
        disabled: false,
        to: "#"
      },
      {
        text: "Variedades",
        disabled: true
      }
    ]
  }),
  components: {
    crud_Variedades: () => import("@/views/ingresos/componentes/crud_Variedades"),
     
    
    }
};
</script>