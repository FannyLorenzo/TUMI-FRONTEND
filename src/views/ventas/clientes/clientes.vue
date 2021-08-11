<template>
  <v-container fluid class="down-top-padding">
    <BaseBreadcrumb :title="page.title" :icon="page.icon" :breadcrumbs="breadcrumbs"></BaseBreadcrumb>
    <v-row>
      <v-col cols="12" sm="12">
        <BaseCard heading="LISTA DE CLIENTES">
          <crud_Componente></crud_Componente>
        </BaseCard>
      </v-col>
      
    </v-row>
  </v-container>
</template>

<script>


export default {
  name: "clientes",

  data: () => ({
    page: {
      title: "Registro de clientes"
    },
    breadcrumbs: [
      {
        text: "Clientes",
        disabled: false,
        to: "#"
      },
      {
        text: "Clientes",
        disabled: true
      }
    ]
  }),
  components: {
    crud_Componente: () => import("@/views/ventas/clientes/componentes/crud_Clientes"),
     
    
    }
};
</script>