<template>
    <v-layout>
      <v-container>
        <!-- <v-card class="mb-4"> 
          <v-card-text>
        <v-text-field label="Search" append-icon="mdi-magnify" outlined>
        </v-text-field>
          </v-card-text>
        </v-card> -->
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
                          <v-autocomplete outlined label="Select Source" item-text="name" item-value="id" :items="sources"></v-autocomplete>
                        </v-list-item-content>
                      </v-list-item>
                  </v-list>


                 </v-list>
            </v-card>
           </v-col>
        <v-col cols="12" md="8">
          <v-row>
            <v-col :key="product.id" v-for="product in products" cols="12" md="6">
              <v-card @click="openLink(product)" class="mx-auto" max-width="400">
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

        <v-col cols="12" md="12">
          <v-pagination @input="handlePageChange" circle v-model="currentPage" :length="totalPages"></v-pagination>
        </v-col>
      </v-row>
       
      </v-container>
    </v-layout>
</template>

<script>
import ProductService from '@/services/ProductService'
import SourceService from '@/services/SourceService'

export default {
  async mounted() {
     try {
       const response = await ProductService.all({})
       this.totalPages = response.data.data.totalPages
       this.currentPage = response.data.data.currentPage
       this.products = response.data.data.items

      const res = await Promise.all([
          await SourceService.all({})
       ])

       this.sources = res[0].data.data.items


     }
     catch (e) {

     }
  },
  data() {
    return {
      products: [],
      sources: [],
      currentPage: 0,
      totalPages: 0
    }
  },
  methods: {
    async handlePageChange(value) {
      this.currentPage = value
      const response = await ProductService.all({ perPage: 5, page: this.currentPage })
       this.totalPages = response.data.data.totalPages
       this.currentPage = response.data.data.currentPage
       this.products = response.data.data.items
       this.$vuetify.goTo(0)
    },
    openLink(product) {
        window.open(product.productLink, '_blank')
    }
  }
};
</script>

<style>
</style>