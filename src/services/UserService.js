import Api from '@/services/Api'

export default {
    all() {
        return Api.get('users')
    },
    updateProfile(userInfo) {
        return Api.put('profile/update', userInfo)
    },
    uploadAvatar(formData) {
        return Api.post('/profile/avatar', formData, {
            headers: {
                'Content-Type': 'multipart/form-data'
            }
        })
    },
    deleteUser(id) {
        return Api.delete(`users/${id}`)
    }
}