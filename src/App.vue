<template>
  <v-app>
      <router-view />
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

<style>
  #nprogress .bar {
  background: red !important;
  height: 10px;
}
#nprogress .spinner-icon {
  border-left-color: green !important;
  border-top-color: yellow  !important;
}
</style>
