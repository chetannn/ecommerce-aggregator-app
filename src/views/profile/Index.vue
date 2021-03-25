<template>
    <v-container>
      <v-row justify="center">
         <v-col
        cols="12"
        md="8"
      >
            <v-card>
                <v-card-title class="headline">Edit Profile</v-card-title>
                <v-divider/>
                
                <v-card-text>
                    <v-form>
            <v-container class="py-0">
              <v-row>
                 <v-col
                  cols="12"
                  md="6"
                >
                  <v-text-field
                  v-model="firstName"
                    label="First Name"
                    class="purple-input"
                    outlined
                    :error-messages="firstNameErrors"
                    @input="$v.firstName.$touch()"
                    @blur="$v.firstName.$touch()"
                  />
                </v-col>

                <v-col
                  cols="12"
                  md="6"
                >
                  <v-text-field
                    v-model="lastName"
                    label="Last Name"
                    class="purple-input"
                    outlined
                    :error-messages="lasttNameErrors"
                    @input="$v.lastName.$touch()"
                    @blur="$v.lastName.$touch()"
                  />
                </v-col>

                <v-col
                  cols="12"
                  md="6"
                >
                  <v-text-field
                    v-model="email"
                    label="Email Address"
                    class="purple-input"
                    outlined
                    :error-messages="emailErrors"
                    @input="$v.email.$touch()"
                    @blur="$v.email.$touch()"
                  />
                </v-col>

                <v-col cols="12">
                  <v-textarea
                    class="purple-input"
                    label="About Me"
                    outlined
                  />
                </v-col>

                <v-col
                  cols="12"
                  class="text-right"
                >
                  <v-btn
                    color="success"
                    @click="save"
                    class="mr-0"
                    :loading="loading"
                  >
                    Update Profile
                  </v-btn>
                </v-col>
              </v-row>
            </v-container>
          </v-form>
                </v-card-text>
            </v-card>
         </v-col>

         <v-col cols="12" md="4">
             <v-card>
                 <div class="d-flex grow flex-wrap">
                        <v-avatar
                        size="128"
                        class="mx-auto v-card__avatar elevation-6"
                        color="grey"
                        >
                          <v-img src="https://cdn.vuetifyjs.com/images/john.jpg" />
                        </v-avatar>
                 </div>
                 <v-card-text class="text-center">
                      <h6 class="display-1 mb-1 grey--text">
            </h6>

            <h4 class="display-2 font-weight-light mb-3 black--text">
              {{ userInfo.firstName }} {{ userInfo.lastName }}
            </h4>

            <p class="font-weight-light grey--text">
               {{ userInfo.email }}
            </p>

             <v-btn
              color="success"
              rounded
              class="mr-0"
            >
              Follow
            </v-btn>

                 </v-card-text>
             </v-card>
         </v-col>
      </v-row>
    </v-container>
</template>

<script>
import { mapGetters } from 'vuex'
import { validationMixin } from 'vuelidate'
import {  required, minLength, email  } from 'vuelidate/lib/validators'
import UserService from '@/services/UserService'

export default {
  mixins: [validationMixin],
  validations: {
    email: { required, minLength: minLength(4), email },
    password: { required, minLength: minLength(6) },
    firstName: { required },
    lastName: { required },
  },
    data() {
        return {
           firstName: '',
           lastName: '',
           email: '',
           loading: false
        }
    },
    mounted() {
        const { firstName, lastName, email } = this.userInfo
        this.firstName = firstName
        this.lastName = lastName
        this.email = email
    },
    methods: {
        save() {
            this.loading = true
            const user = {
              firstName: this.firstName,
              lastName: this.lastName,
              email: this.email
            }
            UserService.updateProfile(user)
            .then(res => {
               if(res.status === 200) {
                 this.loading = false
                 location.reload()
               }
            })
        }
    },
    computed: {
      ...mapGetters({
        userInfo: 'auth/user'
      }),
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

<style scoped>
/* .v-card__avatar {
     position: relative;
    top: -64px;
    margin-bottom: -32px;
} */
</style>