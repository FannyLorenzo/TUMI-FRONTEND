<template>
  <v-container fluid class="down-top-padding">
    <BaseBreadcrumb :title="page.title" :icon="page.icon" :breadcrumbs="breadcrumbs"></BaseBreadcrumb>
    <v-row>
      <v-col cols="12" sm="12">
        <BaseCard heading="Lista de trabajadores">
          <crud_Componente></crud_Componente>
        </BaseCard>
      </v-col>
      
    </v-row>
  </v-container>
</template>

<script>


export default {
  name: "trabajadores",

  data: () => ({
    page: {
      title: "Registro de trabajadores"
    },
    breadcrumbs: [
      {
        text: "Trabajadores",
        disabled: false,
        to: "#"
      },
      {
        text: "Trabajadores",
        disabled: true
      }
    ]
  }),
  components: {
    crud_Componente: () => import("@/views/trabajadores/componentes/crud_Trabajadores"),
     
    
    }
};
</script>