import store from '@/store'
import Api from '@/services/Api'

store.subscribe((mutation) => {
    switch(mutation.type) {
        case 'auth/setToken':
            if(mutation.payload) {
                Api.defaults.headers.common['x-auth-token'] = `${mutation.payload}`
                localStorage.setItem('token', mutation.payload)
            }
            else {
                Api.defaults.headers.common['x-auth-token'] = null
                localStorage.removeItem('token')
            }
            break
    }
})