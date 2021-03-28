import Api from '@/services/Api'

export default {
    all({ perPage = 10, page = 1 }) {
        return Api.get(`sources?page=${page}&perPage=${perPage}`)
    }
}