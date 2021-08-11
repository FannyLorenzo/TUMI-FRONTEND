<template>
  <div>
    <form-wizard
      @on-complete="onComplete"
      color="#1e88e5"
      :title="null"
      :subtitle="null"
      stepSize="sm"
    >
      <tab-content title="Datos de Agricultor" icon="ti-user">
        <v-row>
          <v-col cols="12" lg="12" sm="12">
            <v-row class="mt-4">
              <v-col
                lg="3"
                sm="4"
                cols="12"
                class="d-flex align-center justify-start justify-md-end py-0"
              >
                <label class="text-truncate mb-0">First Name :</label>
              </v-col>
              <v-col lg="9" cols="12" sm="8" class="py-0">
                <v-text-field
                  placeholder="Nombres"
                  v-model="project1"
                  class="mt-0"
                  hide-details
                ></v-text-field>
              </v-col>
            </v-row>
            <v-row class="mt-4">
              <v-col
                lg="3"
                cols="12"
                sm="4"
                class="d-flex align-center justify-start justify-md-end py-0"
              >
                <label class="text-truncate mb-0">Last Name :</label>
              </v-col>
              <v-col lg="9" cols="12" sm="8" class="py-0">
                <v-text-field
                  placeholder="Apellidos"
                  v-model="project2"
                  class="mt-0"
                  hide-details
                ></v-text-field>
              </v-col>
            </v-row>
          </v-col>
          
        </v-row>
      </tab-content>
      <tab-content title="Datos del Arroz cáscara" icon="ti-settings">
        <v-row>
          <v-col lg="4" cols="12" sm="4">
            <v-row class="mt-4">
              <v-col
                lg="3"
                cols="12"
                sm="4"
                class="d-flex align-center justify-start justify-md-end py-0"
              >
                <label class="text-truncate mb-0">Variedad :</label>
              </v-col>
              <v-col lg="9" cols="12" sm="8" class="py-0">
                <v-select :items="items2" filled v-model="projectselect7" class="mt-0" hide-details></v-select>
              </v-col>
            </v-row>
            <v-row class="mt-4">
              <v-col
                lg="3"
                cols="12"
                sm="4"
                class="d-flex align-center justify-start justify-md-end py-0"
              >
                <label class="text-truncate mb-0">Zona :</label>
              </v-col>
              <v-col lg="9" cols="12" sm="8" class="py-0">
                <v-select :items="items" filled v-model="projectselect6" class="mt-0" hide-details></v-select>
              </v-col>
            </v-row>
          </v-col>
          <v-col lg="4" cols="12" sm="4">
            
            <v-row class="mt-4">
              <v-col
                lg="3"
                cols="12"
                sm="4"
                class="d-flex align-center justify-start justify-md-end py-0"
              >
                <label class="text-truncate mb-0">Humedad :</label>
              </v-col>
              <v-col lg="9" cols="12" sm="8" class="py-0">
                <v-text-field
                  placeholder="Humedad"
                  v-model="project5"
                  class="mt-0"
                  hide-details
                ></v-text-field>
              </v-col>
            </v-row>
            <v-row class="mt-4">
              <v-col
                lg="3"
                cols="12"
                sm="4"
                class="d-flex align-center justify-start justify-md-end py-0"
              >
                <label class="text-truncate mb-0">Impureza :</label>
              </v-col>
              <v-col lg="9" cols="12" sm="8" class="py-0">
                <v-text-field
                  placeholder="impureza"
                  v-model="project8"
                  class="mt-0"
                  hide-details
                ></v-text-field>
              </v-col>
            </v-row>
          </v-col>
          <v-col lg="4" cols="12" sm="4">
            <v-row class="mt-4">
              <v-col
                lg="3"
                cols="12"
                sm="4"
                class="d-flex align-center justify-start justify-md-end py-0"
              >
                <label class="text-truncate mb-0">Peso bruto :</label>
              </v-col>
              <v-col lg="9" cols="12" sm="8" class="py-0">
                <v-text-field
                  placeholder="Peso bruto"
                  v-model="project8"
                  class="mt-0"
                  hide-details
                ></v-text-field>
              </v-col>
            </v-row>
            <v-row class="mt-4">
              <v-col
                lg="3"
                cols="12"
                sm="4"
                class="d-flex align-center justify-start justify-md-end py-0"
              >
                <label class="text-truncate mb-0">Tara :</label>
              </v-col>
              <v-col lg="9" cols="12" sm="8" class="py-0">
                <v-text-field
                  placeholder="Tara"
                  v-model="project8"
                  class="mt-0"
                  hide-details
                ></v-text-field>
              </v-col>
            </v-row>
          </v-col>
        </v-row>
      </tab-content>
      <tab-content title="Peso Neto y Placa vehicular" icon="ti-check">
        <v-row class="mt-4">
          <v-col lg="2" cols="12" sm="4">
            <label class="text-truncate mb-0">Revisar para registrar: :</label>
          </v-col>
          <v-row class="mt-4">
              <v-col
                lg="3"
                cols="12"
                sm="4"
                class="d-flex align-center justify-start justify-md-end py-0"
              >
                <label class="text-truncate mb-0">Peso neto :</label>
              </v-col>
              <v-col lg="9" cols="12" sm="8" class="py-0">
                <v-text-field
                  placeholder="0.0"
                  v-model="project8"
                  class="mt-0"
                  hide-details
                ></v-text-field>
              </v-col>
            </v-row>
            <v-row class="mt-4">
              <v-col
                lg="3"
                cols="12"
                sm="4"
                class="d-flex align-center justify-start justify-md-end py-0"
              >
                <label class="text-truncate mb-0">Placa vehicular :</label>
              </v-col>
              <v-col lg="9" cols="12" sm="8" class="py-0">
                <v-text-field
                  placeholder="placa del vehículo"
                  v-model="project8"
                  class="mt-0"
                  hide-details
                ></v-text-field>
              </v-col>
            </v-row>
            
        </v-row>
      </tab-content>
    </form-wizard>
  </div>
</template>

<script>
import { FormWizard, TabContent } from "vue-form-wizard";
import "vue-form-wizard/dist/vue-form-wizard.min.css";

export default {
  name: "FormWizardIcon",
  data: () => ({
    title: "FormWizardIcon",
    project1: "",
    project2: "",
    project3: "",
    project4: "",
    project5: "",
    projectselect6: 0,
    projectselect7: 0,
    project8: "",
    event6: "",
    items: ["Choose Your option", "Designing", "Development"],
    items2: ["Choose Your option", "Less than $5000", "$5000 to $10000"]
  }),
  methods: {
    onComplete: function() {
      alert("Yay. Done!");
    }
  },
  components: {
    FormWizard,
    TabContent
  }
};
</script>