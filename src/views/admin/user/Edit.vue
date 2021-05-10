<template>
  <v-dialog persistent v-model="dialog" max-width="500">
    <v-card>
      <v-card-title class="white--text headline primary mb-2">
        Edit User
        <v-spacer />
        <v-btn icon text color="white" @click="dialog = false">
          <v-icon>mdi-close</v-icon>
        </v-btn>
      </v-card-title>

      <div class="py-6 blue-grey lighten-4 text-center mb-2">
        <v-avatar size="128" class="grey lighten-4">
          <img :src="getPath()" alt="avatar">
        </v-avatar>
      </div>

      <v-card-text>
        <v-text-field
          v-model="form.firstName"
          outlined
          label="First Name"
        ></v-text-field>
        <v-text-field
          v-model="form.lastName"
          outlined
          label="Last Name"
        ></v-text-field>
        <v-text-field
          v-model="form.email"
          outlined
          label="Email"
        ></v-text-field>
        <v-text-field
          type="password"
          v-model="form.password"
          outlined
          label="Password"
        ></v-text-field>
        <v-switch v-model="form.isAdmin" label="Admin" inset></v-switch>
      </v-card-text>

      <v-card-actions>
        <v-spacer />
        <v-btn text @click="dialog = false">Close</v-btn>
        <v-btn @click="save" text color="primary">Save</v-btn>
      </v-card-actions>
    </v-card>
  </v-dialog>
</template>

<script>
import UserService from "@/services/UserService";
import { mapMutations } from "vuex";

export default {
  data() {
    return {
      dialog: false,
      form: {
        firstName: "",
        lastName: "",
        email: "",
        password: "",
        isAdmin: false,
        profilePath: "",
      },
    };
  },
  methods: {
      ...mapMutations({
      setSnackbar: "snackbar/setSnackbar",
    }),
    edit(id) {
     UserService.getUserById(id).then(res => {
         delete res.data.data.password
         this.form = res.data.data
         this.dialog = true;
     })
    },
    save() {
    //     AuthenticationService.register(this.form).then((res) => {
    //     if (res.status === 201) {
    //       this.dialog = false;
    //       this.setSnackbar({
    //         message: "User Registered Successfully!",
    //         color: "success",
    //       });
    //       this.$emit('onUserSave', res.data)
    //     }
    //   });
    },
    getPath() {
        return `http://localhost:3000${this.form.profilePath}`
    }
  },
};
</script>

<style>
</style>