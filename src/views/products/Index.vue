<template>
  <!-- <v-layout> -->
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
            <v-subheader class="title">Filters</v-subheader>
            <v-list>
              <!-- <v-subheader>Price</v-subheader> -->
              <v-list-item>
                <v-list-item-content>
                  <v-row>
                    <v-col>
                      <v-text-field
                        v-model="filters.productName"
                        label="Product Name"
                      ></v-text-field>
                    </v-col>
                  </v-row>
                  <v-row>
                    <v-col cols="12" md="5">
                      <v-text-field
                        type="number"
                        outlined
                        label="Min"
                        v-model.number="filters.min"
                      ></v-text-field>
                    </v-col>
                    <v-col cols="12" md="5">
                      <v-text-field
                        type="number"
                        outlined
                        label="Max"
                        v-model.number="filters.max"
                      ></v-text-field>
                    </v-col>

                    <v-col cols="12" md="2">
                      <v-btn @click="search" class="align-items-center" icon>
                        <v-icon>mdi-magnify</v-icon>
                      </v-btn>

                      <v-btn
                        @click="onResetClick"
                        class="align-items-center"
                        icon
                      >
                        <v-icon>mdi-cancel</v-icon>
                      </v-btn>
                    </v-col>
                  </v-row>
                </v-list-item-content>
              </v-list-item>
            </v-list>

            <v-divider />

            <v-list>
              <!-- <v-subheader>Source</v-subheader> -->
              <v-list-item>
                <v-list-item-content>
                  <v-autocomplete
                    outlined
                    label="Select Source"
                    item-text="name"
                    item-value="id"
                    :items="sources"
                    v-model="filters.sourceId"
                  ></v-autocomplete>
                </v-list-item-content>
              </v-list-item>
            </v-list>
          </v-list>
        </v-card>
      </v-col>
      <v-col cols="12" md="8">
        <v-row>
          <v-col :key="product.id" v-for="product in products" cols="12" md="6">
            <v-card class="mx-auto" max-width="400">
              <v-img
                @click="openLink(product)"
                :src="product.imageUrl"
                height="200px"
              ></v-img>

              <v-card-title
                ><a @click="openLink(product)">{{
                  product.productName
                }}</a></v-card-title
              >

              <v-card-subtitle>
                <h4>Rs. {{ product.price }}</h4>
              </v-card-subtitle>

              <v-card-actions>
                <!-- <v-btn color="orange lighten-2" text> {{ product.source }} </v-btn> -->
                <v-chip dark color="success">{{ product.source }} </v-chip>
                <v-spacer />
                <v-btn @click.native="favoriteProduct(product)" icon
                  ><v-icon>mdi-heart-outline</v-icon></v-btn
                >
              </v-card-actions>
            </v-card>
          </v-col>

          <v-pagination
            @input="handlePageChange"
            circle
            v-model="currentPage"
            :length="totalPages"
          ></v-pagination>
        </v-row>
      </v-col>
    </v-row>
  </v-container>
  <!-- </v-layout> -->
</template>

<script>
import ProductService from "@/services/ProductService";
import SourceService from "@/services/SourceService";
import { mapMutations } from "vuex";

export default {
  async mounted() {
    try {
      const response = await ProductService.all({});
      this.totalPages = response.data.data.totalPages;
      this.currentPage = response.data.data.currentPage;
      this.products = response.data.data.items;

      const res = await Promise.all([await SourceService.all({})]);

      this.sources = res[0].data.data.items;
    } catch (e) {}
  },
  data() {
    return {
      products: [],
      sources: [],
      currentPage: 0,
      totalPages: 0,
      filters: {
        min: 0,
        max: null,
        productName: null,
        sourceId: null,
      },
    };
  },
  methods: {
    ...mapMutations({
      setSnackbar: "snackbar/setSnackbar",
    }),
    async search() {
      try {
        const response = await ProductService.all({
          perPage: 5,
          page: this.currentPage,
          minPrice: this.filters.min,
          maxPrice: this.filters.max,
          productName: this.filters.productName,
          sourceId: this.filters.sourceId,
        })

      this.totalPages = response.data.data.totalPages;
      this.currentPage = response.data.data.currentPage;
      this.products = response.data.data.items;

      } catch (e) {
        if (e.response.status === 404) {
          this.totalPages = 0;
          this.currentPage = 1;
          this.products = [];
        }
      }

     
    },
    async handlePageChange(value) {
      this.currentPage = value;
      await this.search();
      this.$vuetify.goTo(0);
    },
    openLink(product) {
      window.open(product.productLink, "_blank");
    },
    onResetClick() {
      this.filters.max = null;
      this.filters.min = 0;
      this.filters.productName = null;
      this.currentPage = 1;
      this.filters.sourceId = null
    },
    async favoriteProduct(product) {
      try {
        const response = await ProductService.favoriteProduct(product.id);
        if (response.status === 201) {
          this.setSnackbar({
            message: response.data.message,
            color: "success",
          });
        }
      } catch (e) {
        if (e.response.status === 400) {
          this.$confirm(e.response.data.message, {
            color: "error",
            title: "Error",
            persistent: true,
            buttonFalseText: null,
            buttonTrueText: "Ok",
          });
        }
      }
    },
  },
};
</script>

<style>
</style>