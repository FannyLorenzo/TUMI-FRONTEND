import axios from "axios";
import moment from 'moment'

export default{
  namespaced: true,
  state: {   
    indi_produccion: [], // los productos que contienen sacos
    indi_produccionOk: {data: null, categorias:null},

    dataSet: [[],[],[]],
    /* ejemplo de como se muestra
    dataSeries = [
  [{
      "date": "2014-01-01",
      "value": 20000000
    },
    {
      "date": "2014-01-02",
      "value": 10379978
    }],
    [{
      "date": "2014-01-01",
      "value": 20000000
    },
    {
      "date": "2014-01-02",
      "value": 10379978
    }]
    */ 
    ventasChart: {

        series: [{
            name: 'PRODUCT A',
            data: []
          }, {
            name: 'PRODUCT B',
            data: []
          }, {
            name: 'PRODUCT C',
            data: []
          }],

          chartOptions: {
            chart: {
              type: 'area',
              stacked: false,
              height: 350,
              zoom: {
                enabled: false
              },
            },
            dataLabels: {
              enabled: false
            },
            markers: {
              size: 0,
            },
            fill: {
              type: 'gradient',
              gradient: {
                  shadeIntensity: 1,
                  inverseColors: false,
                  opacityFrom: 0.45,
                  opacityTo: 0.05,
                  stops: [20, 100, 100, 100]
                },
            },
            yaxis: {
              labels: {
                  style: {
                      colors: '#8e8da4',
                  },
                  offsetX: 0,
                  formatter: function(val) {
                    return (val / 1000000).toFixed(2);
                  },
              },
              axisBorder: {
                  show: false,
              },
              axisTicks: {
                  show: false
              }
            },
            xaxis: {
              type: 'datetime',
              tickAmount: 8,
              min: new Date("01/01/2014").getTime(),
              max: new Date("01/20/2014").getTime(),
              labels: {
                  rotate: -15,
                  rotateAlways: true,
                  formatter: function(val, timestamp) {
                    return moment(new Date(timestamp)).format("DD MMM YYYY")
                }
              }
            },
            title: {
              text: 'Irregular Data in Time Series',
              align: 'left',
              offsetX: 14
            },
            tooltip: {
              shared: true
            },
            legend: {
              position: 'top',
              horizontalAlign: 'right',
              offsetX: -10
            }
          },
},
 

  },
  mutations: {
    updateChart(state) { // AQUI SE ESTÁ TRABAJNDO ESE GRAFICO
        let newData = [];
        let newNames = [];  
        let newCategories = [];
        state.indi_produccion= []; // los productos que contienen sacos
       
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
         
        
         
       },
  
},

  actions: {

    refrescarIndicadores({commit}){
      commit('actualizarIngresos');
      commit('actualizarHabilitaciones');
      commit('actualizarPagarVehiculos');
      commit('actualizarNroAgricultores');
      commit('actualizarMaquila')
    },
    

  },
  getters: {},
}
