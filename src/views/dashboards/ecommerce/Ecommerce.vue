<template>
  <v-container fluid class="down-top-padding">
    <BaseBreadcrumb :title="page.title" :icon="page.icon" :breadcrumbs="breadcrumbs"></BaseBreadcrumb>
    <v-row>
      <v-col cols="12" lg="8">
        <TheSalesCard></TheSalesCard>       
      </v-col>
      <v-col cols="12" sm="12" lg="4">
        <TheOurVisitors></TheOurVisitors>
      </v-col>
      <v-col cols="12" sm="12" lg="12">
        <TheProductOverview></TheProductOverview>
      </v-col>
      
    </v-row>
  </v-container>
</template>

<script>
export default {
  name: "Ecommerce",

  data: () => ({
    page: {
      title: "Ventas"
    },
    breadcrumbs: [
      {
        text: "Tableros",
        disabled: false,
        to: "#"
      },
      {
        text: "Ventas",
        disabled: true
      }
    ]
  }),
  components: {
    TheSalesCard: () =>
      import("@/views/dashboards/dashboardComponents/sales-card/TheSalesCard"),
    TheOurVisitors: () => import('@/views/dashboards/dashboardComponents/our-visitors/TheOurVisitors'),
    TheProductOverview: () =>
      import(
        "@/views/dashboards/dashboardComponents/product-overview/TheProductOverview"
      )
  }
};
</script>