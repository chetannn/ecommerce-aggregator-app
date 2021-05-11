<template>
  <v-dialog persistent v-model="dialog" max-width="500">
    <v-card>
      <v-card-title class="white--text headline primary mb-4">
        Edit Source
        <v-spacer />
        <v-btn icon text color="white" @click="dialog = false">
          <v-icon>mdi-close</v-icon>
        </v-btn>
      </v-card-title>

      <v-card-text>
        <v-text-field v-model="form.name" outlined label="Name"></v-text-field>
        <v-text-field v-model="form.url" outlined label="Link"></v-text-field>
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
import SourceService from "@/services/SourceService";
import { mapMutations } from "vuex";

export default {
    data() {
        return {
            form: {
                name: '',
                url: ''
            },
            dialog: false
        }
    },
  methods: {
    ...mapMutations({
      setSnackbar: "snackbar/setSnackbar",
    }),
    edit(id) {
        SourceService.getById(id).then(res => {
            if(res.status === 200) {
                this.form = res.data.data
                this.dialog = true
            }
        })
    },
    save() {
        SourceService.update(this.form).then((res) => {
        if (res.status === 200) {
          this.dialog = false;
          this.setSnackbar({
            message: res.data.message,
            color: "success",
          });
          this.$emit('onSourceUpdate', res.data)
        }
      });
    }
  },
};
</script>

<style>
</style>