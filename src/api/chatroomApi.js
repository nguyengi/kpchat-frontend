import Api from './common'

const ChatroomApi = {
    loadChatrooms()
    {
        return Api.get('chatrooms')
    },

    create(data)
    {
        return Api.post('chatrooms', data)
    },

    invite(data)
    {
        return Api.post(`chatrooms/${data.chatroom.id}/invite`, {name: data.name})
    }
}

export default ChatroomApi