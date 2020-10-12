<template>
    <div>
        <div class="row justify-content-md-center">
            <div v-if="activeForm=='inviteUser'">
                <invite-user-form></invite-user-form>
            </div>
        </div>
        <div class="row justify-content-md-center">
            <div v-if="activeForm=='addRoom'">
                <chatroom-form></chatroom-form>
            </div>
        </div>
        <div class="row justify-content-md-center">
            <div class="col-sm-8">
                <chat-window 
                    :currentUserId="user.id" 
                    :rooms="roomsForChat" 
                    :messages="messagesForChat" 
                    @sendMessage="onSend"
                    @fetchMessages="onChangeChatroom"
                    @menuActionHandler="onClickMenu"
                    :messagesLoaded="{}"
                    :showEmojis="false"
                    :showReactionEmojis="false"
                    :messageActions="[]"
                    :showFiles="false"
                    :showAddRoom="true"
                    @addRoom="onAddRoom"
                    :loadingRooms="false"
                    :menuActions="menuActions"
                    :showNewMessagesDivider="false"
                    />
            </div>
        </div>
    </div>
</template>

<script>
import {mapGetters, mapActions} from 'vuex'
import ChatroomForm from '../components/ChatroomForm'
import InviteUserForm from '../components/InviteUserForm'
import ChatWindow from 'vue-advanced-chat'
import 'vue-advanced-chat/dist/vue-advanced-chat.css'

export default {
    name: 'Chatrooms',
    directives:{
    },
    data() {
        return {
            activeForm: null,
        }
    },
    components: {
        'chatroom-form': ChatroomForm,
        'invite-user-form': InviteUserForm,
        ChatWindow
    },
    computed: {
        ...mapGetters({
            chatrooms: 'chatroom/chatrooms',
            messages: 'message/messages',
            currentRoom: 'chatroom/currentRoom',
            user: 'user/user'
        }),
        roomsForChat: function () {
            return this.chatrooms.map(_ => this.convertRoom(_))
        },
        messagesForChat: function () {
            return this.messages.map(_ => this.convertMessage(_))
        },
        menuActions: function() {
            const inviteUser = [
                {
                    name: 'inviteUser',
                    title: 'invite user'
                }
            ]
            return this.currentRoom && this.currentRoom.type == 2 ? inviteUser : []
        },
    },
    methods: {
        ...mapActions({
            loadChatrooms: 'chatroom/loadChatrooms',
            changeCurrentRoom: 'chatroom/changeCurrentRoom',
            loadMessages: 'message/loadMessages',
            createMessage: 'message/create',
            initChatroomsListener: 'channels/initChatroomsListener',
            initChatroomListener: 'channels/initChatroomListener',
            initPrivateChatroomListener: 'channels/initPrivateChatroomListener'
        }),
        onChangeChatroom({room, options}) {
            if (options && options.reset) {
                const chatroom = this.chatrooms.filter(r => r.id == room.roomId)[0]
                this.changeCurrentRoom(chatroom)
                this.loadMessages(chatroom)
                this.initChatroomListener(chatroom)
            }
        },
        onSend(msg) {
            this.createMessage({
                message: {content: msg.content},
                chatroom: this.currentRoom
            })
        },
        convertRoom(room) {
            return {
                roomId: room.id,
                roomName: (room.type == 1 ? '#' : '🔒') + room.name,
                users: room.users.map(user => {
                    return {
                        _id: user.id,
                        username: user.name
                    }
                })
            }
        },
        convertMessage(msg) {
            return {
                _id: msg.id,
                content: msg.content,
                sender_id: msg.user.id,
                user_name: msg.user.name,
            }
        },
        onClickMenu({action, roomId}) {
            if(!roomId) {
                return
            }
            switch (action.name) {
                case 'inviteUser':
                    this.activeForm = 'inviteUser'
                    break
            }
        },
        onAddRoom() {
            this.activeForm = 'addRoom'
        },
        clearForms() {
            this.activeForm = null
        },
    },
    created: function() {
        this.loadChatrooms()
        this.initChatroomsListener()
        this.initPrivateChatroomListener(this.user)
    }
}
</script>