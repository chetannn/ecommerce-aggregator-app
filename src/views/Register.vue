<template>
  <div>
     <v-snackbar :center="true" :timeout="3000" :top="true" color="error" v-model="snackbar">
      {{ notificationMessage }}
      <v-btn @click="snackbar = false" dark text>Close</v-btn>
    </v-snackbar>

      <v-container fluid fill-height>
          <v-layout align-center justify-center>
            <v-flex xs12 sm4 elevation-6>
              <v-card>
                      <v-card-title><h1 class="display-1">Register</h1></v-card-title>
            <v-divider></v-divider>
                <v-card-text class="pt-4">
                  <div>
                        <v-text-field
                          label="First Name"
                          v-model="firstName"
                          outlined
                          required
                          :error-messages="firstNameErrors"
                          @input="$v.firstName.$touch()"
                          @blur="$v.firstName.$touch()"
                        ></v-text-field>
                        <v-text-field
                          label="Last Name"
                          v-model="lastName"
                          outlined
                          required
                          :error-messages="lastNameErrors"
                          @input="$v.lastName.$touch()"
                          @blur="$v.lastName.$touch()"
                        ></v-text-field>
                        <v-text-field
                          label="E-mail address"
                          v-model="email"
                          prepend-inner-icon="mdi-account-circle"
                          outlined
                          required
                          :error-messages="emailErrors"
                          @input="$v.email.$touch()"
                          @blur="$v.email.$touch()"
                        ></v-text-field>
                        <v-text-field
                          label="Password"
                          prepend-inner-icon="mdi-lock"
                          v-model="password"
                          :append-icon="showPassword ? 'mdi-eye' : 'mdi-eye-off'"
                          @click:append="showPassword = !showPassword"
                          min="8"
                          counter
                          :type="showPassword ? 'text' : 'password'"
                          outlined
                          required
                          :error-messages="passwordErrors"
                          @input="$v.password.$touch()"
                          @blur="$v.password.$touch()"
                        ></v-text-field>
                        
                  </div>
                </v-card-text>
                <v-divider></v-divider>
            <v-card-actions>
              <v-spacer />
              <v-btn :disabled="$v.$invalid" color="info" :loading="loading" text @click="register">Register</v-btn>
                            
            </v-card-actions>
              </v-card>
            </v-flex>
          </v-layout> 

      </v-container>
  </div>
</template>

<script>
import AuthenticationService from '@/services/AuthenticationService'
import { validationMixin } from 'vuelidate'
import {  required, minLength, email  } from 'vuelidate/lib/validators'

export default {
  mixins: [validationMixin],
  name: 'Register',
  validations: {
    email: { required, minLength: minLength(4), email },
    password: { required, minLength: minLength(6) },
    firstName: { required },
    lastName: { required },
  },
  data() {
      return {
          email: null,
          password: null,
          firstName: null,
          lastName: null,
          showPassword: false,
          snackbar: false,
          notificationMessage: '',
          loading: false
      }
  },
  methods: {
    async register() {
      try {
        this.loading = true 
        this.$v.$touch()
        if(this.$v.$invalid) return;
        await AuthenticationService.register({
            firstName: this.firstName,
            lastName: this.lastName,
            email: this.email,
            password: this.password
        })
        this.loading = false
        this.$router.push({ name: 'login' })
      }
      catch(e) {
           this.notificationMessage = e.response.data.error
          this.snackbar = true
          this.loading = false
      }
       
    }  
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
    firstNameErrors() {
      const errors = []
      if(!this.$v.firstName.$dirty) return errors
      !this.$v.firstName.required && errors.push('First Name is required')
      return errors
    },
     lastNameErrors() {
      const errors = []
      if(!this.$v.lastName.$dirty) return errors
      !this.$v.lastName.required && errors.push('Last Name is required')
      return errors
    }
  }
}
</script>
