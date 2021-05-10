<template>
  <v-container fluid>
    <UserAdd ref="userAdd" @onUserSave="onUserAdd" />
    <UserEdit ref="userEdit" @onUserEdit="onUserEdit" />
    <v-row class="ma-0">
      <!-- <v-card width="100%" class="ma-1">
        <v-card-text>
          <v-row no-gutters>
            <v-col cols="12" md="6" class="d-flex justify-space-between justify-md-start">
              <v-btn to="/user/add" color="success" class="button-shadow mr-3">
                <v-icon class="mr-2">mdi-plus</v-icon>
                Add
              </v-btn>
              <v-btn color="primary" outlined class="button-shadow">
                <v-icon class="mr-2">mdi-filter-variant</v-icon>
                Filters
              </v-btn>
            </v-col>
            <v-col cols="12" md="6" class="d-flex justify-end mt-3 mt-md-0">
              <v-btn color="secondary" outlined :block=$vuetify.breakpoint.smAndDown>
                <v-icon class="mr-3">mdi-download</v-icon>
                Download
              </v-btn>
            </v-col>
            <v-col cols="12" class="d-flex justify-end mt-3">
              <div :style="$vuetify.breakpoint.smAndDown ? 'width: 100%' : 'width: 250px'">
                <v-text-field
                  dense
                  :full-width=$vuetify.breakpoint.smAndDown
                  outlined
                  hide-details
                  label="Search"
                  prepend-inner-icon="mdi-magnify"
                ></v-text-field>
              </div>
            </v-col>
          </v-row>
        </v-card-text>
      </v-card> -->
    </v-row>

    <v-row class="mb-2">
      <v-col cols="12" md="4">
        <v-card>
          <v-card-title>Total</v-card-title>
          <v-card-text class="headline">{{ stats.total }}</v-card-text>
        </v-card>
      </v-col>

      <v-col cols="12" md="4">
        <v-card>
          <v-card-title>Active</v-card-title>
          <v-card-text class="headline">20</v-card-text>
        </v-card>
      </v-col>

      <v-col cols="12" md="4">
        <v-card>
          <v-card-title>In Active</v-card-title>
          <v-card-text class="headline">10</v-card-text>
        </v-card>
      </v-col>
    </v-row>

    <v-card>
      <v-data-table :headers="headers" :items="users" :loading="loading">
        <template v-slot:top>
          <v-toolbar flat>
            <v-toolbar-title>Users</v-toolbar-title>
            <v-divider class="mx-4" inset vertical></v-divider>
            <!-- <v-spacer></v-spacer> -->
            <v-btn @click="openAddDialog" dark class="primary mr-2"
              >Add<v-icon>mdi-plus</v-icon></v-btn
            >
          </v-toolbar>
        </template>

        <template v-slot:[`item.profilePath`]="{ item }">
          <v-img
            v-if="item.profilePath"
            class="my-3"
            width="34"
            :src="`http://localhost:3000${item.profilePath}`"
          ></v-img>
          <v-avatar v-else color="warning" size="34">
            <span class="white--text headline">{{
              item.firstName.toUpperCase()
            }}</span>
          </v-avatar>
        </template>

        <template v-slot:[`item.actions`]="{ item }">
          <v-btn @click="openEditDialog(item)" dark icon class="success">
            <v-icon small> mdi-pencil-outline </v-icon>
          </v-btn>

          <v-btn @click="deleteUser(item)" class="ml-2 error" dark icon>
            <v-icon small> mdi-delete-outline </v-icon>
          </v-btn>
        </template>

        <template v-slot:[`item.status`]="{ item }">
          <v-chip color="primary" small> Active </v-chip>
        </template>

        <template v-slot:[`item.createdAt`]="{ item }">
          {{ formatDate(item.createdAt) }}
        </template>

        <template v-slot:[`item.isAdmin`]="{ item }">
          {{ item.isAdmin ? "admin" : "user" }}
        </template>
      </v-data-table>
    </v-card>

    
  </v-container>
</template>

<script>
import UserService from "@/services/UserService";
import AuthenticationService from "@/services/AuthenticationService";
import moment from "moment";
import { mapMutations } from "vuex";
import UserAdd from './Add'
import UserEdit from './Edit'

export default {
  components: {
    UserAdd,
    UserEdit
  },
  data() {
    return {
      headers: [
        { text: "Profile", value: "profilePath", sortable: false },
        { text: "First Name", value: "firstName" },
        { text: "Last Name", value: "lastName" },
        { text: "Email", value: "email" },
        { text: "Role", value: "isAdmin" },
        { text: "Status", value: "status" },
        { text: "Created At", value: "createdAt" },
        { text: "Actions", value: "actions", sortable: false },
      ],
      users: [],
      stats: [],
      loading: false,
      dialog: false,
     
    };
  },
  mounted() {
    UserService.stats().then((res) => {
      this.stats = res.data.data[0];
    });
    this.all();
  },
  methods: {
    ...mapMutations({
      setSnackbar: "snackbar/setSnackbar",
    }),
    formatDate(date) {
      return moment(date).format("LLL");
    },
    all() {
      this.loading = true;
      UserService.all().then((res) => {
        if (res.status === 200) {
          this.users = res.data.users;
          this.loading = false;
        }
      });
    },
    openAddDialog() {
      this.$refs.userAdd.create();
    },
    onUserAdd(user) {
        console.log(user)
        this.all()
    },
    openEditDialog(user) {
      this.$refs.userEdit.edit(user.id)
    },
    onUserEdit(user) {

    },
    deleteUser(user) {
      this.$confirm("Are you sure you want to delete this user?", { title: "Warning", persistent: true }).then(
        (res) => {
          if (res) {
            UserService.deleteUser(user.id).then((res) => {
              if (res.status === 200) {
                this.setSnackbar({
                  message: res.data.message,
                  color: "success",
                });
                this.all();
              }
            });
          }
        }
      );
    },
  },
};
</script>

<style>
</style>