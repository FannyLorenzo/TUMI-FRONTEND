<template>
  <v-container fluid class="down-top-padding">
    <v-card class="mb-7">
      <v-card-text class="pa-5">
        <v-row justify="space-between">
          <v-col cols="12" lg="4">
            <v-text-field
              v-model="search"
              prepend-inner-icon="mdi-magnify"
              label="Search products"
              filled
              background-color="transparent"
              hide-details
            ></v-text-field>
          </v-col>
          
        </v-row>
      </v-card-text>
    </v-card>

    <v-row justify="center">
      <v-col cols="12" sm="6" lg="4" v-for="(producto, index) in productgrids" :key="index">
      
    <v-card
      :loading="loading"
      class="mx-auto my-12"
      max-width="374"
    >
      <template slot="progress">
        <v-progress-linear
          color="deep-purple"
          height="10"
          indeterminate
        ></v-progress-linear>
      </template>
  
      <v-img
        height="200"
        :src="producto.fotos"
      ></v-img>
  
      <v-card-title>{{producto.nombre}}</v-card-title>
  
      <v-card-text>
        <v-row
          align="center"
          class="mx-0"
        >
          <v-rating
            :value="producto.calificacion/producto.npersonas"
            color="amber"
            dense
            half-increments
            readonly
            size="14"
          ></v-rating>
  
          <div class="grey--text ms-4">
          {{producto.calificacion/producto.npersonas}} ({{producto.npersonas}})
          </div>
        </v-row>
  
        <div class="my-4 text-subtitle-1">
          <v-chip   class="ma-2" color="purple" label text-color="white" v-if="producto.unidad">
              <v-icon left> mdi-money </v-icon>
             {{producto.precio_tentativo}}</v-chip>
          
           <v-chip   class="ma-2" color="pink" label text-color="white" v-if="producto.unidad">
              <v-icon left> mdi-label </v-icon>
             {{producto.unidad}}</v-chip>
        </div>
  
        <div>{{producto.descripcion}}. última actualización {{producto.fecha}}</div>
      </v-card-text>
     
      <v-card-text>
        <v-chip-group
          v-model="selection"
          active-class="deep-purple accent-4 white--text"
          column
        >
          <v-chip color="green" v-if="producto.tags_var">{{producto.tags_tipo}}</v-chip>
  
          <v-chip color="orange" v-if="producto.tags_var">{{producto.tags_var}}</v-chip>
  
          <v-chip color="orange" v-if="producto.tags_cs" >            {{producto.tags_cs}}</v-chip>
          <v-chip color= "blue" v-if="producto.calidad">{{producto.calidad}}</v-chip>
  
          <v-chip v-if="producto.fecha" >{{producto.fecha}}</v-chip>
        </v-chip-group>
      </v-card-text>
  
      <v-card-actions>
        <v-btn
          color="deep-purple lighten-2"
          text
           @click="toDir(producto.usuario_id)" 
        >
          Ver datos de Productor
        </v-btn>
      </v-card-actions>
    </v-card>
 
      </v-col>
    </v-row>
  </v-container>
</template>


<script>

import axios from "axios";

export default {
  name: "productores",
  data: () => ({
    valid: true,
    dialog: false,
    search: "",

    loading: false,
    selection: 1,
  
    img: "/1.jpg",
    
    productfilter: [
{

"fotos":"https://mejorconsalud.as.com/wp-content/uploads/2015/08/comer-muchas-zanahorias-370x247.jpg",
"nombre":"Zanahorias",
"precio_tentativo":"S/ 30.00",
"descuento":"10%",
"unidad":"saco de 10 kg",
"descripcion":"Zanahorias frescas del valle de tambo señore!!",
"tags_tipo":"Vegetal",
"tags_var":"Zanahorias",
"tags_cs":"",
"calidad":"1ra",
"tag_temporada":"SI",
      "calificacion":4500,
      "npersonas":1000,
"fecha":"10/08/2021",

    },
{

"fotos":"data:image/jpeg;base64,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",
"nombre":"Alcachofas",
"precio_tentativo":"S/ 15.00",
"descuento":"10%",
"unidad":"saco de 10 kg",
"descripcion":"Zanahorias frescas del valle de tambo señore!!",
"tags_tipo":"Vegetal",
"tags_var":"Zanahorias",
"tags_cs":"",
"calidad":"1ra",
"tag_temporada":"SI",
      "calificacion":4500,
      "npersonas":1000,
"fecha":"10/08/2021",

    },

    ],
   
  }),
  created(){
    this.listar();
  },
  methods: {
    toDir(cod){      
       
      this.$router.push(
        {
          name: "Productores",
          params:{
            id: cod,
          }
        }     
      );
    },
     listar(){
      let my = this;                  
        axios.get("https://capacitacion-docente.herokuapp.com/products/").then(function(response){
       console.log("datadata "+response.data.data);
       my.productfilter = response.data.data;
       console.log("entro okii");
          console.log(my.options);
          
          })
        .catch(err => {
          console.log(err.response.data)
        });
    },
    reserve () {
      this.loading = true

      setTimeout(() => (this.loading = false), 2000)
    },

    //filtros
    filterListaName(item) {
       return item.AGR_NOM_COMPLETO.toLowerCase().includes(this.listaName.toLowerCase());
     },
     filterCalories(item) {
       return item.LT_NOMBRE.toString().toLowerCase().includes(this.calories.toLowerCase());
     },
     filterFat(item) {
       return item.PROD_FECHA_PROD.toString().includes(this.fat);
     },

     filterStartDate(item){
       return item.PROD_FECHA_PROD >= this.startDate;

     },
     filterEndDate(item){

       return item.PROD_FECHA_PROD <= this.endDate +1;

     },

  },
  computed: {
    events() {
      return this.$store.state.productEvents;
    },
   
    productgrids() {
      return this.productfilter.filter(
        productgrid =>
          productgrid.nombre
            .toLowerCase()
            .includes(this.search.toLowerCase()) ||
          productgrid.tags_tipo.toLowerCase().includes(this.search.toLowerCase())
      );
    },
      filteredLista() {
      
      let conditions = [];
      
      if (this.listaName) {
        conditions.push(this.filterListaName);
      }
      
      if (this.calories) {
        conditions.push(this.filterCalories);
      }
      
      if (this.fat) {
        conditions.push(this.filterFat);
        console.log("haber "+this.fat);
      }
      if (this.startDate) {
        conditions.push(this.filterStartDate);
        console.log("sdate "+this.startDate);
     }
      if (this.endDate) {
        conditions.push(this.filterEndDate);
        console.log("edate "+this.endDate);
      }
      
      if (conditions.length > 0) {
        return this.lista.filter((lista) => {
          return conditions.every((condition) => {
            return condition(lista);
          })
        })
      }
      
      return this.lista;
    }
  }
};
</script>