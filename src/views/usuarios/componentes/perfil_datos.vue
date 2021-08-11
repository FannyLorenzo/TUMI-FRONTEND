<template>
  <div class="mt-4">
      <v-card class="mx-auto" tile>
 <div class="row">
 <h4 style="text-align: center;">Calificación</h4>   
 </div>
          <v-row>
               <v-col cols="12" sm="6" md="6"> 
                
                <v-rating
                v-model="rating"
                background-color="yellow"
                color="yellow"
                large
                ></v-rating>
                <v-chip
                class="ma-2"
                color="warning"
                text-color="white"
                >
                Calificación
                <v-icon right>mdi-star</v-icon>
                </v-chip>
                   
               </v-col>
               
          </v-row>
   <div class="row">
 <h4 style="text-align: center;">Información de contacto:</h4>   
 </div>
      </v-card>            
              <perfil_contacto/>   
   
       </div>
</template>

<script>
import perfil_contacto from "@/views/usuarios/componentes/perfil_contacto";

export default {
name: "perfil_datos",

  data: () => ({
     rating: 4,
  }),
  components: {
    perfil_contacto
   
    }
}
</script>





   
