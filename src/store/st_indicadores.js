import Vue from "vue";
import Vuex from "vuex";
import axios from "axios";

Vue.use(Vuex);

export default new Vuex.Store({
  state: {   
    indi_produccion: [], // los productos que contienen sacos
    indi_produccionOk: {data: null, categorias:null},
    barChart: {
    chartOptions: {
      chart: {
        id: 'vuechart-example',
      },
      xaxis: {
        categories: [1991, 1992, 1993, 1994, 1995, 1996, 1997, 1998],
      },
    },
    series: [{
      name: 'Total KIlogramos',
      data: [30, 40, 45, 50, 49, 60, 70, 81]
    }],
},

    barChart: {
      series: [{
          data: [],
          
      }],

      chartOptions: {
          chart: {
              width: '100%',
              height: 350
          },
          colors: ['#1e88e5', '#00acc1', '#fc4b6c', '#7460ee', '#1d2126'],
          plotOptions: {
              bar: {
                  horizontal: true,
              },

          },

          dataLabels: {
              enabled: false
          },
          xaxis: {
              categories: [],
              labels: {
                  style: {
                      cssClass: 'grey--text lighten-2--text fill-color',
                  }
              },
          },
          yaxis: {
              labels: {
                  style: {
                      cssClass: 'grey--text lighten-2--text fill-color',
                  }
              },
          },
          grid: {
              borderColor: 'rgba(0,0,0,0.1)'
          },
          tooltip: {
              theme: "dark"
          }
      }
  },

    op_agricultores: [],
    op_agricultoresNyA: [""],

    // dato globalito
    vehiculoSeleccionado: { TR_VEH_COD: null,  placa_propietario:""},
    op_vehiculos: [], //vehiculos
    op_vehiculosOk: [""], // vehiculos

    codigosSeleccionados: [],  

  },
  mutations: {
    updateChart(state) {
      let newData = [];
      let newCategories = [];
      const colors = ['#008FFB', '#00E396', '#FEB019', '#FF4560', '#775DD0']


     state.indi_produccion= []; // los productos que contienen sacos
     if (
       state.agricultorSeleccionado.AGR_COD === undefined ||
       state.agricultorSeleccionado.AGR_COD === null
     ) { 
    axios
       .get("indi/produccion/")
       .then(function (response) {
         state.indi_produccion = response.data;    
         console.log("ok desde total "+ state.indi_produccion); 
         newData = state.indi_produccion.map((item) => item.TOTAL);
      console.log("new data  "+newData);
      newCategories = state.indi_produccion.map((item) => item.PRODUCTO_DESCRIPCION);
      console.log("new cat  "+newCategories);       
      // console.log("ok desde "+state.barChart.series[0].data + " options "+ state.barChart.chartOptions.xaxis.categories);
       
      state.chartOptions = {
        chart: {
          id: 'vuechart-example',
        },
        colors: [colors[Math.floor(Math.random()*colors.length)]],
        xaxis: {
          categories: newCategories,
        },
      };
      // In the same way, update the series option
      state.series = [{
        name : " Total Kilogramos producción (Kg) ",
       data: newData
    }]

       })
       .catch(err =>{
         console.log(err);
       });
     } else {
       axios
         .get("indi/produccionAgr/" + state.agricultorSeleccionado.AGR_COD + "/")
         .then(function (response) {
           state.indi_produccion = response.data;
           console.log("ok desde agr "+ state.indi_produccion); 
            newData = state.indi_produccion.map((item) => item.TOTAL);
      console.log("new data  "+newData);
       newCategories = state.indi_produccion.map((item) => item.PRODUCTO_DESCRIPCION);
      console.log("new cat  "+newCategories);  
           
      //   console.log("ok desde "+state.barChart.series[0].data + " options "+ state.barChart.chartOptions.xaxis.categories);
              
      state.chartOptions = {
        chart: {
          id: 'vuechart-example',
        },
        colors: [colors[Math.floor(Math.random()*colors.length)]],
        xaxis: {
          categories: newCategories,
        },
      };
      // In the same way, update the series option
      state.series = [{
        name : " Total Kilogramos producción (Kg) ",
       data: newData
    }]
         })
         .catch(err =>{
           console.log(err);
         });
     }
     
      
    },

    waa(state){
      state.$apexcharts.exec('vuechart-example', 'updateSeries', [{
        data: [100, 55, 65, 11, 23, 44, 54, 33]
      }])
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
            state.indicadores.total_ingresos = response.data.TOTAL + " Kg.";
            console.log(response.data);
          })
          .catch(function (err) {
            console.log(err);
          });
      } else {
        axios
          .get("agr/totalingreso/" + state.agricultorSeleccionado.AGR_COD + "/")
          .then(function (response) {
            state.indicadores.total_ingresos = response.data.TOTAL + " Kg.";
            console.log(response.data);
          })
          .catch(function (err) {
            console.log(err);
          });
      }
 

   },
   actualizarHabilitaciones(state){  
    if (
      state.agricultorSeleccionado.AGR_COD === undefined ||
      state.agricultorSeleccionado.AGR_COD === null
    ) { 
   axios
      .get("hab/totalHab/")
      .then(function (response) {
        state.indicadores.total_habilitaciones = " S/ "+response.data.TOTAL + "";
        console.log(response.data);
      })
      .catch(function (err) {
        console.log(err);
      });
    } else {
      axios
        .get("agr/totalHabAgr/" + state.agricultorSeleccionado.AGR_COD + "/")
        .then(function (response) {
          state.indicadores.total_habilitaciones = " S/ "+response.data.TOTAL + "";
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
    state.indicadores.total_pagos_vehiculos = "S/ "+response.data.TOTAL;
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
    state.indicadores.total_pagos_vehiculos = "S/ "+response.data.TOTAL;
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
      state.indicadores.total_maquila = " S/ "+response.data.TOTAL + "";
      console.log(response.data);
    })
    .catch(function (err) {
      console.log(err);
    });
  } else {
    axios
      .get("part/totalAgr/" + state.agricultorSeleccionado.AGR_COD + "/")
      .then(function (response) {
        state.indicadores.total_maquila = " S/ "+response.data.TOTAL + "";
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
        state.indicadores.total_agricultores = " "+response.data.TOTAL + "";
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
    listarAgricultores({commit}){
      commit('listarAgricultores')
    },
    listarVehiculos({commit}){
      commit('listarVehiculos')
    },


  },
  getters: {},
});
