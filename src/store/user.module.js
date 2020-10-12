import * as mutationTypes from './mutations'
import AuthApi from '../api/authApi'
import Api from '../api/common'
import router from '../router/index'

const state = {
    user: null
}

const getters = {
    user(state) {
        return state.user
    }
}

const actions = {
    login({commit}, data) {
        AuthApi.login(data)
            .then((response) => {
                commit(mutationTypes.SET_USER, response.data.data)
                localStorage.setItem('user', JSON.stringify(response.data.data))
                Api.setHeader()
                router.push('/')
            })
    },
    register({commit}, data) {
        AuthApi.register(data)
            .then((response) => {
                commit(mutationTypes.SET_USER, response.data.data)
                localStorage.setItem('user', JSON.stringify(response.data.data))
                Api.setHeader()
                router.push('/')
            })
    },
    loadUser({commit}) {
        const user = JSON.parse(localStorage.getItem('user'))
        if (user) {
            commit(mutationTypes.SET_USER, user)
            Api.setHeader()
        }
    },
    logout({commit}) {
        localStorage.removeItem('user')
        commit(mutationTypes.SET_USER, null)
    }
}

const mutations = {
    [mutationTypes.SET_USER](state, user) {
        state.user = user
    }
}

export default {
    namespaced: true,
    state,
    getters,
    actions,
    mutations
}