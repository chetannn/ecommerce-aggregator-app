<template>
<v-container fluid>
     <v-row no-gutters class="d-flex justify-space-between mt-10 mb-6">
     </v-row>

        <v-row>
    <v-col
      cols="12"
      lg="4"
      sm="6"
      class="py-0 mb-7"
    >
      <v-card max-width="700">
        <v-card-text class="pa-5">
          <div class="d-flex align-center">
            <v-btn
              class="elevation-0"
              fab
              dark
            >
              <v-icon>mdi-handshake-outline</v-icon>
            </v-btn>
            <div class="ml-4 mr-1">
              <h2>
                100
              </h2>
              <h5 class="subtitle-2 font-weight-bold">
                 Sastodeal
              </h5>
            </div>
          </div>
        </v-card-text>
      </v-card>

    </v-col>
     <v-col
      cols="12"
      lg="4"
      sm="6"
      class="py-0 mb-7"
    >
      <v-card max-width="700">
        <v-card-text class="pa-5">
          <div class="d-flex align-center">
            <v-btn
              class="elevation-0 primary"
              fab
              dark
            >
              <v-icon>mdi-check-circle-outline</v-icon>
            </v-btn>
            <div class="ml-4 mr-1">
              <h2>
                200
              </h2>
              <h5 class="subtitle-2 font-weight-bold">
                 Okdam
              </h5>
            </div>
          </div>
        </v-card-text>
      </v-card>
    </v-col>


     <v-col
      cols="12"
      lg="4"
      sm="6"
      class="py-0 mb-7"
    >
      <v-card max-width="700">
        <v-card-text class="pa-5">
          <div class="d-flex align-center">
            <v-btn
              class="elevation-0 success"
              fab
              dark
            >
              <v-icon>mdi-basket-outline</v-icon>
            </v-btn>
            <div class="ml-4 mr-1">
              <h2>
                200
              </h2>
              <h5 class="subtitle-2 font-weight-bold">
                 Smartdoko
              </h5>
            </div>
          </div>
        </v-card-text>
      </v-card>
    </v-col>

    <v-col
      cols="12"
      lg="4"
      sm="6"
      class="py-0 mb-7"
    >
      <v-card max-width="700">
        <v-card-text class="pa-5">
          <div class="d-flex align-center">
            <v-btn
              class="elevation-0 success"
              fab
              dark
            >
              <v-icon>mdi-beach</v-icon>
            </v-btn>
            <div class="ml-4 mr-1">
              <h2>
                600
              </h2>
              <h5 class="subtitle-2 font-weight-bold">
                 Nepbay
              </h5>
            </div>
          </div>
        </v-card-text>
      </v-card>
    </v-col>
  </v-row>
      
      <!-- <v-row>
        <v-card>
            <v-data-table :headers="headers"></v-data-table>
        </v-card>
      </v-row> -->
    
</v-container>
</template>

<script>
export default {
    data() {
        return {
            headers: [
                { text: 'Name', value: 'name' },
                { text: 'Price', value: 'price' }
            ]
        }
    }
}
</script>

<style>

</style>