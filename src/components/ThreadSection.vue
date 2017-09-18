<template>
  <div class="thread-section">
    <div class="thread-count">
      <h4>
        总人数: {{ $store.state.userCount }}
      </h4>
    </div>
    <ul class="thread-list">
      <thread
        v-for="thread in threads"
        :key="thread.id"
        :thread="thread"
        :active="thread.id === currentThread.id"
        @switch-thread="switchThread">
      </thread>
      <user-list></user-list>
    </ul>
  </div>
</template>

<script>
import Thread from './Thread.vue'
import UserList from './UserList'
import { mapGetters } from 'vuex'

export default {
  name: 'ThreadSection',
  components: { Thread, UserList },
  computed: {
    ...mapGetters([
      'threads',
      'currentThread'
    ]),
  },
  methods: {
    switchThread (id) {
      this.$store.dispatch('switchThread', { id })
    }
  }
}
</script>
