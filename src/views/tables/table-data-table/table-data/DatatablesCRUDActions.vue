<template>
  <!-- ----------------------------------------------------------------------------- -->
  <!-- DatatablesCRUDActions -->
  <!-- ----------------------------------------------------------------------------- -->
  <div>
    <v-list-item-subtitle class="text-wrap">
      Se listan los registros de acuerdo a la fecha de ingreso
      
    </v-list-item-subtitle>
    <div class="mt-4">
      <v-data-table 
      :headers="headers" 
      :items="desserts"
      sort-by="variedad" class="border">
        <template v-slot:top>
          <v-toolbar flat color="black">
            <v-toolbar-title>Tabla de registros</v-toolbar-title>
            <v-divider class="mx-4" inset vertical></v-divider>
            <v-spacer></v-spacer>

                       <v-dialog v-model="dialog" max-width="500px">
              <template v-slot:activator="{ on }">
                <v-btn color="primary" dark class="mb-2" v-on="on">Nuevo registro</v-btn>
              </template>
              <v-card>
                <v-card-title>
                  <span class="headline">{{ formTitle }}</span>
                </v-card-title>

                <v-card-text>
                  <v-container>
                    <v-row>
                      <v-col cols="12" sm="6" md="4">
                        <v-text-field v-model="editedItem.name" label="Dessert name"></v-text-field>
                      </v-col>
                      <v-col cols="12" sm="6" md="4">
                        <v-text-field v-model="editedItem.calories" label="Calories"></v-text-field>
                      </v-col>
                      <v-col cols="12" sm="6" md="4">
                        <v-text-field v-model="editedItem.fat" label="Fat (g)"></v-text-field>
                      </v-col>
                      <v-col cols="12" sm="6" md="4">
                        <v-text-field v-model="editedItem.carbs" label="Carbs (g)"></v-text-field>
                      </v-col>
                      <v-col cols="12" sm="6" md="4">
                        <v-text-field v-model="editedItem.protein" label="Protein (g)"></v-text-field>
                      </v-col>
                    </v-row>
                  </v-container>
                </v-card-text>

                <v-card-actions>
                  <v-spacer></v-spacer>
                  <v-btn color="blue darken-1" text @click="close">Cancelar</v-btn>
                  <v-btn color="blue darken-1" text @click="save">Guardar</v-btn>
                </v-card-actions>
              </v-card>
            </v-dialog>
          </v-toolbar>
        </template>
        <template v-slot:item.actions="{ item }">
          <v-icon small class="mr-2" @click="editItem(item)">mdi-pencil</v-icon>
          <v-icon small @click="deleteItem(item)">mdi-delete</v-icon>
        </template>
        <template v-slot:no-data>
          <v-btn color="primary" @click="initialize">Reset</v-btn>
        </template>
      </v-data-table>
    </div>
  </div>
</template>

<script>
export default {
  name: "DatatablesCRUDActions",

  data: () => ({
    dialog: false,
    headers: [
      {
        text: "Agricultor",
        align: "start",
        sortable: false,
        value: "agricultor"
      },
      { text: "Variedad", value: "variedad" },
      { text: "Zona", value: "zona" },
      { text: "Humedad", value: "humedad" },
      { text: "Impureza", value: "impureza" },
      { text: "Placa", value: "placa" },
      { text: "Peso bruto", value: "pesoBruto" },
      { text: "Tara", value: "tara" },
      { text: "Peso Neto", value: "pesoNeto" },
      { text: "Actions", value: "actions", sortable: false }
    ],
   
    desserts: [],
    editedIndex: -1,
    editedItem: {
      agricultor: "",
      variedad: "",
      zona: "",
      humedad: 0.0,
      impureza: 0.0,
      placa: "",
      pesoBruto : 0.0,
      tara : 0.0,
      pesoNeto : 0.0

    },
    defaultItem: {
      agricultor: "",
      variedad: "",
      zona: "",
      humedad: 0.0,
      impureza: 0.0,
      placa: "",
      pesoBruto : 0.0,
      tara : 0.0,
      pesoNeto : 0.0
    }
  }),
  computed: {
    formTitle() {
      return this.editedIndex === -1 ? "Nuevo registro" : "Editar registro";
    }
  },

  watch: {
    dialog(val) {
      val || this.close();
    }
  },

  created() {
    this.initialize();
  },

  methods: {
    initialize() {
      this.desserts = [
        {
      agricultor: "Eugenio Casas",
      variedad: "Grano grande",
      zona: "Corire",
      humedad: 10.0,
      impureza: 1.0,
      placa: "SWED-345",
      pesoBruto : 500000.0,
      tara : 20000.0,
      pesoNeto : 48000.0
        },
        {
      agricultor: "Maria HUertas",
      variedad: "Grano mediano",
      zona: "Aplao",
      humedad: 12.0,
      impureza: 1.0,
      placa: "TYLO-345",
      pesoBruto : 845000.0,
      tara : 45000.0,
      pesoNeto : 800000.0
        },
        
      ];
    },

    editItem(item) {
      this.editedIndex = this.desserts.indexOf(item);
      this.editedItem = Object.assign({}, item);
      this.dialog = true;
    },

    deleteItem(item) {
      const index = this.desserts.indexOf(item);
      confirm("¿Está seguro de querer eliminar este registro?") &&
        this.desserts.splice(index, 1);
    },

    close() {
      this.dialog = false;
      setTimeout(() => {
        this.editedItem = Object.assign({}, this.defaultItem);
        this.editedIndex = -1;
      }, 300);
    },

    save() {
      if (this.editedIndex > -1) {
        Object.assign(this.desserts[this.editedIndex], this.editedItem);
      } else {
        this.desserts.push(this.editedItem);
      }
      this.close();
    }
  }
};
</script>