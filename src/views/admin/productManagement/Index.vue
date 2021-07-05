<template>
  <v-card class="mx-2 my-2">
    <v-data-table :server-items-length="totalProducts" 
    :options.sync="options" :items="products" :headers="headers"
     :footer-props="{
          showFirstLastPage: true,
          firstIcon: 'mdi-chevron-double-left',
          lastIcon: 'mdi-chevron-double-right',
    }"
    >
      <template v-slot:[`item.actions`]="{ item }">
        <v-btn dark icon class="success">
          <v-icon small> mdi-pencil-outline </v-icon>
        </v-btn>

        <v-btn @click="onDeleteProductClick(item)" class="ml-2 error" dark icon>
          <v-icon small> mdi-delete-outline </v-icon>
        </v-btn>
      </template>
    </v-data-table>
  </v-card>
</template>

<script>
import ProductService from "@/services/ProductService";

export default {
  mounted() {},
  watch: {
    options: {
      handler() {
        this.getAllProducts();
      },
      deep: true,
    },
  },
  data() {
    return {
      headers: [
        { text: "Name", value: "productName" },
        { text: "Price", value: "price" },
        { text: "Source", value: "source" },
        { text: "Actions", value: "actions" },
      ],
      products: [],
      totalProducts: 0,
      options: {},
    };
  },
  methods: {
    getAllProducts() {
      const { sortBy, sortDesc, page, itemsPerPage } = this.options;
      ProductService.all({ perPage: itemsPerPage, page }).then((res) => {
        this.totalProducts = res.data.data.total;
        this.products = res.data.data.items;
      });
    },
    onDeleteProductClick(product) {
      this.$confirm("Are you sure you want to delete this product?", {
        title: "Warning",
      }).then((res) => {
        if (res) {
          //write delete code here
        }
      });
    },
  },
};
</script>

<style>
</style>