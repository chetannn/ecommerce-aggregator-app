import Api from '@/services/Api'

export default {
    all() {
        return Api.get('users')
    },
    updateProfile(userInfo) {
        return Api.put('profile/update', userInfo)
    }
}