<template>
  <v-card class="mx-2 my-2">
      <v-data-table :items="products" :headers="headers">

            <template v-slot:[`item.actions`]="{ item }">
            <v-btn dark icon class="success">
      <v-icon
        small
      >
        mdi-pencil-outline
      </v-icon>
            </v-btn>

      <v-btn class="ml-2 error" dark icon>      
      <v-icon
        small
      >
        mdi-delete-outline
      </v-icon>
      </v-btn>

    </template>
      </v-data-table>
  </v-card>
</template>

<script>
import ProductService from '@/services/ProductService'

export default {
    mounted() {
        ProductService.all({ perPage: 10 }).then(res => {
            this.products = res.data.data.items
        })
    },
    data() {
        return {
            headers: [
                { text: 'Name', value: 'productName' },
                { text: 'Price', value: 'price' },
                { text: 'Source', value: 'source' },
                { text: 'Actions', value: 'actions'}
            ],
            products: []
        }
    }
}
</script>

<style>

</style>