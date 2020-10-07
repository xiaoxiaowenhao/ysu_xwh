import Vuex from 'vuex'
import Vue from 'vue'
import state from "./state"
import getters from "./getters"
import mutations from './mutations'
import persistedState from 'vuex-persistedstate'
Vue.use(Vuex)
export default new Vuex.Store({
    plugins: [persistedState({
        storage: window.sessionStorage
    })],
    state,
    getters,
    mutations
})