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
                  md="4"
                >
                  <v-text-field
                    label="Company (disabled)"
                    disabled
                    outlined
                  />
                </v-col>

                <v-col
                  cols="12"
                  md="4"
                >
                  <v-text-field
                    class="purple-input"
                    label="User Name"
                    outlined
                  />
                </v-col>

                <v-col
                  cols="12"
                  md="4"
                >
                  <v-text-field
                    label="Email Address"
                    class="purple-input"
                    outlined
                  />
                </v-col>

                <v-col
                  cols="12"
                  md="6"
                >
                  <v-text-field
                    label="First Name"
                    class="purple-input"
                    outlined
                  />
                </v-col>

                <v-col
                  cols="12"
                  md="6"
                >
                  <v-text-field
                    label="Last Name"
                    class="purple-input"
                    outlined
                  />
                </v-col>

                <v-col cols="12">
                  <v-text-field
                    label="Address"
                    class="purple-input"
                    outlined
                  />
                </v-col>

                <v-col
                  cols="12"
                  md="4"
                >
                  <v-text-field
                    label="City"
                    class="purple-input"
                    outlined
                  />
                </v-col>

                <v-col
                  cols="12"
                  md="4"
                >
                  <v-text-field
                    label="Country"
                    class="purple-input"
                    outlined
                  />
                </v-col>

                <v-col
                  cols="12"
                  md="4"
                >
                  <v-text-field
                    class="purple-input"
                    label="Postal Code"
                    type="number"
                    outlined
                  />
                </v-col>

                <v-col cols="12">
                  <v-textarea
                    class="purple-input"
                    label="About Me"
                    value="Lorem ipsum dolor sit amet, consectetur adipiscing elit."
                    outlined
                  />
                </v-col>

                <v-col
                  cols="12"
                  class="text-right"
                >
                  <v-btn
                    color="success"
                    class="mr-0"
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
                 <div class="d-flex grow flex-wrap">
                        <v-avatar
                        size="128"
                        class="mx-auto v-card__avatar elevation-6"
                        color="grey"
                        >
                          <v-img src="https://cdn.vuetifyjs.com/images/john.jpg" />
                        </v-avatar>
                 </div>
                 <v-card-text class="text-center">
                      <h6 class="display-1 mb-1 grey--text">
              CEO / CO-FOUNDER
            </h6>

            <h4 class="display-2 font-weight-light mb-3 black--text">
              Alec Thompson
            </h4>

            <p class="font-weight-light grey--text">
              Don't be scared of the truth because we need to restart the human foundation in truth And I love you like Kanye loves Kanye I love Rick Owens’ bed design but the back is...
            </p>

             <v-btn
              color="success"
              rounded
              class="mr-0"
            >
              Follow
            </v-btn>

                 </v-card-text>
             </v-card>
         </v-col>
      </v-row>
    </v-container>
</template>

<script>

</script>

<style scoped>
/* .v-card__avatar {
     position: relative;
    top: -64px;
    margin-bottom: -32px;
} */
</style>