<template>
  <v-card class="mb-7">
    <v-toolbar flat>
      <v-toolbar-title>Total ventas por variedad de Arroz</v-toolbar-title>
    </v-toolbar>
    <v-divider></v-divider>
    <div class="mt-4 pa-4">
      <div>
        <apexchart
          type="area"
          height="350"
          :options="chartOptions"
          :series="series"
        ></apexchart>
      </div>
    </div>
  </v-card>
</template>

<script>
import axios from "axios";
import moment from "moment";
//import { mapState, mapActions } from "vuex";
//import VueApexCharts from "vue-apexcharts" ;

export default {
  name: "graf_ventas",

  data: () => ({
    // datos
    data: [],
    fecha_inicio: "",
    fecha_fin: "",

    dataSet: [], // numeros finales - esto se grafica
    dataSeries: [], // varias variedades [ [],[],[] ] - solo es totales por variedad

    series: [
      {
        name: "VARIEDAD A",
        data: [],
      },
      {
        name: "VARIEDAD B",
        data: [],
      }
      
    ],

    chartOptions: {
      chart: {
        type: "area",
        stacked: true,
        height: 350,
        zoom: {
          enabled: true,
        },
      },
      dataLabels: {
        enabled: false,
      },
      markers: {
        size: 0,
      },
      fill: {
        type: "gradient",
        gradient: {
          shadeIntensity: 1,
          inverseColors: false,
          opacityFrom: 0.45,
          opacityTo: 0.05,
          stops: [20, 100, 100, 100],
        },
      },
      yaxis: {
        labels: {
          style: {
            colors: "#8e8da4",
          },
          offsetX: 0,
          formatter: function (val) {
            return val.toLocaleString(undefined, {maximumFractionDigits:2});
          },
        },
        axisBorder: {
          show: false,
        },
        axisTicks: {
          show: false,
        },
      },
      xaxis: {
        type: "datetime",
        tickAmount: 8,
        min: new Date().getTime(), // cambbia con la actualización de fechas
        max: new Date().getTime(),
        labels: {
          rotate: -15,
          rotateAlways: true,
          formatter: function (val, timestamp) {
            return moment(new Date(timestamp)).format("DD MMM YYYY");
          },
        },
      },
      title: {
        text: "Evolución de ventas - anual",
        align: "left",
        offsetX: 14,
      },
      tooltip: {
        shared: true,
      },
      theme: {mode: 'dark', palette: 'palette1'},
      legend: {
        position: "top",
        horizontalAlign: "right",
        offsetX: -10,
      },
    },

  }),
  created() {
    // this.refrescarIndiProduccion();
   this.fechas_actuales();
    this.recuperarDataset();
  },
  computed: {
    // ...mapState(["barChart","series", "chartOptions"]),
  },

  methods: {
    //  ...mapActions(["refrescarIndiProduccion"]),

    fechas_actuales() {
      // FECHA VALIDA QUE TRANSFORMA "2018-01-30" A time ok, new Date(new Date("2018-01-30".replace('-','/')).getTime())
      let state = this;
      const g = new Date();
      let anio = g.getFullYear();
      let mes = g.getMonth() + 1;
      let dia = g.getDate();

      this.fecha_inicio = anio - 1 + "/" + mes + "/" + dia;
     // this.fecha_inicio = "2021/07/17";
      this.fecha_fin = anio + "/" + mes + "/" + (dia+1);
     // let fechita = new Date(this.fecha_inicio).getTime(); //this.fecha_inicio.getTime();


      console.log(
        "fecha ini: " + this.fecha_inicio + " fecha fin: " + this.fecha_fin
      );
      
      state.chartOptions = {...state.chartOptions, ...{ 
        xaxis: {
        type: "datetime",
        tickAmount: 8,
        min: new Date(this.fecha_inicio).getTime(),
        max: new Date(this.fecha_fin).getTime(),
        labels: {
          rotate: -15,
          rotateAlways: true,
          formatter: function (val, timestamp) {
            return moment(new Date(timestamp)).format("DD MMM YYYY");
          },
        },
      },} };
       
    },
    mostrarData(data){
      var msg = "";
      console.log("entro a: ");
      for(let i=0 ; i<data.size; i++){
        msg +="[";
        for(let j=0 ; j<data[i].size; j++){
          
            msg +=" "+data[i][j];
        
      
        }
       msg +="], ";

     } 
     console.log("ojo: "+msg);
     },
    recuperarDataset() {
       let state = this;  
      let newData = [];
      let newNames = []; 
      state.data = [];

   
      axios
        .get("vent/anual/") //vent/anual/
        .then(function (response) {
          state.data = response.data;    
          console.log("data " + state.data);

          // VARIEDADES
          let pas = 0;
          Object.values(state.data).map((item) => { //mapeo cada DIA
            Object.values(item).map((ele) => { //variedades de cada DIA
              if (newNames.includes(ele.VARIEDAD)) {
                console.log("repetido");
              } else {
                newNames[pas] = ele.VARIEDAD;
                pas++;
              }
            });
          });

          console.log("variedades " + newNames);

          // DATASERIES
         newData = newNames.map((vari) => {
           const container = {};
           container['name'] = vari;
           let cadena=[];          
           let incidencia = 0;
           const g = new Date();
            let anio = g.getFullYear();
            let mes = g.getMonth() + 1;
            let dia = g.getDate();
            let fechis = anio - 1 + "/" + mes + "/" + dia;

          let fechita = new Date(fechis).getTime(); //this.fecha_inicio.getTime();
            console.log("variedad  fechita: "+vari+" - "+fechita);
           Object.values(state.data).map((item) => {
              Object.values(item).map((ele) => {
                     
                    if(ele.VARIEDAD===vari){
                      fechita = new Date(ele.FECHA).getTime()+86400000;              
                      cadena.push([fechita, ele.TOTAL]);
                      console.log("["+fechita+", "+ele.TOTAL+"]" + incidencia); 
                      incidencia++;
                    }  
                    /*           

                    if(incidencia<=0){ // si no se encuentra en la lista, el envase requerido, 0
                      cadena.push([fechita, 0]); 
                      console.log("["+fechita+", "+0+"]"); 
                    }*/
                  fechita = fechita + 86400000; //se aumenta un dia
              }); //fin items data
            }); //fin data
              
            if(cadena!=null)
            container['data'] = cadena; //THIS

          return container;
          }); //fin variedades

          console.log("newdata: "+newData);
          // ACTUALZACIÓN DE VALORES A GRÁFICA
       // state.chartOptions = {...state.chartOptions, ...{ xaxis: {categories: newCategories,}} };
        state.series =  Object.values(newData).map(item => item);
                  
         
        })
        .catch((err) => {
          console.log(err);
        });
    },
  },
};
</script>


