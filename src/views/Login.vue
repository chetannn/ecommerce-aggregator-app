<template>
  <div>
      <v-container fluid fill-height>
          <v-layout align-center justify-center>
            <v-flex xs12 sm4 elevation-6>
              <v-card>
                  <v-card-title class="headline">Login</v-card-title>

                <v-card-text class="pt-4">
                  <div>
                        <v-text-field
                          label="E-mail address"
                          v-model="email"
                          outlined
                          required
                        ></v-text-field>
                        <v-text-field
                          label="Password"
                          v-model="password"
                          min="8"
                          counter
                          type="password"
                          outlined
                          required
                        ></v-text-field>
                        <v-layout justify-space-between>
                            <v-btn :loading="loading" text @click="login">Login</v-btn>
                            <a href="">Forgot Password</a>
                        </v-layout>
                  </div>
                </v-card-text>
              </v-card>
            </v-flex>
          </v-layout> 
      </v-container>
  </div>
</template>

<script>
import AuthenticationService from '@/services/AuthenticationService'

export default {
  name: 'Login',
  data() {
      return {
          email: null,
          password: null,
          loading: false
      }
  },
  methods: {
    async login() {
        this.loading = true

        setTimeout(async () => {
             const response = await AuthenticationService.login({
            email: this.email,
            password: this.password
        })
            this.$store.dispatch('setToken', response.data.token)
            this.$store.dispatch('setUser', response.data.user)
            this.loading = false

            this.$router.push({name: 'products'})
        }, 500)
    }  
  }
}
</script>
