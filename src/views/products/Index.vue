<template>
    <v-layout>
      <v-container>
        <v-card class="mb-4"> 
          <v-card-text>
        <v-text-field label="Search" append-icon="mdi-magnify" outlined>
        </v-text-field>
          </v-card-text>
        </v-card>
      <v-row>
        <v-col cols="12" md="4"> 
            <v-card>
              <v-list>
                 <v-subheader>REPORTS</v-subheader>
                 </v-list>
            </v-card>
           </v-col>
        <v-col cols="12" md="8">
          <v-row>
            <v-col :key="product.id" v-for="product in products" cols="12" md="4">
              <v-card :to="product.productLink" exact class="mx-auto" max-width="400">
                <v-img
                  src="https://cdn.vuetifyjs.com/images/cards/sunshine.jpg"
                  height="200px"
                ></v-img>

                <v-card-title>{{ product.productName }}</v-card-title>

                <v-card-subtitle> {{ product.price }} </v-card-subtitle>

                <v-card-actions>
                  <v-btn color="orange lighten-2" text> {{ product.source }} </v-btn>
                </v-card-actions>
              </v-card>
            </v-col>
          </v-row>
        </v-col>
      </v-row>
      </v-container>
    </v-layout>
</template>

<script>
import ProductService from '@/services/ProductService'

export default {
  async mounted() {
     try {
       const response = await ProductService.all()
       this.products = response.data.data
     }
     catch (e) {

     }
  },
  data() {
    return {
      products: []
    }
  }
};
</script>

<style>
</style>