import Echo from 'laravel-echo'
import SOCKET_URL from '../config'

window.io = require('socket.io-client')

let echo = null

const state = {}

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

export default {
    namespaced: true,
    state,
    getters
}