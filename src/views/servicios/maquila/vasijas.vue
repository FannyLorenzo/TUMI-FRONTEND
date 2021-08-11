<template>
  <v-container fluid class="down-top-padding">
    <BaseBreadcrumb :title="page.title" :icon="page.icon" :breadcrumbs="breadcrumbs"></BaseBreadcrumb>
    <v-row>
       <v-col cols="2" sm="2"></v-col>
      <v-col cols="8" sm="8">
        <v-card class="elevation-2" >
          <v-card-title class="headline">Mantenimiento de Vasijas</v-card-title>
          <v-card-text >
            En este apartado, se registran las Vasijas en las que 
            la entidad empaca los productos. 
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
  name: "vasijas",

  data: () => ({
    page: {
      title: "Registro de vasijas"
    },
    breadcrumbs: [
      {
        text: "Mantenimiento",
        disabled: false,
        to: "#"
      },
      {
        text: "Vasijas",
        disabled: true
      }
    ]
  }),
  components: {
    crud_Componente: () => import("@/views/servicios/maquila/componentes/crud_Vasijas"),
     
    
    }
};
</script>