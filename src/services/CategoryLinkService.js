import Api from '@/services/Api'

export default {
    all({ perPage = 5, page = 1 }) {
        return Api.get(`categoryLinks?page=${page}&perPage=${perPage}`)
    },
    create(data) {
        return Api.post('categoryLinks', data)
    },
    getAllCategoryLinksBySourceId(sourceId) {
        return Api.get('categoryLinks/source/' + sourceId)
    },
    deleteCategoryLink(id) {
        return Api.delete('categoryLinks/' + id)
    },
    getById(id) {
        return Api.get('categoryLinks/' + id)
    },
    update(link) {
        return Api.put('categoryLinks/' + link.id, link)
    }

}
