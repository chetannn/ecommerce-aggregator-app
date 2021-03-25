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
              <v-list class="px-0 py-0">
                 <v-subheader>Filters</v-subheader>
                  <v-list-item>
                      <v-list-item-content>
                        <v-checkbox label="Samsung"></v-checkbox>
                      </v-list-item-content>
                  </v-list-item>
                   <v-list-item>
                      <v-list-item-content>
                        <v-checkbox label="Apple"></v-checkbox>
                      </v-list-item-content>
                  </v-list-item>
                   <v-list-item>
                      <v-list-item-content>
                        <v-checkbox label="OnePlus"></v-checkbox>
                      </v-list-item-content>
                  </v-list-item>

                  <v-divider></v-divider>

                    <v-list>
                      <v-subheader>Price</v-subheader>
                    <v-list-item>
                      <v-list-item-content>
                         <v-row>
                           <v-col cols="12" md="5">
                             <v-text-field type="number" outlined label="Min"></v-text-field>
                           </v-col>
                           <v-col cols="12" md="5">
                             <v-text-field type="number" outlined label="Max"></v-text-field>
                           </v-col>

                            <v-col cols="12" md="2">
                             <v-btn class="align-items-center" icon>
                               <v-icon>mdi-magnify</v-icon>
                             </v-btn>
                           </v-col>

                         </v-row>
                      </v-list-item-content>
                    </v-list-item>
                  </v-list>

                  <v-divider />

                  <v-list>
                      <v-subheader>Source</v-subheader>
                      <v-list-item>
                        <v-list-item-content>
                          <v-autocomplete outlined label="Select Source" :items="[{ text: 'Daraz' }, { text: 'Sastodeal' }]"></v-autocomplete>
                        </v-list-item-content>
                      </v-list-item>
                  </v-list>


                 </v-list>
            </v-card>
           </v-col>
        <v-col cols="12" md="8">
          <v-row>
            <v-col :key="product.id" v-for="product in products" cols="12" md="6">
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