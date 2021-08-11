<template>
  <v-container fluid class="down-top-padding">
    <BaseBreadcrumb :title="page.title" :icon="page.icon" :breadcrumbs="breadcrumbs"></BaseBreadcrumb>
    <v-row>
       <v-col cols="2" sm="2"></v-col>
      <v-col cols="8" sm="8">
        <v-card class="elevation-2" >
          <v-card-title class="headline">Mantenimiento de Molinos</v-card-title>
          <v-card-text >
            En este apartado, se registran los Molinos con los que 
            cuenta la empresa. 
             Solo se realiza una vez para poder ser utilizado en los diversos módulos. 
          </v-card-text>
        </v-card>
      </v-col>
      <v-col cols="12" sm="12"> <span> </span> </v-col>
      <v-col cols="2" sm="2"></v-col>
      <v-col cols="8" sm="8">
        <BaseCard heading="">
          <crud_Componente></crud_Componente>
        </BaseCard>
      </v-col>
      
    </v-row>
  </v-container>
</template>

<script>


export default {
  name: "molinos",

  data: () => ({
    page: {
      title: "Registro de molinos"
    },
    breadcrumbs: [
      {
        text: "Mantenimiento",
        disabled: false,
        to: "#"
      },
      {
        text: "Molinos",
        disabled: true
      }
    ]
  }),
  components: {
    crud_Componente: () => import("@/views/servicios/maquila/componentes/crud_Molinos"),
     
    
    }
};
</script>