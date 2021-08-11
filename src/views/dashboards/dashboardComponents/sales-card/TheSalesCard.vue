<template>
  <v-row>
    <v-col cols="12" lg="6" class="py-0">
      <v-card class="mb-7">
        <div class="pa-5">
          <h4 class="font-weight-regular title">Venta de Arroz</h4>
          <div class="d-flex align-center mt-2">
            <div class="border-right px-3 py-2">
              <h6
                class="font-weight-light body-2 blue-grey--text text--lighten-2 font-weight-regular"
              >Mensualmente</h6>
              <span class="font-weight-medium">80.40%</span>
            </div>
            <div class="px-3 py-2">
              <h6
                class="font-weight-light blue-grey--text text--lighten-2 font-weight-regular body-2"
              >Diariamente</h6>
              <span class="font-weight-medium">20.40%</span>
            </div>
          </div>
        </div>

        <vue-apex-charts
          type="area"
          height="50px"
          :options="SalesCardsAChart.SalesChartA.chartOptions"
          :series="SalesCardsAChart.SalesChartA.series"
        ></vue-apex-charts>
      </v-card>
    </v-col>
    <v-col cols="12" lg="6" class="py-0">
      <v-card class="mb-7">
        <div class="pa-5">
          <h4 class="font-weight-regular title">Ventas de Ñelen</h4>
          <div class="d-flex align-center mt-2">
            <div class="border-right px-3 py-2">
              <h6
                class="font-weight-light body-2 blue-grey--text text--lighten-2 font-weight-regular"
              >Mensualmente</h6>
              <span class="font-weight-medium">80.40%</span>
            </div>
            <div class="px-3 py-2">
              <h6
                class="font-weight-light blue-grey--text text--lighten-2 font-weight-regular body-2"
              >Diariamente</h6>
              <span class="font-weight-medium">20.40%</span>
            </div>
          </div>
        </div>

        <vue-apex-charts
          type="area"
          height="50px"
          :options="SalesCardsBChart.SalesChartB.chartOptions"
          :series="SalesCardsBChart.SalesChartB.series"
        ></vue-apex-charts>
      </v-card>
    </v-col>
    <v-col cols="12" lg="6" class="py-0">
      <v-card class="mb-7">
        <div class="pa-5">
          <h4 class="font-weight-regular title">Ventas de Granillo</h4>
          <div class="d-flex align-center mt-2">
            <div class="border-right px-3 py-2">
              <h6
                class="font-weight-light body-2 blue-grey--text text--lighten-2 font-weight-regular"
              >Mensualmente</h6>
              <span class="font-weight-medium">60.40%</span>
            </div>
            <div class="px-3 py-2">
              <h6
                class="font-weight-light blue-grey--text text--lighten-2 font-weight-regular body-2"
              >Diariamente</h6>
              <span class="font-weight-medium">20.40%</span>
            </div>
          </div>
        </div>

        <vue-apex-charts
          type="area"
          height="50px"
          :options="SalesCardsCChart.SalesChartC.chartOptions"
          :series="SalesCardsCChart.SalesChartC.series"
        ></vue-apex-charts>
      </v-card>
    </v-col>
    <v-col cols="12" lg="6" class="py-0">
      <v-card class="mb-7">
        <div class="pa-5">
          <h4 class="font-weight-regular title">Ventas de Polvillo</h4>
          <div class="d-flex align-center mt-2">
            <div class="border-right px-3 py-2">
              <h6
                class="font-weight-light body-2 blue-grey--text text--lighten-2 font-weight-regular"
              >Mensualmente</h6>
              <span class="font-weight-medium">80.40%</span>
            </div>
            <div class="px-3 py-2">
              <h6
                class="font-weight-light blue-grey--text text--lighten-2 font-weight-regular body-2"
              >Diariamente</h6>
              <span class="font-weight-medium">20.40%</span>
            </div>
          </div>
        </div>

        <vue-apex-charts
          type="area"
          height="50px"
          :options="SalesCardsCChart.SalesChartC.chartOptions"
          :series="SalesCardsCChart.SalesChartC.series"
        ></vue-apex-charts>
      </v-card>
    </v-col>
  </v-row>
</template>

<script>
import VueApexCharts from "vue-apexcharts";
import SalesCardsAChart from "./SalesCardsAData";
import SalesCardsBChart from "./SalesCardsBData";
import SalesCardsCChart from "./SalesCardsCData";

export default {
  name: "TheSalesCard",
  data: () => ({
    SalesCardsAChart: SalesCardsAChart,
    SalesCardsBChart: SalesCardsBChart,
    SalesCardsCChart: SalesCardsCChart
  }),
  components: {
    VueApexCharts
  }
};
</script>