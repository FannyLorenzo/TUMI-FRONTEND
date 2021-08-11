<template>
  <v-container fluid class="down-top-padding">
    <BaseBreadcrumb :title="page.title" :icon="page.icon" :breadcrumbs="breadcrumbs"></BaseBreadcrumb>
    <v-row>
      <v-col cols="12" class="py-0">
        <cabecera_maquila></cabecera_maquila>
      </v-col>  

      <v-col cols="12" sm="12">
        <BaseCard heading="LISTA DE PARTES DIARIOS DE PRODUCCIÓN">
          <crud_Componente></crud_Componente>
        </BaseCard>
      </v-col>
      
    </v-row>
  </v-container>
</template>

<script>


export default {
  name: "partesDiariosProduccion",

  data: () => ({
    page: {
      title: "Registro de Parte diario de producción"
    },
    breadcrumbs: [
      {
        text: "Producción",
        disabled: false,
        to: "#"
      },     
      {
        text: "Parte diario de producción",
        disabled: true
      }
    ]
  }),
  components: { // src/views/servicios/maquila/componentes/cabecera_maquila.vue
    cabecera_maquila: () => import("@/views/servicios/maquila/componentes/cabecera_maquila"),
    crud_Componente: () => import("@/views/servicios/maquila/componentes/crud_PartesDiariosProduccion"),
     
    
    }
};
</script>