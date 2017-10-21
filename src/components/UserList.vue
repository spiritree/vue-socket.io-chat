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

export default {
  name: 'UserList',
  data(): any {
    return {
      userNameList: []
    }
  },
  created() {
    this.connectEvent()
  },
  methods: {
    connectEvent(): void {
      socket.on('transferUserList', (data) => {
        this.userNameList = data.userList
      })
      socket.on('updateUserList', (data) => {
        this.userNameList = data.userList
      })
    }
  },
}
</script>