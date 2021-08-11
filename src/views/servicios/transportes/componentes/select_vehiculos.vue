<template>
    <v-card >
        <v-card-text class="pa-5" color="green">
          <div class="d-flex align-center" >
            <div>
              <h3 > VEHICULO </h3>
                    <v-select

                            outlined
                            hide-details
                            prepend-inner-icon="ti-truck"
                            v-model="vehiculoSeleccionado"
                            :items="op_vehiculosOk"
                            item-text="placa_propietario"
                            item-value="TR_VEH_COD"
                            background-color="orange"
                            color="black"
                            min-width= "10"
                            dense
                            :style="{'max-width':'100%'}"
                            rounded                      
                            persistent-hint
                            return-object                            
                            no-data-text="No se tiene registros"
                            @change="refrescarPagarVehiculos"
                          ></v-select>
            </div>
          </div>
        </v-card-text>
      </v-card>
</template>

<script>
import { mapActions, mapState } from "vuex";
export default {

computed: { // mmm
    ...mapState(["vehiculoSeleccionado", "op_vehiculosOk"]),
    vehiculoSeleccionado: {
      get() {
        return this.$store.state.vehiculoSeleccionado;
      },
      set(val) {
        this.$store.commit("SET_PLACA", val);
      },
    },
},
     methods:{
      ...mapActions(["refrescarPagarVehiculos", "listarVehiculos"]),
    },
  created() {
    this.listarVehiculos()
  
  },

}
</script>

<style>

</style>