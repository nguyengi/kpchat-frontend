import Vue from 'vue'
import Vuex from 'vuex'
import user from './user.module'
import chatroom from './chatroom.module'
import message from './message.module'
import channels from './channels'

Vue.use(Vuex)

export default new Vuex.Store({
  modules: {
    user,
    chatroom,
    message,
    channels
  }
})
