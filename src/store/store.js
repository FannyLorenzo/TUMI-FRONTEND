import Vue from "vue";
import Vuex from "vuex";
import axios from "axios";

//modulos importados
import st_ventas from "./store_ventas"
import auth from "@/store/auth.js"

Vue.use(Vuex);

export default new Vuex.Store({
  state: {
// datos de usuario

accessToken: null,
loggingIn: false,
loginError: null,

id_actual:null,
usuario_actual:[],

SET_USUARIO_ACTUAL(state, payload) {
  state.usuario_actual = payload;
},



    Sidebar_drawer: null,
    Customizer_drawer: false,
    SidebarColor: "white", //Change Sidebar Color || 'white', | "#2b2b2b" | "rgb(44, 59, 164)" | "rgb(96, 44, 164)" | "rgb(151, 210, 219)" | "rgb(77, 86, 100)"
    SidebarBg: "",
    navbarColor: "primary",
    setHorizontalLayout: false, // Horizontal layout

    // dato globalito
    agricultorSeleccionado: { AGR_COD: null,  nombreCompleto:""},
    clienteSeleccionado: { CLI_COD: null,  nombreCompleto:""},
    estadosCuentaxCliente:[],
    
    //indicadores
    indicadores: { 
      total_ingresos : 0,
       total_habilitaciones : 0,
        total_pagos_vehiculos: 0,
         total_agricultores : 0,
          total_maquila:0,          
        },
    indi_produccion: [], // los productos que contienen sacos
    indi_produccionOk: [], //{data: null, categorias:null},

    total_ventas:0,
  //fin indicadores


    colors : ['#008FFB', '#00E396', '#FEB019', '#FF4560', '#775DD0'],

    chartOptions: {
      theme: {mode: 'dark', palette: 'palette1'},
      plotOptions: { bar: { horizontal: false, borderRadius: 10} } ,        
      
      chart: {
        id: 'ind_produccion',
        type: 'bar',
        height: 350,
        stacked: true,
        toolbar: {
          show: true
        },
        zoom: {
          enabled: true
        }
      },
      legend: {
        position: 'right',
        offsetY: 40
      },
      fill: {
        opacity: 1
      }  ,    
      xaxis: {
        categories: []
      }              
               
      
    },
    
    series: [{
      name: 'Total sacos',
      data: []
    }],

    op_agricultores: [],
    op_agricultoresNyA: [""],

    // dato globalito
    vehiculoSeleccionado: { TR_VEH_COD: null,  placa_propietario:""},
    op_vehiculos: [], //vehiculos
    op_vehiculosOk: [""], // vehiculos

    op_clientes: [],
    op_clientesNyA: [""], // este se utiliza de nombres
    
    codigosSeleccionados: [],  

  },
  mutations: {
    // usuario
    loginStop: (state, errorMessage) => {
      state.loggingIn = false;
      state.loginError = errorMessage;
    },
    updateAccessToken: (state, accessToken) => {
      state.accessToken = accessToken;
    },

    // fin usuario

    actualizarEstadoCuentaxCliente(state){
      //estadosCuentaxCliente
      state.estadosCuentaxCliente= []; // los productos que contienen sacos
      if (
        state.clienteSeleccionado.CLI_COD != undefined &&
        state.clienteSeleccionado.CLI_COD != null
      ) { 
     axios
        .get("dcue/listClie/"+state.clienteSeleccionado.CLI_COD+"/") // aqui cambiar dcue/listEst/1/       dcue/listClie/1/
        .then(function (response) {
          state.estadosCuentaxCliente = response.data;    
          //newData = state.indi_produccion.map((item) => item.TOTAL);
        })
        .catch(err =>{
          console.log(err);
        });
      } else {
        console.log("No se ha seleccionado cliente");
      }
    },


    updateChartOk(state) {
      let newData = [];
      let newCategories = [];   
      state.indi_produccion= []; // los productos que contienen sacos
      if (
        state.agricultorSeleccionado.AGR_COD === undefined ||
        state.agricultorSeleccionado.AGR_COD === null
      ) { 
     axios
        .get("indi/produccion/")
        .then(function (response) {
          state.indi_produccion = response.data;    
          newData = state.indi_produccion.map((item) => item.TOTAL);
          newCategories = state.indi_produccion.map((item) => item.PRO_DESCRIPCION);
 
         state.chartOptions = {...state.chartOptions, ...{ xaxis: {categories: newCategories}} };
         state.series = [{ name: 'Total sacos', data: newData }]
 
        })
        .catch(err =>{
          console.log(err);
        });
      } else {
        axios
          .get("indi/produccionAgr/" + state.agricultorSeleccionado.AGR_COD + "/")
          .then(function (response) {
            state.indi_produccion = response.data;
            newData = state.indi_produccion.map((item) => item.TOTAL);
            newCategories = state.indi_produccion.map((item) => item.PRO_DESCRIPCION);
 
           state.chartOptions = {...state.chartOptions, ...{ xaxis: {categories: newCategories,}} };
           state.series = [{ name: 'Total sacos', data: newData }]
 
          })
          .catch(err =>{
            console.log(err);
          });
      }
       
     },
    updateChart(state) { // AQUI SE ESTÁ TRABAJNDO ESE GRAFICO
     let newData = [];
     let newNames = [];  
     let newCategories = [];
     state.indi_produccion= []; // los productos que contienen sacos
     if (
       state.agricultorSeleccionado.AGR_COD === undefined ||
       state.agricultorSeleccionado.AGR_COD === null
     ) { 
    axios
       .get("indi/produccionEnv/")
       .then(function (response) {
         state.indi_produccion = response.data; 
       
         newCategories = Object.values(state.indi_produccion).map((item) => item.PRO_DESCRIPCION);
         
         //rellenar newNames
         let pas=0;
         Object.values(state.indi_produccion).map((item) => {
           
          item.ENVASES.map((it) => {
            if(newNames.includes(it)){
              console.log("repetido");
              }else{
              newNames[pas] = it;
              pas++;
            }

          });
        
        });
        // rellenar cadena de datos asociados a un envase
          newData = newNames.map(item => { // para cada ENVASE
           const container = {};
           container['name'] = item;
          let cadena=[];          
          let incidencia = 0;
          Object.values(state.indi_produccion).forEach(function (elem) { // CADA PRODUCTO
            let index=-1;
            
            incidencia = 0; // este es importante :)
         elem.ENVASES.map(item2 => { // se revisa de la lista de envases de cada producto
            index++; 
            if(item2===item){              
              cadena.push(elem.DATA[index]); 
              incidencia++;
             // return;

            }//return item2
          });

            if(incidencia<=0){ // si no se encuentra en la lista, el envase requerido, 0
              cadena.push(0); 
            }
          
          }); //FIN INDI
           
         if(cadena!=null)
            container['data'] = cadena; //THIS

          return container;
          }         
          ); 
      
        // ACTUALZACIÓN DE VALORES A GRÁFICA
        state.chartOptions = {...state.chartOptions, ...{ xaxis: {categories: newCategories,}}};
        state.series =  Object.values(newData).map(item => item);
        
  
       })
       .catch(err =>{
         console.log(err);
       });
     } else {
       axios
         .get("indi/produccionAgrEnv/" + state.agricultorSeleccionado.AGR_COD + "/")
         .then(function (response) {
          state.indi_produccion = response.data; 
       
         newCategories = Object.values(state.indi_produccion).map((item) => item.PRO_DESCRIPCION);
         
         //rellenar newNames
         let pas=0;
         Object.values(state.indi_produccion).map((item) => {
           
          item.ENVASES.map((it) => {
            if(newNames.includes(it)){
              console.log("repetido");
              }else{
              newNames[pas] = it;
              pas++;
            }

          });
        
        });
        // rellenar cadena de datos asociados a un envase
          newData = newNames.map(item => { // para cada ENVASE
           const container = {};
           container['name'] = item;
          let cadena=[];          
          let incidencia = 0;
          Object.values(state.indi_produccion).forEach(function (elem) { // CADA PRODUCTO
            let index=-1;
            

         elem.ENVASES.map(item2 => { // se revisa de la lista de envases de cada producto
            index++; 
            if(item2===item){              
              cadena.push(elem.DATA[index]); 
              incidencia++;
              return;

            }return item2
          });

            if(incidencia<=0){ // si no se encuentra en la lista, el envase requerido, 0
              cadena.push(0); 
            }
          
          }); //FIN INDI
           
         if(cadena!=null)
            container['data'] = cadena; //THIS

          return container;
          }         
          ); 
      
        // ACTUALZACIÓN DE VALORES A GRÁFICA
        state.chartOptions = {...state.chartOptions, ...{ xaxis: {categories: newCategories,}} };
        state.series =  Object.values(newData).map(item => item);
        
  
       })
         .catch(err =>{
           console.log(err);
         });
     }
     
      
    },
    
    SET_SIDEBAR_DRAWER(state, payload) {
      state.Sidebar_drawer = payload;
    },
    SET_CUSTOMIZER_DRAWER(state, payload) {
      state.Customizer_drawer = payload;
    },
    SET_SIDEBAR_COLOR(state, payload) {
      state.SidebarColor = payload;
    },
    SET_NAVBAR_COLOR(state, payload) {
      state.navbarColor = payload;
    },
    SET_LAYOUT(state, payload) {
      state.setHorizontalLayout = payload;
    },

    // para agricultorrr
    SET_AGRICULTOR(state, payload) {
      state.agricultorSeleccionado = payload;
    },
     // para cliente
     SET_CLIENTE(state, payload) {
      state.clienteSeleccionado = payload;
    },

    // para placas en pagos de transporte
      SET_PLACA(state, payload) {
        state.vehiculoSeleccionado = payload;
     },
    // para placas en pagos de transporte
    SET_CONJUNTO(state, payload) {
      state.codigosSeleccionados = payload;
   },
   SET_INDICADORES(state, payload) {
    state.indicadores = payload;
 },

   actualizarIngresos(state){
      if (
        state.agricultorSeleccionado.AGR_COD === undefined ||
        state.agricultorSeleccionado.AGR_COD === null
      ) {
        axios
          .get("cas/total/")
          .then(function (response) {
            state.indicadores.total_ingresos = 
            response.data.TOTAL.toLocaleString(undefined, {maximumFractionDigits:2}) + " Kg.";
            console.log(response.data);
          })
          .catch(function (err) {
            console.log(err);
          });
      } else {
        axios
          .get("agr/totalingreso/" + state.agricultorSeleccionado.AGR_COD + "/")
          .then(function (response) {
            state.indicadores.total_ingresos = 
            response.data.TOTAL.toLocaleString(undefined, {maximumFractionDigits:2}) + " Kg.";
            console.log(response.data);
          })
          .catch(function (err) {
            console.log(err);
          });
      }
 

   },

   actualizarVentas(state){
    if (
      state.clienteSeleccionado.CLI_COD === undefined ||
      state.clienteSeleccionado.CLI_COD === null
    ) {
      axios
        .get("vent/total/")
        .then(function (response) {
          state.total_ventas = " S/ "+ 
          response.data.TOTAL.toLocaleString(undefined, {maximumFractionDigits:2}) + "";
          console.log(response.data);
        })
        .catch(function (err) {
          console.log(err);
        });
    } else {
      axios
        .get("vent/total/" + state.clienteSeleccionado.CLI_COD + "/")
        .then(function (response) {
          state.total_ventas = + " S/."+
          response.data.TOTAL.toLocaleString(undefined, {maximumFractionDigits:2}) + "" ;
          console.log(response.data);
        })
        .catch(function (err) {
          console.log(err);
        });
    }


 },
   showNumber(x) { // .toFixed(2) solo para 2 decimales dado un num
    return x.toLocaleString(undefined, {maximumFractionDigits:2}); 
},
   actualizarHabilitaciones(state){  
    if (
      state.agricultorSeleccionado.AGR_COD === undefined ||
      state.agricultorSeleccionado.AGR_COD === null
    ) { 
   axios
      .get("hab/totalHab/")
      .then(function (response) {
        state.indicadores.total_habilitaciones = " S/ "+
        response.data.TOTAL.toLocaleString(undefined, {maximumFractionDigits:2}) + "";
        console.log(response.data);
      })
      .catch(function (err) {
        console.log(err);
      });
    } else {
      axios
        .get("agr/totalHabAgr/" + state.agricultorSeleccionado.AGR_COD + "/")
        .then(function (response) {
          state.indicadores.total_habilitaciones = " S/ "+
          response.data.TOTAL.toLocaleString(undefined, {maximumFractionDigits:2}) + "";
          console.log(response.data);
        })
        .catch(function (err) {
          console.log(err);
        });
    }
},
 actualizarPagarVehiculos(state){      
 
  //state.codigosSeleccionados =[];
 if(state.vehiculoSeleccionado.TR_VEH_COD === undefined || state.vehiculoSeleccionado.TR_VEH_COD === null){
    axios
   .get("pve/totalPorPagar/")
   .then(function (response) {
    state.indicadores.total_pagos_vehiculos = "S/ "+
    response.data.TOTAL.toLocaleString(undefined, {maximumFractionDigits:2});
     console.log(response.data);
   })
   .catch(function (err) {
     console.log(err);
   });

 }
 
 else{
 axios
   .get("pve/PorPagarVeh/"+state.vehiculoSeleccionado.TR_VEH_COD+"/")
   .then(function (response) {
    state.indicadores.total_pagos_vehiculos = "S/ "+
    response.data.TOTAL.toLocaleString(undefined, {maximumFractionDigits:2});
     console.log(response.data);
   })
   .catch(function (err) {
     console.log(err);
   });
 }
 // limpiar lista de seleccionados


},
actualizarMaquila(state){      
  if (
    state.agricultorSeleccionado.AGR_COD === undefined ||
    state.agricultorSeleccionado.AGR_COD === null
  ) { 
 axios
    .get("part/total/")
    .then(function (response) {
      state.indicadores.total_maquila = " S/ "+
      response.data.TOTAL.toLocaleString(undefined, {maximumFractionDigits:2}) + "";
      console.log(response.data);
    })
    .catch(function (err) {
      console.log(err);
    });
  } else {
    axios
      .get("part/totalAgr/" + state.agricultorSeleccionado.AGR_COD + "/")
      .then(function (response) {
        state.indicadores.total_maquila = " S/ "+
        response.data.TOTAL.toLocaleString(undefined, {maximumFractionDigits:2}) + "";
        console.log(response.data);
      })
      .catch(function (err) {
        console.log(err);
      });
  }
},


 
 actualizarNroAgricultores(state){    
   axios
      .get("agr/total/")
      .then(function (response) {
        state.indicadores.total_agricultores = " "+
        response.data.TOTAL.toLocaleString(undefined, {maximumFractionDigits:2}) + "";
        console.log(response.data);
      })
      .catch(function (err) {
        console.log(err);
      });
},


listarAgricultores(state) {
  axios
    .get("agr/list/")
    .then(function (response) {
      state.op_agricultores = response.data;
      for (let i = 0; i < state.op_agricultores.length; i++) {
        state.op_agricultoresNyA.push({
          nombreCompleto:
            state.op_agricultores[i].AGR_NOM +
            " " +
            state.op_agricultores[i].AGR_APE,
          AGR_COD: state.op_agricultores[i].AGR_COD,
        });
      }
      console.log(state.op_agricultoresNyA);
    })
    .catch(function (err) {
      console.log(err.response.data);
    });
}, //fin listar
listarClientes(state) {
  axios
    .get("cli/list/")
    .then(function (response) {
      state.op_clientesNyA = response.data;//.map((item) => item.CLI_NOM + " "+item.CLI_APE );
      console.log(state.op_clientesNyA);
    })
    .catch(function (err) {
      console.log(err.response.data);
    });
}, //fin listar
listarVehiculos(state) {
  axios
    .get("veh/list/")
    .then(function (response) {
      state.op_vehiculos = response.data;
      for (let i = 0; i < state.op_vehiculos.length; i++) {
          state.op_vehiculosOk.push({ 
          placa_propietario : state.op_vehiculos[i].TR_VEH_PLA +" " +
          state.op_vehiculos[i].TR_VEH_PROPIETARIO,
          TR_VEH_COD: state.op_vehiculos[i].TR_VEH_COD
          }
        );
      }
      console.log(state.op_vehiculosOk);
    })
    .catch(function (err) {
      console.log(err.response.data);
    });
}, //fin listar
},

  actions: {

    refrescarEstadoCuentaxCliente({commit}){
      commit('actualizarEstadoCuentaxCliente');
    },

    refrescarIndicadores({commit}){
      commit('actualizarIngresos');
      commit('actualizarHabilitaciones');
      commit('actualizarPagarVehiculos');
      commit('actualizarNroAgricultores');
      commit('actualizarMaquila')

    },
    refrescarIndiProduccion({commit}){
     // commit('actualizarProduccion')
     commit('updateChart')

    },
    refrescarVentas({commit}){
      // commit('actualizarProduccion')
      commit('actualizarVentas')
 
     },

    refrescarIngresos({commit}){
      commit('actualizarIngresos')
    },
    refrescarHabilitaciones({commit}){
      commit('actualizarHabilitaciones')
    },
    refrescarPagarVehiculos({commit}){
      commit('actualizarPagarVehiculos')      
    },
    refrescarMaquila({commit}){
      commit('actualizarMaquila')
    },
    refrescarNroAgricultores({commit}){
      commit('actualizarNroAgricultores')
    },
    listarAgricultores({commit}){
      commit('listarAgricultores')
    },
    listarClientes({commit}){
      commit('listarClientes')
    },
    listarVehiculos({commit}){
      commit('listarVehiculos')
    },


  },
  getters: {},
  modules: {
    st_ventas,
    auth

  }
});
