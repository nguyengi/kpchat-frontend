import Api from './common'

const MessageApi = {
    loadMessages(chatroom)
    {
        return Api.get(`chatrooms/${chatroom.id}/messages`)
    },

    create(chatroom, message)
    {
        return Api.post(`chatrooms/${chatroom.id}/messages`, message)
    }
}

export default MessageApi