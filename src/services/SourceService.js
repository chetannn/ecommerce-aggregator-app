import Api from '@/services/Api'

export default {
    all({ perPage = 10, page = 1 }) {
        return Api.get(`sources?page=${page}&perPage=${perPage}`)
    },
    stats() {
        return Api.get('sources/statistics')
    },
    create(data) {
        return Api.post('sources', data)
    }
}