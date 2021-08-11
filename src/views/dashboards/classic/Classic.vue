<template>
  <v-container fluid class="down-top-padding">
    <BaseBreadcrumb :title="page.title" :icon="page.icon" :breadcrumbs="breadcrumbs"></BaseBreadcrumb>
    <v-row>
      <v-col cols="12" class="py-0">
        <TheRevenueCards></TheRevenueCards>
      </v-col>  

      <v-col cols="12" sm="12">
        <BaseCard heading="LISTA DE REGISTROS DE ARROZ EN CÁSCARA">
          <DatatablesCRUDActions></DatatablesCRUDActions>
        </BaseCard>
      </v-col>
      
    </v-row>
  </v-container>
</template>

<script>


export default {
  name: "Classic",

  data: () => ({
    page: {
      title: "Registro de arroz en cáscara"
    },
    breadcrumbs: [
      {
        text: "Tableros",
        disabled: false,
        to: "#"
      },
      {
        text: "Registro de arroz en cáscara",
        disabled: true
      }
    ]
  }),
  components: {
    TheRevenueCards: () => import("@/views/dashboards/dashboardComponents/revenue-cards/TheRevenueCards"),
    DatatablesCRUDActions: () => import("@/views/tables/table-data-table/table-data/DatatablesCRUDActions"),
     
    
    }
};
</script>