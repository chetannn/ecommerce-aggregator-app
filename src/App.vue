<template>
  <v-app>
    <v-app-bar
      app
      color="primary"
      dark
    >
      <div class="d-flex align-center">
        <!-- <v-img
          alt="Vuetify Logo"
          class="shrink mr-2"
          contain
          src="https://cdn.vuetifyjs.com/images/logos/vuetify-logo-dark.png"
          transition="scale-transition"
          width="40"
        /> -->
      </div>

      <v-spacer></v-spacer>

      <v-btn v-if="!$store.state.isUserLoggedIn" text @click="$router.push({name: 'login'})">Login</v-btn>
      <v-btn v-if="!$store.state.isUserLoggedIn" text @click="$router.push({name: 'register'})">Register</v-btn>
      <v-btn v-if="$store.state.isUserLoggedIn" text @click="logout">Logout</v-btn>
    
    </v-app-bar>
    <v-main>
      <router-view />
    </v-main>
  </v-app>
</template>

<script>

export default {
  name: 'App',
  data: () => ({
    //
  }),
  methods: {
    logout() {
      this.$store.dispatch('setToken', null)
      this.$store.dispatch('setUser', null)
      //TODO: redirect to homepage
      this.$router.push({
        name: 'Home'
      })
    }
  }
};
</script>
