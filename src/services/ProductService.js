import Api from '@/services/Api'

export default {
    all({ perPage = 5, page = 1 }) {
        return Api.get(`products?page=${page}&perPage=${perPage}`)
    },
    favoriteProduct(productId) {
        return Api.post(`product/favorite/${productId}`)
    }
}
