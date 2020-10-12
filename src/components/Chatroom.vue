<template>
    <div class="chat-custom">
        
    </div>
</template>

<style scoped lang="scss">

</style>

<script>
import {mapGetters, mapActions} from 'vuex'


export default {
    name: 'Chatroom',
    components: {
        
    },
    data() {
        return {
            message: "",
        }
    },
    computed: {
        ...mapGetters({
            user: 'user/user',
            currentRoom: 'chatroom/currentRoom',
            messages: 'message/messages'
        })
    },
    methods: {
        ...mapActions({
            loadMessages: 'message/loadMessages',
            create: 'message/create'
        }),
        onSend() {
            this.create({
                message: {content: this.message},
                chatroom: this.currentRoom
            })
        },
        openChat(){},
        closeChat(){},
        onClose(){}
    },
    created: function() {
    }
}
</script>