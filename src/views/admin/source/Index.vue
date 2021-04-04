<template>
  <v-container fluid>
         <v-row class="ma-0">
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
      <v-data-table :loading="loading" :headers="headers" :items="sources">

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
        <v-data-table :items="categoryLinks" :loading="loading" :headers="categoryLinkHeaders"></v-data-table>
      </v-card>
  </v-container>
</template>

<script>
import SourceService from '@/services/SourceService'
import CategoryLinkService from '@/services/CategoryLinkService'
import moment from 'moment'

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
            loading: false
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
       
       CategoryLinkService.all({}).then(res => {
          this.categoryLinks = res.data.data.items
       })

    },
     methods: {
       formatDate(date) {
        return moment(date).format('LLL')
      }
    }
}
</script>

<style>

</style>