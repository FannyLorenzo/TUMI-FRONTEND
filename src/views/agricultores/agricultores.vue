<template>
  <v-container fluid class="down-top-padding">
    <BaseBreadcrumb :title="page.title" :icon="page.icon" :breadcrumbs="breadcrumbs"></BaseBreadcrumb>
    <v-row>
      <v-col cols="12" sm="12">
        <BaseCard heading="LISTA DE AGRICULTORES">
          <crud_Agricultores></crud_Agricultores>
        </BaseCard>
      </v-col>
      
    </v-row>
  </v-container>
</template>

<script>


export default {
  name: "agricultores",

  data: () => ({
    page: {
      title: "Registro de agricultores"
    },
    breadcrumbs: [
      {
        text: "Agricultores",
        disabled: false,
        to: "#"
      },
      {
        text: "Agricultores",
        disabled: true
      }
    ]
  }),
  components: {
    crud_Agricultores: () => import("@/views/agricultores/componentes/crud_Agricultores"),
     
    
    }
};
</script>