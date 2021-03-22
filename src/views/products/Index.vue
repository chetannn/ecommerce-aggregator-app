<template>
  <div>
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
              <v-card class="mx-auto" max-width="400">
                <v-img
                  src="https://cdn.vuetifyjs.com/images/cards/sunshine.jpg"
                  height="200px"
                ></v-img>

                <v-card-title> {{ product.productName }} </v-card-title>

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
  </div>
</template>

<script>
import Api from '@/services/Api'
export default {
  mounted() {
  },
  data() {
    return {
      products: [
        {
           id: 1,
           productName: 'Earphone',
           price: 100,
           source: 'Daraz'
        },
         {
           id: 2,
           productName: 'Water Bottle',
           price: 400,
           source: 'Sastodeal'
        },
         {
           id: 3,
           productName: 'T-shirt',
           price: 500,
           source: 'Daraz'
        },
         {
           id: 4,
           productName: 'Lenovo Laptop',
           price: 50000,
           source: 'Sastodeal'
        },
         {
           id: 5,
           productName: 'Mobile',
           price: 10000,
           source: 'Daraz'
        }
      ]
    }
  }
};
</script>

<style>
</style>