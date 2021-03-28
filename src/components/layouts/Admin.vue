<template>
<v-app>
    <v-app-bar app color="primary" dark>
        <v-app-bar-nav-icon @click="drawer = !drawer"></v-app-bar-nav-icon>
      <v-app-bar-title>Admin</v-app-bar-title>

      <v-spacer></v-spacer>
      <v-menu
      offset-y
      bottom
      nudge-bottom="10"
      left>
      <template v-slot:activator="{ on, attrs }">
        <v-btn
          @click="notificationsBadge ? notificationsBadge = !notificationsBadge : ''"
          v-bind="attrs"
          v-on="on"
          icon
          class="mr-2">
          <v-badge
            :value="notificationsBadge"
            color="error"
            content="4"
            overlap>
            <v-icon
              size="28"
            >mdi-bell-outline</v-icon>
          </v-badge>
        </v-btn>
      </template>
      <v-list>
        <v-list-item-group color="primary">
          <v-list-item
            v-for="(item, i) in notifications"
            :key="i"
          >
            <v-list-item-icon class="mr-4 mb-1">
              <v-icon
                :color="item.color"
                v-text="item.icon"
              ></v-icon>
            </v-list-item-icon>
            <v-list-item-content>
              <v-list-item-title v-text="item.text"></v-list-item-title>
            </v-list-item-content>
          </v-list-item>
        </v-list-item-group>
      </v-list>
    </v-menu>

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
        :src="profilePath"
        alt="John"
       > 
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
              class="text-capitalize">Sign Out</v-btn>
          </div>
         </v-list>
          </v-menu>
           <div class="greeting-text mr-3 d-none d-md-block">Hi, <span>{{ user.firstName}} {{ user.lastName}}</span></div>
      </v-app-bar>

      <v-navigation-drawer v-model="drawer" app>
          
           <v-list-item>
      <v-list-item-content>
        <v-list-item-title class="title">Aggregator</v-list-item-title>
        <v-list-item-subtitle>sub title</v-list-item-subtitle>
      </v-list-item-content>
    </v-list-item>

          
        

    <v-divider></v-divider>

     <v-list>
               <v-list-item link  color="primary" v-for="item in links" :to="item.route" :key="item.text">
        <v-list-item-icon>
          <v-icon>{{ item.icon }}</v-icon>
        </v-list-item-icon>

        <v-list-item-content>
          <v-list-item-title>{{ item.text }}</v-list-item-title>
        </v-list-item-content>
      </v-list-item>
           </v-list>

      </v-navigation-drawer>

    <v-main>
      <router-view />
    </v-main>
  </v-app>
</template>

<script>
import { mapActions, mapGetters } from 'vuex'

export default {
   data() {
     return {
        drawer: true,
        links: [
      { icon: 'mdi-view-dashboard-outline', text: 'Dashboard', route: '/admin/dashboard' },
      { icon: 'mdi-folder-outline', text: 'Sources', route: '/admin/source' },
      { icon: 'mdi-account-circle-outline', text: 'User Management', route: '/admin/users' },
      { icon: 'mdi-wrench-outline', text: 'Settings', route: '/settings' }
    ],
     notifications: [
        { text: 'Check out this awesome ticket', icon: 'mdi-tag', color: 'warning' },
        { text: 'What is the best way to get ...', icon: 'mdi-thumb-up', color: 'success'  },
        { text: 'This is just a simple notification', icon: 'mdi-flag', color: 'error'  },
        { text: '12 new orders has arrived today', icon: 'mdi-cart', color: 'primary'  },
      ],
      notificationsBadge: true,
     }
   },
   computed: {
    ...mapGetters({
      user: 'auth/user',
      authenticated: 'auth/authenticated'
    }),
    profilePath() {
      return `http://localhost:3000${this.user.profilePath}`
    }
   }
}
</script>

<style>

</style>