<template>
  <div>
    <v-layout>
      <v-container>
      <v-row>
        <v-col cols="12" md="4"> 
            <v-card>
              <v-list>
                 <v-subheader>REPORTS</v-subheader>
                 </v-list>
            </v-card>
           </v-col>
        <v-col cols="12" md="8">
          <v-row>
            <v-col cols="12" md="4">
              <v-card class="mx-auto" max-width="400">
                <v-img
                  src="https://cdn.vuetifyjs.com/images/cards/sunshine.jpg"
                  height="200px"
                ></v-img>

                <v-card-title> Top western road trips </v-card-title>

                <v-card-subtitle> 1,000 miles of wonder </v-card-subtitle>

                <v-card-actions>
                  <v-btn color="orange lighten-2" text> Explore </v-btn>
                </v-card-actions>
              </v-card>
            </v-col>

             <v-col cols="12" md="4">
              <v-card class="mx-auto" max-width="400">
                <v-img
                  src="https://cdn.vuetifyjs.com/images/cards/sunshine.jpg"
                  height="200px"
                ></v-img>

                <v-card-title> Top western road trips </v-card-title>

                <v-card-subtitle> 1,000 miles of wonder </v-card-subtitle>

                <v-card-actions>
                  <v-btn color="orange lighten-2" text> Explore </v-btn>
                </v-card-actions>
              </v-card>
            </v-col>

             <v-col cols="12" md="4">
              <v-card class="mx-auto" max-width="400">
                <v-img
                  src="https://cdn.vuetifyjs.com/images/cards/sunshine.jpg"
                  height="200px"
                ></v-img>

                <v-card-title> Top western road trips </v-card-title>

                <v-card-subtitle> 1,000 miles of wonder </v-card-subtitle>

                <v-card-actions>
                  <v-btn color="orange lighten-2" text> Explore </v-btn>
                </v-card-actions>
              </v-card>
            </v-col>

             <v-col cols="12" md="4">
              <v-card class="mx-auto" max-width="400">
                <v-img
                  src="https://cdn.vuetifyjs.com/images/cards/sunshine.jpg"
                  height="200px"
                ></v-img>

                <v-card-title> Top western road trips </v-card-title>

                <v-card-subtitle> 1,000 miles of wonder </v-card-subtitle>

                <v-card-actions>
                  <v-btn color="orange lighten-2" text> Explore </v-btn>
                </v-card-actions>
              </v-card>
            </v-col>
          </v-row>
        </v-col>
      </v-row>
      </v-container>
    </v-layout>
  </div>
</template>

<script>
import Api from '@/services/Api'
export default {
  mounted() {
    // Api.get('/auth/me').then(res => {
    //   console.log(res.data)
    // })
    // .catch(e => {
    //   console.log(e.response)
    // })
  }
};
</script>

<style>
</style>