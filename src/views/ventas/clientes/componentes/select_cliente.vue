<template>
    <v-card >
        <v-card-text class="pa-5" color="green">
          <div class="d-flex align-center" >
            <div>
              <h3 > CLIENTE </h3>
                    <v-select

                            outlined
                            hide-details
                            prepend-inner-icon="mdi-account"
                            v-model="clienteSeleccionado"
                            :items="op_clientesNyA"
                            :item-text="item => ' '+item.CLI_NOM +' '+ item.CLI_APE"
                            item-value="CLI_COD"
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
  name : "select_cliente",

    computed: {
    ...mapState(["clienteSeleccionado", "op_clientesNyA"]),

    clienteSeleccionado: {
      get() {
        return this.$store.state.clienteSeleccionado;
      },
      set(val) {
        this.$store.commit("SET_CLIENTE", val);
      },
    },
  },
    methods:{
      ...mapActions([ "listarClientes", "refrescarEstadoCuentaxCliente"]), // "refrescarIndicadores","refrescarIndiProduccion"

      actualizarDependientes(){ 
        this.refrescarEstadoCuentaxCliente();      

      }
    },
  created() {
    this.listarClientes()
  
  },

}
</script>
