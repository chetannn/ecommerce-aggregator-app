<template>
<v-app>
 <v-app-bar
      app
      color="primary"
      dark
    >
      <v-app-bar-title>Nepagator</v-app-bar-title>

      <!-- <div class="d-flex align-center">
      </div> -->

      <v-spacer></v-spacer>
      <v-btn text @click="$router.push('/products')">Products</v-btn>
      <v-btn @click="$router.push('/favorites')" icon><v-icon>mdi-heart</v-icon></v-btn>

        <v-menu
      min-width="180"
      offset-y
      bottom
      left
      nudge-bottom="10">
        <template v-slot:activator="{ on, attrs }">
          <v-btn
            class="mr-0"
            icon
            v-bind="attrs"
            v-on="on">
            <v-avatar v-if="user.profilePath" size="40">
              <img
         :src="profilePath"
        :alt="user.firstName"
       > 
       </v-avatar>

         <v-avatar color="primary" v-else>
              <v-icon dark>
              mdi-account-circle
            </v-icon>
         </v-avatar>
          </v-btn>
        </template>

         <v-list>
             <v-list-item>
                <div class="headline">{{ user.firstName}} {{ user.lastName}}</div>
             </v-list-item>

          <v-list-item link to="/profile">
              <v-list-item-action>
              <v-icon>mdi-account-circle-outline</v-icon>
            </v-list-item-action>
              <v-list-item-content>
                  Profile
              </v-list-item-content>
          </v-list-item>


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

     <v-snackbar 
    top center 
    v-model="$store.state.snackbar.show" 
    :color="snackbarColor"
    timeout="3000"
    >{{ snackbarText }}</v-snackbar>
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
      authenticated: 'auth/authenticated',
      snackbarText: 'snackbar/snackbarText',
      snackbarColor: 'snackbar/color'
    }),
    profilePath() {
      return `http://localhost:3000${this.user.profilePath}`
    }
  }
}
</script>

<style>

</style>