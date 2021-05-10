import Vue from 'vue'
import VuetifyConfirm from 'vuetify-confirm'
import App from './App.vue'
import router from './router'
import store from './store'
import vuetify from './plugins/vuetify'

import '../node_modules/nprogress/nprogress.css'

require('@/store/subscriber')

Vue.use(VuetifyConfirm, { vuetify })

Vue.config.productionTip = false

store.dispatch('auth/attempt', localStorage.getItem('token')).then(() => {
  new Vue({
    router,
    store,
    vuetify,
    render: h => h(App)
  }).$mount('#app')
  
})