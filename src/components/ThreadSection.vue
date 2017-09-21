<template>
  <div class="thread-section">
    <div class="thread-count">
      <i class="icon-people"></i>
      <h3>
        总人数: {{ count }}
      </h3>
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
    count() {
      return localStorage.count
    }
  },
  methods: {
    switchThread (id) {
      this.$store.dispatch('switchThread', { id })
    }
  }
}
</script>
<style lang="scss" scoped>
    i.icon-people {
        width: 26.4px;
        height: 26.4px;
        background: url('../assets/people.svg') no-repeat;
        background-size: contain;
        float: left;
        margin-right: 9px;
    }
</style>