<template>
    <div>
        <b-form @submit.prevent="onSubmit()">
        <b-form-group>
          <b-form-input
            class="pt-2"
            v-model="name"
            type="text"
            required
            placeholder="user name"
          ></b-form-input>
        </b-form-group>

        <button class="btn btn-primary">Invite to {{currentRoom ? currentRoom.name : ''}}</button>
      </b-form>
    </div>
</template>

<script>
import {mapActions, mapGetters} from 'vuex'
import { BForm, BFormGroup, BFormInput } from 'bootstrap-vue'

export default {
    name: 'InviteUserForm',
    components: {
        'b-form': BForm,
        'b-form-group': BFormGroup,
        'b-form-input': BFormInput,
    },
    data() {
        return {
            name: null,
        };
    },
    computed: {
        ...mapGetters({
            currentRoom: 'chatroom/currentRoom'
        })
    },
    methods: {
        ...mapActions({
            invite: 'chatroom/invite',
        }),
        onSubmit() {
            this.invite({
                name: this.name,
                chatroom: this.currentRoom
            })
            this.name = ""
        }
    },
}
</script>