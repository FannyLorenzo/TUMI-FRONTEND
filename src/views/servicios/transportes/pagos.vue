<template>
  <v-container fluid class="down-top-padding">
    <BaseBreadcrumb :title="page.title" :icon="page.icon" :breadcrumbs="breadcrumbs"></BaseBreadcrumb>
    <v-row>
       <v-col cols="12" sm="12">
      
          <cabecera_componente></cabecera_componente>
        
      </v-col>
      <v-col cols="12" sm="12">
        <BaseCard heading="LISTA DE PAGOS">
          <crud_componente></crud_componente>
        </BaseCard>
      </v-col>
      
    </v-row>
  </v-container>
</template>

<script>


export default {
  name: "pagos",

  data: () => ({
    page: {
      title: "Pagos"
    },
    breadcrumbs: [
      {
        text: "Servicios",
        disabled: false,
        to: "#"
      },
      {
        text: "Transporte",
        disabled: false,
        to: "#"
      },
      {
        text: "Pagos",
        disabled: true
      }
    ]
  }),
  components: {
    crud_componente: () => import("@/views/servicios/transportes/componentes/crud_Pagos"),
     cabecera_componente: () => import("@/views/servicios/transportes/componentes/cabeceraPagos"),
         
     //@/views/ingresos/componentes/crud_Variedades
    
    }
};
</script>