<template>
    <v-container fluid class="down-top-padding">
        <BaseBreadcrumb :title="page.title" :icon="page.icon" :breadcrumbs="breadcrumbs"></BaseBreadcrumb>
        <v-row>
            <v-col cols="12" class="py-0">
                 <cabeceraComponent></cabeceraComponent>
            </v-col>
        </v-row>
        <v-row v-show="elementVisible"> 
            <v-col cols="12" sm="12" lg="6">
                <graf_produccion></graf_produccion>
            </v-col>
        </v-row>
        <v-row>
           
            <v-col cols="12" sm="12" lg="4">
                <TheOurVisitors></TheOurVisitors>
            </v-col>
            <v-col cols="12" sm="12">
                 <TheProgressCard></TheProgressCard>
                 <TheSalesofAmplePixel></TheSalesofAmplePixel>
            </v-col>
            
        </v-row>
    </v-container>
</template>

<script>

export default {
  name: "indicadores",

  data: () => ({
      page: {
        title: "Indicadores" // "Analytical"
      },
      elementVisible: false,
      breadcrumbs: [
        {
          text: "Tableros",
          disabled: false,
          to: '#'
        },
        {
          text: "Indicadores", // "Analytical"
          disabled: true
        }
      ]
  }),
  created(){
     setTimeout(() => this.elementVisible = true, 1000)
  },
  components: {
      cabeceraComponent: () => import("@/views/tableros/componentes/cabeceraIndicadores"),
      graf_produccion: () => import("@/views/tableros/componentes/std_produccion/graf_produccion"),
      TheSalesCard: () => import("@/views/dashboards/dashboardComponents/sales-card/TheSalesCard"),
      //TheSalesOverview: () => import('@/views/dashboards/dashboardComponents/sales-overview/TheSalesOverview'),
      TheOurVisitors: () => import('@/views/dashboards/dashboardComponents/our-visitors/TheOurVisitors'),
      TheProgressCard: () => import("@/views/dashboards/dashboardComponents/progress-card/TheProgressCard"),
      TheSalesofAmplePixel: () => import("@/views/dashboards/dashboardComponents/sales-of-ample-pixel/TheSalesofAmplePixel")
       
      /*
      TheBusinessCard: () => import('@/views/dashboards/dashboardComponents/business-card/TheBusinessCard'),
      TheNewsletterCampaign: () => import('@/views/dashboards/dashboardComponents/newsletter-campaign/TheNewsletterCampaign'),
      TheBandwidthUsage: () => import('@/views/dashboards/dashboardComponents/bandwidth-usage/TheBandwidthUsage'),
      TheDownloadCount: () => import('@/views/dashboards/dashboardComponents/download-count/TheDownloadCount'),
      TheWeatherCard: () => import('@/views/dashboards/dashboardComponents/weather-card/TheWeatherCard'),
      TheProfileCard: () => import('@/views/dashboards/dashboardComponents/profile-card/TheProfileCard'),
      TheMyContacts: () => import('@/views/dashboards/dashboardComponents/my-contacts/TheMyContacts'),
      TheActivityTimeline: () => import('@/views/dashboards/dashboardComponents/activity-timeline/TheActivityTimeline'),
        */
  }
};

</script>