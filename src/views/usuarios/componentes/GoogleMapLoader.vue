<template>
  <div id="app">
    <div class="row">
       <h1 style="text-align: center;">Ubicanos en:</h1>
       <GoogleMap :latitude= current_user.ubicacion_map_lat :longitude= current_user.ubicacion_map_long :title="'Titulo Marcador'" />
    </div>

  </div>
</template>

<script>
import GoogleMap from "@/views/usuarios/componentes/GoogleMap";
import { mapState } from "vuex";

export default {
  name: 'App',
  data: () => ({
    latitud:-16.35676552126726,  
    longitud:-72.18892069235251,
  }),
  components: {
    GoogleMap
  },
  computed: {
    ...mapState('auth',['current_user']),
  },
}
</script>