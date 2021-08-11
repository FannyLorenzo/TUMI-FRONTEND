<template>
    <v-card >
        <v-card-text class="pa-5" color="green">
          <div class="d-flex align-center" >
            <div>
              <h3 > AGRICULTOR </h3>
                    <v-select

                            outlined
                            hide-details
                            prepend-inner-icon="mdi-account"
                            v-model="agricultorSeleccionado"
                            :items="op_agricultoresNyA"
                            item-text="nombreCompleto"
                            item-value="AGR_COD"
                            background-color="orange"
                            color="black"
                            min-width= "10"
                            dense
                            :style="{'max-width':'100%'}"
                            rounded                      
                            persistent-hint
                            return-object                            
                            no-data-text="No se tiene registros"
                            @change="actualizarDependientes"
                          ></v-select>
            </div>
          </div>
        </v-card-text>
      </v-card>
</template>

<script>
import { mapActions, mapState } from "vuex";
export default {
  name : "select_agricultor",

    computed: {
    ...mapState(["agricultorSeleccionado", "op_agricultoresNyA"]),

    agricultorSeleccionado: {
      get() {
        return this.$store.state.agricultorSeleccionado;
      },
      set(val) {
        this.$store.commit("SET_AGRICULTOR", val);
      },
    },
  },
    methods:{
      ...mapActions([ "listarAgricultores","refrescarIndicadores","refrescarIndiProduccion"]),

      actualizarDependientes(){ // no se usa, porq da igual
        this.refrescarIndicadores();
        this.refrescarIndiProduccion()

      }
    },
  created() {
    this.listarAgricultores()
  
  },

}
</script>
