<template>
  <v-container>
    <h2>My Favorites</h2>
    <v-row>
      <v-col :key="favorite.id" v-for="favorite in favorites" cols="12" md="4">
        <v-card class="mx-auto" max-width="400">
          <v-img
            src="https://cdn.vuetifyjs.com/images/cards/sunshine.jpg"
            height="200px"
          ></v-img>

          <v-card-title
            ><a>{{ favorite.Product.productName }}</a></v-card-title
          >

          <v-card-subtitle>
            <h4>Rs. {{ favorite.Product.price }}</h4>
          </v-card-subtitle>

          <v-card-actions>
            <v-chip dark color="success">{{ favorite.Product.source }} </v-chip>
            <v-spacer />
            <v-btn @click.native="unfavoriteProduct(favorite)" icon
              ><v-icon color="red">mdi-heart</v-icon></v-btn
            >
          </v-card-actions>
        </v-card>
      </v-col>
    </v-row>
  </v-container>
</template>

<script>
import Api from "@/services/Api";
import { mapMutations } from "vuex";

export default {
  data() {
    return {
      favorites: [],
    };
  },
  mounted() {
    this.all();
  },
  methods: {
    ...mapMutations({
      setSnackbar: "snackbar/setSnackbar",
    }),
    all() {
      Api.get("product/favorites").then((res) => {
        this.favorites = res.data.data;
      });
    },
    unfavoriteProduct(fav) {
      Api.delete(`product/unfavorite/${fav.id}`).then((res) => {
        if (res.status === 200) {
          this.setSnackbar({
            message: res.data.message,
            color: "success",
          })
          this.all()
        }
      })
    },
  },
};
</script>