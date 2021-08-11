<template>
  <v-container fluid class="down-top-padding">
    <BaseBreadcrumb :title="page.title" :icon="page.icon" :breadcrumbs="breadcrumbs"></BaseBreadcrumb>
    <v-row>    
      <v-col cols="12" class="py-0">
        <cabecera></cabecera>
      </v-col>  
      <v-col cols="12" sm="12">
        <BaseCard heading="Estado de cuenta Clientes">
          <tablota></tablota>
        </BaseCard>
      </v-col>
      
    </v-row>
  </v-container>
</template>

<script>

export default {
  name: "estadoCuentaCliente",

  data: () => ({
    page: {
      title: "Estado de cuenta cliente"
    },
    breadcrumbs: [
      {
        text: "Clientes",
        disabled: false,
        to: "#"
      },
      {
        text: "Estado de cuenta",
        disabled: true
      }
    ]
  }),
  components: {
    cabecera: () => import("@/views/ventas/clientes/componentes/cabeceraEstadoCuentaCliente"),    
    tablota: () => import("@/views/ventas/clientes/componentes/view_estadoCuentaCliente"),     
    
    }
};
</script>