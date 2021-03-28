<template>
<v-container fluid>
     <v-row no-gutters class="d-flex justify-space-between mt-10 mb-6">
        <h1 class="page-title">Dashboard</h1>
     </v-row>
      <v-row>
        <v-col lg="3" sm="6" md="4" cols="12">
            <v-card class="mx-1 mb-1">
            <v-card-title class="pa-6 pb-3">
              <p>Daraz</p>
              <v-spacer></v-spacer>
            </v-card-title>

            <v-card-text class="pa-6 pt-0">
              <v-row no-gutters class="pb-5">
                <v-col cols="5" class="my-auto">
                  <span
                    class="font-weight-medium card-dark-grey"
                    style="font-size: 24px"
                    >12, 678</span
                  >
                </v-col>
              </v-row>
            </v-card-text>
            </v-card>
        </v-col>

        <v-col lg="3" sm="6" md="4" cols="12">
            <v-card class="mx-1 mb-1">
            <v-card-title class="pa-6 pb-3">
              <p>SastoDeal</p>
              <v-spacer></v-spacer>
            </v-card-title>

            <v-card-text class="pa-6 pt-0">
              <v-row no-gutters class="pb-5">
                <v-col cols="5" class="my-auto">
                  <span
                    class="font-weight-medium card-dark-grey"
                    style="font-size: 24px"
                    >12, 678</span
                  >
                </v-col>
              </v-row>
            </v-card-text>
            </v-card>
        </v-col>

         <v-col lg="3" sm="6" md="4" cols="12">
            <v-card class="mx-1 mb-1">
            <v-card-title class="pa-6 pb-3">
              <p>OkDam</p>
              <v-spacer></v-spacer>
            </v-card-title>

            <v-card-text class="pa-6 pt-0">
              <v-row no-gutters class="pb-5">
                <v-col cols="5" class="my-auto">
                  <span
                    class="font-weight-medium card-dark-grey"
                    style="font-size: 24px"
                    >12, 678</span
                  >
                </v-col>
              </v-row>
            </v-card-text>
            </v-card>
        </v-col>
        
      </v-row>

      <v-row>
        <v-card>
            <v-data-table :headers="headers"></v-data-table>
        </v-card>
      </v-row>
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