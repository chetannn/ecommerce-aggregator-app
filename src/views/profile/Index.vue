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
                    :error-messages="lastNameErrors"
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
                 <div style="cursor:pointer;" @click="launchFilePicker()">
                        <div class="d-flex grow flex-wrap">
                        <v-avatar
                        size="128"
                        class="mx-auto v-card__avatar elevation-6"
                        color="primary"
                        v-if="!imageUrl"
                        
                        >
                          <span style="color: white;">Click to add an avatar</span>
                        </v-avatar>

                        <v-avatar size="128" v-ripple v-else class="mb-3">
                          <img :src="imageUrl" alt="avatar">
                       </v-avatar>
                        </div>
                 </div>
                  <input type="file"
       ref="file"
       :name="uploadFieldName"
       @change="onFileChange(
          $event.target.name, $event.target.files)"
       style="display:none">
                 <v-card-text class="text-center">
                      <h6 class="display-1 mb-1 grey--text">
            </h6>

            <h4 class="display-2 font-weight-light mb-3 black--text">
              {{ userInfo.firstName }} {{ userInfo.lastName }}
            </h4>

            <p class="font-weight-light grey--text">
               {{ userInfo.email }}
            </p>

             <!-- <v-btn
              color="success"
              rounded
              class="mr-0"
            >
              Follow
            </v-btn> -->

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
           loading: false,
           file: null,
           selectedFile: null,
           maxSize: 1024,
           errorDialog: null,
           errorText: '',
           uploadFieldName: 'file',
           imageUrl: null
        }
    },
    mounted() {
        const { firstName, lastName, email } = this.userInfo
        this.firstName = firstName
        this.lastName = lastName
        this.email = email
        console.log(this.$store.getters['auth/user'].profilePath)
        this.imageUrl = 'http://localhost:3000' + this.$store.getters['auth/user'].profilePath
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
        },
        selectFile(file) {
            this.file = file
            UserService.uploadAvatar(this.file)
        },
        launchFilePicker(){
        this.$refs.file.click()
      },
        onFileChange(fieldName, file) {
        const { maxSize } = this
        let imageFile = file[0] 
 
        //check if user actually selected a file
        if (file.length>0) {
          let size = imageFile.size / maxSize / maxSize
          if (!imageFile.type.match('image.*')) {
            // check whether the upload is an image
            this.errorDialog = true
            this.errorText = 'Please choose an image file'
          } else if (size>1) {
            // check whether the size is greater than the size limit
            this.errorDialog = true
            this.errorText = 'Your file is too big! Please select an image under 1MB'
          } else {
            // Append file into FormData & turn file into image URL
            let formData = new FormData()
            let imageURL = URL.createObjectURL(imageFile)
            formData.append('file', imageFile)
            // Emit FormData & image URL to the parent component
            // this.$emit('input', { formData, imageURL })
            this.imageUrl = imageURL
             
             UserService.uploadAvatar(formData)

          }
        }
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