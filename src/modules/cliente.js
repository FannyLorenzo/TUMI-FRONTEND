import axios from "axios";

export default{
  namespaced: true,

  state: { 
    clienteSeleccionado: { CLI_COD: null,  nombreCompleto:""},
    estadosCuentaxCliente:[],
    op_clientesNyA: [""], 
      

  },
  mutations: {
    listarClientes(state) {
        axios
          .get("cli/list/")
          .then(function (response) {
            state.op_clientesNyA = response.data;
            console.log(state.op_clientesNyA);
          })
          .catch(function (err) {
            console.log(err.response.data);
          });
      }, //fin listar

    actualizarEstadoCuentaxCliente(){
        //estadosCuentaxCliente
        state.estadosCuentaxCliente= []; // los productos que contienen sacos
        if (
          state.clienteSeleccionado.CLI_COD != undefined &&
          state.clienteSeleccionado.CLI_COD != null
        ) { 
       axios
          .get("cli/list/")
          .then(function (response) {
            state.estadosCuentaxCliente = response.data;    
            //newData = state.indi_produccion.map((item) => item.TOTAL);
          })
          .catch(err =>{
            console.log(err);
          });
        } else {}
      },

        // para cliente
     SET_CLIENTE(state, payload) {
        state.clienteSeleccionado = payload;
      },

  },
  actions: {  
    listarClientes({commit}){
        commit('listarClientes')
      },

    refrescarEstadoCuentaxCliente({commit}){
        commit('actualizarEstadoCuentaxCliente');
      },  

  },
  getters: {

  },
}