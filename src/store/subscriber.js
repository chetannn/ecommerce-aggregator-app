import store from '@/store'
import Api from '@/services/Api'

store.subscribe((mutation) => {
    switch(mutation.type) {
        case 'setToken':
            if(mutation.payload) {
                Api().defaults.headers.common['Authorization'] = `Bearer ${mutation.payload}`
                localStorage.setItem('token', mutation.payload)
            }
            else {
                Api().defaults.headers.common['Authorization'] = null
                localStorage.removeItem('token')
            }
            break
    }
})