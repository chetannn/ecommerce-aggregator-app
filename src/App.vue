<template>
  <v-app>
    <v-app-bar
      app
      color="primary"
      dark
    >
      <v-app-bar-title>Ecommerce Aggregator</v-app-bar-title>

      <div class="d-flex align-center">
      </div>

      <v-spacer></v-spacer>

      <v-btn v-if="!$store.state.auth.isUserLoggedIn" text @click="$router.push({name: 'login'})">Login</v-btn>
      <v-btn v-if="!$store.state.auth.isUserLoggedIn" text @click="$router.push({name: 'register'})">Register</v-btn>
      <v-btn v-if="$store.state.auth.isUserLoggedIn" text @click="$router.push('/products')">Products</v-btn>
      <v-btn v-if="$store.state.auth.isUserLoggedIn" text @click="logout">Logout</v-btn>
    
    </v-app-bar>
    <v-main>
      <router-view />
    </v-main>
  </v-app>
</template>

<script>
import { mapActions } from 'vuex'
export default {
  name: 'App',
  data: () => ({
    //
  }),
  methods: {
    ...mapActions({
      logout: 'auth/logout'
    })
  }
};
</script>
