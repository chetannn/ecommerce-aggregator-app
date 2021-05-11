<template>
  <v-dialog persistent v-model="dialog" max-width="500">
    <v-card>
      <v-card-title class="white--text headline primary mb-4">
        Add Link
        <v-spacer />
        <v-btn icon text color="white" @click="dialog = false">
          <v-icon>mdi-close</v-icon>
        </v-btn>
      </v-card-title>

      <v-card-text>
        <v-text-field v-model="form.link" outlined label="Link"></v-text-field>
      </v-card-text>

      <v-card-actions>
        <v-spacer />
        <v-btn text @click="dialog = false">Cancel</v-btn>
        <v-btn color="primary" @click="save" text>Save</v-btn>
      </v-card-actions>
    </v-card>
  </v-dialog>
</template>

<script>
import CategoryLinkService from "@/services/CategoryLinkService";
import { mapMutations } from "vuex";

export default {
  data() {
    return {
      form: {
        link: "",
        sourceId: null
      },
      dialog: false,
    };
  },
  methods: {
    ...mapMutations({
      setSnackbar: "snackbar/setSnackbar",
    }),
    create(sourceId) {
      this.form.sourceId = sourceId
      this.dialog = true;
    },
    save() {
      CategoryLinkService.create(this.form).then((res) => {
        if (res.status === 201) {
          this.dialog = false;
          this.setSnackbar({
            message: res.data.message,
            color: "success",
          });
          this.$emit("onAddCategoryLink", res.data);
        }
      });
    },
  },
};
</script>

<style>
</style>