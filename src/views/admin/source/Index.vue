<template>
  <v-container fluid>
    <SourceAdd ref="sourceAdd" @onAddSource="onAddSource" />
    <SourceEdit ref="sourceEdit" @onSourceUpdate="onSourceUpdate" />
    <CategoryLinkAdd ref="categoryLinkAdd" @onAddCategoryLink="onAddCategoryLink" />
    <CategoryLinkEdit ref="categoryLinkEdit" @onCategoryLinkUpdate="onCategoryLinkUpdate" />

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
          <v-card-text class="headline">{{ stats.total }}</v-card-text>
        </v-card>
      </v-col>

      <v-col cols="12" md="4">
        <v-card>
          <v-card-title>In Active</v-card-title>
          <v-card-text class="headline">0</v-card-text>
        </v-card>
      </v-col>
    </v-row>

    <v-card>
      <v-data-table
        show-select
        single-select
        @dblclick:row="onSourceRowDoubleClick"
        :loading="loading"
        :headers="headers"
        :items="sources"
      >
        <template v-slot:top>
          <v-toolbar flat>
            <v-toolbar-title>Sources</v-toolbar-title>
            <v-divider class="mx-4" inset vertical></v-divider>
            <!-- <v-spacer></v-spacer> -->
            <v-btn @click="openSourceDialog" dark class="primary mr-2"
              >Add<v-icon>mdi-plus</v-icon></v-btn
            >
          </v-toolbar>
        </template>

        <template v-slot:[`item.actions`]="{ item }">
          <v-btn @click="onEditSourceClick(item)" dark icon class="success">
            <v-icon small> mdi-pencil-outline </v-icon>
          </v-btn>

          <v-btn
            @click="onDeleteSourceClick(item)"
            class="ml-2 error"
            dark
            icon
          >
            <v-icon small> mdi-delete-outline </v-icon>
          </v-btn>
        </template>

        <template v-slot:[`item.createdAt`]="{ item }">
          {{ formatDate(item.createdAt) }}
        </template>

        <template v-slot:[`item.status`]="{ item }">
          <v-chip color="primary" small> Active </v-chip>
        </template>
      </v-data-table>
    </v-card>

    <v-card class="mt-4">
      <v-data-table
        :items="categoryLinks"
        :loading="loading"
        :headers="categoryLinkHeaders"
      >
        <template v-slot:top>
          <v-toolbar flat>
            <v-toolbar-title>Links</v-toolbar-title>
            <v-divider class="mx-4" inset vertical></v-divider>
            <!-- <v-spacer></v-spacer> -->
            <v-btn
              v-if="showCategory"
              @click="openCategoryLinkAddDialog"
              dark
              class="primary mr-2"
              >Add<v-icon>mdi-plus</v-icon></v-btn
            >
          </v-toolbar>
        </template>

        <template v-slot:[`item.createdAt`]="{ item }">
          {{ formatDate(item.createdAt) }}
        </template>

        <template v-slot:[`item.sourceId`]="{ item }">
          <span>{{ item.Source.name }}</span>
        </template>

        <template v-slot:[`item.actions`]="{ item }">
          <v-btn @click="onEditCategoryLinkClick(item)" dark icon class="success">
            <v-icon small> mdi-pencil-outline </v-icon>
          </v-btn>

          <v-btn
            @click="onDeleteCategoryLink(item)"
            class="ml-2 error"
            dark
            icon
          >
            <v-icon small> mdi-delete-outline </v-icon>
          </v-btn>
        </template>
      </v-data-table>
    </v-card>
  </v-container>
</template>

<script>
import SourceService from "@/services/SourceService";
import CategoryLinkService from "@/services/CategoryLinkService";
import moment from "moment";
import { mapMutations } from "vuex";
import SourceAdd from "./Add";
import SourceEdit from './Edit'
import CategoryLinkAdd from './link/Add'
import CategoryLinkEdit from './link/Edit'

export default {
  components: {
    SourceAdd,
    SourceEdit,
    CategoryLinkAdd,
    CategoryLinkEdit
  },
  data() {
    return {
      headers: [
        { text: "Name", value: "name" },
        { text: "Url", value: "url" },
        { text: "Created At", value: "createdAt" },
        { text: "Status", value: "status" },
        { text: "Actions", value: "actions" },
      ],
      categoryLinkHeaders: [
        { text: "Source", value: "sourceId" },
        { text: "Link", value: "link" },
        { text: "Created At", value: "createdAt" },
        { text: "Actions", value: "actions" },
      ],
      sources: [],
      categoryLinks: [],
      stats: [],
      loading: false,
      dialog: false,
      linkDialog: false,
      form: {
        name: "",
        url: "",
      },
      linkForm: {
        link: "",
        sourceId: null,
      },
      showCategory: false,
      selectedSourceId: null
    };
  },
  mounted() {
    this.loading = true;
    SourceService.stats().then((res) => {
      this.stats = res.data.data[0];
    });
    SourceService.all({}).then((res) => {
      this.sources = res.data.data.items;
      this.loading = false;
    });
  },
  methods: {
    ...mapMutations({
      setSnackbar: "snackbar/setSnackbar",
    }),
    formatDate(date) {
      return moment(date).format("LLL");
    },
    openSourceDialog() {
      this.$refs.sourceAdd.create();
    },
    onAddSource(data) {
      SourceService.all({}).then((res) => {
        this.sources = res.data.data.items;
        this.loading = false;
      });
    },
    onSourceUpdate(res) {
      SourceService.all({}).then((res) => {
        this.sources = res.data.data.items;
        this.loading = false;
      });
    },
    openCategoryLinkAddDialog() {
      this.$refs.categoryLinkAdd.create(this.selectedSourceId)
    },
    onAddCategoryLink(link) {

    },
    onCategoryLinkUpdate(res) {

    },
    onEditCategoryLinkClick(link) {
      this.$refs.categoryLinkEdit.edit(link.id)
    },
    save() {
      SourceService.create(this.form).then((res) => {
        if (res.status === 201) {
          this.dialog = false;
          this.setSnackbar({
            message: res.data.message,
            color: "success",
          });
        }
      });
    },
    onEditSourceClick(source) {
      this.$refs.sourceEdit.edit(source.id)
    },
    
    onSourceRowDoubleClick(e, { item, select }) {
      // this.linkForm.sourceId = item.id;
      this.selectedSourceId = item.id
      select(true);
      CategoryLinkService.getAllCategoryLinksBySourceId(item.id)
        .then((res) => {
          this.categoryLinks = res.data.data;
          this.$vuetify.goTo(9999);
          this.showCategory = true;
        })
        .catch((err) => {
          this.showCategory = true;
        });
    },
    onDeleteSourceClick(source) {
      this.$confirm("Are you sure you want to delete this source?", {
        title: "Warning",
        persistent: true,
      }).then((res) => {
        if (res) {
          SourceService.delete(source.id).then((res) => {
            if (res.status === 200) {
              this.setSnackbar({
                message: res.data.message,
                color: "success",
              });
              // this.all()
            }
          });
        }
      });
    },
    onDeleteCategoryLink(categoryLink) {
      this.$confirm("Are you sure you want to delete this link?", {
        title: "Warning",
        persistent: true,
      }).then((res) => {
        if (res) {
          CategoryLinkService.deleteCategoryLink(categoryLink.id).then(
            (res) => {
              if (res.status === 200) {
                this.setSnackbar({
                  message: res.data.message,
                  color: "success",
                });
              }
            }
          );
        }
      });
    },
  },
};
</script>

<style>
</style>