<template>
  <v-container fluid>
      <h3 class="headline mb-2">Sources</h3>
      <v-row class="mb-2">
          <v-col cols="12" md="4">
              <v-card>
                  <v-card-title>Total</v-card-title>
                  <v-card-text class="headline">20</v-card-text>
              </v-card>
          </v-col>

           <v-col cols="12" md="4">
              <v-card>
                  <v-card-title>Active</v-card-title>
                  <v-card-text class="headline">12</v-card-text>
              </v-card>
          </v-col>

           <v-col cols="12" md="4">
              <v-card>
                  <v-card-title>In Active</v-card-title>
                  <v-card-text class="headline">8</v-card-text>
              </v-card>
          </v-col>
      </v-row>

      <v-card>
      <v-data-table :headers="headers"></v-data-table>
      </v-card>
  </v-container>
</template>

<script>
export default {
    data() {
        return {
            headers: [
                { text: 'Name', value: 'name' },
                { text: 'Url', value: 'url' },
                { text: 'Created At', value: 'created_at' },
                { text: 'Actions', value: 'actions' }
            ]
        }
    }
}
</script>

<style>

</style>