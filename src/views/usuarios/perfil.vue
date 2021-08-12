<template>
  <v-container fluid class="down-top-padding">
    <BaseBreadcrumb :title="page.title" :icon="page.icon" :breadcrumbs="breadcrumbs"></BaseBreadcrumb>
   <v-row>
      <v-col cols="12" sm="12">
        <BaseCard heading="">
          <perfil_cabecera></perfil_cabecera>  
        </BaseCard>  
      </v-col>
   </v-row>
   <v-row>
       <v-col cols="6" sm="6" md="6">  
         <BaseCard heading="">
           <perfil_datos></perfil_datos> 
        </BaseCard> 
         </v-col>
         <v-col cols="6" sm="6" md="6">  
         <BaseCard heading="">     
           <mapa></mapa>
        </BaseCard> 
         </v-col>
   </v-row>
        <BaseCard heading="Productos">
           <productos/>
        </BaseCard>   
  </v-container>
</template>
<script>
import axios from "axios";
import { mapState, mapMutations } from "vuex";
export default {
  

  name: "perfil",

  data: () => ({
    page: {
      title: "Mi perfil"
    },
    breadcrumbs: [
      
      {
        text: "Mi perfil",
        disabled: true
      }
    ]
  }),
   computed: {
    ...mapState("auth", ["current_user","current_id"]),
  },
  methods:{
      // mutaciones de store
    ...mapMutations("auth", ["SET_CURRENT_USER"]),
    
     mostrarId() {
      
      console.log("ID : " + this.current_id);
    
      let json = {
        id: this.current_id,
      };
      axios
        .post("https://capacitacion-docente.herokuapp.com/users/detail/", json)
        .then((data) => {
          console.log("entroo");
          console.log(data.data);
          this.SET_CURRENT_USER(data.data);

        })
        .catch((err) => {
          console.log(err.response);
        });
    },
  },
  components: {
    perfil_cabecera: () => import("@/views/usuarios/componentes/perfil_cabecera"),
    perfil_datos: () => import("@/views/usuarios/componentes/perfil_datos"),
     mapa: () => import("@/views/usuarios/componentes/GoogleMapLoader"),
     productos:()=> import("@/views/productos/productos"),
     
    
    }
};
</script>