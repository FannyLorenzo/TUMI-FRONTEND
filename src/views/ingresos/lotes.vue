<template>
  <v-container fluid class="down-top-padding">
    <BaseBreadcrumb :title="page.title" :icon="page.icon" :breadcrumbs="breadcrumbs"></BaseBreadcrumb>
    <v-row>
      <v-col cols="12" class="py-0">
        <TheRevenueCards></TheRevenueCards>
      </v-col>  

      <v-col cols="12" sm="12">
        <BaseCard heading="LISTA DE LOTES DE ARROZ EN CÁSCARA">
          <crud_Lotes></crud_Lotes>
        </BaseCard>
      </v-col>
      
    </v-row>
  </v-container>
</template>

<script>


export default {
  name: "lotes",

  data: () => ({
    page: {
      title: "Registro de lotes"
    },
    breadcrumbs: [
      {
        text: "Agricultores",
        disabled: false,
        to: "#"
      },
      {
        text: "Lotes",
        disabled: true
      }
    ]
  }),
  components: {
    TheRevenueCards: () => import("@/views/ingresos/componentes/TheRevenueCards.vue"),
    crud_Lotes: () => import("@/views/ingresos/componentes/crud_Lotes"),
     
    
    }
};
</script>