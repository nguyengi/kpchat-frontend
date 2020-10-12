import * as mutationTypes from './mutations'
import Echo from 'laravel-echo'
import {SOCKET_URL} from '../config'

window.io = require('socket.io-client')

let echo = null

const getters = {
    echo: (state, getters, rootState) => {
        if (echo) return echo;
        if (rootState.user.user.token) {
            return echo = new Echo({
                broadcaster: 'socket.io',
                host: SOCKET_URL,
                auth: {
                    headers: {
                        Authorization: `Bearer ${rootState.user.user.token}`
                    }
                }
            })
        }
    }
}

const state = {
    channelListening: false,
    chatroomsListeners : [
        {
            channel: '',
            event: '.new_chatroom'
        },
    ],
    privateChatroomListeners : [
        {
            channel: '',
            event: '.chatroom_invite'
        }
    ],
    chatroomListeners: [
        {
            channel: '',
            event: '.new_message'
        },
        {
            channel: '',
            event: '.user_join'
        }
    ]
}

const actions = {
    initChatroomsListener ({commit, state, getters, dispatch}) {
        dispatch('leaveChannel', 'chatroomsListeners')
        const channelName = `chatrooms`
        commit(mutationTypes.SET_CHANNEL_LISTENING, {channelName, type: 'chatrooms'})
        state.chatroomsListeners.forEach(listener => {
            getters.echo
                .private(listener.channel)
                .listen(listener.event, payload => {
                    if (listener.event === '.new_chatroom') {
                        commit('chatroom/' + mutationTypes.ADD_CHATROOM, payload, {root: true})
                    }
                })

        })
    },
    initPrivateChatroomListener ({commit, state, getters, dispatch}, user) {
        dispatch('leaveChannel', 'privateChatroomListeners')
        const channelName = `users.${user.id}.private-chatrooms`
        commit(mutationTypes.SET_CHANNEL_LISTENING, {channelName, type: 'privateChatroom'})
        state.privateChatroomListeners.forEach(listener => {
            getters.echo
                .private(listener.channel)
                .listen(listener.event, payload => {
                    if (listener.event === '.chatroom_invite') {
                        commit('chatroom/' + mutationTypes.ADD_CHATROOM, payload, {root: true})
                    }
                })

        })
    },
    initChatroomListener({commit, state, getters, dispatch}, chatroom) {
        dispatch('leaveChannel', 'chatroomListeners')
        const channelName = `chatrooms.${chatroom.id}`
        commit(mutationTypes.SET_CHANNEL_LISTENING, {channelName, type: 'chatroom'})
        state.chatroomListeners.forEach(listener => {
            getters.echo
                .private(listener.channel)
                .listen(listener.event, payload => {
                    if (listener.event === '.new_message') {
                        commit('message/' + mutationTypes.ADD_MESSAGE, payload, {root: true})
                    }
                    if (listener.event === '.user_join') {
                        commit('chatroom/' + mutationTypes.ADD_USER_TO_CHATROOM, payload, {root: true})
                    }
                })

        })
    },
    leaveChannel({state, getters}, listenerName) {
        if (getters.echo) {
            getters.echo.leave(state[listenerName][0].channel)
        }
    }
}

const mutations = {
    [mutationTypes.SET_CHANNEL_LISTENING] (state, {channelName, type}) {
        state[type + 'Listeners'] = state[type + 'Listeners'].map(item => {
            item.channel = channelName
            return item
        })
    }
}

export default {
    namespaced: true,
    state,
    getters,
    actions,
    mutations
}