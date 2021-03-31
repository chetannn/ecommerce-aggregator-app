export default {
    namespaced: true,
    state: () => ({
         show: false,
         message: '',
         timeout: 3000,
         color: 'success'
      }),
    getters: {
        snackbarText: state => state.message,
        timeout: state => state.timeout,
        color: state => state.color,
    },
    mutations: {
        setSnackbar(state, snack) {
            state.message = snack.message
            state.timeout = snack.timeout || 3000
            state.color = snack.color || 'success'
            state.show = true
        } 
    } 
}