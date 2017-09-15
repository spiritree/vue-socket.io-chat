<template>
  <div class="thread-section">
    <div class="thread-count">
      <span>
        在线列表: {{ }}
      </span>
      <span>
        总人数: {{  }}
      </span>
    </div>
    <ul class="thread-list">
      <thread
        v-for="thread in threads"
        :key="thread.id"
        :thread="thread"
        :active="thread.id === currentThread.id"
        @switch-thread="switchThread">
      </thread>
    </ul>
  </div>
</template>

<script>
import Thread from './Thread.vue'
import { mapGetters } from 'vuex'

export default {
  name: 'ThreadSection',
  components: { Thread },
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
