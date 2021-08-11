<template>
  <v-container fluid class="down-top-padding">
    <BaseBreadcrumb :title="page.title" :icon="page.icon" :breadcrumbs="breadcrumbs"></BaseBreadcrumb>
    <v-row>
      <v-col cols="12" class="py-0">
        <TheRevenueCards></TheRevenueCards>
      </v-col>  

      <v-col cols="12" sm="12">
        <BaseCard heading="LISTA DE REGISTROS DE ARROZ EN CÁSCARA">
          <crud_Arrozcascara></crud_Arrozcascara>
        </BaseCard>
      </v-col>
      
    </v-row>
  </v-container>
</template>

<script>


export default {
  name: "arrozcascara",

  data: () => ({
    page: {
      title: "Registro de arroz en cáscara"
    },
    breadcrumbs: [
      {
        text: "Agricultores",
        disabled: false,
        to: "#"
      },
      {
        text: "Arroz cáscara",
        disabled: true
      }
    ]
  }),
  components: {
    TheRevenueCards: () => import("@/views/ingresos/componentes/TheRevenueCards.vue"),
    crud_Arrozcascara: () => import("@/views/ingresos/componentes/crud_Arrozcascara"),
     
    
    }
};
</script>