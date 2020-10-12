import * as mutationTypes from './mutations'
import MessageApi from '../api/messageApi'

const state = {
    messages: []
}

const getters = {
    messages(state) {
        return state.messages
    },
}

const actions = {
    async loadMessages({commit}, data) {
        const response = await MessageApi.loadMessages(data)
        commit(mutationTypes.SET_MESSAGES, response.data.data)
    },
    async create(context, data) {
        await MessageApi.create(data.chatroom, data.message)
    },
}

const mutations = {
    [mutationTypes.SET_MESSAGES](state, messages) {
        state.messages = messages
    },
    [mutationTypes.ADD_MESSAGE](state, message) {
        state.messages = [...state.messages, message]
    },
}

export default {
    namespaced: true,
    state,
    getters,
    actions,
    mutations
}