<template>
  <v-row>
    <v-col cols="12" lg="7" xl="6" class="info d-none d-md-flex align-center justify-center">
      <v-container>
        <div class="pa-10">
          <v-row justify="center">
            <v-col cols="8" xl="5">
              <div>
                <h2
                  class="display-1 white--text font-weight-medium"
                >Nepagator</h2>
                <h6
                  class="subtitle-1 mt-4 white--text op-5 font-weight-regular"
                >Bringing E-commerce together.</h6>
                <v-btn class="mt-4 text-capitalize" x-large outlined color="white">Learn More</v-btn>
              </div>
            </v-col>
          </v-row>
        </div>
      </v-container>
    </v-col>
    <v-col cols="12" lg="5" xl="6" class="d-flex align-center">
      <v-container>
        <div class="pa-7 pa-sm-12">
          <v-row>
            <v-col cols="12" lg="9" xl="6">
              <img src="" />
              <h2 class="font-weight-bold mt-4 blue-grey--text text--darken-2">Sign in</h2>
              <h6 class="subtitle-1">
                Don't have an account?
                <a @click="$router.push('/auth/register')" style="text-decoration:none;">Sign Up</a>
              </h6>

              <v-form ref="form" v-model="valid" lazy-validation action="/dashboards/analytical">
                <v-text-field
                  v-model="email"
                  :rules="emailRules"
                  label="E-mail"
                  class="mt-4"
                  required
                  outlined
                ></v-text-field>
                <v-text-field
                  v-model="password"
                  counter
                  :rules="passwordRules"
                  label="Password"
                  required
                  outlined
                  :append-icon="show1 ? 'mdi-eye' : 'mdi-eye-off'"
                  @click:append="onTogglePasswordVisibility"
                  :type="show1 ? 'text' : 'password'"
                ></v-text-field>

                <div class="d-block d-sm-flex align-center mb-4 mb-sm-0">
                  <v-checkbox
                    v-model="checkbox"
                    :rules="[v => !!v || 'You must agree to continue!']"
                    label="Remember me?"
                    required
                  ></v-checkbox>
                  <div class="ml-auto">
                    <a href="javascript:void(0)" class="link">Forgot pwd?</a>
                  </div>
                </div>
                <v-btn
                  :disabled="!valid"
                  color="info"
                  block
                  class="mr-4"
                  submit
                  @click="submit"
                >Sign In</v-btn>
              </v-form>
              <!-- <div class="text-center mt-6">
                <v-chip pill class="mr-2">
                  <v-avatar left>
                    <v-btn color="blue lighten-1" class="white--text">
                      <v-icon>mdi-twitter</v-icon>
                    </v-btn>
                  </v-avatar>Twitter
                </v-chip>
                <v-chip pill>
                  <v-avatar left>
                    <v-btn color="teal lighten-2" class="white--text">
                      <v-icon>mdi-github</v-icon>
                    </v-btn>
                  </v-avatar>Github
                </v-chip>
              </div> -->
            </v-col>
          </v-row>
        </div>
      </v-container>
    </v-col>
  </v-row>
</template>

<script>
import { mapActions, mapMutations } from 'vuex'

export default {
  name: "FullLogin",
  data: () => ({
    valid: true,
    password: "",
    show1: false,
    passwordRules: [
      v => !!v || "Password is required",
      v => (v && v.length <= 10) || "Password must be less than 10 characters"
    ],
    email: "",
    emailRules: [
      v => !!v || "E-mail is required",
      v => /.+@.+\..+/.test(v) || "E-mail must be valid"
    ],
    checkbox: false
  }),
  methods: {
     ...mapMutations({
          setSnackbar: 'snackbar/setSnackbar'
       }),
     ...mapActions({
      signIn: 'auth/signIn'
    }),
    submit() {
      this.$refs.form.validate();
      if (this.$refs.form.validate(true)) {
         this.signIn({
          email: this.email,
          password: this.password,
        }).then(() => {
          // this.loading = false
          this.$router.push({ name: 'products' })
        })
        .catch((e) => {
          let res = e.response
          if(res.status === 403) {
            this.setSnackbar({
              message: res.data.error,
              color: 'error'
            })
          }
          // this.notificationMessage = res.data.error
          // this.snackbar = true
          // this.loading = false
        })
      }
    },
    onTogglePasswordVisibility() {
      this.show1 = !this.show1
    }
  }
};
</script>
