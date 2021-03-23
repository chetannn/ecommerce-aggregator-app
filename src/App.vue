<template>
  <v-app>
    <v-main>
      <router-view />
    </v-main>
  </v-app>
</template>

<script>
import { mapActions, mapGetters } from 'vuex'
export default {
  name: 'App',
  data: () => ({
    //
  }),
  methods: {
    ...mapActions({
      logout: 'auth/logout'
    })
  },
  computed: {
    ...mapGetters({
      user: 'auth/user'
    })
  }
};
</script>
