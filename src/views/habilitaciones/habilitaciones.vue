<template>
  <v-container fluid class="down-top-padding">
    <BaseBreadcrumb :title="page.title" :icon="page.icon" :breadcrumbs="breadcrumbs"></BaseBreadcrumb>
    <v-row>
        <v-col cols="12" class="py-0">
        <The_total></The_total>
      </v-col>  
      <v-col cols="12" sm="12">
        <BaseCard heading="LISTA DE HABILITACIONES">
          <crud_Habilitaciones></crud_Habilitaciones>
        </BaseCard>
      </v-col>
      
    </v-row>
  </v-container>
</template>

<script>



export default {
  name: "habilitaciones",

  data: () => ({
    page: {
      title: "Registro de Habilitaciones"
    },
    breadcrumbs: [
      {
        text: "Agricultores",
        disabled: false,
        to: "#"
      },
      {
        text: "Habilitaciones",
        disabled: true
      }
    ]
  }),
  components: {
    The_total: () => import("@/views/habilitaciones/componentes/totalHabilitaciones"),
    
    crud_Habilitaciones: () => import("@/views/habilitaciones/componentes/crud_Habilitaciones"),
     
    
    }
};
</script>