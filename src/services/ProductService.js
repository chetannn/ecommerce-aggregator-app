import Api from '@/services/Api'

export default {
    all({ perPage = 5, page = 1, minPrice = 0, maxPrice = 0, productName = null, sourceId = null }) {
        let templ = ''
        let ptempl = ''
        let sourcetempl = ''

        if(maxPrice > 0) {
            templ = `&maxPrice=${maxPrice}`
        }
        if(productName) {
            ptempl = `&productName=${productName}`
        }

        if(sourceId) {
            sourcetempl = `&sourceId=${sourceId}`
        }

        return Api.get(`products?page=${page}&perPage=${perPage}&minPrice=${minPrice}${templ}${ptempl}${sourcetempl}`)
    },
    favoriteProduct(productId) {
        return Api.post(`product/favorite/${productId}`)
    }
}
