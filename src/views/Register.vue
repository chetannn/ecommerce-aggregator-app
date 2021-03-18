<template>
  <div>
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
                        ></v-text-field>
                        <v-text-field
                          label="Last Name"
                          v-model="lastName"
                          outlined
                          required
                        ></v-text-field>
                        <v-text-field
                          label="E-mail address"
                          v-model="email"
                          prepend-inner-icon="mdi-account-circle"
                          outlined
                          required
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
                        ></v-text-field>
                        
                  </div>
                </v-card-text>
                <v-divider></v-divider>
            <v-card-actions>
              <v-spacer />
              <v-btn color="info" text @click="register">Register</v-btn>
                            
            </v-card-actions>
              </v-card>
            </v-flex>
          </v-layout> 
      </v-container>
  </div>
</template>

<script>
import AuthenticationService from '@/services/AuthenticationService'

export default {
  name: 'Register',
  data() {
      return {
          email: null,
          password: null,
          firstName: null,
          lastName: null,
          showPassword: false
      }
  },
  methods: {
    async register() {
       const response = await AuthenticationService.register({
            firstName: this.firstName,
            lastName: this.lastName,
            email: this.email,
            password: this.password
        })
        console.log(response.data)
    }  
  }
}
</script>
