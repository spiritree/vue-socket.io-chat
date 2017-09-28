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

<script>
export default {
  name: 'UserList',
  data() {
    return {
      userNameList: []
    }
  },
  created() {
    this.connectEvent()
  },
  methods: {
    connectEvent() {
      socket.on('transferCurrentData', (data) => {
        this.userNameList = data.userList
      })
    }
  }
}
</script>