<template>
  <v-container fluid class="down-top-padding">
    <BaseBreadcrumb :title="page.title" :icon="page.icon" :breadcrumbs="breadcrumbs"></BaseBreadcrumb>
    <v-row>
      <v-col cols="12" sm="12">
        <BaseCard heading="LISTA DE USUARIOS">
          <crud_Usuarios></crud_Usuarios>
        </BaseCard>
      </v-col>
      
    </v-row>
  </v-container>
</template>

<script>


export default {
  name: "usuarios",

  data: () => ({
    page: {
      title: "Registro de usuarios al sistema"
    },
    breadcrumbs: [
      {
        text: "Accesos",
        disabled: false,
        to: "#"
      },
      {
        text: "Usuarios",
        disabled: true
      }
    ]
  }),
  components: {
    crud_Usuarios: () => import("@/views/usuarios/componentes/crud_Usuarios"),
     
    
    }
};
</script>