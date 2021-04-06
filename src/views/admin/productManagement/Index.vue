<template>
  <v-card class="m-2">
      <v-data-table :items="products" :headers="headers">
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
                { text: 'Source', value: 'source' }
            ],
            products: []
        }
    }
}
</script>

<style>

</style>