<template>
  <v-container fluid class="down-top-padding">
    <BaseBreadcrumb :title="page.title" :icon="page.icon" :breadcrumbs="breadcrumbs"></BaseBreadcrumb>
    <v-row>    
      <v-col cols="12" class="py-0">
        <cabecera_produccion></cabecera_produccion>
      </v-col>  
      <v-col cols="12" sm="12">
        <BaseCard heading="LISTA DE INGRESOS DE PARTES DE PRODUCCIÓN">
          <ingresos_produccion></ingresos_produccion>
        </BaseCard>
      </v-col>
      
    </v-row>
  </v-container>
</template>

<script>



export default {
  name: "produccion",

  data: () => ({
    page: {
      title: "Registro de producción"
    },
    breadcrumbs: [
      {
        text: "Producción",
        disabled: false,
        to: "#"
      },
      {
        text: "Producción",
        disabled: true
      }
    ]
  }),
  components: {
    cabecera_produccion: () => import("@/views/produccion/componentes/cabecera_produccion"),
    
    ingresos_produccion: () => import("@/views/produccion/componentes/kardex_produccion"),
     
    
    }
};
</script>