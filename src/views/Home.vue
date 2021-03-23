<template>
<v-app class="layout-auth primary">
  
</v-app>
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