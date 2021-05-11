import Api from '@/services/Api'

export default {
    all({ perPage = 5, page = 1, minPrice = 0, maxPrice = 0, productName = '' }) {
        let templ = ''
        if(maxPrice > 0) {
            templ = `&maxPrice=${maxPrice}`
        }
        return Api.get(`products?page=${page}&perPage=${perPage}&minPrice=${minPrice}${templ}&productName=${productName}`)
    },
    favoriteProduct(productId) {
        return Api.post(`product/favorite/${productId}`)
    }
}
