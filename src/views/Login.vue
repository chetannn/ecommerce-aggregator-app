<template>
  <div>
     <v-snackbar :center="true" :timeout="3000" :top="true" color="error" v-model="snackbar">
      {{ notificationMessage }}
      <v-btn @click="snackbar = false" dark text>Close</v-btn>
    </v-snackbar>

    <v-container fill-height>
      <v-layout align-center justify-center>
        <v-flex  xs12 sm4 elevation-6>
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
                  :error-messages="emailErrors"
                  @input="$v.email.$touch()"
                  @blur="$v.email.$touch()"
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
                  :error-messages="passwordErrors"
                  @input="$v.password.$touch()"
                  @blur="$v.password.$touch()"
                ></v-text-field>
              </div>
            </v-card-text>
            <v-divider></v-divider>
            <v-card-actions>
              <v-spacer />
              <v-btn :disabled="$v.$invalid" color="info" :loading="loading" text @click="login">Login</v-btn>
               <v-btn text>Register</v-btn>
            </v-card-actions>
          </v-card>
        </v-flex>
      </v-layout>
    </v-container>
  </div>
</template>

<script>
import { validationMixin } from 'vuelidate'
import {  required, minLength, email  } from 'vuelidate/lib/validators'
import { mapActions } from 'vuex'

export default {
  mixins: [validationMixin],
  name: 'Login',
  validations: {
    email: { required, minLength: minLength(4), email },
    password: { required, minLength: minLength(6) }
  },
  data() {
    return {
      email: null,
      password: null,
      loading: false,
      showPassword: false,
      snackbar: false,
      notificationMessage: ''
    };
  },
  methods: {
    ...mapActions({
      signIn: 'auth/signIn'
    }),
    async login() {
      this.$v.$touch()
      if(this.$v.$invalid) return;
      this.loading = true
      setTimeout(async () => {
        this.signIn({
          email: this.email,
          password: this.password,
        }).then(() => {
          this.loading = false
          this.$router.replace({ name: 'products' })
        })
        .catch((e) => {
          let res = e.response
          this.notificationMessage = res.data.error
          this.snackbar = true
          this.loading = false
        })
      }, 500)
    },
  },
  computed: {
    emailErrors() {
      const errors = []
      if(!this.$v.email.$dirty) return errors
      !this.$v.email.email && errors.push('Must be valid e-mail')
      !this.$v.email.required && errors.push('Email is required')
      return errors
    },
     passwordErrors() {
      const errors = []
      if (!this.$v.password.$dirty) return errors
      !this.$v.password.minLength &&
        errors.push('Password must be at least 6 characters long')
       !this.$v.password.required && errors.push('Password is required')
      return errors
    },
  }
};
</script>

<style scoped>
   .login-container {
     display: flex;
     align-items: center;
     justify-content: center;
     height: 100vh;
   }
</style>