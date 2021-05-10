<template>
    <div>
    <v-card class="mx-2 my-2">
    <v-data-table :items="favorites" :headers="headers">
      <template v-slot:[`item.actions`]="{ item }">
        <v-btn @click="onViewProduct(item)" dark icon class="success">
          <v-icon small> mdi-eye-outline </v-icon>
        </v-btn>

      </template>

      <template v-slot:[`item.totalFav`]="{ item }">
        <v-chip>{{ item.FavoriteProducts.length }}</v-chip>
      </template>
    </v-data-table>
  </v-card>

   <v-dialog persistent v-model="dialog">
      <v-card>
        <v-card-title class="white--text headline primary">
          View Favorites

          <v-spacer />
          <v-btn icon text color="white" @click="dialog = false">
            <v-icon>mdi-close</v-icon>
          </v-btn>
        </v-card-title>

        <v-card-text>
            <v-data-table :headers="productHeaders" :items="products">
               <template v-slot:[`item.ProductId`]="{ item }">
                 <span>{{ item.Product.productName }}</span>
              </template>

               <template v-slot:[`item.productPrice`]="{ item }">
                 <span>{{ item.Product.price }}</span>
              </template>

               <template v-slot:[`item.source`]="{ item }">
                 <span>{{ item.Product.source }}</span>
              </template>

              <template v-slot:[`item.actions`]="{ item }">
                 <v-btn @click="unfavoriteProduct(item)" class="ml-2 error" dark icon>
                    <v-icon small>mdi-delete-outline</v-icon>
                 </v-btn>
              </template>
            </v-data-table>
        </v-card-text>
      </v-card>
   </v-dialog>
    </div>
</template>

<script>
import Api from '@/services/Api'

export default {
    data() {
        return {
            favorites: [],
            headers: [{
              text: 'First Name',
              value: 'firstName',
            }, {
              text: 'Last Name',
              value: 'lastName'
            }, {
               text: 'Total Favorites',
              value: 'totalFav'
            }, {
              text: 'Actions',
              value: 'actions'
            }],
            dialog: false,
            products: [],
            productHeaders: [{
              text: 'Product Name',
              value: 'ProductId'
            }, {
              text: 'Price',
              value: 'productPrice'
            }, {
              text: 'Source',
              value: 'source'
            }, {
              text: 'Actions',
              value: 'actions'
            }]
        }
    },
    mounted() {
      this.all()
    },
    methods: {
      all() {
        Api.get('/admin/favorites')
      .then(res => {
        this.favorites = res.data.data
      })
      },
      onViewProduct(user) {
        this.dialog = true
        this.products = user.FavoriteProducts
      },
      unfavoriteProduct(item) {
         Api.delete(`product/unfavorite/${item.id}`).then((res) => {
            if(res.status === 200) {
              this.dialog = false
              this.all()
            }
         })
      }
    }
}
</script>

<style>

</style>