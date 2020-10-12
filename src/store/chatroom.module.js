import * as mutationTypes from './mutations'
import ChatroomApi from '../api/chatroomApi'

const state = {
    chatrooms: [],
    currentRoom: null
}

const getters = {
    chatrooms(state) {
        return state.chatrooms
    },
    currentRoom(state) {
        return state.currentRoom
    }
}

const actions = {
    async loadChatrooms({commit}) {
        const response = await ChatroomApi.loadChatrooms()
        commit(mutationTypes.SET_CHATROOMS, response.data.data)
    },
    async create({commit}, data) {
        const response = await ChatroomApi.create(data)
        commit(mutationTypes.ADD_CHATROOM, response.data.data)
    },
    changeCurrentRoom({commit}, data) {
        commit(mutationTypes.SET_CURRENT_ROOM, data)
    },
    async invite(context, data) {
        await ChatroomApi.invite(data)
    }
}

const mutations = {
    [mutationTypes.SET_CHATROOMS](state, chatrooms) {
        state.chatrooms = chatrooms
    },
    [mutationTypes.ADD_CHATROOM](state, chatroom) {
        if (state.chatrooms.filter(_ => _.id == chatroom.id).length == 0) {
            state.chatrooms = [...state.chatrooms, chatroom]
        }
    },
    [mutationTypes.SET_CURRENT_ROOM](state, chatroom) {
        state.currentRoom = chatroom
    },
    [mutationTypes.ADD_USER_TO_CHATROOM](state, user) {
        if (state.currentRoom.users.filter(_ => _.id == user.id).length == 0) {
            state.currentRoom = {
                ...state.currentRoom,
                users: [...state.currentRoom.users, user]
            }
        }
    }
}

export default {
    namespaced: true,
    state,
    getters,
    actions,
    mutations
}