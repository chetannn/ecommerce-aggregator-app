<template>
  <v-container fluid>
         <!-- <v-row class="ma-0">
      <v-card width="100%" class="ma-1">
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
      </v-card>
    </v-row> -->
    
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
                  <v-card-text class="headline">12</v-card-text>
              </v-card>
          </v-col>

           <v-col cols="12" md="4">
              <v-card>
                  <v-card-title>In Active</v-card-title>
                  <v-card-text class="headline">8</v-card-text>
              </v-card>
          </v-col>
      </v-row>

      <v-card>
      <v-data-table show-select single-select @dblclick:row="onSourceRowDoubleClick" :loading="loading" :headers="headers" :items="sources">
        <template v-slot:top>
      <v-toolbar
        flat
      >
        <v-toolbar-title>Sources</v-toolbar-title>
        <v-divider
          class="mx-4"
          inset
          vertical
        ></v-divider>
        <!-- <v-spacer></v-spacer> -->
        <v-btn @click="dialog = true" dark class="primary mr-2" >Add<v-icon>mdi-plus</v-icon></v-btn>
      </v-toolbar>
          </template>

        <template v-slot:[`item.actions`]="{ item }">
            <v-btn dark icon class="success">
      <v-icon
        small
      >
        mdi-pencil-outline
      </v-icon>
            </v-btn>

      <v-btn class="ml-2 error" dark icon>      
      <v-icon
        small
      >
        mdi-delete-outline
      </v-icon>
      </v-btn>

    </template>

    <template v-slot:[`item.createdAt`]="{ item }">
                 {{ formatDate(item.createdAt) }}
              </template>

    <template v-slot:[`item.status`]="{ item }">
                <v-chip
                  color="primary"
                  small>
                   Active
                </v-chip>
              </template>

      </v-data-table>
      </v-card>

      <v-card class="mt-4">
        <v-data-table :items="categoryLinks" :loading="loading" :headers="categoryLinkHeaders">
          <template v-slot:top>
      <v-toolbar
        flat
      >
        <v-toolbar-title>Links</v-toolbar-title>
        <v-divider
          class="mx-4"
          inset
          vertical
        ></v-divider>
        <!-- <v-spacer></v-spacer> -->
        <v-btn v-if="showCategory" @click="linkDialog = true" dark class="primary mr-2">Add<v-icon>mdi-plus</v-icon></v-btn>
      </v-toolbar>
          </template>

           <template v-slot:[`item.createdAt`]="{ item }">
                 {{ formatDate(item.createdAt) }}
              </template>
        </v-data-table>
      </v-card>

      <v-dialog persistent v-model="dialog" max-width="500">
          <v-card>
            <v-card-title class="white--text headline primary mb-4">
              Add Source
                 <v-spacer />
                  <v-btn icon text color="white" @click="dialog=false">
                              <v-icon>mdi-close</v-icon>
                            </v-btn>
            </v-card-title>

            <v-card-text>
              <v-text-field v-model="form.name" outlined label="Name"></v-text-field>
              <v-text-field v-model="form.link" outlined label="Link"></v-text-field>
            </v-card-text>

            <v-card-actions>
              <v-spacer />
              <v-btn text @click="dialog = false">Cancel</v-btn>
              <v-btn color="primary" @click="save" text>Save</v-btn>
            </v-card-actions>
          </v-card>
      </v-dialog>

         <v-dialog persistent v-model="linkDialog" max-width="500">
          <v-card>
            <v-card-title class="white--text headline primary mb-4">
              Add Link
                 <v-spacer />
                  <v-btn icon text color="white" @click="linkDialog=false">
                              <v-icon>mdi-close</v-icon>
                            </v-btn>
            </v-card-title>

            <v-card-text>
              <v-text-field v-model="linkForm.link" outlined label="Link"></v-text-field>
            </v-card-text>

            <v-card-actions>
              <v-spacer />
              <v-btn text @click="linkDialog = false">Cancel</v-btn>
              <v-btn color="primary" @click="saveLink" text>Save</v-btn>
            </v-card-actions>
          </v-card>
      </v-dialog>
  </v-container>
</template>

<script>
import SourceService from '@/services/SourceService'
import CategoryLinkService from '@/services/CategoryLinkService'
import moment from 'moment'
import { mapMutations } from 'vuex'

export default {
    data() {
        return {
            headers: [
                { text: 'Name', value: 'name' },
                { text: 'Url', value: 'url' },
                { text: 'Created At', value: 'createdAt' },
                { text: 'Status', value: 'status' },
                { text: 'Actions', value: 'actions' }
            ],
            categoryLinkHeaders: [
               { text: 'Source', value: 'sourceId' },
               { text: 'Link', value: 'link' },
              { text: 'Created At', value: 'createdAt' }
            ],
            sources: [],
            categoryLinks: [],
            stats: [],
            loading: false,
            dialog: false,
            linkDialog: false,
            form: {
              name: '',
              url: ''
            },
            linkForm: {
              link: '',
              sourceId: null
            },
            showCategory: false
        }
    },
    mounted() {
        this.loading = true
        SourceService.stats().then(res => {
          this.stats = res.data.data[0]
        })
        SourceService.all({}).then(res => {
           this.sources =  res.data.data.items
           this.loading = false
        })
    },
     methods: {
        ...mapMutations({
          setSnackbar: 'snackbar/setSnackbar'
       }),
       formatDate(date) {
        return moment(date).format('LLL')
      },
      save() {
        SourceService.create(this.form).then(res => {
          if(res.status === 201) {
            this.dialog = false
            this.setSnackbar({
              message: res.data.message,
              color: 'success'
            })
          }
        })
      },
      saveLink() {
        CategoryLinkService.create(this.linkForm).then(res => {
          if(res.status === 201) {
            this.linkDialog = false
            this.setSnackbar({
              message: res.data.message,
              color: 'success'
            })
          }
        })
      },
      onSourceRowDoubleClick(e, { item, select }) {
        this.linkForm.sourceId = item.id
        select(true)
       CategoryLinkService.all({}).then(res => {
          this.categoryLinks = res.data.data.items
          this.showCategory = true
       })
       .catch(err => {
         this.showCategory = true
       })
      }
    }
}
</script>

<style>

</style>