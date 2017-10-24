<template>
  <div>
  <li 
    v-for="user in $store.state.userNameList"
    :key="user.id"
    class="thread-list-item">
    <h5 class="user-name">{{ user }}</h5>
  </li>
  </div>
</template>

<script lang="ts">
/// <reference path="../../socket.io.d.ts" />

import Vue from 'vue'

interface Data {
  userNameList: Array<any>
}

export default Vue.extend({
  name: 'UserList',
  data(): Data {
    return {
      userNameList: []
    }
  },
  created() {
    this.connectEvent()
  },
  methods: {
    connectEvent(): void {
      socket.on('transferUserState', (data: any) => {
        let userNameList = data.userNameList
        this.$store.dispatch('updateUserNameList', {
          userNameList: userNameList
        })
      })
      socket.on('updateUserState', (data: any) => {
        let userNameList = data.userNameList
        this.$store.dispatch('updateUserNameList', {
          userNameList: userNameList
        })
      })
    }
  },
})
</script>