<template>
  <v-dialog persistent v-model="dialog" max-width="500">
    <v-card>
      <v-card-title class="white--text headline primary mb-2">
        Add User
        <v-spacer />
        <v-btn icon text color="white" @click="dialog = false">
          <v-icon>mdi-close</v-icon>
        </v-btn>
      </v-card-title>

      

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
import AuthenticationService from "@/services/AuthenticationService";
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
    create() {
      this.dialog = true;
    },
    save() {
        AuthenticationService.register(this.form).then((res) => {
        if (res.status === 201) {
          this.dialog = false;
          this.setSnackbar({
            message: "User Registered Successfully!",
            color: "success",
          });
          this.$emit('onUserSave', res.data)
        }
      });
    },
  },
};
</script>

<style>
</style>