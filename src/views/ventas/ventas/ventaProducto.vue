<template>
  <v-container fluid class="down-top-padding">
    <BaseBreadcrumb :title="page.title" :icon="page.icon" :breadcrumbs="breadcrumbs"></BaseBreadcrumb>
    <v-row>
  
      <v-col cols="12" class="py-0">
        <cabecera></cabecera>
      </v-col>  

      <v-col cols="12" sm="12">
        <BaseCard heading="LISTA DE VENTAS">
          <crud_Componente></crud_Componente>
        </BaseCard>
      </v-col>
      
    </v-row>
  </v-container>
</template>

<script>


export default {
  name: "ventaProducto",

  data: () => ({
    page: {
      title: "Registro de  Ventas"
    },
    breadcrumbs: [
      {
        text: "Ventas",
        disabled: false,
        to: "#"
      },
      {
        text: "Ventas",
        disabled: false,
        to: "#"
      },
      {
        text: "Ventas productos",
        disabled: true
      }
    ]
  }),
  components: { // src/views/servicios/maquila/componentes/cabecera_maquila.vue
    cabecera: () => import("@/views/tableros/componentes/ind_ventas"),
    crud_Componente: () => import("@/views/ventas/ventas/componentes/crud_VentaProducto"),
     
    
    }
};
</script>