<template>
    <div>
        <b-form @submit.prevent="onSubmit()">
        <b-form-group>
          <b-form-input
            class="pt-2"
            v-model="name"
            type="text"
            required
            placeholder="chatroom name"
          ></b-form-input>
        </b-form-group>

        <b-form-group>
            <b-form-radio inline required v-model="type" id="type-public" value="public">public</b-form-radio>
            <b-form-radio inline required v-model="type" id="type-private" value="private">private</b-form-radio>
        </b-form-group>

        <button class="btn btn-primary">Add</button>
      </b-form>
    </div>
</template>

<script>
import {mapActions, mapGetters} from 'vuex'
import { BForm, BFormGroup, BFormInput, BFormRadio } from 'bootstrap-vue'

export default {
    name: 'ChatroomForm',
    components: {
        'b-form': BForm,
        'b-form-group': BFormGroup,
        'b-form-input': BFormInput,
        'b-form-radio': BFormRadio
    },
    data() {
        return {
            name: null,
            type: null
        };
    },
    computed: {
        ...mapGetters([
            'chatroom/chatrooms'
        ])
    },
    methods: {
        ...mapActions({
            create: 'chatroom/create',
        }),
        onSubmit() {
            this.create({
                'name': this.name,
                'type': this.type == 'public' ? 1 : 2
            })
            this.name = ""
            this.type = null
        }
    },
    created: function() {
        
    }
}
</script>