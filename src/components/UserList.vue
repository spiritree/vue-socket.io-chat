<template>
  <div>
  <li 
    v-for="user in $store.state.userName"
    :key="user.id"
    class="thread-list-item"
    <h5 class="thread-name">{{ user }}</h5>
  </li>
  </div>
</template>

<script>
export default {
  name: 'UserList',
}
</script>