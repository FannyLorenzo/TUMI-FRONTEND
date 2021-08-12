<template>
  <v-container fluid class="down-top-padding">
    <v-card class="mb-7">
      <v-card-text class="pa-5">
        <v-row justify="space-between">
          <v-col cols="8" lg="4">
            <v-text-field
              v-model="search"
              prepend-inner-icon="mdi-magnify"
              label="Search products"
              filled
              background-color="transparent"
              hide-details
            ></v-text-field>
          </v-col>
           <v-col cols="3" lg="4">
            <addProducto/>
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
import { mapState, mapMutations } from "vuex";

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
    
 //   productfilter: [],
   
  }),
  created(){
    this.listarProductos();
  },
  components:{
     addProducto:()=> import("@/views/productos/addProducto"),
  },
  methods: {
    ...mapMutations('auth', ['listarProductos']),

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
  
    ...mapState("auth", ["current_user","productfilter"]),
  

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