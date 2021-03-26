<template>
<v-app>
    <v-app-bar app color="primary" dark>
        <v-app-bar-nav-icon @click="drawer = !drawer"></v-app-bar-nav-icon>
      <v-app-bar-title>Admin</v-app-bar-title>

      <v-spacer></v-spacer>
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
            <v-avatar size="40">
              <img
        src="https://cdn.vuetifyjs.com/images/john.jpg"
        alt="John"
       > 
       </v-avatar>
          </v-btn>
        </template>

         <v-list>
             <v-list-item>
                <div class="headline">Chetan</div>
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
              class="text-capitalize">Sign Out</v-btn>
          </div>
         </v-list>
          </v-menu>
      </v-app-bar>

      <v-navigation-drawer v-model="drawer" app>
           <v-list-item>
      <v-list-item-content>
        <v-list-item-title class="title">Title</v-list-item-title>
        <v-list-item-subtitle>sub title</v-list-item-subtitle>
      </v-list-item-content>
    </v-list-item>

    <v-divider></v-divider>

      </v-navigation-drawer>
    <v-main>
      <router-view />
    </v-main>
  </v-app>
</template>

<script>
export default {
   data() {
     return {
        drawer: true
     }
   }
}
</script>

<style>

</style>