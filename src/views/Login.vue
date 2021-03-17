<template>
  <div>
    <v-container fluid fill-height>
      <v-layout align-center justify-center>
        <v-flex xs12 sm4 elevation-6>
          <v-card>
            <v-card-title><h1 class="display-1">Login</h1></v-card-title>
            <v-divider></v-divider>

            <v-card-text class="pt-4">
              <div>
                <v-text-field
                  label="E-mail address"
                  v-model="email"
                  required
                  outlined
                  prepend-inner-icon="mdi-account-circle"
                ></v-text-field>
                <v-text-field
                  label="Password"
                  v-model="password"
                  min="8"
                  counter
                  outlined
                 :type="showPassword ? 'text' : 'password'"
                  @keyup.enter="login"
                  required
                  prepend-inner-icon="mdi-lock"
                  :append-icon="showPassword ? 'mdi-eye' : 'mdi-eye-off'"
                  @click:append="showPassword = !showPassword"
                ></v-text-field>
              </div>
            </v-card-text>
            <v-divider></v-divider>
            <v-card-actions>
              <v-spacer />
              <v-btn color="info" :loading="loading" text @click="login">Login</v-btn>
               <v-btn text>Register</v-btn>
            </v-card-actions>
          </v-card>
        </v-flex>
      </v-layout>
    </v-container>
  </div>
</template>

<script>
export default {
  name: 'Login',
  data() {
    return {
      email: null,
      password: null,
      loading: false,
      showPassword: false
    };
  },
  methods: {
    async login() {
      this.loading = true

      setTimeout(async () => {
        await this.$store.dispatch('auth/signIn', {
          email: this.email,
          password: this.password,
        })
        this.loading = false
        this.$router.push({ name: 'products' })
      }, 500);
    },
  },
};
</script>
