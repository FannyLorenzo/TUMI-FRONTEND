<template>
  <v-row>
    <v-col cols="12" sm="6" lg="3" class="py-0">
      <v-card class="mb-7">
        <v-card-text class="pa-5">
          <h2 class="font-weight-regular"> 1,078,560 KG</h2>
          <h6 class="body-2 mb-1 blue-grey--text text--lighten-2 font-weight-light">TOTAL PRODUCCIÓN</h6>
          <v-progress-linear rounded v-model="prg1" color="success" class="mt-2"></v-progress-linear>
        </v-card-text>
      </v-card>
    </v-col>
    
    <v-col cols="12" sm="6" lg="3" class="py-0">
      <v-card class="mb-7">
        <v-card-text class="pa-5">
          <h2 class="font-weight-regular">800,000 KG%</h2>
          <h6 class="body-2 mb-1 blue-grey--text text--lighten-2 font-weight-light">PRODUCTOS VENDIDOS Y DESPACHADOS</h6>
          <v-progress-linear rounded v-model="prg3" color="error" class="mt-2"></v-progress-linear>
        </v-card-text>
      </v-card>
    </v-col>
    <v-col cols="12" sm="6" lg="3" class="py-0">
      <v-card class="mb-7">
        <v-card-text class="pa-5">
          <h2 class="font-weight-regular">20,000 KG</h2>
          <h6 class="body-2 mb-1 blue-grey--text text--lighten-2 font-weight-light">PRODUCTOS PENDIENTES DE DESPACHO</h6>
          <v-progress-linear rounded v-model="prg2" color="info" class="mt-2"></v-progress-linear>
        </v-card-text>
      </v-card>
    </v-col>
    <v-col cols="12" sm="6" lg="3" class="py-0">
      <v-card class="mb-7">
        <v-card-text class="pa-5">
          <h2 class="font-weight-regular">150,000KG</h2>
          <h6 class="body-2 mb-1 blue-grey--text text--lighten-2 font-weight-light">PRODUCTOS PENDIENTES DE VENTA</h6>
          <v-progress-linear rounded v-model="prg4" color="black" class="mt-2"></v-progress-linear>
        </v-card-text>
      </v-card>
    </v-col>
  </v-row>
</template>

<script>
export default {
  name: "TheProgressCard",
  data: () => ({
    prg1: 86,
    prg2: 40,
    prg3: 56,
    prg4: 26
  })
};
</script>