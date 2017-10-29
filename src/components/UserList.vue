<template>
  <div>
  <li
    v-for="user in userNameList"
    :key="user.id"
    class="thread-list-item">
    <h5 class="user-name">{{ user }}</h5>
  </li>
  </div>
</template>

<script lang="ts">
/// <reference path="../../socket.io.d.ts" />

import Vue from 'vue'
import { mapGetters } from 'vuex'

// interface Data {
//   userNameList: Array<any>
// }

export default Vue.extend({
  name: 'UserList',
  // data(): Data {
  //   return {
  //     userNameList: []
  //   }
  // },
  computed: {
    ...mapGetters([
      'userNameList'
    ])
  },
  mounted() {
    this.socketEvent()
  },
  methods: {
    socketEvent(): void {
      socket.on('transferUserState', (data: any) => {
        const userNameList = data.userNameList
        this.$store.dispatch('updateUserNameList', {
          userNameList: userNameList
        })
      })
      socket.on('updateUserState', (data: any) => {
        const userNameList = data.userNameList
        this.$store.dispatch('updateUserNameList', {
          userNameList: userNameList
        })
      })
    }
  },
})
</script>
