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
      <v-btn v-if="authenticated" text @click="$router.push('/products')">Products</v-btn>
        <v-menu
      min-width="180"
      offset-y
      bottom
      left
      nudge-bottom="10"
      v-if="authenticated">
        <template v-slot:activator="{ on, attrs }">
          <v-btn
            class="mr-0"
            icon
            v-bind="attrs"
            v-on="on">
            <v-avatar size="40">
              <img
        src="https://cdn.vuetifyjs.com/images/john.jpg"
        alt="John"
       > 
       </v-avatar>
          </v-btn>
        </template>

         <v-list >
          <div class="headline">{{ user.firstName}} {{ user.lastName}}</div>


           <div class="d-flex justify-center my-3">
            <v-btn
              width="80%"
              large
              outlined
              color="primary"
              class="text-capitalize"
              @click="logout">Sign Out
            </v-btn>
          </div>
         </v-list>
          </v-menu>
    </v-app-bar>

    <v-main>
      <router-view />
    </v-main>
</v-app>
</template>

<script>
import { mapActions, mapGetters } from 'vuex'

export default {
     methods: {
     ...mapActions({
      logout: 'auth/logout'
    })
  },
   computed: {
    ...mapGetters({
      user: 'auth/user',
      authenticated: 'auth/authenticated'
    })
  }
}
</script>

<style>

</style>