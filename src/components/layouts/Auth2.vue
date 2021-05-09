<template>
<v-app>
      <router-view />

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
  computed: {
    ...mapGetters({
      snackbarText: 'snackbar/snackbarText',
      snackbarColor: 'snackbar/color'
    }),
    profilePath() {
      return `http://localhost:3000${this.user.profilePath}`
    }
   }
}
</script>